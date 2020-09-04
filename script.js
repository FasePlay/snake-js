const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = document.getElementById('score');
const box = 25;


const appleSetPlace = {
    setX: function() {
        return Math.floor(Math.random() * 40) * box;
    },

    setY: function() {
        return Math.floor(Math.random() * 24) * box;
    }
}

let apple = {
    x: appleSetPlace.setX(),
    y: appleSetPlace.setY()
}


let direction = 'left';

let snake = [
    {
        x: box * 20,
        y: box * 12
    },
    {
        x: box * 20 + box,
        y: box * 12
    },
    {
        x: box * 20 + box * 2,
        y: box * 12
    }
]

//START
document.addEventListener("keydown", changeSnakeDirection)

let time = 80; //Измените эту переменную чтобы ускорить игру
let timer = setInterval(drawGame, time);


//DRAW GAME
function drawGame() {
    drawElements();
    changeSnakePos();
    isAlive();
    eatApple();
    changeScore();
}


function drawElements() {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.fillRect(snake[0].x, snake[0].y, box, box);
    //draw every element of snake
    for (let i = 1; i < snake.length; i++) {
        ctx.fillStyle = "#009900";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, box, box);
}

function changeSnakePos() {
    let oldX = snake[0].x;
    let oldY = snake[0].y;

    if (direction === 'left') {
        snake[0].x -= box;
    } else if (direction === 'right') {
        snake[0].x += box;
    } else if (direction === 'top') {
        snake[0].y -= box;
    } else {
        snake[0].y += box;
    }

    for (let i = 1; i < snake.length; i++) {
        ToldX = snake[i].x;
        ToldY = snake[i].y;
        snake[i].x = oldX;
        snake[i].y = oldY;
        oldX = ToldX;
        oldY = ToldY;
    }
}

function changeSnakeDirection(event) {
    if (event.keyCode === 37 && direction !== 'right') {
        direction = 'left';
    } else if (event.keyCode === 38 && direction !== 'down') {
        direction = 'top';
    } else if (event.keyCode === 39 && direction !== 'left') {
        direction = 'right';
    } else if (event.keyCode === 40 && direction !== 'top') {
        direction = 'down';
    }
}

function isAlive() {
    if (snake[0].x === canvas.width) {
        snake[0].x = 0;
    } else if (snake[0].x === 0 - box) {
        snake[0].x = canvas.width;
    } else if (snake[0].y === canvas.height) {
        snake[0].y = 0;
    } else if (snake[0].y === 0 - box) {
        snake[0].y = canvas.height;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(timer);
        }
    }
}


function eatApple() {
    if (snake[0].x === apple.x && snake[0].y === apple.y) {
        snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y});
        
        while (true) {
            let newAppleX = appleSetPlace.setX();
            let newAppleY = appleSetPlace.setY();

            for (let i = 0; i < snake.length; i++) {
                if (snake[i].x === newAppleX && snake[i].y === newAppleY) {
                    continue;
                } 
            }

            apple = {
                x: newAppleX,
                y: newAppleY
            }

            break
        }
    }
}


function changeScore() {
    score.innerText = snake.length - 3;
}