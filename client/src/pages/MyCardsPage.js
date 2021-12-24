import { insertNewCard, updateCard } from "../helpers/FetchHelper";
import { Container, Button } from "react-bootstrap";
import MyCardsComp from "../components/cards/MyCardsComp";
import CreateCardComp from "../components/cards/CreateCardComp";
import { useState } from "react";
function MyCardsPage({ user }) {
  const [isAddMode, setAddMode] = useState(false);
  const [cardId, setCardId] = useState("");
  return (
    <Container className={"text-center"}>
      {/* check if not on add new card mode */}
      {!isAddMode && (
        <>
          {/* create new card button */}
          <div className={"text-center"}>
            <Button
              className="btn btn-success"
              onClick={() => {
                setCardId("");
                setAddMode(true);
              }}
            >
              Create New car card
            </Button>
          </div>
          {/* displaying the user cards */}
          <MyCardsComp
            handleClick={(id) => {
              setAddMode(true);
              console.log(id);
              setCardId(id);
            }}
            isMine={true}
          ></MyCardsComp>
          <br></br>
        </>
      )}

      {/* add new card mode */}
      {isAddMode && (
        <>
          {/* card creation form */}
          <CreateCardComp
            clickHandler={insertCard}
            clickEditHandler={updateCardFunc}
            cardId={cardId}
          ></CreateCardComp>
          <Button
            style={{ marginTop: "10px" }}
            onClick={() => setAddMode(false)}
          >
            Back
          </Button>
        </>
      )}
    </Container>
  );

  //insert new card
  function insertCard(data) {
    insertNewCard(data, localStorage.getItem("token"), () => {
      setAddMode(false);
    });
  }

  //update card
  function updateCardFunc(id, data) {
    updateCard(id, data, localStorage.getItem("token"), () => {
      setAddMode(false);
    });
  }
}
export default MyCardsPage;
