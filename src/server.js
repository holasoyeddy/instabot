const express = require('express');
const controllers = require('./controllers');

class Server {
    constructor(options) {
        this.app = express();
    }

    init = () => {
        console.debug('Initializing server instance...');
        // set up routing
        this.routeSetUp();
        // set up file storage
        this.storageSetUp();
        // set up bot
        this.botSetUp();
        // set up queue
        // set up notification center
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
        console.debug('Setting up Instabot instance...')
        console.debug('Instabot setup finished.')
    };

    queueSetUp = () => {
        console.debug('Setting up queue...')
        console.debug('Queue setup finished')
    }

    run = (host, port) => {
        this.app.listen(port, () => {
            console.log('Running server instance at ' + host + ':' + port);
        });
    };
}

module.exports = Server;