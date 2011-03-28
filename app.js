var express = require('express');

var app = module.exports = express.createServer(function(req, res) {
  res.send({ip: req.header('x-forwarded-for') || req.connection.remoteAddress});
});

if (!module.parent) {
  app.listen(3000);
}
