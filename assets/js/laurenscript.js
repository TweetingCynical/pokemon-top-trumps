// function checkWinState(userChoice, round) {
//   if userCardData[round][userchoice] > cpuCardData[round][userChoice]
// }



// 9. Start a loop to play the game:

let userCardData = [];
let cpuCardData = [];
let userScore = 0;
let cpuScore = 0;
let roundNum = 0;

// a. FOR LOOP
for (let i = 0; i < 5; i++) {
  // Index 0 from the arrays created to select a card for the user
  let userCard = userCardData[0];
  // b. Index 0 from the arrays created to select a card for the cpu
  let cpuCard = cpuCardData[0];
  
  // c. Prompt Player to choose a category (HP, Attack, Defense, Speed)
  let chosenCategory = prompt("Choose a category (HP, Attack, Defense, Speed)");
  
  // d. Display opponent card (remove display class "hidden" from cpu card)
  document.getElementById("cpuCard").classList.remove("hidden");
  
  // e. Determine the winner based on the chosen category and which category value/integer is higher. The card with the higher value in that category wins.
  if (userCard[chosenCategory] > cpuCard[chosenCategory]) {
    // f. If win, update the score +1 to the user (in logic and on display)
    userScore++;
    document.getElementById("userScore").innerHTML = userScore;
  } else if (userCard[chosenCategory] < cpuCard[chosenCategory]) {
    // If lose, update the score +1 to the cpu (in logic and display)
    cpuScore++;
    document.getElementById("cpuScore").innerHTML = cpuScore;
  } else {
    // g. If draw, do math to add all category values from userCard and all category values from cpuCard
    let userCardTotal = userCard.HP + userCard.Attack + userCard.Defense + userCard.Speed;
    let cpuCardTotal = cpuCard.HP + cpuCard.Attack + cpuCard.Defense + cpuCard.Speed;
    
    // Then compare, and repeat logic where the card with the higher value in that category wins
    if (userCardTotal > cpuCardTotal) {
      // If win, update the score +1 to the user (in logic and on display)
      userScore++;
      document.getElementById("userScore").innerHTML = userScore;
    } else {
      // If lose, update the score +1 to the cpu (in logic and display)
      cpuScore++;
      document.getElementById("cpuScore").innerHTML = cpuScore;
    }
  }
  
  // h. Update the roundNum by +1 (in logic and on display)
  roundNum++;
  document.getElementById("roundNum").innerHTML = roundNum;

}
