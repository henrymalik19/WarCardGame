// Deck Constructor 
const Deck = function () {
  this.cards = [];

  // Methods of Deck Object
  this.fill = () => {
      for (let i = 2; this.cards.length < 52; i++) {
          this.cards.push(i);
      };
  };

  this.shuffle = () => {
      for (let i = 0; i < 100; i++) {
          this.cards.splice(Math.floor(Math.random() * this.cards.length - 1), 0, this.cards.shift());
      };
  };

  this.deal = () => {
      return [this.cards.splice(0, 26), this.cards.splice(0, 26)];
  };

};


export { Deck };