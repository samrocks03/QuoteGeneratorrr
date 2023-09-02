const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const quoteContainer = document.getElementById('quote-container');
const getQuoteButton = document.getElementById('new-quote');
const twitterButton = document.getElementById('twitter');
const loader = document.getElementById('loader');

function loading() {
    // Show the loader when loading
    loader.style.display = 'block';
    quoteContainer.hidden = true;
}

function complete() {
    // Hide the loader when loading is complete
    loader.style.display = 'none';
    quoteContainer.hidden = false;
}

function fetchRandomQuote() {
    loading();
    fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => {
            const quoteContent = data.content;
            const quoteAuthor = data.author;

            // Display the quote and author
            quoteText.textContent = quoteContent;
            authorText.textContent = !data.author ? 'Unknown' : quoteAuthor;

            // Call complete() inside the then block
            complete();
        })
        .catch((error) => {
            console.error('Error fetching random quote:', error);
            // Make sure to call complete() in case of an error too
            complete();
        });
}

function tweetQuote(quoteContent, quoteAuthor) {
    // Encode the quote content and author for the Twitter URL
    const encodedQuoteContent = encodeURIComponent(quoteContent);
    const encodedQuoteAuthor = encodeURIComponent(quoteAuthor);

    // Compose the Twitter URL with the encoded content and author
    const twitterURL = `https://twitter.com/compose/tweet?text=${encodedQuoteContent} - ${encodedQuoteAuthor}`;

    // Open a new window or tab with the Twitter URL
    window.open(twitterURL, '_blank');
}

// Attach an event listener to the "Get Quote" button
getQuoteButton.addEventListener('click', fetchRandomQuote);

// Attach an event listener to the "Tweet this!" button
twitterButton.addEventListener('click', function () {
    // Call the tweetQuote function with the quote content and author
    tweetQuote(quoteText.textContent, authorText.textContent);
});

// Fetch a random quote when the page loads
fetchRandomQuote();