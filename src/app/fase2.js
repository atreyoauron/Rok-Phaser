/// <reference path="../../phaser.d.ts" />

import { Odin } from './personagem.js';

class FaseDois extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasedois',
            physics: {
                arcade: {
                    gravity: { y: 700 },
                    debug: true
                }
            }
        })

        this.odin;
    }

    init(config) {
        let faseUm = this.scene.get('faseum');
        this.odin = faseUm.odin;

        if (config) {
            this.odin.body.setVelocityX(0);
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
            this.physics.world.enable(this.odin);
            this.odin.body.setVelocity(0, 0).setCollideWorldBounds(true);
            this.odin = this.add.existing(this.odin);            
        }
    } 

    preload() {
        this.load.tilemapTiledJSON('fase_2', 'src/assets/json/fase_2.json');
        this.load.image('plataformas', 'src/assets/img/plataforma_fase_1.png');

    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');



        var map = this.add.tilemap('fase_2');

        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);        
        this.ground.setCollisionByProperty({collider: true});        

        this.input.keyboard.on('keydown_ONE', function() {
            this.scene.start('faseum');
        }, this);


        this.physics.add.collider(this.odin, [this.ground]);
    }

    update() {
        this.odin.createCursorMovement(this);

        if (this.odin.x >= 633) {
            this.odin.body.setVelocityX(0);
            this.scene.start('fasedois', {
                odinx: 20,
                odiny: this.odin.y - 5
            });
        } else if (this.odin.x <= 7) {
            this.odin.body.setVelocityX(0);
            this.scene.start('faseum', {
                odinx: 500,
                odiny: this.odin.y - 5
            });
        }        
    }
}

export default FaseDois;