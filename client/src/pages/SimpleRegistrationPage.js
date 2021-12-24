import { Container } from "react-bootstrap";
import SimpleRegistrationComp from "../components/simple-registration/SimpleRegistrationComp";
import {
  getMeData,
  registerNewAccount,
  signInUser,
} from "../helpers/FetchHelper";
import { toast } from "react-toastify";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function SimpleRegistrationPage({ set, user }) {
  const [error, setError] = useState("");
  const history = useHistory();
  let pass;
  return (
    <Container className={"text-center"}>
      <p className={"text-center display-3"}>Sign Up</p>

      {/* registration form */}
      <SimpleRegistrationComp
        clickHandler={registerUser}
        text="Sign up"
        title="create new account for free"
      ></SimpleRegistrationComp>

      {/* display the server error if exists */}
      <p className="text-center text-danger mt-5">{error}</p>
    </Container>
  );

  function registerUser(data) {
    pass = data.password;
    registerNewAccount(data, (data) => {
      // if register success
      if (data._id) {
        toast("Account Created Successfully");
        //signing in the user
        signInUser({ email: data.email, password: pass }, (response) => {
          if (response.token) {
            localStorage.setItem("token", response.token);
            getMeData(response.token, (data) => {
              set(data);
            });
            history.push("/");
          } else {
            setError(response.message);
          }
        });
      } else {
        toast("Eror Acount was not created");
        setError(data.message);
      }
    });
  }
}
export default SimpleRegistrationPage;
