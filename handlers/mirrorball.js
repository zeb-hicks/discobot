var dc = global.dc;

function mirrorballHandler(arg, next) {
  // Flashy ball physics.
  if (/mirrorball/gi.exec(arg.msg) && global.casualCheck()) {
    // Send our response.
    dc.sendMessage({
      to: arg.cID,
      message: 'I am a constantly-flashing potato.'

    });
  } else {
    next();
  }
}

module.exports = mirrorballHandler;