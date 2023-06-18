const express = require("express");

//controller
const { signup, login, info } = require("../controllers/user.controller");

//middleware
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/info", protect, info);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
