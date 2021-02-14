const genres = require("./routes/genres");
const mongoose = require("mongoose");
const home = require("./routes/home");
const express = require("express");
var app = express();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose
  .connect("mongodb://localhost/vidly", connectionParams)
  .then(() => console.log("Connected to mongoDb Database..."))
  .catch((err) => console.log("Error: ", err.message));

app.use(express.json());

//routes management
app.use("/", home);
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server is listening on port ${port}...`);
