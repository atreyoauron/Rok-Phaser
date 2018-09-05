/// <reference path="../../phaser.d.ts" />

class BarrelSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture);
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