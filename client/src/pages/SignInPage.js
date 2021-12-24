import { signInUser } from "../helpers/FetchHelper";
import { Container } from "react-bootstrap";
import SignInComp from "../components/sign-in/SignInComp";
import { toast } from "react-toastify";
import { getMeData } from "../helpers/FetchHelper";
import { useHistory } from "react-router-dom";
import { useState } from "react";
function SignInPage({ set }) {
  const history = useHistory();
  const [error, setError] = useState("");
  return (
    <Container>
      <p className="text-center display-3">Sign In</p>

      {/* sign in form */}
      <SignInComp clickHandler={signIn}></SignInComp>

      {/* display the server error if exists */}
      <p className="text-center text-danger mt-5">{error}</p>
    </Container>
  );

  function signIn(data) {
    signInUser(data, (response) => {
      //check is sign in successful and setting the token
      if (response.token) {
        localStorage.setItem("token", response.token);
        //getting user data
        getMeData(response.token, (data) => {
          set(data);
        });
        history.push("/");
      } else {
        console.log(response.message);
        setError(response.message);
      }
    });
  }
}
export default SignInPage;
