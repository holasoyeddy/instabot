const express = require('express');
const controllers = require('./controllers');
const middleware = require('./middleware');

const setup = (app) => {
    console.debug('Setting up routes...');
        
    app.use(express.json())

    app.get(
        '/', 
        middleware.authenticated, 
        controllers.hello
    );

    app.post(
        '/api/login',
        controllers.authenticate
    );

    app.post(
        '/api/upload',
        middleware.authenticated,
        middleware.upload.single('image'),
        controllers.queuePost
    );
    
    app.get(
        '/api/queue',
        middleware.authenticated,
        controllers.getQueuedPosts
    );

    app.get(
        '/api/refresh',
        controllers.refresh
    );


    console.debug('API route setup finished');
}

module.exports = { setup };