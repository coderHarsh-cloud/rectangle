var fobj,mobj;


function setup() {
  createCanvas(800,400);
  
mobj=createSprite(400, 200, 80, 30);
fobj=createSprite(400, 200, 50, 80);
mobj.shapeColor="green";
fobj.shapeColor="green";
}

function draw() {
  background(0,0,0);  
  mobj.x=World.mouseX;
  mobj.y=World.mouseY;
  if(mobj.x-fobj.x<mobj.width/2+fobj.width/2&&fobj.x-mobj.x<mobj.width/2+fobj.width/2&&mobj.y-fobj.y<mobj.width/2+fobj.width/2&&fobj.y-mobj.y<mobj.width/2+fobj.width/2)
  {
    mobj.shapeColor="red";
    fobj.shapeColor="red"; 
}
 else{
  mobj.shapeColor="green";
  fobj.shapeColor="green";  
 }
drawSprites();


}