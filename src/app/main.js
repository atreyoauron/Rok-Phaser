import {
    SplashScreen,
    MainMenu,
    FaseUm,
    FaseDois,
    Creditos,
    Preloading
} from './index.js'


const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: [ SplashScreen, Preloading, MainMenu, FaseUm, FaseDois, Creditos ]
}

const game = new Phaser.Game(config);