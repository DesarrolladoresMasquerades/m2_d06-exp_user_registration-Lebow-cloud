const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const saltRounds = 5;
const bcrypt = require("bcrypt");

router
  .route("/signup")

  .get((req, res, next) => {
    res.render("signup");
  })

  .post((req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check the form is NOT EMPTY
    if (!username || !password) {
      res.render("sigup", { errorMessage: "All fields are required" });
      return
    } else {
      User.findOne({ username }).then((user) => {
        if (user && user.username) {
          res.render("signup", { errorMessage: "User already exists" });
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPwd = bcrypt.hashSync(password, salt);

        User.create({ username, password: hashedPwd })
          .then((user) => res.render("profile", user))

          .catch((err) =>
            res.render("signup", { errorMessage: `Error from DB: ${err} ` })
          );
      });
    }
  });

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

module.exports = router;
