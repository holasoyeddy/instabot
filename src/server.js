const express = require('express');
const routing = require('./routing');
const service = require('./service');
const config = require('./configuration');

class Server {
    constructor() {
        this.app = express();
    }

    init = () => {
        console.debug('Initializing server instance...');
        routing.setup(this.app);
        service.setup();
    };

    run = () => {
        return this.app.listen(config.port, () => {
            console.log(
                'Running server instance at http://' +
                    config.host +
                    ':' +
                    config.port
            );
        });
    };

    stop = () => {
        console.debug('Closing resources...');
    };
}

const server = new Server();
module.exports = server;
