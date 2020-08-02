var monkey,monkeyImage,stone,stoneImage,banana,bananaImage,foodGroup,stoneGrouup,jungle,jungleImage,gameState,ground,groundImage,
gameOver,gameOverImage,restart,restartImage,score ,iground ;



function preload(){
 monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png") ;
 stoneImage=loadImage("stone.png");
 bananaImage=loadImage("banana.png");
 //groundImage=loadImage("ground.jpg");
jungleImage=loadImage("jungle.jpg");
gameOverImage=loadImage("gameOver.png");
restartImage=loadImage("restart.png");

}


function setup() {
createCanvas(600,300);
gamestate="play";
monkey=createSprite(50,270,20,20);
monkey.addAnimation("running",monkeyImage);
monkey.scale=0.3;
ground=createSprite(50,280,20,20);
ground.addImage("moving",groundImage);
ground.scale=0.3;
jungle=createSprite(0,0,400,400);
jungle.addImage("moving",jungleImage);
stoneGroup=createGroup();
foodGroup=createGroup();
monkey.setCollider("rectangle",0,0,40,200);
score=0;
iground=createSprite(50,285,20,20);
iground.visible=false;
restart=createSprite(300,160);
restart.addImage(restartImage);
restart.scale=0.2;
restart.visible=false;
gameOver=createSprite(300,150);
gameOver.addImage(gameOverImage);
gameOver.scale=0.2;
gameOver.visisble=false;
}


function draw(){
 background(255); 
if (gamestate==="play")
{
  ground.velocityX=-6
  if(ground.x<0)
  {
    ground.x=ground.Width/2;
  }
if(keyDown("space"&&monkey.y>240))
{
  monkey.velocityY=-10;
}
monkey.velocityY=monkey.velocityY+0.9;
jungle.velocityX=-3;
if(jungle.x<0)
{
  jungle.x=jungle.Width/2;
}
Text("score "+score,540,40,textSize(20),fill("red"))
switch(score)
{
  case 10:  monkey.scale=0.3;
            break;
  case 20:  monkey.scale=0.4;
            break;
  case 30:  monkey.scale=0.5;
            break; 

default:    break;
}
spawnStones();
spawnbananas();
destroybananas();
}

monkey.collide(iground);
if(stoneGroup.isTouching(monkey))
{
  monkey.scale=0.3;
}
if(stoneGroup.isTouching(monkey)&&monkey.scale===0.3)
{
  gameState="gameOver"
 
  stone.velocityX=0;
  banana.velocityX=0;
  jungle.velocityX=0;
  
}
if(gameState==="gameOver")
{
  score=0;
  restart.visible=true;
  gameOver.visible=true;
}
if(gameState==="gameOver"&& mousePressedOver(restart))
{
  score=0;
  restart.visible=false;
  gameOver.visible=false;
  gameState="play";
}


drawSprites();
}

function spawnStones()
{
  if(World.frameCount%65===0)
  {

  stone=createSprite(400,280,20,20);
  stone.addImage(stoneImage);
  stone.scale=0.2;
  stone.velocityX=-6;
  stoneGroup.add(stone)
  }
}

  function spawnbananas()
{
if(World.frameCount%75===0)
{
  rand=random(200,260)
  bananas=createSprite(400,rand,20,20);
  bananas.addImage(bananaImage);
  bananas.scale=0.2;
  bananas.velocityX=-6;
  foodGroup.add(bananas);

}
} 

function destroybananas()
{
  if(foodGroup.isTouching(monkey))
  {
    foodGroup.destroyEach();
    score=score+2;
  }
}
