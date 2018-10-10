import { Deck } from '../util/deck';

describe('Deck', () => {
    let deck = new Deck();
    test('Should Have 52 Cards in the Deck', () => {
        deck.fill();
        expect(deck.cards).toHaveLength(52);
    });
    test('Should Contain the numbers 2 - 53', () => {
        let counter = 2;
        deck.cards.forEach(elements => {
            expect(elements).toBe(counter);
            counter++;
        });
    });
    test('Should Return two Arrays of 26 Cards', () => {
        let [ playerHand, compHand ] = deck.deal();
        expect(playerHand).toHaveLength(26);
        expect(compHand).toHaveLength(26);
        expect(deck.cards).toHaveLength(0);
    });
});




// it('Should return an array from 2 - 54', () => {
//     expect(deck.fillDeck()).toHaveLength(52);
// });