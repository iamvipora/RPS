const autoPlay = () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const autoMove = pickComputerMove();
      playGame(autoMove);
    }, 1000);
    document.querySelector('.auto-play-btn').innerHTML = 'Stop Play';
    isAutoPlaying = true; 
  }
  else {
    clearInterval(intervalId);
    document.querySelector('.auto-play-btn').innerHTML = 'Auto Play';
    isAutoPlaying = false;
  }
}

const playGame = (playerMove) => {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === computerMove) {
    result = 'Tie';
  }

  else if (playerMove === 'Rock') {
    if (computerMove === 'Scissors') {
      result = 'Win';
    }
    else if (computerMove === 'Paper') {
      result = 'Lose';
    }
  }
  
  else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'Win';
    }
    else if (computerMove === 'Scissors') {
      result = 'Lose';
    }
  }

  else if (playerMove === 'Scissors') {
    if (computerMove === 'Paper') {
      result = 'Win';
    }
    else if (computerMove === 'Rock') {
      result = 'Lose';
    }
  }

  if (result === 'Win') {
    score.wins++
  }
  else if (result === 'Lose') {
    score.losses++
  }
  else if (result === 'Tie') {
    score.ties++
  }

  localStorage.setItem('score', JSON.stringify(score));

  renderScoreBoard();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = 
  (`You 
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`);
}

const pickComputerMove = () => {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'Rock';
  }
  else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Paper';
  }
  else if (randomNumber >= 2/3 && randomNumber <= 1) {
    computerMove = 'Scissors';
  }
  return computerMove;
}

const resetScore = () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  renderScoreBoard();
}

const renderScoreBoard = () => {
  document.querySelector('.js-scoreboard').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};
let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-rock-btn').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper-btn').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissors-btn').addEventListener('click', () => {
  playGame('Scissors');
});

document.querySelector('.js-reset-btn').addEventListener('click', () => {
  resetScore();
});

document.querySelector('.js-auto-play-btn').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
 
  // event.key==='r' ? playGame('Rock') : '';
  // event.key==='p' ? playGame('Paper') : '';
  // event.key==='s' ? playGame('Scissors') : '';
  
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  }
});

renderScoreBoard();