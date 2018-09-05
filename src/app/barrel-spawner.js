class BarrelSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene, config.groupConfig, config.groupMultipleConfig, config.customConfig);
        this.config = config;
    }

    createBarrelSpawner() {
        this.barrelGroup = this.config.scene.physics.add.group();

        this.queueBarrel(this.createNewBarrel, {
            speedDirection: this.config.customConfig.speedDirection, 
            barrelX: this.config.customConfig.x, 
            barrelY: this.config.customConfig.y, 
            barrelGroup: this.barrelGroup,
            colliderList: this.config.customConfig.colliders
        });
    }

    createNewBarrel(config) {
        const barril = config.barrelGroup.create(config.barrelX, config.barrelY, 'barril');
        barril.anims.play('rolling');
        barril.setVelocityX(config.speedDirection);
        this.config.scene.physics.add.collider(config.barrelGroup, [...config.colliderList], function (barrel, collider) {
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
        this.config.scene.time.addEvent({
            delay: 2000,
            repeat: -1,
            callback: callback.bind(this, ...args)
        })
    }  
}

export default BarrelSpawner;