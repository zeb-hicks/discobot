var dc = global.dc;

function commandHandler(arg, next) {
    // Command interface
  if (arg.msg[0] == '!') { // If the first character of the message is a ! (command)
    var words = arg.msg.substr(1).split(' '); // Split the message up into words.
    var command = words[0]; // Get the first word as the command
    var args = []; // Make an array of all the arguments
    for (var i = 1; i < words.length; i++) args.push(words[i]);

    // Look for commands we recognise.
    switch (words[0].toLowerCase()) {
      case 'herp': // Simple test command.
        // Send a response message.
        dc.sendMessage({
          to: arg.cID,
          message: 'derp'
        });
        break;
      case 'combust': // Combust command, because disco is love.
        dc.sendMessage({
          to: arg.cID,
          message: 'Disco is always burning, baby.'
        });
        return;
      case 'butts': // Anal Moisture subroutine.
        arg.msg = 'My butt is so wet for you, ' + '<@' + arg.e.d.author.id + '>';
        dc.sendMessage({
          to: arg.cID,
          message: arg.msg
        });
        return;
    }
  }
  next();
}

module.exports = commandHandler;