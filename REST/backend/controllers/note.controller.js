const Note = require("../models/note.model");
const Folder = require("../models/folder.model");

exports.createNote = async (req, res) => {
  const data = {
    title: req.body.title,
    folder: req.body?.folder,
    content: req.body.content,
  };

  try {
    const note = await Note.create({
      user: req.user.id,
      title: data.title,
      folder: data?.folder,
      content: data.content,
    });

    if (data?.folder) {
      await Folder.findByIdAndUpdate(
        { _id: data.folder },
        { $push: { notes: note._id } }
      );
    }

    res.status(201).json({
      status: "success",
      note: note._id,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    res.status(200).json({
      status: "success",
      notes,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }

    res.status(200).json({
      status: "success",
      note,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.addNoteToFolder = async (req, res) => {
  const data = {
    folder: req.body.folder,
  };

  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        status: "error",
        message: "Note not found",
      });
    }

    const folder = await Folder.findById(data.folder);

    if (!folder) {
      return res.status(404).json({
        status: "error",
        message: "Folder not found",
      });
    }

    await Folder.findByIdAndUpdate(
      { _id: data.folder },
      { $push: { notes: req.params.id } }
    );

    await Note.findByIdAndUpdate(
      { _id: req.params.id },
      { folder: data.folder }
    );

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
