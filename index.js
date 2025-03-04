const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const route = require("./route");
const dbconnect = require("./config/db");
dbconnect();

//localhost:3000
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(route);

app.listen(port, () => {
  console.log(`Server is running port number ${port}`);
});
