import { Form, Button } from "react-bootstrap";
import validateSimpleRegistration from "../../helpers/simpleRegistrationHelper";
import { toast } from "react-toastify";
import { useState } from "react";

//register function that nadleing business and simple regisreation
function SimpleRegistrationComp({
  text = "",
  clickHandler = (f) => f,
  title = "",
}) {
  const [errors, setErrors] = useState({});
  return (
    <div className={"centerForm"}>
      <div className={"formContainer"}>
        <h4>{title}</h4>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" />
            <p className={"form-text text-danger"}>{errors.email}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
            <p className={"form-text text-danger"}>{errors.password}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" />
            <p className={"form-text text-danger"}>{errors.name}</p>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              //sending form data to validation
              e.preventDefault();
              var validatioErrorOrData = validateSimpleRegistration(
                "formBasicEmail",
                "formBasicPassword",
                "formBasicName"
              );
              //cheking if there is an error
              if ("iserror" in validatioErrorOrData) {
                setErrors(validatioErrorOrData);
              } else {
                setErrors({});
                clickHandler(validatioErrorOrData);
              }
            }}
          >
            {text}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SimpleRegistrationComp;
