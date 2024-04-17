/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  loadTweets();
  $("#submit-tweet").on("submit", onSubmit);
});

/////////////////////////////////////HELPER FUNCTIONS/////////////////////////////////////////////////////////

/**
 * function that fetches tweets from backend and appends them to the HTML.
 */
const loadTweets = function () {
  console.log("here")
  $.get("/tweets")
    .then((data) => {
      renderTweets(data);
    });
};

/**
   * Function to create HTML tweets,
   * @param {*} tweet
   * @returns html
   */
const createTweetElement = (tweet) => {
  const newTweet = $(`
      <article class="tweet"> 
      <header>
        <div class="profile">
          <img src="${tweet.user.avatars}"> 
          <span>${tweet.user.name}</span>
        </div>
        <div class="user_id">
          <span>${tweet.user.handle}</span>
        </div>
      </header>
      <p>
        ${tweet.content.text}
      </p>
      <footer>
        <p>${timeago.format(tweet.created_at)}</p>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-repeat"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
  `);
  return newTweet;
};

/**
 * Function to render tweets data
 * @param {*} tweets
 */
const renderTweets = (tweets) => {
  const container = $("#tweet-container");

  for (let tweet of tweets) {
    const element = createTweetElement(tweet);
    container.append(element);
  }
};

/**
 * Callback/handler function that is passed to the event listener of submit form.
 * @param {*} event
 */
const onSubmit = function (event) {
  event.preventDefault();

  const serializedForm = $(this).serialize();
  console.log(serializedForm);

  $.post("/tweets", serializedForm)
    .then(() => {
      console.log('Tweet sent');
    });
}