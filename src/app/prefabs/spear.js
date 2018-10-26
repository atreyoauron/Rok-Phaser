/// <reference path="../../../phaser.d.ts" />

class SpearSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene, config.groupConfig, config.groupMultipleConfig, config.customConfig);
        this.config = config;
        this.spearGroup;
    }

    createSpearGroup(scene) {
        this.spearGroup = scene.physics.add.group();
    }

    createNewSpear(config) {
        const spear = this.spearGroup.create(config.x, config.y, 'tridente');
        const itens = config.odin.getData('itens');

        if (config.speedDirection.x < 0) {
            spear.flipX = true;
        } else {
            spear.flipX = false;
        }
        spear.setVelocity(config.speedDirection.x, config.speedDirection.y);
        spear.body.setAllowGravity(false);
        spear.setOrigin(0.5);
        spear.body.setSize(spear.body.sourceWidth * 0.5, spear.body.sourceHeight * 0.5, spear.body.sourceWidth * 0.5, spear.body.sourceHeight * 0.5)
        spear.anims.play('lancando');

        if(itens.armor) {
            this.queueBarrel(this.kill, spear, config.scene, 3000);
        } else {
            this.queueBarrel(this.kill, spear, config.scene);
        }

        config.scene.physics.add.collider(this.spearGroup, [...config.colliderList], function (firstCollider, collider) {
            if (firstCollider.name === "switchBarrelOff") {
                const barrels = firstCollider.getData('barrels');
                barrels.forEach(barrel => {
                    barrel.destroySpawner();
                });

                firstCollider.setTint(0x00ff00);
                firstCollider.setScale(0.9);
                collider.destroy();
                return
            }

            if (firstCollider.body.onWall()) {
                this.kill(firstCollider);
                return;
            }

            if(firstCollider.body.touching.left || firstCollider.body.touching.right) {
                collider.setDataEnabled();
                collider.setData({hit: true});
                firstCollider.destroy();
            }
        }, null, this);
    }

    kill(crow) {
        crow.destroy();
    }

    queueBarrel(callback, crow, scene, timing = 400) {
        scene.time.addEvent({
            delay: timing,
            callback: callback.bind(this, crow)
        })
    }
}

export default SpearSpawner;
