var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = 30;
var dx = 0;
var dy = 5;
var difficulty = 0.97;
var pooplist = []
var poopnum = 0;
var ballRadius = 10;
var paddleHeight = 40;
var paddleWidth = 30;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var poop_img = document.getElementById("img/poop.png");
var poop_pat = ctx.createPattern(poop_img, "no-repeat");

/*var poop = new Image();
poop.src = "img/poop.png";

var human = new Image();
human.src = "img/human.png";*/


function drawpoop(list) {
    for (var i = 0; i < list.length; i++) {
        ctx.beginPath();
        ctx.arc(list[i].x, list[i].y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = poop_pat;
        ctx.fill();
        ctx.closePath();
    }

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function Poop(name) {
    this.index = name;
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = 10;

    this.move = function () {
        this.x += dx;
        this.y += dy;

    }
}

function draw() {
    // ctx 깨끗
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //똥 생성
    if (difficulty < Math.random()) {
        for (var i = 0; i < Math.floor(Math.random() * 2); i++) {
            var newpoop = new Poop(poopnum);
            pooplist.push(newpoop);
            poopnum++;
        }
    }
    difficulty -= 0.00001


    // 물체 그리기
    drawpoop(pooplist);
    drawPaddle();


    // 위치 갱신
    for (var i = 0; i < pooplist.length; i++) {
        pooplist[i].move()
        if (pooplist[i].y > canvas.height) {
            pooplist.shift();
        }
    }
    // 충돌분석
    for (var i = 0; i < pooplist.length; i++) {
        if (pooplist[i].y > canvas.height - paddleHeight) {
            if (paddleX < pooplist[i].x + ballRadius && pooplist[i].x - ballRadius < paddleX + paddleWidth) {
                difficulty = 0.97;
                document.location.reload();
            }
        }

    }

    x += dx;
    y += dy;
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    // 위치 갱신 끝
}
//키보드 정의
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

//코드 실행부
setInterval(draw, 10);
