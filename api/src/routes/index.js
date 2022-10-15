const { Router } = require("express");
const router = Router();
const user = require("./user")
const operation = require("./operation")

router.use("/user", user);
router.use("/operation", operation)

module.exports = router;