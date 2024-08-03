const questions = []
let score = 0
export async function fetchQuestions(diff) {
    let response;
    if (diff == 'all') {
        response = await fetch(`https://opentdb.com/api.php?amount=4&type=multiple`)
    } else {
        response = await fetch(`https://opentdb.com/api.php?amount=4&difficulty=${diff}`)
    }
    const data = await response.json()

    data.results.forEach((element, idx) => {
        questions.push(
            {
                id: idx,
                category: element.category,
                difficulty: element.difficulty,
                correct_answer: element.correct_answer,
                incorrect_answers: element.incorrect_answers,
                question: element.question,
            }
        )
    });

    return questions
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  
function handleAnswerClick(clickedElement, correctAnswer, answerElements) {
    answerElements.forEach((element) => {
        if (clickedElement.textContent.trim() === correctAnswer) {
            clickedElement.style.backgroundColor = '#2eff59'; // Green for correct answer
        } else {
            clickedElement.style.backgroundColor = '#ff4242'; // Red for wrong answer

            if (element.textContent.trim() === correctAnswer) {
                setTimeout(()=> {
                    element.style.backgroundColor = 'rgb(46 255 89 / 22%)';
                }, 1000)
            }
        }
        element.style.pointerEvents = 'none'; // Disable all answers
    });

    if (clickedElement.textContent.trim() === correctAnswer) {
        score += 1

        localStorage.setItem('score', JSON.stringify(score))
    }
}

export function renderHtml(questCont, loadingSpinner, data, id, showNextQuestion) {
    loadingSpinner.style.display = 'none';
    questCont.style.display = 'block';

    questCont.innerHTML = `

        <div class="question-container">
            <div class="difficulty">Difficulty: ${data[id].difficulty}</div>
            <div class="question">${data[id].question}?</div>
            <ul class="answers">
            </ul>
        </div>
        <button id="next-button">Next Question</button>
    
    `

    // shuffle answers
    let arr = [...data[id].incorrect_answers, data[id].correct_answer]

    shuffle(arr)

    let asnws = document.querySelector('.answers')

    arr.forEach(element => {
        asnws.innerHTML += `
        <li class="rameee">${element}</li>
        `
    });

    let answEl = asnws.querySelectorAll('.rameee')

    // check answers
    answEl.forEach((element) => {
        element.addEventListener('click', () => {
            handleAnswerClick(element, data[id].correct_answer, answEl);
        });
    });

    let nextBtn = document.getElementById('next-button');
    nextBtn.addEventListener('click', showNextQuestion);
}

export function tryAgain(btn, cont, questCont) {
    // Show the difficulty options and hide the quiz content
    cont.style.display = 'block';
    questCont.style.display = 'none';

    score = 0

    btn.parentElement.remove()

    questions.splice(0, questions.length);
}