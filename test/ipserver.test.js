var assert = require('assert'),
    ipserver = require('../app');

module.exports = {
  'test GET /': function() {
    assert.response(ipserver, {
      url: '/',
      headers: { Accept: 'application/json' }
    }, {
      body: '{"ip":"127.0.0.1"}'
    });
  },
  'test jsonp callback': function() {
    assert.response(ipserver, {
      url: '/?callback=test',
      headers: { Accept: 'application/json' }
    }, {
      body: 'test({"ip":"127.0.0.1"});'
    });
  },
  'test optional domain support': function() {
    assert.response(ipserver, {
      url: '/?domains=1',
      headers: { Accept: 'application/json' }
    }, {
      body: '{"ip":"127.0.0.1","domains":["localhost"]}'
    });
  },
  'test jsonp with domains': function() {
    assert.response(ipserver, {
      url: '/?callback=domaintest&domains=1',
      headers: { Accept: 'application/json' }
    }, {
      body: 'domaintest({"ip":"127.0.0.1","domains":["localhost"]});'
    });
  },

  'test plain text ip address': function() {
    assert.response(ipserver, {
      url: '/',
      headers: { Accept: 'text/plain' }
    }, {
      body: '127.0.0.1',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
};
