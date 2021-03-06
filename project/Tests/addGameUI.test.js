const ar = require("../Domain/associationRepresentatives")
const ar_utils = require("../DataAccess/associationRepresentativeUtils")
require("dotenv").config();

const successGame =     {
    homeTeam : 1,
    awayTeam : 3,
    gameDateTime : "07/13/2021 20:30",
    field : "BS",
    refereeId : 3,
    seasonId : 1,
    leagueId : 1
}

const failGame =     {
    homeTeam : 1005,
    awayTeam : 5,
    gameDateTime : "08/21/2021 20:30",
    field : "LaLa",
    refereeId : 3,
    seasonId : 2,
    leagueId : 1
}



ar_utils.checkGamePolicy = jest.fn(async (seasonId, leagueId) => {
    if (seasonId == 1 && leagueId == 1){
        return {GamePolicyId:1};
    }
    else if(seasonId == 2 && leagueId == 1){
        return {GamePolicyId:2};
    }
    else{
        return undefined;
    }
})

ar_utils.addGame = jest.fn(async (homeTeam, awayTeam, gameDateTime, field, refereeId, seasonId) => {
    return true;
})

ar_utils.checkIfTeamExist = jest.fn(async (homeTeam) => {
    if(homeTeam == 1005){
        return false;
    }
    return true;
})

ar_utils.checkOneGamePolicy = jest.fn(async (homeTeam, awayTeam, seasonId) => {
    if(seasonId == 1)
        return true;
    return false;
})

ar_utils.checkTwoGamePolicy = jest.fn(async (homeTeam, awayTeam, seasonId) => {
    if(seasonId == 2)
        return true;
    return false;
})



//////////////////////////////UNIT/////////////////////

// unit test 20.5
test("unit test - checkIfTeamExist function", async () => {
    const response = await ar_utils.checkIfTeamExist(successGame.homeTeam).then(res => {
            return res;
        });
    expect(response).toBe(true);
})

// unit test 20.6
test("unit test - checkIfTeamExist function", async () => {
    const response = await ar_utils.checkIfTeamExist(failGame.homeTeam).then(res => {
            return res;
        });
    expect(response).toBe(false);
})


///////////////////////INTEGRATION//////////////////////////////////////////////////

//integration test! 20.7
test("integration test - checkGameAddition function", async () => {
    const response = await ar.checkGameAddition(successGame.homeTeam, successGame.awayTeam, {GamePolicyId:1}, successGame.seasonId).then(res => {
            return res;
        });
    expect(response).toBe(true);
})

//integration test 20.8
test("integration test - checkGameAddition function", async () => {
    const response = await ar.checkGameAddition(failGame.homeTeam, failGame.awayTeam, 3, failGame.seasonId).then(res => {
            return res;
        });
    expect(response).toBe(false);
})



// integration test 20.9
test("Successful game addition", async () => {
    const response = await ar.addGame(successGame.homeTeam, successGame.awayTeam, successGame.gameDateTime,
        successGame.field, successGame.refereeId, successGame.leagueId, successGame.seasonId).then(res => {
            return res;
        });
    expect(response).toBe(true);
})


// integration test 20.10
test("Unsuccessful addition - home team is not in the system.", async () => {
    const response = await ar.addGame(failGame.homeTeam, failGame.awayTeam, failGame.gameDateTime,
        failGame.field, failGame.refereeId, failGame.leagueId, failGame.seasonId).then(res => {
            return res;
        });
    expect(response).toBe(false);
})


