var express = require("express");
var apDomain = require("../Domain/associationRepresentatives");
var router = express.Router();

const DButils = require('../DataAccess/DButils');

/**
 * Authenticate all incoming requests by middleware
 */
 router.use(async function (req, res, next) {
    if (req.session && req.session.user_id) {
      DButils.execQuery("SELECT userId FROM dbo.AssociationRepresentative")
        .then((reprs) => {
          if (reprs.find((x) => x.userId === req.session.user_id)) {
            req.user_id = req.session.user_id;
            next();
          }
          else {
            throw { status: 401, message: "You don't have the right permissions"};
          }
        })
        .catch((err) => next(err));
    } else {
      res.status(401).send("You are not logged in");
    }
  });


/*
sets game policy to a season.
if a policy is already set, an error would be returned.
*/
router.post('/setGamePolicy', async (req, res, next) => {
   try{
        //TODO.
        if(req.body.seasonId && req.body.leagueId && req.body.gamePolicyId){
          const {seasonId, leagueId, gamePolicyId} = req.body;
          const policySet = await apDomain.setGameSchedulingPolicy(seasonId, leagueId, gamePolicyId);
          if(policySet){
            res.status(200).send(`Policy has been successfuly added to league: '${leagueId}', season: '${seasonId}'`);
          }
          else{
            throw {status: 409, message: "Policy is already set, can not set another policy"};
          }
        }
        else{
          throw {status: 406 , message: "Missing arguments"};
        }
   } 
   catch(error){
       next(error);
   }
});

/*
Adds a new game only if it stands by policy of the season.
If the game doesn't stand by a policy, an error would be thrown.
*/
router.post('/addGame', async (req, res, next) => {
  try{
    if(req.body.homeTeam && req.body.awayTeam && req.body.gameDateTime && req.body.field && req.body.refereeId && req.body.leagueId && req.body.seasonId){
      const {homeTeam, awayTeam, gameDateTime, field, refereeId, leagueId, seasonId} = req.body;
      const gameAdded = await apDomain.addGame(homeTeam, awayTeam, gameDateTime, field, refereeId, leagueId, seasonId);
      if(gameAdded){
        res.status(201).send("Game has been succefully added.")
      }
      else{
        throw {status: 409, message: "No game policy for this season or game doesn't stand by policy."}
      }
    }
    else{
      throw{status: 406, message: "Missing arguments."}
    }
  }
  catch(error){
    next(error);
  }
});



module.exports = router;