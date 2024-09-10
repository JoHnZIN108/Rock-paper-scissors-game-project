  //The score object
  //retriving the stored json data and converting it back to an object

  let score = JSON.parse(localStorage.getItem('score')) || {wins:0, losses:0, ties:0}

  updateScoreElement();



  // Using Math.random() to generate Computer Move
  function pickMove() {

  let compMove = ''
  const randNum = Math.random();

  if (randNum <= 1 / 3) {
        compMove = 'rock';
    }
    else if (randNum > 1 / 3 && randNum <= 2 / 3) {
        compMove = 'paper'
    }
    else if (randNum > 2 / 3 && randNum <= 1) {
        compMove = 'scissors'
    }

    return compMove

  }

function updateScoreElement(){
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`
  }

function greetingCheck(){
  if ((score.losses + score.wins + score.ties) > 0){
    document.querySelector(".js-greeting1").innerHTML = " "
    document.querySelector(".js-greeting2").innerHTML = " "
  }
}

let isAutoPlaying = false;
let setIntervalId;

function autoplay(){

  if (!isAutoPlaying){
    isAutoPlaying = true;


    setIntervalId = setInterval(() => {
      const playerMove = pickMove();
      playGame(playerMove);
    },1000)

    // change the text to stop Autoplay
    document.querySelector('.js-autoplay-button')
      .innerHTML = 'Stop Auto Play'
  }
  else{
    clearInterval(setIntervalId);
    isAutoPlaying = false;
    document.querySelector('.js-autoplay-button')
      .innerHTML = 'Auto Play'
  }
}


// Using event listner rather than onclick = " "
document.querySelector('.js-rock-button')
  .addEventListener('click',() => {
    playGame('rock')
  })

document.querySelector('.js-paper-button')
  .addEventListener('click',() => {
    playGame('paper')
  })

document.querySelector('.js-scissors-button')
  .addEventListener('click',() => {
    playGame('scissors')
  })

document.querySelector('.js-reset-button')
  .addEventListener('click',() => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score')
    updateScoreElement()
    alert('Scores have been reset')
  })

document.querySelector('.js-autoplay-button')
  .addEventListener('click',() => {
    autoplay()
  })

document.body.addEventListener('keydown', function(event){
  if (event.key === 'r') { playGame('rock')}
  else if (event.key === 'p') {playGame('paper')}
  else if (event.key === 's') {playGame('scissors')}
})


function playGame(playerMove) {
  const compMove = pickMove();

  // Create result Variable
  let result = '';

  // Rock
  if (playerMove === 'rock'){
    if (compMove === 'rock') {
        result = 'Tie.';
    }
    else if (compMove === 'paper') {
        result = 'You lose.';
    }
    else if (compMove === 'scissors') {
        result = 'You win!!!';
    }
  }

  // Paper
  if (playerMove === 'paper'){
    if (compMove === 'paper') {
        result = 'Tie.';
    }
    else if (compMove === 'scissors') {
        result = 'You lose.';
    }
    else if (compMove === 'rock') {
        result = 'You win!!!';
        }
    }


  // For scissors
  if (playerMove === 'scissors') {
    if (compMove === 'scissors') {
        result = 'Tie.';
    }
    else if (compMove === 'rock') {
        result = 'You lose.';
    }
    else if (compMove === 'paper') {
        result = 'You win!!!';
    }
}


  if(result=== 'You win!!!'){
      score.wins++;
    }
  else if (result === 'You lose.'){
      score.losses++
    }
  else if(result === 'Tie.'){
      score.ties++
    }
  
    greetingCheck()
    updateScoreElement()

  //storing score in json
  localStorage.setItem('score',JSON.stringify(score)); 

  document.querySelector('.js-result').innerHTML = result
  document.querySelector('.js-moves').innerHTML = `You 
    <img class="move-icon" src="images/${playerMove}-emoji.png" alt="emoji">
    <img class="move-icon" src="images/${compMove}-emoji.png" alt="emoji">
    Computer `


  }
