const express = require('express');
const controllers = require('./controllers');
const middleware = require('./middleware');
const config = require('./configuration');

class Server {
    constructor() {
        this.app = express();
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
        
        this.app.use(express.json())

        this.app.get(
            '/', 
            middleware.authenticated, 
            controllers.hello
        );

        this.app.post(
            '/api/login',
            controllers.authenticate
        );

        this.app.post(
            '/api/upload',
            middleware.authenticated,
            controllers.addPostToQueue
        );
        
        this.app.get(
            '/api/queue',
            middleware.authenticated,
            controllers.getQueuedPosts
        );

        this.app.get(
            '/api/refresh',
            controllers.refresh
        );


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
