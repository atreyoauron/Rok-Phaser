/// <reference path="../../phaser.d.ts" />

import { Odin } from './personagem.js';

class FaseUm extends Phaser.Scene {
    constructor() {
        super({
            key: 'faseum',
            physics: {
                arcade: {
                    gravity: { y: 700 },
                    debug: true
                }
            }
        })

        this.bg;
        this.changedScreen = false;
        this.odin;
        this.platformsObject;
    }

    init(data) {
        console.log(data);
    }
 
    preload() {
        this.load.image('odin', 'src/assets/img/odin.png');
        this.load.audio('bgMusic', 'src/assets/audio/sound.mp3');
        this.platformsObject = this.load.json('platformsData', 'src/assets/json/level_1_platforms.json');
        this.cameras.main.setBackgroundColor('rgba(230, 230, 230, 1)');
                
        const simpleCube = this.make.graphics();
        simpleCube.fillStyle('0x9b9b9b');
        simpleCube.beginPath();
        simpleCube.fillRect(0,0, 200, 200);
        simpleCube.generateTexture('simpleCube', 200, 10);
    }

    create() {
        const bgMusic = this.sound.add('bgMusic');
        bgMusic.play();

        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        this.odin = new Odin({
            scene: this,
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            key: 'odin'
        });

        this.odin.configureMainCharacter();
        this.odin.create();

        const platforms = this.physics.add.staticGroup(); 

        const plat = this.physics.add.staticSprite();
        this.cache.json.get('platformsData').forEach(data => {
            const platform = platforms.create(data.x, data.y, data.texture);
            platform.setOrigin(data.xOrigin, data.yOrigin);

            if (data.overWriteSize) {
                platform.setSize(data.SizeToAdd.width, data.SizeToAdd.height);
                platform.setDisplaySize(data.SizeToAdd.width, data.SizeToAdd.height);
                platform.enableBody(data.enableBody);
            }

            platform.enableBody(data.enableBody);
        });

        this.physics.add.collider(this.odin, platforms);

        this.input.keyboard.on('keydown_ONE', function() {
            this.scene.start('faseum');
        }, this);
        this.input.keyboard.on('keydown_TWO', function() {
            this.scene.start('fasedois');
        }, this);

        this.odin.getDoubleJumpItem();
    }

    update() {
        console.log(this.input.keyboard);
        this.odin.createCursorMovement(this);
    }
}
export default FaseUm;