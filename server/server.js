import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const mysql = require("mysql2/promise");

module.exports = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "cultureplace",
  connectTimeout: 5000,
  connectionLimit: 30, //default 10
});

// create express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// db
// mongoose
//   .connect(process.env.DATABASE, {
//     userNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log("**DB CONNECTED**"))
//   .catch((err) => console.log("DB CONNECTION ERR => ", err));

// const con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "mysql",
//   database: "express_db",
// });

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
