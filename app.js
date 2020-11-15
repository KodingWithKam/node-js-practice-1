const http = require('http');
const routes = require('./routes');

// Create node server
const server = http.createServer(routes.handler);

server.listen(3000);
