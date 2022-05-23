const express = require("express");
const bodyParser = require("body-parser");
const placesRoutes = require("./route/places-route");
const userRoutes = require("./route/user-route");
const HttpError = require("./module/http-error");
const path = require("path");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(
  "/route/uploads/images",
  express.static(path.join("route", "uploads", "images"))
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  next();
});
app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

// Error handling
app.use((req, res, next) => {
  const error = new HttpError("could not found the route!");
  return next(error);
});
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unkonwn error occur" });
});
mongoose
  .connect(
    "your- mongodb url"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
