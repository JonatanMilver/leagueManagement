const request = require('supertest');
const app = require('../main');
require("dotenv").config();
// var farUser = request.agent('http://localhost:3000');
var farUser = request.agent(app);

jest.setTimeout(30000);

describe('POST /associationrepresentative/addGame', function() {

    describe('No permissions add game', function() {
        test("login with an unpermited user", async () => {
            // response = await request(app).post("/Login").send({
            response = await farUser.post("/Login").send({
                username: 'guyzaid',
                password: 'guyzaid'
            });
            expect(response.statusCode).toBe(200);
        })

        test("Add game attempt Unsuccessful", async () => {
            // let response = await request(app).post("/associationrepresentative/addGame").send({
            response = await farUser.post("/associationrepresentative/addGame").send({
                homeTeam: '',
                awayTeam : '',
                gameDateTime : '',
                field : '',
                refereeId : '',
                leagueId : '',
                seasonId : ''
            });
            console.log(response);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("You don't have the right permissions");
        })
    })

    describe('Add game with permissions', function() {
        test("login with a permited user", async () => {
            // response = await request(app).post("/Login").send({
            response = await farUser.post("/Login").send({
                username: 'guyzaid',
                password: 'guyzaid'
            });
            expect(response.statusCode).toBe(200);
        })

        test("Add game attempt Successful", async () => {
            // let response = await request(app).post("/associationrepresentative/addGame").send({
            response = await farUser.post("/associationrepresentative/addGame").send({
                homeTeam: '',
                awayTeam : '',
                gameDateTime : '',
                field : '',
                refereeId : '',
                leagueId : '',
                seasonId : ''
            });
            console.log(response);
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("You don't have the right permissions");
        })
    })

    // test("Add game unsuccessful - policy issue", async () => {
    //     response = await request(app).post("/associationrepresentative/addGame").send({
    //         homeTeam: '',
    //         awayTeam : '',
    //         gameDateTime : '',
    //         field : '',
    //         refereeId : '',
    //         leagueId : '',
    //         seasonId : ''
    //     });
    //     expect(response.statusCode).toBe(409);
    //     expect(response.body.message).toBe("No game policy for this season or game doesn't stand by policy.");
    // })

    // test("Add game unsuccessful - missing arguments", async () => {
    //     response = await request(app).post("/associationrepresentative/addGame").send({
    //         homeTeam: '',
    //         awayTeam : '',
    //         gameDateTime : '',
    //         field : '',
    //         refereeId : '',
    //         leagueId : '',
    //         seasonId : ''
    //     });
    //     expect(response.statusCode).toBe(406);
    //     expect(response.body.message).toBe("Missing arguments.");
    // })
});
