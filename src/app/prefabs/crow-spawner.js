/// <reference path="../../../phaser.d.ts" />

class CrowSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene, config.groupConfig, config.groupMultipleConfig, config.customConfig);
        this.config = config;
        this.crowGroup;
    }

    createCrow(position, direction, bounce) {
        if (!this.crowGroup) {
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

    getTheFirstPixel(tileGroup, tile) {
        const hasTileAt = tileGroup.hasTileAt(tile.x, tile.y - 1);
        const newTile = tileGroup.getTileAt(tile.x, tile.y - 1);


        if (!hasTileAt || !newTile.properties || !newTile.properties.breakable) {
            return tile;
        }

        return this.getTheFirstPixel(tileGroup, newTile);
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

        this.config.scene.physics.add.overlap(config.crowGroup, [config.crowGroup], function (crow, crowOverlap) {
            if (crow.anims.currentAnim.key === 'big-explosion') {
                this.kill(crowOverlap);
            }

            if (crow.anims.currentAnim.key !== 'big-explosion') {                
                if (crow.getData('hit')) {
                    if (!crowOverlap.getData('hit')) {
                        crowOverlap.setData('hit', true);

                        if (crow.body.touching.left) {
                            crowOverlap.body.setVelocityX(-120);
                        }
                        if (crow.body.touching.right) {
                            crowOverlap.body.setVelocityX(120);
                        }
                    }

                }
            }
        }, null, this);

        this.config.scene.physics.add.collider(config.crowGroup, [...config.colliderList], function (crow, collider) {
            if (crow.body.onWall() && crow.getData('hit')) {
                crow.body.setVelocity(0);
                this.kill(crow);
            } 


            if (collider && collider.visible) {
                if (collider.properties && collider.properties.breakable) {
                    const tile = this.getTheFirstPixel(config.colliderList[0], collider);

                    const tiles = config.colliderList[0].getTilesWithinWorldXY(tile.pixelX, tile.pixelY, 15, 135, {
                        isNotEmpty: true
                    });

                    tiles.forEach((data, index) => {
                        if (data.properties && data.properties.breakable) {
                            config.colliderList[0].removeTileAt(data.x, data.y);
                        }
                    })
                }
            }
        }, null, this);
    }

    kill(crow) {
        crow.body.setSize(128, 128, 128, 128);
        crow.anims.play('big-explosion', true);

        crow.on('animationcomplete', function (animation, frame) {
            if (animation.key == 'big-explosion') {
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