/// <reference path="../../../phaser.d.ts" />

class CheckPoint extends Phaser.GameObjects.Sprite {
  constructor(config) {
      super(config.scene, config.x, config.y, config.key);
      config.scene.physics.world.enable(this);
      config.scene.add.existing(this);
      this.body.setAllowGravity(false);
  }
}

export default CheckPoint;
