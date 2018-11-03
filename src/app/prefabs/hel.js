/// <reference path="../../../phaser.d.ts" />

class Hel extends Phaser.GameObjects.Sprite {
  constructor(config) {
      super(config.scene, config.x, config.y, config.key);
      config.scene.physics.world.enable(this);
      config.scene.add.existing(this);
      this.setOrigin(0.5);
      this.body.setSize(this.body.sourceWidth * 0.5, this.body.height, this.body.sourceWidth * 0.5, this.height)
      this.common;
      this.body.wasTouching.none = false
      this.body.touching.none = false;
      this.config = config;
      this.setVisible(false);
      this.setActive(false);
      this.ui = config.scene.scene.get('userInterface');

      this.possibleSpawnerPoints = [
        { x: 320, y: 93, flip: false },
        { x: 563, y: 79, flip: false },
        { x: 324, y: 269, flip: false },
        { x: 184, y: 241, flip: true },
        { x: 511, y: 256, flip: false },
      ]
  }

  configureHel() {
      this.body.allowGravity = false;
      this.setDataEnabled();
      this.setData({
          onTeletransport: false,
          firingEnemy: false,
          totalLifePoints: 1000,
          currentLifePoints: 1000,
          takingDamage: false,
          powerBostActive: false,
          teletransportTime: 3000,
          currentTime: 0,
      });
      this.reespawn();
  }

  reespawn() {
    const randomPosition = this.possibleSpawnerPoints[Math.floor(Math.random() * this.possibleSpawnerPoints.length)];
    this.spawn(randomPosition.x, randomPosition.y, randomPosition.flip);
  }

  fireCrown(x, y, flip) {
    const speed = (flip) ? -50 : 50;
    this.config.scene.time.addEvent({
      delay: 1000,
      repeat: 0,
      callback: () => {
        this.config.crowSpawner.createCrow({x: x, y: y},{ x: speed, y: 0});
      }
    });
  }

  spawn(x, y, flip) {
    this.setPosition(x, y);
    this.flipX = flip;
    this.setVisible(true);
    this.setActive(true);
    this.fireCrown(x, y, flip);
    this.config.scene.time.addEvent({
      delay: 3000,
      repeat: 0,
      callback: () => {
        this.hide();
      }
    });
  }

  hide() {
    this.setVisible(false);
    this.setActive(false);
    this.config.scene.time.addEvent({
      delay: 3000,
      repeat: 0,
      callback: () => {
        this.reespawn();
      }
    });
  }
}

export default Hel;
