const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    lose: 0,
    tie: 0
};
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
    moveCompareElement.innerHTML = `You picked ${playerMove}, computer picked ${comMove}`;

    const resultElement = document.querySelector('.result-message');
    resultElement.innerHTML = `${result}`;
};

const robMove = () => {
    const random = Math.floor(Math.random() * 3);
    return (random === 0) ? 'rock' : (random === 1) ? 'paper' : 'scissors';
};

const playGame = (playerMove) => {
    const comMove = robMove();
    let result;

    if (playerMove === 'rock') {
        result = (comMove === 'rock') ? 'Tie' : (comMove === 'paper') ? 'Computer wins' : 'You win';

    } else if (playerMove === 'paper') {
        result = (comMove === 'paper') ? 'Tie' : (comMove === 'scissors') ? 'Computer wins' : 'You win';

    } else {
        result = (comMove === 'scissors') ? 'Tie' : (comMove === 'rock') ? 'Computer wins' : 'You win';
    }

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

const buttons = document.querySelectorAll('.game-btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;
        if (value === 'reset') {
            score.lose = 0;
            score.wins = 0;
            score.tie = 0;
            localStorage.removeItem('score');
            updateScore();
        } else if (value === 'auto') {
            if (!change) {
                button.style.background = 'rgb(255, 0, 0)';
                button.textContent = 'stop auto play'
                change = true
                autoPlay();
            } else {
                button.style.background = 'rgb(0, 200, 0)';
                button.textContent = 'auto play';
                change = false;
                autoPlay();
            }
        } else {
            playGame(value);
        }
    });
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'p' || event.key === 's') {
        playGame(event.key);
    }
});