/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  /* Your code for creating the tweet element */
  const renderTweets = function (tweets) {
    // loops through tweets
    for (let tweet of tweets) {
      // calls createTweetElement for each tweet
      let createATweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $("#tweet-container").prepend(createATweet);
    }
  };

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
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
  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then((tweets) => renderTweets(tweets)) 
    $("#tweeter-text").val("");
    $(".counter").text(140);
  };

  const $form = $("form");
  $form.on("submit", function (events) {
      events.preventDefault();
  
      const tweet = $(this).serialize();
      const tweetLength = tweet.length;
  
      if (tweetLength <= 5) {
        $("#error-message").slideDown(400);
      } else if (tweetLength >= 146) {
         $("#error-two").slideDown(400);
      } else {
          $("#error-message").slideUp(400);
          $("#error-two").slideUp(400);
          $.ajax("/tweets", { method: "POST", data: tweet }).then(() => loadTweets());
      }
  });

  loadTweets();
});
