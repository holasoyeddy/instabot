const cron = require('node-cron')
const config = require('./configuration');
const Instabot = require('./instabot');

const queue = [];
let bot = null;


const checkPostQueue = async () => {
    console.debug("Checking queue for new posts...")
    const post = queue.shift();
    if (post == undefined) {
        console.debug("No new posts found.")
    } else {
        await bot.postToFeed(post);
    }
}

const setup = () => {
   console.debug('Creating bot...')
    bot = new Instabot(
            {
                username: config.igUser,
                password: config.igPwd,
                headless: true,
                imageDir: config.imageDir
            }
        );
    
    console.debug("Running task scheduler...")
    cron.schedule('* * * * *', checkPostQueue);
}

const addToPostQueue = (post) => {
    console.debug("Adding new post to post queue...")
    queue.push(post)
    console.debug("Added post successfully.")

}

const getQueuedPostCount = () => {
    return queue.length;
}

const getPostQueue = () => {
    return queue;
}

module.exports = { setup, addToPostQueue, getQueuedPostCount, getPostQueue }