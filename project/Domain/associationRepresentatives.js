const ap_utils = require("../DataAccess/associationRepresentativeUtils");

/*
game policies 
1 - each team plays only one match versus each other team. 
2 - each team plays two game vs each other team, home and away.
3 -
*/

/*
Domain function of route POST /addGame
main function that adds a game.
it includes the functions of checkGameAddition of this file,
checkGamePolicy and addGame from Data Access layer.
*/
async function addGame(homeTeam, awayTeam, gameDateTime, field, refereeId, leagueId, seasonId){
    //Association Representative can add game
    const checkPolicy = await ap_utils.checkGamePolicy(seasonId, leagueId);
    if(!checkPolicy)
        return false; //No policy - game not added.

    // should check the game policy here
    const canGameBeAdded = await checkGameAddition(homeTeam, awayTeam, checkPolicy, seasonId);
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

function addReferee(userID){
    // *******************TO DO TOMER*******************
    // check if user exist in users table
    // add to table referees row.
    // each row contains refereeID (Auto increment) and userID
}

function removeReferee(refereeID){
    // can remove referee from table
}

function addRefereeToSeason(refereeID, seasonID){
    // *******************TO DO TOMER*******************
    // add to table SeasonReferees row of refereeID and seasonID
}

function addLeague(){
    // can add league to system
}


exports.setGameSchedulingPolicy = setGameSchedulingPolicy;
exports.checkGameAddition = checkGameAddition //exported for testing!
exports.addGame = addGame;