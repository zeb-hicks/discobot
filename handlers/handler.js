var handlers = [];

var ModuleHandler = {
  messageIn: function(arg) {
    for (var i = 0; i < handlers.length; i++) {
      var next = false;
      handlers[i](arg, function() {
        next = true;
      });
      if (!next) continue;
    }
  },
  addHandler: function(handler) {
    if (handlers.indexOf(handler) == -1) {
      handlers.push(handler);
    } else {
      throw 'Already have this handler.';
    }
  }
}

module.exports = ModuleHandler;