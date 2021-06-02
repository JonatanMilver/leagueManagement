const DButils = require("../../DataAccess/DButils");

async function markPlayerAsFavorite(user_id, player_id) {
  await DButils.execQuery(
    `insert into FavoritePlayers values ('${user_id}',${player_id})`
  );
}

async function getFavoritePlayers(user_id) {
  const player_ids = await DButils.execQuery(
    `select player_id from FavoritePlayers where user_id='${user_id}'`
  );
  return player_ids;
}


async function markGameAsFavorite(user_id, game_id){
  const user_games = await DButils.execQuery(
    `SELECT game_id FROM dbo.UsersFavoriteGames where user_id='${user_id}'`
  );

  if (user_games.find((game) => game.game_id == game_id)){
    throw { status: 409, message: "Game already set as a favorite"};
  }   

  await DButils.execQuery(
    `insert into UsersFavoriteGames values ('${user_id}',${game_id})`
  );
}

async function getFavoriteGames(user_id) {
  const game_ids = await DButils.execQuery(
    `select game_id from UsersFavoriteGames where user_id='${user_id}'`
  );
  return game_ids;
}

exports.markPlayerAsFavorite = markPlayerAsFavorite;
exports.getFavoritePlayers = getFavoritePlayers;
exports.markGameAsFavorite = markGameAsFavorite;
exports.getFavoriteGames = getFavoriteGames;
