const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const router = require("./routers/index");
const isloggedIn = require("./middleware/auth");
const Controller = require("./controllers/controller");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "kepo",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(router);
app.get("/", Controller.login);
app.post("/login", Controller.postLogin);

app.get("/register", Controller.register);
app.post("/register", Controller.postRegister);
app.get("/logout", Controller.logout);
app.get("/courselist", isloggedIn, Controller.showTable);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = router;
