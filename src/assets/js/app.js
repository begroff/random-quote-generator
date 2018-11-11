(function loadQuote() {
  $('blockquote').hide();
  $('.loading').show();

  function getQuote() {
    $.ajax({
      url: "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?",
      dataType: "jsonp",

      success: function requestSuccessful(data) {
        if (data.quoteAuthor == "") {
          data.quoteAuthor = "Unknown";
        }

        var quoteAndAuthor = data.quoteText + data.quoteAuthor;
        // Check and see if the quote we get is tweetable
        if (quoteAndAuthor.length < 109) {
          $('.loading').hide();
          $('blockquote').show();
          $(".quote__text").html(data.quoteText);
          $('.quote__author').html(data.quoteAuthor);
          $('.quote__tweet-button').show();

          updateTweetButtonAttributes(data.quoteText, data.quoteAuthor);
        }
        else {
          getQuote();
        }
      },
      error: function requestError(xhr, status, error) {
        $('.loading').hide();
        $('blockquote').show();
        $('.quote__tweet-button').hide();
        $('.quote__text').html("There was an error with loading the quote. Please try again.");
        $('.quote__author').html("");
        console.log("xhr: " + xhr + "\nstatus: " + status + "\nerror: " + error);
      }
    });
  }

  // Generating a new quote on button click
  $('.new-quote__button').on("click", function generateQuote() {
    $('blockquote').hide();
    $('.loading').show();
    getQuote();
  });

  function updateTweetButtonAttributes(quote, author) {
      var tweetButton = $('.quote__tweet-button');
      var tweetIntentUrl = "https://twitter.com/intent/tweet?";
      var quoteText = encodeURI("text=" + quote + "—" + author + "&via=begroff" + "&hashtags=quoteoftheday");

      tweetButton.attr('href', tweetIntentUrl + quoteText);
    }

  getQuote();
})();
