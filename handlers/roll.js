var dc = global.dc;

function rollHandler(arg, next) {
  // Roll dice.
  var roll = /(\d+)d(\d+)(?:\+(\d+))?/gi.exec(arg.msg);
  if (roll) {
    // Get the number of dice and the size of die from the regex.

    // We can parse the strings to integers here to make our lives easier.
    // We should be storing them as numbers anyway.
    var count = parseInt(roll[1]);
    var die = parseInt(roll[2]);
    var bonus = parseInt(roll[3] !== undefined ? roll[3] : 0);

    console.log(bonus);
    // Check for abuse.
    if (count > 50 || die > 100000) {
      dc.sendMessage({
        to: arg.cID,
        message: 'Calm the hell down, son.'
      });
      return;
    }

    var rolls = [];
    var rollResult = '';
    var total = 0;
    // Roll each of the die and remember the rolls.
    for (var i = 0; i < count; i++) {
      rolls.push(1 + Math.floor(Math.random() * die));
    }
    // Start building the result string.
    rollResult = 'Rolled: ';
    // Go through each of the rolls and append them to the roll string.
    for (var r = 0; r < rolls.length; r++) {
      rollResult += rolls[r] + ', ';
      total += rolls[r];
    }
    // Add the bonus to the roll.
    if (bonus !== 0){
      rollResult += 'with bonus ' + bonus;
    }
    // Add the total to the end of the result.
    rollResult += ' for total: ' + (total + bonus);
    // Send result message.
    dc.sendMessage({
      to: arg.cID,
      message: rollResult
    });
  } else {
    next();
  }
}

module.exports = rollHandler;