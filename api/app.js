var createError = require("http-errors");
const dotenv = require("dotenv");
require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();

// view engine setup. Required by Express to be able to render something, even with errors. Can be html, vue, pug. To use rendered pages, create a views folder under api and put your files there. Also npm install pug, vue, react, etc for server-side rendering.
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
var allowedOrigins = [
  "http://localhost:3005",
  "http://localhost:1235",
  "http://134.209.3.13",
  "http://134.209.3.13:5000",
  "http://134.209.3.13:8000",
];
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// cors settings for dev and production

// -- DEFINE ROUTES
const index = require("./routes/index");
app.use("/", index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  // send the error
  res.send({
    message: err.message,
    error: err,
  });
  return;
});

module.exports = app;
