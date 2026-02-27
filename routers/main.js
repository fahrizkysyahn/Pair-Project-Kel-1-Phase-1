const router = require("express").Router();
const Controller = require("../controllers/controller");
const isloggedIn = require("../middleware/auth");

router.get("/", Controller.login);
router.post("/login", Controller.postLogin);
router.get("/register", Controller.register);
router.post("/register", Controller.postRegister);
router.get("/logout", Controller.logout);
router.get("/courselist", isloggedIn, Controller.showTable);

module.exports = router;