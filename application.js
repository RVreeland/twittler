
$(document).ready(function() {

  var thisuser = "Joaquin HM"
  var $thisuser = $('<p class="username ' + thisuser + '"">' + thisuser + '<p>');
  $('.profile-photo').after($thisuser);



//Display tweets on document load. Refresh button displays only new tweets. 
  var lastTweet = -1; 
  
  var displayNew = function(tweetlist) {
    var numTweets = tweetlist.length - 1;

    for (var i = lastTweet + 1; i <= numTweets; i++ ) {
      var tweet = tweetlist[i];
      var user = tweet.user;
      var span = '<span' + ' class="' + user + ' username">' + '@' + user + '</span>'; 
      // // var $tweet = $('<li></li>'); 
      // // $tweet.text(': ' + tweet.message + " " + tweet.created_at + " " + i);
      // var $tweet = $('<li>' + span + '</li>');
      $tweet = $('<div class="allTweetList">' + span + ": " + tweet.message + " " + tweet.created_at + " " + i + '</div>');
      $tweet.prependTo($('.tweetlist')); 
    }

    return lastTweet = numTweets;

  };

  displayNew(streams.home);

  $('.refresh_tweets').on('click', function() {
    $('.tweetlist .userTweetList').remove();
    $('.tweetlist div').show();
    displayNew(streams.home);
  })

//Populate "Those of interest" field with users. (following)
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var $user = $('<li class="' + user + ' username"></li>');
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

//Displays user tweets when username is clicked.

$('body').on('click', '.username', function() {
  // console.log($(this));
  var username = $(this)[0].classList[0];
  $('.tweetlist div').hide();
  var tweetlist = streams["users"][username];
  // displayNew(usertweets);
      var numTweets = tweetlist.length - 1;

    for (var i = 0; i <= numTweets; i++ ) {
      var tweet = tweetlist[i];
      var user = tweet.user;
      var span = '<span' + ' class="' + user + ' username">' + '@' + user + '</span>'; 
      // // var $tweet = $('<li></li>'); 
      // // $tweet.text(': ' + tweet.message + " " + tweet.created_at + " " + i);
      // var $tweet = $('<li>' + span + '</li>');
      $tweet = $('<div class ="userTweetList">' + span + ": " + tweet.message + " " + tweet.created_at + " " + i + '</div>');
      $tweet.prependTo($('.tweetlist')); 
    }

});


