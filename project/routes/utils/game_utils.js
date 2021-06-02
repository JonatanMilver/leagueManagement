const DButils = require("../../DataAccess/DButils");
const users_utils = require("./users_utils");
const game_utils = require("./game_utils");

async function getGameInfo(game_id){
    let game_info = await DButils.execQuery(
        `select home_team, away_team, game_date_time, field from Games where game_id='${game_id}'`
      );
    return game_info[0];
}

async function deletePastGame(game_info, user_id, game_id){
    if (game_info.length == 0 || game_info.game_date_time < Date.now()){
        await DButils.execQuery(
            `DELETE FROM UsersFavoriteGames where user_id='${user_id}' AND game_id='${game_id}'`
        );
        return false;
    }
    return true;
}


async function getClosestGame(){
    let games = await DButils.execQuery(
        `SELECT home_team, away_team, game_date_time, field from Games
        where game_date_time > GETDATE()`
    );
    games.sort(function(a,b){
        return a.game_date_time - b.game_date_time
    });
    return games[0];
}


async function gamesInfo(user_id){
    if(!user_id)
        return null;
    const game_ids = await users_utils.getFavoriteGames(user_id);
    let game_info = []
    for (const game of game_ids){
      const info = await game_utils.getGameInfo(game.game_id);
      const checkPastGame = await game_utils.deletePastGame(info, user_id, game.game_id);
      if (checkPastGame)
        game_info.push(info);
    }
    return game_info
  }

exports.getGameInfo = getGameInfo;
exports.deletePastGame = deletePastGame;
exports.getClosestGame = getClosestGame;
exports.gamesInfo = gamesInfo;