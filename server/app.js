const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const cors = require("cors");
const dotEnv = require("dotenv");
dotEnv.config();
app.use(express.json()); // to parse the body of an HTTP request
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:9090");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});
app.use(
  session({
    name: "sid",
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);
/*  Setting up database */
const Knex = require("knex");
const knexFile = require("./knexfile");
// we instanciate Knex library to have a connection
const knex = Knex(knexFile.development); // knex is established connection to our DB. inside (knexFile.development) we have connection info

const { Model } = require("objection");
/* Give the knex instance to objection. */
Model.knex(knex);

/* **********  Routes ************* */

const userRoute = require("./routes/user");
app.use(userRoute);

//Serving static files
app.use("/", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 9090;
app.listen(port, (error) => {
  if (error) {
    console.log("server can not listening");
    return;
  }
  console.log(`server is listening to port ${port}`);
});
