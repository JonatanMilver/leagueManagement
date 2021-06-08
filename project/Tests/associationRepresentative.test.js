const request = require('supertest');
const app = require('../main');
require("dotenv").config();
var farUser = request.agent(app);

jest.setTimeout(30000);

describe('/associationrepresentative - middleware', function() {
    describe('User is not logged in', function() {
      
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
            expect(response.text).toBe("You are not logged in");
        })

        test("Set game policy attempt Unsuccessful", async () => {
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

describe('POST /associationrepresentative/setGamePolicy', function(){
    describe('Arguments', function(){
        describe('Missing arguments', function(){
            test("login - permited user", async () => {
                response = await farUser.post("/Login").send({
                    username: 'galagas',
                    password: 'galagas'
                });
                expect(response.statusCode).toBe(200);
            })
    
            test("Set game policy attempt - missing args", async () => {
                response = await farUser.post("/associationrepresentative/setGamePolicy").send({
                    seasonId:'',
                    leagueId:'',
                    gamePolicyId: ''
                });
                expect(response.statusCode).toBe(406);
                expect(response.text).toBe("Missing arguments");
            })
        })
    })
    describe('Policy already set', function(){
        test("login - permited user", async () => {
            response = await farUser.post("/Login").send({
                username: 'galagas',
                password: 'galagas'
            });
            expect(response.statusCode).toBe(200);
        })

        test("Set game policy attempt - policy exists for season", async () => {
            response = await farUser.post("/associationrepresentative/setGamePolicy").send({
                seasonId:2,
                leagueId:1,
                gamePolicyId: 1
            });
            expect(response.statusCode).toBe(409);
            expect(response.text).toBe("Policy is already set, can not set another policy");
        })
    })
    describe('Successful setting of game policy', function(){

    })
})

describe('POST /associationrepresentative/addGame', function() {
    describe('Permissions', function(){    
        describe('With permissions', function() {
            test("login - permited user", async () => {
                response = await farUser.post("/Login").send({
                    username: 'galagas',
                    password: 'galagas'
                });
                expect(response.statusCode).toBe(200);
            })
    
            test("Add game attempt Successful", async () => {
                response = await farUser.post("/associationrepresentative/addGame").send({
                    homeTeam : 1,
                    awayTeam : 3,
                    gameDateTime : "02/03/2021 19:30",
                    field : "BS",
                    refereeId : 3,
                    seasonId : 2,
                    leagueId : 1
                });
                expect(response.statusCode).toBe(201);
                expect(response.text).toBe("Game has been succefully added.");
            })
        })
    })
    describe('Policy', function(){
        test('Game does not stand by policy', async () => {
            response = await farUser.post("/associationrepresentative/addGame").send({
                homeTeam : 1,
                awayTeam : 3,
                gameDateTime : "02/03/2021 19:30",
                field : "BS",
                refereeId : 3,
                seasonId : 2,
                leagueId : 1
            });
            expect(response.statusCode).toBe(409);
        })
        test('season does not have a policy', async () => {
            response = await farUser.post("/associationrepresentative/addGame").send({
                homeTeam : 1,
                awayTeam : 3,
                gameDateTime : "02/03/2021 19:30",
                field : "BS",
                refereeId : 3,
                seasonId : 4,
                leagueId : 1
            });
            expect(response.statusCode).toBe(409);
        })
    })
    describe('Arguments', function(){
        describe('Missing Args', function(){
            test('No away team', async () => {
                response = await farUser.post("/associationrepresentative/addGame").send({
                    homeTeam : 1,
                    // awayTeam : 3,
                    gameDateTime : "02/03/2021 19:30",
                    field : "BS",
                    refereeId : 3,
                    seasonId : 2,
                    leagueId : 1
                });
                expect(response.statusCode).toBe(406);
            })
        })
    })
})

describe('POST /associationrepresentative/addReferee',function(){
    describe('Missing arguments',function(){
        test('No quaification', async () => {
            response = await farUser.post("/associationrepresentative/addReferee").send({
                username:'',
                // qualification:'',
                isHeadReferee:''
            });
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Missing one or more parameters")
        })
    })
    describe('Referee already exists', function(){
        test('', async () => {
            response = await farUser.post("/associationrepresentative/addReferee").send({
                username:'galagas',
                qualification:'international',
                isHeadReferee:1
            })
            console.log(response)
            expect(response.statusCode).toBe(409);
            expect(response.text).toBe("Referee already exist")
        })
    })
    // describe('Successful adding of referee', function(){
    //     test('', async () => {
    //         response = await farUser.post("/associationrepresentative/addReferee").send({
    //             username:'tomerkel',
    //             qualification:'international',
    //             isHeadReferee:1
    //         })
    //         expect(response.statusCode).toBe(201);
    //     })
    // })
})

describe('POST /associationrepresentative/addRefereeToSeason',function(){
    describe('Missing arguments',function(){
        test('No seasonID', async () => {
            response = await farUser.post("/associationrepresentative/addRefereeToSeason").send({
                refereeID:'',
                // seasonID:''
            });
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Missing one or more parameters")
        })
    })
    describe('Referee already in season',function(){
        test('', async () => {
            response = await farUser.post("/associationrepresentative/addRefereeToSeason").send({
                refereeID:3,
                seasonID:2
            });
            expect(response.statusCode).toBe(409);
            expect(response.text).toBe("The referee already in this season")
        })
    })
    
    describe('Successful adding of referee to season', function(){
        test('', async () => {
            response = await farUser.post("/associationrepresentative/addRefereeToSeason").send({
                refereeID:4,
                seasonID:2
            });
            expect(response.statusCode).toBe(201);
            expect(response.text).toBe("Referee added successfully to season")
        })
    })
})
    
