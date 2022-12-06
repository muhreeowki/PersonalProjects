let isAlive = false
let has_blackjack = false
let cards = [] 
let sum = 0 
let message = ''

let messageEl = document.getElementById('message-el') 
let sumEl = document.getElementById('sum-el')
let cardsEl = document.getElementById('cards-el')

let player = {
    name: "Muh",
    chips: 150
}

let playerEl = document.getElementById('player-el')
playerEl.textContent = player.name + ': $' + player.chips

function startGame() {
    // Variable Initialization
    cards = []
    has_blackjack = false
    isAlive = true
    let firstCard = Math.floor((Math.random() * 13) + 1)
    let secondCard = Math.floor((Math.random() * 13) + 1)
    cards.push(firstCard, secondCard)
    sum = firstCard + secondCard
    renderGame()
}


function renderGame() {
    cardsEl.textContent = "Cards: "
    // display the cards
    for(let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + ' '
    }
    // display the sum
    sumEl.textContent = "Sum: " + sum

    // conditions for blackjack
    if (sum < 21) {
        message = 'Do you want to pick another card?'
    } else if (sum === 21) {
        message = 'You Have BlackJack.'
        has_blackjack = true 
    } else {
        message = 'You are out of the game.'
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard() {
    if(isAlive && !has_blackjack ) {
        let card = Math.floor((Math.random() * 13) + 1)
        sum += card
        cards.push(card)
        renderGame() 
    }
}