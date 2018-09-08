/// <reference path="../../phaser.d.ts" />

class FaseQuatro extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasecinco',
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
        this.scene.stop('fasequatro');
        
        if (config) {
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
            this.physics.world.enable(this.odin);
        }
    }

    preload() {

    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

        var map = this.add.tilemap('fase_5');

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

        if (this.odin.x >= 328 && this.odin.x <= 394 && this.odin.y < 0) {
            this.scene.start('faseseis', {
                odinx: 344,
                odiny: 310 - this.odin.y * 2
            });
        }
        
        if (this.odin.x > 636) {
            this.scene.start('faseum', {
                odinx: this.odin.width,
                odiny: this.odin.y
            });
        }

        if (this.odin.x >= 10 && this.odin.x <= 120 && this.odin.y > 360) {
            this.scene.start('faseoito', {
                odinx: this.odin.x,
                odiny: 0
            });
        }
    }
}

export default FaseQuatro;