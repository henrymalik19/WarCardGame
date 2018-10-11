import { Game } from './util/game.js';
import { Deck } from './util/deck.js';
import { Player } from './util/player.js';

// Game Setup
const game = new Game();
let deck = new Deck();
let player = new Player();
let comp = new Player();

function init() {
    
    document.getElementById("roundResult").innerText = "Click your deck to start!";
    document.getElementById("playerWins").innerText = 0;
    document.getElementById("compWins").innerText = 0;
    document.querySelectorAll(".playing__card").forEach(div => {
        div.style.visibility = "hidden";
    });

    game.gamePlaying = true;
    player.reset();
    comp.reset();
    deck.fill();
    deck.shuffle();

    console.log(game, deck, player);

    [player.hand, comp.hand] = deck.deal();
};

function updateUI(player, comp, results) {
    //Unhide the cards being played
    document.querySelectorAll(".playing__card").forEach(div => {
        div.style.visibility = "visible";
    });

    let playerCard = player.roundCards[player.roundCards.length - 1];
    let compCard = comp.roundCards[comp.roundCards.length - 1];

    //Update Round Winner
    document.getElementById("roundResult").innerText = `${results.winner} Wins!`;
    
    //Update Card Symbol
    document.getElementById("player__card__symbol").src = `./assets/imgs/${playerCard.suit}.png`;
    document.getElementById("comp__card__symbol").src = `./assets/imgs/${compCard.suit}.png`;
    
    //Update Card Number & Color
    document.querySelectorAll(".player__number").forEach(number => {
        number.innerText = playerCard.symbol;
        playerCard.suit === "heart" || playerCard.suit === "diamond" ? number.classList.add("red") : number.classList.remove("red");
    });
    document.querySelectorAll(".comp__number").forEach(number => {
        number.innerText = compCard.symbol;
        compCard.suit === "heart" || compCard.suit === "diamond" ? number.classList.add("red") : number.classList.remove("red");
    });
    
    //Update Round Wins
    document.getElementById("playerWins").innerText = player.wins;
    document.getElementById("compWins").innerText = comp.wins;
};

// Gameplay Starts Here
document.getElementById("player__deck").addEventListener("click", () => {
//while(true) { //Uncomment to simulate a full game
    if(game.gamePlaying === true) {

        player.nextCard();
        comp.nextCard();

        let results = game.compareCards(player, comp);

        while (results.war === true) {
            player.nextCard(4);
            comp.nextCard(4)
            results = game.compareCards(player, comp);
        };

        switch (results.winner) {
            case 'Player':
                player.winPile.push.apply(player.winPile, results.cardsPlayed);
                player.wins++;
                break;
            case 'Computer':
                comp.winPile.push.apply(comp.winPile, results.cardsPlayed);
                comp.wins++;
                break;
        };

        updateUI(player, comp, results);

        player.roundCards = [];
        comp.roundCards = [];

        player.refillHand();
        comp.refillHand();

        game.checkWinner(player, comp);
        
        console.log('End of Round');
        console.log(`Game Status = ${game.gamePlaying}`);
        console.log(JSON.parse(JSON.stringify(results)));
        console.log(JSON.parse(JSON.stringify(player)));
        console.log(JSON.parse(JSON.stringify(comp)));

    }
    else {
        console.log(`${results.winner} won the game!`);
        //break; //Uncomment to simulate a full game
    };
//}; //Uncomment to simulate a full game
});

document.getElementById("newGameButton").addEventListener("click", () => {
    init();
});


window.onload = init();