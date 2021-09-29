const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
const maxScoreBoard = document.getElementById('high-score')
const message=document.getElementById('myModal')
const tmessage=document.getElementById('message')
let squares = [];
let currentSnake = [2,1,0];
let direction = 1;
const width = 40;
const length=25;
let appleIndex = 0;
let score=0;
let intervalTime=100;
let speed=0.9;
let timerId = 0;
let bonuspoint=0;
let myVar=0;
let maxScore=0;

function createGrid() {
    //create length* width of these elements with a for loop
    for (let i=0; i < length*width; i++) {
     //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}
createGrid()

currentSnake.forEach(function(index)
    {
        if(index%2==0)
            squares[index].classList.add('snake-red')
        else
            squares[index].classList.add('snake-yellow')
    }
    )

function startGame() {
    //remove the snake
    startButton.textContent="Restart 🐍";
    currentSnake.forEach(function(index)
    {
            squares[index].classList.remove('snake-red')
            squares[index].classList.remove('snake-yellow')
    }
    )
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    squares[bonuspoint].classList.remove('bonusapple')
    clearInterval(timerId)
    clearTimeout(myVar);
    currentSnake = [2,1,0]
    score = 0
    //re add new score to browser
    scoreDisplay.textContent=score;
    direction = 1
    intervalTime = 100
    generateApple()
    //read the class of snake to our new currentSnake
    currentSnake.forEach(function(index)
    {
        if(index%2==0)
            squares[index].classList.add('snake-red')
        else
            squares[index].classList.add('snake-yellow')
    }
    )
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= length*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake-red')||// if snake eat itself
        squares[currentSnake[0] + direction].classList.contains('snake-yellow')
    ){
        tmessage.textContent=score;
        message.style.display='block';
        message.classList.add("modal-content")
        let myVar1 = setTimeout(function(){
            message.style.display='none'; 
            message.classList.remove("modal-content")
        }, 3000);
        return clearInterval(timerId)&& clearTimeout(myVar);
    }
    
    
    
    
    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake-red')
    squares[tail].classList.remove('snake-yellow')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it
    if(squares[currentSnake[1]].classList.contains('snake-red'))
        squares[currentSnake[0]].classList.add('snake-yellow')
    else
        squares[currentSnake[0]].classList.add('snake-red')
     
    

     
    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        if(squares[currentSnake.length-1].classList.contains('snake-red'))
            squares[tail].classList.add('snake-yellow')
        else
            squares[tail].classList.add('snake-red')
        //grow our snake array
        currentSnake.push(tail)
        //generate new apple
        generateApple()
        //add one to the score
        score++;
        //display our score
        scoreDisplay.textContent=score;
        //speed up our snake
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
        
        //Bonus Point
        if(currentSnake.length%3===0){
            generateBonusApple()
        }  
    }
    
    if (squares[currentSnake[0]].classList.contains('bonusapple'))
        {
            clearTimeout(myVar);
            squares[currentSnake[0]].classList.remove('bonusapple')
            score+=2;
            scoreDisplay.textContent=score;
        }
    if(score>maxScore){
        maxScore=score;
        maxScoreBoard.textContent=maxScore;
    }
}

function generateBonusApple() {
    do{
        bonuspoint = Math.floor(Math.random() * squares.length)
    } while (squares[bonuspoint].classList.contains('snake-red')||
        squares[bonuspoint].classList.contains('snake-yellow')||
        squares[bonuspoint].classList.contains('apple'))
    squares[bonuspoint].classList.add('bonusapple')
    myVar = setTimeout(function(){ 
            squares[bonuspoint].classList.remove('bonusapple')
        }, 8000);
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake-red')
        ||squares[appleIndex].classList.contains('snake-yellow')||
        squares[appleIndex].classList.contains('bonusapple'))
    squares[appleIndex].classList.add('apple')
} 


// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow
// 68 is for the
// 68 is for the
// 68 is for the
// 68 is for the
function control(e) {
    if((e.keyCode === 39||e.keyCode===68)&&(direction===-1)){
        direction = -1
    } else if((e.keyCode === 38||e.keyCode===87)&&(direction===width)){
        direction = +width
    } else if((e.keyCode === 37||e.keyCode===65)&&(direction===1)){
        direction = 1
    } else if((e.keyCode === 40||e.keyCode===83)&&(direction===-width)){
        direction = -width 
    } else if (e.keyCode === 39||e.keyCode===68) {
        direction = 1
    } else if (e.keyCode === 38||e.keyCode===87) {
        direction = -width
    } else if (e.keyCode === 37||e.keyCode===65) {
        direction = -1
    } else if (e.keyCode === 40||e.keyCode===83) {
        direction = +width
    }
}
document.addEventListener('keyup', control)