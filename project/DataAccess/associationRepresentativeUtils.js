const DButils =  require('./DButils');

async function checkGamePolicy(){

}

async function insertReferee(userID, qualification, isHeadReferee){
    // TODO - Tomer
    await DButils.execQuery(
        `INSERT INTO dbo.Referees (userId, qualification, isHeadReferee) VALUES ('${userID}', '${qualification}', '${isHeadReferee}')`
    );
      const refereeID = await DButils.execQuery(
        `SELECT refereeId FROM dbo.Referees WHERE userId='${userID}'`
      );
        
      return refereeID[0].refereeID;
}

async function checkIfRefExist(userId) {
    const refs = await DButils.execQuery(
        "SELECT userId FROM dbo.Referees" 
    );
    if (refs.find((r) => r.userId === parseInt(userId))){
        return true;
    }
    return false;
  }

async function getUsersFromAssRepTable(){
    return DButils.execQuery("SELECT userID FROM dbo.associationRepresentatives");
}

async function addRefereeToSeason(refereeID, SeasonID){
    await DButils.execQuery(
        `INSERT INTO dbo.SeasonReferees (RefereeId, SeasonId) VALUES ('${refereeID}', '${SeasonID}')`
    );
    return true;
}

async function registerRefereeAsUser(username, password, firstName, lastName, country, email, image){
    await DButils.execQuery(
        `INSERT INTO dbo.Users (username, firstName, lastName, country, pswd, email, imgUrl) VALUES ('${username}', '${firstName}', '${lastName}', '${country}', '${password}', '${email}', '${image}')`
    );
    return true;
}

exports.registerReferee = registerRefereeAsUser;
exports.addRefereeToSeason = addRefereeToSeason;
exports.getUsersFromAssRepTable = getUsersFromAssRepTable;
exports.checkIfRefExist = checkIfRefExist;
exports.insertReferee = insertReferee;