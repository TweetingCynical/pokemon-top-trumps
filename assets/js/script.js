// jQuery links to html elements
const userCard = $("#userCard");
const cpuCard = $("#cpuCard");
const clearBtn = $(".btn-clear");

// Set intial global variables needed for accessing data
const partURL = "https://pokeapi.co/api/v2/pokemon/";
const partGiphyURL = "https://api.giphy.com/v1/gifs/search";
const giphyAPIKey = "L4a6rTsWCnxGkYAUqy5uKBSXdxkTX4ue";
const abilityOptions = ["HP", "Attack", "Defense", "Speed"];
let userCardData = [];
let cpuCardData = [];
let roundNum = 0;
let score = 0;

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
      whoseCardData.push({
        // Pokemon name
        pkName: data[i].name,
        // HP
        HP: data[i].stats[0]["base_stat"],
        // Attack
        Attack: data[i].stats[1]["base_stat"],
        // Defense
        Defense: data[i].stats[2]["base_stat"],
        // Speed
        Speed: data[i].stats[5]["base_stat"],
        // Pokemon image
        Image: data[i].sprites.other["official-artwork"].front_shiny,
      });
    }
  });
}

/////////////////////////////// BIT LAUREN CHANGED 12TH FEB //////////////////////////////////

// Function for getting a random GIPHY image
function getGiphyData(state) {
  // const fullGiphyURL = `${partGiphyURL}?q=${state}&api_key=${giphyAPIKey}&limit=10`;

  // // Data fetch
  // $.ajax({
  //   url: fullGiphyURL,
  //   method: "GET",
  // }).then(function (data) {
  //   console.log(data)
  //   return data;
  // });
  const dataa  = fetch(`${partGiphyURL}?q=${state}&api_key=${giphyAPIKey}&limit=10`)
  .then((response) => response.json())
  .then((data) => data);

  return dataa
}

