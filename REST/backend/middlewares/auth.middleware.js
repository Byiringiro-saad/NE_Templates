//auth middleware
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      //Bearer 123456789
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "You are not logged in",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User no longer exists",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: err.message,
    });
  }
};
