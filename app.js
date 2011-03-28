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
      if (err) throw err;
      req.ipInfo.domains = domains;
      next();
    });
  } else {
    // Carry on down the stack
    next();
  }
}

// Create a simple middleware stack
var app = module.exports = express.createServer(ipInfo, function(req, res) {
  res.send(req.ipInfo);
});

app.enable('jsonp callback');

if (!module.parent) {
  app.listen(3000);
  console.log("jsonp server running on port %s", app.address().port);
}
