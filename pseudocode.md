<!-- Pseudocode -->

GROUP 1 - USING POKEMON API TO POPULATE CARDS

1. On page load, we want to create the HTML elements for each card. Name = <h3>. Image <img> (add class "hidden" / and in CSS make that class have attribute of display: hidden)
2. Then for HP, Attack, Defense and speed create a loop using a <div> (with the id of divHP, divAttach, divDefense, divSpeed so when it is clicked later in the game the whole div can be selected) and then for each category <button text element + text element> and append to that div.
3. We will display a placeholder/background image on the playerCard and cpuCard (suggest this https://www.google.com/url?sa=i&url=https%3A%2F%2Fbulbapedia.bulbagarden.net%2Fw%2Findex.php%3Ftitle%3DFile%3ACardback.jpg%26oldid%3D0&psig=AOvVaw2_Nmj9bfMXGGMlhEKoFkp3&ust=1675977334187000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPCS2J_shv0CFQAAAAAdAAAAABAD).
4. When we hit the start button, ask them their name in a modal and save to localstorage. The modal should contain text-area (required), submitBtn and clearBtn
5. Remove class "hidden" for Player card)
6. We want to make an API request for 10 x random Pokemon's data: Name, Image, HP, Attack, Defense, Speed
7. We want to push this data into 2 separate arrays: userCardData and cpuCardData (which will each contain 5 x arrays)
8. Then we need to populate the content on the right hand side of our cards (this will display for the user but not for the cpu until later). These are the id's we will give to the target elements: userPKChar, userPKImg, userHP, userAttack, userDefense, userSpeed + cpuPKChar, cpuPKImg, cpuHP, cpuAttack, cpuDefense, cpuSpeed

GROUP 2 - GAME LOGIC

9. Start a loop to play the game:
  a. Index 0 from the arrays created to select a card for the user
  b. Index 0 from the arrays created to select a card for the cpu
  c. Prompt Player to choose a category (HP, Attack, Defense, Speed) and click it
  d. Display opponent card (remove display class "hidden" fromm cpu card)
  e. Determine the winner based on the chosen category and which category value/integer is higher. The card with the higher value in that category wins. if (userCard > cpuCard === win) else if (userCard < cpuCard === lose) else (userCard = cpuCard === draw)
  f. If win, update the score +1 to the user (in logic and on display). If lose, update the score +1 to the cpu (in logic and display).
  g. If draw, do math to add all category values from userCard and all category values from cpuCard. Then compare, and repeat logic where the card with the higher value in that category wins. if (userCard > cpuCard === win) else if (userCard < cpuCard === lose)
  h. Update the roundNum by +1 (in logic and on display)
  i. Repeat steps a to i until 5 rounds have been played 
10. To stop the game, i = userCardData.length and display modal

GROUP 3 - END OF GAME MODAL

11. Display modal should contain an annoucement with userName (from localstorage) + whether user has won or lost + gif + restart button to begin the game again
12. Determine the winner of the game by counting the number of rounds won. The player with the most rounds won, wins. if (userScore > cpuScore === win) else === lose
13. For win, display a 'celebrate' gif. For lose, display a 'thumbs down' gif. 
14. Button to restart the game on the modal (function for this). If they press, need to reset the score to 0, round to 0, userCardData to empty and cpuCardData to empty

15. BONUS: Display round data for all rounds in a modal (push choice in 9c to separate array)

16. BONUS: Animate the cards when they are drawn ? e.g. slide in effect
