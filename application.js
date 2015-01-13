
$(document).ready(function() {

  window.visitor = "Joaquin_HM";
  window["streams"]["users"][visitor] = [];

  var $visitorName = $('<p class=" ' + visitor + ' username display_name"">' + visitor + '<p>');
  $('.profile-photo').after($visitorName);



  //Function for creating a tweet list. listClass was added as a parameter so that tweets can have the class of allTweetList or userTweetList.
  var displayTweets = function(tweetlist, lastIndex, listClass) {
     var numTweets = tweetlist.length - 1;

      for (var i = lastIndex + 1; i <= numTweets; i++ ) {
        var tweet = tweetlist[i];
        var user = tweet.user;
        var span = '<span' + ' class="' + user + ' username">' + '@' + user + '</span>'; 
        var time = '<span class="time" data-livestamp=' + Date.parse(tweet.created_at)/1000 + '></span>'
        $tweet = $('<div class="' + listClass + '">' + span + ' ' + time + '<br>' + tweet.message + '</div>');
        $tweet.prependTo($('.tweetlist')); 
      }
      return numTweets;
  };

  //Display all tweets on load. 
  var lastTweet = -1; 

  var displayAllTweets = function() {
    return lastTweet = displayTweets(streams.home, lastTweet, "allTweetList");
  };

  displayAllTweets();

  //On clicking 'See What's New' button, new tweets are displayed. 
  $('.refresh_tweets').on('click', function() {
    $('.tweetlist .userTweetList').remove();
    $('.tweetlist div').show();
    displayAllTweets();
  });

  //Populate "Those of interest" list with users. (following)
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    var $user = $('<li class="' + user + ' username"></li>');
    $user.text(user);
    $user.appendTo($('.following'));
  }

  //Lets user submit tweets. Tweets are submitted with enter key. 

  $('form').on('keypress', function(event) {
    if (event.which == 13) {
      event.preventDefault();
      var userInput = $('#user_text').val();
      writeTweet(userInput);
      $('#user_text').val('');
      return false;
    }
  });


  //Displays user tweets when username is clicked. First hides all user tweet list. 

  $('body').on('click', '.username', function() {
    var username = $(this)[0].classList[0];
    $('.tweetlist div').hide();
    var tweetlist = streams["users"][username];
    if (tweetlist.length === 0) {
      var noTweets = '<div>' + username + ' is at a loss for words.</div>';
      $noTweets = $(noTweets);
      $noTweets.prependTo($('.tweetlist'));
    } else  {
      displayTweets(tweetlist, -1, "userTweetList");
    }
  });

});
