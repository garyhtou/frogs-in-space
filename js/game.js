var config = {
	type: Phaser.AUTO,
	width: 940, // initial width that determines the scaled size
  height: 680,
  parent: "gameCanvas",
  /*
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
  */
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
  },
};

var game = new Phaser.Game(config);

//game.off('hidden', game.onHidden, game);
//game.off('visible', game.onVisible, game);


function preload() {
	//preload assets here
	/*
        this.load.setBaseURL('http://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');

        this.load.spritesheet('frog', 'assets/sprites/frog.png', {
            frameWidth: 32,
            frameHeight: 48
        })
      */
  
  this.load.image("ok", "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fokok.png?v=1603015686415")
    
    this.load.image("main_room", "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fmain_room.png?v=1603000178571"); 
  this.load.image("main_room_2", "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fmainroom2.png?v=1603008242252"); 
    this.load.tilemapTiledJSON("map", "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fmap.json?v=1603004716886");
  //this.load.tilemapTiledJSON("map", "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fmain_room.json?v=1602991085683");
  
    this.load.multiatlas('greenFrog', 
                         'https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2FplayerPurple_spritesheet.json?v=1602977954157', 
                         'https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fplayer_spritesheet.png?v=1602977449522');
    
  this.load.multiatlas('c_garden', 
                         "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fgarden_mini.json?v=1602988079466", 
                         "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fgarden_mini-0.png?v=1602988085197");
}

function create() {
  this.add.image(400, 300, 'main_room_2');

  game.playerMap = {};
  game.textMap = {};
  //game.cursors = this.input.keyboard.createCursorKeys(keys);
  game.cursors = this.input.keyboard.addKeys({up: Phaser.Input.Keyboard.KeyCodes.UP, down: Phaser.Input.Keyboard.KeyCodes.DOWN, left: Phaser.Input.Keyboard.KeyCodes.LEFT, right: Phaser.Input.Keyboard.KeyCodes.RIGHT});
  
  var bubble = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);  
  bubble.on('down', hello)

  
  this.anims.create({ key: 'frog_n', frames: [{key:'greenFrog', frame:"frog2b.png"}, {key:'greenFrog', frame:"frog2.png"}], frameRate: 10, repeat: 2});
  this.anims.create({ key: 'frog_e', frames: [{key:'greenFrog', frame:"frog1b.png"}, {key:'greenFrog', frame:"frog1.png"}], frameRate: 10, repeat: 2});
  this.anims.create({ key: 'frog_s', frames: [{key:'greenFrog', frame:"frog4b.png"}, {key:'greenFrog', frame:"frog4.png"}], frameRate: 10, repeat: 2});
  this.anims.create({ key: 'frog_w', frames: [{key:'greenFrog', frame:"frog3b.png"}, {key:'greenFrog', frame:"frog3.png"}], frameRate: 10, repeat: 2});
  //Phaser.Input.Keyboard.KeyboardPlugin.removeListener(Phaser.Input.Keyboard.KeyCodes.SPACE)
	//place assets in scene here
	/*
        this.add.image(400, 300, 'sky');

        var particles = this.add.particles('red');

        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        var logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
s
        emitter.startFollow(logo);
        */

	//this.add.image(500, 500, "testCircle");
    
    // const bg = this.add.image(400, 300, 'sky2');
    // bg.width = window.
    // platforms = this.physics.add.staticGroup();
  
  // here is the code for background 
  //I'm disabling these just to test other parts of the code -quinn
  const map = this.make.tilemap({ key: "map" }); //should be add.tilemap?
  //this.map = this.add.tilemap("map");


  
  const tileset = map.addTilesetImage("map", "main_room");
  
  this.belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
  this.worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  
  this.worldLayer.setCollisionByProperty({ collides: true });
  //wait i renamed it to world sorry
  // there are 2 layers now: one where we have collidable objects (World) and one thats below the player (Below Player)
  //for collision physics, line below is needed?
  //worldLayer.setCollisionByProperty({ collides: true });
  
  const camera = this.cameras.main;
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
  console.log(this)
  

  
  //const worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
  
  //worldLayer.setCollisionByProperty({ collides: true });
  
  //set physics here
  
  //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
	Client.askNewPlayer();
  Client.getMe();
}

game.setMe = function(me){
  this.me = me;
  console.log(me);
}

