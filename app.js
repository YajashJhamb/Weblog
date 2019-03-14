const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const passport = require("passport");

//Passport Config
require("./config/passport")(passport);

//Load Routes
const app = express();

app.get("/", (re, res) => {
  res.send("hello");
});

//Use Routes
app.use("/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
