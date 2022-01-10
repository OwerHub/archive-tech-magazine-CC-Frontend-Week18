import "./landingpageNew.css";
import LandingCard from "./LandingCard";

function LandingPage(props) {
  return (
    <div className="outerContainer">
      <div className="cardContainer">
        <div className="title" onClick={() => props.visited(true)}>
          <div>NEVER READ</div>
          <div>THE SAME</div>
          <div className="smallTitle">click here to continue</div>
        </div>
        <div className="cardRowContainer">
          <LandingCard time="7" nr="1"></LandingCard>
          <LandingCard time="5" nr="2"></LandingCard>

          <LandingCard time="3" nr="3"></LandingCard>
          <LandingCard time="9" nr="4"></LandingCard>

          <LandingCard time="6" nr="5"></LandingCard>
          <LandingCard time="8" nr="6"></LandingCard>

          <LandingCard time="4" nr="7"></LandingCard>
          <LandingCard time="10" nr="8"></LandingCard>

          <div className="mediaQHidden"></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
