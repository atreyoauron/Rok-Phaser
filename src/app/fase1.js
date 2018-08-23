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
        this.tilemap;
        this.ground;
        this.amarelo;
    }

    preload() {
        this.load.image('odin', 'src/assets/img/odin.png');
        this.load.tilemapTiledJSON('background', 'src/assets/json/background.json');
        this.load.image('blocos', 'src/assets/img/brick_tileset.png');
        this.platformsObject = this.load.json('platformsData', 'src/assets/json/level_1_platforms.json');
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

        var map = this.add.tilemap('background');


        var tileset = map.addTilesetImage('blocos');
        this.ground = map.createStaticLayer('ground', tileset);
        this.amarelo = map.createStaticLayer('amarelo', tileset);
        this.ground.setCollisionByProperty({ collides: true });
        this.amarelo.setCollisionByProperty({ collides: true });
        
        this.odin = new Odin({
            scene: this,
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            key: 'odin'
        });
        this.odin.create();
        this.physics.add.collider(this.odin, [this.ground, this.amarelo]);
    }

    addNewSize(defaultWidth, defaultHeight, widthToAdd, heightToAdd) {
        
    }

    update() {
        this.odin.update();
    }
}
export default FaseUm;