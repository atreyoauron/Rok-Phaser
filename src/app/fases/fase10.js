/// <reference path="../../../phaser.d.ts" />
import CrowSpawner from '../prefabs/crow-spawner.js';

class FaseDez extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasedez',
            pixelArt: true,
            physics: {
                arcade: {
                    gravity: { y: 700 },
                    debug: false,
                    // tileBias: 120,
                }
            }
        })

        this.odin;
        this.common;
    }

    init(config) {
        this.common = this.scene.get('boot');
        this.odin = this.common.odin;
        this.scene.stop('fasenove');
        this.odin.resetSpearGroup();

        if (config) {
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
            this.odin.body.setVelocityX(0);
            this.physics.world.enable(this.odin);
        }
    }

    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

        var map = this.add.tilemap('fase_10');

        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);
        this.ground.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.odin, [this.ground], function() {
            this.odin.resetJump();
        }, null, this);
        this.odin = this.add.existing(this.odin);

        this.crows = new CrowSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'crow',
                maxSize: 15,
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 400,
                y: 300,
                bounce: {
                    x: 1,
                    y: 1
                },
                speedDirection: {
                    x: 0,
                    y: -120
                },
                colliders: [this.ground],
                overlap: this.odin,
            }
        });

        this.crows.createCrow({x: 255, y: 30},{ x: 0, y: 50});
        this.crows.createCrow({x: 255, y: 60},{ x: 0, y: 50});
        this.crows.createCrow({x: 255, y: 90},{ x: 0, y: 50});
        this.crows.createCrow({x: 255, y: 115},{ x: 0, y: 50});

        this.crows.createCrow({x: 309, y: 142},{ x: -50, y: 0});


    }

    update() {
        this.odin.checkCursorMoviment(this.common);

        if (this.odin.x >= 137 && this.odin.x <= 244 && this.odin.y > 360) {
            this.scene.start('fasenove', {
                odinx: this.odin.x,
                odiny: 0
            });
        }
    }
}

export default FaseDez;
