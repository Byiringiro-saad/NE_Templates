const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trash: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
