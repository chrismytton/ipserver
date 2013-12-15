var express = require('express');
var reverse = require('dns').reverse;

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
var app = module.exports = express();
app.use(linkHeader('https://github.com/hecticjeff/ipserver', 'help'));

app.configure('development', function(){
  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.logger());
  app.use(express.errorHandler());
});

app.enable('trust proxy');

var jsonLink = linkHeader('/json', 'alternate');

app.get('/', jsonLink, function(req, res) {
  res.set('Content-Type', 'text/plain');
  res.send(req.ip);
});

var plainLink = linkHeader('/', 'alternate');

app.get('/json', plainLink, function(req, res, next) {
  reverse(req.ip, function(err, domains) {
    if (err) {
      return next(err);
    }
    res.jsonp({ip: req.ip, domains: domains});
  });
});


if (!module.parent) {
  app.listen(process.env.PORT || 3000);
}
