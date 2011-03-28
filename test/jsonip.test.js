var assert = require('assert'),
    jsonip = require('../app');

module.exports = {
  'test GET /': function() {
    assert.response(jsonip, {
      url: '/'
    }, {
      body: '{"ip":"127.0.0.1"}'
    });
  }
}
