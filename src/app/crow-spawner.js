/// <reference path="../../phaser.d.ts" />

class CrowSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene, config.groupConfig, config.groupMultipleConfig, config.customConfig);
        this.config = config;
    }

    createCrow() {
        this.crowGroup = this.config.scene.physics.add.group();

        this.createNewCrow({
            speedDirection: this.config.customConfig.speedDirection, 
            bounce: this.config.customConfig.bounce,
            x: this.config.customConfig.x, 
            y: this.config.customConfig.y, 
            crowGroup: this.crowGroup,
            colliderList: this.config.customConfig.colliders
        });
    }

    createNewCrow(config) {
        console.log(config);

        const crow = config.crowGroup.create(config.x, config.y, 'barril');
        crow.anims.play('rolling');
        crow.setVelocity(config.speedDirection.x, config.speedDirection.y);
        crow.setBounce(config.bounce.x, config.bounce.y);
        crow.body.setAllowGravity(false);

        this.config.scene.physics.add.collider(config.crowGroup, [...config.colliderList], function (crow, collider) {
            if (crow.anims.currentAnim.key !== 'barril-exploding') {
                if (crow.body.onWall()) {
                    this.kill(crow);
                    return;
                }    
                console.log(crow.body.touching);

                if(crow.body.touching.top) {
                    console.log('touching top');
                }

                if(crow.body.touching.left || crow.body.touching.right) {
                    this.kill(collider);
                    return;
                }
            }            
        }, null, this);
    }

    kill(crow) {
        crow.anims.play('barril-exploding');      
        crow.on('animationcomplete', function (animation, frame) {
            if (animation.key == 'barril-exploding') {
                crow.destroy();
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

export default CrowSpawner;