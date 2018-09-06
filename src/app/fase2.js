/// <reference path="../../phaser.d.ts" />
import BarrelSpawner from './barrel-spawner.js';

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
        this.common;
        this.barrelGroup;
    }

    init(config) {
        this.physics.world.OVERLAP_BIAS = 10;
        this.physics.world.TILE_BIAS = 10;
        this.common = this.scene.get('preloading');
        this.odin = this.common.odin;
        this.scene.stop('faseum');

        if (config) {
            this.odin.body.setVelocityX(0);
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
            this.physics.world.enable(this.odin);
            this.odin.body.setVelocity(0, 0);
        }
    }

    preload() { }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

        var map = this.add.tilemap('fase_2');

        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);
        this.ground.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.odin, [this.ground]);
        this.odin = this.add.existing(this.odin);
        const barrelOne = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 2,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 645,
                y: 71,
                speedDirection: -400,
                colliders: [this.ground, this.odin]                 
            }
        });

        barrelOne.createBarrelSpawner();    
    }

    update() {
        this.odin.checkCursorMoviment(this.common);

        if (this.odin.x >= 636) {
            this.scene.start('fasetres', {
                odinx: 20,
                odiny: this.odin.y - 5
            });
        } else if (this.odin.x <= 14) {
            this.scene.start('faseum', {
                odinx: 640 - this.odin.width - 20,
                odiny: this.odin.y
            });
        }
    }            
}

export default FaseDois;