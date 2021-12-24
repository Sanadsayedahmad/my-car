import { Container } from "react-bootstrap";
import UsersCards from "../components/cards/UsersCards";
import { useState, useEffect } from "react";
import { getFavCards, getMeData } from "../helpers/FetchHelper";

function MyFavCardsPage() {
  const [cards, setCards] = useState([]);
  const [noFav, setNoFav] = useState("");

  // fetching user favorite cards
  useEffect(() => {
    getMeData(localStorage.getItem("token"), (data) => {
      if (data.cards.length > 0) {
        getFavCards(data.cards, localStorage.getItem("token"), (data) => {
          setCards(data);
        });
      } else {
        setNoFav("you favorite list is empty");
      }
    });
  }, []);

  return (
    <Container className={"text-center"}>
      {/* display the user favorite cards */}
      <UsersCards
        cards={cards}
        location={"/my-fav-cards"}
        noFav={noFav}
      ></UsersCards>
    </Container>
  );
}

export default MyFavCardsPage;
