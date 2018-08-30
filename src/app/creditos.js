/// <reference path="../../phaser.d.ts" />

class Creditos extends Phaser.Scene {
    constructor() {
        super({
            key: 'Creditos',
            pixelArt: true
        })
    }

    preload() {

    }

    create() {
        this.make.text({
            x: this.sys.game.config.width / 2,
            y: this.sys.game.config.height / 2,
            text: 'Créditos',
            style: {
                font: '20px monospace',
                fill: '#fff'
            }
        })
    }

    update() {

    }
}

export default Creditos;