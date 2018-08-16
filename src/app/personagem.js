/// <reference path="../../phaser.d.ts" />

import MainCharacter from './MainCharacter.js';

class Odin extends MainCharacter {
    constructor(config) {
        super(config);
        this.body.setVelocity(0, 0).setBounce(0.2).setCollideWorldBounds(true);
    }

    preload() {
    }

    create() {
        this.configureMainCharacter();
        
        this.scene.input.keyboard.on('keydown_UP', function () {
            const bodyRule = this.body.onFloor() || this.body.touching.down;

            if ((bodyRule)) {
                this.setData('isDoubleJumping', false);
                this.body.setVelocityY(-330);
            }

            if (!this.body.onFloor() && !this.body.touching.down) {
                const itens = this.getData('itens');
                const isDoubleJumping = this.getData('isDoubleJumping');

                if (itens.doubleJump && !isDoubleJumping) {
                    this.body.setVelocityY(-430);
                    this.setData('isDoubleJumping', true);
                }
            }
        }, this);
    }
    update() {
        const cursors = this.scene.input.keyboard.createCursorKeys();

        if (this.scene.input.activePointer.isDown) {
            const clickedX = this.scene.input.activePointer.x;
            this.body.setVelocityX(200);
            if (clickedX > this.scene.sys.game.config.width / 2) {
                this.body.setVelocityX(200);
            } else {
                this.body.setVelocityX(-160);
            }
        } else {
            if (cursors.right.isDown) {
                this.body.setVelocityX(160);
            } else if (cursors.left.isDown) {
                this.body.setVelocityX(-160)
            } else {
                this.body.setVelocityX(0);
            }
        }
    }
    destroy() { }

    configureMainCharacter() {
        this.setDataEnabled();
        this.setData({
            isDoubleJumping: false,
            lifePoints: 400,
            shield: 0,
            itens: {
                doubleJump: true,
                spear: false,
                armor: false
            }
        });
    }
}

export {
    Odin, MainCharacter
};