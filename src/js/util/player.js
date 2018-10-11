const Player = function () {
    this.playing = true;
    this.roundCards = []; //Card (or cards) currently in play
    this.hand = []; //Cards not in play
    this.winPile = []; //Cards that have been won
};

Player.prototype.refillHand = function () {
    if (this.hand.length === 0) {
        for (let i = 0; i < 100; i++) {
            this.winPile.splice(Math.floor(Math.random() * this.winPile.length - 1), 0, this.winPile.shift());
        };
        this.hand = this.winPile;
        this.winPile = [];
    };
};

Player.prototype.nextCard = function (numOfCards = 1) {

    for (let i = 0; i < numOfCards; i++) {
        this.refillHand();
        this.roundCards.push(this.hand.shift());

        if (this.roundCards.includes(undefined)) {

            console.log('This is an undefined card');

            this.roundCards.pop();
            this.playing = false;
            return this;
        };
    };
    return this.roundCards;
};

export { Player };