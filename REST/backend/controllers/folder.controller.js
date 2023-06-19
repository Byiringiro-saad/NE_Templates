const joi = require("joi");

//models
const Note = require("../models/note.model");
const Folder = require("../models/folder.model");

exports.createFolder = async (req, res) => {
  // #swagger.tags = ['Folder']
  const data = {
    name: req.body.name,
    color: req.body.color,
  };

  const schema = joi.object({
    name: joi.string().required(),
    color: joi.string().required(),
  });

  const { error } = schema.validate(data);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    const folder = await Folder.create({
      name: data.name,
      color: data.color,
      user: req.user.id,
    });

    res.status(201).json({
      status: "success",
      folder: folder._id,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getFolders = async (req, res) => {
  // #swagger.tags = ['Folder']
  try {
    const folders = await Folder.find({ user: req.user.id }).populate("notes");

    res.status(200).json({
      status: "success",
      folders,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getFolder = async (req, res) => {
  // #swagger.tags = ['Folder']
  try {
    const folder = await Folder.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("notes");

    if (!folder) {
      return res.status(404).json({
        status: "error",
        message: "Folder not found",
      });
    }

    res.status(200).json({
      status: "success",
      folder,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getNotes = async (req, res) => {
  // #swagger.tags = ['Folder']
  try {
    const notes = await Note.find({ user: req.user.id, folder: req.params.id });

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
