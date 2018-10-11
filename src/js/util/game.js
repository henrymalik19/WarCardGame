const Game = function () {
    this.gamePlaying = true;
    this.results = {
        winner: '',
        war: false,
        cardsPlayed: []
    };

    this.compareCards = function (player, comp) {

        // Determine Who won the Game
        this.results = this.checkWinner(player, comp);

        if (this.gamePlaying === false) {
            return this.results;
        };

        //Determine Who won the Round
        let playerCard = player.roundCards[player.roundCards.length - 1];
        let compCard = comp.roundCards[comp.roundCards.length - 1];

        if (playerCard.value > compCard.value) {

            this.results.winner = 'Player';
            this.results.war = false
            this.results.cardsPlayed = player.roundCards.concat(comp.roundCards);
            return {
                winner: 'Player',
                war: false,
                cardsPlayed: player.roundCards.concat(comp.roundCards)
            };

        }
        else if (playerCard.value < compCard.value) {

            this.results.winner = 'Computer';
            this.results.war = false
            this.results.cardsPlayed = player.roundCards.concat(comp.roundCards);
            return {
                winner: 'Computer',
                war: false,
                cardsPlayed: player.roundCards.concat(comp.roundCards)
            };

        }
        else if (playerCard.value === compCard.value) {

            this.results.winner = '';
            this.results.war = true;
            this.results.cardsPlayed = player.roundCards.concat(comp.roundCards);
            return {
                winner: '',
                war: true,
                cardsPlayed: player.roundCards.concat(comp.roundCards)
            };
        };
    };

    this.checkWinner = function (player, comp) {

        if (player.playing === false) {
            this.gamePlaying = false;
            this.results.winner = 'Computer';
            this.results.war = false;
            return {
                winner: 'Computer',
                war: false
            };
        };

        if (comp.playing === false) {
            this.gamePlaying = false;
            this.results.winner = 'Player';
            this.results.war = false;
            return {
                winner: 'Player',
                war: false
            };
        };

        this.results.winner = '';
        this.results.war = false;
        return {
            winner: '',
            war: false
        };
    };
};

export { Game };