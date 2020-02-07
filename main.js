const cards = document.querySelectorAll('.cards');
let hasRotatedCard = false;
let firstCard, secondCard;

function rotateCard() {
    this.classList.add('flip');
    //clicked for the first time
    if (!hasRotatedCard) {
        hasRotatedCard = true;
        firstCard = this;
    }
    //clicked for the second time
    else {
        hasRotatedCard = false;
        secondCard = this;

        //check if the cards match
        if (firstCard.dataset.name === secondCard.dataset.name) {
            //when the cards match
            firstCard.removeEventListener('click', rotateCard);
            secondCard.removeEventListener('click', rotateCard);

            //whe the cards dont match
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 1200);
            
        }
    }
}
cards.forEach(card => card.addEventListener('click', rotateCard));
