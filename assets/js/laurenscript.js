// function checkWinState(userChoice, round) {
//   if userCardData[roundNum][userchoice] > cpuCardData[round][userChoice]
// }

// 9. Start a loop to play the game:
let userScore = 0;

// a. FOR LOOP
// e. Determine the winner based on the chosen category and which category value/integer is higher. The card with the higher value in that category wins.
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
  let winState = 0;

  if (userCardData[roundNum][userChoice] > cpuCardData[roundNum][userChoice]) {
    // f. If win, update the score +1 to the user (in logic and on display)
    userScore++;
    winState = 1;
  } else if (
    userCardData[roundNum][userChoice] === cpuCardData[roundNum][userChoice] &&
    userCardTotal > cpuCardTotal
  ) {
    // g. If draw, do math to add all category values from userCard and all category values from cpuCard
    // Then compare, and repeat logic where the card with the higher value in that category wins
    // If win, update the score +1 to the user (in logic and on display)
    userScore++;
    winState = 2;
  }
  // // h. Update the roundNum by +1 (in logic and on display)

  roundNum++;
  document.getElementById("score").textContent = userScore;
  document.getElementById("round").textContent = `${roundNum}/5`;
  checkRoundState(userChoice, winState, userCardTotal, cpuCardTotal);
  return;
}

// Decide if moving to the next round:
function checkRoundState(userChoice, winState, userCardTotal, cpuCardTotal) {
  // Display correct message on the modal
  if (winState === 1) {
    $("#afterRoundLongTitle").text("YOU WIN");
    $("#afterRoundMessage").text(`Congratulations, you won round ${roundNum}`);
  } else if (winState === 2) {
    $("#afterRoundLongTitle").text("TECHNICALITY WIN");
    $("#afterRoundMessage").text(
      `You chose ${userChoice} which had the same score as your opponent. The Total score of your card was higher, so you won round ${roundNum}`
    );
  } else {
    $("#afterRoundLongTitle").text("YOU LOSE");
    $("#afterRoundMessage").text(`Unlucky, you lost round ${roundNum}`);
  }
  // Call modal for next round prompt
  $("#afterRound").modal({ show: true });
  if (roundNum === 5) {
    $(".nextRound").text("Review");
  }
  nextRound();
}

// Decide which modal to display
function nextRound() {
  $(".nextRound, #afterRound").on("click hide.bs.modal", function () {
    if (roundNum < 5) {
      resetButtons();
      fillCardData(roundNum);
      hideCPUCard();
    } else {
      resetButtons();
      $("#finalRound").modal({ show: true });
    }
  });
}
