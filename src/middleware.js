const config = require('./configuration');
const jwt = require('jsonwebtoken');
const authentication = require('./authentication');

// Authentication middleware to validate JWT token on incoming requests.
const authenticated = (req, res, next) => {
    const header = req.headers.authorization;

    if (header == null) {
        console.debug('ERROR: Missing Authorization header');
        return res.sendStatus(401);
    }

    const token = header.split(' ')[1];

    if (token == null) {
        console.debug('ERROR: Token not included in Authorization header');
        return res.sendStatus(401);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        
        console.debug("jwt verified")
        console.debug(decoded)
        // check for jwt errors
        if (err) {
            console.debug("ERROR: ", err.toString())
            return res.sendStatus(401);
        }

        // check if token has expired, refresh if possible.
        let tokenExpired = decoded.exp <= Date.now() / 1000;
        
        if (tokenExpired) {
            console.debug("token is expired. Redirecting to refresh")
            return res.redirect("/api/refresh?rtoken=" + decoded.refresh);
        } else {
            console.debug("token is not expired")
        }

        // pass the execution off to whatever request the client intended
        next();
    });
};

module.exports = { authenticated };