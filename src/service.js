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
        console.debug("New post found! Sharing to feed.")
        await bot.postToFeed(post);
    }
}

const setup = () => {
   console.debug('Creating bot...')
    bot = new Instabot(
            {
                username: config.igUser,
                password: config.igPwd,
                headless: process.env.NODE_ENV != 'development',
            }
        );
    
    console.debug("Running task scheduler...")
    cron.schedule('* * * * *', checkPostQueue);
}

const addToPostQueue = (post) => {
    console.debug("Adding new post to post queue...")
    queue.push(post)
    // TODO: Use saveQueueToCache function
    console.debug("Added post successfully.")

}

const getQueuedPostCount = () => {
    return queue.length;
}

// TODO:Map array to public array
const getPostQueue = () => {
    return queue;
}

// TODO: Add saveQueueToCache function


module.exports = { setup, addToPostQueue, getQueuedPostCount, getPostQueue }