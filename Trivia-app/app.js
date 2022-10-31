let bounceBtn = document.querySelector('.bounce')
let quizCont = document.querySelector('.quiz')

bounceBtn.addEventListener('click', ()=> {
    bounceBtn.classList.add('active')
    quizCont.classList.add('active')
})

let score = 0
let scoreH3 = document.querySelector('.score')
const question = document.querySelector('.question')
const first = document.querySelector('.first')
const second = document.querySelector('.second')
const third = document.querySelector('.third')
const fourth = document.querySelector('.fourth')
let box = document.querySelectorAll('.box')
const next = document.querySelector('.next')
const div = document.querySelector('.div')
const lastDiv = document.querySelector('.big-div')
const lastScore = document.querySelector('.last-score')

let questions = [
    {
        questionName: "For which of the following disciplines is Nobel Prize awarded?",
        A: "Physics and Chemistry",
        B: "Physiology or Medicine",
        C: "Literature, Peace and Economics",
        D: "All of the above",

        answer: "All of the above",

        id: 0
    },

    {
        questionName: "Which desert is cold?",
        A: "All",
        B: "Sahara desert",
        C: "Kalahari desert",
        D: "All of the above",
    
        answer: "All of the above",
    
        id: 1
    },

    {
        questionName: "Which bird flies backwards?",
        A: "Woodpecker",
        B: "Owl",
        C: "Hummingbird",
        D: "All of the above",
    
        answer: "Hummingbird",
    
        id: 2
    },

    {
        questionName: "Which city stands on two continents?",
        A: "Istanbul",
        B: "Moscow",
        C: "Delhi",
        D: "Mumbai",
    
        answer: "Istanbul",
    
        id: 3
    },

    {
        questionName: "What is 2 + 2?",
        A: "5",
        B: "15",
        C: "4",
        D: "1",
    
        answer: "5",
    
        id: 4
    },

    {
        questionName: "Which city is the capital of Switzerland?",
        A: "Geneva",
        B: "Zurich",
        C: "Bernie",
        D: "Basel",
    
        answer: "Bernie",
    
        id: 5
    },

    {
        questionName: "Which US president is depicted on the $100 bill?",
        A: "Benjamin Franklin",
        B: "Abraham Linkon",
        C: "Obama",
        D: "None of the above",
    
        answer: "None of the above",
    
        id: 6
    },

    {
        questionName: "What is the official language in the USA?",
        A: "English",
        B: "Spanish",
        C: "Mexican",
        D: "None of the above",
    
        answer: "None of the above",
    
        id: 7
    },

    {
        questionName: "How many animals were in the ark of Moses?",
        A: "2000",
        B: "There were no animals",
        C: "5000",
        D: "None of the above",
    
        answer: "None of the above",
    
        id: 8
    },

    {
        questionName: "Where is the largest desert?",
        A: "In the Sahara",
        B: "In the Georgia",
        C: "Antarctica",
        D: "in Arabia",
    
        answer: "Antarctica",
    
        id: 9
    },
]

div.addEventListener('click', startGame)
let arrayIndex = questions[0].id

function startGame() {
    firstQuestion(arrayIndex)
    scoreH3.textContent = `Your Score is: ${score}`
}
AllBox()
function AllBox() {
    box.forEach((Array)=> {
        Array.addEventListener('click', ()=> {
            if(questions[arrayIndex].answer === Array.textContent) {
                score+=1
                scoreH3.textContent = `Your Score is: ${score}`
                Array.style.backgroundColor = "green"
                next.classList.add('active')
            }else if(questions[arrayIndex].answer !== Array.textContent) {
                Array.style.backgroundColor = "red"
                next.classList.add('active')
            }

            fourth.classList.add('deactive')
            second.classList.add('deactive')
            first.classList.add('deactive')
            third.classList.add('deactive')
        })
    })
}

function firstQuestion(arrayIndex) {
    first.textContent = questions[arrayIndex].A
    second.textContent = questions[arrayIndex].B
    third.textContent = questions[arrayIndex].C
    fourth.textContent = questions[arrayIndex].D

    question.textContent = questions[arrayIndex].questionName
}

next.addEventListener('click', ()=> {
    firstQuestion(arrayIndex)
    arrayIndex++
    if(arrayIndex === questions.length-1) {
        lastDiv.classList.add('active')
        lastScore.textContent = `Congratulation Your Score is ${score}`
    }
    startGame()

    box.forEach((Array)=> {
        Array.style.backgroundColor = "rgb(30, 105, 124)"
    })

    fourth.classList.remove('deactive')
    second.classList.remove('deactive')
    first.classList.remove('deactive')
    third.classList.remove('deactive')
})