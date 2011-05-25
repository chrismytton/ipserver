var assert = require('assert'),
    ipserver = require('../app');

module.exports = {
  'test GET /': function() {
    assert.response(ipserver, {
      url: '/'
    }, {
      body: '{"ip":"127.0.0.1"}'
    });
  },
  'test jsonp callback': function() {
    assert.response(ipserver, {
      url: '/?callback=test'
    }, {
      body: 'test({"ip":"127.0.0.1"});'
    });
  },
  'test optional domain support': function() {
    assert.response(ipserver, {
      url: '/?domains=1'
    }, {
      body: '{"ip":"127.0.0.1","domains":["localhost"]}'
    });
  },
  'test jsonp with domains': function() {
    assert.response(ipserver, {
      url: '/?callback=domaintest&domains=1'
    }, {
      body: 'domaintest({"ip":"127.0.0.1","domains":["localhost"]});'
    });
  }
}
