/// <reference path="../../../phaser.d.ts" />
import CrowSpawner from '../prefabs/crow-spawner.js';
import Hel from '../prefabs/hel.js';
import HidromelSpawner from '../prefabs/hidromel-spawner.js';

class FaseDez extends Phaser.Scene {
  constructor() {
    super({
      key: 'fasedez',
      pixelArt: true,
      physics: {
        arcade: {
          gravity: { y: 700 },
          debug: false,
          // tileBias: 120,
        }
      }
    })

    this.odin;
    this.common;
  }

  init(config) {
    this.common = this.scene.get('boot');
    this.odin = this.common.odin;
    this.scene.stop('fasenove');
    this.odin.resetSpearGroup();

    if (config) {
      this.odin.x = config.odinx;
      this.odin.y = config.odiny;
      this.odin.body.setVelocityX(0);
      this.physics.world.enable(this.odin);
    }
  }

  preload() {

  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

    var map = this.add.tilemap('fase_10');

    var tileset = map.addTilesetImage('plataformas');
    this.ground = map.createStaticLayer('plataformas', tileset);
    this.ground.setCollisionByProperty({ collider: true });
    this.physics.add.collider(this.odin, [this.ground], function () {
      this.odin.resetJump();
    }, null, this);
    const bg = this.add.image(0,0,'fase-10');
    bg.setOrigin(0);

    this.barrelSwitch = this.physics.add.staticImage(602, 33, 'switch-block');
    this.barrelSwitch.setDataEnabled();
    this.barrelSwitch.setName('switchBarrelOff');

    this.barrelSwitch.setData('barrels', [firstWave]);

    const hidromel = new HidromelSpawner({
      scene: this,
      groupConfig: {
        defaultKey: 'hidromel',
        maxSize: 1,
      },
      groupMultipleConfig: {},
      customConfig: {
        x: 321,
        y: 187,
        colliders: [this.ground],
        overlaps: [this.odin],
      }
    });
    hidromel.createSpawner();

    this.odin = this.add.existing(this.odin);

    this.crows = new CrowSpawner({
      scene: this,
      groupConfig: {
        defaultKey: 'crow',
        maxSize: 15,
      },
      groupMultipleConfig: {},
      customConfig: {
        x: 400,
        y: 300,
        bounce: {
          x: 1,
          y: 1
        },
        speedDirection: {
          x: 0,
          y: -120
        },
        colliders: [this.ground],
        overlap: this.odin,
      }
    });

    this.hel = new Hel({
      scene: this,
      x: 324,
      y: 62,
      key: 'hel',
      crowSpawner: this.crows
    });

    this.hel.configureHel();

    this.physics.add.collider(this.hel, [this.ground]);
  }

  update() {
    this.odin.checkCursorMoviment(this.common);

    if (this.odin.x >= 137 && this.odin.x <= 244 && this.odin.y > 360) {
      this.scene.start('fasenove', {
        odinx: this.odin.x,
        odiny: 0
      });
    }
  }
}

export default FaseDez;
