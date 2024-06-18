// backend/routes/index.js
const express = require('express');
const userRouter = require("./User");
const accountRouter = require("./account")

const router = express.Router();

router.use("/User", userRouter)
router.use("/account", accountRouter)

module.exports = router;