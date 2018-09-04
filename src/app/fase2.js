/// <reference path="../../phaser.d.ts" />

class FaseDois extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasedois',
            physics: {
                arcade: {
                    gravity: { y: 700 }
                }
            }
        })

        this.odin;
        this.common;
    }

    init(config) {
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

    preload() {}

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

        const barril = this.physics.add.sprite(630, 20, 'barril');
        barril.anims.play('rolling');
        barril.setVelocityX(-120);

        this.physics.add.collider(barril, [this.ground], function() {
            if (barril.anims.currentAnim.key !== 'barril-exploding') {
                if(barril.body.onWall()) {
                    barril.setVelocityX(0);
                    barril.anims.play('barril-exploding');
                    barril.on('animationcomplete', function(animation, frame) {
                        console.log(animation);
                        console.log(frame);

                        if (animation.key == 'barril-exploding') {
                            barril.setX(630);
                            barril.setY(0);
                            barril.anims.play('rolling');
                            barril.setVelocityX(-120);
                        };
                    });
                }
            }
        });
        this.physics.add.collider(this.odin, barril, function() {
            barril.setVelocityX(0);
            barril.anims.play('barril-exploding');
        });

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