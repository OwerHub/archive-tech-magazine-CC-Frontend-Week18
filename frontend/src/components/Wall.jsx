import { useEffect, useState } from "react";
/* import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"; */
import LoadAnim from "./animation/LoadAnimation";
import styled from "styled-components";

import { CardComp } from "./CardComp";

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
`;

export const Wall = () => {
  const [isBottom, setIsBottom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({});

  useEffect(() => {
    if ((isBottom || isBottom === null) && !isLoading) {
      setIsLoading(true);
      fetch("http://localhost:5555/wall", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (Array.isArray(data.articles)) {
            response.articles = [...data.articles, ...response.articles];
            response.totalResults = response.articles.length;

            for (let i = 0; i < 5; i++) {
              response.articles[i].highlight = true;
            }
          }
          setData(response);
          setIsBottom(false);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isBottom, isLoading, data.articles]);

  //----------------------scrolling----------------

  function handleScroll() {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    if (scrollTop + window.innerHeight + 250 >= scrollHeight) {
      setIsBottom(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //----------------------rendering----------------
  if (Array.isArray(data.articles)) {
    return (
      <CardWrapper>
        {data.articles.map((item, index) => {
          return <CardComp key={index} item={item} index={index}></CardComp>;
        })}
        {isLoading && <LoadAnim />}
      </CardWrapper>
    )
  } else {
    return <LoadAnim />;
  }
};
// ---------------------------- first iteration for popup button
/*  {isShown && cardId && (
          <Card
            style={{
              position: "fixed",
              top: `${X}`,
              left: `${Y}`,
              maxWidth: "22rem",
              minWidth: "160px",
              margin: "2rem 1rem",
              transform: "translateY(50%)", 
              fontSize: "1.1em",
            }}>
            <Card.Img variant="top" src={`${data.articles[cardId].urlToImage}`} />
            <Card.Body>
              <Card.Title>{data.articles[cardId].title}</Card.Title>
              <Card.Text>{data.articles[cardId].description}</Card.Text>
              <Card.Text>{data.articles[cardId].content}</Card.Text>
            </Card.Body>
          </Card>
        )} */
