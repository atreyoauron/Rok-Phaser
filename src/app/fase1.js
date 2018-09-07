/// <reference path="../../phaser.d.ts" />

import CrowSpawner from './crow-spawner.js';

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
        });

        this.bg;
        this.odin;
        this.tilemap;
        this.ground;
        this.bgMusic;
        this.startSong;
        this.config;
        this.hasConfig = false;
        this.firstTime = true;
        this.common;
    }

    init(config) {
        this.scene.resume('preloading');        
        this.common = this.scene.get('preloading');
        this.odin = this.common.odin;
        this.physics.world.enable(this.odin);
        this.odin.body.setVelocity(0, 0);

        if (config.odinx) {
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
        } else {
            this.odin.x = this.sys.game.config.width / 2;
            this.odin.y = this.sys.game.config.height / 2;            
        }

    }

    preload() {

    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.lights.addLight(screenWidth / 2, screenHeight / 2, 200);

        var map = this.add.tilemap('fase_1');

        const fundo = this.add.image(0,0, 'fundo_fase_1');
        fundo.setOrigin(0);
        
        var tileset = map.addTilesetImage('fase_1_plataformas');
        this.ground = map.createStaticLayer('plataforma_fase_1', tileset);        
        this.ground.setCollisionByProperty({collider: true})
        this.physics.add.collider(this.odin, [this.ground]);
        this.odin = this.add.existing(this.odin);
        // const crow = new CrowSpawner({
        //     scene: this,
        //     groupConfig: {
        //         defaultKey: 'barril',
        //         maxSize: 15,    
        //     },
        //     groupMultipleConfig: {},
        //     customConfig: {
        //         x: 400,
        //         y: 300,
        //         bounce: {
        //             x: 0,
        //             y: 1
        //         },
        //         speedDirection: {
        //             x: 0,
        //             y: -120
        //         },
        //         colliders: [this.ground]                 
        //     }            
        // });     
        
        // crow.createCrow();
    }

    update() {
        this.odin.checkCursorMoviment(this.common);

        if (this.odin.x >= 636) {
            this.changeScene('fasedois');
        }
    }

    changeScene(cena) {
        this.scene.stop('faseum');
        this.scene.start(cena, {
            odinx: this.odin.width,
            odiny: this.odin.y
        });
    }
}
export default FaseUm;