const adminController = require("../controllers/adminController");
const isloggedIn = require("../middleware/auth");
const router = require("express").Router();

router.get("/delete/:courseId", isloggedIn, adminController.delete);
router.get("/courselist/add", isloggedIn, adminController.addForm);
router.post("/courselist/add", isloggedIn, adminController.postAdd);

module.exports = router;
