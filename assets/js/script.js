// jQuery links to html elements
const userCard = $("#userCard");
const cpuCard = $("#cpuCard");

// Set intial global variables needed for accessing data
const partURL = "https://pokeapi.co/api/v2/pokemon/";
const partGiphyURL = "https://api.giphy.com/v1/gifs/search";
const giphyAPIKey = "L4a6rTsWCnxGkYAUqy5uKBSXdxkTX4ue";
let userCardData = [];
let cpuCardData = [];
const abilityOptions = ["HP", "Attack", "Defense", "Speed"];

// Function to be used for fetching data from Pokemon API
function getPokemonData(whoseCardData) {
  const optionsIndex = randomOption();
  const fullPokemonURL = `${partURL}${optionsIndex}`;

  // Data fetch
  $.ajax({
    url: fullPokemonURL,
    method: "GET",
  }).then(function (data) {
    let apiData = [
      data.name,
      data.stats[0]["base_stat"],
      data.stats[1]["base_stat"],
      data.stats[2]["base_stat"],
      data.stats[5]["base_stat"],
      data.sprites.other["official-artwork"].front_shiny,
    ];
    whoseCardData.push(apiData);
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
  const randomIndex = Math.floor(Math.random() * 200) + 1;
  return randomIndex;
}

// Start button click >>> Capture data and store in variables

// Check localStorage for cards data

// Create cards in html
function createCardElements(whoseCard) {
  const whoseCardEl = $(`#${whoseCard}`);
  const cardEl = $("<div>")
    .addClass("card shadow-lg p-3 mb-5 rounded")
    .attr("id", `${whoseCard}Container`);
  const nameEl = $("<h3>")
    .addClass("cardHeader")
    .attr("id", `${whoseCard}Name`);
  const imgEl = $("<img>")
    .addClass("cardImage")
    .attr("id", `${whoseCard}Image`);
  cardEl.append(nameEl, imgEl);
  for (let i = 0; i < 4; i++) {
    const abilityBtn = $("<button>")
      .addClass("cardAbilityBtn btn btn-primary")
      .attr("id", `${whoseCard}${abilityOptions[i]}Btn`)
      .attr("type", "button");
    const abilityDiv = $("<div>")
      .addClass("cardAbility")
      .attr("id", `${whoseCard}${abilityOptions[i]}Div`);
    const abilityTitle = $("<p>")
      .attr("id", `${whoseCard}${abilityOptions[i]}Title`)
      .text(`${abilityOptions[i]}`);
    const abilityValue = $("<p>")
      .attr("id", `${whoseCard}${abilityOptions[i]}Value`)
      .text("TestDIV");
    cardEl.append(
      abilityBtn.append(abilityDiv.append(abilityTitle, abilityValue))
    );
  }
  whoseCardEl.append(cardEl);
}
// Fill cards with data >>> Show values for user, hide values for cpu

// Enable onclick events for both cards, which highlights the selected attribute on both cards, then reveals cpu attributes

// Game logic for deciding if user wins, update scores, update rounds, store both to localStorage

// End game logic showing giphy for win/loss

// Play again option, including clearing localStorage, resetting scores, and rerunning the getData

// Initialise game options
createCardElements("userCard");
createCardElements("cpuCard");
