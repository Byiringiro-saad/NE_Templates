const express = require("express");

//controllers
const {
  getNote,
  getNotes,
  createNote,
  addNoteToFolder,
} = require("../controllers/note.controller");

//middlewares
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", protect, getNotes);
router.get("/:id", protect, getNote);
router.post("/", protect, createNote);
router.put("/:id", protect, addNoteToFolder);

module.exports = router;
