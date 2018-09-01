/// <reference path="../../phaser.d.ts" />

class FaseUm extends Phaser.Scene {
    constructor() {
        super({
            key: 'faseum',
            pixelArt: true,
            physics: {
                arcade: {
                    gravity: { y: 700 } 
                }
            }
        })

        this.bg;
        this.odin;
        this.tilemap;
        this.ground;
        this.bgMusic;
        this.startSong;
        this.config;
        this.hasConfig = false;
        this.firstTime = true;
        this.right;
    }

    init(config) {
        this.preloadCache = this.scene.get('preloading');

        this.odin = this.preloadCache.odin;
        this.physics.world.enable(this.odin);
        this.odin.body.setVelocity(0, 0).setCollideWorldBounds(true);

        if (config.odinx) {
            this.hasConfig = true;
            this.odin.x = config.odinx;
            this.odin.y = config.odiny;
            this.odin.body.setVelocityX(0);
        } else {
            this.odin.x = this.sys.game.config.width / 2;
            this.odin.y = this.sys.game.config.height / 2;            
        }
    }

    preload() {

    }

    create() {
        if(!window.bgMusic) {
            window.bgMusic = this.sound.add('bgMusic');
            window.bgMusic.play();
        }

        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        this.lights.addLight(screenWidth / 2, screenHeight / 2, 200);

        var map = this.add.tilemap('fase_1');

        const fundo = this.add.image(0,0, 'fundo_fase_1');
        fundo.setOrigin(0);

        var tileset = map.addTilesetImage('fase_1_plataformas');
        this.ground = map.createStaticLayer('plataforma_fase_1', tileset);        
        this.ground.setCollisionByProperty({collider: true})

        this.odin = this.add.existing(this.odin);
        this.odin.createCursorMovement(this);
        this.physics.add.collider(this.odin, [this.ground]);
    }

    update() {
        if (this.odin.x >= 626) {
            this.odin.removeKeys(this);
            this.time.addEvent({
                delay: 100,
                repeat: -1,
                loop: -1,
                callback: () => {
                    this.changeScene('fasedois');
                }
            })
        } else {
            this.odin.checkCursorMoviment(this.scene.key);            
        }
    }

    changeScene(cena) {
        this.scene.start(cena, {
            odinx: this.odin.width,
            odiny: this.odin.y - 5
        });
    }
}
export default FaseUm;