var dc = global.dc;
var fs = require('fs');
var qdata = JSON.parse(fs.readFileSync("./trivia.json"));
var T = {
  qarr: qdata.questions,
  state: 'stopped',
  round: 0,
  rounds: 1,
  time: 30,
  roundLength: 30,
  scores: {},
  current: [],
  channel: 0
}

// Message shorthand function for tersity.
function msg(message, cb) {
  if (message instanceof Array) {
    dc.sendMessage({ to: T.channel, message: message.shift()}, function() {
      if (message.length > 0) {
        msg(message, cb);
      } else {
        if (cb !== undefined) cb();
      }
    });
  } else {
    dc.sendMessage({ to: T.channel, message: arguments[0] }, cb);
  }
}

function triviaHandler(arg, next) {
    // Command interface
  if (arg.msg.indexOf('!trivia') == 0) { // If the first character of the message is a ! (command)
    switch (T.state) {
      case 'stopped':
        T.channel = arg.cID;
        msg('Trivia go!', function() {
          T.round = -1;
          loadQuestions();
          nextRound();
        });
      default:
        if (arg.msg.indexOf('stop') !== -1) {
          T.state = 'stopped';
          if (T.round > 0) {
            gameEnd();
          }
        }
    }
  } else if (arg.msg.indexOf('!shit') == 0) {
    // Vote a trivia question as bad.
  } else {
    if (T.state == 'stopped') {
      next();
    } else {
      // Check for answers.
      if (T.current[T.round] !== undefined && T.current[T.round].regex.exec(arg.msg)) {
        msg(arg.e.d.author.username + ' got it! ' + T.current[T.round].answer);
        if (T.scores[arg.e.d.author.username] === undefined) T.scores[arg.e.d.author.username] = 0;
        T.scores[arg.e.d.author.username]++;
        T.state = 'round end';
        T.time = 5;
      }
    }
  }
}

function nextRound() {
  T.state = 'active';
  if (++T.round < T.rounds) { // Another round
    T.time = T.roundLength;
    msg(T.current[T.round].question);
  } else { // Last round, game over.
    T.time = 3;
    T.state = 'game end';
    T.current.length = 0;
    msg('Game over!');
  }
}

function gameEnd() {
  var t = [];
  for (var a in T.scores) {
    if (a !== 'length') {
      t.push(T.scores[a] + ' point' + (T.scores[a] == 1 ? '' : 's') + ': ' + a);
    }
  }
  t.sort(function(a, b) {
    return Number(b.substr(0, b.indexOf(' '))) - Number(a.substr(0, a.indexOf(' ')));
  });
  for (var i = 0; i < t.length; i++) {
    t[i] = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth','Ninth','Tenth','Eleventh','Twelfth'][i] + ' place with ' + t[i];
  }
  msg(['**Final results:**', t.join('\n')]);
}

function loadQuestions() {
  T.current.length = 0;
  T.scores.length = 0;
  // Add a bunch of unique questions.
  for (var i = 0; i < T.rounds; i++) {
    var q;
    do { q = T.qarr[Math.floor(Math.random() * T.qarr.length)]; }
    while (T.current.indexOf(q) >= 0)
    T.current.push(q);
  }
  // Convert the regex strings to regex objects.
  for (var i = 0; i < T.current.length; i++) {
    T.current[i].regex = new RegExp(T.current[i].regex, 'gi');
  }
}

function update() {
  // if (T.current.length > 0) console.log(T.state, T.round, T.current[T.round].question, T.current[T.round].answer);
  switch (T.state) {
    case 'active':
      if (T.time-- > 0) {
        if (T.time == 10) msg('Ten seconds left.');
        if (T.time == 5) msg('Five seconds!');
        if (T.time == 0) msg('Too bad! The answer was: ' + T.current[T.round].answer);
      } else {
        T.state = 'round end';
        T.time = 2;
      }
      break;
    case 'round end':
      if (T.time-- <= 0) {
        nextRound();
      }
      break;
    case 'game end':
      T.state = 'stopped';
      gameEnd();
      break;
  }
}

setInterval(update, 1000);

module.exports = triviaHandler;