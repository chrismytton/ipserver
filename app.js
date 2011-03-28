var http = require('http');

module.exports = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ip: req.connection.remoteAddress}));
});
