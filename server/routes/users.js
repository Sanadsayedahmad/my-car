const express = require("express");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const { User, validate, validateCards } = require("../models/user");
const { Card } = require("../models/card");
const auth = require("../middleware/auth");
const router = express.Router();

//getting cards numbers and return cards array
const getCards = async (cardsArray) => {
  const cards = await Card.find({ bizNumber: { $in: cardsArray } });
  return cards;
};

//getting the favorite cards of the user
router.get("/cards", auth, async (req, res) => {
  if (!req.query.numbers)
    res.status(400).send({ message: "Missing numbers data" });

  let data = {};
  data.cards = req.query.numbers.split(",");

  const cards = await getCards(data.cards);
  res.send(cards);
});

//insert favorite cards of the user
router.patch("/cards", auth, async (req, res) => {
  const { error } = validateCards(req.body);
  if (error) res.status(400).send({ message: error.details[0].message });

  const cards = await getCards(req.body.cards);
  if (cards.length != req.body.cards.length)
    res.status(400).send({ message: "Card numbers don't match" });

  let user = await User.findById(req.user._id);
  user.cards = req.body.cards;
  user = await user.save();
  res.send(user);
});

//return the data of the connected user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//return user data by their ID
router.get("/user", async (req, res) => {
  if (!req.query.id) {
    res.status(400).send({ message: "Missing user id" });
  }

  let id = req.query.id;
  const user = await User.findById(id).select("-password");
  res.send(user);
});

//return the cards for the user
router.get("/mecards", auth, async (req, res) => {
  const cards = await Card.find({ user_id: req.user._id });
  res.send(cards);
});

//create new user include crypted pass
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({ message: "User already registered." });

  user = new User(
    _.pick(req.body, ["name", "email", "password", "biz", "cards"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
