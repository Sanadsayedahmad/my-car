const users = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const { User } = require("./models/user");
const cors = require("cors");
const { Card } = require("./models/card");

//connecting to the mongo data base
mongoose
  .connect("mongodb://localhost/my-car", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

//using the cors to run the server with front end (react)
app.use(cors());

//converting all the data to json
app.use(express.json());

//routing to different paths
app.use("/api/users", users);

app.use("/api/auth", auth);

app.use("/api/cards", cards);

app.get("/", (req, res) => {
  res.send(new Date().toLocaleTimeString());
});

//route for getting all users
app.get("/allusers", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

//route for getting all cards
app.get("/allcards", async (req, res) => {
  const cards = await Card.find({});
  res.send(cards);
});

//connecting to port 3000
const port = 3000;
http.listen(port, () => console.log(`Listening on port ${port}...`));
