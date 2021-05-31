const axios = require("axios");
const LEAGUE_ID = 271;
const game_utils = require("./game_utils");

async function getLeagueDetails(user_id) {
  const league = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/leagues/${LEAGUE_ID}`,
    {
      params: {
        include: "season",
        api_token: process.env.api_token,
      },
    }
  );
  const stage = await axios.get(
    `https://soccer.sportmonks.com/api/v2.0/stages/${league.data.data.current_stage_id}`,
    {
      params: {
        api_token: process.env.api_token,
      },
    }
  );
  return {
    league_name: league.data.data.name,
    current_season_name: league.data.data.season.data.name,
    current_stage_name: stage.data.data.name,
    // next game details should come from DB
    next_game: await game_utils.getClosestGame(),
    user_favorite_games: await game_utils.gamesInfo(user_id) 
  };

}

function getLeagueID(){
  return LEAGUE_ID;
}

exports.getLeagueID = getLeagueID;
exports.getLeagueDetails = getLeagueDetails;
