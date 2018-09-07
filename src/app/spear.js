/// <reference path="../../phaser.d.ts" />

class SpearSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene, config.groupConfig, config.groupMultipleConfig, config.customConfig);
        this.config = config;
        this.spearGroup;
    }

    createSpearGroup(scene) {
        this.spearGroup = scene.physics.add.group();
    }

    createNewCrow(config) {
        const crow = this.spearGroup.create(config.x, config.y, 'tridente');
        if (config.speedDirection.x < 0) {
            crow.flipX = true;  
        } else {
            crow.flipX = false;
        }
        crow.setVelocity(config.speedDirection.x, config.speedDirection.y);
        crow.body.setAllowGravity(false);
        crow.setOrigin(0.5);
        crow.body.setSize(crow.body.sourceWidth * 0.5, crow.body.sourceHeight * 0.5, crow.body.sourceWidth * 0.5, crow.body.sourceHeight * 0.5)
        crow.anims.play('lancando');
        this.queueBarrel(this.kill, crow, config.scene);

        config.scene.physics.add.collider(this.spearGroup, [...config.colliderList], function (crow, collider) {
            if (crow.body.onWall()) {
                this.kill(crow);
                return;
            }

            if (crow.body.touching.left || crow.body.touching.right) {
                this.kill(collider);
                return;
            }
        }, null, this);
    }

    kill(crow) {
        crow.destroy();
    }

    queueBarrel(callback, crow, scene) {
        scene.time.addEvent({
            delay: 400,
            callback: callback.bind(this, crow)
        })
    }
}

export default SpearSpawner;