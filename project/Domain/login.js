var express = require("express");
var authAccess = require("../DataAccess/authAccess");
var router = express.Router();
var bcrypt = require("bcryptjs")

router.post("/Register", async (req, res, next) => {
    try {
      // parameters exists
      // valid parameters
      // username exists
      const users = await DButils.execQuery(
        "SELECT username FROM dbo.Users"
      );
  
      if (users.find((x) => x.username === req.body.username))
        throw { status: 409, message: "Username taken" };
  
      //hash the password
      let hash_password = bcrypt.hashSync(
        req.body.password,
        parseInt(process.env.bcrypt_saltRounds)
      );
      req.body.password = hash_password;
  
      // add the new username
      await DButils.execQuery(
        `INSERT INTO dbo.Users (username, first_name, last_name, pswd, email) VALUES
         ('${req.body.username}', '${req.body.first_name}', '${req.body.last_name}', '${hash_password}', '${req.body.email}')`
      );
      res.status(201).send("user created");
    } catch (error) {
      next(error);
    }
  });

router.post("/Login", async (req, res, next) => {
    try {
      const user = await authAccess.getUserByUserName(req.body.username);
  
      // check that username exists & the password is correct
    //   if (!user || !bcrypt.compareSync(req.body.password, user.pswd)) {
      if (!user) {
        // throw { status: 401, message: "Username or Password incorrect" };
        res.status(401).send("Username or Password incorrect");
        return
      }
  
      // Set cookie
      req.session.user_id = user.user_id;
  
      // return cookie
      res.status(200).send("login succeeded");
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;