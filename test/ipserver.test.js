var assert = require('assert'),
    ipserver = require('../app');

module.exports = {
  'test GET /': function() {
    assert.response(ipserver, {
      url: '/json',
      headers: { Accept: 'application/json' }
    }, {
      body: '{"ip":"127.0.0.1"}'
    });
  },
  'test jsonp callback': function() {
    assert.response(ipserver, {
      url: '/json?callback=test',
      headers: { Accept: 'application/json' }
    }, {
      body: 'test({"ip":"127.0.0.1"});'
    });
  },
  'test optional domain support': function() {
    assert.response(ipserver, {
      url: '/json?domains=1',
      headers: { Accept: 'application/json' }
    }, {
      body: '{"ip":"127.0.0.1","domains":[]}'
    });
  },
  'test jsonp with domains': function() {
    assert.response(ipserver, {
      url: '/json?callback=domaintest&domains=1',
      headers: { Accept: 'application/json' }
    }, {
      body: 'domaintest({"ip":"127.0.0.1","domains":[]});'
    });
  },

  'test plain text ip address': function() {
    assert.response(ipserver, {
      url: '/',
      headers: { Accept: 'text/plain' }
    }, {
      body: '127.0.0.1',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        Link: '<https://github.com/hecticjeff/ipserver>; rel="help"; title="Source Code on GitHub"'
      }
    });
  }
};
