//base server url
let baseUrl = "http://localhost:3000";

// register
export function registerNewAccount(data, callback) {
  let url = baseUrl + "/api/users";
  let obj = getConfigurationForPostRequest(data);

  fetch(url, obj)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

// sign in
export function signInUser(data, callback) {
  let url = baseUrl + "/api/auth";
  let obj = getConfigurationForPostRequest(data);
  fetch(url, obj)
    .then((x) => {
      return x.json();
    })
    .then((x) => {
      callback(x);
    })
    .catch((x) => {
      callback(x);
    });
}

// connected user data
export function getMeData(token, callback) {
  if (!token) return;
  let url = baseUrl + "/api/users/me";
  fetch(url, { headers: { "x-auth-token": token } })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

//card owner data
export function getUserData(id, callback) {
  let url = baseUrl + "/api/users/user/?id=" + id;

  fetch(url)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

// user cards
export function getMeCards(token, callback) {
  let url = baseUrl + "/api/users/mecards";
  fetch(url, { headers: { "x-auth-token": token } })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

// new card
export function insertNewCard(data, token, callback) {
  let url = baseUrl + "/api/cards";
  let obj = getConfigurationForPostRequest(data);
  obj.headers["x-auth-token"] = token;

  fetch(url, obj)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

// update card
export function updateCard(idToUpdate, data, token, callback) {
  let url = baseUrl + "/api/cards/" + idToUpdate;
  let obj = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  };
  obj.headers["x-auth-token"] = token;
  fetch(url, obj)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

//delete card
export function deleteCard(idToDelete, token, callback) {
  let url = baseUrl + "/api/cards/" + idToDelete;
  fetch(url, { method: "DELETE", headers: { "x-auth-token": token } })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

//getting all users data
export function getUsersData(callback) {
  let url = baseUrl + "/allusers";
  fetch(url)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

// getting all the cards of all users
export function getAllCards(callback) {
  let url = baseUrl + "/allcards";
  fetch(url)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

//update gavorite cards of the user
export function updateFavCards(cards, token, callback) {
  let url = baseUrl + "/api/users/cards";
  let cardsArr = { cards: [] };
  cardsArr.cards = cards;
  cardsArr = JSON.stringify(cardsArr);
  let obj = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: cardsArr,
  };
  obj.headers["x-auth-token"] = token;
  fetch(url, obj)
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

//get all favorite cards
export function getFavCards(cardsArr, token, callback) {
  let url = baseUrl + "/api/users/cards/?numbers=" + cardsArr;
  console.log(url);
  fetch(url, { method: "GET", headers: { "x-auth-token": token } })
    .then((x) => x.json())
    .then((x) => callback(x))
    .catch((x) => callback(x));
}

// post fetch
function getConfigurationForPostRequest(data) {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  };
}
