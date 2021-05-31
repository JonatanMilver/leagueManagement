var express = require("express");
var router = express.Router();
const DButils = require("../routes/utils/DButils");


router.post("/addAdmin", async function(req, res, next) {
    try{
      const admin =  (
        await DButils.execQuery(
        `SELECT * FROM dbo.Admins WHERE userId = '${req.session.user_id}'`
        )
      )[0];
      if(!admin){
        throw { status: 401, message: "You don't have the permissions."};
      }
      await DButils.execQuery(
        `INSERT INTO dbo.Admins (userId) VALUES
         ('${req.body.userId}')`
      );
      res.status(201).send("admin added");
  
    }
    catch (error) {
      next(error);
    }
  
  });


router.post("/addRepresentative", async function(req, res, next) {
  try{
    const admin =  (
      await DButils.execQuery(
      `SELECT * FROM dbo.Admins WHERE userId = '${req.session.user_id}'`
      )
    )[0];
    if(!admin){
      throw { status: 401, message: "You don't have the permissions."};
    }
    await DButils.execQuery(
      `INSERT INTO dbo.AssociationRepresentative (userId) VALUES
        ('${req.body.userId}')`
    );
    res.status(201).send("association representative added");
  }
  catch (error) {
    next(error);
  }

});

router.post("/addGameResult", async function(req, res, next){
  try{
    const rep =  (
      await DButils.execQuery(
      `SELECT * FROM dbo.AssociationRepresentative WHERE userId = '${req.session.user_id}'`
      )
    )[0];
    if(!rep){
      throw { status: 401, message: "You don't have Association Representative permissions."};
    }
    await DButils.execQuery(
      `UPDATE dbo.Games
       SET home_team_score = '${req.body.home_team_score}', away_team_score = '${req.body.away_team_score}'
       WHERE game_id = '${req.body.game_id}'`
    );
    res.status(201).send("game updated");
  }
  catch(error){
    next(error);
  }
})


  module.exports = router;