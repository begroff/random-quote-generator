(function loadQuote() {
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

        var quoteAndAuthor = data.quoteText + data.quoteAuthor;
        // Check and see if the quote we get is tweetable
        if (quoteAndAuthor.length < 109) {
          $('.loadingQuote').hide();
          $('blockquote').show();
          $(".quoteText").html(data.quoteText);
          $('.quoteAuthor').html(data.quoteAuthor);
          $('.btn-tweet').show();

          updateTweetButtonAttributes(data.quoteText, data.quoteAuthor);
        }
        else {
          getQuote();
        }
      },
      error: function requestError (xhr, status, error) {
        $('.loadingQuote').hide();
        $('blockquote').show();
        $('.btn-tweet').hide();
        $('.quoteText').html("There was an error with loading the quote");
        $('.quoteAuthor').html("Please try again");
        console.log("xhr: " + xhr + "\nstatus: " + status + "\nerror: " + error);
      }
    });
  }

  // Generating a new quote on button click
  $('.btn-generate-quote').on("click", function generateQuote() {
    $('blockquote').hide();
    $('.loadingQuote').show();
    getQuote();
  });

  function updateTweetButtonAttributes(quote, author) {
      var tweetButton = $('.btn-tweet');
      var tweetIntentUrl = "https://twitter.com/intent/tweet?";
      var quoteText = encodeURI("text=" + quote + "—" + author + "&via=begroff" + "&hashtags=quoteoftheday");

      tweetButton.attr('href', tweetIntentUrl + quoteText);
    }

  getQuote();
})();
