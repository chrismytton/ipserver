// Module dependencies
var express = require('express'),
    reverse = require('dns').reverse;

// Middleware to extract ipInfo from the request
function ipInfo(req, res, next) {
  // Add the ip address to `req.ipInfo`
  req.ipInfo = {ip: req.ip};

  // Check the querystring for a `domains` parameter, so when the user makes
  // a request to `/?domains=1` it will resolve the domain name(s).
  if (req.query.domains) {
    // Perform a reverse dns lookup on the ip address
    reverse(req.ip, function(err, domains) {
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
      link = "http://" + req.headers.host + link;
    }
    var previous = res.get('Link');
    if (previous) {
      previous += ', ';
    } else {
      previous = '';
    }
    res.set('Link', previous + '<' + link + '>; rel="' + rel + '"');
    next();
  };
}

// Create a simple middleware stack
var app = module.exports = express()
app.use(ipInfo);
app.use(express.logger());
app.use(linkHeader('https://github.com/hecticjeff/ipserver', 'help'));

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.enable('trust proxy')
app.enable('jsonp callback');

var jsonLink = linkHeader('/json', 'alternate');

app.get('/', jsonLink, function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(req.ipInfo.ip);
});

var plainLink = linkHeader('/', 'alternate');

app.get('/json', plainLink, function(req, res) {
  res.send(req.ipInfo);
});


if (!module.parent) {
  app.listen(3000);
}
