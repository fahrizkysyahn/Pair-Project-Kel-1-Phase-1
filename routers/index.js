const router = require("express").Router();

const adminRouter = require("./admin");
const mainRouter = require("./main");
const emailRouter = require("./emailRoutes");
const profileRouter = require("./profileRoutes");

router.use("/admin", adminRouter);
router.use("/", mainRouter);
router.use("/", emailRouter);
router.use("/", profileRouter);

module.exports = router;