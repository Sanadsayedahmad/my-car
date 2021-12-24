import { Container, Row, Col, Button } from "react-bootstrap";
import { RiContactsLine } from "react-icons/ri";
import SellerDetailsModal from "../modals/SellerDetailsModal";
import { useState } from "react";

function ViewCardComp({ card }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Container>
      <div className={"justify-content-between"} style={{ margin: "20px" }}>
        <Row>
          <Col md={7}>
            <img
              src={card.bizImage}
              alt="car image"
              width="70%"
              height="450"
              style={{ borderRadius: "5px" }}
            />
          </Col>
          <Col md={5}>
            <h1 style={{ color: "#E63946" }}>{card.bizName}</h1>
            <h2 className={"display-6"}>Description:</h2>
            <p>{card.bizDescription}</p>
            <br />
            <h2 className={"display-6"}>Address:</h2>
            <p>{card.bizAddress}</p>
            <br />
            <h2 className={"display-6"}>Price:</h2>
            <p>
              <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                {card.bizPrice}
              </span>
              <small style={{ fontSize: "20px" }}>&nbsp; NIS</small>
            </p>
            <Button
              style={{ backgroundColor: "#457b9d", marginTop: "10px" }}
              onClick={() => setModalShow(true)}
            >
              View seller Details
              <RiContactsLine size={"2rem"}></RiContactsLine>
            </Button>
            <SellerDetailsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              card={card}
            />
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default ViewCardComp;
