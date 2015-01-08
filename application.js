
$(document).ready(function() {

//Display tweets on document load. Refresh button displays only new tweets. 
  var displayNew = function() {
    var lastTweet = -1; 
    var numTweets = streams.home.length - 1;

    for (var i = lastTweet + 1; i <= numTweets; i++ ) {
      var tweet = streams.home[i];
      var $tweet = $('<li></li>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message + " " + tweet.created_at + " " + i);
      $tweet.prependTo($('.tweetlist')); 
    }

    lastTweet = numTweets;

  };

  displayNew();

  $('.refresh_tweets').on('click', function() {
    displayNew();
  })

//Populate "Those of interest" field with users. (following)
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var $user = $('<li></li>');
    $user.text(user);
    $user.appendTo($('.following'));
  }


});

