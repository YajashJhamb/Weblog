const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.get("/", (re, res) => {
  res.send("hello");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
