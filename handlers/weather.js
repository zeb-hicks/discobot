var dc = global.dc;
var http = require("http");

function greetHandler(arg, next) {
    // If bot is mentioned. (Test with regex)
    var msg;
    if ((msg = /(?:What's the weather in |How's the weather in )([\w\s]*).*(<@156305613897334785>|disco(bot)?|bot)?/gi.exec(arg.msg))) {
    var location = msg[0]
    http.get("http://api.openweathermap.org/data/2.5/find?q="+location+"&type=like&units=metric&mode=json", function(err, res, body) {
        
        if (results.list.length != 0) {
            cb(null, "It is " + results.list[0]['weather'][0]['description']);  
        } else {
            cb(null, "I'm not near a window.");
        }
    });
}