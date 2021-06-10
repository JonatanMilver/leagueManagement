var express = require("express");
var userDomain = require("../Domain/user");
var DButils = require("../DataAccess/DButils");
var router = express.Router();
var bcrypt = require("bcryptjs")



/**
 * Register a new user to the system.
 * can be used by Association Representative to create a user and then appoint him to referee
 */
 router.post("/registerUser", async (req, res, next) => {
  try{
      const {username, password, firstName, lastName, email} = req.body;
      if (username == undefined || password == undefined || firstName == undefined || lastName == undefined || email == undefined){
          throw {status: 400, message: "Missing one or more parameters"};
      }
      const suc = await userDomain.registerUser(username, password, firstName, lastName, email);
      if (suc){
          res.status(201).send("User created successfully");
      }
  }
  catch(error){
      next(error);
  }
})


/*
* Login to the system
*/
router.post("/Login", async (req, res, next) => {
    try {
      if(!req.body.username || !req.body.password){
        throw{status: 409, message: "Missing arguments"};
      }
      const user = await userDomain.logInUser(req.body.username, req.body.password);
  
      // check that username exists & the password is correct
      if (!user) {
        throw { status: 401, message: "Username or Password incorrect" };
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