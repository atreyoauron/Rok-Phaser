/// <reference path="../../phaser.d.ts" />
import BarrelSpawner from './barrel-spawner.js';

class FaseTres extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasetres',
            pixelArt: true,
            physics: {
                arcade: {
                    gravity: { y: 700 },
                    debug: false
                }
            }
        })

        this.odin;
        this.common;
    }

    init(config) {
        this.common = this.scene.get('preloading');
        this.odin = this.common.odin;
        this.scene.stop('fasedois');
        
        if (config) {
            this.odin.body.setVelocityX(0);
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
            this.physics.world.enable(this.odin);
            this.odin.body.setVelocity(0, 0);
        }
    }

    preload() {

    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

        var map = this.add.tilemap('fase_3');

        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);
        this.ground.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.odin, [this.ground]);
        this.odin = this.add.existing(this.odin);

        const barrelOne = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 1,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 0,
                y: 71,
                speedDirection: 120,
                colliders: [this.ground],
                overlaps: [this.odin],
            }
        });
        const barrelTwo = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 1,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 130,
                y: 0,
                speedDirection: 120,
                colliders: [this.ground],
                overlaps: [this.odin],
            }
        });

        barrelOne.createBarrelSpawner();        
        barrelTwo.createBarrelSpawner();        
    }

    update() {
        this.odin.checkCursorMoviment(this.common);

        if (this.odin.x >= 636) {
            this.scene.start('fasequatro', {
                odinx: 20,
                odiny: this.odin.y - 5
            });
        } else if (this.odin.x <= 14) {
            this.scene.start('fasedois', {
                odinx: 640 - this.odin.width - 20,
                odiny: this.odin.y
            });
        }
    }
}

export default FaseTres;