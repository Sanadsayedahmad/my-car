import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { getMeCards, deleteCard } from "../../helpers/FetchHelper";
import CardComp from "./CardComp";
function MyCardsComp({ handleClick, isMine }) {
  // fetching the user cards
  const [cards, setCards] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("token"))
      getMeCards(localStorage.getItem("token"), (data) => {
        setCards(data);
      });
  }, []);

  //rendering all user cards
  if (cards.length == 0) {
    return <h1>you have no cards</h1>;
  } else {
    return (
      <Row>
        {cards.map((c) => (
          <Col xl={3} lg={4} md={6} sm={12}>
            <CardComp
              // handeling delete click
              handleDeleteClick={(id) => {
                if (
                  window.confirm("are you sure you want to delete this card ? ")
                ) {
                  deleteCard(id, localStorage.getItem("token"), (card) => {
                    setCards(cards.filter((x) => x._id != id));
                  });
                }
              }}
              card={c}
              isMine={isMine}
              //handeling edit click
              handleEditClick={(id) => {
                handleClick(id);
              }}
            ></CardComp>
          </Col>
        ))}
      </Row>
    );
  }
}
export default MyCardsComp;
