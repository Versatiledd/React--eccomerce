const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { readdirSync } = require("fs");
require("dotenv").config();

const keys = require("./config/keys");

const app = express();

const routes = require("./routes/api");

// connect with database
mongoose
  .connect(
    "mongodb+srv://eccomerce:g1SxlpEuyC3qeRDP@cluster0.ckh9f.mongodb.net/eccomerce?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("success"))
  .catch((err) => console.log(`DB CONNECTION ERROR: ${err}`));

const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

app.use("/api", routes);

// readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on " + port);
});
