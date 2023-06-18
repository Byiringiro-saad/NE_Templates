const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

//routers
const userRouter = require("./routes/user.routes");
const noteRouter = require("./routes/note.routes");
const folderRouter = require("./routes/folder.routes");

const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//database
require("./features/db.feature");

//routes
app.use("/users", userRouter);
app.use("/notes", noteRouter);
app.use("/folders", folderRouter);

//error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;
