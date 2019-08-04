# Discord Auth Bot V2
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/dynxszn)

Discord Auth Bot V2 is a new and improved version of my original discord auth bot. This project is written with the Node.js framework and React as opposed to using java, making it much easier to setup.

![Image from Gyazo](https://i.gyazo.com/ec2ba45cef2878a860ab2bb283c9f446.gif)

![Image from Gyazo](https://i.gyazo.com/4b3081187336c9e09cb757fc3317ce21.gif)

NOTE: I have not had the time to consistently work on this project, so feel free to submit any PR's :D

My goals for this project:

- Easier to setup
- Nice, browser based UI to manage server (React)
- Easy to integrate with discord

## Prerequisites

- Make sure you have npm installed (https://www.npmjs.com/get-npm)
- Make sure you have yarn installed (https://yarnpkg.com/en/)
- Make sure ports 8000 and 8001 are available

## Installation

First, hit the "Clone or Download" button in the top right of the screen. This will download a zip file of the project.

Next, extract the zip file.

Run the following commands on your preferred terminal to install

- Quick note: If you are on a mac or linux machine, you may need to run the npm install command with sudo in front of it (i.e. sudo npm install)

```sh
cd [file path of where this project is stored]
npm install
yarn upgrade
npm start
```

## Setup

- Go to https://discordapp.com/developers/applications/
- Create a new bot and name it what you want and give it an icon if you would like
- Go to Bot on the left panel and click create bot
- Add the bot to your server
- Click reveal token, copy this token and once you launch the program (follow instructions below) go to the settings page and save it in the field marked 'Token'
- Once you update this token, restart the program by quitting terminal and running "npm start" again to make sure the bot uses the updated token

## Usage

- Users can DM the bot with !help for how to activate a key with the bot
- Users can DM the bot with !activate <<key>> to activate a key with the bot
- Users can DM the bot with !deactivate <<key>> to deactivate a key with the bot

- To open the dashboard, make sure the npm start command was run and open a browser with: http://127.0.0.1:8000/
- At any point, to return to the dashboard home page simply click the title at the top of the page

- To add a key, simply open the dashboard and go to the generate keys section. Here, enter the amount of keys you would like to generate and the length of each key
- To deactivate a key, go to the manage users page and click on the keys you wish to deactivate and hit the "unbind selected" button at the bottom

- (Optional) In the settings page, you are able to set a role to add to authenticated users and a role to remove from authenticated users:
  - Role to add: When the user activates their key, this role will be applied to them (i.e. a role showing that they are authenticated)
  - Role to remove: When the user activates their key, this role will be removed from them (i.e. some sort of unauthenticated role)
  - Remember, when you enter these roles they are case sensitive and must match EXACTLY what they say on discord
  - Also, when you create these roles, go to your server settings and then the roles tab and make sure that the bot's role is higher than the roles you are trying to add and remove, if they are not simply drag them into the proper order

## TODO:

- [x] Finish key activating and deactivating through discord
- [x] Unbind keys through dashboard
- [x] Generate keys through dashboard
- [x] Add role updating functionality
- [ ] Add custom key creation
- [ ] Add credit card provider implementation
- [ ] Add keys that can expire at certain times
- [ ] Add key groups / types
- [ ] Switch to a formal DB instead of local json files

## Questions?

If you have any questions, feel free to message me on twitter @DynxSZN
