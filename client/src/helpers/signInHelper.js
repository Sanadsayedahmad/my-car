//sign in validate

const getElemVal = (id) => document.getElementById(id).value;

export default function validateSignIn(idEmail, idPassword) {
  let errors = { email: "", password: "", iserror: "" };
  let data = {
    email: getElemVal(idEmail),
    password: getElemVal(idPassword),
  };
  if (!data.password || data.password.length < 6) {
    errors.password = `*Password must have at least 6 characters`;
  }

  if (data.email) {
    let reges =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let res = reges.test(data.email);
    if (!res) {
      errors.email = "Please enter a valid email";
    }
  } else {
    errors.email = "Please enter a valid email";
  }

  // check if all the errors values is empty
  if (Object.values(errors).every((o) => o === "")) {
    return data;
  } else {
    return errors;
  }
}
