import { Modal, Button, Row, Col, Form } from "react-bootstrap";

function SearchModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cars Filter
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            id="search"
            placeholder="Enter brand name or model for search"
            style={{ border: "2px solid #E63946" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Row>
            <Col>
              <Form.Control
                id="minPrice"
                placeholder="min"
                style={{ border: "2px solid #E63946" }}
              />
            </Col>
            <Col>
              <Form.Control
                id="maxPrice"
                placeholder="max"
                style={{ border: "2px solid #E63946" }}
              />
            </Col>
          </Row>
        </Form.Group>
        <div className={"text-center"}>
          <Button
            style={{ backgroundColor: "#457b9d", marginTop: "10px" }}
            onClick={search}
          >
            search
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );

  function search() {
    let name = document.getElementById("search").value;
    let minPrice = document.getElementById("minPrice").value;
    let maxPrice = document.getElementById("maxPrice").value;

    props.handleSearch(name, minPrice, maxPrice);
  }
}

export default SearchModal;
