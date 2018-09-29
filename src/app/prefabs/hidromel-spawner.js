/// <reference path="../../../phaser.d.ts" />

class HidromelSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene, config.groupConfig, config.groupMultipleConfig, config.customConfig);
        this.config = config;
        this.ui = this.config.scene.scene.get('userInterface');
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
    }

    createSpawner() {
        
        this.hidroGroup = this.config.scene.physics.add.group();
        this.hidroGroup.maxSize = this.config.groupConfig.maxSize;

        this.config.scene.time.addEvent({
            delay: 2000,
            repeat: -1,
            callback: this.createHidromel.bind(this)
        });

        this.config.scene.physics.add.collider(this.hidroGroup, [...this.config.customConfig.colliders]);     
    }

    createHidromel(config) {
        const hidro = this.hidroGroup.getFirstDead(true, this.config.customConfig.x, this.config.customConfig.y, 'hidromel');
        if (hidro === null) return;
        hidro.active = true;
        hidro.visible = true;

        hidro.body.setGravityY(-670);
        this.config.scene.physics.add.overlap(hidro, [...this.config.customConfig.overlaps], function (group, collider) {
            this.ui.getPowerBoost(100);
            this.hidroGroup.killAndHide(group);
        }, null, this);           

    }
}

export default HidromelSpawner;