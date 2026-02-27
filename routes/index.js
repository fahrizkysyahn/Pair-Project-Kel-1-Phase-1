const router = require("express").Router();

const adminRouter = require("./admin");
const mainRouter = require("./main");
const emailRouter = require("./email");

router.use("/admin", adminRouter);
router.use("/", mainRouter);
router.use("/", emailRouter);

module.exports = router;