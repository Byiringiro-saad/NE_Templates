const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

exports.createToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
};
