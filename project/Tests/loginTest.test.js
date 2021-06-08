const request = require('supertest');
const app = require('../main');
require("dotenv").config();


jest.setTimeout(30000);

describe('GET /test', function() {
    test("test test test test", async () => {
        response = await request(app).get("/test");
        expect(response.statusCode).toBe(200);
    })
});

describe('POST /Login', function() {
    test("Successful login", async () => {
        response = await request(app).post("/Login").send({
            username: 'guyzaid',
            password: 'guyzaid'
        });
        expect(response.statusCode).toBe(200);
    })

    test("Unsuccessful login - username does not exist", async () => {
        response = await request(app).post("/Login").send({
            username: 'guyaid',
            password: 'guyzaid'
        });
        expect(response.statusCode).toBe(401);
    })

    test("Unsuccessful login - missing parameters", async () => {
        response = await request(app).post("/Login").send({
            // username: 'guyzaid',
            password: 'guyzaid'
        });
        expect(response.statusCode).toBe(409);
        expect(response.text).toBe("Missing arguments");
    })
});




// *****************************************ACCEPTANCE TESTING - MATCHES ASSIGNMENT USE CASE 10 *******************************************************

// describe("POST /far/matchAssignmentAlgorithm", () =>{

//     describe("request body does not contain all args.", () => {

//         test("login NOT a far user.", async () => {
//             response = await farUser.post("/Login").send({
//                 username: 'danaKlim',
//                 password: 'dana123'
//             });
//             expect(response.statusCode).toBe(200);
//         }, 30000)

//         test("user does not have FAR privileges. reponse status code of 500", async () => {
//             response = await farUser.post("/far/matchAssignmentAlgorithm").send({
//                 leagueId:217,
//                 season:'2017/2018',
//                 policy: {numOfRounds: 10}
//             });
//             expect(response.statusCode).toBe(500)
//         }, 30000)
//     })

//     describe("request body does not contain all args. far user is authenticated", () => {

//         test("login a far user.", async () => {
//             response = await farUser.post("/Login").send({
//                 username: 'ladygaga',
//                 password: 'lady@56'
//             });
//             expect(response.statusCode).toBe(200);
//         }, 30000)

//         test("request body does not contain LEAGUEID. reponse status code of 400.", async () => {      
//             response = await farUser.post("/far/matchAssignmentAlgorithm").send({
//                 season:'2017/2018',
//                 policy: {numOfRounds: 10}
//             });
//             expect(response.statusCode).toBe(400);
//         }, 30000)

//         test("request body does not contain policy.numOfRounds. reponse status code of 400.", async () => {
//             response = await farUser.post("/far/matchAssignmentAlgorithm").send({
//                 leagueId:217,
//                 season:'2017/2018',
//                 policy: {}
//             });
//             expect(response.statusCode).toBe(400);
//         }, 30000)
    
// })
// })