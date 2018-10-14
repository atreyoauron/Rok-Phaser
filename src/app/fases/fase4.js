/// <reference path="../../../phaser.d.ts" />
import BarrelSpawner from '../prefabs/barrel-spawner.js';

class FaseQuatro extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasequatro',
            pixelArt: true,
            physics: {
                arcade: {
                    debug: true,
                    gravity: { y: 700 },
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
        this.scene.stop('fasetres');
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
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

        var map = this.add.tilemap('fase_4');

        var tileset = map.addTilesetImage('plataformas');
        this.ground = map.createStaticLayer('plataformas', tileset);
        this.ground.setCollisionByProperty({ collider: true });
        this.physics.add.collider(this.odin, [this.ground], function () {
            this.odin.resetJump();
        }, null, this);
        this.odin = this.add.existing(this.odin);

        const barrels = {
            barrelList: [
                {
                    groupMultipleConfig: {},
                    customConfig: {
                        x: 640,
                        y: 23,
                        speedDirection: -68,
                    }
                },
                {
                    groupMultipleConfig: {},
                    customConfig: {
                        x: 635,
                        y: 70,
                        speedDirection: -70,
                    }
                },
                {
                    groupMultipleConfig: {},
                    customConfig: {
                        x: 630,
                        y: 117,
                        speedDirection: -72,
                    }
                },
                {
                    groupMultipleConfig: {},
                    customConfig: {
                        x: 625,
                        y: 158,
                        speedDirection: -74,

                    }
                }
            ],
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 4,
            },
            groupMultipleConfig: {},
            customConfig: {
            },
            scene: this, 
            colliders: [this.ground],
            overlaps: [this.odin],
            minToSpawn: 4,
        };

        const firstWave = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 3,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 354,
                y: 0,
                timing: 0,
                speedDirection: -120,
                colliders: [this.ground],
                overlaps: [this.odin],                
            }
        });
       
        firstWave.createMultipleSpawner(barrels);

        const barrelFive = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 3,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 354,
                y: 0,
                speedDirection: -120,
                colliders: [this.ground],
                overlaps: [this.odin],                
            }
        }); 

        const barrelSix = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 2,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 27,
                y: 148,
                speedDirection: 250,
                colliders: [this.ground],
                overlaps: [this.odin],               
            }
        });

        const barrelBottomOne = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 1,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 225,
                y: 189,
                speedDirection: -120,
                colliders: [this.ground],
                overlaps: [this.odin],               
            }
        });   

        const barrelBottomTwo = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 1,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 345,
                y: 236,
                speedDirection: -100,
                colliders: [this.ground],
                overlaps: [this.odin],               
            }
        });           

        const barrelBottomThree = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 2,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 145,
                y: 256,
                timing: 1500,
                speedDirection: 120,
                colliders: [this.ground],
                overlaps: [this.odin],               
            }
        });  

        const barrelBottomFour = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 2,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 174,
                y: 256,
                timing: 1500,
                speedDirection: 118,
                colliders: [this.ground],
                overlaps: [this.odin],               
            }
        });


        const barrelBottomFive = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 1,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 388,
                y: 256,
                timing: 1500,
                speedDirection: 120,
                colliders: [this.ground],
                overlaps: [this.odin],               
            }
        });  

        const barrelBottomSix = new BarrelSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'barril',
                maxSize: 1,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 417,
                y: 256,
                timing: 1500,
                speedDirection: 118,
                colliders: [this.ground],
                overlaps: [this.odin],               
            }
        });        

       
        barrelFive.createBarrelSpawner();          
        barrelSix.createBarrelSpawner();
        barrelBottomOne.createBarrelSpawner();
        barrelBottomTwo.createBarrelSpawner();
        barrelBottomThree.createBarrelSpawner();
        barrelBottomFour.createBarrelSpawner();
        barrelBottomFive.createBarrelSpawner();
        barrelBottomSix.createBarrelSpawner();

        const doubleJump = this.physics.add.staticImage(82, 90, 'spear-item');
        this.physics.add.overlap(this.odin, doubleJump, function (odin, doubleJump) {
            this.odin.getDoubleJumpItem();
            doubleJump.destroy();
        }, null, this);

    }

    update() {
        this.odin.checkCursorMoviment(this.common);

        if (this.odin.x >= 636) {
            this.scene.start('fasecinco', {
                odinx: 20,
                odiny: this.odin.y - 5
            });
        } else if (this.odin.x <= 14) {
            this.scene.start('fasetres', {
                odinx: 640 - this.odin.width - 20,
                odiny: this.odin.y
            });
        }
    }
}

export default FaseQuatro;