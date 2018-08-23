/// <reference path="../../phaser.d.ts" />

import { Odin } from './personagem.js';

class FaseDois extends Phaser.Scene {
    constructor() {
        super({
            key: 'fasedois',
            physics: {
                arcade: {
                    gravity: { y: 700 },
                    debug: true
                }
            }
        })

        this.odin;
    }

    init() {
        let faseUm = this.scene.get('faseum');
        this.odin = faseUm.odin;
    } 

    preload() {
    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.cameras.main.setBackgroundColor('rgba(10, 230, 255, 1)');

        this.physics.world.enable(this.odin);
        this.odin.body.setVelocity(0, 0).setBounce(0.2).setCollideWorldBounds(true);
        this.odin = this.add.existing(this.odin);

        const platforms = this.physics.add.staticGroup(); 

        const plat = this.physics.add.staticSprite();
        this.cache.json.get('platformsData').forEach(data => {
            const platform = platforms.create(data.x, data.y, data.texture);
            platform.setOrigin(data.xOrigin, data.yOrigin);

            if (data.overWriteSize) {
                platform.setSize(data.SizeToAdd.width, data.SizeToAdd.height);
                platform.setDisplaySize(data.SizeToAdd.width, data.SizeToAdd.height);
                platform.enableBody(data.enableBody);
            }

            platform.enableBody(data.enableBody);
        });

        this.input.keyboard.on('keydown_ONE', function() {
            this.scene.start('faseum');
        }, this);

        this.physics.add.collider(this.odin, platforms);
    }

    update() {
        this.odin.createCursorMovement(this);
    }
}

export default FaseDois;