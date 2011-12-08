// Module dependencies
var express = require('express'),
    reverse = require('dns').reverse;

// Middleware to extract ipInfo from the request
function ipInfo(req, res, next) {
  // Check for an `X-Forwarded-For` header, so the server can be run behind an
  // nginx reverse proxy, then fallback to `req.connection.remoteAddress`
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

  // Add the ip address to `req.ipInfo`
  req.ipInfo = {ip: ip};

  // Check the querystring for a `domains` parameter, so when the user makes
  // a request to `/?domains=1` it will resolve the domain name(s).
  if (req.query.domains) {
    // Perform a reverse dns lookup on the ip address
    reverse(ip, function(err, domains) {
      if (err) next(err);

      // Store the returned domains and continue down the stack
      req.ipInfo.domains = domains;
      next();
    });
  } else {
    // Carry on down the stack
    next();
  }
}

function linkHeader(link, rel) {
  return function(req, res, next) {
    if (link.charAt(0) === '/') {
      console.log(req.headers.host)
      link = "http://" + req.headers.host + link;
    }
    var previous = res.header('Link');
    if (previous) {
      previous += ', ';
    } else {
      previous = '';
    }
    res.header('Link', previous + '<' + link + '>; rel="' + rel + '"');
    next();
  };
}

// Create a simple middleware stack
var app = module.exports = express.createServer(
  ipInfo,
  express.logger(),
  linkHeader('https://github.com/hecticjeff/ipserver', 'help')
);

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.enable('jsonp callback');

var jsonLink = linkHeader('/json', 'alternate');

app.get('/', jsonLink, function(req, res) {
  res.send(req.ipInfo.ip, {'Content-Type': 'text/plain'});
});

var plainLink = linkHeader('/', 'alternate');

app.get('/json', plainLink, function(req, res) {
  res.send(req.ipInfo);
});


if (!module.parent) {
  app.listen(3000);
  console.log("jsonp server running on port %s", app.address().port);
}
