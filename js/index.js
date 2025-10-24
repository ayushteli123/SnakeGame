// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

let food = { x: 6, y: 7 };

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snakeArr[0].x && snake[i].y === snakeArr[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);

// Keyboard controls: Arrow keys & Numeric keys from a physical keyboard
window.addEventListener('keydown', e => {
    // Start the game on first key press
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
        case "2":
            console.log(e.key + " pressed - Up");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
        case "8":
            console.log(e.key + " pressed - Down");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
        case "4":
            console.log(e.key + " pressed - Left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
        case "6":
            console.log(e.key + " pressed - Right");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});

// On-screen numeric keypad controls (for the Nokia phone screen)
const numButtons = document.querySelectorAll('.num-pad .button');
numButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Start the game on first click
        inputDir = { x: 0, y: 1 };
        moveSound.play();
        switch (button.textContent) {
            case "2":
                console.log("Button 2 pressed - Up");
                inputDir.x = 0;
                inputDir.y = -1;
                break;
            case "8":
                console.log("Button 8 pressed - Down");
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            case "4":
                console.log("Button 4 pressed - Left");
                inputDir.x = -1;
                inputDir.y = 0;
                break;
            case "6":
                console.log("Button 6 pressed - Right");
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            default:
                // For other buttons, do nothing or add additional functionality if needed
                break;
        }
    });
});
