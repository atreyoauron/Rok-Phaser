/// <reference path="../../phaser.d.ts" />

class FaseQuatro extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasequatro',
            physics: {
                arcade: {
                    gravity: { y: 700 },
                    debug: true
                }
            }
        })

        this.odin;
        this.common;        
    }

    init(config) {
        this.common = this.scene.get('preloading');
        this.odin = this.common.odin;
        this.scene.stop('fasetres');
        
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

        var map = this.add.tilemap('fase_4');
        
        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);
        this.ground.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.odin, [this.ground]);
        this.odin = this.add.existing(this.odin);
    }

    update() {
        this.odin.checkCursorMoviment(this.common);

        if (this.odin.x >= 636) {
            this.scene.start('fasecinco', {
                odinx: 20,
                odiny: this.odin.y - 5
            });
        } else if (this.odin.x <= 14) {
            this.scene.start('fasetres', {
                odinx: 640 - this.odin.width - 20,
                odiny: this.odin.y
            });
        }
    }
}

export default FaseQuatro;