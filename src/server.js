const express = require('express');
const routing = require('./routing');
const service = require('./service');
const config = require('./configuration');
var fs = require('fs');


class Server {
    constructor() {
        this.app = express();
    }

    init = () => {
        console.debug('Initializing server instance...');
        this.mkdir();
        routing.setup(this.app);
        service.setup();
    };
    mkdir = () => {
        console.debug("Creating required application directories...")
        
        if (!fs.existsSync(process.cwd() + "/cache/img")) {
            fs.mkdirSync(process.cwd() + "/cache/img", {recursive: true})
        }

        if (!fs.existsSync(process.cwd() + "/cache/data")) {
            fs.mkdirSync(process.cwd() + "/cache/data", {recursive: true})
        }
    }
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
