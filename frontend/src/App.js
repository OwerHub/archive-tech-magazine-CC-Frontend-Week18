import { useCookies } from "react-cookie";

import "./App.css";
import styled from "styled-components";

import { useState, useEffect } from "react";
import { Wall } from "./components/Wall";

import LandingPageNew from "./components/LandingPageNew";

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* align-items: center; */
`;

function App() {
  const [cookies, setCookie] = useCookies(["id"]);
  const [visited, setVisited] = useState(cookies.id !== undefined);

  const [isServer, setIsServer] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5555/visit", {
      credentials: "include",
    })
      .then(() => setIsServer(true))
      .catch(() => setIsServer(false));
  }, []);

  useEffect(() => {
    if (!isServer && !cookies.id) {
      setCookie("id", Date.now().toString(16), {
        maxAge: 9999999999,
        sameSite: "none",
        secure: true,
      });
    }
  }, [isServer, cookies.id, setCookie]);

  return (
    <div className="App">
      <h1 onClick={() => setVisited(true)}>SnapTech</h1>
      <div className="placeholder"></div>
      {visited ? (
        <CardWrapper>
          <Wall />
        </CardWrapper>
      ) : (
        <LandingPageNew visited={(val) => setVisited(val)} />
      )}
    </div>
  );
}

export default App;
