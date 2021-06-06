var express = require("express");
var userDomain = require("../Domain/user");
var DButils = require("../DataAccess/DButils");
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
        parseInt("2")
      );
      req.body.password = hash_password;
  
      // add the new username
      await DButils.execQuery(
        `INSERT INTO dbo.Users (username, firstName, lastName, pswd, email) VALUES
         ('${req.body.username}', '${req.body.firstName}', '${req.body.lastName}', '${hash_password}', '${req.body.email}')`
      );
      res.status(201).send("user created");
    } catch (error) {
      next(error);
    }
  });

router.post("/Login", async (req, res, next) => {
    try {
      if(!req.body.username || !req.body.password){
        throw{status: 409, message: "Missing arguments"};
      }
      const user = await userDomain.logInUser(req.body.username, req.body.password);
  
      // check that username exists & the password is correct
    //   if (!user || !bcrypt.compareSync(req.body.password, user.pswd)) {
      if (!user) {
        throw { status: 401, message: "Username or Password incorrect" };
        // res.status(401).send("Username or Password incorrect");
        // return
      }
  
      // Set cookie
      req.session.user_id = user.userId;
  
      // return cookie
      res.status(200).send("login succeeded");
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;