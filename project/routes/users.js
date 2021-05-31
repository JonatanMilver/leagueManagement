var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils");
const players_utils = require("./utils/players_utils");
const game_utils = require("./utils/game_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM Users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

/**
 * This path gets body with playerId and save this player in the favorites list of the logged-in user
 */
router.post("/favoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const player_id = req.body.playerId;
    await users_utils.markPlayerAsFavorite(user_id, player_id);
    res.status(201).send("The player successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites players that were saved by the logged-in user
 */
router.get("/favoritePlayers", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    let favorite_players = {};
    const player_ids = await users_utils.getFavoritePlayers(user_id);
    let player_ids_array = [];
    player_ids.map((element) => player_ids_array.push(element.player_id)); //extracting the players ids into array
    const results = await players_utils.getPlayersInfo(player_ids_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});


router.post("/favoriteGames", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const game_id = req.body.gameId;
    await users_utils.markGameAsFavorite(user_id, game_id);
    res.status(201).send("The game successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});


router.get("/favoriteGames", async (req, res, next) => {
  try{
    const user_id = req.session.user_id;
    const game_info = game_utils.gamesInfo(user_id);
    res.status(200).send(game_info);
  }
  catch (error) {
    next(error);
  }
});



module.exports = router;
