let playerCard,
    compCard,
    realPlayerCard,
    realCompCard,
    playerWarCard, 
    compWarCard, 
    WarArray,
    deck,
    playerHand, 
    compHand, 
    playerDeck,
    compDeck, 
    gamePlaying;



/*********************
 FUNCTION DECLERATIONS 
**********************/

function fillDeck(){
    
    for(counter=2;deck.length < 52;counter++){ //
        deck.push(counter);
    };
     // TESTING PURPOSES
    console.log('Unshuffled Deck ', deck);
};


function shuffleDeck(deck2Shuffle){
    
    for(shuffleCounter=0; shuffleCounter < 100; shuffleCounter++){
        deck2Shuffle.splice(Math.floor(Math.random() * deck2Shuffle.length -1), 0, deck2Shuffle.shift());
    };
    // TESTING PURPOSES
    console.log('Shuffled Deck ', deck2Shuffle);
    return deck2Shuffle;
};



function dealCards(){
    while(deck.length > 0){
        
        playerHand.push(deck.shift());
        compHand.push(deck.shift());

    };
    // TESTING PURPOSES
    console.log('Dealt Deck ', deck);
    console.log('Player Hand', playerHand);
    console.log('Computer Hand', compHand);
};



function realNumb(card){
    if(card >= 15 && card <= 27 ){
        return card - 13;
    } else if(card >= 28 && card <= 40){
        return card - 26;
    } else if(card >= 41 && card <= 53){
        return card - 39;
    } else{
        return card;
    };
};



function checkWinner(){
    if(playerHand.length === 0 || compHand.length === 0){

        //Check Winner
        if(playerHand.length === 0 && playerDeck.length === 0){
            //TESTING PURPOSES
            console.log("Computer Wins the Game!!!");

            gamePlaying = false;

        } else if(compHand.length === 0 && compDeck.length === 0){
            //TESTING PURPOSES
            console.log("Player Wins the Game!!!");

            gamePlaying = false;
            
        // This else will determine if there are cards in either deck and what should happen.
        } else {
            
            if(playerHand.length === 0){
                playerDeck = shuffleDeck(playerDeck);
                playerHand.push.apply(playerHand, playerDeck);
                playerDeck = [];
                
                //TESTING PURPOSES
                console.log('New Player Hand', playerHand);
                console.log('Player Deck', playerDeck);

            };
            
            if(compHand.length === 0){
                compDeck = shuffleDeck(compDeck);
                compHand.push.apply(compHand, compDeck);
                compDeck = [];
                
                //TESTING PURPOSES
                console.log('New Computer Hand', compHand);
                console.log('Computer Deck', compDeck);
            };
        };   
    };
};



function war(){
    
    for(warCounter=0; warCounter<3; warCounter++){
        
        checkWinner();

        if(gamePlaying === false){
            return false;
        }

        //TESTING PURPOSES
        console.log('i = ' + warCounter);

        WarArray.push(playerHand.shift(), compHand.shift());
                
    };
    
    playerWarCard = realNumb(WarArray[WarArray.length -2]);
    compWarCard = realNumb(WarArray[WarArray.length -1]);
    
    // TESTING PURPOSES
    console.log('War Cards ' + WarArray);
                
    if(playerWarCard > compWarCard){
        
        playerDeck.push(playerCard, compCard);
        playerDeck.push.apply(playerDeck, WarArray);
                
        // TESTING PURPOSES
        console.log('Player Wins War!');
            
    } else if(playerWarCard < compWarCard){
        
        compDeck.push(playerCard, compCard);
        compDeck.push.apply(compDeck, WarArray);
                
        // TESTING PURPOSES
        console.log('Computer Wins War!');
            
    } else if(playerWarCard === compWarCard) {
        
        // TESTING PURPOSES
        console.log("This Means War Again!");
        war();
    };
};



