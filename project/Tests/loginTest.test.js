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