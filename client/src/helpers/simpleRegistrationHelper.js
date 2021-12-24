//register form validate

const getElemVal = (id) => document.getElementById(id).value;

export default function validateSimpleRegistration(
  idEmail,
  idPassword,
  idName
) {
  let errors = { email: "", password: "", name: "", iserror: "" };
  let data = {
    email: getElemVal(idEmail),
    password: getElemVal(idPassword),
    name: getElemVal(idName),
  };
  if (!data.password || data.password.length < 6) {
    errors.password = `*Password must have at least 6 characters`;
  }

  if (data.email) {
    var reges =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var res = reges.test(data.email);
    if (!res) {
      errors.email = "Please enter a valid email";
    }
  } else {
    errors.email = "Please enter a valid email";
  }
  if (!data.name || data.name.length < 2) {
    errors.name = "Name must have at leat two letters";
  }

  // check if all the errors values is empty
  if (Object.values(errors).every((o) => o === "")) {
    return data;
  } else {
    return errors;
  }
}
