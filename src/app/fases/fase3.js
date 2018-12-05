/// <reference path="../../../phaser.d.ts" />
import BarrelSpawner from '../prefabs/barrel-spawner.js';

class FaseTres extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasetres',
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
        this.scene.stop('fasedois');
        this.odin.resetSpearGroup();

        if (config) {
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
            this.physics.world.enable(this.odin);
        }
    }

    preload() {

    }

    create() {
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

        var map = this.add.tilemap('fase_3');

        const bg = this.add.image(0,0,'fundo_meio');
        bg.setOrigin(0);
        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);
        this.ground.setAlpha(0);

        this.input.keyboard.on('keydown_T', function () {
          this.ground.setAlpha(1);
        }, this);

        this.input.keyboard.on('keydown_U', function () {
          this.ground.setAlpha(0);
        }, this);

        this.ground.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.odin, [this.ground], function() {
            this.odin.resetJump();
        }, null, this);

        this.odin = this.add.existing(this.odin);

        const barrelOne = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 1,
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 0,
                y: 71,
                timing: 0,
                speedDirection: 120,
                colliders: [this.ground],
                overlaps: [this.odin],
            }
        });
        const barrelTwo = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 1,
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 130,
                y: 0,
                timing: 0,
                speedDirection: 120,
                colliders: [this.ground],
                overlaps: [this.odin],
            }
        });

        if (!checkIfExists('Asgard')) {
          const asgardPedia = this.physics.add.staticImage(383, 115, 'vikingpedia');
          asgardPedia.setDataEnabled();
          asgardPedia.setData('jaPegou', false);

          this.physics.add.overlap(asgardPedia, this.odin, function() {
            if (!asgardPedia.getData('jaPegou')) {
              this.sound.play('Pegar_item');
              setNewTopic('Asgard');
              asgardPedia.setData('jaPegou', true);
              asgardPedia.setVisible(false);
            }
          }, null, this);
        }

        if (!checkIfExists('Vidar')) {
          const vidarPedia = this.physics.add.staticImage(291, 213, 'vikingpedia');
          vidarPedia.setDataEnabled();
          vidarPedia.setData('jaPegou', false);

          this.physics.add.overlap(vidarPedia, this.odin, function() {
            if (!vidarPedia.getData('jaPegou')) {
              this.sound.play('Pegar_item');
              setNewTopic('Vidar');
              vidarPedia.setData('jaPegou', true);
              vidarPedia.setVisible(false);
            }
          }, null, this);
        }

        barrelOne.createBarrelSpawner();
        barrelTwo.createBarrelSpawner();
    }

    update() {
        this.odin.checkCursorMoviment(this.common);

        if (this.odin.x >= 636) {
            this.scene.start('fasequatro', {
                odinx: 20,
                odiny: this.odin.y - 5
            });
        } else if (this.odin.x <= 14) {
            this.scene.start('fasedois', {
                odinx: 640 - this.odin.width - 20,
                odiny: this.odin.y
            });
        }
    }
}

export default FaseTres;
