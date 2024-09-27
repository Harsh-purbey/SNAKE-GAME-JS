// GAME CONSTANTS & VARIABLE
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{
    x: 13, y: 15
}];
let food = { x: 7, y: 8 };
let board = document.getElementById('board');
let score = 0;
let highScore = JSON.parse(localStorage.getItem('hiscore'));
if(highScore === null){
    localStorage.setItem('hiscore',JSON.stringify(0));
}
document.getElementById('score').innerHTML=`<h1> SCORE ${score}</h1>`;


// GAME FUNCTION
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    // IF SNAKE COLLIDE WITH SNAKE BODY
    for(let i =1 ; i<sarr.length ; i++){
        if(sarr[0].x === sarr[i].x && sarr[0].y=== sarr[i].y){
            return true;
        }
    }
    // IF SNAKE COLLIDE WITH WALL
    if(snakeArr[0].x <=0 || snakeArr[0].x >=18 || snakeArr[0].y <=0 || snakeArr[0].y >=18){
        return true;
    }
    return false;
}

function gameEngine() {

    // CHEEK WHAT WE DO AFTER COLLIDE OF SNAKE
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("GAME OVER PRESS ANY KEY TO PLAY AGAIN !");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
        location.reload()
    }

    // IF SNAKE EAT THE FOOD INCREMENT THE SCORE AND REGENRATE THE FOOD
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        a = 2;
        b = 16;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }
        score++;
        document.getElementById('score').innerHTML=`<h1> SCORE ${score}</h1>`;

    }

    //MOVING THE SNAKE 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // DISPALY THE SNAKE 1ST
    board.innerHTML = '';
    snakeArr.forEach((e, index) => {
        snakeElment = document.createElement('div');
        snakeElment.style.gridRowStart = e.y;
        snakeElment.style.gridColumnStart = e.x;
        snakeElment.classList.add('snake');
        snakeElment.innerHTML='<i class="bi bi-emoji-heart-eyes"></i>'
        if (index === 0) {
            snakeElment.classList.add('head');
            snakeElment.innerHTML= '<i class="bi bi-emoji-heart-eyes-fill"></i>'
        }
        board.appendChild(snakeElment)
    })

    //DISPLAY THE FOOD 2ND
    foodElment = document.createElement('div');
    foodElment.style.gridRowStart = food.y;
    foodElment.style.gridColumnStart = food.x;
    foodElment.classList.add('food');
    foodElment.innerHTML ='<i class="bi bi-apple"></i>'
    board.appendChild(foodElment);

}

// GAME MAIN LOGIC FOR REPAINT SCREEN AGAIN & AGAIN
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 } // Start the game
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp': {
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        }
        case 'ArrowDown': {
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        }
        case 'ArrowLeft': {
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = -0;
            break;
        }
        case 'ArrowRight': {
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = -0;
            break;
        }

    }
})