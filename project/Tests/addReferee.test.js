const request = require('supertest');
const app = require('../main');
require("dotenv").config();
var farUser = request.agent(app);

jest.setTimeout(30000);

describe('/addReferee - middleware', function(){
    describe('User is not logged in', function() {
      
        test("Add referee attempt Unsuccessful", async () => {
            response = await farUser.post("/addReferee/addReferee").send({
                username:'',
                qualification:'',
                isHeadReferee: ''
            });
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("You are not logged in");
        })

        test("Register referee attempt Unsuccessful", async () => {
            response = await farUser.post("/addReferee/registerReferee").send({
                username:'',
                password:'',
                firstName:'',
                lastName:'',
                country:'',
                email:'',
                image:'',
                qualification:'',
                isHeadReferee:''
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

        test("Register referee attempt Unsuccessful", async () => {
            response = await farUser.post("/addReferee/registerReferee").send({
                username:'',
                password:'',
                firstName:'',
                lastName:'',
                country:'',
                email:'',
                image:'',
                qualification:'',
                isHeadReferee:''
            });
            expect(response.statusCode).toBe(401);
            expect(response.text).toBe("You don't have the right permissions");
        })
    })

})

describe('POST /addReferee/addReferee', function(){
    describe('Arguments', function(){
        describe('Missing arguments', function(){
            test("login - permited user", async () => {
                response = await farUser.post("/Login").send({
                    username: 'galagas',
                    password: 'galagas'
                });
                expect(response.statusCode).toBe(200);
            })
    
            test("Add referee attempt Unsuccessful", async () => {
                response = await farUser.post("/addReferee/addReferee").send({
                    username:'',
                    // qualification:'',
                    isHeadReferee: ''
                });
                expect(response.statusCode).toBe(400);
                expect(response.text).toBe("Missing one or more parameters");
            })
        })
    })
    describe('succesful addReferee', function(){
        test("login - permited user", async () => {
            response = await farUser.post("/Login").send({
                username: 'galagas',
                password: 'galagas'
            });
            expect(response.statusCode).toBe(200);
        })

        test("Add referee attempt Unsuccessful", async () => {
            response = await farUser.post("/addReferee/addReferee").send({
                username:'',
                qualification:'',
                isHeadReferee: ''
            });
            expect(response.statusCode).toBe(201);
        })
    })
})

describe('POST /registerReferee', function(){

})

describe('POST /addRefereeToSeason', function(){

})