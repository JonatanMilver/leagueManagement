

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