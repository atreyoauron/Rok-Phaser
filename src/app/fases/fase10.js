/// <reference path="../../../phaser.d.ts" />
import CrowSpawner from '../prefabs/crow-spawner.js';
import Hel from '../prefabs/hel.js';
import HidromelSpawner from '../prefabs/hidromel-spawner.js';
import BarrelSpawner from '../prefabs/barrel-spawner.js';

class FaseDez extends Phaser.Scene {
  constructor() {
    super({
      key: 'fasedez',
      pixelArt: true,
      physics: {
        arcade: {
          gravity: {
            y: 700
          },
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
    this.ground.setCollisionByProperty({
      collider: true
    });
    this.physics.add.collider(this.odin, [this.ground], function () {
      this.odin.resetJump();
    }, null, this);
    const bg = this.add.image(0, 0, 'fase-10');
    bg.setOrigin(0);

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


    this.firstSwitchWall = this.physics.add.staticGroup([
      this.physics.add.staticSprite(56, 224, 'breakable-wall'),
      this.physics.add.staticSprite(56, 240, 'breakable-wall'),
      this.physics.add.staticSprite(56, 256, 'breakable-wall'),
    ]);

    this.secondSwitchWall = this.physics.add.staticGroup([
      this.physics.add.staticSprite(56, 116, 'breakable-wall'),
      this.physics.add.staticSprite(56, 132, 'breakable-wall'),
      this.physics.add.staticSprite(56, 148, 'breakable-wall'),
    ]);

    this.thirdSwitchWall = this.physics.add.staticGroup([
      this.physics.add.staticSprite(570, 50, 'breakable-wall'),
      this.physics.add.staticSprite(570, 66, 'breakable-wall'),
      this.physics.add.staticSprite(570, 82, 'breakable-wall'),
    ]);

    this.fourthSwitchWall = this.physics.add.staticGroup([
      this.physics.add.staticSprite(570, 224, 'breakable-wall'),
      this.physics.add.staticSprite(570, 240, 'breakable-wall'),
      this.physics.add.staticSprite(570, 256, 'breakable-wall'),
    ]);

    const barrelOne = new BarrelSpawner({
      scene: this,
      groupConfig: {
        defaultKey: 'barril',
        maxSize: 2,
      },
      groupMultipleConfig: {},
      customConfig: {
        x: 0,
        y: 270,
        speedDirection: 120,
        colliders: [this.ground, this.firstSwitchWall, this.secondSwitchWall, this.thirdSwitchWall, this.fourthSwitchWall],
        overlaps: [this.odin],
      }
    });


    const barrelTwo = new BarrelSpawner({
      scene: this,
      groupConfig: {
        defaultKey: 'barril',
        maxSize: 2,
      },
      groupMultipleConfig: {},
      customConfig: {
        x: 640,
        y: 270,
        speedDirection: -120,
        colliders: [this.ground, this.firstSwitchWall, this.secondSwitchWall, this.thirdSwitchWall, this.fourthSwitchWall],
        overlaps: [this.odin],
      }
    });


    const barrelThree = new BarrelSpawner({
      scene: this,
      groupConfig: {
        defaultKey: 'barril',
        maxSize: 2,
      },
      groupMultipleConfig: {},
      customConfig: {
        x: 0,
        y: 206,
        speedDirection: 120,
        colliders: [this.ground, this.firstSwitchWall, this.secondSwitchWall, this.thirdSwitchWall, this.fourthSwitchWall],
        overlaps: [this.odin],
      }
    });

    const barrelFour = new BarrelSpawner({
      scene: this,
      groupConfig: {
        defaultKey: 'barril',
        maxSize: 2,
      },
      groupMultipleConfig: {},
      customConfig: {
        x: 640,
        y: 206,
        speedDirection: -120,
        colliders: [this.ground, this.firstSwitchWall, this.secondSwitchWall, this.thirdSwitchWall, this.fourthSwitchWall],
        overlaps: [this.odin],
      }
    });



    barrelOne.createBarrelSpawner();
    barrelTwo.createBarrelSpawner();
    barrelThree.createBarrelSpawner();
    barrelFour.createBarrelSpawner();

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
        colliders: [this.ground, this.firstSwitchWall, this.secondSwitchWall, this.thirdSwitchWall, this.fourthSwitchWall],
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

    this.helSwitch = this.physics.add.staticGroup([
      this.physics.add.staticImage(596, 66, 'alvo'),
      this.physics.add.staticImage(596, 240, 'alvo'),
      this.physics.add.staticImage(35, 132, 'alvo'),
      this.physics.add.staticImage(35, 240, 'alvo'),
    ]);

    this.helSwitch.children.each(function (child) {
      child.setDataEnabled();
      child.setName('hel-weak-points');
      child.setData('hel', this.hel);
    }, this);

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
