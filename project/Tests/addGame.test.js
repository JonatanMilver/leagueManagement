const request = require('supertest');
const app = require('../main');
require("dotenv").config();

jest.setTimeout(30000);

describe('POST /games/addGame', function() {
    test("Add game Successful", async () => {
        response = await request(app).post("/games/addGame").send({
            homeTeam: '',
            awayTeam : '',
            gameDateTime : '',
            field : '',
            refereeId : '',
            leagueId : '',
            seasonId : ''
        });
        expect(response.statusCode).toBe(201);
    })

    test("Add game unsuccessful - policy issue", async () => {
        response = await request(app).post("/games/addGame").send({
            homeTeam: '',
            awayTeam : '',
            gameDateTime : '',
            field : '',
            refereeId : '',
            leagueId : '',
            seasonId : ''
        });
        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe("No game policy for this season or game doesn't stand by policy.");
    })

    test("Add game unsuccessful - missing arguments", async () => {
        response = await request(app).post("/games/addGame").send({
            homeTeam: '',
            awayTeam : '',
            gameDateTime : '',
            field : '',
            refereeId : '',
            leagueId : '',
            seasonId : ''
        });
        expect(response.statusCode).toBe(406);
        expect(response.body.message).toBe("Missing arguments.");
    })
});
