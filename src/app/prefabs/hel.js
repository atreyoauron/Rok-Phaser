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

      this.currentIndex = 0;
      this.possibleSpawnerPoints = [
        { x: 94, y: 135, flip: true },
        { x: 513, y: 57, flip: false },
        { x: 521, y: 240, flip: false },
        { x: 94, y: 240, flip: true },
      ]
  }

  configureHel() {
      this.body.allowGravity = false;
      this.setDataEnabled();
      this.setData({
          dead: false,
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
    if (this.currentIndex > this.possibleSpawnerPoints.length - 1) {
      this.currentIndex = 0;
    }
    const randomPosition = this.possibleSpawnerPoints[this.currentIndex];
    this.spawn(randomPosition.x, randomPosition.y, randomPosition.flip);
    this.currentIndex++;
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

  reduceHelLifePoints() {
    console.log('hitting hel');
    let updatedLifePoints = this.getData('currentLifePoints') - 250;
    let porcentagem;
    this.setData('currentLifePoints', updatedLifePoints);
    porcentagem = (this.getData('currentLifePoints') * 100) / this.getData('totalLifePoints');
    if (porcentagem <= 0) {
      this.killHel();
    }
  }

  killHel() {
    this.config.crowSpawner.destroyGroup();
    this.setData('dead', true);
    this.config.scene.cameras.main.fadeOut(1000, 0, 0, 0);
    this.config.scene.cameras.main.once('camerafadeoutcomplete', function (camera) {
      this.config.scene.scene.stop('userInterface');
      const userInterface = this.scene.scene.get('userInterface')
      userInterface.sound.stopAll();
      this.config.scene.scene.stop('fasedez');

      const finalVideo = document.getElementById('finalVideo');
      finalVideo.style.display = 'block';
      finalVideo.play();

      finalVideo.addEventListener('ended',iniciarCreditos.bind(this),false);
      function iniciarCreditos(e) {
          finalVideo.style.display = 'none';
          this.config.scene.scene.start('MainMenu');
      }

    }, this);
  }

  spawn(x, y, flip) {
    if(this.getData('dead')) {
      return;
    }

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
