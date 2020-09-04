const jwt = require('jsonwebtoken');
const config = require('./configuration');
const encryption = require('crypto');

let currentRefreshToken = null;

const authenticate = (apiKey) => {
    if (apiKey == config.secret) {
        return generateToken()
    } else {
        return null;
    }
}

const generateToken = () => {

    currentRefreshToken = encryption.randomBytes(16).toString('hex')
    console.debug("CURRENT REFRESH TOKEN: ", currentRefreshToken);
    let token = {
        refresh:  currentRefreshToken   
    };

    return jwt.sign(token, config.secret, { expiresIn: config.tokenExpireTime });
};

module.exports = { generateToken, authenticate, currentRefreshToken }