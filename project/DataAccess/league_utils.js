const DButils = require("./DButils");


async function checkIfSeasonExist(seasonID){
    const season = await DButils.execQuery(
        `select seasonId from season where seasonId='${seasonID}'`
      );
    if (season.length > 0){
        return true;
    }
    return false;
}

async function checkIfRefInSeason(refereeID, SeasonID){
    const refInSeason = await DButils.execQuery(
        `select * from SeasonReferees where SeasonId='${SeasonID}' AND RefereeId='${refereeID}' `
      );
    if (refInSeason.length > 0){
        return true;
    }
    return false;
}

exports.checkIfRefInSeason = checkIfRefInSeason;
exports.checkIfSeasonExist = checkIfSeasonExist;