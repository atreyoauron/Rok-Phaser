/// <reference path="../../phaser.d.ts" />

class HidromelSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.world, config.scene, config.children, config.customConfig);

        
    }
}