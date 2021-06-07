const ar = require("../Domain/associationRepresentatives")
const db_utils = require("../DataAccess/DButils")



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
    homeTeam : 5,
    awayTeam : 7,
    gameDateTime : "02/03/2021 19:30",
    field : "BS",
    refereeId : 3,
    seasonId : 3,
    leagueId : 1
}


// for(game of dummyGames){
test("Successful game addition", async () => {
    const response = await ar.addGame(successGame.homeTeam, successGame.awayTeam, successGame.gameDateTime,
        successGame.field, successGame.refereeId, successGame.leagueId, successGame.seasonId).then(res => {
            return res;
        });
    expect(response).toBe(true);
})

const failGame =     {
    homeTeam : 1005,
    awayTeam : 5,
    gameDateTime : "08/21/2021 20:30",
    field : "LaLa",
    refereeId : 3,
    seasonId : 3,
    leagueId : 1
}




test("Unsuccessful addition - home team is not in the system.", async () => {
    const response = await ar.addGame(failGame.homeTeam, failGame.awayTeam, failGame.gameDateTime,
        failGame.field, failGame.refereeId, failGame.leagueId, failGame.seasonId).then(res => {
            return res;
        });
    expect(response).toBe(false);
})
// }

// db_utils.execQuery(
//     `DELETE FROM Games
//     WHERE homeTeam=1 AND awayTeam=2`
// );

// db_utils.execQuery(
//     `DELETE FROM Games
//     WHERE homeTeam=3 AND awayTeam=4`
// )

