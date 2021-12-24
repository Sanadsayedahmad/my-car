import { Card, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import "../../styles/main.css";
function CardComp({
  card,
  handleDeleteClick,
  handleEditClick,
  isMine = false,
  favCards = [],
  handleHeartClick,
  handleUnFavClick,
  handleViewMoreClick,
}) {
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  let internationalNumberFormat = new Intl.NumberFormat("en-US");
  // css style to limit the number characters appeared in the card
  let limit = {
    overflow: "hidden",
    maxWidth: "75ch",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };
  return (
    //checking if the card exsist and rendering it with the card values
    card && (
      <Card
        className="text-center"
        style={{
          width: "18rem",
          margin: "10px",
          boxShadow: "2px 2px 17px -8px #000000",
          borderRadius: "10px",
        }}
      >
        <div>
          <Card.Img variant="top" src={card.bizImage} height="250" />
        </div>
        <Card.Body style={{ boxShadow: "0 -5px 5px 1px white" }}>
          <Card.Title>{card.bizName}</Card.Title>

          <Card.Text style={limit}>{card.bizDescription}</Card.Text>
          <Card.Text
            style={{ fontWeight: "bold", color: "#457b9d", fontSize: "1.5rem" }}
          >
            {internationalNumberFormat.format(card.bizPrice)}
            <small>&nbsp; NIS</small>
          </Card.Text>
          {/* delete button */}
          {isMine ? (
            <MdDelete
              color={"red"}
              size={"2rem"}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteClick(card._id);
              }}
            ></MdDelete>
          ) : (
            ""
          )}

          {/* edit button */}
          {isMine ? (
            <AiFillEdit
              size={"2rem"}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                handleEditClick(card._id);
              }}
            ></AiFillEdit>
          ) : (
            ""
          )}
        </Card.Body>

        {/* checking if the card related for it's owner */}
        {!isMine && (
          <div className={"d-flex justify-content-between m-3"}>
            {/* view more button */}
            <Button
              onClick={() => {
                handleViewMoreClick(card);
              }}
              style={{ backgroundColor: "#E63946" }}
            >
              View more
            </Button>
            {/* adding the heart icon */}
            {!isHeartClicked && !favCards.includes(card.bizNumber) && (
              <AiOutlineHeart
                color={"red"}
                size={"2rem"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsHeartClicked(true);
                  handleHeartClick(card.bizNumber);
                }}
              ></AiOutlineHeart>
            )}
            {(isHeartClicked || favCards.includes(card.bizNumber)) && (
              <AiFillHeart
                color={"red"}
                size={"2rem"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsHeartClicked(false);
                  handleUnFavClick(card.bizNumber);
                }}
              ></AiFillHeart>
            )}
          </div>
        )}
      </Card>
    )
  );
}
export default CardComp;
