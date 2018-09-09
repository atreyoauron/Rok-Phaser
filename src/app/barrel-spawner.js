/// <reference path="../../phaser.d.ts" />

class BarrelSpawner extends Phaser.GameObjects.Group {
    constructor(config) {
        super(config.scene, config.groupConfig, config.groupMultipleConfig, config.customConfig);
        this.config = config;
    }

    createBarrelSpawner() {
        this.barrelGroup = this.config.scene.physics.add.group();
        this.barrelGroup.maxSize = this.config.groupConfig.maxSize;

        this.config.scene.time.addEvent({
            delay: 1,
            repeat: -1,
            callback: () => {
                this.barrelGroup.getChildren().forEach(data => {
                    if (data.body.x > 640 || data.body.y > 360) {
                        this.killBarrel(data, this.barrelGroup);
                    }
                });                
            }
        })        

        this.queueBarrel(this.config.customConfig.timing, this.createNewBarrel, {
            speedDirection: this.config.customConfig.speedDirection,
            barrelX: this.config.customConfig.x,
            barrelY: this.config.customConfig.y,
            barrelGroup: this.barrelGroup,
            colliderList: this.config.customConfig.colliders,
            overlapList: this.config.customConfig.overlaps
        });
    }

    createNewBarrel(config) {
        const barril = this.barrelGroup.getFirstDead(true, config.barrelX, config.barrelY, 'barril');
        if (barril === null) return;

        barril.active = true;
        barril.visible = true;

        if (barril) {
            barril.anims.play('rolling');
            barril.setVelocityX(config.speedDirection);

            if (config.speedDirection > 0) {
                barril.flipX = true;
            }

            this.config.scene.physics.add.overlap(config.barrelGroup, [...config.overlapList], function (collider, barrel) {
                if (barrel.anims.currentAnim.key !== 'explosion') {
                    if (barrel.body.touching.left || barrel.body.touching.right || barrel.body.touching.up) {
                        this.killBarrel(barrel, config.barrelGroup);
                        return;
                    }
                }
            }, null, this);

            this.config.scene.physics.add.collider(config.barrelGroup, [...config.colliderList], function (barrel, collider) {
                if (barrel.anims.currentAnim.key !== 'explosion') {
                    if (barrel.body.onWall()) {
                        this.killBarrel(barrel, config.barrelGroup);
                        return;
                    }
                }
            }, null, this);
        }
    }

    killBarrel(barrel, group) {
        barrel.body.setVelocityX(0);
        barrel.anims.play('explosion');
        barrel.on('animationcomplete', function (animation, frame) {
            if (animation.key == 'explosion') {
                group.killAndHide(barrel);
            };
        });
    }

    queueBarrel(timing = 2000, callback, ...args) {
        this.config.scene.time.addEvent({
            delay: timing,
            repeat: -1,
            callback: callback.bind(this, ...args)
        })
    }
}

export default BarrelSpawner;