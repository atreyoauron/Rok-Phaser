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
    }

    preload() {
        this.load.image('odin', 'src/assets/img/odin.png');
        this.cameras.main.setBackgroundColor('rgba(230, 230, 230, 1)');
        
        const simpleCube = this.make.graphics();
        simpleCube.fillStyle('0x9b9b9b');
        simpleCube.beginPath();
        simpleCube.fillRect(0,0, 200, 200);
        simpleCube.generateTexture('simpleCube', 200, 10);
    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        const platform = this.physics.add.staticSprite(0,0,'simpleCube');
        platform.setOrigin(0,0)
        platform.x = 0;
        platform.y = 300;
        platform.enableBody(true);

        this.odin = new Odin({
            scene: this,
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            key: 'odin'
        });

        this.odin.create();

        this.physics.add.collider(this.odin, platform);
    }

    update() {     
        this.odin.update();
    }
}
export default FaseUm;