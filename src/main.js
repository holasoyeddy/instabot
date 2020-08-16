const Server = require('./server');
const server = new Server(); // This should contain the server config.

server.init();
server.run('http://localhost', 8080);
