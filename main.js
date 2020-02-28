const cards = document.querySelectorAll('.cards');
const restartBtn = document.querySelector('resetBtn');
let hasFlippedCard = false;
let lockBoard = false; //keep the card flipped whem it matches.
let firstCard, secondCard;
let timeStart = "";
let matchCount = 0; 


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; 

    this.classList.add('flip');
   //first click
    if (!hasFlippedCard) { 
        hasFlippedCard = true;
        firstCard = this;
        startTimer();
        return;
}

    //second click        
    secondCard = this;
    checkForMatch();
    addMove();
   
}


function checkForMatch() {
    if (firstCard.dataset.name === secondCard.dataset.name) {
        disableCards();
        match.play();
    }
    else {
        unflipCards();
    }
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard); 
    secondCard.removeEventListener('click', flipCard); 
    resetCard();
    matchCount++;
    console.log(matchCount);
    
    if (matchCount >= 6) {
        gameOver();

    }

}


function gameOver() {
    stopTimer();
    openModal();
    boo.play();
}

// 
function unflipCards() {
    lockBoard = true;
    noMatch.play();

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCard();

    }, 500);

}

function resetCard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;

    });
}

let moves = 0;

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;

}
if (hasFlippedCard.length === 2) {
    
    
}

let resetGame = true;

let hour = 0;
let minute = 0;
let second = 0;

function restartGame() {
    if (timeStart) stopTimer();
    resetTimer();
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    shuffle();
    matchCount = 0;
    moves = 0;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
    celebration.play();
}

function startTimer() {
    if (resetGame == true) {
        let timer = 0;
        if (timeStart === "") {
            timeStart = setInterval(() => { 
                ++timer;
                second = timer % 60;
                minute = Math.floor(timer / 60);
                if (minute < 10) minute = '0' + minute;
                if (second < 10) second = '0' + second;
                document.querySelector(".timer").innerHTML = minute + ':' + second;
                document.querySelector(".clock").innerHTML = minute + ':' + second;
            }, 1000);
        }
    }
}

function resetTimer() {
    document.querySelector(".timer").innerHTML = '00:00';
    [hour, minute, second] = [0, 0, 0];
}

function stopTimer() {
    clearInterval(timeStart); 
    timeStart = '';
}


let modal = document.getElementById('simpleModal');


let closeBtn = document.getElementsByClassName('closeBtn')[0];



closeBtn.addEventListener('click', closeModal);


window.addEventListener('click', outsideClick);

//function to open Modal
function openModal() {
    modal.style.display = 'block';
}

//function to close Modal
function closeModal() {
    modal.style.display = 'none';
}
//function to close Modal if outside click
function outsideClick(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}


let resetBtn =
    document.getElementById('resetBtn')
resetBtn.addEventListener('click', resetPlay, false)


function resetPlay() {
    stopTimer();
    resetTimer();
    resetMoves();
    

}

function resetMoves() {
    const movesText = document.querySelector('.moves');
    let moves = 0;
    movesText.innerHTML = moves;


}
let noMatch = new Audio("sounds/lose.mp3");
let match = new Audio("sounds/win.mp3");
let yeah = new Audio("audio/match.mp3");
let boo = new Audio("audio/boo.mp3");
let celebration = new Audio ("audio/celebration.mp3");
shuffle();

cards.forEach(card => card.addEventListener('click', flipCard));