/// <reference path="../../../phaser.d.ts" />
import CrowSpawner from '../prefabs/crow-spawner.js';
import CheckPoint from '../prefabs/checkpoint.js';

class FaseSete extends Phaser.Scene {
  constructor() {
    super({
      key: 'fasesete',
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
    this.ui = this.scene.get('userInterface');
    this.ui.events.emit('damageTaken', 0);

    this.odin = this.common.odin;
    this.scene.stop('faseseis');
    this.odin.resetSpearGroup();

    if (config) {
      this.odin.x = config.odinx;
      this.odin.y = config.odiny;
      this.physics.world.enable(this.odin);
      this.odin.resetSpearGroup();
    }
  }

  preload() {

  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

    var map = this.add.tilemap('fase_7');

    var tileset = map.addTilesetImage('plataformas');
    this.ground = map.createDynamicLayer('plataformas', tileset);
    this.ground.setCollisionByProperty({
      collider: true
    });

    const bg = this.add.image(0,0,'fase-7');
    bg.setOrigin(0);

    const checkpoint = new CheckPoint({
      scene: this,
      x: 494,
      y: 142,
      key: 'checkpoint'
    });
    this.odin = this.add.existing(this.odin);
    this.breakableWall = this.physics.add.staticGroup([
      this.physics.add.staticSprite(495, 195, 'breakable-wall'),
      this.physics.add.staticSprite(495, 211, 'breakable-wall'),
      this.physics.add.staticSprite(495, 227, 'breakable-wall')
    ]);

    this.physics.add.collider(this.odin, [this.ground, this.breakableWall], function () {
      this.odin.resetJump();
    }, null, this);

    const spearItem = this.physics.add.staticImage(565, 213, 'item_lanca');

    this.physics.add.overlap(this.odin, spearItem, function (odin, spear) {
      this.odin.getSpear();
      spear.destroy();
    }, null, this);

    this.crows = new CrowSpawner({
      scene: this,
      groupConfig: {
        defaultKey: 'barril',
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
          y: 0
        },
        colliders: [this.ground, this.breakableWall],
        overlap: this.odin,
      }
    });

    this.crows.createCrow({
      x: 530,
      y: 214
    }, {
      x: 0,
      y: 50
    });

    this.crows.createCrow({
      x: 300,
      y: 320
    }, {
      x: 0,
      y: 50
    });
    this.crows.createCrow({
      x: 330,
      y: 300
    }, {
      x: 0,
      y: 50
    });
    this.crows.createCrow({
      x: 360,
      y: 280
    }, {
      x: 0,
      y: 50
    });
    this.crows.createCrow({
      x: 400,
      y: 260
    }, {
      x: 0,
      y: 50
    });

    this.crows.createCrow({
      x: 25,
      y: 280
    }, {
      x: -50,
      y: 0
    });
    this.crows.createCrow({
      x: 120,
      y: 300
    }, {
      x: 50,
      y: 0
    });

    this.crows.createCrow({
      x: 120,
      y: 67
    }, {
      x: -50,
      y: 0
    });
    this.crows.createCrow({
      x: 160,
      y: 100
    }, {
      x: 50,
      y: 0
    });

    this.crows.createCrow({
      x: 280,
      y: 60
    }, {
      x: -50,
      y: 0
    });
    this.crows.createCrow({
      x: 410,
      y: 60
    }, {
      x: 50,
      y: 0
    });

    this.crows.createCrow({
      x: 280,
      y: 90
    }, {
      x: -50,
      y: 0
    });
    this.crows.createCrow({
      x: 410,
      y: 90
    }, {
      x: 50,
      y: 0
    });

    if (!checkIfExists('Lif e Lífthrasir')) {
      const LifPedia = this.physics.add.staticImage(349, 70, 'vikingpedia');
      LifPedia.setDataEnabled();
      LifPedia.setData('jaPegou', false);

      this.physics.add.overlap(LifPedia, this.odin, function() {
        if (!LifPedia.getData('jaPegou')) {
          this.sound.play('Pegar_item');
          setNewTopic('Lif e Lífthrasir');
          LifPedia.setData('jaPegou', true);
          LifPedia.setVisible(false);
        }
      }, null, this);
    }

    if (!checkIfExists('Gungnir')) {
      const GungnirPedia = this.physics.add.staticImage(602, 210, 'vikingpedia');
      GungnirPedia.setDataEnabled();
      GungnirPedia.setData('jaPegou', false);

      this.physics.add.overlap(GungnirPedia, this.odin, function() {
        if (!GungnirPedia.getData('jaPegou')) {
          this.sound.play('Pegar_item');
          setNewTopic('Gungnir');
          GungnirPedia.setData('jaPegou', true);
          GungnirPedia.setVisible(false);
        }
      }, null, this);
    }

    this.physics.add.overlap(this.odin, checkpoint, (over1, over2) => {
      checkpoint.getCheckpoint(this.ui, 511, 144, 'fasesete');
    }, null, this);
  }

  update() {
    this.odin.checkCursorMoviment(this.common);

    if (this.odin.x >= 568 && this.odin.x <= 640 && this.odin.y > 360) {
      this.scene.start('faseseis', {
        odinx: this.odin.x,
        odiny: 0
      });
    }
  }
}

export default FaseSete;
