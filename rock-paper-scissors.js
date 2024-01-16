const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    lose: 0,
    tie: 0
};

const moves = ['rock', 'paper', 'scissors'];
let change = false;
let isAutoPlay = false;
let intervalId;

const autoPlay = () => {
    if (!isAutoPlay) {
        intervalId = setInterval(() => {
            const playerMove = robMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlay = true;
    } else {
        clearInterval(intervalId);
        isAutoPlay = false;
    }
};

const updateScore = () => {
    const scoreBoardElement = document.querySelector('.score-board');
    scoreBoardElement.innerHTML = `Wins: ${score.wins}, Lose: ${score.lose}, Ties: ${score.tie}`;
};

const updateMoves = (playerMove, comMove, result) => {
    const moveCompareElement = document.querySelector('.move-compare');
    moveCompareElement.innerHTML = `<div class="compare-icons"><div>You picked</div> <img class="game-icon" src="images/${playerMove}.svg"></div> <div class="compare-icons"><div>computer picked</div> <img class="game-icon" src="images/${comMove}.svg"></div>`;

    const resultElement = document.querySelector('.result-message');
    resultElement.innerHTML = `${result}`;
};

// Update robMove function to use constants
const robMove = () => {
    return moves[Math.floor(Math.random() * moves.length)];
};

// made Function to avoid duplication in the code
const determineWinner = (playerMove, comMove) => {
    if (playerMove === comMove) {
        return 'Tie';
    } else if (
        (playerMove === moves[0] && comMove === moves[2]) ||
        (playerMove === moves[1] && comMove === moves[0]) ||
        (playerMove === moves[2] && comMove === moves[1])
    ) {
        return 'You win';
    } else {
        return 'Computer wins';
    }
};

const playGame = (playerMove) => {
    const comMove = robMove();
    const result = determineWinner(playerMove, comMove);

    if (result === 'Computer wins') {
        score.lose += 1;
    } else if (result === 'You win') {
        score.wins += 1;
    } else {
        score.tie += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScore();
    updateMoves(playerMove, comMove, result);
};

updateScore();

const toggleAutoPlayButton = (button) => {
    if (!change) {
        button.style.background = 'rgb(229, 78, 40)';
        button.textContent = 'stop auto play';
    } else {
        button.style.background = 'rgb(40, 229, 87)';
        button.textContent = 'auto play';
    }
    change = !change;
};

const handleButtonClick = (value) => {
    const button = document.querySelector(`[value="${value}"]`);
    if (value === 'reset') {
        score.lose = 0;
        score.wins = 0;
        score.tie = 0;
        localStorage.removeItem('score');
        updateScore();
    } else if (value === 'auto') {
        toggleAutoPlayButton(button);
        autoPlay();
    } else {
        playGame(value);
    }
};

const buttons = document.querySelectorAll('.game-btn');
buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.value));
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'p' || event.key === 's') {
        playGame(event.key);
    }
});