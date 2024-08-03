import { fetchQuestions, renderHtml, tryAgain } from "./utility.js";

let questCont = document.querySelector('.quiz-list');
const loadingSpinner = document.getElementById('loading-spinner');
let id = 0;
let data = [];

document.querySelectorAll('.difficulty-option').forEach(element => {
    element.addEventListener('click', () => {
        let diff = element.dataset.difficulty;

        questCont.style.display = 'block';
        document.querySelector('.difficulty-container').style.display = 'none';
        loadingSpinner.style.display = 'block';

        fetchQuestions(diff).then(fetchedData => {
            data = fetchedData;
            id = 0; // Reset id when a new difficulty is selected
            renderHtml(questCont, loadingSpinner, data, id);

            // Ensure the "Next Question" button works
            let nextBtn = document.getElementById('next-button');
            nextBtn.addEventListener('click', showNextQuestion);
        })
        .catch(msg => {
            console.log(msg);
        });
    });
});

function showNextQuestion() {
    id++;
    if (id < data.length) {
        renderHtml(questCont, loadingSpinner, data, id, showNextQuestion);
    } else {
        let finalScore = localStorage.getItem('score')
        questCont.innerHTML = `
        <div class="question-container">
            <p>Your Score: ${finalScore ? finalScore: 0}</p>
            <p>No more questions available.</p>

            <button id="tryAgainBtn">Try Again</button>

        </div>`;

        let someArr;

        someArr = finalScore

        localStorage.removeItem('score')

        localStorage.setItem('allFinalScore', JSON.stringify(someArr))

        document.getElementById('score').textContent = someArr ? someArr: 0

        document.getElementById('tryAgainBtn').addEventListener('click', ()=> {
            localStorage.removeItem('score')
            tryAgain(document.getElementById('tryAgainBtn'), document.querySelector('.difficulty-container'), questCont)
        })
    }
}

let finalScore3232 = JSON.parse(localStorage.getItem('allFinalScore'))

document.getElementById('score').textContent = finalScore3232 ? finalScore3232: 0
