var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
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
var platforms;

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

    this.load.image("testCircle", "assets/circle.png");
    this.load.image('sky', '../')
}

function create() {
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

	this.add.image(500, 500, "testCircle");
    this.add.text(400, 300, "testing", { color: "white" });
    
    platforms = this.physics.add.staticGroup();

	Client.askNewPlayer();
}

function update() {}
