const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

/* HOME PAGE */

router.get("/", async (req, res) => {
  console.log("session form home...", req.session);
  const { userId } = req.session;
  console.log("id", userId);
  if (req.session.id && userId) {
    const users = await User.query().select().where({ id: userId });
    const user = users[0];
    console.log("  from home", user);
    res.send(user);
  } else {
    res.send({ isAuthenticated: false });
  }
});

/* SIGNUP */

router.post("/users/signup", async (req, res) => {
  const { firstname, lastname, email, password, repeatPassword } = req.body;
  const emailPattern = /^\S+@\S+\.\S+$/; //anystring@anystring.anystring
  const emailPatternMatch = email.match(emailPattern);
  if (firstname && lastname && email && password && repeatPassword) {
    /* Data validation */
    if (firstname.length < 2) {
      return res.status(400).send({
        status: 400,
        message: "First name should have at least 2 characters",
      });
    }
    if (lastname.length < 2) {
      return res.status(400).send({
        status: 400,
        message: "Last name should have at least 2 characters",
      });
    }
    if (password.length < 7) {
      return res.status(400).send({
        status: 400,
        message: "Password should have at least 7 characters",
      });
    }
    if (password !== repeatPassword) {
      return res
        .status(400)
        .send({ status: 400, message: "Passwords did not match" });
    }
    if (!emailPatternMatch) {
      return res
        .status(400)
        .send({ status: 400, message: "Email is not in valid format" });
    }
    /* End Data validation */
    try {
      //Check if email exists
      const existingEmail = await User.query().select().where({ email });
      if (existingEmail[0]) {
        return res
          .status(400)
          .send({ status: 400, message: "This email already exists" });
      }
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          return res
            .status(500)
            .send({ status: 500, message: "internal server error" });
        }
        // Store user with hash in DB.
        const newUser = await User.query().insert({
          firstname,
          lastname,
          email,
          password: hash,
        });

        res.send({
          status: 200,
          newUser,
        });
      });
    } catch (err) {
      res.status(500).send({ status: 500, message: "DB error" });
    }
  } else {
    res.status(404).send({
      message: "Missing fields",
    });
  }
});

/* LOGIN */

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ status: 400, message: "Missing email or password" });
  }
  try {
    const user = await User.query().findOne({ email });
    if (!user) {
      return res.status(404).send({ status: 404, message: "User not found" });
    }
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) {
        return res
          .status(500)
          .send({ status: 500, message: "internal server error" });
      }
      if (!isMatch) {
        res.status(400).send({ status: 400, message: "Wrong credentials" });
      } else {
        req.session.user = user;
        console.log("login...", req.session.user);
        return res.send({
          response: user,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ status: 400, message: "Bad request" });
  }
});

/* USER PROFILE */
router.get("/users/profile/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await User.query().findOne({ id: userId });
  const response = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
  return res.send(response);
});

/* Check user session */
router.get("/users/session", (req, res) => {
  if (req.session.user) {
    return res
      .status(200)
      .send({ message: "Successfully logged in!", data: req.session.user });
  } else {
    return res.status(401).send({ message: "You must log in!" });
  }
});

/* LOG OUT */
router.get("/users/logout", (req, res) => {
  req.session.destroy();

  res.status(200).send({ message: "Successfully logged out" });
});

module.exports = router;
