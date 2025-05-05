document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const snakeElement = document.getElementById('snake');
    const snakebody = document.getElementById('snakebody');
    const snakeParts = Array.from(snakebody.children);
    const snakehead = snakeParts[0];
    const foodElement = document.getElementById('food');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('startButton');

    //Game variables
    const snakeSize = 20;
    const foodsize = 20;
    let snakeX = 421;
    let snakeY = 298;
    let snakeSpeed = 1;
    let foodX;
    let foodY;
    let direction = 'left'
    let score;
    let gameInterval;
    let gamerunning = true;
    //change direction of snake
    document.addEventListener('keydown',(event)=>{
        switch (event.key) {
            case "ArrowUp":
                if(direction === "down") return;
                snakeElement.style.transform = "rotate(0deg)";
                direction = "up";
                break;
            case "ArrowDown":
                if(direction === "up") return;
                snakeElement.style.transform = "rotate(180deg)";
                direction = "down";
                break;
            case "ArrowLeft":
                if(direction === "right") return;
                snakeElement.style.transform = "rotate(270deg)";
                direction = "left";
                break;
            case "ArrowRight":
                if(direction === "left") return;
                snakeElement.style.transform = "rotate(90deg)";
                direction = "right";
                break;
        }

    })
    const createFood = ()=>{
        position = {
            x: Math.floor(Math.random() * gameContainer.offsetWidth - foodsize),
            y: Math.floor(Math.random() * gameContainer.offsetHeight - foodsize)
        }
        foodElement.style.left = position.x + 'px';
        foodElement.style.top = position.y + 'px';
        foodElement.style.width = foodsize + 'px';
        foodElement.style.height = foodsize + 'px';
        foodX = position.x;
        foodY = position.y;
    }
    //check for any collesions
    const checkCollision = () => {
        // Proper bounding box collision detection
        if (snakeX < foodX + snakeSize &&
            snakeX + snakeSize > foodX &&
            snakeY < foodY + snakeSize &&
            snakeY + snakeSize > foodY) {
            score++;
            scoreElement.textContent = score;
            createFood();
        }
    };
    // move snake
    const moveSnake = (direction)=>{
        checkCollision();
        if(snakeX < 10 || snakeX > gameContainer.offsetWidth - 27 || snakeY < 0 || snakeY > gameContainer.offsetHeight - 43){
            clearInterval(gameInterval);
            alert('Game Over');
            gamerunning = false;
        }
        if(direction === "up"){
            snakeY -= snakeSpeed;
            snakeElement.style.top = snakeY +'px';
            
        }
        if(direction === "down"){
            snakeY += snakeSpeed;
            snakeElement.style.top = snakeY +'px';
        }
        if(direction === "left"){
            snakeX -= snakeSpeed;
            snakeElement.style.left = snakeX +'px';
        }
        if(direction === "right"){
            snakeX += snakeSpeed;
            snakeElement.style.left = snakeX +'px';
        }
    }
    const init =()=>{
        // reseting score
        score = 0;
        document.getElementById('score').textContent = score;
        //starting game
        gamerunning = true;
        direction = "up";
        snakeElement.style.transform = "rotate(0deg)";
        snakeX = 421;
        snakeY = 298;
        //snake
        snakeElement.style.left = snakeX + 'px';
        snakeElement.style.top = snakeY + 'px';
        //food
        createFood();
        score = 0;
    }
    init();
    document.getElementById('startButton').addEventListener('click', init);
    setInterval(()=>{
        if(gamerunning){
            moveSnake(direction)
        }
    }, 5);
})