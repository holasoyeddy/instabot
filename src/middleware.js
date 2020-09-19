const config = require('./configuration');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const path = require('path')
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

// Multer upload middleware with configuration
const upload = multer(
    { 
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, process.cwd() + "/cache/img" );
            },
            filename: (req, file, cb) => {
                cb(null,  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + path.extname(file.originalname));
            }
        }), 
        fileFilter: (req, file, cb) => {
            if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
                cb(null, true);
            } else {
                cb(null, false);
            }
        } 
    }
);

module.exports = { authenticated, upload };