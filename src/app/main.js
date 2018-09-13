import {
    SplashScreen,
    MainMenu,
    FaseUm,
    FaseDois,
    FaseTres,
    FaseQuatro,
    FaseCinco,
    FaseSeis,
    FaseSete,
    FaseOito,
    FaseNove,
    FaseDez,
    Creditos,
    Preloading,
    UserInterface,
} from './index.js'


const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: [ 
        SplashScreen, 
        Preloading, 
        MainMenu, 
        FaseUm, 
        FaseDois, 
        FaseTres,
        FaseQuatro,
        FaseCinco,
        FaseSeis,
        FaseSete,
        FaseOito,
        FaseNove,
        FaseDez,
        Creditos,
        UserInterface
    ]
}

const game = new Phaser.Game(config);