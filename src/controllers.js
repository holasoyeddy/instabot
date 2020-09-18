const auth = require('./authentication');
const jwt = require('jsonwebtoken');
const config = require('./configuration');

const hello = (req, res) => {
    console.debug("In hello controller")
    res.send('Hello, world!');
};

const authenticate = (req, res) => {
    let token = auth.authenticate(req.body.key);
    return token == null ? res.sendStatus(401) : res.send(token);
};

const refresh = (req, res) => {
    const header = req.headers.authorization;

    if (header == null) {
        console.debug('ERROR: Missing Authorization header');
        return res.sendStatus(400);
    }

    const token = header.split(' ')[1];

    if (token == null) {
        console.debug('ERROR: Token not included in Authorization header');
        return res.sendStatus(400);
    }

    jwt.verify(token, config.secret, {ignoreExpiration: true}, (err, decoded) => {
        if (err) {
            console.debug("ERROR: ", err);
            return res.sendStatus(400);
        } else {
            console.debug("Refreshing token ")
            const token = auth.getNewRefreshToken(decoded.refresh);
            if (token == null) {
                console.debug("ERROR: REFRESH TOKEN MISMATCH")
                return res.sendStatus(400)
            }
            return res.send(token)
        }
    })
};

const addPostToQueue = (req, res) => {
    res.send('Upload');
};

const getQueuedPosts = (req, res) => {
    res.send('Queued posts');
};

module.exports = { hello, authenticate, refresh, addPostToQueue, getQueuedPosts };
