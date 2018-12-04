/// <reference path="../../../phaser.d.ts" />

class VikingPedia extends Phaser.Physics.Arcade.Image {
  constructor(config) {
      super(config.scene, config.x, config.y, config.texture);
  }


  create() {
    console.log('created');
  }
}

export default VikingPedia;
