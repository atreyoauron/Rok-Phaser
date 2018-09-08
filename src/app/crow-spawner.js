/// <reference path="../../phaser.d.ts" />

class CrowSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene, config.groupConfig, config.groupMultipleConfig, config.customConfig);
        this.config = config;
        this.crowGroup;
    }

    createCrow(position, direction) {
        if(!this.crowGroup) {
            console.log('criando novo grupo');
            this.crowGroup = this.config.scene.physics.add.group();
        }

        this.createNewCrow({
            speedDirection: direction, 
            bounce: this.config.customConfig.bounce,
            x: position.x, 
            y: position.y, 
            crowGroup: this.crowGroup,
            colliderList: this.config.customConfig.colliders
        });
    }

    createNewCrow(config) {
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