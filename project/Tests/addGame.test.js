const request = require('supertest');
const app = require('../main');
require("dotenv").config();
// var farUser = request.agent('http://localhost:3000');
var farUser = request.agent(app);

jest.setTimeout(30000);

describe('/associationrepresentative - middleware', function() {
    describe('User is not logged in', function() {
      
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
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("You are not logged in");
        })

        test("Set game policy attempt Unsuccessful", async () => {
            // let response = await request(app).post("/associationrepresentative/addGame").send({
            response = await farUser.post("/associationrepresentative/setGamePolicy").send({
                seasonId: '',
                leagueId : '',
                gamePolicyId : '',
            });
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("You are not logged in");
        })
    })
    describe('User does not have association rep permissions', function() {
        
        test("login - unpermited user", async () => {
            response = await farUser.post("/Login").send({
                username: 'guyzaid',
                password: 'guyzaid'
            });
            expect(response.statusCode).toBe(200);
        })

        test("Add game attempt Unsuccessful", async () => {
            response = await farUser.post("/associationrepresentative/addGame").send({
                homeTeam: '',
                awayTeam : '',
                gameDateTime : '',
                field : '',
                refereeId : '',
                leagueId : '',
                seasonId : ''
            });
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("You don't have the right permissions");
        })
    })
})

describe('POST /associationrepresentative/addGame', function() {
    describe('Permissions', function(){    
        describe('With permissions', function() {
            // need to add permissions to galagas!!!
            test("login - permited user", async () => {
                response = await farUser.post("/Login").send({
                    username: 'galagas',
                    password: 'galagas'
                });
                expect(response.statusCode).toBe(200);
            })
    
            test("Add game attempt Successful", async () => {
                response = await farUser.post("/associationrepresentative/addGame").send({
                    homeTeam: '',
                    awayTeam : '',
                    gameDateTime : '',
                    field : '',
                    refereeId : '',
                    leagueId : '',
                    seasonId : ''
                });
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe("Game has been succefully added.");
            })
        })
    })
    describe('Policy', function(){
        describe('Without policy', function(){
            test("login - permited user", async () => {
                response = await farUser.post("/Login").send({
                    username: 'galagas',
                    password: 'galagas'
                });
                expect(response.statusCode).toBe(200);
            })

            test("Add game attempt unsuccessful - policy issue", async () => {
                response = await request(app).post("/associationrepresentative/addGame").send({
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
        })
        describe('With policy', function(){
            test("login - permited user", async () => {
                response = await farUser.post("/Login").send({
                    username: 'galagas',
                    password: 'galagas'
                });
                expect(response.statusCode).toBe(200);
            })

            test("Add game attempt successful - no policy issue", async () => {
                response = await request(app).post("/associationrepresentative/addGame").send({
                    homeTeam: '',
                    awayTeam : '',
                    gameDateTime : '',
                    field : '',
                    refereeId : '',
                    leagueId : '',
                    seasonId : ''
                });
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe("Game has been succefully added.");
            })
        })
    })
    describe('Arguments', function(){
        describe('Missing arguments', function(){
            test("login - permited user", async () => {
                response = await farUser.post("/Login").send({
                    username: 'galagas',
                    password: 'galagas'
                });
                expect(response.statusCode).toBe(200);
            })
    
            test("Add game attempt Successful", async () => {
                response = await farUser.post("/associationrepresentative/addGame").send({
                    homeTeam: '',
                    // awayTeam : '',
                    gameDateTime : '',
                    field : '',
                    refereeId : '',
                    leagueId : '',
                    seasonId : ''
                });
                expect(response.statusCode).toBe(406);
                expect(response.text).toBe("Missing arguments.");
            })
        })
    })
});

describe('', function(){

})
    

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

