var config = {
	type: Phaser.AUTO,
	width: 1088, // initial width that determines the scaled size
  height: 768,
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
    
    this.load.image("main_room_tiles", "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fmain_room.png?v=1602985634599"); 
  this.load.image("rock_garden", "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Frock_garden.png?v=1602996652887");
    this.load.tilemapTiledJSON("map", "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fmap.json?v=1602996648162");
  //this.load.tilemapTiledJSON("map", "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fmain_room.json?v=1602991085683");
  
    this.load.multiatlas('greenFrog', 
                         'https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2FplayerPurple_spritesheet.json?v=1602977954157', 
                         'https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fplayer_spritesheet.png?v=1602977449522');
}

function create() {
   //this.add.image(400, 300, 'main_room_tiles');

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
  
  // LOOK HERE FOR THE MAIN_ROOM CODE
  //I'm disabling these just to test other parts of the code -quinn
  //this.map = this.make.tilemap({ key: "main_room_map" }); //should be add.tilemap?
  this.map = this.add.tilemap("map");

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  
  this.tiles = this.map.addTilesetImage("main_room", "main_room_tiles");
  
  this.backgroundLayer = this.map.createStaticLayer("Tile Layer 1", this.tiles, 0, 0);
  //wait i renamed it to world sorry
  // there are 2 layers now: one where we have collidable objects (World) and one thats below the player (Below Player)
  
  console.log(this)

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  //const worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
  
  //worldLayer.setCollisionByProperty({ collides: true });
  
  //set physics here
  
  //this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  
	Client.askNewPlayer();
}

var tempLoc = {x:0, y:0}
//n,e,s,w = 0,1,2,3
var lastDirection = 0;

function update() {
  //player.setVelocity(0);

  if (game.cursors.left.isDown)
  {
      Client.sendKey(-1,0, 3);
    //tempLoc.x -= 1;
  }
  else if (game.cursors.right.isDown)
  {
      Client.sendKey(1,0, 1);
    //tempLoc.x += 1;
  }

  if (game.cursors.up.isDown)
  {  
      Client.sendKey(0,-1, 2);
    //tempLoc.y -= 1;
  }
  else if (game.cursors.down.isDown)
  {
      Client.sendKey(0,1, 0);
    //tempLoc.y += 1;
  }
  /*
  else if (code == Phaser.Input.Keyboard.KeyCodes.ENTER)
  {
      console.log(document.getElementById("Chat"))
  }
  */
  //listen for enter key here
}

game.addNewPlayer = function(id,x,y){
   this.playerMap[id] = this.scene.scenes[0].add.sprite(x, y, 'greenFrog', 'frog1.png');
   this.playerMap[id].setScale(0.25, 0.25);
  
  //this.physics.add.collider(this.playerMap[id], worldLayer);
  //this.playerMap[id] = this.scene.scenes[0].add.circle(x, y, 10)
  
  //reason why you can't place text after new people log in?
  //can't do without DB...
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
//fix
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
    
    
  
    /*
    var player = this.playerMap[id];
    
    var distance = Phaser.Math.Distance.BetweenPoints(player.x,player.y,x,y);
    var duration = distance*10;
  
    console.log(this.playerMap[id].y)
    
    var tween = this.scene.scenes[0].tweens.add({
      targets: player,
      duration: duration,
      x:x,
      y:y
    })
    
    tween.play();
    */
    
  
  
  
    /*
    var tween = game.add.tween(player);
    tween.to({x:x,y:y}, duration);
    tween.start();
    */
};




// window.addEventListener('resize', () => {
//   this.game.resize(window.innerWidth, window.innerHeight);
// }, false)

// function resize(width, height) {
//   this.cameras.resize(width, height);
//   this.bg.setDisplaySize(width, height);
// }