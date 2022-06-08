

// game_over=false;
state=true;
startGame=true;
game_pause = true;
var ModalShow=false;

// defining the initial objects and state
function init(){
    f= setInterval(gameloop,125);
    
    var canvas = document.getElementById('mycanvas');
    W = canvas.height = 600;
    H = canvas.width = 600;
    pen = canvas.getContext('2d');
    cs = 40;
    game_over = false;
    // game_pause = false;
    score = 5;

    // create a Image Object for food
    food_img = new Image();
    food_img.src = "Assets/food.png";

    // create a new trophy
    trophy = new Image();
    trophy.src = "Assets/trophy.png";

    food = getRandomFood();

    snake = { // snake object
        initial_length : 2,
        color: "blue",
        cells : [],
        direction:"right", // default direction

        createSnake : function(){
            for(var i=this.initial_length;i>0;i--){
                this.cells.push({
                    x:i,
                    y:0
                });
            }
        }
            ,
        drawSnake: function(){
            pen.fillStyle="red";
            pen.fillRect(this.cells[0].x*cs,this.cells[0].y*cs,cs-2,cs-2);
            pen.fillStyle=this.color;
            for(var i=1;i<this.cells.length;i++){
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
            }
            
        },
        updateSnake : function(){

            // check if snake has eaten the food, increase the length by 1
            // also generate next food location            
            var oldHeadX=this.cells[0].x;
            console.log(oldHeadX);
            var oldHeadY=this.cells[0].y;

            var nextX,nextY;

            if(this.direction == "right"){
                nextX=oldHeadX + 1;
                nextY=oldHeadY;
            }else if(this.direction == "left"){
                nextX=oldHeadX - 1;
                nextY=oldHeadY;
            }else if(this.direction == "down"){ // down side is positive
                nextX=oldHeadX;
                nextY=oldHeadY + 1; 
            }else{
                nextX=oldHeadX;
                nextY=oldHeadY - 1;
            }

            if(checkMatchCoordinates(nextX,nextY)){
                game_over=true;
                ModalShow=true;
            }

            if(oldHeadX== food.x && oldHeadY == food.y){
                food = getRandomFood();
                while(true){
                    if(checkMatchCoordinates(food.x,food.y)){
                        food=getRandomFood();
                    }else{
                        break;
                    }
                }
                score++;
            }else{
                // only when food is not eaten
                this.cells.pop(); // basically we are removing the first cell and adding it to the last

            }
            
            
            this.cells.unshift({x:nextX,y:nextY}); // adding new cell at the begining

            // if snake goes out of window
            // then game is over

            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].x <= -1 || this.cells[0].y <= -1 || this.cells[0].x > last_x-1 || this.cells[0].y > last_y-1 ){
                game_over = true;
                ModalShow=true;
            }




        }


    }
    snake.createSnake();

    //Add a event listener on the document object
    function keyPressed(e){
        console.log(e.code);
        if(e.key == "ArrowLeft"){
            if(snake.direction != "right")
            snake.direction = "left";
        }else if(e.key == "ArrowRight"){
            if(snake.direction != "left")
            snake.direction = "right";
        }else if(e.key == "ArrowUp"){
            if(snake.direction != "down")
            snake.direction = "up";
        }else if(e.key == "ArrowDown"){
            if(snake.direction != "up")
            snake.direction = "down"; 
        }else if(e.code=="Space"){
            game_pause = game_pause ^ 1;
        }

    }
    if(state){
        document.addEventListener('keydown',keyPressed);
    }
    



}


function checkMatchCoordinates(x,y){
    for(var i=0;i<snake.cells.length;i++){    
        if(x == snake.cells[i].x && y == snake.cells[i].y){
            return true;
        }
    }    
    return false;
}

function draw(){

    // erase the prev scene cell which is at the beginning
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy,18,20,cs,cs);
    pen.fillStyle = "white";
    pen.font = "30px Roboto";
    pen.fillText(score,50,50);
} 

function update(){
     snake.updateSnake(); // during Inactivity of the user
}

function getRandomFood(){ // to get a random food co-ordinates
    var foodX= Math.round(Math.random()*(W-cs)/cs);
    var foodY= Math.round(Math.random()*(H-cs)/cs);

    var food = { // food object
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food; 
}

var play=false;



var playAgainButton = document.getElementById('playAgain');
        playAgainButton.addEventListener('click',function(){
            play=true;
            startGame=true;
            ModalShow=false;
            gameloop();
        })

function gameloop(){
    if(game_over){
        clearInterval(f);
        if(ModalShow){
            $('#myModal').modal('show');
            ModalShow=false;
        }
        
        
        if(play){
            startGame=true;
            // playAgainButton.setAttribute('data-dismiss','modal');
            console.log('Play buttom');
            play=false;
            state=false;
            game_over=false;
            game_pause=true;
            init();
            
        }
        

        
    }
    if(!game_pause || startGame){        
        startGame=false;
        draw();
        update();
    }

}
console.log("yaahoo");
init();
// var f= setInterval(gameloop,125);

// data-dismiss="modal"

