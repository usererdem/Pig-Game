'use strict';
////////////////////////////////////////
////////////// My Code ////////////////
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let totalScore0 = 0;
let totalScore1 = 0;
let playing = true;

// Rolling the Dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      activePlayer === 0
        ? (current0El.textContent = currentScore)
        : (current1El.textContent = currentScore);
      // if (activePlayer === 0) {current0El.textContent = currentScore;} else {current1El.textContent = currentScore;}
    } else {
      // Switch to next player
      activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
      currentScore = 0;
      current0El.textContent = currentScore;
      current1El.textContent = currentScore;
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

// Button Hold
btnHold.addEventListener('click', function () {
  if (playing) {
    if (activePlayer === 0) {
      totalScore0 += currentScore;
      score0El.textContent = totalScore0;

      if (
        Number(score0El.textContent) >= 100 ||
        Number(score1El.textContent) >= 100
      ) {
        document.querySelector(`.player--0`).classList.add('player--winner');
        document.querySelector(`.player--0`).classList.remove('player--active');
        document.querySelector(`.player--1`).classList.remove('player--active');
        playing = false;
        diceEl.classList.add('hidden');
      } else {
        activePlayer = 1;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
      }
    } else {
      totalScore1 += currentScore;
      score1El.textContent = totalScore1;

      if (
        Number(score0El.textContent) >= 100 ||
        Number(score1El.textContent) >= 100
      ) {
        document.querySelector(`.player--1`).classList.add('player--winner');
        document.querySelector(`.player--1`).classList.remove('player--active');
        document.querySelector(`.player--0`).classList.remove('player--active');
        playing = false;
        diceEl.classList.add('hidden');
      } else {
        activePlayer = 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
      }
    }
    currentScore = 0;
    current0El.textContent = currentScore;
    current1El.textContent = currentScore;
  }
});

// Button New
btnNew.addEventListener('click', function () {
  activePlayer = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  playing = true;

  currentScore = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  totalScore0 = 0;
  totalScore1 = 0;
  score0El.textContent = totalScore0;
  score1El.textContent = totalScore1;
});

