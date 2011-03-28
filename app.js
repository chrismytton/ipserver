var express = require('express'),
    reverse = require('dns').reverse;

function ipInfo(req, res, next) {
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  req.ipInfo = {ip: ip};
  if (req.query.domains) {
    reverse(ip, function(err, domains) {
      if (err) throw err;
      req.ipInfo.domains = domains;
      next();
    });
  } else {
    next();
  }
}

var app = module.exports = express.createServer(ipInfo, function(req, res) {
  res.send(req.ipInfo);
});

app.enable('jsonp callback');

if (!module.parent) {
  app.listen(3000);
  console.log("jsonp server running on port %s", app.address().port);
}
