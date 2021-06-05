const users_utils = require("../DataAccess/users_utils");
const associationRepresentativesUtils = require("../DataAccess/associationRepresentativeUtils")
const league_utils = require("../DataAccess/league_utils")
var bcrypt = require("bcryptjs")


function addGame(){
    //Association Representative can add game
}

function replyTeamRequest(){
    //Association Representative reply team owner request to open a team
}

function addSeasonToLeague(seasonID, leagueID){

}

function addTeamToSeason(seasonID, teamID){
    // add teamID 
}

function setGameSchedulingPolicy(seasonID){
    // *******************TO DO YONY*******************
    // get policies from table and add to season.
    // check first if season already have policy.
}

function setGameScoringPolicy(){
    // can set score policy
}

async function addReferee(username, qualification, isHeadReferee){
    const user = await users_utils.checkIfUserExist(username);
    if (!user){
        throw { status: 404, message: "User not found"};
    }
    const ifRefExist = await associationRepresentativesUtils.checkIfRefExist(user.userId);
    if (ifRefExist){
        throw { status: 409, message: "Referee already exist"};
    }

    refID = await associationRepresentativesUtils.insertReferee(user.userId, qualification, isHeadReferee);
    return refID;
}

function removeReferee(refereeID){
    // can remove referee from table
}

async function addRefereeToSeason(refereeID, seasonID){
    // add to table SeasonReferees row of refereeID and seasonID
    const ifRefExist = await associationRepresentativesUtils.checkIfRefExist(refereeID);
    if (!ifRefExist){
        throw { status: 404, message: "Referee Not Exist"};
    }
    const ifSeasonExist = await league_utils.checkIfSeasonExist(seasonID);
    if (!ifSeasonExist){
        throw { status: 404, message: "Season Not Found"};
    }
    const ifRefalreadyInSeason = await league_utils.checkIfRefInSeason(refereeID, seasonID);
    if (ifRefalreadyInSeason){
        throw { status: 409, message: "The referee already in this season"};
    }
    return await associationRepresentativesUtils.addRefereeToSeason(refereeID, seasonID);
}

function addLeague(){
    // can add league to system
}

function getUsersFromAssRepTable(){
    return associationRepresentativesUtils.getUsersFromAssRepTable();
}

async function registerReferee(username, password, firstName, lastName, country, email, image){
    const user = await users_utils.checkIfUserExist(username);
    if (user){
        throw { status: 400, message: "User already exist"};
    }
    //hash the password
    let hash_password = bcrypt.hashSync(
        password,
        parseInt("2")
      );

    return await associationRepresentativesUtils.registerReferee(username, hash_password, firstName, lastName, country, email, image);
}

exports.addRefereeToSeason = addRefereeToSeason;
exports.registerReferee = registerReferee;
exports.getUsersFromAssRepTable = getUsersFromAssRepTable;
exports.addReferee = addReferee;