function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cellSize = 50;
	game_over = false;
	score = 0;

	food_img = new Image();
	food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood();

	snake = {
		initialLength:1,
		color:"blue",
		cells:[],
		direction:"right",

		createSnake:function(){
			for(var i=this.initialLength;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake:function(){

			for(var i=0;i<this.cells.length;i++){
				pen.fillStyle = this.color;
				pen.fillRect(this.cells[i].x*cellSize,this.cells[i].y*cellSize,cellSize-3,cellSize-3);
			}
		},

		updateSnake:function(){
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;
			}
			else
			{
				this.cells.pop();
			}
			var nextX,nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY});
			var last_x = Math.round(W/cellSize);
			var last_y = Math.round(H/cellSize);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
			}

		}

	};

	snake.createSnake();
	function keyPressed(e){
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
		console.log(snake.direction);
	}
	document.addEventListener('keydown',keyPressed) ;
}
function draw(){

	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.drawImage(food_img,food.x*cellSize,food.y*cellSize,cellSize,cellSize);

	pen.drawImage(trophy,18,20,cellSize,cellSize);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);
}

function update(){
	snake.updateSnake(); 
}

function getRandomFood(){
	var foodX = Math.round(Math.random()*(W-cellSize)/cellSize);
	var foodY = Math.round(Math.random()*(H-cellSize)/cellSize);
	var food = {
		x:foodX,
		y:foodY,
	}
	return food
}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
		return;
	}
	draw();
	update();
}

init();

var f = setInterval(gameloop,100);