/// <reference path="../../phaser.d.ts" />

class FaseNove extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasenove',
            physics: {
                arcade: {
                    gravity: { y: 700 },
                    debug: true,
                    // tileBias: 120,
                }
            }
        })

        this.odin;
        this.common;        
    }

    init(config) {
        this.common = this.scene.get('preloading');
        this.odin = this.common.odin;
        this.scene.stop('faseseis');
        
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
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

        var map = this.add.tilemap('fase_9');

        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);
        this.ground.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.odin, [this.ground], function() {
            this.odin.resetJump();
        }, null, this);
        this.odin = this.add.existing(this.odin);
    }

    update() {
        this.odin.checkCursorMoviment(this.common);

        // if (this.odin.x >= 568 && this.odin.x <= 640 && this.odin.y > 360) {
        //     this.scene.start('fasenove', {
        //         odinx: this.odin.x,
        //         odiny: 0
        //     });
        // }
    }
}

export default FaseNove;