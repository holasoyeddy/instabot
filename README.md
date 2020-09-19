# Instabot

Instabot is an instagram bot server that allows us to automate my shitposting.

## Features

* ### Scheduled Post Queue: 
Instabot has a post queue so you can post your images in a timely manner. It takes a cron expression and publishes posts on a timely schedule based on that.

That's about it.

## Is this useful?

Probably not. But I'm bored and too lazy to remember to post to my meme page. So, this is useful for me.

## How it works

Instabot creates a bot instance that is written using Puppeteer. It then uses Node.js and Express to manage the bot via HTTP calls.

## Does it scale?

Lol. It's Node.js and it's mostly shit-code I wrote while bored. It probably doesn't scale.

## Prerequisites
* Node
* Yarn

## How do I run it?

1. Download the code via git

`git clone git@github.com:holasoyeddy/instabot.git`

2. Enter the directory and install dependencies
```
cd instabot
yarn install
```

3. Create two copies of the "config/server.template.json", rename them and add your configuration data.
```
cp config/server.template.json config/server.development.json
cp config/server.template.json config/server.production.json
```

4. Use the following commands to run the Express server.
```
yarn debug // for development env
yarn start // for production env
```

## Contributing

I really don't expect anybody to contribute or use this. It's a bit ad-hoc and not really my best work. 

I'm just hosting it on GitHub to upload something since my GitHub page is mostly abandoned. I'm not even sure why I bothered to write this README, to be honest.