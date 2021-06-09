const users_utils = require("../DataAccess/users_utils");
const associationRepresentativesUtils = require("../DataAccess/associationRepresentativeUtils")
const league_utils = require("../DataAccess/league_utils")
var bcrypt = require("bcryptjs")
const ap_utils = require("../DataAccess/associationRepresentativeUtils");

// inherits systemRole


/*
game policies 
1 - each team plays only one match versus each other team. 
2 - each team plays two game vs each other team, home and away.
*/

/*
Domain function of route POST /addGame
main function that adds a game.
it includes the functions of checkGameAddition of this file,
checkGamePolicy and addGame from Data Access layer.
*/
async function addGame(homeTeam, awayTeam, gameDateTime, field, refereeId, leagueId, seasonId){
    if((typeof homeTeam) != 'number' || (typeof awayTeam) != 'number' || isNaN(Date.parse(gameDateTime)) 
    || (typeof field) != 'string' || (typeof refereeId) != 'number' || (typeof seasonId) != 'number'){
        return false;
    }
    //Association Representative can add game
    const checkPolicy = await ap_utils.checkGamePolicy(seasonId, leagueId);
    if(!checkPolicy)
        return false; //No policy - game not added.

    // should check the game policy here
    const canGameBeAdded = await checkGameAddition(homeTeam, awayTeam, checkPolicy, seasonId);
    const homeTeamInDB = await ap_utils.checkIfTeamExist(homeTeam);
    const awayTeamInDB = await ap_utils.checkIfTeamExist(awayTeam);
    if(!homeTeamInDB || !awayTeamInDB){
        return false; //One of the teams doesn't exist in the database.
    }
    // if game stands at the policy, add it to db
    if(canGameBeAdded){
        await ap_utils.addGame(homeTeam, awayTeam, gameDateTime, field, refereeId, seasonId);
        return true;
    }
    // else, return false - game doesn't stand by policy.
    else{
        return false;
    }
    
}

/*
An helper function that checks whether a game stands by season's games policy.
*/
async function checkGameAddition(homeTeam, awayTeam, checkPolicy, seasonId){
    let answer = false;
    switch(checkPolicy.GamePolicyId){
        case 1: //For policy 1 - check it's rules.
            answer = await ap_utils.checkOneGamePolicy(homeTeam, awayTeam, seasonId);
            // console.log(answer)
            break;
        case 2: //For policy 2 - check it's rules.
            answer = await ap_utils.checkTwoGamePolicy(homeTeam, awayTeam, seasonId);
            break;
        default:
            break;
    
    }
    return answer;
}


function replyTeamRequest(){
    //Association Representative reply team owner request to open a team
}

function addSeasonToLeague(seasonID, leagueID){

}

function addTeamToSeason(seasonID, teamID){
    // add teamID 
}


/*
Domain function of the route  POST /setGamePolicy
*/
async function setGameSchedulingPolicy(seasonId, leagueId, policyId){
    // get policies from table and add to season.
    // check first if season already have policy.
    const checkPolicy = await ap_utils.checkGamePolicy(seasonId, leagueId);
    if(checkPolicy){
        return false; //Policy has already been set to this season.
    }
        
    await ap_utils.setGamePolicy(seasonId, leagueId, policyId);
    return true;

}

// setGameSchedulingPolicy(2,1,2)

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
        throw {status: 409, message: "Referee already exist"};
    }

    const refID = await associationRepresentativesUtils.insertReferee(user.userId, qualification, isHeadReferee);
    return refID;
}

function removeReferee(refereeID){
    // can remove referee from table
}

async function addRefereeToSeason(refereeID, seasonID){
    // add to table SeasonReferees row of refereeID and seasonID
    const ifRefExist = await associationRepresentativesUtils.checkIfRefExist(refereeID);
    if (!ifRefExist){
        throw {status: 404, message: "Referee Not Exist"};
    }
    const ifSeasonExist = await league_utils.checkIfSeasonExist(seasonID);
    if (!ifSeasonExist){
        throw {status: 404, message: "Season Not Found"};
    }
    const ifRefalreadyInSeason = await league_utils.checkIfRefInSeason(refereeID, seasonID);
    if (ifRefalreadyInSeason){
        throw { status: 409, message: "The referee already in this season"};
    }
    const res = await associationRepresentativesUtils.addRefereeToSeason(refereeID, seasonID);
    return res;
}

function addLeague(){
    // can add league to system
}

async function getUsersFromAssRepTable(){
    return await associationRepresentativesUtils.getUsersFromAssRepTable();
}


exports.addRefereeToSeason = addRefereeToSeason;
exports.getUsersFromAssRepTable = getUsersFromAssRepTable;
exports.addReferee = addReferee;
exports.setGameSchedulingPolicy = setGameSchedulingPolicy;
exports.checkGameAddition = checkGameAddition //exported for testing!
exports.addGame = addGame;

