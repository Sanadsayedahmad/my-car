import validateSignIn from "../../helpers/signInHelper";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";

function SignInComp({ clickHandler = (f) => f }) {
  const [errors, setErrors] = useState({});
  return (
    <div className={"centerForm"}>
      <div className={"formContainer"}>
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
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => {
              //sending the data to validation
              e.preventDefault();
              let errorOrData = validateSignIn(
                "formBasicEmail",
                "formBasicPassword"
              );
              //cehcking if there is an error
              if ("iserror" in errorOrData) {
                setErrors(errorOrData);
              } else {
                setErrors({});
                clickHandler(errorOrData);
              }
            }}
          >
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default SignInComp;
