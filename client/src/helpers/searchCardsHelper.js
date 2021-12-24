import { getAllCards } from "./FetchHelper";

export default function searchCards(name, minPrice, maxPrice, callBack) {
  var cards = [];
  var filterCards = [];

  // getting all users cards
  getAllCards((data) => {
    cards = [...data];

    if (name === "" && minPrice === "" && maxPrice === "") {
      callBack(cards);
    }

    if (name && minPrice === "" && maxPrice === "") {
      filterCards = cards.filter((card) =>
        card.bizName.toLowerCase().includes(name.toLowerCase())
      );
      callBack(filterCards);
    }

    if (minPrice && name === "" && maxPrice === "") {
      filterCards = cards.filter((card) => +card.bizPrice >= +minPrice);
      callBack(filterCards);
    }

    if (maxPrice && name === "" && minPrice === "") {
      filterCards = cards.filter((card) => +card.bizPrice <= +maxPrice);
      callBack(filterCards);
    }

    if (name && minPrice && maxPrice === "") {
      filterCards = cards.filter(
        (card) =>
          +card.bizPrice >= +minPrice &&
          card.bizName.toLowerCase().includes(name.toLowerCase())
      );
      callBack(filterCards);
    }

    if (name && minPrice === "" && maxPrice) {
      filterCards = cards.filter(
        (card) =>
          +card.bizPrice <= +maxPrice &&
          card.bizName.toLowerCase().includes(name.toLowerCase())
      );
      callBack(filterCards);
    }

    if (name === "" && minPrice && maxPrice) {
      filterCards = cards.filter(
        (card) => +card.bizPrice >= +minPrice && +card.bizPrice <= +maxPrice
      );
      callBack(filterCards);
    }

    if (name && minPrice && maxPrice) {
      filterCards = cards.filter(
        (card) =>
          +card.bizPrice >= +minPrice &&
          +card.bizPrice <= +maxPrice &&
          card.bizName.toLowerCase().includes(name.toLowerCase())
      );
      callBack(filterCards);
    }
  });
}
