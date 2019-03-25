/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


const classCards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
let time= new timer()
//this function to create card html
function createHTMLCard() {
    let classCardNew = shuffle(classCards);
    let htmlcards = '';
    for (let classCard of classCards) {
        htmlcards = htmlcards + `<li class="card">
                <i class="fa ${classCard}"></i>
            </li>`;
    }

    document.getElementById('deck').innerHTML = htmlcards;

}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//this function to addEventListener
function addEvent() {

    const cards = document.querySelectorAll(".card");
    //console.log(document.querySelectorAll(".fa-star"));
    let listOpenCards = new Array();
    let numberOfmoves = 0;
    let trueCard=2;
    for (let card of cards) {
        card.addEventListener('click', function () {

            if (card.className != "card match" && card.className != "card open show" && listOpenCards.length < 2) {
                card.classList.add("open", "show");
                listOpenCards.push(card);
                if (listOpenCards.length == 2) {
                    setTimeout(function () {
                        for (let list of listOpenCards) {

                            if (listOpenCards[0].childNodes[1].className == listOpenCards[1].childNodes[1].className) {
                                list.classList.add("match");
                                trueCard++;
                            } else {
                                list.classList.add("incorrect");
                                setTimeout(function () {
                                    /* the incorrect class has  shake form "w3schools" */
                                    list.classList.remove("open", "show", "incorrect");

                                }, 500);

                            }

                        }


                        listOpenCards = [];
                    }, 1000);

                }
                numberOfmoves++;

            }
            console.log(trueCard);
            if(trueCard>16){
                winner();
            }

            document.querySelector('.moves').textContent = numberOfmoves;
        });
    }


}

function winner() {
   $('.container').hide()
}
//this function to restart Game
function restartGame() {
    document.querySelector('.restart').addEventListener('click', function () {
        createHTMLCard(classCards);
        addEvent();
        document.querySelector('.moves').textContent = 0;
        document.querySelector('.timer').textContent = 0;
        time.closeTime();
        time = new timer();
        time.openTime();
    });
}

function timer() {
    let timer = document.querySelector('.timer').textContent;
    let timeInterval;
    this.openTime = function () {

        timeInterval = setInterval(function () {
            document.querySelector('.timer').textContent = timer;
            timer++;
        }, 1000);
    }
    this.closeTime =function () {
        clearInterval(timeInterval);

    }

}


//this function to  create card html
createHTMLCard(classCards);
//this function to addEventListener
addEvent();
//this function to restart Game
restartGame();

time.openTime();