function nextCard(){
    
    checkWinner();
                
    playerCard = playerHand.shift();
    compCard = compHand.shift();
    
    realPlayerCard = realNumb(playerCard);
    realCompCard = realNumb(compCard);

    //Display Card on Webpage
    document.getElementById('playerCard').innerText = realPlayerCard;
    document.getElementById('compCard').innerText = realCompCard;
        
    // TESTING PURPOSES
    console.log('Player Card: ' + playerCard, realPlayerCard);
    console.log('Computer Card: ' + compCard, realCompCard);
        
    //Determine Who won the Round
    if(realPlayerCard > realCompCard){
        
        // TESTING PURPOSES
        console.log('Player Wins!');
        document.getElementById('roundResult').innerText = 'Player Wins!';
        // Add Player and Computer Card to Winning Deck
        playerDeck.push(playerCard, compCard);
    
    } else if(realPlayerCard < realCompCard){
        
        // TESTING PURPOSES
        console.log('Computer Wins!');
        document.getElementById('roundResult').innerText = 'Computer Wins!';
        // Add Player and Computer Card to Winning Deck
        compDeck.push(playerCard, compCard);
    
    } else if(realPlayerCard === realCompCard){
        
        // TESTING PURPOSES
        console.log('This Means War!!');
        document.getElementById('roundResult').innerText = 'This Means War!!';
        
        WarArray = [];
        war();
        
    };

    // TESTING PURPOSES
    console.log('Player Hand Remaining', playerHand);
    console.log('Player Deck', playerDeck);
    console.log('Computer Hand Remaining', compHand);
    console.log('Computer Deck', compDeck);

};



function init(){
    
    deck = [];
    playerHand = [];
    compHand = [];
    playerDeck = [];
    compDeck = [];
    gamePlaying = true;

    //document.getElementById('roundResult').style.display = 'none';

    fillDeck();
    deck = shuffleDeck(deck);
    dealCards();
    
    // OLD STUFF THAT WILL BE DELETED ONCE CODE IS FINISHED
    //playGame();
};



/***************
 EVENT LISTENERS
****************/

document.getElementById('btn-nxt').addEventListener('click', function(){
    
    if(gamePlaying === true){
        nextCard();
    };
    
});

document.getElementById('btn-new').addEventListener('click', function(){
    
    document.getElementById('roundResult').innerText = '';
    document.getElementById('playerCard').innerText = '0';
    document.getElementById('compCard').innerText = '0';
    init();
});

window.onload = init();








/*********************************************************
OLD CODE THAT WILL BE DELETED ONCE CODE IS FINISHED
**********************************************************/


function playGame(){
    
    // TESTING PURPOSES
    var round = 1;
    while(gamePlaying === true){

        checkWinner();

        if(gamePlaying === false){
            break;
        };
        
        // TESTING PURPOSES
        console.log('ROUND: ' + round);
        
        playerCard = playerHand.shift();
        compCard = compHand.shift();
        
        realPlayerCard = realNumb(playerCard);
        realCompCard = realNumb(compCard);
            
        // TESTING PURPOSES
        console.log('Player Card: ' + playerCard, realPlayerCard);
        console.log('Computer Card: ' + compCard, realCompCard);
            
        //Determine Who won the Round
        if(realPlayerCard > realCompCard){
            
            // TESTING PURPOSES
            console.log('Player Wins!');
            // Add Player and Computer Card to Winning Deck
            playerDeck.push(playerCard, compCard);
        
        } else if(realPlayerCard < realCompCard){
            
            // TESTING PURPOSES
            console.log('Computer Wins!');
            // Add Player and Computer Card to Winning Deck
            compDeck.push(playerCard, compCard);
        
        } else if(realPlayerCard === realCompCard){
            
            // TESTING PURPOSES
            console.log('This Means War!!');
            
            WarArray = [];
            war();
            
        }; 

    // TESTING PURPOSES
    console.log('Player Hand Remaining', playerHand);
    console.log('Player Deck', playerDeck);
    console.log('Computer Hand Remaining', compHand);
    console.log('Computer Deck', compDeck);
    // TESTING PURPOSES
    round++;
        
    };
};
