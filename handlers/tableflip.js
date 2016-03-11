var dc = global.dc;

function tableFlipHandler(arg, next) {
  // Un-flip tables.
  if (arg.msg.indexOf('(╯°□°）╯︵ ┻━┻') > -1) {
    dc.sendMessage({
      to: arg.cID,
      message: '┬─┬ノ(° _ °ノ)'
    });
  } else {
    next();
  }
}

module.exports = tableFlipHandler;