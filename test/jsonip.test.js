var assert = require('assert'),
    jsonip = require('../app');

module.exports = {
  'test GET /': function() {
    assert.response(jsonip, {
      url: '/'
    }, {
      body: '{"ip":"127.0.0.1"}'
    });
  },
  'test jsonp callback': function() {
    assert.response(jsonip, {
      url: '/?callback=test'
    }, {
      body: 'test({"ip":"127.0.0.1"});'
    });
  }
}
