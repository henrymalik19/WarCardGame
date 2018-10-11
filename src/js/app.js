import { Game } from './util/game.js';
import { Deck } from './util/deck.js';
import { Player } from './util/player.js';

// Game Setup
const game = new Game();
const deck = new Deck();
const player = new Player();
const comp = new Player();

deck.fill();
deck.shuffle();

[player.hand, comp.hand] = deck.deal();


// Gameplay Starts Here
document.getElementById("player__deck").addEventListener("click", () => {
//while(true) { Uncomment to simulate a full game
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
            case 'player':
                player.winPile.push.apply(player.winPile, results.cardsPlayed);
                break;
            case 'comp':
                comp.winPile.push.apply(comp.winPile, results.cardsPlayed);
                break;
        };

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
        console.log(`${game.results.winner} won the game!`);
        //break; Uncomment to simulate a full game
    };
//}; Uncomment to simulate a full game
});
