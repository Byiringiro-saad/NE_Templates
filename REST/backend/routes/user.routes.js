const express = require("express");

//controller
const {
  signup,
  login,
  info,
  trash,
} = require("../controllers/user.controller");

//middleware
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/info", protect, info);
router.get("/trash", protect, trash);

module.exports = router;
