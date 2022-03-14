const CELL_SIZE = 20;
const CELL_HEAD= 40;
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

let MOVE_INTERVAL = 120;

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
    life: 3,
    level: 1,
    multiple: 0,
    }
}

let snake1 = initSnake("green");


let apple1 = {
    color: "red",
    position: initPosition(),
}

let apple2 = {
    color: "blue",
    position: initPosition(),
}

let obstacle = {
    color: "black",
    position : {
        x: 10,
        y: 5,
    }
}

let life = {
    color: "purple",
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

function drawSpeed()
{
    let speedCanvas;
    speedCanvas = document.getElementById("speedBoard");

    let speedCtx = speedCanvas.getContext("2d");

    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "30px Arial";
    speedCtx.fillText(MOVE_INTERVAL, 10, speedCanvas.scrollHeight / 2);
}

function drawLife(snake)
{
    let speedCanvas;
    speedCanvas = document.getElementById("lifeBoard");

    let speedCtx = speedCanvas.getContext("2d");

    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "30px Arial";
    speedCtx.fillText(snake.life, 10, speedCanvas.scrollHeight / 2);
}

function drawLevel(snake)
{
    let levelCanvas;
    levelCanvas = document.getElementById("levelBoard");

    let levelCtx = levelCanvas.getContext("2d");

    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.font = "30px Arial";
    levelCtx.fillText(snake.level, 10, levelCanvas.scrollHeight / 2);
}


function draw() {
    setInterval(function() {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        //drawCell(ctx, snake1.head.x, snake1.head.y, snake1.color);

        for (let i = 1; i < snake1.body.length; i++)
        {
            drawCell(ctx, snake1.body[i].x, snake1.body[i].y, snake1.color);
        }


        function level_2_obs()
        {
            drawCell(ctx, obstacle.position.x, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 1, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 2, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 3, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 4, obstacle.position.y, obstacle.color);
        }

        function level_3_obs()
        {
            drawCell(ctx, obstacle.position.x, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 1, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 2, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 3, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 4, obstacle.position.y, obstacle.color);

            drawCell(ctx, obstacle.position.x, obstacle.position.y + 10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 1, obstacle.position.y+10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 2, obstacle.position.y+10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 3, obstacle.position.y+10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 4, obstacle.position.y+10, obstacle.color);
        }

        function level_4_obs()
        {
            drawCell(ctx, obstacle.position.x, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 1, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 2, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 3, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 4, obstacle.position.y, obstacle.color);

            drawCell(ctx, obstacle.position.x, obstacle.position.y + 10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 1, obstacle.position.y+10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 2, obstacle.position.y+10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 3, obstacle.position.y+10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 4, obstacle.position.y+10, obstacle.color);
        }

        function level_5_obs()
        {
            drawCell(ctx, obstacle.position.x, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 1, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 2, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 3, obstacle.position.y, obstacle.color);
            drawCell(ctx, obstacle.position.x + 4, obstacle.position.y, obstacle.color);

            drawCell(ctx, obstacle.position.x, obstacle.position.y + 10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 1, obstacle.position.y+10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 2, obstacle.position.y+10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 3, obstacle.position.y+10, obstacle.color);
            drawCell(ctx, obstacle.position.x + 4, obstacle.position.y+10, obstacle.color);

            drawCell(ctx, obstacle.position.x, obstacle.position.y + 20, obstacle.color);
            drawCell(ctx, obstacle.position.x + 1, obstacle.position.y+20, obstacle.color);
            drawCell(ctx, obstacle.position.x + 2, obstacle.position.y+20, obstacle.color);
            drawCell(ctx, obstacle.position.x + 3, obstacle.position.y+20, obstacle.color);
            drawCell(ctx, obstacle.position.x + 4, obstacle.position.y+20, obstacle.color);

            drawCell(ctx, obstacle.position.x, obstacle.position.y + 15, obstacle.color);
            drawCell(ctx, obstacle.position.x + 1, obstacle.position.y+15, obstacle.color);
            drawCell(ctx, obstacle.position.x + 2, obstacle.position.y+15, obstacle.color);
            drawCell(ctx, obstacle.position.x + 3, obstacle.position.y+15, obstacle.color);
            drawCell(ctx, obstacle.position.x + 4, obstacle.position.y+15, obstacle.color);
        }


        if (snake1.level == 2)
        {
            level_2_obs();
        }

        if(snake1.level == 3)
        {
            level_3_obs();
        }

        if(snake1.level == 4)
        {
            level_4_obs();
        }

        if(snake1.level == 5)
        {
            level_5_obs();
        }

        let img = document.getElementById("apple");
        ctx.drawImage(img, apple1.position.x * CELL_SIZE, apple1.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        ctx.drawImage(img, apple2.position.x * CELL_SIZE, apple2.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        let lifeImg = document.getElementById("life");
        ctx.drawImage(lifeImg, life.position.x * CELL_SIZE, life.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        let snakeimg = document.getElementById("snake-head");
        ctx.drawImage(snakeimg, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_HEAD, CELL_HEAD);


        drawScore(snake1);
        drawLife(snake1);
        drawLevel(snake1);
        drawSpeed();
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

function level(snake)
{
    let levelUpAudio = new Audio("assets/audio/level up.wav");
    if (snake.level == 1 && snake.score == 5)
    {
        snake.level++;
        alert("Level 1 Complete");
        levelUpAudio.play();
        MOVE_INTERVAL -= 20;
    }
    
    if (snake.level == 2 && snake.score == 10)
    {
        snake.level++;
        alert("Level 2 Complete");
        levelUpAudio.play();
        MOVE_INTERVAL -= 20;
    }
    
    if (snake.level == 3 && snake.score == 15)
    {
        snake.level++;
        alert("Level Up");
        levelUpAudio.play();
        MOVE_INTERVAL -= 20;
    }

    if (snake.level == 4 && snake.score == 20)
    {
        snake.level++;
        alert("Level Up");
        levelUpAudio.play();
        MOVE_INTERVAL -= 20;
    }

    if (snake.level == 5 && snake.score == 25)
    {
        alert("All Level Complete");
        initGame();
        snake1 = initSnake('Green');
    }
}

function eat(snake, apple1, apple2, life, obstacle) {
    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
        apple1.position = initPosition();
        snake.score++
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
    if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
  
    if (snake.head.x == life.position.x && snake.head.y == life.position.y) {
        life.position = initPosition();
        snake.score++;
        snake.life++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }

    if (snake.head.x == obstacle.position.x && snake.head.y == obstacle.position.y) {
        snake.life--;
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1, apple2, life, obstacle);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1, apple2, life, obstacle);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1, apple2, life, obstacle);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple1, apple2, life, obstacle);
}

function checkCollision(snake) {
    let isCollide = false;
    //this
    for (let i = 0; i < snake.length; i++) {
        for (let j = 0; j < snake.length; j++) {
            for (let k = 1; k < snake[j].body.length; k++) {
                if (snake[i].head.x == snake[j].body[k].x && snake[i].head.y == snake[j].body[k].y) {
                    isCollide = true;
                }
            }
        }

    }
    if (isCollide) {
        gameOver();
    }
    return isCollide;
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
    if (!checkCollision([snake1])) {
        setTimeout(function() {
            move(snake);
            level(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }

    if (snake1.life <= 0)
    {
        gameOver();
    }
}

function gameOver()
{
    let gameOverAudio = new Audio("assets/audio/game over.wav");
    alert("Game over");
    gameOverAudio.play();
    initGame();
    snake1 = initSnake("green");
}
function moveBody(snake)
{
    snake.body.unshift({x: snake.head.x, y: snake.head.y});
    snake.body.pop();
}

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