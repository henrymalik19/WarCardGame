const Game = function () {
    this.gamePlaying = true;
    this.results = {
        winner: '',
        war: false,
        cardsPlayed: []
    };

    // Get the correct value of cards over 14
    this.convertCard = function (card) {
        switch (true) {
            case card >= 15 && card <= 27:
                return card - 13;
            case card >= 28 && card <= 40:
                return card - 26;
            case card >= 41 && card <= 53:
                return card - 39;
            default:
                return card;
        };
    };

    this.compareCards = function (player, comp) {

        // Determine Who won the Game
        this.results = this.checkWinner(player, comp);

        if (this.gamePlaying === false) {
            return this.results;
        };

        //Determine Who won the Round
        let playerConvert = this.convertCard(player[player.length - 1]);
        let compConvert = this.convertCard(comp[comp.length - 1]);

        if (playerConvert > compConvert) {

            this.results.winner = 'player';
            this.results.war = false
            this.results.cardsPlayed = player.concat(comp);
        }
        else if (playerConvert < compConvert) {

            this.results.winner = 'comp';
            this.results.war = false
            this.results.cardsPlayed = player.concat(comp);
        }
        else if (playerConvert === compConvert) {

            this.results.winner = '';
            this.results.war = true;
            this.results.cardsPlayed = player.concat(comp);
        };
    };

    this.checkWinner = function (player, comp) {
        if (player.playing === false) {
            this.gamePlaying = false;
            this.results.winner = 'comp';
            this.results.war = false;
        };

        if (comp.playing === false) {
            this.gamePlaying = false;
            this.results.winner = 'player';
            this.results.war = false;
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