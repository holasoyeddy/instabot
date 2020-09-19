const express = require('express');
const routing = require('./routing');
const config = require('./configuration');

class Server {
    constructor() {
        this.app = express();
    }

    init = () => {
        console.debug('Initializing server instance...');
        routing.setup(this.app);
        this.storageSetUp();
        this.botSetUp();
        this.queueSetUp();
        this.notificationCenterSetUp();
    };

    storageSetUp = () => {
        console.debug('Setting up storage...');
        console.debug('Storage setup finished');
    };

    botSetUp = () => {
        console.debug('Setting up Instabot instance...');
        console.debug('Instabot setup finished.');
    };

    queueSetUp = () => {
        console.debug('Setting up queue...');
        console.debug('Queue setup finished');
    };

    notificationCenterSetUp = () => {
        console.debug('Setting up notification center...');
        console.debug('Notification center setup finished');
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
