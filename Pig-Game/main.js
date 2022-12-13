const playerOne = document.querySelector(".player1");
const playerTwo = document.querySelector(".player2");
const player = document.querySelector(".player");
const scoreTxt = document.querySelector(".score");
const score1 = document.querySelector(".score-1");
const score2 = document.querySelector(".score-2");
const currentScore1 = document.querySelector(".current-score-1");
const currentScore2 = document.querySelector(".current-score-2");
let currentSScore = 0;
let currentSScore1 = 0;
let activeScore = [0, 0];
let photo = document.querySelector(".dice-photo");

let activePlayer = 0;

const newGame = document.querySelector(".new-game");
const rollDice = document.querySelector(".roll-dice");
const hold = document.querySelector(".hold");

rollDice.addEventListener("click", () => {
  let randomScore = Math.floor(Math.random() * 6) + 1;

  photo.src = `./assets/dice-${randomScore}.png`;

  if (playerOne.classList.contains("player-active")) {
    activePlayer = 0;

    currentSScore += randomScore;
    currentScore1.textContent = currentSScore;
  } else if (playerTwo.classList.contains("player-active")) {
    activePlayer = 1;
    currentSScore1 += randomScore;
    currentScore2.textContent = currentSScore1;
  }

  if (randomScore === 1) {
    currentSScore = 0;
    currentScore1.textContent = currentSScore;

    currentSScore1 = 0;
    currentScore2.textContent = currentSScore1;

    if (playerOne.classList.contains("player-active")) {
      playerOne.classList.remove("player-active");
      playerTwo.classList.add("player-active");
    } else if (playerTwo.classList.contains("player-active")) {
      playerTwo.classList.remove("player-active");
      playerOne.classList.add("player-active");
    }
  }
});

hold.addEventListener("click", () => {
  if (playerOne.classList.contains("player-active")) {
    activeScore[activePlayer] += currentSScore;

    score1.textContent = activeScore[activePlayer];
    currentSScore = 0;
    currentScore1.textContent = currentSScore;

    playerOne.classList.remove("player-active");
    playerTwo.classList.add("player-active");
  } else if (playerTwo.classList.contains("player-active")) {
    activeScore[activePlayer] += currentSScore1;

    score2.textContent = activeScore[activePlayer];
    currentSScore1 = 0;
    currentScore2.textContent = currentSScore1;

    playerTwo.classList.remove("player-active");
    playerOne.classList.add("player-active");
  }

  if (activeScore[activePlayer] >= 100) {
    if (activePlayer === 0) {
      playerOne.classList.add("win");
      playerTwo.classList.remove("player-active");
    } else if (activePlayer === 1) {
      playerTwo.classList.add("win");
      playerOne.classList.remove("player-active");
    }
  }
});

newGame.addEventListener("click", () => {
  currentSScore = 0;
  currentSScore1 = 0;
  activeScore = [0, 0];

  currentScore1.textContent = currentSScore;
  currentScore2.textContent = currentSScore1;
  score1.textContent = activeScore[activePlayer];
  score2.textContent = activeScore[activePlayer];

  playerOne.classList.add("player-active");
  playerTwo.classList.remove("player-active");

  playerOne.classList.remove("win");
  playerTwo.classList.remove("win");
});
