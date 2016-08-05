(function() { //Immediately Invoked Function Expression

// Quote data
  var quotes = [
      {quote : "No matter who you are, no matter what you did, no matter where you've come from, you can always change, become a better version of yourself." , author : "-- Madonna"},
      {quote : "I like to listen. I have learned a great deal from listening carefully. Most people never listen", author : "-- Ernest Hemingway"},
      {quote : "Motivation is what gets you started. Habit is what keeps you going.", author : "-- Jim Rohn"},
      {quote : "Always bear in mind that your own resolution to succeed is more important than any other.", author : "-- Abraham Lincoln"},
      {quote : "We are all born ignorant, but one must work hard to remain stupid.", author : "-- Benjamin Franklin"},
      {quote : "By failing to prepare, you are preparing to fail.", author : "-- Benjamin Franklin"},
      {quote : "Well done is better than well said.", author : "-- Benjamin Franklin"},
      {quote : "Be yourself; everyone else is already taken.", author : "-- Oscar Wilde"},
      {quote : "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author : "-- Albert Einstein"},
      {quote : "So many books, so little time.", author : "-- Frank Zappa"},
      {quote : "Be the change that you wish to see in the world.", author : "-- Mahatma Gandhi"},
      {quote : "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.", author : "-- J.K. Rowling"},
      {quote : "No one can make you feel inferior without your consent.", author : "-- Eleanor Roosevelt"},
      {quote : "If you tell the truth, you don't have to remember anything.", author : "-- Mark Twain"},
      {quote : "Live as if you were to die tomorrow. Learn as if you were to live forever.", author : "-- Mahatma Gandhi"},
      {quote : "Without music, life would be a mistake.", author : "-- Mark Twain"},
      {quote : "People who think they know everything are a great annoyance to those of us who do.", author : "-- Isaac Asimov"},
      {quote : "Always remember that you are absolutely unique. Just like everyone else.", author : "-- Margaret Mead"},
      {quote : "Obstacles are those frightful things you see when you take your eyes off your goal..", author : "-- Henry Ford"},
      {quote : "Only those who will risk going too far can possibly find out how far one can go. ", author : "-- T.S. Eliot "},
      {quote : "Attitude is a little thing that makes a big difference.", author : "-- Winston Churchill"},
      {quote : "Life is not happening to you. Life is responding to you.", author : "-- Author Unknown"},
      {quote : "Happiness is an attitude. We either make ourselves miserable, or happy and strong. The amount of work is the same.", author : "--Francesca Reigler"},
      {quote : "If I had no sense of humor, I would long ago have committed suicide.", author : "-- Mahatma Gandhi"},
      {quote : "Humor is reason gone mad.", author : "-- Groucho Marx"},
      {quote : "Who is more foolish? The fool or the fool that follows it?", author : "-- Alec Guinness"}
  ];
  // Filter the quote array to a new array with tweetable quotes
  tweetableQuotes = quotes.filter(function(element) {
    if (element.quote.length + element.author.length <= 109) {
      return element.quote + element.author;
    }
  })

  // Set the selector & random number variables
  var quoteArea = document.querySelector('.quote-text');
  var authorArea = document.querySelector('.quote-author');
  var quoteButton = document.querySelector('.generate-quote-button');
  var randomNum = -1;
  var currentNum = -1;

  // Load random quote and tweet button link when page is displayed
  newRandomQuote(tweetableQuotes, quoteArea, authorArea);

  // Generate new random quote and tweet button link on click
  quoteButton.addEventListener('click', function() {
      newRandomQuote(tweetableQuotes, quoteArea, authorArea);
  });

  function newRandomQuote(quoteArray, quoteElement, authorElement) {
    var quote;
    var author;

    // Generate a random number
    while (randomNum == currentNum) {
      currentNum = Math.floor(Math.random() * quoteArray.length);
    }
    // Use the random number to get the quote and author from the array
    quote = quoteArray[currentNum].quote;
    author = quoteArray[currentNum].author;

    // Display the quote and author
    quoteElement.innerHTML = quote;
    authorElement.innerHTML = author;

    // Set the current random number to the initial random number to prevent duplicates
    randomNum = currentNum;

    // Set twitter button attributes
    updateTweetButtonAttributes(quote, author);
  }

  function updateTweetButtonAttributes(quoteText, authorText) {
    var tweetButton = document.querySelector(".tweet-quote-button");
    var url = "https://twitter.com/intent/tweet?";
    var via = "&via=@grofftech";
    var hashtags = "&hashtags=quoteoftheday";

    tweetButton.href = url + "text=" + quoteText + " " + authorText + " " + via + " " + hashtags;
    return tweetButton;
  }
})();
