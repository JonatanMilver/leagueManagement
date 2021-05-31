var express = require("express");
var router = express.Router();
const league_utils = require("./utils/league_utils");

router.get("/getDetails", async (req, res, next) => {
  try {
    const user_id = req.session.user_id;
    const league_details = await league_utils.getLeagueDetails(user_id);
    res.send(league_details);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
