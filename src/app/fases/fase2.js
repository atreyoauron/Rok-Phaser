/// <reference path="../../../phaser.d.ts" />
import BarrelSpawner from '../prefabs/barrel-spawner.js';

class FaseDois extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasedois',
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
        this.barrelGroup;
    }

    init(config) {
        this.common = this.scene.get('boot');
        this.odin = this.common.odin;
        this.scene.stop('faseum');
        this.odin.resetSpearGroup();

        if (config) {
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
            this.physics.world.enable(this.odin);
        }
    }

    preload() { }

    create() {
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

        var map = this.add.tilemap('fase_2');
        const bg = this.add.image(0,0,'fundo_esquerda');
        bg.setOrigin(0);

        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);
        this.ground.setCollisionByProperty({ collider: true });
        this.ground.setAlpha(0);

        this.input.keyboard.on('keydown_T', function () {
          this.ground.setAlpha(1);
        }, this);

        this.input.keyboard.on('keydown_U', function () {
          this.ground.setAlpha(0);
        }, this);

        this.physics.add.collider(this.odin, [this.ground], function() {
            this.odin.resetJump();
        }, null, this);
        this.odin = this.add.existing(this.odin);

        const barrelOne = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 2,
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 645,
                y: 71,
                speedDirection: -120,
                colliders: [this.ground],
                overlaps: [this.odin],
            }
        });

        if (!checkIfExists('Midgard')) {
          const midgardPedia = this.physics.add.staticImage(255, 10, 'vikingpedia');
          midgardPedia.setDataEnabled();
          midgardPedia.setData('jaPegou', false);

          this.physics.add.overlap(midgardPedia, this.odin, function() {
            if (!midgardPedia.getData('jaPegou')) {
              this.sound.play('Pegar_item');
              setNewTopic('Midgard');
              midgardPedia.setData('jaPegou', true);
              midgardPedia.setVisible(false);
            }
          }, null, this);
        }

        if (!checkIfExists('Hugin e Munin')) {
          const huginPedia = this.physics.add.staticImage(280, 210, 'vikingpedia');
          huginPedia.setDataEnabled();
          huginPedia.setData('jaPegou', false);

          this.physics.add.overlap(huginPedia, this.odin, function() {
            if (!huginPedia.getData('jaPegou')) {
              this.sound.play('Pegar_item');
              setNewTopic('Hugin e Munin');
              huginPedia.setData('jaPegou', true);
              huginPedia.setVisible(false);
            }
          }, null, this);
        }

        barrelOne.createBarrelSpawner();

    }


    update() {
        this.odin.checkCursorMoviment(this.common);

        if (this.odin.x >= 636) {
            this.scene.start('fasetres', {
                odinx: 20,
                odiny: this.odin.y - 5
            });
        } else if (this.odin.x <= 14) {
            this.scene.start('faseum', {
                odinx: 640 - this.odin.width - 20,
                odiny: this.odin.y
            });
        }
    }
}

export default FaseDois;
