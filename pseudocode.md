<!-- Pseudocode -->

**** question - what happens if the values are equal and there is a draw? i assume the player scores 0, so we will need some backup cards (maybe pull 20?)

1. LOCAL STORAGE. When we hit the start button we want to save API data for 10 random cards into local storage. These will be the cards that we play with and will save us repeatedly having to call the Pokemon API
2. Create a "deck" array with the following information from the Pokemon API: Name, Image, HP, Attack, Defense, Speed. We need to create button elements to display these on player cards.
3. Set the game up for 5 rounds. Create a while loop that continues as long as the number of rounds is below 6.
4. Start a loop to play the game:
  a. Randomly select two cards from the pool of cards. Put one in Player card element and the other in the Opponent card element.
  b. Display the card data on Player card. Display a placeholder image on Opponent card (suggest this https://www.google.com/url?sa=i&url=https%3A%2F%2Fbulbapedia.bulbagarden.net%2Fw%2Findex.php%3Ftitle%3DFile%3ACardback.jpg%26oldid%3D0&psig=AOvVaw2_Nmj9bfMXGGMlhEKoFkp3&ust=1675977334187000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPCS2J_shv0CFQAAAAAdAAAAABAD).
  c. Prompt Player to choose a category (HP, Attack, Defense, Speed) to compare between the two cards.
  d. Display opponent card.
  e. Determine the winner based on the chosen category and which category value/integer is higher. The card with the higher value in that category wins.
  f. Update the score +1 to the winner.
  g. Update the round number by +1 (in logic and on display)
  h. Repeat steps a to d until 5 rounds have been played 
5. Determine the winner of the game by counting the number of rounds won. The player with the most rounds won, wins.
6. For winners, display a 'celebrate' gif. For losers, display a 'thumbs down' gif.
7. Option to restart the game. This restart button should clear the local storage.

<!-- LOGIC -->

<!-- API's -->

Pokemon API
URL:
Key:

Giphy API
URL:
Key: 

<!-- Variables -->

var deck = [];
var playerCards = [];
var opponentCards = [];
var playerScore = 0;
var opponentScore = 0;
var chosenCategory = "";

<!-- Functions -->

<!-- Function to clear local storage -->
function clearLocalStorage() {
    <!-- Code to clear all data stored in local storage -->
    localStorage.clear();
}

<!-- Function to retrieve data from API and store it in local storage -->
function getAPIData() {
    <!-- Code to make an API request and retrieve the data -->
    var data = makeAPICall();
    <!-- Code to store the data in local storage -->
    localStorage.setItem("data", data);
}

<!-- Function to handle the start button click event -->
function startButtonClick() {
    <!-- Code to clear local storage -->
    clearLocalStorage();
    <!-- Code to retrieve data from the API and store it in local storage -->
    getAPIData();
}

<!-- Code to attach an event listener to the start button to handle clicks -->
jQuery: $("#start-button").click(startbutton click)

<!-- Function to shuffle the deck -->
function shuffleDeck(deck) {
    <!-- Code to shuffle the deck -->
}

<!-- Function to deal cards to players -->
function dealCards(deck) {
    <!-- Code to split the deck into playerCards and opponentCards -->
}

<!-- Function to start a new game -->
function newGame() {
    <!-- Code to reset game variables and start a new game -->
    deck = [];
    playerCards = [];
    opponentCards = [];
    playerScore = 0;
    computerScore = 0;
    activeCategory = "";
    <!-- Code to shuffle the deck and deal cards to players -->
    shuffleDeck(deck);
    dealCards(deck);
}

<!-- Function to play the game -->
function playGame() {
<!-- Function to compare cards -->
function compareCards(playerCard, opponentCard) {
    <!-- Code to compare playerCard and computerCard based on activeCategory -->
    <!-- Code to update playerScore and computerScore based on result of comparison -->
    <!-- Code to check if the game is over and update the UI accordingly -->

}

<!-- Function to show the result modal -->
function showResultModal(result) {
    <!-- Code to update the modal content based on the result (won, lost, or drew) -->
    jQuery: $("#modal-title").html("Result");
    jQuery: $("#modal-body").html("You " + result + " the round.");
    <!-- Code to show the modal -->
    jQuery: $("#result-modal").modal("show");
}

<!-- Function to handle the end of a round -->
function endRound(result) {
    <!-- Code to update the game state based on the result of the round -->
    <!-- Code to show the result modal -->
    showResultModal(result);
}

<!-- Function to retrieve a GIF from the Giphy API based on the result of the game -->
function getResultGIF(result) {
    <!-- Code to construct the API request URL -->
    var url = "https://api.giphy.com/v1/gifs/search?api_key=<API_KEY>&q=" + result + "+game&limit=1&rating=G";
    <!-- Code to make the API request and retrieve the GIF data -->
    var gifData = makeAPICall(url);
    <!-- Code to return the URL of the GIF -->
    return gifData.data[0].images.original.url;
}

<!-- Function to display the result GIF at the end of the game -->
function displayResultGIF(result) {
    <!-- Code to retrieve the URL of the result GIF -->
    var gifURL = getResultGIF(result);
    <!-- Code to update the HTML element with the GIF URL -->
    jQuery: $("#result-gif").attr("src", gifURL);
    <!-- Code to show the result GIF -->
    jQuery: $("#result-gif-modal").modal("show");
}

<!-- Function to handle the end of the game -->
function endGame(result) {
    <!-- Code to update the game state based on the result of the game -->
    <!-- Code to display the result GIF -->
    displayResultGIF(result);
}


<!-- Code to start a new game when the page loads -->
newGame();

******************

<!-- NEXT UP -->

- error handling for the API calls
- promises to handle the asynchronous API calls
- can we use the JavaScript Array.sort() method instead of a loop to sort the deck based on a certain category
- change while loop to a for loop with a fixed number of iterations (5
- switch statement instead of if-else statements to handle the comparison of cards based on the chosen category
- animate the cards when they are drawn ? e.g. slide in effect
- need a single object to store the score for each player instead of having separate variables for player score and opponent score