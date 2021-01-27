const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase ul');
const resetBtn = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let chosen = 0
let missed = 0;
let lives = document.querySelectorAll('#scoreboard img');
const quotes = [
    "respect all races", 
    "do not sit back and be silent",
    "Accomplishments have no color",
    "Be kind",
    "No to racism"
];


// Remove the overlay 
let hiddenPhrase = getRandomPhraseAsArray();

resetBtn.addEventListener ('click', () => {
    overlay.style.display = 'none';
    if (overlay.className === ('win') || overlay.className === ('lose')){
    removePhraseFromDisplay()
    }
    addPhraseToDisplay(hiddenPhrase);
});

//random quotes

function getRandomPhraseAsArray (arr) {
    const quoteSelector = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteSplit = quoteSelector.split('');
    return quoteSplit;
}


//displaying quotes on screen
function addPhraseToDisplay (arr) {
    for (i = 0; i < arr.length; i++){
        let li = document.createElement('li');
        phrase.appendChild(li);
        li.textContent = arr[i];
        if (li.textContent === ' ') {
            li.className = 'space'
            li.style.display = 'block'
        } else {
            li.className = 'letter'
        }
    }
}

function removePhraseFromDisplay () {
    for (i = 0; i < 5; i++){
        lives[i].src = 'images/liveHeart.png'
    }
    missed = 0
    for (i = 0; i < hiddenPhrase.length; i++){
        li = document.querySelector('#phrase ul li');
        phrase.removeChild(li);
    }
    for (i = 0; i < chosen; i++){
        document.querySelectorAll('.chosen')[0].className = '';
    }
    chosen = 0;
    hiddenPhrase = getRandomPhraseAsArray();
}

//checking letters
qwerty.addEventListener('click', (event) => {
    let match = null;
    let phraseLI = phrase.childNodes
    if (event.target.tagName === 'BUTTON' && event.target.className !== 'chosen') {
        event.target.className = 'chosen';
        chosen++
        for (let i = 0; i < hiddenPhrase.length; i++){
            if (phraseLI[i].textContent.toLowerCase() === event.target.textContent){
                phraseLI[i].className += ' show';
                match = event.target.textContent;
            }
        }
        // counting missed letters
        if (match === null){
            missed++;
            lives[missed-1].src = 'images/lostHeart.png';           
        }
        // win lose display 
        if (hiddenPhrase.length === document.querySelectorAll('.show').length + document.querySelectorAll('.space').length){
            overlay.className =('win');
            overlay.style.display = 'flex';
        }else if (missed === 5){
            overlay.className =('lose');
            overlay.style.display = 'flex';
        }
    }
})




















