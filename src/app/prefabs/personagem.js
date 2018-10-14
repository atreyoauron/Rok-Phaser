/// <reference path="../../../phaser.d.ts" />

import MainCharacter from './MainCharacter.js';
import SpearSpawner from './spear.js';

class Odin extends MainCharacter {
    constructor(config) {
        super(config);
        this.anims.play('standing', true);
        this.setName('mainCharacter');
        this.config = config;
        this.spearGroupCreatedOnThisScene = {};
    }

    create() {
        this.setName('odin');
        
        this.createJump();

        this.spear = new SpearSpawner({
            scene: this,
            groupConfig: {
                defaultKey: 'lanca',
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
                    y: -400
                }
            }
        });

        this.scene.input.keyboard.addKey('C');
        this.scene.input.keyboard.addKey('X');

        this.up = this.scene.input.keyboard.addKey('UP');
        this.space = this.scene.input.keyboard.addKey('SPACE');
        
        this.scene.input.keyboard.on('keydown_X', function () {
            const userInterface = this.scene.scene.get('userInterface');
            const itens = this.getData('powerBoost');

            if (itens < 100) {
                return;
            }

            if (userInterface) {
                this.setData('powerBostActive', true);
                this.startPowerUp();
                userInterface.userPowerBost(true);
            }
        }, this);
        
        this.scene.input.keyboard.on('keydown_C', function () {
            const itens = this.getData('itens');


            if (!itens.spear) return;

            const scene = this.getActivatedScene(this.scene.scene.manager.scenes);

            if (!this.spearGroupCreatedOnThisScene[scene.scene.key]) {
                if (!this.spearGroupCreatedOnThisScene[scene.scene.key]) {
                    this.spear.createSpearGroup(scene);
                    this.spearGroupCreatedOnThisScene[scene.scene.key] = scene.scene.key;
                }
            }

            const direction = (this.flipX) ? -400 : 400;
            const xOrigin = (this.flipX) ? this.x - 30 : this.x + 30;

            const crows = (scene.crows) ? scene.crows.crowGroup : {};
            const barrelSwitch = (scene.barrelSwitch) ? scene.barrelSwitch : {};

            const colliders = [scene.ground, crows, barrelSwitch];
            const config = {
                scene: scene,
                speedDirection: {
                    x: direction,
                    y: 0
                },
                odin: this,
                bounce: 0,
                x: xOrigin,
                y: this.y,
                colliderList: colliders,
            };
            this.spear.createNewSpear(config);
        }, this);
    }

    inAir() {
        this.anims.play('inAir', true);        
    }

    jumping() {
        this.anims.play('jumping');
    }       

    walking() {
        let jump = this.getData('jump');
        let double = this.getData('isDoubleJumping');
        
        if (!jump || !double) {
            this.anims.play('walking', true);
        }
    }    

    idle() {
        const powerBostActive = this.getData('powerBostActive');

        if (powerBostActive) {
            this.anims.play('gold_standing', true);
        } else {
            this.anims.play('standing', true);
        }
    }

    superHeroLanding() {
        this.anims.play('landing', true);
    }

    getActivatedScene(scenes) {
        const scene = scenes.filter(scene => {
            if (scene.scene.key !== 'boot' && scene.scene.key !== 'userInterface') {
                if (scene.scene.settings.active) {
                    return scene;
                } else {
                    this.spearGroupCreatedOnThisScene[scene.scene.key] = false;
                }
            }
        });

        return scene[0];
    }

    resetSpearGroup() {
        this.getActivatedScene(this.scene.scene.manager.scenes);
    }

    update() {
        let jump = this.getData('jump');
        let double = this.getData('isDoubleJumping');
        
        if (jump || double) {
            if(this.anims.currentAnim.key !== 'jumping') {
                this.inAir();
            }
        }
    }

    shootSpear() {
    }
}

export {
    Odin, MainCharacter
};