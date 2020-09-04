const auth = require('./authentication');

const hello = (req, res) => {
    console.debug("In hello controller")
    res.send('Hello, world!');
};

const authenticate = (req, res) => {
    let token = auth.authenticate(req.body.key);
    return token == null ? res.sendStatus(401) : res.send(token);
};

const refresh = (req, res) => {
    console.debug("REFRESHING")
};

const addPostToQueue = (req, res) => {
    res.send('Upload');
};

const getQueuedPosts = (req, res) => {
    res.send('Queued posts');
};

module.exports = { hello, authenticate, refresh, addPostToQueue, getQueuedPosts };
