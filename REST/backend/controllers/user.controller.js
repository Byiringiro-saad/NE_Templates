const joi = require("joi");
const bcrypt = require("bcryptjs");

//models
const User = require("../models/user.model");
const Note = require("../models/note.model");

//services
const { createToken } = require("../services/user.services");

exports.signup = async (req, res) => {
  const data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(data);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = await User.create({
      email: data.email,
      username: data.username,
      password: hashedPassword,
    });

    const token = createToken({ id: user._id });

    res.status(201).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(data);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        status: "error",
        message: "Invalid password",
      });
    }

    const token = createToken({ id: user._id });

    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.info = async (req, res) => {
  //number of notes
  const notes = await Note.find({ user: req.user.id, trash: false });
  const notesCount = notes.length;

  //number of trash notes
  const trashNotes = await Note.find({ user: req.user.id, trash: true });
  const trashNotesCount = trashNotes.length;

  return res.status(200).json({
    status: "success",
    data: {
      notesCount: notesCount,
      trashNotesCount: trashNotesCount,
    },
  });
};

exports.trash = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id, trash: true });

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
