var dc = global.dc;

function greetHandler(arg, next) {
  // If bot is mentioned. (Test with regex)
  if (/(hi|hey|hello|yo|sup|'ey|hola|bonsoir|abientot|GREETINGS TINY HUMAN).*(<@156305613897334785>|disco(bot)?|bot)/gi.exec(arg.msg) && global.casualCheck()) {

    // Randomly generate a greeting.
    var greetings = ['Yo', 'Hey', 'Sup', 'Yes,', '\'?Ey', 'Hola', 'GREETINGS TINY HUMAN', 'I greet you with my human words', 'Hoi'];
    var greetid = Math.floor(Math.random() * greetings.length);
    var greet = greetings[greetid];

    // End the message with a period, or sometimes an exclaimation mark.
    var ex = ['.', '!'][Math.floor(Math.random() * 1.15)];

    var msg;

    // Figure out how to respond using probability.
    switch (Math.floor(Math.pow(Math.random(), 3) * 5)) { // Probability is exponential curve
      case 0:
        msg = greet + ' <@' + arg.e.d.author.id + '>' + ex;
        break;
      case 1:
        msg = greet + ' <@' + arg.e.d.author.id + '>' + '. What do?' + ex;
        break;
      case 2:
        msg = '<@' + arg.e.d.author.id + '>' + ', you salty dog, you' + ex;
        break;
      case 3:
        msg = 'Are you excited ' + '<@' + arg.e.d.author.id + '>' + '?';
        break;
      case 4:
        msg = 'Lets get dangerous' + ex;
        break;
    }

    // Send our response.
    dc.sendMessage({

      // Send it to the channel the message came from.
      to: arg.cID,

      // Send a message with a random greeting, and sometimes exclaim it.
      message: msg

    }, function() {
      // Message sent callback.
    });
  } else {
    next();
  }
}

module.exports = greetHandler;