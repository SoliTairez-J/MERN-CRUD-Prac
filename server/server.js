const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs");

//import routes
// const authRoute = require("./routes/auth");
// const personRoute = require("./routes/person");

//app
const app = express();

//connect DB
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECT ERROR", err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());

//routes
// app.use("/api", authRoute);
// app.use("/api", personRoute);
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Server is running on port", port));
