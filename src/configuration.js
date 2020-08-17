class Configuration {
    constructor (json) {
        this.host = json["APP_HOST"];
        this.port = json["APP_PORT"];
        this.igUser = json["INSTAGRAM_USER"];
        this.igPwd = json["INSTAGRAM_PWD"];
        this.imageDir = json["POST_IMAGE_DIRECTORY"];
    }
}

module.exports = Configuration;