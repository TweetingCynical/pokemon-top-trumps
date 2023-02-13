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

// Final modal
const finalModal = $("#finalModal");

// Then check if user has won or lost
async function checkFinalWinState() {
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

// Reset game button
$("#resetGame").click(function () {
  // Reset user and cpu cards, roundNum and userScore
  userCardData = [];
  cpuCardData = [];
  roundNum = 0;
  userScore = 0;
  init();
});

// NOTE: We need to resolve the problem that the user can click off the finalModal without resetting cards, and then there is no way for them to restart the game
