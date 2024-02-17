//board
let board;
let boardWidth = 360;
let boardheight = 610;
let context;

//bird
let birdImage;
let birdwidth=34;
let birdheight=24;
let birdx=boardWidth/8;
let birdy=boardheight/2;

//gift
let giftImage;
let giftwidth=34;
let giftheight=24;
let giftx=boardWidth;
let gifty=0;
let gift=[];

let bird={
    x:birdx,
    y:birdy,
    width:birdwidth,
    height:birdheight
}


//pipes
let pipesArray=[];
let pipeswidth=64;
let pipesheight=500;
let pipesx=boardWidth;
let pipesy=0;

let toppipesimage;
let bottompipesimage;


//physics
let moveleft=-2;
let moveUp=0;
let gravity=0.2;

let gameover=false

//score
let btn;
let score=0;
window.onload =function(){
    board=document.getElementById("board");
    board.width=boardWidth;
    board.height=boardheight;
    context=board.getContext("2d");//used to draw on the object (board)


    btn=document.getElementById("btn");
    // draw the bird
    birdImage= new Image();
    birdImage.src='./images/flappybird.png';
    birdImage.onload=function(){
        context.drawImage(birdImage,bird.x,bird.y,bird.width,bird.height)
    }

    toppipesimage=new Image();
    toppipesimage.src="/images/toppipe.png";

    giftImage=new Image();
    giftImage.src="/images/gift-box-game-asset-2d-icon-transparent-background-png.png";

    bottompipesimage=new Image();
    bottompipesimage.src="/images/bottompipe.png";

    requestAnimationFrame(Update)

        setInterval(generatepipe,1500);

        document.addEventListener("keydown",keyclick);
        document.addEventListener("touchend",keyclick)
}

let scoreincrase="";

function Update(){
    requestAnimationFrame(Update);
    if(gameover){
        return;
    }
    context.clearRect(0,0,boardWidth,boardheight);

    if(bird.y>boardheight){
        gameover=true;
    }
    //bird
    moveUp+=gravity;
    bird.y=Math.max(bird.y+moveUp,0)
    context.drawImage(birdImage,bird.x,bird.y,bird.width,bird.height);

    //pipes
    for(let i=0;i<pipesArray.length;i++){
        let pipe =pipesArray[i];
        pipe.x+=moveleft;
        context.drawImage(pipe.img,pipe.x,pipe.y,64,pipe.height)
        
        if(!pipe.passed && bird.x>pipe.x+pipeswidth){
            score+=0.5;
            pipe.passed=true
        }
        if(detecttoutch(bird,pipe)){
        gameover=true
        }

    while(pipesArray.length>0&&pipesArray[0].x<-pipeswidth){
        pipesArray.shift()
    }
    
}
        
    gift.forEach(()=>{
            let gif1=gift[0];
            gif1.x+=moveleft
            context.drawImage(gif1.img,gif1.x,gif1.y,50,50)
            if(detecttoutch(bird,gif1)){
            score+=20;
            scoreincrase="+20"
            gift.shift()
            }
    })
    
    //score
    context.fillStyle="white";
    context.font="45px sans-serif";
    context.fillText(score,5,45)

    if(gameover){
        context.fillText("Game over!",5,85)
    }
    if(scoreincrase=="+20"){
        context.fillText("+20",60,45)
        setTimeout(()=>{
            scoreincrase=0;
        },2000)
    }

    }
    

function generatepipe(){

    if(gameover){
        return;
    }
    let randompipey=pipesy-(pipesheight/4)-Math.random()*(pipesheight/2)
    let space=boardheight/4;

    let toppipe={
        img:toppipesimage,
        x:pipesx,
        y:randompipey,
        width:pipeswidth,
        height:pipesheight,
        passed:false
    }
    if(score===3){
        let gift2={
            img:giftImage,
            x:giftx,
            y:randompipey+pipesheight+20,
            width:giftwidth,
            height:giftheight,
            }
            gift.push(gift2); 
    }
    
        

    pipesArray.push(toppipe);

    let bottomppipe={
        img:bottompipesimage,
        x:pipesx,
        y:randompipey+pipesheight+space,
        width:pipeswidth,
        height:pipesheight,
        passed:false
    }

    pipesArray.push(bottomppipe);
}

function keyclick(){
    moveUp=-4
    //reset
    if(gameover){
        pipesArray=[];
        gift=[];
        bird.y=birdy;
        score=0;
        gameover=false
    }
}


// detect touch
function detecttoutch(a,b){
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
