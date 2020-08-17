const Server = require('./server');
const Configuration = require('./configuration');
const jsonPath = '../config/server.' + process.env.NODE_ENV + '.json';
const json = require(jsonPath);

const conf = new Configuration(json);
const server = new Server(conf);

server.init();
server.run();
