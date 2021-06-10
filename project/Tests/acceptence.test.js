const request = require('supertest');
const app = require('../main');
require("dotenv").config();
var farUser = request.agent(app);
const ass_rep_utils = require('../DataAccess/associationRepresentativeUtils')
const league_utils = require('../DataAccess/league_utils')
const users_utils = require("../DataAccess/users_utils")

jest.setTimeout(30000);

// **************************** MOCK FUNCTIONS ****************************
//#region 
ass_rep_utils.checkGamePolicy = jest.fn(async (seasonId, leagueId) => {
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

ass_rep_utils.checkOneGamePolicy = jest.fn(async (team1, team2, seasonId) => {
    if(seasonId == 2 && team1 == 1 && team2 == 3){
        return true; // Game does not exist
    }
    return false;

})

ass_rep_utils.addGame = jest.fn(async (homeTeam, awayTeam, gameDateTime, field, refereeId, seasonId) => {
    return true;
})

ass_rep_utils.checkIfTeamExist = jest.fn(async (team) => {
    if(team == 1005){
        return false;
    }
    return true;
})

ass_rep_utils.checkIfRefExist = jest.fn(async (userId) => {
    if(userId != 3 && userId != 1){
        return true;    
    }
    return false;
})

league_utils.checkIfSeasonExist = jest.fn(async (seasonID) => {
    return true;
})

league_utils.checkIfRefInSeason = jest.fn(async (refereeID, seasonID) => {
    if((refereeID == 3 || refereeID == 4) && seasonID == 2){
        return true;
    }
    return false;
})

ass_rep_utils.addRefereeToSeason = jest.fn(async (refereeID, seasonID) => {
    return true;
})

ass_rep_utils.insertReferee = jest.fn(async (userId, qualification, isHeadReferee)=>{
    return true;
})

ass_rep_utils.addRefereeToSeason = jest.fn(async (refereeID, seasonID)=> {
    return true;
})

users_utils.checkIfUserExist = jest.fn(async (username) => {
    if(username == 'guyzaid'){
        return {pswd: '$2a$04$Gj168.B2FWPGcWZ5/CCkwuv1AlWDwEkaxU03OJUkWiONV45ac0bna', userId: 1};
    }
    else if(username == 'tomerkel'){
        return {pswd: '$2a$04$m.Bv/0dVXMorjj4m7XjxReN.v./jAIREtLWgqcVjj1ULSMYti5PVO', userId: 2}
    }
    else if(username == 'galagas'){
        return {pswd: '$2a$04$rvsFu.5sIqIzMWuHF8MaO.LbLEJP4VomFqBl.4rCQ/f0F8w/UPxTK', userId: 2}
    }
    return false
})

users_utils.registerUser = jest.fn(async (username, hash_password, firstName, lastName, email) => {
    return true;
})
//#endregion

// **************************** TEST FUNCTIONS ****************************
//#region

describe('GET /test', function() {
    test("test test test test", async () => {
        response = await farUser.get("/test");
        expect(response.statusCode).toBe(200);
    })
});

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
                username: 'tomerkel',
                password: 'tomerkel'
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
    
    // Acceptence 18.1
    describe('Successful setting of game policy', function(){
        test("login - permited user", async () => {
            response = await farUser.post("/Login").send({
                username: 'guyzaid',
                password: 'guyzaid'
            });
            expect(response.statusCode).toBe(200);
        })

        test("Set game policy attempt - policy does not exists for season", async () => {
            response = await farUser.post("/associationrepresentative/setGamePolicy").send({
                seasonId:4,
                leagueId:1,
                gamePolicyId: 1
            });
            expect(response.statusCode).toBe(200);
        })
    })

    // Acceptence 18.2
    describe('Policy already set', function(){
        test("login - permited user", async () => {
            response = await farUser.post("/Login").send({
                username: 'guyzaid',
                password: 'guyzaid'
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

    // Acceptence 18.3
    describe('Arguments', function(){
        describe('Missing arguments', function(){
            test("login - permited user", async () => {
                response = await farUser.post("/Login").send({
                    username: 'guyzaid',
                    password: 'guyzaid'
                });
                expect(response.statusCode).toBe(200);
            })
    
            test("Set game policy attempt - missing args", async () => {
                response = await farUser.post("/associationrepresentative/setGamePolicy").send({
                    seasonId:2,
                    // leagueId:'',
                    gamePolicyId: 1
                });
                expect(response.statusCode).toBe(406);
                expect(response.text).toBe("Missing arguments");
            })
        })
    })
})

describe('POST /associationrepresentative/addGame', function() {
    
    // Acceptence 20.1
    describe('Successful adding game', function() {
        test("login - permited user", async () => {
            response = await farUser.post("/Login").send({
                username: 'guyzaid',
                password: 'guyzaid'
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

    describe('Policy', function(){
        // Acceptence 20.4
        test('Game does not stand by policy', async () => {
            response = await farUser.post("/associationrepresentative/addGame").send({
                homeTeam : 1,
                awayTeam : 2,
                gameDateTime : "02/03/2021 19:30",
                field : "BS",
                refereeId : 3,
                seasonId : 2,
                leagueId : 1
            });
            expect(response.statusCode).toBe(409);
        })
        // Acceptence 20.3
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

    // Acceptence 20.2
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
    
    // Acceptence 15.1
    describe('Successful adding of referee', function(){
        test('', async () => {
            response = await farUser.post("/associationrepresentative/addReferee").send({
                username:'guyzaid',
                qualification:'international',
                isHeadReferee:true
            })
            expect(response.statusCode).toBe(201);
        })
    })

    // Acceptence 15.2
    describe('Missing arguments',function(){
        test('No quaification', async () => {
            response = await farUser.post("/associationrepresentative/addReferee").send({
                username:'guyzaid',
                // qualification:'',
                isHeadReferee:true
            });
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Missing one or more parameters")
        })
    })

    // Acceptence 15.3
    describe('Referee already exists', function(){
        test('', async () => {
            response = await farUser.post("/associationrepresentative/addReferee").send({
                username:'galagas',
                qualification:'international',
                isHeadReferee:true
            })
            expect(response.statusCode).toBe(409);
            expect(response.text).toBe("Referee already exist")
        })
    })
})

describe('POST /associationrepresentative/addRefereeToSeason',function(){
    
    // Acceptence 17.1
    describe('Successful adding of referee to season', function(){
        test('', async () => {
            response = await farUser.post("/associationrepresentative/addRefereeToSeason").send({
                refereeID:5,
                seasonID:2
            });
            expect(response.statusCode).toBe(201);
            expect(response.text).toBe("Referee added successfully to season")
        })
    })

    // Acceptence 17.2
    describe('Missing arguments',function(){
        test('No seasonID', async () => {
            response = await farUser.post("/associationrepresentative/addRefereeToSeason").send({
                refereeID:5,
                // seasonID:''
            });
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe("Missing one or more parameters")
        })
    })

    // Acceptence 17.3
    describe('Referee already in season',function(){
        test('', async () => {
            response = await farUser.post("/associationrepresentative/addRefereeToSeason").send({
                refereeID:4,
                seasonID:2
            });
            expect(response.statusCode).toBe(409);
            expect(response.text).toBe("The referee already in this season")
        })
    })
})

describe('Register Tests', function(){
    // test('Missing Arguments', async () => {
    //     response = await farUser.post("/registerUser").send({
    //         username:'test',
    //         password:'test',
    //         firstName:'test',
    //         // lastName:'test',
    //         email:'test'
    //     })
    //     expect(response.statusCode).toBe(400);
    //     expect(response.text).toBe("Missing one or more parameters");
    // })

    // Acceptence 1.1
    test('successful register', async () => {
        response = await farUser.post("/registerUser").send({
            username:'test',
            password:'test',
            firstName:'test',
            lastName:'test',
            email:'test@post.bgu.ac.il'
        })
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe("User created successfully");
    })

    // Acceptence 1.2
    test('User already exists',  async () => {
        response = await farUser.post("/registerUser").send({
            username:'guyzaid',
            password:'test',
            firstName:'test',
            lastName:'test',
            email:'test@post.bgu.ac.il'
        })
        expect(response.statusCode).toBe(409);
        expect(response.text).toBe("User already exist");
    })
})

describe('Login Tests', function(){
    describe('POST /Login', function() {
        // Acceptence 4.1
        test("Successful login", async () => {
            // response = await request(app).post("/Login").send({
            response = await farUser.post("/Login").send({
                username: 'guyzaid',
                password: 'guyzaid'
            });
            expect(response.statusCode).toBe(200);
        })
    
        // Acceptence 4.2
        test("Unsuccessful login - username does not exist", async () => {
            // response = await request(app).post("/Login").send({
                response = await farUser.post("/Login").send({
                username: 'guyaid',
                password: 'guyzaid'
            });
            expect(response.statusCode).toBe(401);
        })
    
        // Acceptence 4.3
        test("Unsuccessful login - missing parameters", async () => {
            // response = await request(app).post("/Login").send({
                response = await farUser.post("/Login").send({
                // username: 'guyzaid',
                password: 'guyzaid'
            });
            expect(response.statusCode).toBe(409);
            expect(response.text).toBe("Missing arguments");
        })
    });
})
// #endregion
