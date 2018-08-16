/// <reference path="../../phaser.d.ts" />

class FaseDois extends Phaser.Scene {
    constructor(){
        super({
            key: 'fasedois',
            physics: {
                arcade: {
                    gravity: {y: 550},
                    debug: true
                }
            }            
        })
    }

    preload() {
        
    }

    create() {
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
                
        this.createMainPlayer(this.odin, screenWidth, screenHeight, this.phy);
    }

    update() {

    }
}

export default FaseDois;