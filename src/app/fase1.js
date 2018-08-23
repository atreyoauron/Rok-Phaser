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
        this.odin;
        this.platformsObject;
        this.tilemap;
        this.ground;
        this.amarelo;
        this.bgMusic;
        this.startSong;
    }

    init(config) {

    }

    preload() {
        this.load.image('odin', 'src/assets/img/odin.png');
        this.load.tilemapTiledJSON('background', 'src/assets/json/background-davi.json');
        this.load.image('redblock', 'src/assets/img/red-block.png');
        this.platformsObject = this.load.json('platformsData', 'src/assets/json/level_1_platforms.json');
        this.cameras.main.setBackgroundColor('rgba(230, 230, 230, 1)');
        this.load.audio('bgMusic', 'src/assets/audio/sound.mp3');
                
        const simpleCube = this.make.graphics();
        simpleCube.fillStyle('0x9b9b9b');
        simpleCube.beginPath();
        simpleCube.fillRect(0,0, 200, 200);
        simpleCube.generateTexture('simpleCube', 200, 10);
    }

    create() {
        if(!window.bgMusic) {
            console.log('caindo aqui');
            window.bgMusic = this.sound.add('bgMusic');
            window.bgMusic.play();
        }

        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;

        var map = this.add.tilemap('background');


        var tileset = map.addTilesetImage('redblock');
        this.ground = map.createStaticLayer('redPlatforms', tileset);
        this.ground.setCollisionByProperty({ collides: true });
        
        this.odin = new Odin({
            scene: this,
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            key: 'odin'
        });

        this.odin.create();
        this.odin.configureMainCharacter();

        this.physics.add.collider(this.odin, [this.ground, this.amarelo]);

        this.input.keyboard.on('keydown_TWO', function() {
            this.scene.start('fasedois');
        }, this);        
    }

    addNewSize(defaultWidth, defaultHeight, widthToAdd, heightToAdd) {
        
    }

    update() {
        this.odin.createCursorMovement(this);
    }
}
export default FaseUm;