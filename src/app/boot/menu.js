/// <reference path="../../../phaser.d.ts" />

class MainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: 'MainMenu',
      pixelArt: true
    })

    this.menuItens = [];
    this.selectedMenu = null;
    this.activeIndex = 0;
    this.down;
    this.up;
  }

  init() {

  }

  preload() {

  }

  continue() {
    const previousData = JSON.parse(localStorage.getItem('currentGameState'));

    this.scene.start(previousData.fase, {
        odinx: previousData.x,
        odiny: previousData.y
    });
  }

  create() {
    this.sound.play('menu')
    this.scene.pause('boot');

    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 1)');
    // const splash = this.add.image(0, 0, 'fundo-splash');
    // splash.setOrigin(0);
    // splash.setAlpha(0.1);

    const rokLogo = this.add.image(0, 0, 'rok_logo');
    rokLogo.setOrigin(0);
    rokLogo.setScale(0.3);
    rokLogo.setX(this.sys.game.config.width / 2 - (rokLogo.width * rokLogo.scaleX / 2));
    rokLogo.setY(50);

    const newGame = this.make.text({
      x: this.sys.game.config.width / 2 - 40,
      y: this.sys.game.config.height / 2,
      text: 'New Game',
      style: {
        font: '20px Nordic Alternative',
        fill: '#fff'
      }
    });

    newGame.setX(this.sys.game.config.width / 2 - (newGame.width / 2) + 10)

    newGame.setInteractive();

    newGame.on('pointerdown', function (e, a) {
      this.cameras.main.fadeOut(1000, 0, 0, 0, function () {}, this);
    }, this);

    // const continuar = this.make.text({
    //   x: this.sys.game.config.width / 2 - 40,
    //   y: this.sys.game.config.height / 2 + 40,
    //   text: 'Continue',
    //   style: {
    //     font: '20px Nordic Alternative',
    //     fill: '#fff'
    //   }
    // });
    // continuar.setX(this.sys.game.config.width / 2 - (continuar.width / 2) + 5)

    // continuar.setInteractive();

    // continuar.on('pointerdown', function (e, a) {

    // }, this);

    // const opcoes = this.make.text({
    //   x: this.sys.game.config.width / 2 - 40,
    //   y: this.sys.game.config.height / 2 + 80,
    //   text: 'Options',
    //   style: {
    //     font: '20px Nordic Alternative',
    //     fill: '#fff'
    //   }
    // });

    // opcoes.setInteractive();

    // opcoes.on('pointerdown', function (e, a) {
    //   console.log(e);
    //   console.log(a);
    // }, this);

    this.menuItens = [newGame];
    this.selectedMenu = this.menuItens[this.activeIndex];
    this.selectedMenu.setColor('#00ff00');

    this.input.keyboard.on('keydown_UP', function () {
      this.selectedMenu.setColor('#ffffff');
      this.activeIndex--;

      if (this.activeIndex < 0) {
        this.activeIndex = 2;
      }

      this.selectedMenu = this.menuItens[this.activeIndex];
      this.selectedMenu.setColor('#00ff00');
    }, this);

    this.input.keyboard.on('keydown_DOWN', function () {
      this.selectedMenu.setColor('#ffffff');
      this.activeIndex++;

      if (this.activeIndex > 2) {
        this.activeIndex = 0;
      }

      this.selectedMenu = this.menuItens[this.activeIndex];
      this.selectedMenu.setColor('#00ff00');
    }, this);

    this.input.keyboard.on('keydown_ENTER', function () {
      switch (this.activeIndex) {
        case (0):
          this.cameras.main.fadeOut(1000, 0, 0, 0, function () {}, this);
          break;
        case (1):
          this.continue();
          break;
        case (2):
          console.log('abrir opções');
      }
    }, this);

    this.cameras.main.once('camerafadeoutcomplete', function (camera) {
      this.sound.stopAll()

      const startVideo = document.getElementById('startVideo');
      startVideo.style.display = 'block';
      startVideo.play();

      startVideo.addEventListener('ended',iniciarCreditos.bind(this),false);
      function iniciarCreditos(e) {
          startVideo.style.display = 'none';
          this.scene.launch('userInterface');
          this.scene.start('faseum');
      }
    }, this);
  }

  update() {

  }
}

export default MainMenu;
