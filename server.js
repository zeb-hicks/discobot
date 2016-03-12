<<<<<<< HEAD
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
=======
//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];
var users = [];

io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      // var text = String(msg || '');

      // if (!text)
      //   return;

      // socket.get('name', function (err, name) {
      //   var data = {
      //     name: name,
      //     text: text
      //   };

      //   broadcast('message', data);
      //   messages.push(data);
      // });
    });

    socket.on('identify', function (name) {
      // socket.set('id', , function (err) {
      //   updateRoster();
      // });
    });
  });

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
>>>>>>> 57ef1aa2b5038348f0175c303b9eadc16245509c
