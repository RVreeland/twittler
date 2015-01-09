
$(document).ready(function() {

  var thisuser = "Joaquin HM"

//Display tweets on document load. Refresh button displays only new tweets. 
  var lastTweet = -1; 
  
  var displayNew = function() {
    var numTweets = streams.home.length - 1;

    for (var i = lastTweet + 1; i <= numTweets; i++ ) {
      var tweet = streams.home[i];
      var user = tweet.user;
      var span = '<span' + ' class="' + user + '">' + '@' + user + '</span>'; 
      // // var $tweet = $('<li></li>'); 
      // // $tweet.text(': ' + tweet.message + " " + tweet.created_at + " " + i);
      // var $tweet = $('<li>' + span + '</li>');
      $tweet = $('<li>' + span + ": " + tweet.message + " " + tweet.created_at + " " + i + '</li>');
      $tweet.prependTo($('.tweetlist')); 
    }

    return lastTweet = numTweets;

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

//Lets user submit tweets.


  $('#user_tweet').on('click', function() {
    var userInput = $('#user_text').val();
    var $userTweet = $('<li></li>');
    $userTweet.text('@' + thisuser + ': ' +  userInput);
    $userTweet.prependTo($('.tweetlist'));
  })

});

