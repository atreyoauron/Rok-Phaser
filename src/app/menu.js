/// <reference path="../../phaser.d.ts" />

class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainMenu',
            pixelArt: true
        })
    }

    preload() {
        
    }

    create() {
        const splash = this.add.image(0, 0, 'fundo-splash');
        splash.setOrigin(0);
        splash.setAlpha(0.1);

        const rokLogo = this.add.image(0, 0, 'rok_logo');
        rokLogo.setOrigin(0);
        rokLogo.setScale(0.3);
        rokLogo.setX(this.sys.game.config.width / 2 - (rokLogo.width * rokLogo.scaleX / 2));
        rokLogo.setY(50);
    }

    update() {

    }
}

export default MainMenu;