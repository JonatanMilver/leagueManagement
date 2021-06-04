const app = require('../main') // Link to your server file
const request = require('supertest')

describe('GET /test', function() {
    it('responds with json', function(done) {
      request(app)
        .get('/test')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

// describe('GET /user', function() {
//     it('responds with json', function(done) {
//       request(app)
//         .get('/user')
//         .auth('username', 'password')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     });
//   });