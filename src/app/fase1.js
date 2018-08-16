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

        this.odin;
    }

    preload() {
        this.load.image('bg2', 'src/assets/img/new-bg.jpg');
        this.load.image('odin', 'src/assets/img/odin.png');
    }

    create() {

        const screenWidth = this.sys.game.config.width;
        const bg = this.add.tileSprite(0, 0, 1911, 360, 'bg2');

        this.odin = new Odin({
            scene: this,
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            key: 'odin'
        });
                     

        this.physics.world.bounds.width = bg.width;
        this.cameras.main.setBounds(0, 0, bg.width, bg.height);

        bg.fixedToCamera = true;
        bg.setOrigin(0, 0);

        this.cameras.main.startFollow(this.odin);
        this.odin.create();
    }

    update() {     
        this.odin.update();
    }
}
export default FaseUm;