
$(document).ready(function() {
  // jQuery("abbr.timeago").timeago();

  window.visitor = "Joaquin_HM";
  window["streams"]["users"][visitor] = [];

  var $visitorName = $('<p class=" ' + visitor + ' username display_name"">' + visitor + '<p>');
  $('.profile-photo').after($visitorName);



//Display tweets on document load. Refresh button displays only new tweets. 
  var lastTweet = -1; 
  
  var displayTweets = function(tweetlist, lastIndex) {
     var numTweets = tweetlist.length - 1;

      for (var i = lastIndex + 1; i <= numTweets; i++ ) {
        var tweet = tweetlist[i];
        var user = tweet.user;
        var span = '<span' + ' class="' + user + ' username">' + '@' + user + '</span>'; 
        var time = '<span class="time" data-livestamp=' + Date.parse(tweet.created_at)/1000 + '></span>'
        $tweet = $('<div class="allTweetList">' + span + ' ' + time + '<br>' + tweet.message + '</div>');
        $tweet.prependTo($('.tweetlist')); 
      }
      return numTweets;
  };

  var displayAllTweets = function() {
    return lastTweet = displayTweets(streams.home, lastTweet);
  };

  displayAllTweets();


  $('.refresh_tweets').on('click', function() {
    $('.tweetlist .userTweetList').remove();
    $('.tweetlist div').show();
    displayTweets(streams.home);
  })

  //Populate "Those of interest" field with users. (following)
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var $user = $('<li class="' + user + ' username"></li>');
    $user.text(user);
    $user.appendTo($('.following'));
  }

  //Lets user submit tweets.

  // $('#user_tweet').on('click', function() {
  //   var userInput = $('#user_text').val();
  //   writeTweet(userInput);
  //   $('#user_text').val('');
  // });

  $('form').on('keypress', function(event) {
    if (event.which == 13) {
      event.preventDefault();
      var userInput = $('#user_text').val();
      writeTweet(userInput);
      $('#user_text').val('');
      return false;
    }
  });


  //Displays user tweets when username is clicked.

  $('body').on('click', '.username', function() {
    var username = $(this)[0].classList[0];
    $('.tweetlist div').hide();
    var tweetlist = streams["users"][username];
    if (tweetlist.length === 0) {
      var noTweets = '<div>' + username + ' is at a loss for words.</div>';
      $noTweets = $(noTweets);
      $noTweets.prependTo($('.tweetlist'));
    } else  {
      displayTweets(tweetlist, -1);
    }

  });

});
