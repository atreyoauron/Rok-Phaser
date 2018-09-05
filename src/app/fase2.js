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
        this.barrelGroup;
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
    
        this.createBarrelSpawner(-120, 630, 0, [this.ground, this.odin]);
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

    createBarrelSpawner(speedDirection, barrelX, barrelY, colliderList) {
        const barrelGroup = this.physics.add.group();
        
        this.queueBarrel(this.createNewBarrel, {
            speedDirection: speedDirection, 
            barrelX: barrelX, 
            barrelY: barrelY, 
            barrelGroup: barrelGroup, 
            colliderList: colliderList
        });
    }

    createNewBarrel(config) {
        const barril = config.barrelGroup.create(config.barrelX, config.barrelY, 'barril');
        barril.anims.play('rolling');
        barril.setVelocityX(config.speedDirection);
        this.physics.add.collider(config.barrelGroup, [...config.colliderList], function (barrel, collider) {
            barrel.body.setGravityY(0);
            if (barrel.anims.currentAnim.key !== 'barril-exploding') {
                if (barrel.body.onWall()) {
                    this.killBarrel(barrel);
                    return;
                }
                
                if(barrel.body.touching.left || barrel.body.touching.right) {
                    this.killBarrel(collider);
                    return;
                }
            }            
        }, null, this);
    }

    killBarrel(barrel) {
        barrel.body.setVelocityX(0);
        barrel.anims.play('barril-exploding');      
        barrel.on('animationcomplete', function (animation, frame) {
            if (animation.key == 'barril-exploding') {
                barrel.destroy();
            };
        });    
    }

    queueBarrel(callback, ...args) {
        this.time.addEvent({
            delay: 2000,
            repeat: -1,
            callback: callback.bind(this, ...args)
        })
    }            
}

export default FaseDois;