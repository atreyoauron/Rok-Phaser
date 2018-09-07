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
            crow.flipX = false;
        } else {
            crow.flipX = true;  
        }
        crow.setVelocity(config.speedDirection.x, config.speedDirection.y);
        crow.body.setAllowGravity(false);
        crow.setOrigin(0.5);
        crow.body.setSize(crow.body.sourceWidth * 0.5, crow.body.height, crow.body.sourceWidth * 0.5, crow.height)

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
        console.log(crow);
        console.log('killing');
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