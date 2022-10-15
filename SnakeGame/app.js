const gameBoard = document.querySelector('.canvas')
const ctx = gameBoard.getContext("2d")
const scoreTxt = document.querySelector('.scoreTxt')
const resetBtn = document.querySelector('.btn')
const boardHeight = gameBoard.height
const boardWidth = gameBoard.width
const boardClr = "teal"
const snakeClr = "white"
const borderClr = "grey"
const foodClr = "red"
const unitSize = 25
let running = false
let xVelocity = unitSize
let yVelocity = 0
let foodX;
let foodY;
let score = 0
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},  
    {x:unitSize, y:0},
    {x:0, y:0}
]

window.addEventListener('keydown', changeDirection)


gameStart()

function gameStart() {
    running = true
    scoreTxt.textContent = score
    nextTick()
    createFood()
    drawFood()
}

function nextTick() {
    if(running) {
        setTimeout(() => {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()
        }, 75)
    }else {
        displayGameOver()
    }
}

function clearBoard() {
    ctx.fillStyle = boardClr
    ctx.fillRect(0, 0, boardWidth, boardHeight)
}

function createFood() {
    function randomFood(max, min) {
        const randNum = Math.round((Math.random() * (max - min) + min ) / unitSize) * unitSize
        return randNum
    }

    foodX = randomFood(0, boardWidth - unitSize)
    foodY = randomFood(0, boardWidth - unitSize)
}

function drawFood() {
    ctx.fillStyle = foodClr
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
}

function moveSnake() {
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity}
    snake.unshift(head)

    if(snake[0].x == foodX && snake[0].y == foodY) {
        score++
        scoreTxt.textContent = score
        createFood()
    }else {
        snake.pop()
    }
}

function drawSnake() {
    ctx.fillStyle = snakeClr
    ctx.strokeStyle = borderClr
    snake.forEach((snakePart) => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize) 
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    })
}

function changeDirection(event) {
    let keyPressed = event.keyCode
    const LEFT = 37
    const UP = 38
    const Right = 39
    const Down = 40

    let goingUp = (yVelocity == -unitSize)
    let goingLeft = (xVelocity == -unitSize)
    let goingRight = (xVelocity == unitSize)
    let goingDown = (yVelocity == unitSize)

    switch(true) {
        case(keyPressed == LEFT && !goingRight):
             xVelocity = -unitSize
             yVelocity = 0
        break

        case(keyPressed == Right && !goingLeft):
             xVelocity = unitSize
             yVelocity = 0
        break

        case(keyPressed == UP && !goingDown):
             xVelocity = 0
             yVelocity = -unitSize
        break

        case(keyPressed == Down && !goingUp):
             xVelocity = 0
             yVelocity = unitSize
        break
    }
}

function checkGameOver() {
    switch(true) {
        case (snake[0].x < 0):
            running = false
            break

        case (snake[0].x >= boardWidth):
            running = false
            break    
        case (snake[0].y < 0):
            running = false
            break    
        case (snake[0].y >= boardHeight):
            running = false
            break
    }

    for(let i = 1; i < snake.length; i++) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) {running = false}  // ამას ვერ ვიზამდით ფორ იჩით რადგან ჩვენ გვჭირდება არა ყველა თავი არამედ პირველის გარდა ყველა ჩვენი ლუპი არ იწყება თავიდან
    }
}

function displayGameOver() {
    ctx.fillStyle = "black"
    ctx.font = "30px Montserrat"
    ctx.textAlign = "center"
    ctx.fillText("Game Over!", boardWidth / 2, boardHeight / 2)
    running = false
}

