/// <reference path="../../../phaser.d.ts" />
import CrowSpawner from '../prefabs/crow-spawner.js';

class FaseSeis extends Phaser.Scene {
    constructor() {
        super({
            key: 'faseseis',
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
        this.scene.stop('fasecinco');
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

        var map = this.add.tilemap('fase_6');

        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);
        this.ground.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.odin, [this.ground], function() {
            this.odin.resetJump();
        }, null, this);
        const bg = this.add.image(0,0,'fase-6');
        bg.setOrigin(0);

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

        //voando na parte de baixo
        this.crows.createCrow({x: 26, y: 198},{ x: 50, y: 0});

        this.crows.createCrow({x: 614, y: 325},{ x: 0, y: -50});

        this.crows.createCrow({x: 258, y: 325},{ x: 0, y: -50});
        this.crows.createCrow({x: 198, y: 325},{ x: 0, y: -50});
        this.crows.createCrow({x: 135, y: 325},{ x: 0, y: -50});
        this.crows.createCrow({x: 75, y: 325},{ x: 0, y: -50});

        this.crows.createCrow({x: 150, y: 35},{ x: 0, y: -50});
        this.crows.createCrow({x: 200, y: 70},{ x: 0, y: -50});
        this.crows.createCrow({x: 250, y: 105},{ x: 0, y: -50});
        this.crows.createCrow({x: 315, y: 135},{ x: 0, y: -50});

        this.crows.createCrow({x: 533, y: 35},{ x: 0, y: -50});

        if (!checkIfExists('Ratatosk')) {
          const RatatoskPedia = this.physics.add.staticImage(169, 324, 'vikingpedia');
          RatatoskPedia.setDataEnabled();
          RatatoskPedia.setData('jaPegou', false);

          this.physics.add.overlap(RatatoskPedia, this.odin, function() {
            if (!RatatoskPedia.getData('jaPegou')) {
              this.sound.play('Pegar_item');
              setNewTopic('Ratatosk');
              RatatoskPedia.setData('jaPegou', true);
              RatatoskPedia.setVisible(false);
            }
          }, null, this);
        }
    }

    update() {
        this.odin.checkCursorMoviment(this.common);

        if (this.odin.x >= 314 && this.odin.x <= 375 && this.odin.y > 360) {
            this.scene.start('fasecinco', {
                odinx: this.odin.x,
                odiny: 0
            });
        } else if (this.odin.x >= 568 && this.odin.x <= 640 && this.odin.y < 0) {
            this.scene.start('fasesete', {
                odinx: this.odin.x,
                odiny: 360
            });
        }
    }
}

export default FaseSeis;
