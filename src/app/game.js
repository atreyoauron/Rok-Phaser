/// <reference path="../../phaser.d.ts" />

const startScene = new Phaser.Scene('game');
let odin;

startScene.preload = function() {
    this.load.image('background', 'src/assets/img/background.png');
    this.load.image('odin', 'src/assets/img/odin.png');
    this.load.image('ground', 'src/assets/img/ground.png');
}

startScene.create = function() {
    const screenWidth = this.sys.game.config.width;
    const screenHeight = this.sys.game.config.height;

    const bg = this.add.tileSprite(0,0, 1911, 360, 'background');
    const grounds = this.physics.add.staticGroup();
    grounds.create(320, 220, 'ground');
    grounds.create(1000, 220, 'ground');

    this.physics.world.bounds.width = bg.width;
    bg.fixedToCamera = true;
    bg.setOrigin(0,0);

    odin = this.physics.add.sprite(0,0, 'odin');
    odin.setCollideWorldBounds(true);
    odin.setOrigin(0.5);
    odin.x = (screenWidth / 2);
    odin.setGravityY(200);
    this.cameras.main.startFollow(odin);
    this.cameras.main.setBounds(0, 0, bg.width, bg.height);
    this.physics.add.collider(odin, grounds);
}

startScene.update = function() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.right.isDown) {
        odin.setVelocityX(160);
    } else if (cursors.left.isDown) {
        odin.setVelocityX(-160)
    } else {
        odin.setVelocityX(0);
    }

    if(cursors.up.isDown && odin.body.onFloor() || cursors.up.isDown && odin.body.touching.down) {
        odin.setVelocityY(-330);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: true
        }
    },
    scene: startScene
}

const game = new Phaser.Game(config);