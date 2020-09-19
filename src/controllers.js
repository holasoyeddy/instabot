const auth = require('./authentication');
const jwt = require('jsonwebtoken');
const config = require('./configuration');
const service = require('./service')

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

const queuePost = (req, res, next) => {
    console.debug("File has been uploaded. Adding post to queue...")
    // TODO: Add image size validation
    const post = {};
    post.caption = req.body.caption;
    post.filePath = req.file.path;

    service.addToPostQueue(post);
    
    res.status(201).json({
        "result": "Your post has been queued successfully!"
    })
}

const getQueuedPosts = (req, res) => {
    const queue = service.getPostQueue().map((value, index) => {
        // TODO: Map queue to public queue
    });

    res.status(200).json({
        "queue": queue,
        "total": service.getQueuedPostCount(),
    });
};

// TODO: Add re-order queue endpoint
// TODO: Add dequeue post endpoint
// TODO: Add update post endpoint


module.exports = { hello, authenticate, refresh, queuePost, getQueuedPosts };
