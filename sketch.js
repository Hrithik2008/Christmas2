const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine,world,ground,gift,giftSprite,giftImg,cts,ctsImg,mc,mcImg;

function preload(){
  giftImg=loadImage("GImg.jpg");
  bg=loadGif("FW.gif");
  ctsImg=loadImage("C.jpg");
  mcImg=loadImage("MC.jpg");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;
  var options = {
    isStatic : true
  }
  ground = Bodies.rectangle(windowWidth/2,windowHeight-(windowHeight/20),windowWidth,10,options);
  World.add(world,ground);
  console.log(ground.position.x);

  var gift_options = {
    restitution : 0.8,
  }
  gift = Bodies.rectangle(windowWidth/2,20,227,210,gift_options);
  World.add(world,gift);

  giftSprite=createSprite(0,0,10,10);
  giftSprite.addImage(giftImg);
  groundSprite=createSprite(0,0,10,10);
  groundSprite.visible=false;
 
  mc=createSprite(windowWidth/2,windowHeight-(windowHeight/19),1,1);
  mc.addImage(mcImg);
  mc.visible=false;
  mc.scale=0.4;

  cts=createSprite(windowWidth/2,windowHeight+(windowHeight/5),1,1);
  cts.addImage(ctsImg);
  cts.visible=false;

}

function draw() {
  background("#000000");  
  Engine.update(engine);
  //gift.position.x=mouseX;
  //gift.position.y=mouseY;
  giftSprite.x = gift.position.x;
  giftSprite.y = gift.position.y;
  giftSprite.width = windowHeight/10;
  giftSprite.height = windowHeight/10;
  groundSprite.x = ground.position.x;
  groundSprite.y = ground.position.y;
  groundSprite.width=windowWidth;
  groundSprite.height=10;
  rectMode(CENTER);
  fill("yellow");
  rect(ground.position.x,ground.position.y,windowWidth,10);

  if (giftSprite.isTouching(groundSprite)) {
    giftSprite.visible=false;
    background(bg);
    mc.velocityY=-2.5;
    mc.visible=true;
    cts.velocityY=-2.5;
    cts.visible=true;
    if(mc.y<windowHeight-((windowHeight/3)*2)){
      mc.velocityY=0;
    }
    if(cts.y<windowHeight-((windowHeight/5)*2)){
      cts.velocityY=0;
    }
  }
   
  drawSprites();
}