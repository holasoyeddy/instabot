const puppeteer = require('puppeteer');

class Instabot {
    constructor(options) {
        this.instagramURL = 'https://instagram.com/';
        this.instagramLoginURL = 'https://www.instagram.com/accounts/login/';
        this.browserOptions = {
            defaultViewport: {
                width: 320,
                height: 570,
                isMobile: true,
            },
            headless: options.headless,
        };
        this.userAgent =
            'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';
        this.username = options.username;
        this.password = options.password;
    }

    postToFeed = async (post) => {
        // TODO: Add try-catch for failed browser launch...
        console.debug('Opening browser...');
        let browser = await puppeteer.launch(this.browserOptions);
        let page = await browser.newPage();
        page.setUserAgent(this.userAgent);

        // TODO: Add try-catch for failed login...
        console.debug('Visiting ', this.instagramLoginURL);
        await page.goto(this.instagramLoginURL);
        await page.waitForSelector("input[name='username']");
        await page.waitFor(250);

        console.debug('Typing in credentials for user: ', this.username);
        // Get the inputs on the page
        let usernameInput = await page.$("input[name='username']");
        let passwordInput = await page.$("input[name='password']");

        // Type the username in the username input
        await usernameInput.click();
        await page.keyboard.type(this.username);

        // Type the password in the password input
        await passwordInput.click();
        await page.keyboard.type(this.password);

        console.debug('Logging in...');

        // Click the login button
        let button = await page.$x("//div[contains(text(),'Log In')]//..");
        await button[0].click();

        // Make sure we are signed in
        await page.waitForNavigation();

        // TODO: Add try-catch for failed feed opening...
        console.debug('Opening feed...');

        // They may try to show us something but just go straight to instagram.com
        await page.goto(this.instagramURL);

        // Wait until everything is loaded
        await page.waitForSelector("input[type='file']");

        // Set the value for the correct file input (last on the page is new post)
        let fileInputs = await page.$$('input[type="file"]');
        let input = fileInputs[fileInputs.length - 1];

        // TODO: Add try-catch for failed to create post...
        console.debug('Creating new post...');

        // Upload the file
        // Note: Instagram seems to have a check in place to make sure you've viewed the file upload dialog,
        // so we have to open it here.
        await page.evaluate(function () {
            document
                .querySelector("[aria-label='New Post']")
                .parentElement.click();
        });
        await page.waitFor(250);

        // TODO: Add try-catch for failed to upload image...
        console.debug('Uploading image...');
        await input.uploadFile(post.filePath);
        await page.waitFor(250);
        // Wait for the next button
        await page.waitForXPath("//button[contains(text(),'Next')]");
        // Get the next button
        let next = await page.$x("//button[contains(text(),'Next')]");
        await next[0].click();

        // TODO: Fix image cropping before upload (always fullscreen)

        // TODO: Add try-catch for failed to add caption...
        if (post.caption != null & post.caption != undefined & post.caption != '') {
            console.debug('Adding caption...');
            // Wait for the caption option
            await page.waitForSelector(
                "textarea[aria-label='Write a caption…']"
            );

            // Click the caption option
            await page.click("textarea[aria-label='Write a caption…']");

            // Type
            await page.keyboard.type(post.caption);
        }
        // TODO: Add try-catch for failed while sharing...
        // Get the share button and click it
        await page.waitForXPath("//button[contains(text(),'Share')]");
        let share = await page.$x("//button[contains(text(),'Share')]");

        console.debug('Sharing post...');
        await share[0].click();
        await page.waitFor(5000);
        await browser.close();
        console.log('Post was shared to feed!');
    };
}

module.exports = Instabot;
