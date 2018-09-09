/// <reference path="../../phaser.d.ts" />

class CrowSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene, config.groupConfig, config.groupMultipleConfig, config.customConfig);
        this.config = config;
        this.crowGroup;
    }

    createCrow(position, direction, bounce) {
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
        crow.setName('crow');
        crow.setMaxVelocity(400, 400);

        this.config.scene.physics.add.collider(config.crowGroup, [...config.colliderList, config.crowGroup], function (crow, collider) {
            if (collider && collider.visible) {
                if(collider.properties && collider.properties.breakable) {
                    const tiles = config.colliderList[0].getTilesWithin(collider.x, collider.y, 100, 100);
                    console.log(config.colliderList[0]);
                    tiles.forEach(data => {
                        if(data.properties && data.properties.breakable) {
                            config.colliderList[0].removeTileAt(data.x, data.y);
                        }
                    })
                }
            }

            if (crow.anims.currentAnim.key !== 'barril-exploding') {
                if (crow.body.onWall() && crow.data) {
                    // crow.setVelocityX(0);
                    this.kill(crow);
                    return;
                }

                // if(crow.body.touching.left || crow.body.touching.right) {
                //     this.kill(collider);
                //     return;
                // }
            }            
        }, function(obj1, obj2) {
            if(obj1.name === obj2.name) {
                if(obj1.data || obj2.data) {                    
                    if(obj1.anims.currentAnim.key === 'barril-exploding') {
                        this.kill(obj2);
                        return false;
                    }

                    obj1.setDataEnabled();
                    obj1.setData({hit: true});
                    obj2.setDataEnabled();
                    obj2.setData({hit: true});
                    obj1.setBounce(0, 0);
                    obj2.setBounce(0, 0);
                    obj2.body.speed = obj1.body.speed;
                    obj2.body.velocity = obj1.body.velocity;
                    return false;
                } else {
                    return false;
                }
            }
            if (obj2.body && obj2.body.speed > obj1.body.speed)
            {
                return false;
            }
            else
            {
                return true;
            }
        }, this);
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