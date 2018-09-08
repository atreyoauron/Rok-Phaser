/// <reference path="../../phaser.d.ts" />
import CrowSpawner from './crow-spawner.js';

class FaseSete extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasesete',
            physics: {
                arcade: {
                    gravity: { y: 700 },
                    debug: true,
                    // tileBias: 120,
                }
            }
        })

        this.odin;
        this.common;        
    }

    init(config) {
        this.common = this.scene.get('preloading');
        this.odin = this.common.odin;
        this.scene.stop('faseseis');
        
        if (config) {
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
            this.physics.world.enable(this.odin);
        }
    }

    preload() {

    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

        var map = this.add.tilemap('fase_7');

        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createDynamicLayer('plataformas', tileset);
        this.ground.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.odin, [this.ground], function() {
            this.odin.resetJump();
        }, null, this);
        this.odin = this.add.existing(this.odin);

        const spearItem = this.add.zone(565, 213).setSize(30, 30);
        spearItem.setOrigin(0.5);
        this.physics.world.enable(spearItem);
        spearItem.body.setAllowGravity(false);
        spearItem.body.moves = false;             
        this.physics.add.overlap(this.odin, spearItem, function() {
            this.odin.getSpear();
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
                    x: 0,
                    y: 1
                },
                speedDirection: {
                    x: 0,
                    y: -120
                },
                colliders: [this.ground]                 
            }            
        });     
        
        this.crows.createCrow({x: 530, y: 214},{ x: 0, y: 50});        
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