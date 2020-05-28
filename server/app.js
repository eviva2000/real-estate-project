const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv");
dotEnv.config();
app.use(express.json()); // to parse the body of an HTTP request
app.use(cors());
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
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

const port = process.env.PORT;
app.listen(port, (error) => {
  if (error) {
    console.log("server can not listening");
    return;
  }
  console.log(`server is listening to port ${port}`);
});
