var fs = require('fs');
var moduleHandler = require('./handlers/handler.js');

var DiscordClient = require('discord.io');
var dc = new DiscordClient({
  autorun: true,
  email: 'discordant.bot@gmail.com',
  password: 'phosphorous'
});

var channels = {};
var words = JSON.parse(fs.readFileSync('words.json')); // Big-ass dictionary

global.dc = dc;

dc.on('ready', init);
dc.on('message', msgin);

// Message received
function msgin(user, uID, cID, msg, e) {
  
  // Cancel if it was us who sent the message.
  if (e.d.author.id === dc.id) return;
  console.log('Got message... ' + channels[cID].name + ':' + e.d.author.username + ':' + msg);

  moduleHandler.messageIn({msg: msg, cID: cID, e: e});

}

// TEST

// Setup function
function init() {
  // Grab all the channels we're subscribed to from the discord connection
  // and throw them all into one handy list so we can reference them far
  // less verbosely.
  for (var sid in dc.servers) {
    for (var c in dc.servers[sid].channels) {
      channels[c] = dc.servers[sid].channels[c];
    }
  }
  
  // Throw down all our message handlers.
  moduleHandler.addHandler(require('./handlers/trivia.js'));
  moduleHandler.addHandler(require('./handlers/commands.js'));
  moduleHandler.addHandler(require('./handlers/roll.js'));
  moduleHandler.addHandler(require('./handlers/greet.js'));
  moduleHandler.addHandler(require('./handlers/highfive.js'));
  moduleHandler.addHandler(require('./handlers/request.js'));
  moduleHandler.addHandler(require('./handlers/tableflip.js'));
  moduleHandler.addHandler(require('./handlers/mirrorball.js'));
}

// Function to prevent spamming chat with non-command nonsense.
// Will be less likely to respond to casual banter if the bot has responded recently.
// Uses time comparison wizardry.
var lastSpoke = Date.now();

function casualCheck() {
  var now = Date.now();
  var coef = (now - lastSpoke) / 3000;
  console.log('Casual chat. Coefficient: ' + coef);
  if (Math.random() < 0.8 && coef > Math.random() * 10 + 2) {
    lastSpoke = now;
    return true;
  }
  return false;
}
global.casualCheck = casualCheck;
