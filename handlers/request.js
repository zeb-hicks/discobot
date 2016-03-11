var dc = global.dc;

function requestHandler(arg, next) {
  var req = /<@156305613897334785>[,\.:;]?\s*(\w+) me ?([\w\s]*)/gi.exec(arg.msg);
  if (req) {
    switch (req[0]) {
      default: var rand = Math.random();
      var msg = '';
      if (rand < 0.33) {
        msg = 'Sorry <@' + e.d.author.id + '>, I don\'t know how to ' + req[1] + ' you ' + req[2] + '.';
      }
      else if (rand < 0.66) {
        msg = 'I don\'t know how to ' + req[1] + ' you ' + req[2] + '.';
      }
      else {
        msg = 'I don\'t know how.';
      }
      dc.sendMessage({
        to: arg.cID,
        message: msg
      });
    }
  } else {
    next();
  }
}

module.exports = requestHandler;