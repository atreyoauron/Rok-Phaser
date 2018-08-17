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
        this.load.image('bg2', 'src/assets/img/background.png');
        this.load.image('odin', 'src/assets/img/odin.png');
        this.load.image('invisibleWall', 'src/assets/img/invisible-wall.jpg');
    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.bg = this.add.sprite(0, 0, 'bg2');    

        this.odin = new Odin({
            scene: this,
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            key: 'odin'
        });

        this.physics.world.bounds.width = this.bg.width;
        this.cameras.main.setBounds(0, 0, this.bg.width, this.bg.height);

        this.bg.fixedToCamera = true;
        this.bg.setOrigin(0, 0);
        this.odin.create();
    }

    update() {     
        this.odin.update();
        
        if(
            this.odin.x + this.odin.width > (this.cameras.main.scrollX + this.sys.game.config.width - this.odin.width / 2) && 
            this.odin.x + this.odin.width < (this.cameras.main.scrollX + this.sys.game.config.width + this.odin.width / 2)    
            ) {

            if (this.cameras.main.scrollX + this.sys.game.config.width >= this.bg.width) {
                return;
            }

            this.cameras.main.setScroll(this.cameras.main.scrollX + this.sys.game.config.width);
            this.odin.x = this.cameras.main.scrollX + this.odin.width * 2;
        }
        
        console.log(this.odin.x - this.odin.width);
        console.log(this.cameras.main.scrollX);

        if(this.odin.x - this.odin.width < (this.cameras.main.scrollX)) {
            if (this.cameras.main.scrollX - this.odin.width < 0) {
                console.log('caindo aqui');
                return;
            }

            this.cameras.main.setScroll(this.cameras.main.scrollX - this.sys.game.config.width);
            this.odin.x = this.cameras.main.scrollX + this.sys.game.config.width - this.odin.width * 2;            
        }
    }
}
export default FaseUm;