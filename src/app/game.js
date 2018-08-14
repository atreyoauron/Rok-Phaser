/// <reference path="../../phaser.d.ts" />

const startScene = new Phaser.Scene('game');
let odin, skeleton;

startScene.preload = function () {
    this.load.image('background', 'src/assets/img/background.png');
    this.load.image('odin', 'src/assets/img/odin.png');
    this.load.image('ground', 'src/assets/img/ground.png');
    const atlas = this.load.atlas('skeleton', 'src/assets/img/skeleton.png', 'src/assets/json/skeleton-atlas.json');
}

startScene.create = function () {
    const screenWidth = this.sys.game.config.width;
    const screenHeight = this.sys.game.config.height;

    const bg = this.add.tileSprite(0, 0, 1911, 360, 'background');
    const grounds = this.physics.add.staticGroup();
    skeleton = this.physics.add.sprite(0,0, 'skeleton');
    skeleton.x = screenWidth / 2 + 200;
    grounds.create(320, 220, 'ground');
    grounds.create(1000, 220, 'ground');

    this.anims.create({
        key: 'walking',
        frames: this.anims.generateFrameNames('skeleton', { prefix: 'walking', end: 7, zeroPad: 1 }),
        frameRate: 10,
        repeat: -1,
        yoyo: false
    });    

    this.physics.world.bounds.width = bg.width;
    bg.fixedToCamera = true;
    bg.setOrigin(0, 0);

    odin = this.physics.add.sprite(0, 0, 'odin');
    odin.setCollideWorldBounds(true);
    odin.setOrigin(0.5);
    odin.x = (screenWidth / 2);
    odin.setGravityY(200);
    this.cameras.main.startFollow(odin);
    this.cameras.main.setBounds(0, 0, bg.width, bg.height);
    this.physics.add.collider([odin, skeleton], grounds);
}

startScene.update = function () {
    const cursors = this.input.keyboard.createCursorKeys();

    if (this.input.activePointer.isDown) {
        const clickedX = this.input.activePointer.x;
        odin.setVelocityX(160);
        if (clickedX > this.sys.game.config.width / 2) {
            odin.setVelocityX(160);
        } else {
            odin.setVelocityX(-160);
        }
    } else {
        if (cursors.right.isDown) {
            odin.setVelocityX(160);
        } else if (cursors.left.isDown) {
            odin.setVelocityX(-160)
        } else {
            odin.setVelocityX(0);
        }

        if ((cursors.up.isDown || cursors.space.isDown) && (odin.body.onFloor() && odin.body.touching.down)) {
            odin.setVelocityY(-330);
        }
    }

    this.input
}


const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
    scene: startScene
}

const game = new Phaser.Game(config);