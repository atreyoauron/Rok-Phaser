import {
    SplashScreen,
    MainMenu,
    FaseUm,
    FaseDois,
    Creditos
} from './index.js'


const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: [ SplashScreen, MainMenu, FaseUm, FaseDois, Creditos ]
}

const game = new Phaser.Game(config);