const express = require("express");

//controllers
const {
  getNotes,
  getFolder,
  getFolders,
  createFolder,
} = require("../controllers/folder.controller");

//middlewares
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", protect, getFolders);
router.get("/:id", protect, getFolder);
router.post("/", protect, createFolder);
router.get("/:id/notes", protect, getNotes);

module.exports = router;
