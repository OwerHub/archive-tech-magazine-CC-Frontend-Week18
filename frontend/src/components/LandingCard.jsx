import styled, { keyframes } from "styled-components";
import React, { useState, useEffect } from "react";

// végül nem használtuk, de így kell animációt beiktatni styled-ba
const animations = keyframes`
0%{ opacity: 0}
5% {opacity: 100}
95% {opacity: 100}
100% {opacity: 0}
`;

// kártya külső, prop-olható div-je
const CardHolder = styled.div`
  position: static;
  margin: 1vw 1vw 0vw;
  transition: opacity 0.5s;
  opacity: ${(props) => props.opacity};
  transform: scale(${(props) => props.scale}) rotate(${(props) => props.rotate}deg)
    translate(${(props) => props.x}vw, ${(props) => props.y}vw);
  /* animation-name: ${animations};
  animation-duration: ${(props) => props.time}s;
  animation-iteration-count: infinite; */
`;

function LandingCard(props) {
  /*  let color1 = "#05CAF0";
  let color2 = "#1F48DB";
  let color3 = "#2F7791";
  let color4 = "#06B873"; */

  let cardColors = [
    "#1F48DB",
    "#2F7791",
    "#DE9151",
    "#06B873",
    "#97DB4F",
    "#A2FAA3",
    "#FFF4E4",
    "#DDD8B8",
    "#94FBAB",
    "#679436",
    "#B4A6AB",
  ];

  function getRandomInt(min, num) {
    return Math.floor(Math.random() * Math.floor(num) + min);
  }

  // hook-vezérlő State-ek
  const [isChange, setChange] = useState(false);
  const [isChangeBefore, setChangeBefore] = useState(false);

  // Opacity hook
  const [isFade, setFade] = useState(1);

  let timer = props.time * 1000;

  // elő-feszítő, eltűnteti a kártyát, míg lezajlik a változás
  useEffect(() => {
    setFade(0);
    setTimeout(function () {
      setChange(!isChange);
    }, 500);
  }, [isChangeBefore]);

  // state-ek a CSS és színbeállításokhoz
  const [isColorvariant, setColorVariant] = useState(1);
  const [isScaleVariant, setScaleVariant] = useState(1);
  const [isRotateVariant, setRotateVariant] = useState(0);
  const [isXVariant, setXVariant] = useState(0);
  const [isYVariant, setYVariant] = useState(0);

  useEffect(() => {
    setColorVariant(getRandomInt(0, cardColors.length));
    setScaleVariant(getRandomInt(90, 20) / 100);
    setRotateVariant(getRandomInt(-15, 30));
    setXVariant(getRandomInt(-40, 80) / 10);
    setYVariant(getRandomInt(-30, 60) / 10);
    setFade(1);

    //egy state megváltoztatása 500ms-el idő előtt,
    setTimeout(function () {
      setChangeBefore(!isChangeBefore);
    }, timer - 500);
  }, [isChange]);

  //responsive card measure
  let ScreenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  let svgWidth = "";

  if (ScreenWidth > 1017) {
    svgWidth = "17vw";
  } else if ((ScreenWidth <= 1017) & (ScreenWidth > 950)) {
    svgWidth = "200px";
  } else if ((ScreenWidth <= 950) & (ScreenWidth > 710)) {
    svgWidth = "20vw";
  } else if ((ScreenWidth <= 710) & (ScreenWidth > 651)) {
    svgWidth = "200px";
  } else if (ScreenWidth <= 467) {
    svgWidth = "40vw";
  } else {
    svgWidth = "200px";
  }

  // első lefutásnál vezérel
  useEffect(() => {
    setChange(!isChange);
  }, []);

  return (
    <CardHolder
      scale={isScaleVariant}
      rotate={isRotateVariant}
      x={isXVariant}
      y={isYVariant}
      time={props.time}
      opacity={isFade}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 377.78 510"
        /* width="15vw" */
        /* width="200px" */
        width={svgWidth}
        fill={cardColors[isColorvariant]}
        stroke="black"
      >
        <defs>
          <style>.cls-1 {/*  fill: #fff; */}</style>
        </defs>
        <g id="Layer_2" data-name="Layer 2">
          <g id="card">
            <g id="outer">
              <rect
                className="cls-1"
                x="0.5"
                y="0.5"
                width="376.78"
                height="509"
                rx="13.5"
              />
              <path d="M363.78,1a13,13,0,0,1,13,13V496a13,13,0,0,1-13,13H14A13,13,0,0,1,1,496V14A13,13,0,0,1,14,1H363.78m0-1H14A14,14,0,0,0,0,14V496a14,14,0,0,0,14,14H363.78a14,14,0,0,0,14-14V14a14,14,0,0,0-14-14Z" />
            </g>
            <g id="inner">
              <rect
                className="cls-1"
                x="25.04"
                y="25.5"
                width="328.75"
                height="326"
                rx="20.21"
                fill="white"
              />
              <path d="M333.59,26A19.73,19.73,0,0,1,353.3,45.71V331.29A19.73,19.73,0,0,1,333.59,351H45.25a19.73,19.73,0,0,1-19.71-19.71V45.71A19.73,19.73,0,0,1,45.25,26H333.59m0-1H45.25A20.71,20.71,0,0,0,24.54,45.71V331.29A20.71,20.71,0,0,0,45.25,352H333.59a20.71,20.71,0,0,0,20.71-20.71V45.71A20.71,20.71,0,0,0,333.59,25Z" />
            </g>
            <g>
              <rect
                className="cls-1"
                x="25.39"
                y="380.5"
                width="328"
                height="35"
                fill="black"
              />
              <path d="M352.89,381v34h-327V381h327m1-1h-329v36h329V380Z" />
            </g>
            <g>
              <rect
                className="cls-1"
                x="28.39"
                y="442.5"
                width="322"
                height="35"
                fill="black"
              />
              <path d="M349.89,443v34h-321V443h321m1-1h-323v36h323V442Z" />
            </g>
          </g>
        </g>
      </svg>
    </CardHolder>
  );
}

export default LandingCard;
