//declaring all the variables
var monkey,monkeyImage,stone,stoneImage,banana,bananaImage,foodGroup,stoneGroup,jungle,jungleImage,gameState,ground,groundImage,
gameOver,gameOverImage,restart,restartImage,score ,iground ;


//calling the function for loading the images
function preload()
{
  //loading the animation for monkey
  monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png") ;
  
  //loading the image for the stone
  stoneImage=loadImage("stone.png");
 
  //loading the image for banana
  bananaImage=loadImage("Bananas.png");
  
  //loading the image for ground
  groundImage=loadImage("ground.jpg");

  //loading the image for the jungle
  jungleImage=loadImage("jungle2.jpg");

  //loading the image for gameOver
  gameOverImage=loadImage("gameOver.png");

  //loading the image for restart
  restartImage=loadImage("restart.png");

}


function setup() {
  //creating the canvas
  createCanvas(600,300);
  ground.x=ground.width/2;
  //assingnging a value to the gameState
  gamestate="play";
  
  //creating the monkey sprite
  monkey=createSprite(50,270,20,20);

  //adding the animation for monkeyu
  monkey.addAnimation("running",monkeyImage);

  //scaling the monkwey
  monkey.scale=0.3;

  //creating the ground sprite
  ground=createSprite(50,280,20,20);

  //adding the image for ground
  ground.addImage(groundImage);

  //scaling the ground
  ground.scale=0.3;

  //creating the jungle sprite
  jungle=createSprite(0,0,400,400);

  //adding the image for jungle
  jungle.addImage("moving",jungleImage);

  //creating the stone group
  stoneGroup=createGroup();
  
  //creating the food group
  foodGroup=createGroup();
  
  //setting the collider radius for the monkey
  monkey.setCollider("rectangle",0,0,40,200);
  
  //assigning the value to the score
  score=0;
  
  //creating a sprite for the invisible ground
  iground=createSprite(50,285,20,20);
  
  //making it invisible
  iground.visible=false;
  
  //creating a sprite for restart
  restart=createSprite(300,160);
  
  //adding the restart image
  restart.addImage(restartImage);
  
  //scaling the restart sprite
  restart.scale=0.2;
 
  //making it invisible
  restart.visible=false;
 
  //creating the gameOver sprite
  gameOver=createSprite(300,150);
  
  //adding the image for gameOver sprite
  gameOver.addImage(gameOverImage);
  
  //scaling the gameOver sprite
  gameOver.scale=0.2;
 
  //making it invisible
  gameOver.visisble=false;
}


function draw(){
 
 
 
  //setting the background color
  background(255); 
  
  //giving the ground a velocity
  if (gamestate==="play")
  {
  ground.velocityX=-6
 
  //resetting the ground
  if(ground.x<0)
  {
    ground.x=ground.Width/2;
  }
  
  //controls for the monkey to jump when space is pressed
  if(keyDown("space")&&monkey.y>280)
  {
  monkey.velocityY=-10;
  }

  //adding gravity so that the monkey would come down after jumping
  monkey.velocityY=monkey.velocityY+0.9;

  //giving the jungle a velocity
  jungle.velocityX=-3;

  //resetting the jungle
  if(jungle.x<0)
  {
  jungle.x=jungle.Width/2;
  }

  

  //increasing the size of the monkey at different values of the score
  switch(score)
{
  case 10:  monkey.scale=0.4;
            break;
  case 20:  monkey.scale=0.6;
            break;
  case 30:  monkey.scale=0.8;
            break; 

  default:    break;
  }

  //calling the function for spawning the stones
  spawnStones();
  
  //calling the function for spawning the bananas
  spawnbananas();
  
  //calling the function for destroying the bananas when eaten by the monkey
  destroybananas();
  }

  //colling the monkey with the invisible ground
  monkey.collide(iground);
  
  //resetting the monkeySize if it is touching the stone
  if(stoneGroup.isTouching(monkey))
  {
    monkey.scale=0.3;
  }
  
  //changing the gamestate to gameOver if the stone group is touching monkey and monkey size is 0.3
  if(stoneGroup.isTouching(monkey)&&monkey.scale===0.3)
  {
    gameState="Over"
  stoneGroup.setVelocityX=0;
  foodGroup.setVelocityX=0;
  jungle.velocityX=0;
    
  }
  
  //displaying gameover and restart sprites when gameState is gameOver
  if(gameState==="Over")
  {
    score=0;
    restart.visible=true;
    gameOver.visible=true;
  }
  
  //restarting the game
  if(gameState==="Over"&& mousePressedOver(restart))
  {
    
    restart.visible=false;
    gameOver.visible=false;
    gameState="play";
  }

  //drawing the sprites
  drawSprites();
  //displaying the score
  Text("score "+score,540,40,textSize(20),fill("red"))
}

  //function for spawning the stones after a specific interval of time
  function spawnStones()
  {
    if(World.frameCount%65===0)
    {

    stone=createSprite(400,280,20,20);
    stone.addImage(stoneImage);
    stone.scale=0.2;
    stone.velocityX=-6;
    stoneGroup.add(stone)
    stoneGroup.setlifetimeEach=100;
  }
  }

    //function for spawning the bananas after specific interval of time
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
    banana.lifetime=100;
  }
  } 

  //function for destroying the bananas when the monkey touches them
  function destroybananas()
  {
    if(foodGroup.isTouching(monkey))
    {
      foodGroup.destroyEach();
      score=score+2;
    }
  }
 
