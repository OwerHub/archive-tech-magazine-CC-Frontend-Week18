if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const uuid = require("uuid");
const cors = require("cors");
const axios = require("axios");
const cookieParser = require("cookie-parser");

let low = require("lowdb"),
  FileSync = require("lowdb/adapters/FileSync"),
  adapter = new FileSync("data/db.json"),
  db = low(adapter);

// set defaults for the db
db.defaults({
  browsers: [],
  browser_urls: [],
}).write();

const browsers = [];
let articles = [];

const api_key = process.env.NEWSAPI_API_KEY;
const api_url =
  "https://newsapi.org/v2/everything?domains=tech2.com,techradar.com,thenextweb.com,wired.com,gizmodo.com,cnet.com,techradar.com,digitaltrends.com&sortby=publishedAt&language=en&pageSize=30&q=technology";
let api_page = 1;

if (process.env.DEMO === "0") {
  articles = require("./data/articles.json");
}

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/visit", (req, res) => {
  let id = req.cookies.id;
  if (
    !id ||
    !id.match(
      /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
    )
  ) {
    id = uuid.v4();

    res.cookie("id", id, {
      maxAge: 9999999999,
      sameSite: "none",
      secure: true,
    });
  }

  if (db.get("browsers").find({ id: id }).value() === undefined)
    db.get("browsers").push({ id: id }).write();

  res.send(id);
});

app.get("/wall", (req, res) => {
  const id = req.cookies.id;

  if (!id) {
    return res.send({
      status: "cookie-error",
      totalResults: 0,
      articles: {},
    });
  }

  const visited_urls = db
    .get("browser_urls")
    .filter({ id: id })
    .value()
    .map((key) => key.url);

  const new_articles = getNewArticles(visited_urls, articles, id);
  if (new_articles.length < process.env.ARTICLES_NO) {
    getNews({ url: api_url, page: api_page++, key: api_key })
      .then((new_articles) => {
        const api_articles = new_articles.filter((article) => {
          return articles.find((item) => item.url === article.url) === undefined;
        });

        articles = articles.concat(api_articles).sort(GetSortOrderDesc("publishedAt"));

        return getNewArticles(visited_urls, articles);
      })
      .then((new_articles) => {
        const res_articles = new_articles
          .slice(0, process.env.ARTICLES_NO)
          .map((article) => {
            db.get("browser_urls").push({ id: id, url: article.url }).write();
            return article;
          });

        return res.send({
          status: res_articles.length ? "ok" : "no more news",
          totalResults: res_articles.length,
          articles: res_articles,
        });
      })
      .catch((err) => {
        api_page = 1;
        res.send({
          status: err.response.statusText,
          totalResults: 0,
          articles: [],
        });
      });
  } else {
    const res_articles = new_articles.slice(0, process.env.ARTICLES_NO).map((article) => {
      db.get("browser_urls").push({ id: id, url: article.url }).write();
      return article;
    });

    return res.send({
      status: "ok",
      totalResults: res_articles.length,
      articles: res_articles,
    });
  }
});

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

async function getNews(params) {
  const resp = await axios({
    method: "GET",
    url: params.url,
    params: {
      page: params.page,
    },
    headers: {
      "X-API-Key": params.key,
    },
  });

  return resp.data.articles;
}

function getNewArticles(visited_urls, articles, id) {
  if (process.env.DEMO === "0" && visited_urls.length > process.env.ARTICLES_NO) {
    if (id !== undefined) {
      db.get("browser_urls").remove({ id: id }).write();
    }
    visited_urls = [];
  }

  return visited_urls.length === 0
    ? articles
    : articles.filter((article) => !visited_urls.includes(article.url));
}

function GetSortOrderDesc(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return -1;
    } else if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  };
}
