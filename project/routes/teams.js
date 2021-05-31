var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const players_utils = require("./utils/players_utils");
const team_utils = require("./utils/team_utils");
const league_utils = require("./utils/league_utils");

router.get("/teamFullDetails/:teamId", async (req, res, next) => {
  // let team_details = [];
  try {
    const league_check = await team_utils.getTeamById(req.params.teamId);
    console.log(league_check.data.data);
    if(league_check.data.data.league && league_check.data.data.league.data.id != league_utils.getLeagueID()){
      res.send({});
      return;
    }

    const team_details = await players_utils.getPlayersByTeam(
      req.params.teamId
    );
  //   const team_details = [
  //     {
  //         "name": "Mads Hermansen",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/29/23730717.png",
  //         "position": 1,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Marvin Schwäbe",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/2/32642.png",
  //         "position": 1,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Michael Tørnes",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/26/25882.png",
  //         "position": 1,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Hjörtur Hermannsson",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/4/25540.png",
  //         "position": 2,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Anthony Jung",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/3/32515.png",
  //         "position": 2,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Joël Zakarias Kabongo",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/3/85571.png",
  //         "position": 2,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Andreas Maxsø",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/8/84168.png",
  //         "position": 2,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Sigurd Rosted",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/10/151690.png",
  //         "position": 2,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Peter Bjur",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/13/524781.png",
  //         "position": 3,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Tobias Borchgrevink Børkeeiet",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/16/153136.png",
  //         "position": 3,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Rezan Corlu",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/18/84306.png",
  //         "position": 3,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Morten Frendrup",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/7/11705287.png",
  //         "position": 3,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Simon Hedlund",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/6/35718.png",
  //         "position": 4,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Jesper Lindstrøm",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/19/22146099.png",
  //         "position": 3,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Josip Radošević",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/25/52889.png",
  //         "position": 3,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Anis Ben Slimane",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/3/37357411.png",
  //         "position": 3,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Lasse Vigen Christensen",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/2/2946.png",
  //         "position": 3,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Andreas Bruus",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/18/4969682.png",
  //         "position": 4,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Mathias Kvistgaarden",
  //         "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
  //         "position": 4,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Kevin Mensah",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/20/84020.png",
  //         "position": 4,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Mikael Uhre",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/8/84136.png",
  //         "position": 4,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Andrija Pavlović",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/24/84536.png",
  //         "position": 4,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Blás Miguel Riveros Galeano",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/26/198426.png",
  //         "position": 2,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Andreas Pyndt Andersen",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/21/26313013.png",
  //         "position": 3,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Jagvir Singh Sidhu",
  //         "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
  //         "position": 4,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Michael Lumb",
  //         "image": "https://cdn.sportmonks.com/images/soccer/players/22/24022.png",
  //         "position": 2,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Oskar Fallenius",
  //         "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
  //         "position": 4,
  //         "team_name": "Brøndby"
  //     },
  //     {
  //         "name": "Jonathan Risbjerg Ægidius",
  //         "image": "https://cdn.sportmonks.com/images/soccer/placeholder.png",
  //         "position": 1,
  //         "team_name": "Brøndby"
  //     }
  // ]
    //we should keep implementing team page.....
    const team_games = await DButils.execQuery(
      `SELECT * FROM dbo.Games
       WHERE home_team='${req.params.teamId}' 
       OR away_team='${req.params.teamId}'`
       );
    game_partition = find_past_future_games(team_games);
    res.send({team_info : team_details, past_games: game_partition.past, future_games: game_partition.future});
  } catch (error) {
    next(error);
  }
});

find_past_future_games = (team_games) => {
  past_games = [];
  future_games = [];
  team_games.map((game) => {game.game_date_time < Date.now() ?
      past_games.push(game) : future_games.push(game)})
  return {past: past_games, future: future_games};
}


router.get("/search/:teamName", async (req, res, next) => {
  try {
    const team_responses = await team_utils.getTeamByName(
      req.params.teamName
    );
    res.send(team_responses);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
