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
    Boot,
    UserInterface,
} from './index.js'


const config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 360,
    scene: [
        SplashScreen,
        Boot,
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
        UserInterface,
        Creditos,
    ]
}

const game = new Phaser.Game(config);
