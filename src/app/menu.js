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

        this.make.text({
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            text: 'Novo jogo',
            style: {
                font: '20px monospace',
                fill: '#fff'
            }
        });
        
        this.make.text({
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            text: 'Continuar',
            style: {
                font: '20px monospace',
                fill: '#fff'
            }
        });
        
        this.make.text({
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            text: 'Opções',
            style: {
                font: '20px monospace',
                fill: '#fff'
            }
        });        
    }

    update() {

    }
}

export default MainMenu;