var express = require('express');

var app = module.exports = express.createServer(function(req, res) {
  res.send({ip: req.header('x-forwarded-for') || req.connection.remoteAddress});
});

app.enable('jsonp callback');

if (!module.parent) {
  app.listen(3000);
  console.log("jsonp server running on port %s", app.address().port);
}
