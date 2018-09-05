/// <reference path="../../phaser.d.ts" />

import MainCharacter from './MainCharacter.js';

class Odin extends MainCharacter {
    constructor(config) {
        super(config);
        this.body.setVelocity(0, 0);
        this.anims.play('standing');
        this.setName('mainCharacter');
    }

    create() {
    }

    update() {
        
    }
}

export {
    Odin, MainCharacter
};