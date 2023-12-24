const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
// we r use dot env for d psk secure and we configue the path
dotenv.config({ path: "./config.env" });

require("./db/conn"); //we call the db from the conn.js
// const User = require('./model/userSchema');

app.use(express.json());

//we r link the router file
app.use(require("./router/auth"));


app.get("/about", (req, res) => {
  res.send("Hello world  from the server in the about page");
});


app.get("/contact", (req, res) => {
  res.send("Hello world from the server in the contact page");
});
app.get("/signin", (req, res) => {
  res.send("Hello world from the server in the signin page");
});

app.listen(5000, () => {
  console.log(`server is running at port no 5000`);
});
