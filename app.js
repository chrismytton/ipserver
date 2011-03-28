var express = require('express');

var app = module.exports = express.createServer(function(req, res) {
  res.send({ip: req.connection.remoteAddress});
});
