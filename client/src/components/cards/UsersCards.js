import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button, Container } from "react-bootstrap";
import { getMeData, updateFavCards } from "../../helpers/FetchHelper";
import CardComp from "./CardComp";
import ViewCardComp from "./ViewCardComp";

function UsersCards({ cards, setView = () => {}, location, noFav = "" }) {
  const history = useHistory();
  const [favCards, setFavCards] = useState([]);
  const [viewMoreMode, setViewMoreMode] = useState(false);
  const [card, setCard] = useState({});

  //fetching the user favorite cards
  useEffect(() => {
    getMeData(localStorage.getItem("token"), (data) => {
      setFavCards(data.cards);
    });
  }, []);

  return (
    <>
      <h1>{noFav}</h1>
      {/* view card details mode */}
      {viewMoreMode && (
        <>
          <ViewCardComp card={card}></ViewCardComp>
          <Button
            style={{ backgroundColor: "#457b9d" }}
            onClick={() => {
              history.push(location);
              setViewMoreMode(false);
              setView(false);
            }}
          >
            back
          </Button>
        </>
      )}

      {/* show users cards mode */}
      {!viewMoreMode && (
        <Container>
          <Row>
            {cards.map((card, index) => (
              <Col xl={3} lg={4} md={6}>
                <CardComp
                  key={index}
                  card={card}
                  isMine={false}
                  favCards={favCards}
                  // handeling add to fav click
                  handleHeartClick={(bizNumber) => {
                    addToFavs(bizNumber);
                  }}
                  // handeling unfav click
                  handleUnFavClick={(cardNumber) => {
                    unFav(cardNumber);
                  }}
                  //handeling view card details click
                  handleViewMoreClick={(card) => {
                    viewCardDetails(card);
                  }}
                ></CardComp>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );

  // adding card to favorites
  function addToFavs(bizNumber) {
    favCards.push(bizNumber);
    updateFavCards(favCards, localStorage.getItem("token"), (response) => {
      console.log(response);
    });
  }

  // removing card from favorites
  function unFav(cardNumber) {
    let cards = favCards.filter((card) => card != cardNumber);
    updateFavCards(cards, localStorage.getItem("token"), (response) => {
      console.log(response);
    });
    setFavCards(cards);
  }

  // change mode to view card details
  function viewCardDetails(card) {
    setCard(card);
    setViewMoreMode(true);
    setView(true);
    console.log(card);
  }
}

export default UsersCards;