var tempLoc = {x:0, y:0}
//n,e,s,w = 0,1,2,3
var lastDirection = 0;

function update() {
  
  //this.playerMap[me].body.setVelocity(0);
  
  if (game.cursors.left.isDown)
  {
      Client.sendKey(-2,0, 3);
    //this.playerMap[me].body.setVelocityX(-100);
  }
  else if (game.cursors.right.isDown)
  {
      Client.sendKey(2,0, 1);
    //this.playerMap[me].body.setVelocityX(100);
  }

  if (game.cursors.up.isDown)
  {  
      Client.sendKey(0,-2, 2);
    //this.playerMap[me].body.setVelocityY(-100);
  }
  else if (game.cursors.down.isDown)
  {
      Client.sendKey(0,2, 0);
    //this.playerMap[me].body.setVelocityY(100);
  }
  
  //check for collision!
  /*
  if(this.playerMap[id].x > && this.playerMap[id].y < ){
     
  }
  */
  //this.playerMap[me].body.velocity.normalize().scale(speed);
}

function startMini(player, rect){
  console.log("start game")
}

var me = undefined;

game.addNewPlayer = function(id,x,y){
  

   this.playerMap[id] = this.scene.scenes[0].physics.add.sprite(x, y, 'greenFrog', 'frog1.png');
   this.playerMap[id].setScale(0.25, 0.25);
  

    //this.scene.scenes[0].physics.add.collider(this.playerMap[me], this.worldLayer);
  
  
    
  
   //this.scene.scenes[0].physics.add.overlap(this.playerMap[id], this.scene.scenes[0].rectangle, startMini, null, this)
  
  //this.physics.add.collider(this.playerMap[id], worldLayer);
  //this.playerMap[id] = this.scene.scenes[0].add.circle(x, y, 10)
};



game.removePlayer = function(id){
    this.playerMap[id].destroy();
    delete this.playerMap[id];
  
  if(this.textMap[id] !== undefined){
    this.textMap[id].destroy();
    delete this.textMap[id];
  }
};

function hello(e){
  var stuff = document.getElementById("Chat").value
  if(stuff != ""){
    Client.sendChat(stuff);
    document.getElementById("Chat").value = ""
  }
}

game.updateBubble = function(id, text){
  //attach text to player
  if(this.textMap[id] !== undefined){
    this.textMap[id].destroy();
    delete this.textMap[id];
  }
  
  const pl = this.playerMap[id];
  this.textMap[id] = this.scene.scenes[0].add.text(pl.x,pl.y - 45,text);
}

game.movePlayer = function(id,x,y,d){
    var currentFrame = ""
    switch(d){
      case 0:
        currentFrame = 'frog_n'
        break;
      case 1:
        currentFrame = 'frog_e'
        break;
      case 2:
        currentFrame = 'frog_s'
        break;
      case 3:
        currentFrame = 'frog_w'
        break;
    }
  
    console.log(id)
    
    this.playerMap[id].x = x
    this.playerMap[id].y = y
  
    if(this.textMap[id] !== undefined){
    this.textMap[id].x = x
    this.textMap[id].y = y - 45;
    }
  
    var player = this.playerMap[id];
  
    //stop animation when done wlking!
    if(!this.playerMap[id].anims.isPlaying){
      this.playerMap[id].anims.play(currentFrame);
    }
    
};

