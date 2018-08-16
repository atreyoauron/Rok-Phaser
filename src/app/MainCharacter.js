class MainCharacter extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        console.log(this);
        this.body.setVelocity(0, 0).setBounce(0.2).setCollideWorldBounds(true);
    }
}

export default MainCharacter;