const CELL_SIZE = 20;
const CELL_HEAD = 40;
const CANVAS_SIZE = 500;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
//this
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}

const MOVE_INTERVAL = 120;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody()
{
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];

    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color)
{
    return {
    color: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    }
}

let snake1 = initSnake("purple");


let apple1 = {
    color: "red",
    position: initPosition(),
}
// Soal no 4: add apple2
let apple2 = {
    color: "blue",
    position: initPosition(),
}

let life = {
    color: "green",
    position: initPosition(),
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);

        for (let i = 1; i < snake1.body.length; i++)
        {
            drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
        }

        //drawCell(ctx, snake1.position.x, snake1.position.y, snake1.color);

        let img = document.getElementById("apple");
        ctx.drawImage(img, apple1.position.x * CELL_SIZE, apple1.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.drawImage(img, apple2.position.x * CELL_SIZE, apple2.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        let lifeImg = document.getElementById("life");
        ctx.drawImage(lifeImg, life.position.x * CELL_SIZE, life.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        // let snakeimg = document.getElementById("snake-head");
        // ctx.drawImage(snakeimg, snake1.position.x * CELL_SIZE, snake1.position.y * CELL_SIZE, CELL_HEAD, CELL_HEAD);


        drawScore(snake1);
    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple1, apple2) {
    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
        apple1.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
    if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple1, apple2);
}



function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    setTimeout(function() {
        move(snake);
    }, MOVE_INTERVAL);
}

function moveBody(snake)
{
    snake.body.unshift({x: snake.head.x, y: snake.head.y});
    snake.body.pop();
}

// function turn(snake, direction)
// {
//     const oppositeDirections = {
//         [DIRECTION.LEFT]: DIRECTION.LEFT,
//         [DIRECTION.RIGHT]: DIRECTION.RIGHT,
//         [DIRECTION.UP]: DIRECTION.UP,
//         [DIRECTION.DOWN]: DIRECTION.DOWN,
//     }

//     if (direction !== oppositeDirections[snake.direction])
//     {
//         snake.direction = direction;
//     }
// }

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        snake1.direction = DIRECTION.LEFT;
    } else if (event.key === "ArrowRight") {
        snake1.direction = DIRECTION.RIGHT;
    } else if (event.key === "ArrowUp") {
        snake1.direction = DIRECTION.UP;
    } else if (event.key === "ArrowDown") {
        snake1.direction = DIRECTION.DOWN;
    }

})

function initGame()
{
    move(snake1);
}

initGame();

