/// <reference path="../../phaser.d.ts" />

class Preloading extends Phaser.Scene {
    constructor() {
        super({
            key: 'preloading',
            pixelArt: true
        })
    }

    preload() {
        this.cameras.main.flash(500, 0, 0, 0);

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();

        this.make.text({
            x: this.sys.game.config.width / 2 - 150,
            y: this.sys.game.config.height / 2 - 70,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#fff'
            }
        });

        const percentText = this.make.text({
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            text: '0%',
            style: {
                font: '20px monospace',
                fill: '#000'
            }
        });
        percentText.setOrigin(0.5);

        percentText.setDepth(3);

        progressBox.fillStyle(0xffffff, 1);
        progressBox.fillRect(this.sys.game.config.width / 2 - 150, this.sys.game.config.height / 2 - 25, 300, 50);

        progressBar.setDepth(2)
        progressBox.setDepth(1);

        this.load.on('progress', function(value) {
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(this.sys.game.config.width / 2 - 145, this.sys.game.config.height / 2 - 20, 290 * value, 40);
            percentText.setText(parseInt(value * 100) + '%');
        }, this);

        this.load.on('fileprogress', function(file) {
            console.log(file.src);
        });

        this.load.on('complete', function() {
            this.cameras.main.fadeOut(1000, 0, 0, 0, function() {
                if (this.cameras.main.fadeEffect.progress === 1) {
                    this.scene.start('MainMenu');
                }
            });
        }, this);


        this.load.image('light', 'src/assets/img/light.png');
        this.load.image('odin',['src/assets/img/odin.png', 'src/assets/img/odin.png']);
        this.load.tilemapTiledJSON('fase_1', 'src/assets/json/fase_1.json');
        this.load.image('fase_1_plataformas', 'src/assets/img/plataforma_fase_1.png');
        this.load.image('fundo_fase_1', ['src/assets/img/fase_1_bg.png', 'src/assets/img/fase_n_1_bg.png']);
        this.load.audio('bgMusic', 'src/assets/audio/sound.mp3');
        this.load.image('rok_logo', 'src/assets/img/rok-logo.png');     
    }

    create() {

    }

    update() {

    }
}

export default Preloading;