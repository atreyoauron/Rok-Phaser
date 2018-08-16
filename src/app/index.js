import FaseUm from './fase1.js';
import FaseDois from './fase2.js';

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: [ FaseUm, FaseDois ]
}

const game = new Phaser.Game(config);