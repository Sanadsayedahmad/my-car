const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

//log in check
router.post("/", async (req, res) => {
  //validate data
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  //cheking email
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ message: "Invalid email or password." });

  //checking password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ message: "Invalid email or password." });

  //creting token
  res.json({ token: user.generateAuthToken() });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(req);
}

module.exports = router;
