const router = require("express").Router();
const ProfileController = require("../controllers/profileController");
const isloggedIn = require("../middleware/auth");

router.get("/profile", isloggedIn, ProfileController.showProfile);
router.get("/profile/edit", isloggedIn, ProfileController.editForm);
router.post("/profile/edit", isloggedIn, ProfileController.postEdit);

module.exports = router;