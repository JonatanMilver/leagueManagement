const DButils = require("./DButils");
const games_utils = require("./games_utils");
const bcrypt = require("bcryptjs");


// async function markPlayerAsFavorite(user_id, player_id) {
//   await DButils.execQuery(
//     `insert into FavoritePlayers values ('${user_id}',${player_id})`
//   );
// }

// async function getFavoritePlayers(user_id) {
//   const player_ids = await DButils.execQuery(
//     `select player_id from FavoritePlayers where user_id='${user_id}'`
//   );
//   return player_ids;
// }

/**
 * Helper function that insert favorite game (by ID) to usersFavoriteGames table
 */
async function markGameAsFavorite(user_id, game_id) {
  await DButils.execQuery(
    `INSERT INTO usersFavoriteGames values ('${user_id}',${game_id})`
  );
}


/**
 * Helper function that returns all favorites games ID's of user
 */
async function getFavoriteGames(user_id) {
  const game_ids = await DButils.execQuery(
    `SELECT gameID from usersFavoriteGames WHERE userID='${user_id}'`
  );
  return game_ids;
}

/**
 * Helper function that checks if game that matching to game_id exist in usersFavoritesGames
 */
async function checkGameExistInUsersFavorites(user_id, game_id) {
  const game_ids = await DButils.execQuery(
    `SELECT gameID from usersFavoriteGames WHERE userID='${user_id}' AND gameID='${game_id}'`
  );
  if (game_ids.length > 0) {
    throw { status: 401, message: "game already exist in user favorites" };
  }
  return game_ids;
}

/**
 * Helper function that returns a list of game preview objects according to a given game ID's list
 */
async function getGames(game_ids){
  let res = [];
  for (let i=0; i<game_ids.length; i++){
    res.push(await games_utils.getGameByID(game_ids[i].gameID, true));
  }
  return res;
}

/**
 * Function that returns a list of game preview objects according to a given game ID's list
 */
async function getUserFutureFavorites(user_id){
  const game_ids = await getFavoriteGames(user_id);
  const results = await getGames(game_ids);
  const futureFavorites = await games_utils.getFutureGames(results);
  return futureFavorites;
}

/**
 * Helper function that returns true if user exists in users table, else returns false
 */
async function checkIfUserExist(userID){
  const user = await DButils.execQuery(
    `SELECT * FROM dbo.users WHERE userID ='${userID}'`
  );
  if (user.length == 0){
    return false;
  }
  return true;
}

/**
 * Helper function that inserts representative in to associationsRepresentatives table
 */
async function addRepresentative(userID){
  const userExist = await checkIfUserExist(userID);
  if (!userExist){
    throw { status: 409, message: "There is no user with id " + userID}
  }

  const representatives = await DButils.execQuery(
    `SELECT * FROM dbo.associationRepresentatives WHERE userID ='${userID}'`
  );

  if (representatives.length == 0){
    await DButils.execQuery(
      `INSERT INTO dbo.associationRepresentatives (userID) VALUES ('${userID}')`
    );
  }
}

/**
 * Function that inserts 2 default representatives to the DB in order to allow admin's actions
 */
async function addDefultRepresentatives(){
  let hash_password = bcrypt.hashSync(
    "#admin1",
    parseInt(process.env.bcrypt_saltRounds)
  );
  
  const userOneExist = await checkIfUserExist(1);
  const userTwoExist = await checkIfUserExist(2);

  // add the new username
  if (!userOneExist){
    await DButils.execQuery(
      `INSERT INTO dbo.users (userName, hashPassword, firstName, lastName, country, email, imageUrl) VALUES ('${"adminone"}', '${hash_password}', '${"admin"}', '${"one"}', '${"Israel"}', '${"adminone@gmail.com"}', '${"./images/adminone.jpg"}')`
    );
  }

  if (!userTwoExist){
    await DButils.execQuery(
      `INSERT INTO dbo.users (userName, hashPassword, firstName, lastName, country, email, imageUrl) VALUES ('${"admintwo"}', '${hash_password}', '${"admin"}', '${"two"}', '${"Israel"}', '${"admintwo@gmail.com"}', '${"./images/admintwo.png"}')`
    );
  }

  await addRepresentative(1);
  await addRepresentative(2);
}

exports.addDefultRepresentatives = addDefultRepresentatives;
exports.markGameAsFavorite = markGameAsFavorite;
exports.getFavoriteGames = getFavoriteGames;
exports.getGames = getGames;
exports.checkGameExistInUsersFavorites = checkGameExistInUsersFavorites;
exports.getUserFutureFavorites = getUserFutureFavorites;
exports.checkIfUserExist = checkIfUserExist;
