const router = require("express").Router();
const EmailController = require("../controllers/emailController");
const isloggedIn = require("../middleware/auth");

router.get("/email", isloggedIn, EmailController.showForm);
router.post("/email", isloggedIn, EmailController.sendEmail);

module.exports = router;