const cards = document.querySelectorAll('.card')
let hasFlippedCard = false
let firstCard, secondCard;
let lockBoard = false;

function flipCard(){
    if(lockBoard) return
    if(this === firstCard) return
    this.classList.add('flip')
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return
    }

    secondCard = this
    hasFlippedCard = false;
    checkForMatch()
}

function checkForMatch(){//checa se as cartas são iguais.
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards()
        return
    }
    unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    resetBoard()
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        resetBoard()
        disocuntedTime()
    }, 1000)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle(){
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12)
        card.style.order = randomPosition
    })
}())

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var duration = 41; 
        display = document.querySelector('#stopwatch'); 
    startTimer(duration, display); 
};

