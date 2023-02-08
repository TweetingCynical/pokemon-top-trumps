// Set intial global variables needed for accessing data
// Once MVP is working, replace this list with full apid options list. Use 10 to begin with
const dataOptions = [
  "ditto",
  "pikachu",
  "squirtle",
  "metapod",
  "pidgey",
  "raichu",
  "jigglypuff",
  "oddish",
  "gloom",
  "primeape",
];
const partURL = "https://pokeapi.co/api/v2/pokemon/";
const partGiphyURL = "https://api.giphy.com/v1/gifs/search";
const giphyAPIKey = "L4a6rTsWCnxGkYAUqy5uKBSXdxkTX4ue";

// Function to be used for fetching data from Pokemon API
function getPokemonData() {
  const optionsIndex = randomOption();
  const fullURL = `${partURL}${dataOptions[optionsIndex]}`;

  // Data fetch
  $.ajax({
    url: fullURL,
    method: "GET",
  }).then(function (data) {
    return;
  });
}

// Function for getting a random GIPHY image
function getGiphyData(state) {
  const fullGiphyURL = `${partGiphyURL}?q=${state}&api_key=${giphyAPIKey}&limit=10`;

  // Data fetch
  $.ajax({
    url: fullGiphyURL,
    method: "GET",
  }).then(function (data) {
    return;
  });
}

// Get a random number for referencing a character choice from dataOptions
function randomOption() {
  const randomIndex = Math.floor(Math.random() * dataOptions.length);
  return randomIndex;
}
