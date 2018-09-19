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
        const crow = config.crowGroup.create(config.x, config.y, 'crow');
        crow.body.setSize(crow.body.sourceWidth * 0.5, crow.body.height, crow.body.sourceWidth * 0.5, crow.body.height)
        crow.anims.play('crow-flying');
        crow.setVelocity(config.speedDirection.x, config.speedDirection.y);
        crow.setBounce(config.bounce.x, config.bounce.y);
        crow.setGravityY(-700);
        crow.setName('crow');
        crow.setMaxVelocity(400, 400);

        this.config.scene.physics.add.collider(config.crowGroup, [...config.colliderList, config.crowGroup], function (crow, collider) {
            if (collider && collider.visible) {
                if(collider.properties && collider.properties.breakable) {
                    const tiles = config.colliderList[0].getTilesWithin(collider.x, collider.y, 100, 100);
                    tiles.forEach(data => {
                        if(data.properties && data.properties.breakable) {
                            config.colliderList[0].removeTileAt(data.x, data.y);
                        }
                    })
                }
            }

            if (crow.anims.currentAnim.key !== 'explosion') {
                console.log(crow.getData('hit'));
                if (crow.body.onWall() && crow.getData('hit')) {
                    // crow.setVelocityX(0);
                    crow.setGravityY(-400);
                    this.kill(crow);
                    return;
                }
            }            
        }, function(obj1, obj2) {
            if(obj1.name === obj2.name) {
                if(obj1.data || obj2.data) {                    
                    if(obj1.anims.currentAnim.key === 'explosion') {
                        this.kill(obj2);
                        return false;
                    }

                    if(obj1.getData('hit')) {
                        obj2.setDataEnabled();
                        obj2.setData({hit: true});    
                    }
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
        crow.anims.play('explosion');      
        crow.on('animationcomplete', function (animation, frame) {
            if (animation.key == 'explosion') {
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