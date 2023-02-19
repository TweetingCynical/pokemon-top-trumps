// jQuery links to html elements
const userCard = $("#userCard");
const cpuCard = $("#cpuCard");
const clearBtn = $(".btn-clear");
const finalModal = $("#finalModal");

// Set intial global variables needed for accessing data
const partURL = "https://pokeapi.co/api/v2/pokemon/";
const partGiphyURL = "https://api.giphy.com/v1/gifs/search";
const giphyAPIKey = "L4a6rTsWCnxGkYAUqy5uKBSXdxkTX4ue";
const abilityOptions = ["HP", "Attack", "Defense", "Speed"];
let userCardData = [];
let cpuCardData = [];
let roundNum = 0;
let userScore = 0;

// Function to be used for fetching data from Pokemon API
function getPokemonData(whoseCardData) {
	// Create optionsIndex filled with 5 random numbers for creating api keys
	const randomPokeIndices = randomNumbers(1, 200, 5);
	// Empty arr for storing promises together
	let pokemonCardsData = [];

	// Create promises for all 5 api calls
	for (let index = 0; index < randomPokeIndices.length; index++) {
		let pokemonCardData = $.ajax({
			url: `${partURL}${randomPokeIndices[index]}`,
			method: "GET",
		});
		// Push each promise into promises array
		pokemonCardsData.push(pokemonCardData);
	}

	// Get all promises data and store the pokemon information we need for game data
	Promise.all(pokemonCardsData).then((data) => {
		for (let i = 0; i < data.length; i++) {
			whoseCardData.push({
				pkName: data[i].name, // Pokemon name
				HP: data[i].stats[0]["base_stat"], // HP
				Attack: data[i].stats[1]["base_stat"], // Attack
				Defense: data[i].stats[2]["base_stat"], // Defense
				Speed: data[i].stats[5]["base_stat"], // Speed
				Image: data[i].sprites.other["official-artwork"].front_shiny, // Pokemon image
			});
		}
	});
}

// Function for getting a random GIPHY image
function getGiphyData(state) {
	const giphyData = fetch(
		`${partGiphyURL}?q=${state}&api_key=${giphyAPIKey}&limit=10`
	).then((response) => response.json());
	return giphyData;
}

// Get a random number for referencing a character and for choosing a random giphy
function randomNumbers(min, max, count) {
	const numbers = [];
	// For loop to get all random numbers.
	for (let i = 0; i < count; i++) {
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		numbers.push(randomNumber);
	}
	return numbers;
}

// Create cards in html
function createCardElements(whoseCard) {
	// Link to correct card - userCard or cpuCard by ID
	const whoseCardEl = $(`#${whoseCard}`);
	// Create a card element with all child elements necessary
	const cardEl = `
	<div class="card shadows p-3 mb-5 rounded" id="${whoseCard}Container">
		<h3 class="cardHeader shadows rounded p-1 hidden" id="${whoseCard}Name">Character</h3>
		<img class="cardImage shadows rounded bg-white hidden shimmer" id="${whoseCard}Image" alt="pokemon character shiny image"/>
	</div>
	`;
	whoseCardEl.append(cardEl);

	// Create buttons
	for (let i = 0; i < 4; i++) {
		const abilityBtn = `
		<button id="${whoseCard}${abilityOptions[i]}Btn" class="cardAbilityBtn ${whoseCard}Btn btn shadow-lg hidden ${whoseCard}${abilityOptions[i]}Btn" type="button" data-choice="${abilityOptions[i]}">
			<div id="${whoseCard}${abilityOptions[i]}Div" class="cardAbility">
				<p id="${whoseCard}${abilityOptions[i]}Title">${abilityOptions[i]}</p>
				<p id="${abilityOptions[i]}" class="${abilityOptions[i]} ${whoseCard}${abilityOptions[i]}Value"></p>
			</div>
		</button>
		`;
		$(`#${whoseCard}Container`).append(abilityBtn);
	}

	// Now show the elements inside the userCard only
	$("#userCardName").removeClass("hidden");
	$("#userCardImage").removeClass("hidden");
	$(".userCardBtn").removeClass("hidden");
}

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

// Hide cpu card details after user begins a new round
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
function setupAccount() {
	// Get existing local storage of userName and parse back
	let storedUserName = JSON.parse(localStorage.getItem("userName"));

	// If stored array is not empty, set userName variable to local stored value
	if (storedUserName !== null) {
		userName = storedUserName;
		// Update the personalised welcome message on Start card
		$("#userName").val(userName);
		$("#startTitle").text("Welcome Back");
		$(".clearBtn").removeClass("hidden");
	} else {
		// No userName stored, so use welcome message for new user
		$("#userName").val("");
		$("#startTitle").text("Are you ready to enter the world of Pokemon Top Trumps?");
		$(".clearBtn").addClass("hidden");
	}
}

// Call giphy api, and add loseGif and message to final modal
function createWinStateElements(winGif) {
	getGiphyData(winGif).then(function (data) {
		const randomChoice = randomNumbers(0, 9, 1);
		const storedUserName = JSON.parse(localStorage.getItem("userName"));
		const userName = storedUserName;
		const winHeader = $("<h3>").text("Congratulations!");
		const winText = $("<h4>").text(`${userName}, you have won the game!`);
		const winGifURL = data.data[randomChoice[0]].images.original.url;
		const winGifImg = $("<img>").attr("src", winGifURL).addClass("finalModalImage");
		$("#win-state").append(winHeader, winText, winGifImg);
	});
}

