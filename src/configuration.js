const config = require('./controllers')

class Configuration {
    constructor () {
        const jsonPath = '../config/server.' + process.env.NODE_ENV + '.json';
        const json = require(jsonPath);
        this.host = json["APP_HOST"];
        this.port = json["APP_PORT"];
        this.secret = json["APP_SECRET"];
        this.tokenExpireTime = json["TOKEN_EXPIRE_TIME"];
        this.igUser = json["INSTAGRAM_USER"];
        this.igPwd = json["INSTAGRAM_PWD"];
        this.imageDir = json["IMAGE_DIRECTORY"];
    }
}

// Export as Singleton
const instance = new Configuration();
module.exports = instance;