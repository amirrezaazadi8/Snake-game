// ------use canvas and context
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//  -------create a unit
const box = 32;

// ----------load images
const ground = new Image();
ground.src = "./access/img/ground.png";
const foodImage = new Image();
foodImage.src = "./access/img/food.png";

// ----- audios 
const dead = new Audio("./access/audio/dead.mp3");
const eat = new Audio("./access/audio/eat.mp3");
const left = new Audio("./access/audio/left.mp3");
const up = new Audio("./access/audio/up.mp3");
const right = new Audio("./access/audio/right.mp3");
const down = new Audio("./access/audio/down.mp3");

// ----- snake array and positions
let snake = [];

//  -----  snake start position
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// ----- food position
let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// ----- score
let score = 0;

// ----- directions
let d;

// ----- add event listener for snake control
document.addEventListener("keydown", direction);
function direction(e) {
    switch (e.keyCode) {
        case 37:
            if (d != "RIGHT") d = "LEFT";
            left.play()
            break;
        case 38:
            if (d != "DOWN") d = "UP";
            up.play()
            break;
        case 39:
            if (d != "LEFT") d = "RIGHT";
            right.play()
            break;
        case 40:
            if (d != "UP") d = "DOWN";
            down.play()
            break;
    }
}

// ----- create collision function 
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true
        } else {
            return false
        }
    }
}

// ----- create a function  on to repeat drawing
function draw() {
    // -----  ground drawing
    context.drawImage(ground, 0, 0, 608, 608);
    // ----- food drawing
    context.drawImage(foodImage, food.x, food.y);
    // ----- snake drawing
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? "blue" : "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = "red";
        context.strokeRect(snake[i].x, snake[i].y, box, box)

    }
    // ----- create number
    context.fillStyle = "white";
    context.font = "45px changa one";
    context.fillText(score, 2 * box, 1.6 * box);

    // ----- first head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // ----- which direction
    switch (d) {
        case "LEFT":
            snakeX -= box;
            break;
        case "UP":
            snakeY -= box;
            break;
        case "RIGHT":
            snakeX += box;
            break;
        case "DOWN":
            snakeY += box;
            break;
    }

    // ---- eat food
    if (snakeX == food.x && snakeY == food.y) {
        // ----- add one to score
        score++;
        // ----- create new position for food 
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
        // ----- plat audio
        eat.play()
    } else {
        // ----- remove the tail
        snake.pop()
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    // ----- add new head
    snake.unshift(newHead);

    // ----- game over
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box) {
        clearInterval(game);
        dead.play();
    } else if (snake.length > 1) {
        for (let i = 1; i < snake.length; i++) {
            if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
                clearInterval(game);
                dead.play();
            }
        }
    }
}

let game = setInterval(draw, 130);
