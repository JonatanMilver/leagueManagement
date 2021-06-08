const db_utils =  require('./DButils');

/*
checks season's game policy at the database.
*/
async function checkGamePolicy(seasonId, leagueId){
    const policy = await db_utils.execQuery(
        `SELECT GamePolicyId FROM Season WHERE SeasonId='${seasonId}' AND LeagueId='${leagueId}' AND GamePolicyId IS NOT NULL`
    );
    return policy[0];
}


async function checkIfTeamExist(teamId){
    const team = await db_utils.execQuery(
        `SELECT TeamId FROM Teams WHERE TeamId='${teamId}'`
    );
    if(team[0]){
        return true;
    }
    return false;
}


/*
sets season's game policy if not already set.
*/
async function setGamePolicy(seasonId, leagueId, policyId){
    await db_utils.execQuery(
        `UPDATE Season
        SET GamePolicyId='${policyId}'
        WHERE SeasonId='${seasonId}' AND LeagueId='${leagueId}'`
    );
}

async function insertReferee(userID, qualification, isHeadReferee){
    await db_utils.execQuery(
        `INSERT INTO dbo.Referees (userId, qualification, isHeadReferee) VALUES ('${userID}', '${qualification}', '${isHeadReferee}')`
    );
      const refereeID = await db_utils.execQuery(
        `SELECT refereeId FROM dbo.Referees WHERE userId='${userID}'`
      );
        
      return refereeID[0].refereeID;
}


async function checkIfRefExist(userId) {
    const refs = await db_utils.execQuery(
        "SELECT userId FROM dbo.Referees" 
    );
    if (refs.find((r) => r.userId === parseInt(userId))){
        return true;
    }
    return false;
  }

async function getUsersFromAssRepTable(){
    return db_utils.execQuery("SELECT userID FROM dbo.associationRepresentative");
}

async function addRefereeToSeason(refereeID, SeasonID){
    await db_utils.execQuery(
        `INSERT INTO dbo.SeasonReferees (RefereeId, SeasonId) VALUES ('${refereeID}', '${SeasonID}')`
    );
    return true;
}


/*
gets all games of two teams with ids team1, team2 from a specific season with id seasonId.
*/
async function getTeamsGames(team1, team2, seasonId){
    const games = await db_utils.execQuery(
        `SELECT gameId, homeTeam, awayTeam FROM Games WHERE seasonId='${seasonId}' AND 
        ((homeTeam='${team1}' AND awayTeam='${team2}') 
        OR (homeTeam='${team2}' AND awayTeam='${team1}'))`
    );
    return games;
}

/*
Checks whether both teams stand by the policy of playing one match only.
*/
async function checkOneGamePolicy(team1, team2, seasonId){
    const games = await getTeamsGames(team1, team2, seasonId);
    if(games[0]){ //If game exists in season - it can not be added again.
        return false;
    }
    return true;
}

/*
Checks whether both teams stand by the policy of playing two matches.
*/
async function checkTwoGamePolicy(team1, team2, seasonId){
    const games = await getTeamsGames(team1, team2, seasonId);
    if(games.length >= 2){
        return false;
    }
    else if(games.length == 1 && team1 === games[0].homeTeam && team2 === games[0].awayTeam){
        return false;
    }

    return true;
}

/*
Adds a new game to the database.
*/
async function addGame(homeTeam, awayTeam, gameDateTime, field, refereeId, seasonId){
    await db_utils.execQuery(
        `INSERT INTO Games (homeTeam, awayTeam, gameDateTime, field, refereeId, seasonId)
        VALUES ('${homeTeam}', '${awayTeam}', '${gameDateTime}', '${field}', '${refereeId}', '${seasonId}')`
    );
}

exports.addRefereeToSeason = addRefereeToSeason;
exports.getUsersFromAssRepTable = getUsersFromAssRepTable;
exports.checkIfRefExist = checkIfRefExist;
exports.insertReferee = insertReferee;
exports.checkGamePolicy = checkGamePolicy;
exports.setGamePolicy = setGamePolicy;
exports.checkOneGamePolicy = checkOneGamePolicy;
exports.checkTwoGamePolicy = checkTwoGamePolicy;
exports.addGame = addGame;
exports.checkIfTeamExist = checkIfTeamExist;
