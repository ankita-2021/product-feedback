const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());

try {
  mongoose.connect(config.mongoURI, () => {
    console.log("connected to database");
  });
  app.use(cors());
  app.use(bodyParser.json());
  app.use("/posts", require("./routes/posts"));

  app.get("/", (req, res) => {
    res.send("Welcome to Home Feedback app");
  });
} catch (error) {
  res.json({ message: error });
}

app.listen(8080, () => {
  console.log("Server is listening successfully");
});
