const hello = (req, res) => {
    res.send('Hello, world!');
};

const authenticate = (req, res) => {
    res.send('Login');
};

const addPostToQueue = (req, res) => {
    res.send('Upload');
};

const getQueuedPosts = (req, res) => {
    res.send('Queued posts');
};

module.exports = { hello, authenticate, addPostToQueue, getQueuedPosts };
