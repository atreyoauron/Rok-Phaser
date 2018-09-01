/// <reference path="../../phaser.d.ts" />

import MainCharacter from './MainCharacter.js';

class Odin extends MainCharacter {
    constructor(config) {
        super(config);
        this.body.setVelocity(0, 0).setCollideWorldBounds(true);

        this.anims.play('standing');
    }

    update() {
        if(this.input.keyboard.checkDown('RIGHT')) {
            console.log('right')
        }
    }
}

export {
    Odin, MainCharacter
};