/////////////////////////////// BIT LAUREN CHANGED 12TH FEB //////////////////////////////////

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
    .addClass("card shadows p-3 mb-5 rounded")
    .attr("id", `${whoseCard}Container`);
  const nameEl = $("<h3>")
    .addClass("cardHeader shadows rounded p-1 hidden")
    .attr("id", `${whoseCard}Name`)
    .text("Character");
  const imgEl = $("<img>")
    .addClass("cardImage shadows rounded bg-white hidden shimmer")
    .attr("id", `${whoseCard}Image`)
    .attr("alt", "pokemon character shiny image");
  cardEl.append(nameEl, imgEl);

  // Create buttons
  for (let i = 0; i < 4; i++) {
    const abilityBtn = $("<button>")
      .addClass(
        `cardAbilityBtn ${whoseCard}Btn btn shadow-lg hidden ${whoseCard}${abilityOptions[i]}Btn`
      )
      .attr("id", `${whoseCard}${abilityOptions[i]}Btn`)
      .attr("data-choice", abilityOptions[i])
      .attr("type", "button");
    const abilityDiv = $("<div>")
      .addClass("cardAbility")
      .attr("id", `${whoseCard}${abilityOptions[i]}Div`);
    const abilityTitle = $("<p>")
      .attr("id", `${whoseCard}${abilityOptions[i]}Title`)
      .text(`${abilityOptions[i]}`);
    const abilityValue = $("<p>")
      .addClass(`${abilityOptions[i]} ${whoseCard}${abilityOptions[i]}Value`)
      .attr("id", `${abilityOptions[i]}`)
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
// $("#userCard").on("click", ".userCardBtn", function () {
//   // NOTE: This is NOT ready yet. Just an experiment for how to handle the visual change
//   let userChoice = $(this).find("p[id$='Value']").attr("class");
//   showCPUCard();
//   $(`.${userChoice}`).parent().parent().addClass("selected");
//   return console.log(userChoice);
// });

// Show cpu card details after user has made a choice
function showCPUCard() {
  $("#cpuCardName").removeClass("hidden");
  $("#cpuCardImage").removeClass("hidden");
  $(".cpuCardBtn").removeClass("hidden");
  $("#cpuCardContainer").addClass("flipped");
  setTimeout(function () {
    $("#cpuCardContainer").removeClass("flipped");
  }, 1000);
}

function hideCPUCard() {
  $("#cpuCardName").addClass("hidden");
  $("#cpuCardImage").addClass("hidden");
  $(".cpuCardBtn").addClass("hidden");
  $("#cpuCardContainer").addClass("flipped");
  setTimeout(function () {
    $("#cpuCardContainer").removeClass("flipped");
  }, 1000);
}

// Check if userName is already in localStorage
function checkLocalStorage() {
  // Get existing local storage of userName and parse back
  let storedUserName = JSON.parse(localStorage.getItem("userName"));

  // If stored array is not empty, set userName variable to local stored value
  if (storedUserName !== null) {
    userName = storedUserName;
    $("#userName").val(userName);
    $("#startTitle").text("Welcome Back");
    $(".clearBtn").removeClass("hidden");
  } else {
    $("#userName").val("");
    $("#startTitle").text(
      "Are you ready to enter the world of Pokemon Top Trumps?"
    );
    $(".clearBtn").addClass("hidden");
  }
}

/////////////////////////////// BIT LAUREN ADDED IN 12TH FEB //////////////////////////////////


    // Function to create elements for the win-state
    function createWinStateElements(winGiphy) {
      console.log('winFunc')
      let storedUserName = JSON.parse(localStorage.getItem("userName"));
      let userName = storedUserName;
      let winHeader = $("<h3>").text("Congratulations!");
      let winText = $("<h4>").text(`${userName}, you have won the game!`);
      let winGif = $("<img>").attr("src", winGiphy.data[0].images.original.url);
      $("#win-state").append(winHeader, winText, winGif);
    }

    // Function to create elements for the lose-state
    function createLoseStateElements(loseGiphy) {
      console.log('loseFunc')

      let storedUserName = JSON.parse(localStorage.getItem("userName"));
      let userName = storedUserName;
      let loseHeader = $("<h3>").text("Oh no!");
      let loseText = $("<h4>").text(`${userName}, you have lost!`);
      let loseGif = $("<img>").attr("src", loseGiphy.data[0].images.original.url);
      $("#lose-state").append(loseHeader, loseText, loseGif);
    }

/////////////////////////////// BIT LAUREN ADDED IN 12TH FEB //////////////////////////////////

// Start game button
$("#startCard").submit(function (event) {
  event.preventDefault();
  let userName = $("#userName").val();
  localStorage.setItem("userName", JSON.stringify(userName));
  $("#userNameCard").text(`${userName}'s Card`);
  $("#startCard").addClass("hidden");
  $(".cardZone").removeClass("hidden");
  $("#scores").removeClass("hidden");
  $("#rounds").removeClass("hidden");
  fillCardData(roundNum);
});

// Clear button to remove username from localStorage
$(".clearBtn").click(function () {
  localStorage.clear();
  checkLocalStorage();
});

// Fill cards with data >>> Show values for user
function fillCardData(round) {
  // Names
  $("#userCardName").text(userCardData[round].pkName);
  $("#cpuCardName").text(cpuCardData[round].pkName);
  // Images
  $("#userCardImage").attr("src", userCardData[round].Image);
  $("#cpuCardImage").attr("src", cpuCardData[round].Image);
  // HP
  $(".userCardHPValue").text(userCardData[round].HP);
  $(".cpuCardHPValue").text(cpuCardData[round].HP);
  // Attack
  $(".userCardAttackValue").text(userCardData[round].Attack);
  $(".cpuCardAttackValue").text(cpuCardData[round].Attack);
  // Defense
  $(".userCardDefenseValue").text(userCardData[round].Defense);
  $(".cpuCardDefenseValue").text(cpuCardData[round].Defense);
  // Speed
  $(".userCardSpeedValue").text(userCardData[round].Speed);
  $(".cpuCardSpeedValue").text(cpuCardData[round].Speed);
}

// Remove green styling from the category the user chose
function resetButtons() {
  $(".cardAbilityBtn").removeClass("selected");
}

// End game logic showing giphy for win/loss

// Play again option, including clearing localStorage, resetting scores, and rerunning the getData

// Initialise game options
createCardElements("userCard");
createCardElements("cpuCard");
getPokemonData(userCardData);
getPokemonData(cpuCardData);
checkLocalStorage();

// Click events for each of the user's card options
function userChoiceEvent(elementID, buttonClass) {
  $(elementID).on("click", function () {
    let userChoice = $(this).attr("data-choice");
    showCPUCard();
    $(document).find($(buttonClass)).parent().parent().addClass("selected");
    checkWinState(userChoice);
    return userChoice;
  });
}

// Call of button click events
userChoiceEvent("#userCardHPBtn", ".HP");
userChoiceEvent("#userCardAttackBtn", ".Attack");
userChoiceEvent("#userCardDefenseBtn", ".Defense");
userChoiceEvent("#userCardSpeedBtn", ".Speed");