// Call giphy api, and add loseGif and message to final modal
function createLoseStateElements(loseGif) {
	getGiphyData(loseGif).then(function (data) {
		const randomChoice = randomNumbers(0, 9, 1);
		const userName = JSON.parse(localStorage.getItem("userName"));
		const loseHeader = $("<h3>").text("Oh no!");
		const loseText = $("<h4>").text(`${userName}, you have lost!`);
		const loseGifURL = data.data[randomChoice[0]].images.original.url;
		const loseGifImg = $("<img>").attr("src", loseGifURL);
		$("#lose-state").append(loseHeader, loseText, loseGifImg);
	});
}

// Start game button
$("#startCard").submit(function (event) {
	event.preventDefault();
	const userName = $("#userName").val();
	localStorage.setItem("userName", JSON.stringify(userName));
	createWinStateElements("celebrate");
	createLoseStateElements("thumbs-down");
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
	setupAccount();
});

// Fill cards with data >>> Show values for user
function fillCardData(round) {
	// Names
	$("#userCardName")
		.text(userCardData[round].pkName)
		.css("textTransform", "capitalize");
	$("#cpuCardName")
		.text(cpuCardData[round].pkName)
		.css("textTransform", "capitalize");
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

function checkWinState(userChoice) {
	let userCardTotal =
		userCardData[roundNum].HP +
		userCardData[roundNum].Attack +
		userCardData[roundNum].Defense +
		userCardData[roundNum].Speed;
	let cpuCardTotal =
		cpuCardData[roundNum].HP +
		cpuCardData[roundNum].Attack +
		cpuCardData[roundNum].Defense +
		cpuCardData[roundNum].Speed;

	if (userCardData[roundNum][userChoice] > cpuCardData[roundNum][userChoice]) {
		userScore++;
		$("#afterRoundLongTitle").text("YOU WIN");
		$("#afterRoundMessage").text(
			`Congratulations, you won Round ${roundNum + 1}`
		);
	} else if (
		userCardData[roundNum][userChoice] === cpuCardData[roundNum][userChoice] &&
		userCardTotal > cpuCardTotal
	) {
		userScore++;
		$("#afterRoundLongTitle").text("TECHNICALITY WIN");
		$("#afterRoundMessage").text(
			`You chose ${userChoice} which had the same score as your opponent. The Total score of your card was higher, so you won Round ${
				roundNum + 1
			}`
		);
	} else {
		$("#afterRoundLongTitle").text("YOU LOSE");
		$("#afterRoundMessage").text(`Unlucky, you lost Round ${roundNum + 1}`);
	}

	roundNum++;
	document.getElementById("score").textContent = userScore;
	document.getElementById("round").textContent = `${roundNum}/5`;

	// Call modal for next round prompt
	$("#afterRound").modal({ show: true });
	if (roundNum === 5) {
		$(".nextRound").text("Review");
	}
	nextRound();
	return;
}

// Decide which modal to display
function nextRound() {
	$(".nextRound, #afterRound").on("click hide.bs.modal", function () {
		if (roundNum === 5) {
			resetButtons();
			$("#afterRound").modal({ show: false });
			checkFinalWinState();
			return;
		} else {
			resetButtons();
			fillCardData(roundNum);
			hideCPUCard();
		}
	});
}

// Then check if user has won or lost
function checkFinalWinState() {
	// End of round 5, show finalModal
	if (roundNum === 5) {
		// If user score more than 2 then get celebrate gif and call win state elements
		if (userScore > 2) {
			$("#win-state").removeClass("hidden");
			// Else get thumbs-down gif and call lose state elements
		} else {
			$("#lose-state").removeClass("hidden");
		}
		finalModal.modal({ show: true });
		return;
	}
}

function init() {
	// Update display
	$("#rounds").addClass("hidden");
	$("#scores").addClass("hidden");
	$("#round").text(`${roundNum}/5`);
	$("#score").text(userScore);
	$(".nextRound").text("Next Round");

	// Hide finalModal and reset cardZone to original state
	$("#finalModal").modal("hide");
	$(".cardZone").addClass("hidden");
	$("#userCardContainer").remove();
	$("#cpuCardContainer").remove();
	$("#win-state").empty().addClass("hidden");
	$("#lose-state").empty().addClass("hidden");

	// Initialise game options
	createCardElements("userCard");
	createCardElements("cpuCard");
	getPokemonData(userCardData);
	getPokemonData(cpuCardData);

	// Click events for each of the user's card options
	function setUserChoiceEvent(elementID, buttonClass) {
		$(elementID).on("click", function () {
			let userChoice = $(this).attr("data-choice");
			showCPUCard();
			$(document).find($(buttonClass)).parent().parent().addClass("selected");
			checkWinState(userChoice);
			return userChoice;
		});
	}

	// Call of button click events
	setUserChoiceEvent("#userCardHPBtn", ".HP");
	setUserChoiceEvent("#userCardAttackBtn", ".Attack");
	setUserChoiceEvent("#userCardDefenseBtn", ".Defense");
	setUserChoiceEvent("#userCardSpeedBtn", ".Speed");

	// Run these functions so that the cards are pre-created with data from the outset.
	setupAccount();

	// Show start screen
	$("#startCard").removeClass("hidden");
}

// Run on page load
init();

// Reset game button
$("#resetGame").click(function () {
	// Reset user and cpu cards, roundNum and userScore
	userCardData = [];
	cpuCardData = [];
	roundNum = 0;
	userScore = 0;
	init();
});
