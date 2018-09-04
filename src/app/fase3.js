/// <reference path="../../phaser.d.ts" />

class FaseTres extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasetres',
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
        let preload = this.scene.get('preloading');
        this.odin = preload.odin;
        this.scene.stop('fasedois');
        
        if (config) {
            this.odin.removeKeys(this);
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
        this.odin.createCursorMovement(this);
    }

    update() {
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
        } else {
            this.odin.checkCursorMoviment(this.scene.key);
        }
    }
}

export default FaseTres;