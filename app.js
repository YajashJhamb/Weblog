const express = require("express");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//Load User model
require("./model/User");

//Passport Config
require("./config/passport")(passport);

//Load Routes
const app = express();

//Load Keys
const keys = require("./config/keys");

//Load mongoose
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Global Vars
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", (re, res) => {
  res.send("hello");
});

//Use Routes
app.use("/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
