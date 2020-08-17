const express = require('express');
const controllers = require('./controllers');

class Server {
    constructor(config) {
        this.app = express();
        this.config = config;
    }

    init = () => {
        console.debug('Initializing server instance...');
        this.routeSetUp();
        this.storageSetUp();
        this.botSetUp();
        this.queueSetUp();
        this.notificationCenterSetUp();
    };

    routeSetUp = () => {
        console.debug('Setting up routes...');
        this.app.get('/', controllers.hello);
        this.app.post('/api/login', controllers.authenticate);
        this.app.post('/api/upload', controllers.addPostToQueue);
        this.app.get('/api/queue', controllers.getQueuedPosts);
        console.debug('API route setup finished');
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
        this.app.listen(this.port, () => {
            console.log(
                'Running server instance at ' +
                    this.config.host +
                    ':' +
                    this.config.port
            );
        });
    };

    stop = () => {
        console.debug('Closing resources...');
    };
}

module.exports = Server;
