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
        this.config;
        this.hasConfig = false;
    }

    init(config) {

        if (config.odinx) {
            this.hasConfig = true;
            this.odin.body.setVelocityX(0);
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
            this.physics.world.enable(this.odin);
            this.odin.body.setVelocity(0, 0).setCollideWorldBounds(true);            
        }
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

        if (!this.odin) {
            this.odin = new Odin({
                scene: this,
                x: this.sys.game.config.width / 2,
                y: this.sys.game.config.height / 2,
                key: 'odin'
            });
            this.odin.create();
            this.odin.configureMainCharacter();            
        } else {
            this.odin = this.add.existing(this.odin);
        }

        this.physics.add.collider(this.odin, [this.ground]);
        
        this.input.keyboard.on('keydown_TWO', function() {
            this.scene.start('fasedois');
        }, this);
    }

    update() {
        this.odin.createCursorMovement(this);

        if (this.odin.x >= 633) {
            this.odin.body.setVelocityX(0);

            this.scene.start('fasedois', {
                odinx: 30,
                odiny: this.odin.y - 5
            });
        }
    }
}
export default FaseUm;