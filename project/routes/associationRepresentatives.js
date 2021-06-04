var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users = require("./utils/users_utils");
const teams_utils = require("./utils/teams_utils")
const games_utils = require("./utils/games_utils")


/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT userID FROM dbo.associationRepresentatives")
      .then((reprs) => {
        if (reprs.find((x) => x.userID === req.session.user_id)) {
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

router.post("/addReferee", async (req, res, next) => {
    // add check if the user that adds the referee is admin
    try {
        const {userID, qualification} = req.body;

        const userExist = await users.checkIfUserExist(userID);
        if (!userExist){
          throw { status: 409, message: "There is no user with id " + userID}
        }
        const refs = await DButils.execQuery(
            "SELECT userID FROM dbo.referees" 
        );

        if (refs.find((r) => r.userID === parseInt(userID))){
            throw { status: 409, message: "referee already exist"}
        }
        await DButils.execQuery(
          `INSERT INTO dbo.referees (userID, qualification) VALUES ('${userID}', '${qualification}')`
        );

        const refereeID = await DButils.execQuery(
          `SELECT refereeID FROM dbo.referees WHERE userID='${userID}'`
        );
            
        res.status(201).send("referee created successfully, The referee ID is " + refereeID[0].refereeID);
    } 
    catch (error) {
      next(error);
    }
});

router.post("/addGame", async (req, res, next) => {
  try {
      const games = await DButils.execQuery(
          "SELECT CONVERT(Char(16), gameDateTime ,20) AS gameDateTime , homeTeamID, awayTeamID FROM dbo.games" 
      );
      
      const {gameDateTime, homeTeam, awayTeam, stadium, refereeID} = req.body;
      const validHomeTeam = await teams_utils.checkValidLeague(homeTeam);
      const validAwayTeam = await teams_utils.checkValidLeague(awayTeam);

      if (!validHomeTeam){
          throw { status: 400, message: "homeTeam doesn't belong to SUPERLEAGUE"};
      }

      else if (!validAwayTeam){
          throw { status: 400, message: "awayTeam doesn't belong to SUPERLEAGUE"};
      }

      if (homeTeam === awayTeam){
          throw { status: 400, message: "Team can't play against itself"};
      }

      // check if need to check that home is not in away team becuase we dont that team will have more than 1 game per day
      if (games.find((g) => (new Date(g.gameDateTime).getTime()===new Date(gameDateTime).getTime() && (g.homeTeamID === parseInt(homeTeam) || g.awayTeamID === parseInt(awayTeam))))){
          throw { status: 409, message: "one or both teams already play in another game on this date"}
      }

      if (! await games_utils.isValidReferee(refereeID)){
          throw { status: 409, message: "Any game must have a legal regeree from referees table" };
      }

      await DButils.execQuery(
        `INSERT INTO dbo.games (gameDateTime, homeTeamID, awayTeamID, stadium, refereeID) VALUES ('${gameDateTime}', '${homeTeam}', '${awayTeam}', '${stadium}', '${refereeID}')`
      );
      
      res.status(201).send("The game successfully saved in DataBase");
  } 
  catch (error) {
    next(error);
  }
});

// getReferee


// representitive
router.get("/allRepresentatives", async (req, res, next) => {
  try {
    const representatives = await DButils.execQuery(
        "SELECT representativeID FROM dbo.associationRepresentatives" 
    );
    res.status(200).send(representatives);
  }
  catch (error) {
      next(error);
    }
});

module.exports = router;