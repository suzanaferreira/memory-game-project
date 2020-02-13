const cards = document.querySelectorAll('.cards');
const restartBtn = document.querySelector('resetBtn');
let hasFlippedCard = false;
let lockBoard = false; //this is so the cards won't flip back once they are matched 
let firstCard, secondCard;
let timeStart = "";
let matchCount = 0; 


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; 

    this.classList.add('flip');

    if (!hasFlippedCard) { //first click !
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
    }
    else {
        unflipCards();
    }
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match. You have to add the event and the function that you called 
    secondCard.removeEventListener('click', flipCard); //remove the eventListener if it's a match
    resetCard();
    matchCount++;
    console.log(matchCount);
    
    if (matchCount >= 6) {
        gameOver();

    }

}
//not sure why this won't play

function gameOver() {
    stopTimer();
    openModal();
    aroo.play();
}

// if they don't match 
function unflipCards() {
    lockBoard = true;
    noMatch.play();

    setTimeout(() => {
        //so that we can see the card flip
        // setTimeout excutes after waiting a specified amount of time
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCard();

    }, 600);

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
    //checkForMatch(clickTarget);

}

let resetGame = true; //need this for game reset and modal 

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
    aroo.play();
}

function startTimer() {
    if (resetGame == true) {
        let timer = 0;
        if (timeStart === "") {
            timeStart = setInterval(() => { //8-30 if i use => timer works, change it per https://www.w3schools.com/js/js_timing.asp it acts like it wants to start but doesnt
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


//Listen for close click
closeBtn.addEventListener('click', closeModal);

//listen for outside click

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
let noMatch = new Audio("audio/noMatch.mp3");
let applause = new Audio("audio/Ovation.mp3");
let match = new Audio("audio/match.mp3");
let yeah = new Audio("audio/match.mp3");
let aroo = new Audio("audio/AROO.mp3");
let cheer = new Audio("audio/fans.mp3");
shuffle();

cards.forEach(card => card.addEventListener('click', flipCard));