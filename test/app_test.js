var request = require('supertest');
var app = require('../app');

describe("Returns the current ip address", function() {

  it("returns 200", function(done) {
    request(app)
      .get('/')
      .expect('127.0.0.1')
      .expect(200, done);
  });

  it("returns json", function(done) {
    request(app)
      .get('/json')
      .expect({ip: '127.0.0.1'})
      .expect(200, done)
  });

});
