import { Form, Button } from "react-bootstrap";
import cardCreationHelper from "../../helpers/cardCreationHelper";
import { useState, useEffect } from "react";
import { getMeCards } from "../../helpers/FetchHelper";

function CreateCardComp({ clickHandler, cardId = "", clickEditHandler }) {
  //component for careting the card, it contain two modes: create new card and edit cards
  const [errors, setErrors] = useState({});

  //state vars that holds the card data
  const [bizName, setBizName] = useState("");
  const [bizDescription, setBizbizDescription] = useState("");
  const [bizAdderess, setBizAdderess] = useState("");
  const [bizPhone, setBizPhone] = useState("");
  const [bizImage, setBizImage] = useState("");
  const [bizPrice, setBizPrice] = useState("");

  const [image, setImage] = useState("");

  let card = {};
  let cards = [];

  //fetching the card details if exsists and setting the values
  useEffect(() => {
    if (localStorage.getItem("token"))
      getMeCards(localStorage.getItem("token"), (data) => {
        cards = data;
        if (cardId) {
          card = cards.filter((x) => x._id == cardId)[0];
          setBizName(card.bizName);
          setBizbizDescription(card.bizDescription);
          setBizAdderess(card.bizAddress);
          setBizPhone(card.bizPhone);
          setBizImage(card.bizImage);
          setBizPrice(card.bizPrice);
        }
      });
  }, []);

  return (
    <div className={"d-flex justify-content-center"}>
      <Form className={"col-md-6"}>
        <Form.Group className="mb-3" controlId="formBasicBusinessName">
          <Form.Label>Car Name</Form.Label>
          <Form.Control
            type="text"
            value={bizName}
            onChange={(e) => setBizName(e.target.value)}
          />
          <p className={"form-text text-danger"}>{errors.name}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessDescription">
          <Form.Label>Car Description</Form.Label>
          <Form.Control
            as="textarea"
            value={bizDescription}
            onChange={(e) => setBizbizDescription(e.target.value)}
          />
          <p className={"form-text text-danger"}>{errors.description}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={bizAdderess}
            onChange={(e) => setBizAdderess(e.target.value)}
          />
          <p className={"form-text text-danger"}>{errors.address}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            value={bizPhone}
            onChange={(e) => setBizPhone(e.target.value)}
          />
          <p className={"form-text text-danger"}>{errors.phone}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            value={bizPrice}
            onChange={(e) => setBizPrice(e.target.value)}
          />
          <p className={"form-text text-danger"}>{errors.price}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicBusinessImage">
          <Form.Label>Car Image URL</Form.Label>
          <Form.Control
            type="text"
            value={bizImage}
            onChange={(e) => setBizImage(e.target.value)}
          />
        </Form.Group>
        <div className="text-center">
          <p style={{ fontWeight: "bold" }}>OR</p>
        </div>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" onChange={upoladImage} />
          <p className={"form-text text-danger"}>{errors.image}</p>
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          className={"sbtn"}
          onClick={(e) => {
            //sending the data to validation
            e.preventDefault();
            let validatioErrorOrData = cardCreationHelper(
              "formBasicBusinessName",
              "formBasicBusinessDescription",
              "formBasicBusinessAddress",
              "formBasicBusinessPhone",
              "formBasicBusinessPrice",
              image,
              "formBasicBusinessImage"
            );
            console.log(validatioErrorOrData);
            if ("iserror" in validatioErrorOrData) {
              setErrors(validatioErrorOrData);
            } else {
              //edit mode
              if (cardId) {
                clickEditHandler(cardId, validatioErrorOrData);
              } else {
                //add mode
                clickHandler(validatioErrorOrData);
              }
            }
          }}
        >
          {cardId.length != 0 ? "save" : "Create Card"}
        </Button>
      </Form>
    </div>
  );

  // function to upload the images to cloudinary
  async function upoladImage(e) {
    let button = document.querySelector(".sbtn");
    button.disabled = true;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my-car");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dzqaui681/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((response) => response.json());

    setImage(data.secure_url);
    button.disabled = false;
  }
}
export default CreateCardComp;
