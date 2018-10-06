/// <reference path="../../../phaser.d.ts" />
import CrowSpawner from '../prefabs/crow-spawner.js';

class FaseQuatro extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasecinco',
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
        this.odin.resetSpearGroup();

        this.scene.stop('fasequatro');
        
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

        var map = this.add.tilemap('fase_5');

        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);
        this.ground.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.odin, [this.ground], function() {
            this.odin.resetJump();
        }, null, this);
        this.odin = this.add.existing(this.odin);

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
                    y: -120
                },
                colliders: [this.ground],
                overlap: [this.odin],               
            }            
        });     
        this.crows.createCrow({x: 440, y: 180},{ x: 0, y: 50});
        this.crows.createCrow({x: 440, y: 240},{ x: 0, y: -50});        
        this.crows.createCrow({x: 400, y: 180},{ x: 0, y: 50});
        this.crows.createCrow({x: 400, y: 240},{ x: 0, y: -50});
        this.crows.createCrow({x: 360, y: 180},{ x: 0, y: 50});
        this.crows.createCrow({x: 360, y: 240},{ x: 0, y: -50});
        this.crows.createCrow({x: 320, y: 180},{ x: 0, y: 50});
        this.crows.createCrow({x: 320, y: 240},{ x: 0, y: -50});
        this.crows.createCrow({x: 280, y: 180},{ x: 0, y: 50});
        this.crows.createCrow({x: 280, y: 240},{ x: 0, y: -50});
        this.crows.createCrow({x: 240, y: 180},{ x: 0, y: 50});
        this.crows.createCrow({x: 240, y: 240},{ x: 0, y: -50});
        this.crows.createCrow({x: 200, y: 180},{ x: 0, y: 50});
        this.crows.createCrow({x: 200, y: 240},{ x: 0, y: -50});
        this.crows.createCrow({x: 160, y: 180},{ x: 0, y: 50});
        this.crows.createCrow({x: 160, y: 240},{ x: 0, y: -50});
        this.crows.createCrow({x: 210, y: 113},{ x: -50, y: 0});

        this.crows.createCrow({x: 18, y: 260},{ x: 50, y: 0});
        this.crows.createCrow({x: 36, y: 260},{ x: 50, y: 0});
        this.crows.createCrow({x: 120, y: 300},{ x: -50, y: 0});
        this.crows.createCrow({x: 100, y: 300},{ x: -50, y: 0});
        this.crows.createCrow({x: 18, y: 340},{ x: 50, y: 0});
        this.crows.createCrow({x: 36, y: 340},{ x: 50, y: 0});
    }

    update() {
        this.odin.checkCursorMoviment(this.common);

        if (this.odin.x >= 328 && this.odin.x <= 394 && this.odin.y < 0) {
            this.scene.start('faseseis', {
                odinx: 344,
                odiny: 310 - this.odin.y * 2
            });
        }
        
        if (this.odin.x > 636) {
            this.scene.start('faseum', {
                odinx: this.odin.width,
                odiny: this.odin.y
            });
        }

        if (this.odin.x >= 10 && this.odin.x <= 120 && this.odin.y > 360) {
            this.scene.start('faseoito', {
                odinx: this.odin.x,
                odiny: 0
            });
        }
    }
}

export default FaseQuatro;