game.openGarden = function(id){
  //id == this.me
  if(true){
    console.log("garden time!")
    var tool = 0;
    
    var plants = new Array();
    
    //var sprite = this.add.sprite(400, 300, 'eye').setInteractive({ cursor: 'url(assets/input/cursors/pen.cur), pointer' });
    
    var window = this.scene.scenes[0].add.sprite(480, 300, 'c_garden', 'gardenBg.png');
    window.setScale(0.5, 0.5);

    var rakeButton = this.scene.scenes[0].add.sprite(850, 100, 'c_garden', 'rakeButton.png').setInteractive();
    rakeButton.setScale(0.25,0.25);
    rakeButton.on('pointerdown', function(ctx){
      rakeButton.setTint(0xff0000);
      handButton.setTint(0xffffff)
      waterButton.setTint(0xffffff)
      seedButton.setTint(0xffffff)
      tool = 0
    }, this)
    
    var handButton = this.scene.scenes[0].add.sprite(850, 200, 'c_garden', 'handButton.png').setInteractive();
    handButton.setScale(0.25,0.25);
    handButton.on('pointerdown', function(){
      handButton.setTint(0xff0000);
      rakeButton.clearTint();
      waterButton.clearTint();
      seedButton.clearTint();
      tool = 1
    }, this)
    
    var waterButton = this.scene.scenes[0].add.sprite(850, 300, 'c_garden', 'waterButton.png').setInteractive();
    waterButton.setScale(0.25,0.25);
    waterButton.on('pointerdown', function(){
      waterButton.setTint(0xff0000);
      rakeButton.clearTint();
      handButton.clearTint();
      seedButton.clearTint();
      tool = 2
    }, this)
    
    var seedButton = this.scene.scenes[0].add.sprite(850, 400, 'c_garden', 'seedButton.png').setInteractive();
    seedButton.setScale(0.25,0.25);
    seedButton.on('pointerdown', function(){
      seedButton.setTint(0xff0000);
      rakeButton.clearTint();
      handButton.clearTint();
      waterButton.clearTint();
      tool = 3
    }, this)
    
    var closeButton = this.scene.scenes[0].add.sprite(850, 500, 'ok').setInteractive();
    closeButton.setScale(0.03,0.03);
    closeButton.on('pointerdown', function(){
      rakeButton.setActive(false).setVisible(false);
      handButton.setActive(false).setVisible(false);
      waterButton.setActive(false).setVisible(false);
      seedButton.setActive(false).setVisible(false);
      closeButton.setActive(false).setVisible(false);
      for(var i = 0; i < 3; i++){
        for(var j = 0; j < 3; j++){
          for(var k = 0; k < 3; k++){
            plants[k][i][j].setActive(false).setVisible(false);
          }
        }
      }
      window.setActive(false).setVisible(false);
    }, this)
    
    //randomly place veggies

    const items = ['trash1.png', 'trash2.png', 'plant1.png', 'plant2.png', "tilledSoil.png", "tilledSoil.png"];
        
    for(var k= 0; k < 3; k++){
      plants[k] = new Array();
      
      for(var i =0; i < 3; i++){
        plants[k][i] = new Array();
        
        for(var j=0; j < 3; j++){
          var item = items[Math.floor(Math.random() * items.length)];
          
           plants[k][i][j] = ""

          if(item != ""){
            var my_x = ((i+1) * 50) + (175 + (k * 200));
            var my_y = ((j+1) * 50) + 294;
            plants[k][i][j] = this.scene.scenes[0].add.sprite(my_x, my_y, 'c_garden', item).setInteractive();
            plants[k][i][j].setScale(0.1,0.1);
            plants[k][i][j].on('pointerdown', function(){
              console.log(this.frame)
              //if is trash and scoop, remove
              if(tool == 1 && (this.frame.customData.filename == 'trash1.png' || this.frame.customData.filename == 'trash2.png')){
                this.setTexture('c_garden', 'tilledSoil.png')
              }
              //if is empty and rake, turn
              //
              //if is turned and seed, plant
              if(tool == 3 && this.frame.customData.filename == 'tilledSoil.png'){
                this.setTexture('c_garden', 'plant1.png')
              }
              //if is seed and water, grow?!!!!
              if(tool == 2 && this.frame.customData.filename == 'plant1.png'){
                this.setTexture('c_garden', 'plant2.png')
              }
              
              if(tool == 2 && this.frame.customData.filename == 'plant2.png'){
                this.setTexture('c_garden', 'plant3.png')
              }
              
              if(tool == 2 && this.frame.customData.filename == 'plant3.png'){
                this.setTexture('c_garden', 'plant4.png')
              }
              
              if(tool == 0 && (this.frame.customData.filename == 'plant3.png' || this.frame.customData.filename == 'plant2.png' || this.frame.customData.filename == 'plant1.png' || this.frame.customData.filename == 'plant4.png')){
                this.setTexture('c_garden', 'tilledSoil.png')
              }
            })
          }
        }
      }
    }
    console.log(plants);
  }
}
  
function openGardenGame(){
  
}

function closeGardenGame(){
  
}




// window.addEventListener('resize', () => {
//   this.game.resize(window.innerWidth, window.innerHeight);
// }, false)

// function resize(width, height) {
//   this.cameras.resize(width, height);
//   this.bg.setDisplaySize(width, height);
// }