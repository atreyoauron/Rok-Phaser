/// <reference path="../../../phaser.d.ts" />

class SplashScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'SplashScreen',
            pixelArt: true
        })
    }

    preload() {
        this.load.image('fundo-splash', 'src/assets/img/splash-screen.jpg');
        this.load.image('logo', 'src/assets/img/pp.png');
    }

    create() {
        this.cameras.main.flash(1000, 0, 0, 0);

        const splash = this.add.image(0, 0, 'fundo-splash');
        splash.setOrigin(0);
        splash.setAlpha(0.1);
        window.logo = this.add.image(0, 0, 'logo');

        logo.setOrigin(0.5);
        logo.setScale(0);
        logo.setX(this.sys.game.config.width / 2 - (logo.width * logo.scaleX / 2));
        logo.setY(this.sys.game.config.height / 2 - (logo.height * logo.scaleY / 2));

        const tween = this.tweens.add({
            targets: logo,
            scaleX: 0.3,
            scaleY: 0.3,
            ease: 'Power1',
            duration: 2000,
            repeat: 0,
            onComplete: function () {
                this.cameras.main.fadeOut(1000, 0, 0, 0);
            }.bind(this),
        })
    }

    update() {
        if (this.cameras.main.fadeEffect.isComplete) {
            this.scene.start('boot');
        }        
    }
}

export default SplashScreen;