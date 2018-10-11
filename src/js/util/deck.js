// Deck Constructor 
const Deck = function () {
  this.cards = [];

  // Methods of Deck Object
/*   this.fill = () => {
      for (let i = 2; this.cards.length < 52; i++) {
          this.cards.push(i);
      };
  }; */

  this.fill = () => {

    let suits = ['spade', 'club', 'heart', 'diamond'];
    
    suits.forEach(suit => {
      for (let i = 2; i <= 14; i++) {
        let symbol = i;
        
        switch (symbol) {
          case 11:
            symbol = "J";
            break;
          case 12:
            symbol = "Q";
            break;
          case 13:
            symbol = "K";
            break;
          case 14:
            symbol = "A";
            break;
          default:
            symbol = i;
            break;
          }
        let card = { suit: suit, value: i, symbol: symbol};
        this.cards.push(card);
      };
    });
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