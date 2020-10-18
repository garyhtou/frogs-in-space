var config = {
	type: Phaser.AUTO,
	width: 1280, // initial width that determines the scaled size
  height: 690,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
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

    this.load.image("testCircle", "https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2F1920px-Noto_Emoji_KitKat_263a.svg-2.png?v=1602974495091");
    this.load.image('sky', 'https://cdn.glitch.com/a8799410-ced8-4389-b408-e70cb1fd6d7b%2Fthumbnails%2Fsky.jpg?1602970097523')
}

function create() {

  game.playerMap = {};
  game.textMap = {};
  //game.cursors = this.input.keyboard.createCursorKeys(keys);
  game.cursors = this.input.keyboard.addKeys({up: Phaser.Input.Keyboard.KeyCodes.UP, down: Phaser.Input.Keyboard.KeyCodes.DOWN, left: Phaser.Input.Keyboard.KeyCodes.LEFT, right: Phaser.Input.Keyboard.KeyCodes.RIGHT});
  
  var bubble = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);  
  bubble.on('down', hello)
  
  
  
  console.log(game.cursors)
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
  this.add.text(400, 300, "Welcome to the moon", { color: "white" });
    
    // const bg = this.add.image(400, 300, 'sky2');
    // bg.width = window.
    // platforms = this.physics.add.staticGroup();

	Client.askNewPlayer();
}

var tempLoc = {x:0, y:0}
function update() {
  //player.setVelocity(0);

  if (game.cursors.left.isDown)
  {
      Client.sendKey(-1,0);
    //tempLoc.x -= 1;
  }
  else if (game.cursors.right.isDown)
  {
      Client.sendKey(1,0);
    //tempLoc.x += 1;
  }

  if (game.cursors.up.isDown)
  {  
      Client.sendKey(0,-1);
    //tempLoc.y -= 1;
  }
  else if (game.cursors.down.isDown)
  {
      Client.sendKey(0,1);
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
   this.playerMap[id] = this.scene.scenes[0].add.image(x,y,"testCircle");
  //this.playerMap[id] = this.scene.scenes[0].add.circle(x, y, 10)
};

game.removePlayer = function(id){
    this.playerMap[id].destroy();
    delete this.playerMap[id];
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
  this.textMap[id] = this.scene.scenes[0].add.text(pl.x,pl.y - 15,text);
  
  
}
//fix
game.movePlayer = function(id,x,y){
    this.playerMap[id].x = x
    this.playerMap[id].y = y
  
    if(this.textMap[id] !== undefined){
    this.textMap[id].x = x
    this.textMap[id].y = y - 15
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


/*
function myTimer() {
    if(tempLoc.x != 0 && tempLoc.y != 0){
      Client.sendKey(tempLoc.x,tempLoc.y);
      tempLoc = {x: 0, y: 0};
    }
    
}

var myVar = setInterval(myTimer, 15);
*/

// window.addEventListener('resize', () => {
//   this.game.resize(window.innerWidth, window.innerHeight);
// }, false)

// function resize(width, height) {
//   this.cameras.resize(width, height);
//   this.bg.setDisplaySize(width, height);
// }