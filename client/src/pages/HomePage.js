import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/home.css";
import { getAllCards } from "../helpers/FetchHelper";
import UsersCards from "../components/cards/UsersCards";
import searchCards from "../helpers/searchCardsHelper";
import SearchModal from "../components/modals/SearchModal";
import { BsFilter } from "react-icons/bs";

function HomePage({ user }) {
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const [viewCardMode, setViewCardMode] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [carsFound, setCarsFound] = useState("");

  useEffect(() => {
    getAllCards((data) => {
      setCards(data);
      console.log(cards);
    });
  }, []);

  return (
    <div>
      {/* sell button */}
      <button
        className={"sellCircle"}
        onClick={() => history.push("./my-cards")}
      >
        <div className={"ml-10"}>sell</div>
      </button>

      <Container className={"text-center"}>
        {/* checking if the user is not logged in*/}
        {!user._id ? (
          <>
            <p className={"display-3 text-primary"}>
              welcome to
              <span style={{ fontWeight: "bold", color: "#E63946" }}>
                My-Car
              </span>
            </p>
            <p className={"display-6 text-primary"}>
              the easiest way to sell or buy any car
            </p>
            <div className={"mt-5"}>
              <Row className={"justify-content-between"}>
                <Col md={3}>
                  <Row>
                    <h4>sign up now to explore whats new</h4>
                    <div>
                      <Button
                        onClick={() => history.push("./simple-registration")}
                        variant="outline-primary"
                      >
                        sign up
                      </Button>
                    </div>
                  </Row>
                  <Row className={"mt-4"}>
                    <h4>Already registered ?</h4>
                    <div>
                      <Button
                        onClick={() => history.push("./sign-in")}
                        variant="outline-primary"
                      >
                        sign in
                      </Button>
                    </div>
                  </Row>
                </Col>
                <Col sm={6}>
                  <Image src="images/car.png" fluid />
                </Col>
              </Row>
            </div>
          </>
        ) : (
          //--------------------------------------------- if logged in
          <>
            {/* check if view card details is not clicked */}
            {!viewCardMode && (
              <>
                <p className={"display-5 text-primary"}>
                  <span style={{ fontWeight: "bold", color: "#E63946" }}>
                    My-Car
                  </span>
                </p>

                {/* filters button */}
                <Button
                  style={{
                    backgroundColor: "#457b9d",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => setModalShow(true)}
                >
                  Filters
                  <BsFilter size={"2rem"} style={{ marginLeft: "5px" }} />
                </Button>
                <SearchModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  handleSearch={handleSearch}
                />
              </>
            )}
            {searchMode && <h2>{carsFound}</h2>}
            {/* rendering the users cards */}
            <UsersCards
              cards={cards}
              setView={setViewCardMode}
              location={"/"}
            ></UsersCards>

            {/* adding back button when cards serach */}
            {searchMode && !viewCardMode && (
              <>
                <Button
                  style={{ backgroundColor: "#457b9d", marginTop: "10px" }}
                  onClick={() => {
                    setSearchMode(false);
                    getAllCards((data) => {
                      setCards(data);
                    });
                  }}
                >
                  Back
                </Button>
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );

  function handleSearch(name, minPrice, maxPrice) {
    setSearchMode(true);
    setModalShow(false);
    searchCards(name, minPrice, maxPrice, (cards) => {
      if (cards.length == 0) {
        setCarsFound("No cars found");
      } else {
        setCarsFound(`${cards.length} cars found `);
      }
      setCards(cards);
    });
  }
}
export default HomePage;
