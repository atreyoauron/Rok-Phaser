/// <reference path="../../phaser.d.ts" />

import MainCharacter from './MainCharacter.js';
import SpearSpawner from './spear.js';

class Odin extends MainCharacter {
    constructor(config) {
        super(config);
        this.body.setVelocity(0, 0);
        this.anims.play('standing');
        this.setName('mainCharacter');
        this.config = config;
        this.spearGroupCreatedOnThisScene = {};
    }

    create() {
        this.createJump();
        
        const crow = new SpearSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'tridente',
                maxSize: 1,    
            },
            groupMultipleConfig: {},
            customConfig: {
                x: 400,
                y: 300,
                bounce: {
                    x: 0,
                    y: 0
                },
                speedDirection: {
                    x: 0,
                    y: -120
                }                 
            }            
        });

        this.scene.input.keyboard.addKey('C');
        this.scene.input.keyboard.on('keydown_C', function() {
            const scene = this.getActivatedScene(this.scene.scene.manager.scenes);
            if(!this.spearGroupCreatedOnThisScene[scene.scene.key]) {
                if (!this.spearGroupCreatedOnThisScene[scene.scene.key]) {
                    crow.createSpearGroup(scene);
                    this.spearGroupCreatedOnThisScene[scene.scene.key] = scene.scene.key;
                }
            }   

            const direction = (this.flipX) ? -400 : 400;

            const config = {
                scene: scene,              
                speedDirection: {
                x: direction,
                    y: 0
                },
                bounce: 0,
                x: this.x,
                y: this.y,
                colliderList: [scene.ground],
            };
            crow.createNewCrow(config);
        }, this);
    }

    getActivatedScene(scenes) {
        const scene = scenes.filter(scene => {
            if (scene.scene.key !== 'preloading') {
                if(scene.scene.settings.active) {
                    return scene;
                }
            }
        });

        return scene[0];
    }

    update() {
    }

    shootSpear() {
        console.log('shoot spear');
    }
}

export {
    Odin, MainCharacter
};