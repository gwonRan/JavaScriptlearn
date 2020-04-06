//SELECT CVS
const cvs = document.querySelector("#bird"),
ctx = cvs.getContext("2d");

//GAME VARS AND CONSTS
let frames = 0;

//LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "img/sprite.png";

//GAME STATE
const state =  {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2
}

//CONTROL THE GAME
cvs.addEventListener("click", function(evt){
    switch(state.current){
        case state.getReady : 
            state.current = state.game;
            break;
        case state.game :
            bird.flap();
            break;
        case state.over :
            state.current = state.getReady;
            break;
    }
});

//BACKGROUND
const bg = {
    sX : 0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    y : cvs.height - 226,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
}

//FOREGROUND
const fg = {
    sX : 276,
    sY : 0,
    w : 224,
    h : 112,
    x : 0,
    y : cvs.height - 112,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
}


//BIRD
const bird = {
    animation : [
        {sX: 276, sY: 112},
        {sX: 276, sY: 139},
        {sX: 276, sY: 164},
        {sX: 276, sY: 139}
    ], 
    x : 50,
    y : 150,
    w : 34,
    h :26,

    frame : 0,

    gravity : 0.25,
    jump: 4.6,
    speed : 0,


    draw : function(){
        let bird = this.animation[this.frame];
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, this.x - this.w/2, this.y-this.h/2, this.w, this.h);
    },

    flap : function(){
        this.speed = - this.jump; //마우스 클릭시 점점 높이 올라감.
    },

    update : function(){
        //IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
        this.period = state.current == state.getReady ? 10:5;
        //WE INCREMENT THE FRAME BY 1, EACH PERIOD
        this.frame += frames%this.period == 0 ? 1:0;
        //FRAME GOES FROM 0 TO 4, THEN AGAIN TO 0
        this.frame = this.frame%this.animation.length;

        if(state.current == state.getReady){
            this.y = 150; //RESET POSITION OF THE BIRD AFTER CAME OVER
        } else {
            this.speed += this.gravity;
            this.y += this.speed;

            if(this.y + this.h/2 >= cvs.height - fg.h){
                this.y = cvs.height - fg.h - this.h/2;
                if(state.current == state.game){
                    state.current = state.over;
                }
            }
        }
    }
}

//GAME OVER
const gameOver = {
    sX: 175,
    sY: 228,
    w: 225,
    h: 202,
    x: cvs.width/2 - 225/2,
    y: 90,

    draw : function() {
        if(state.current == state.over){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}

//GET READY MESSAGE
const getReady = {
    sX: 0,
    sY: 228,
    w: 173,
    h: 152,
    x: cvs.width/2 - 173/2,
    y: 80,

    draw : function() {
        if(state.current == state.getReady) {
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}


//DRAW
function draw(){
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    bg.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
}

//UPDATE
function update(){
    bird.update();
}

//LOOP
function loop(){
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
    //브라우저에게 수행하기 원하는 애니메이션을 알리고 다음 리페인트가 진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출한다.
}

loop();