/// <reference path="../../phaser.d.ts" />

class MainMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'MainMenu',
            pixelArt: true
        })

        this.menuItens = [];
        this.selectedMenu = null;
        this.activeIndex = 0;
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

        const newGame = this.make.text({
            x: this.sys.game.config.width / 2 - 40,
            y: this.sys.game.config.height / 2,
            text: 'Novo jogo',
            style: {
                font: '20px monospace',
                fill: '#fff'
            }
        });

        newGame.setInteractive();

        newGame.on('pointerdown', function() {
            console.log('start game');
        });

        const continuar = this.make.text({
            x: this.sys.game.config.width / 2 - 40,
            y: this.sys.game.config.height / 2 + 40,
            text: 'Continuar',
            style: {
                font: '20px monospace',
                fill: '#fff'
            }
        });

        const opcoes = this.make.text({
            x: this.sys.game.config.width / 2 - 40,
            y: this.sys.game.config.height / 2 + 80,
            text: 'Opções',
            style: {
                font: '20px monospace',
                fill: '#fff'
            }
        });     
        
        this.menuItens = [newGame, continuar, opcoes];
        this.selectedMenu = this.menuItens[this.activeIndex];
        this.selectedMenu.setColor('#00ff00');

        this.input.keyboard.on('keydown_UP', function() {
            this.selectedMenu.setColor('#ffffff');
            this.activeIndex--;
            
            if (this.activeIndex < 0) {
                this.activeIndex = 2;
            }

            this.selectedMenu = this.menuItens[this.activeIndex];
            this.selectedMenu.setColor('#00ff00');
        }, this);

        this.input.keyboard.on('keydown_DOWN', function() {
            this.selectedMenu.setColor('#ffffff');
            this.activeIndex++;
            
            if (this.activeIndex > 2) {
                this.activeIndex = 0;
            }

            this.selectedMenu = this.menuItens[this.activeIndex];
            this.selectedMenu.setColor('#00ff00');        
        }, this);

        this.input.keyboard.on('keydown_ENTER', function() {
            switch(this.activeIndex) {
                case(0):
                    this.cameras.main.fadeOut(1000, 0, 0, 0, function() {
                    }, this);
                    break;
                case(1):
                    console.log('continuar jogo');
                    break;
                case(2):
                    console.log('abrir opções');
            }
        }, this);
    }

    update() {
        if(this.cameras.main.fadeEffect.isComplete) {
            this.scene.start('faseum');
        }

    }
}

export default MainMenu;