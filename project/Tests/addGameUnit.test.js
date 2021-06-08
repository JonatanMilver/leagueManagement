const ar = require("../Domain/associationRepresentatives")
const ar_utils = require("../DataAccess/associationRepresentativeUtils")



// import {addGame} from 'associationRepresentative'

const dummyGames = [
    {
        homeTeam : 1,
        awayTeam : 2,
        gameDateTime : "02/03/2021 19:30",
        field : "BS",
        refereeId : 3,
        seasonId : 2,
        leagueId : 1
    },
    {
        homeTeam : 3,
        awayTeam : 4,
        gameDateTime : "02/03/2021 19:30",
        field : "BS",
        refereeId : 3,
        seasonId : 2,
        leagueId : 1
    }
]

const successGame =     {
    homeTeam : 6,
    awayTeam : 4,
    gameDateTime : "02/03/2021 19:30",
    field : "BS",
    refereeId : 3,
    seasonId : 3,
    leagueId : 1
}

const failGame =     {
    homeTeam : 1005,
    awayTeam : 5,
    gameDateTime : "08/21/2021 20:30",
    field : "LaLa",
    refereeId : 3,
    seasonId : 3,
    leagueId : 1
}


ar_utils.checkGamePolicy = jest.fn(async (seasonId, leagueId) => {
    if (seasonId == 2 && leagueId == 1){
        return {GamePolicyId:1};
    }
    else if(seasonId == 3 && leagueId == 1){
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

//////////////////// Gal ////////////////////////
//integration test/ unit?
test("integration test - checkGameAddition function", async () => {
    const response = await ar.checkGameAddition(successGame.homeTeam, successGame.awayTeam, 1, successGame.seasonId).then(res => {
            return res;
        });
    expect(response).toBe(true);
})

//integration test
test("integration test - checkGameAddition function", async () => {
    const response = await ar.checkGameAddition(failGame.homeTeam, failGame.awayTeam, 3, failGame.seasonId).then(res => {
            return res;
        });
    expect(response).toBe(false);
})

// unit test
test("unit test - checkIfTeamExist function", async () => {
    const response = await ar.checkIfTeamExist(successGame.homeTeam).then(res => {
            return res;
        });
    expect(response).toBe(true);
})

// unit test
test("unit test - checkIfTeamExist function", async () => {
    const response = await ar.checkIfTeamExist(failGame.awayTeam).then(res => {
            return res;
        });
    expect(response).toBe(false);
})

///////////////////////////////////////////////////////////////////////


// integration test
// for(game of dummyGames){
test("Successful game addition", async () => {
    const response = await ar.addGame(successGame.homeTeam, successGame.awayTeam, successGame.gameDateTime,
        successGame.field, successGame.refereeId, successGame.leagueId, successGame.seasonId).then(res => {
            return res;
        });
    expect(response).toBe(true);
})


// integration test
test("Unsuccessful addition - home team is not in the system.", async () => {
    const response = await ar.addGame(failGame.homeTeam, failGame.awayTeam, failGame.gameDateTime,
        failGame.field, failGame.refereeId, failGame.leagueId, failGame.seasonId).then(res => {
            return res;
        });
    expect(response).toBe(false);
})


