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

// Function to be used for fetching data from Pokemon API
function getData() {
  const optionsIndex = randomOption();
  const fullURL = `${partURL}${dataOptions[optionsIndex]}`;
  console.log(fullURL);

  // Data fetch
  $.ajax({
    url: fullURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);
    return;
  });
}

// Get a random number for referencing a character choice from dataOptions
function randomOption() {
  const randomIndex = Math.floor(Math.random() * dataOptions.length);
  return randomIndex;
}
