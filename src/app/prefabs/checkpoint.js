/// <reference path="../../../phaser.d.ts" />

class CheckPoint extends Phaser.GameObjects.Sprite {
  constructor(config) {
      super(config.scene, config.x, config.y, config.key);
      config.scene.physics.world.enable(this);
      config.scene.add.existing(this);
      this.body.setAllowGravity(false);
      this.setFrame(1);
  }

  getCheckpoint(uiscene, positionx, positiony, scenekey) {
    this.setFrame(0);
    uiscene.getCheckpoint(
      positionx,
      positiony,
      scenekey);
    uiscene.events.emit('damageTaken', 0);
  }
}

export default CheckPoint;
