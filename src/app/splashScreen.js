/// <reference path="../../phaser.d.ts" />

class SplashScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'SplashScreen',
            pixelArt: true
        })
    }

    preload() {
        this.load.image('fundo-splash','src/assets/img/splash-screen.jpg');
    }

    create() {
        const splash = this.add.image(0, 0, 'fundo-splash');
        splash.setOrigin(0);
        splash.setAlpha(0.5);
    }

    update() {

    }
}

export default SplashScreen;