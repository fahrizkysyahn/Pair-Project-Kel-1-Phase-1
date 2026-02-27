require("dotenv").config(); // ← tambahkan ini di paling atas!
const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const router = require("./routers/index");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "kepo",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});