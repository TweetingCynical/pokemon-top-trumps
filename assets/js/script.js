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
  // Create optionsIndex filled with 5 random numbers for creating api keys
  const optionsIndex = randomOption();
  // Empty arr for storing promises together
  let promises = [];

  // Create promises for all 5 api calls
  for (let index = 0; index < optionsIndex.length; index++) {
    let ajaxData = {
      url: `${partURL}${optionsIndex[index]}`,
      method: "GET",
    };
    let promise = $.ajax(ajaxData);
    promises.push(promise);
  }

  // Get all promises data and store the pokemon information we need for game data
  Promise.all(promises).then((data) => {
    for (let i = 0; i < data.length; i++) {
      whoseCardData.push([
        // Pokemon name
        data[i].name,
        // HP
        data[i].stats[0]["base_stat"],
        // Attack
        data[i].stats[1]["base_stat"],
        // Defense
        data[i].stats[2]["base_stat"],
        // Speed
        data[i].stats[5]["base_stat"],
        // Pokemon image
        data[i].sprites.other["official-artwork"].front_shiny,
      ]);
    }
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
  // Empty array for storing random numbers
  const randomArr = [];

  // For loop to get 5 random numbers. NOTE: Change the multiplier to get a different number of options
  for (let iteration = 0; iteration < 5; iteration++) {
    const randomIndex = Math.floor(Math.random() * 200) + 1;
    randomArr.push(randomIndex);
  }
  return randomArr;
}

// Check localStorage for cards data

// Create cards in html
function createCardElements(whoseCard) {
  const whoseCardEl = $(`#${whoseCard}`);
  const cardEl = $("<div>")
    .addClass("card shadow-lg p-3 mb-5 rounded")
    .attr("id", `${whoseCard}Container`);
  const nameEl = $("<h3>")
    .addClass("cardHeader shadow-lg rounded p-1 hidden")
    .attr("id", `${whoseCard}Name`)
    .text("Character");
  const imgEl = $("<img>")
    .addClass("cardImage shadow-lg rounded bg-white hidden")
    .attr("id", `${whoseCard}Image`)
    .attr("alt", "pokemon character shiny image");
  cardEl.append(nameEl, imgEl);
  for (let i = 0; i < 4; i++) {
    const abilityBtn = $("<button>")
      .addClass(
        `cardAbilityBtn ${whoseCard}Btn btn btn-primary shadow-lg hidden`
      )
      .attr("id", `${whoseCard}${abilityOptions[i]}Btn`)
      .attr("type", "button");
    const abilityDiv = $("<div>")
      .addClass("cardAbility")
      .attr("id", `${whoseCard}${abilityOptions[i]}Div`);
    const abilityTitle = $("<p>")
      .attr("id", `${whoseCard}${abilityOptions[i]}Title`)
      .text(`${abilityOptions[i]}`);
    const abilityValue = $("<p>")
      .addClass(`${abilityOptions[i]}`)
      .attr("id", `${whoseCard}${abilityOptions[i]}Value`)
      .text("TestDIV");
    cardEl.append(
      abilityBtn.append(abilityDiv.append(abilityTitle, abilityValue))
    );
  }
  whoseCardEl.append(cardEl);

  // NOTE: This needs to be correctly placed later, but for now is being used to test:
  $("#userCardName").removeClass("hidden");
  $("#userCardImage").removeClass("hidden");
  $(".userCardBtn").removeClass("hidden");
}

// Add event listener for userCardBtn
$("#userCard").on("click", ".userCardBtn", function () {
  // NOTE: This is NOT ready yet. Just an experiment for how to handle the visual change
  let userChoice = $(this).find("p[id$='Value']").attr("class");
  showCPUCard();
  $(`.${userChoice}`).parent().parent().attr("id", "selected");
  return console.log(userChoice);
});

function showCPUCard() {
  $("#cpuCardName").removeClass("hidden");
  $("#cpuCardImage").removeClass("hidden");
  $(".cpuCardBtn").removeClass("hidden");
}

// Start game button
$("#startCard").submit(function (event) {
  event.preventDefault();
  let userName = $("#userName").val();
  $("#startCard").addClass("hidden");
  $(".cardZone").removeClass("hidden");
});
// Fill cards with data >>> Show values for user, hide values for cpu

// Enable onclick events for both cards, which highlights the selected attribute on both cards, then reveals cpu attributes

// Game logic for deciding if user wins, update scores, update rounds, store both to localStorage

// End game logic showing giphy for win/loss

// Play again option, including clearing localStorage, resetting scores, and rerunning the getData

// Initialise game options
createCardElements("userCard");
createCardElements("cpuCard");
getPokemonData(userCardData);
getPokemonData(cpuCardData);
