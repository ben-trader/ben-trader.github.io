const quoteButton = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');

quoteButton.addEventListener('click', newQuote);
answerButton.addEventListener('click', getAnswer);

var answerText = document.querySelector('#js-answer-text');
var quoteText = document.querySelector('#js-quote-text');

let answer = '';

async function newQuote() {
    console.log("hehe haha");
    try{
        const response = await fetch('https://trivia.cyberwisp.com/getrandomchristmasquestion');
        const quote = await response.json();

        if(response.ok){
            throw Error(response.statusText);
        }
        console.log(quote);
        displayQuote(quote['question']);
        answer = quote['answer'];
    } catch (err){
        console.log(err);
        alert('ayo error');
    }
    answerText.textContent = '';
}

function displayQuote(quote) {
    quoteText.textContent = quote;
}

function getAnswer() {
    answerText.textContent = answer;
}