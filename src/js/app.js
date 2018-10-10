import { Game } from './util/game.js';
import { Deck } from './util/deck.js';
import { Player } from './util/player.js';

// Game Setup
let game = new Game();
let deck = new Deck();
let player = new Player();
let comp = new Player();
let results;

deck.fill();
deck.shuffle();

[player.hand, comp.hand] = deck.deal();


// Gameplay Starts Here
document.getElementById("player__deck").addEventListener("click", () => {

    //results = game.compareCards(player.nextCard(), comp.nextCard());
    game.compareCards(player.nextCard(), comp.nextCard());

    while (game.results.war === true) {
        game.results = game.compareCards(player.nextCard(4), comp.nextCard(4));
    };

    if (game.gamePlaying === true) {
        switch (game.results.winner) {
            case 'player':
                player.winPile.push.apply(player.winPile, game.results.cardsPlayed);
                break;
            case 'comp':
                comp.winPile.push.apply(comp.winPile, game.results.cardsPlayed);
                break;
        };
        player.roundCards = [];
        comp.roundCards = [];

        player.refillHand();
        comp.refillHand();

        console.log(JSON.parse(JSON.stringify(game.results)));
        console.log(JSON.parse(JSON.stringify(player)));
        console.log(JSON.parse(JSON.stringify(comp)));

    }
    else {
        console.log(`${game.results.winner} won the game!`);
    };
});

/*
Individual cards need to be changed into obect
propeties
    card.suit (spades)
    card.symbol (2,3,4... J,Q,K,A)
    card.value (2 - 14)

*/