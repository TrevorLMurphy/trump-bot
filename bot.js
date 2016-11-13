var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /(Trump)|(Donald)|(money)|(America)|(Pussy)/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq, trumpQuotes;

  trumpQuotes = ["They're rapists. And some, I assume, are good people",
             "I would bomb the shit out of them!",
             "Look at that face!",
             "Blood coming out of her wherever.",
             "You don't cure a child molester.",
             "I like people who weren't captured.",
             "If Ivanka weren't my daughter, perhaps I'd be dating her.",
             "Ariana Huffington is unattractive, both inside and out. " +
             "I fully understand why her former husband left her for a man - " +
             "he made a good decision.",
             "If I were running 'The View', I'd fire Rosie O'Donnell. I " +
             "mean, I'd look at her right in that fat, ugly face of hers, " +
             "I'd say 'Rosie, your'e fired.'",
             "It's freezing and snowing in New York - we need global warming!",
             "I have a great relationship with the Blacks. I've always had " +
             "a great relationship with the Blacks.",
             "An extremely credible source has called my office and told " +
             "me that Barack Obama's birth certificate is a fraud.",
             "I am the least racist person there is. And I think most people " +
             "that know me would tell you that. I am the least racist.",
             "The concept of global warming was created by and for the " +
             "Chinese in order to make U.S. manufacturing non-competitive.",
             "I have never seen a thin person drinking Diet Coke.",
             "You know, it really doesn't matter what the media write as " +
             "long as you've got a young, and beautiful piece of ass.",
             "I would bring back waterboarding and I'd bring back a " +
             "hell of a lot worse than waterboarding.",
             "Grab 'em by the pussy.",
             "Make America great again!"];

  var rand = trumpQuotes[Math.floor(Math.random() * trumpQuotes.length)];

  botResponse = rand;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
