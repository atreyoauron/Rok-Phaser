/// <reference path="../../phaser.d.ts" />

import { Odin } from './personagem.js';

class FaseUm extends Phaser.Scene {
    constructor() {
        super({
            key: 'faseum',
            pixelArt: true,
            physics: {
                arcade: {
                    gravity: { y: 700 },
                    debug: true
                }
            }
        })

        this.bg;
        this.odin;
        this.tilemap;
        this.ground;
        this.bgMusic;
        this.startSong;
    }

    init(config) {

    }

    preload() {
        this.load.image('light', 'src/assets/img/light.png');
        this.load.image('odin',['src/assets/img/odin.png', 'src/assets/img/odin.png']);
        this.load.tilemapTiledJSON('fase_1', 'src/assets/json/fase_1.json');
        this.load.image('fase_1_plataformas', 'src/assets/img/plataforma_fase_1.png');
        this.load.image('fundo_fase_1', ['src/assets/img/fase_1_bg.png', 'src/assets/img/fase_n_1_bg.png']);
        this.load.audio('bgMusic', 'src/assets/audio/sound.mp3');
    }

    create() {
        if(!window.bgMusic) {
            window.bgMusic = this.sound.add('bgMusic');
            // window.bgMusic.play();
        }

        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.lights.addLight(screenWidth / 2, screenHeight / 2, 200);
        // this.lights.enable(); 

        var map = this.add.tilemap('fase_1');

        const fundo = this.add.image(0,0, 'fundo_fase_1');
        fundo.setOrigin(0);
                
        var tileset = map.addTilesetImage('fase_1_plataformas');
        this.ground = map.createStaticLayer('plataforma_fase_1', tileset);        
        this.ground.setCollisionByProperty({collider: true})
        // fundo.setPipeline('Light2D');
        // this.ground.setPipeline('Light2D');

        this.odin = new Odin({
            scene: this,
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            key: 'odin'
        });
        // this.odin.setPipeline('Light2D');


        this.odin.create();
        this.odin.configureMainCharacter();

        this.physics.add.collider(this.odin, [this.ground]);
        
        this.input.keyboard.on('keydown_TWO', function() {
            this.scene.start('fasedois');
        }, this);
    }

    addNewSize(defaultWidth, defaultHeight, widthToAdd, heightToAdd) {
        
    }

    update() {
        this.odin.createCursorMovement(this);

        if(this.input.activePointer.isDown) {
            console.log('%s %s', this.input.activePointer.x, this.input.activePointer.y);
        }
    }
}
export default FaseUm;