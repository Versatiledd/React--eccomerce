const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { readdirSync } = require("fs");
require("dotenv").config();

const keys = require("./config/keys");

require("./routes/admin")(app);
require("./routes/auth")(app);
require("./routes/category")(app);
require("./routes/cloudinary")(app);
require("./routes/product")(app);
require("./routes/stripe")(app);
require("./routes/subCategory")(app);
require("./routes/user")(app);
// if (process.env.NODE_ENV !== "production") require("dotenv").config();
console.log("SPRAWDZAN KLUCZ ----------------> ", keys.MONGOURI);
// connect with express
const app = express();
// connect with database
mongoose
  .connect(process.env.MONGODBPRODUCTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
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

app.get("/api", (req, res) => {
  res.send("Łącze z backendem");
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on " + port);
});
