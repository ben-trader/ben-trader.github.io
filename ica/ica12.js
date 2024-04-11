const quoteButton = document.querySelector('#js-new-quote');
const answerButton = document.querySelector('#js-tweet');

quoteButton.addEventListener('click', newQuote);
answerButton.addEventListener('click', getAnswer);

var answerText = document.querySelector('#js-answer-text');
var quoteText = document.querySelector('#js-quote-text');

const xmasLink = 'https://trivia.cyberwisp.com/getrandomchristmasquestion'

let answer = '';

async function newQuote() {
    console.log("hehe haha");
    try{
        const response = await fetch(xmasLink);

        if(response.ok){
            throw Error(response.statusText);
        }
        const quote = await response.json();

        console.log(quote);
        displayQuote(quote['question']);
        answer = quote['answer'];
        answerText.textContent = '';
    } catch (err){
        console.log(err);
        alert('ayo error');
    }
}

function displayQuote(quote) {
    quoteText.textContent = quote;
}

function getAnswer() {
    answerText.textContent = answer;
}

newQuote();