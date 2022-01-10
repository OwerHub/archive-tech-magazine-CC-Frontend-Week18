import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Popup from "reactjs-popup";

const HighlightText = (text, highlight) => {
  return highlight ? <mark>{text}</mark>: text;
}

export function CardComp(props) {
  const [isShown, setIsShown] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cardId, setCardId] = useState(0);

  return isShown === true ? (
    <Card
      key={props.index}
      id={props.index}
      className="card"
      style={{
        position: "relative",
        maxWidth: "18rem",
        minWidth: "160px",
        margin: "2rem 1rem",
      }}
      onMouseEnter={(e) => {
        setIsShown(true);
        setCardId(e.target.id);
        /* console.log(e.target.id); */
      }}
      onMouseLeave={(e) => {
        setIsShown(false);
        setCardId(0);
      }}>
      <Card.Img id={props.index} variant="top" src={`${props.item.urlToImage}`} />
      <Card.Body id={props.index}>
        <Card.Title style={{ color: "#05caf0" }}>{props.item.title}</Card.Title>
        <Card.Text> {props.item.description}</Card.Text>
        <Card.Text>{props.item.content}</Card.Text>
        <Card.Text>
          <a href={props.item.url} target="_blank" rel="noreferrer">
            {props.item.url && props.item.url}
          </a>
        </Card.Text>

        {
          //----- first iteration popup button component. -----
          /* <Button
						id={index}
						onMouseEnter={(e) => {
							setIsShown(true);
							setCardId(e.target.id);
							console.log(e.target.id);
						}}
						onMouseLeave={(e) => {
							setIsShown(false);
							setCardId(0);
						}} 
						variant="outline-info">
						Read More
					</Button> */
        }
        <Popup
          style={{ margin: "1rem" }}
          trigger={(open) => (
            <Button
              type="button"
              variant="outline-info"
              className="button"
              style={{ color: "#05caf0" }}>
              Read More
            </Button>
          )}
          position="center bottom"
          on={["click", "focus"]}
          closeOnDocumentClick>
          <Card
            style={{
              /* position: "fixed",
							top: `${X}`,
							left: `${Y}`, */
              maxWidth: "22rem",
              minWidth: "160px",
              margin: "2rem 1rem",
              /* transform: "translateY(50%)", */
              fontSize: "1.1em",
            }}>
            <Card.Img variant="top" src={`${props.item.urlToImage}`} />
            <Card.Body>
              <Card.Title style={{ color: "#05caf0" }}>{props.item.title}</Card.Title>
              <Card.Text>{props.item.description}</Card.Text>
              <Card.Text>{props.item.content}</Card.Text>
            </Card.Body>
          </Card>
        </Popup>
      </Card.Body>
    </Card>
  ) : (
    <Card
      key={props.index}
      id={props.index}
      className="card"
      style={{
        position: "relative",
        maxWidth: "18rem",
        minWidth: "160px",
        margin: "2rem 1rem",
      }}
      onMouseEnter={(e) => {
        setIsShown(true);
        setCardId(e.target.id);
        /* console.log(e.target.id); */
      }}
      onMouseLeave={(e) => {
        setIsShown(false);
        setCardId(0);
      }}>
        <Card.Header as="h4">{HighlightText(props.item.title, props.item.highlight)}</Card.Header>
      <Card.Img id={props.index} variant="top" src={`${props.item.urlToImage}`} />
      <Card.Body id={props.index}>
        {/* <Card.Title style={{  }}>{props.item.title}</Card.Title> */}
        <Card.Text>{props.item.content}</Card.Text>

        {
          //----- first iteration popup button component. -----
          /* <Button
						id={index}
						onMouseEnter={(e) => {
							setIsShown(true);
							setCardId(e.target.id);
							console.log(e.target.id);
						}}
						onMouseLeave={(e) => {
							setIsShown(false);
							setCardId(0);
						}} 
						variant="outline-info">
						Read More
					</Button> */
        }
        <Popup
          trigger={(open) => (
            <Button
              type="button"
              variant="outline-info"
              className="button"
              style={{ color: "#05caf0" }}>
              Read More
            </Button>
          )}
          position="center center"
          on={["hover", "focus"]}
          closeOnDocumentClick>
          <Card
            style={{
              /* position: "fixed",
							top: `${X}`,
							left: `${Y}`, */
              maxWidth: "22rem",
              minWidth: "160px",
              margin: "2rem 1rem",
              /* transform: "translateY(50%)", */
              fontSize: "1.1em",
            }}>
            <Card.Img variant="top" src={`${props.item.urlToImage}`} />
            <Card.Body>
              <Card.Title as="h4">{props.item.title}</Card.Title>
              <Card.Text>{props.item.description}</Card.Text>
              <Card.Text>{props.item.content}</Card.Text>
            </Card.Body>
          </Card>
        </Popup>
      </Card.Body>
      <Card.Footer className="text-muted">
        {props.item.publishedAt.replace(/T|Z/g, " ")}
      </Card.Footer>
    </Card>
  );
}
