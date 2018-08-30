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
        this.load.image('logo','src/assets/img/pp.jpg');
    }

    create() {
        const splash = this.add.image(0, 0, 'fundo-splash');
        splash.setOrigin(0);
        splash.setAlpha(0.1);
        const logo = this.add.image(0, 0, 'logo');
        logo.setScale(0.3);
        logo.setOrigin(0,0);
        logo.setX(this.sys.game.config.width / 2 - (logo.width * 0.3 / 2));
        logo.setY(this.sys.game.config.height / 2 - (logo.height * 0.3 / 2));
    }

    update() {

    }
}

export default SplashScreen;