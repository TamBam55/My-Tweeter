/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {



  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  /* Your code for creating the tweet element */
  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      let createATweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $("#tweet-container").prepend(createATweet);
    }


  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    let $tweet = `
<article class="tweet">
  <header>
    <div>
      <img src=${tweet.user.avatars} width="60px"
        alt="">
      <p>${tweet.user.name}</p>
    </div>
    <p>${tweet.user.handle}</p>
  </header>
  <p>${escape(tweet.content.text)}</p>
  <footer>
    <p>${timeago.format(tweet.created_at)}</p>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;

    return $tweet;
  };

  // ajax GET request 
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(tweets) {
        console.log("The tweets are storing in the database");
        renderTweets(tweets);
      });
    $('#tweeter-text').val("");
    $('.counter').text(140);
  };


  const $form = $('form');
  $form.on('submit', function(events) {
    events.preventDefault();
    console.log('Button clicked, performing ajax call...');
    const tweet = $(this).serialize();
    console.log(tweet);
    if (tweet.length === 5) {
      return alert("Please type a tweet to submit");
    } else if (tweet.length >= 146)
      return alert("Please modify to 140 characters or less");
    $.ajax('/tweets', { method: 'POST', data: tweet }).then(loadTweets());

  });

  

  loadTweets();
});
