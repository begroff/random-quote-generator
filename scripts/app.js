(function loadQuote() { //Immediately Invoked Function Expression
  $('blockquote').hide();
  $('.loadingQuote').show();

  function getQuote() {
    $.ajax({
      url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
      dataType: "jsonp",

      success: function requestSuccessful (data) {
        if (data.quoteAuthor == "") {
          data.quoteAuthor = "Unknown";
        }
        // Check and see if quote plus author is less than 109 characters,
        var quoteAndAuthor = data.quoteText + data.quoteAuthor;

        if (quoteAndAuthor.length < 109) {
          // Hide the loading icon
          $('.loadingQuote').hide();
          // Show the blockquote
          $('blockquote').show();
          // Display the quote
          $(".quoteText").html(data.quoteText);
          // Display the author
          $('.quoteAuthor').html(data.quoteAuthor);
        }
        else {
          getQuote();
        }

        updateTweetButtonAttributes(data.quoteText, data.quoteAuthor);
      },
      error: function requestError (xhr, status, error) {
        $('.loadingQuote').hide();
        $('blockquote').show();
        $('cite').hide();
        $('.btn-tweet').hide();
        $('.quoteText').html("There was an error with loading the quote. Please try again.");
        console.log("xhr: " + xhr + "\nstatus: " + status + "\nerror: " + error);
      }
    });
  };

  // Generating a new quote on button click
  $('.btn-generate-quote').on("click", function generateQuote() {
    $('blockquote').hide();
    $('.loadingQuote').show();
    getQuote();
  });

  function updateTweetButtonAttributes(quote, author) {
      var tweetButton = $('.btn-tweet');
      var tweetIntentUrl = "https://twitter.com/intent/tweet?";
      var quote = "text=" + quote + "—" + author;
      var via = "&via=begroff";
      var hashtags = "&hashtags=quoteoftheday";

      tweetButton.attr('href', tweetIntentUrl + quote + via + hashtags);
    }

  getQuote();
})();
