// function checkWinState(userChoice, round) {
//   if userCardData[roundNum][userchoice] > cpuCardData[round][userChoice]
// }



// 9. Start a loop to play the game:
let userScore = 0;

// a. FOR LOOP
  // e. Determine the winner based on the chosen category and which category value/integer is higher. The card with the higher value in that category wins.
  function checkWinState(userChoice, roundNum) {
    let userCardTotal = userCardData[roundNum][HP] + userCardData[roundNum][Attack] + userCardData[roundNum][Defense] + userCardData[roundNum][Speed];
    let cpuCardTotal = cpuCardData[roundNum][HP] + cpuCardData[roundNum][Attack] + cpuCardData[roundNum][Defense] + cpuCardData[roundNum][Speed]
    if (userCardData[roundNum][userChoice] > cpuCardData[roundNum][userChoice]) {
      // f. If win, update the score +1 to the user (in logic and on display)
      userScore++;
    } else if (userCardTotal > cpuCardTotal) {
      // g. If draw, do math to add all category values from userCard and all category values from cpuCard
      // Then compare, and repeat logic where the card with the higher value in that category wins
        // If win, update the score +1 to the user (in logic and on display)
        userScore++;
    }
    document.getElementById("score").textContent = userScore;
    roundNum++;
    document.getElementById("round").textContent = `${roundNum}/5`
    // // h. Update the roundNum by +1 (in logic and on display)
    // roundNum++;
    // document.getElementById("roundNum").textContent = roundNum;
    console.log(userScore)
    // fillCardData(roundNum)
  }
