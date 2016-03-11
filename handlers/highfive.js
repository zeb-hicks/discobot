var dc = global.dc;

function highFiveHandler(arg, next) {
  // Return high-fives.
  if (/\bo\//gi.exec(arg.msg) && arg.msg.indexOf('\\o/') == -1) {
    dc.sendMessage({
      to: arg.cID,
      message: '\\o'
    });
  } else {
    next();
  }
}

module.exports = highFiveHandler;