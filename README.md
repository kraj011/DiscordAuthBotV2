# Discord Auth Bot V2
Discord Auth Bot V2 is a new and improved version of my original discord auth bot. This project is written with the Node.js framework and React as opposed to using java, making it much easier to setup.

My goals for this project:
  - Easier to setup
  - Nice, browser based UI to manage server (React)
  - Easy to integrate with discord

## Prerequisites
- Make sure you have npm installed (https://www.npmjs.com/get-npm)
- Make sure you have yarn installed (https://yarnpkg.com/en/) 
- Make sure you have gatsby installed (https://www.gatsbyjs.org/docs/) 

## Installation
Run the following commands to install
* Quick note: If you are on a mac or linux machine, you may need to run the following commands with sudo in front of them (i.e. sudo npm install)


```sh
cd [file path of where this project is stored]
npm install
npm run develop
```

## Setup
- Go to https://discordapp.com/developers/applications/
- Create a new bot and name it what you want and give it an icon if you would like
- Go to Bot on the left panel and click create bot
- Click reveal token, copy this token, and go to src/scripts/runDiscord.js and change the token string to the token you copies (TODO: Set the token in the dashboard?)

## Questions?
If you have any questions, feel free to message me on twitter @DynxSZN
