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
    $("#afterRoundMessage").text(`Congratulations, you won Round ${roundNum}`);
  } else if (winState === 2) {
    $("#afterRoundLongTitle").text("TECHNICALITY WIN");
    $("#afterRoundMessage").text(
      `You chose ${userChoice} which had the same score as your opponent. The Total score of your card was higher, so you won Round ${roundNum}`
    );
  } else {
    $("#afterRoundLongTitle").text("YOU LOSE");
    $("#afterRoundMessage").text(`Unlucky, you lost Round ${roundNum}`);
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
      console.log({roundNum})
      resetButtons();
      $("#afterRound").modal({ show: false });
      checkFinalWinState()
    }
  });
}

// Final modal
const finalModal = $('#finalModal');

  // Then check if user has won or lost
  async function checkFinalWinState() {
    // End of round 5, show finalModal
    if (roundNum === 5) {
    finalModal.modal({ show: true });
    // If user score more than 2 then get celebrate gif and call win state elements
    if (userScore > 2) {
      console.log("winState")
      //const res = await getGiphyData();
   const winGif = await getGiphyData("celebrate");
   console.log({winGif})
    //.then(function () {
    createWinStateElements(winGif);
    //});
    // Else get thumbs-down gif and call lose state elements
    } else {
      console.log("loseState")
    const loseGif = await getGiphyData("thumbs-down");
    console.log({loseGif})
    //.then(function () {
    createLoseStateElements(loseGif);
    //});
    }
      }
        }

// Reset game button
$('#resetGame').click(function () {
    // Reset roundNum and userScore
    roundNum = 1;
    userScore = 0;
    // Update display
    $("#roundNum").text(roundNum);
    $("#userScore").text(userScore);
  
    // Hide finalModal
    $("#finalModal").modal("hide");
  });
