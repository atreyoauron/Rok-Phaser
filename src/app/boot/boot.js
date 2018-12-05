/// <reference path="../../../phaser.d.ts" />
import { Odin } from '../prefabs/personagem.js';

class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: 'boot',
      pixelArt: true,
      physics: {
        arcade: {
          gravity: { y: 700 }
        }
      }
    })

    window.menuRestarted = false;
    this.cursors;
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

    this.load.on('progress', function (value) {
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(this.sys.game.config.width / 2 - 145, this.sys.game.config.height / 2 - 20, 290 * value, 40);
      percentText.setText(parseInt(value * 100) + '%');
    }, this);

    this.load.on('fileprogress', function (file) {
      // console.log(file.src);
    });

    this.load.on('complete', function () {
      this.cameras.main.fadeOut(1000, 0, 0, 0, function () {
        if (this.cameras.main.fadeEffect.progress === 1) {
          this.scene.launch('MainMenu');
        }
      });
    }, this);


    this.load.spritesheet('hidromel_spawner', 'src/assets/img/hidromel_spawner.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('checkpoint', 'src/assets/img/checkpoint.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('hidromel', 'src/assets/img/hidromel.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('odin', 'src/assets/img/odin.png', {
      frameWidth: 28,
      frameHeight: 42
    });
    this.load.spritesheet('odin_gold_idle', 'src/assets/img/Golden_Odin_Idle_Sheet.png', {
      frameWidth: 28,
      frameHeight: 42
    });
    this.load.spritesheet('odin_fire_spear', 'src/assets/img/spearodin.png', {
      frameWidth: 54,
      frameHeight: 42
    });
    this.load.spritesheet('odin_run', 'src/assets/img/Odin_Run_Sheet.png', {
      frameWidth: 25,
      frameHeight: 38
    });
    this.load.spritesheet('odin_gold_run', 'src/assets/img/Golden_Odin_Run.png', {
      frameWidth: 25,
      frameHeight: 38
    });
    this.load.spritesheet('barril', 'src/assets/img/barril.png', {
      frameWidth: 32,
      frameHeight: 24
    });
    this.load.spritesheet('crow', 'src/assets/img/Illrauga_Sprite_Sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    this.load.spritesheet('barril-explodir', 'src/assets/img/barril-explodir.png', {
      frameWidth: 24,
      frameHeight: 24
    });
    this.load.spritesheet('big-explosion', 'src/assets/img/BOOM_strip9.png', {
      frameWidth: 67,
      frameHeight: 68
    });
    this.load.spritesheet('lanca', 'src/assets/img/lanca.png', {
      frameWidth: 37,
      frameHeight: 9
    });
    this.load.spritesheet('hel-bg', 'src/assets/img/hel-sprite.png', {
      frameWidth: 640,
      frameHeight: 360,
    });
    this.load.spritesheet('fase9-sprite', 'src/assets/img/fase9-sprite.png', {
      frameWidth: 640,
      frameHeight: 360,
    });

    this.load.spritesheet('coracao', 'src/assets/img/hearth.png', {
      frameWidth: 18,
      frameHeight: 17,
    });

    this.load.spritesheet('button-sprite', 'src/assets/img/buttons.png', {
      frameWidth: 36,
      frameHeight: 36,
    });

    this.load.spritesheet('gold_jump', 'src/assets/img/gold_odin_jump.png', {
      frameWidth: 54,
      frameHeight: 42
    });

    this.load.spritesheet('air_attack', 'src/assets/img/spearAir.png', {
      frameWidth: 54,
      frameHeight: 42
    });

    this.load.spritesheet('odin_throw_spear_gold', 'src/assets/img/Odingoldenspear.png', {
      frameWidth: 54,
      frameHeight: 42
    });


    this.load.audio('explosao', 'src/assets/sounds/explosao.ogg');
    this.load.audio('musica', 'src/assets/sounds/gameplay.mp3');
    this.load.audio('menu', 'src/assets/sounds/menu.mp3');
    this.load.audio('explosao_de_carne', 'src/assets/sounds/explosao_de_carne.ogg');
    this.load.audio('fireloop', 'src/assets/sounds/fireloop.mp3');
    this.load.audio('Illrauga_morrendo', 'src/assets/sounds/Illrauga_morrendo.ogg');
    this.load.audio('Impacto_com_o_chao', 'src/assets/sounds/Impacto_com_o_chao.ogg');
    this.load.audio('impacto_da_lanca', 'src/assets/sounds/impacto_da_lanca.ogg');
    this.load.audio('Inimigo_sendo_golpeado', 'src/assets/sounds/Inimigo_sendo_golpeado.ogg');
    this.load.audio('Odin_morrendo', 'src/assets/sounds/Odin_morrendo.ogg');
    this.load.audio('Pegar_item', 'src/assets/sounds/Pegar_item.ogg');
    this.load.audio('Power_up', 'src/assets/sounds/Power_up.ogg');
    this.load.audio('Pulo_melhor', 'src/assets/sounds/Pulo_melhor.ogg');
    this.load.audio('Tempestade_de_neve', 'src/assets/sounds/Tempestade_de_neve.ogg');
    this.load.audio('Vocal_de_dano_humano', 'src/assets/sounds/Vocal_de_dano_humano.ogg');
    this.load.tilemapTiledJSON('fase_1', 'src/assets/json/fase_1.json');
    this.load.tilemapTiledJSON('fase_2', 'src/assets/json/fase_2.json');
    this.load.tilemapTiledJSON('fase_3', 'src/assets/json/fase_3.json');
    this.load.tilemapTiledJSON('fase_4', 'src/assets/json/fase_4.json');
    this.load.tilemapTiledJSON('fase_5', 'src/assets/json/fase_5.json');
    this.load.tilemapTiledJSON('fase_6', 'src/assets/json/fase_6.json');
    this.load.tilemapTiledJSON('fase_7', 'src/assets/json/fase_7.json');
    this.load.tilemapTiledJSON('fase_8', 'src/assets/json/fase_8.json');
    this.load.tilemapTiledJSON('fase_9', 'src/assets/json/fase_9.json');
    this.load.tilemapTiledJSON('fase_10', 'src/assets/json/fase_10.json');
    this.load.image('fase_1_plataformas', 'src/assets/img/plataforma_fase_1.png');
    this.load.image('fundo_fase_1', ['src/assets/img/fase_1_bg.png', 'src/assets/img/fase_n_1_bg.png']);
    this.load.image('hel', 'src/assets/img/hel.png');
    this.load.image('rok_logo', 'src/assets/img/rok-logo.png');
    this.load.image('plataformas', 'src/assets/img/plataforma_fase_1.png');
    this.load.image('spear-item', 'src/assets/img/spear-item.png');
    this.load.image('arrow', 'src/assets/img/arrow.png');
    this.load.image('attack', 'src/assets/img/attack.png');
    this.load.image('jump', 'src/assets/img/jump.png');
    this.load.image('fase-1', 'src/assets/img/fase_1_hub.png');
    this.load.image('fase-5', 'src/assets/img/fase_5_bg.png');
    this.load.image('fase-6', 'src/assets/img/fase_6_bg.png');
    this.load.image('fase-7', 'src/assets/img/fase_7_bg.png');
    this.load.image('fase-9', 'src/assets/img/fase_9_bg.png');
    this.load.image('fase-10', 'src/assets/img/fase_10_bg.png');
    this.load.image('alvo', 'src/assets/img/alvo.png');
    this.load.image('vikingpedia', 'src/assets/img/vikingpedia.png');
    this.load.image('fundo_esquerda', 'src/assets/img/fundo_esquerda.png');
    this.load.image('fundo_meio', 'src/assets/img/fundo_meio.png');
    this.load.image('fundo_direita', 'src/assets/img/fundo_direita.png');
    this.load.image('breakable-wall', 'src/assets/img/bloco-destrutivel.png');
    this.load.image('switch-block', 'src/assets/img/bloco.png');
    this.load.image('pulo-duplo', 'src/assets/img/pulo-duplo.png');
    this.load.image('item_lanca', 'src/assets/img/item_lanca.png');
    this.load.image('vikingpedia_button', 'src/assets/img/vikingpedia_button.png');
  }

  create() {
    this.anims.create({
      key: 'lancando',
      frames: this.anims.generateFrameNumbers('lanca', { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'hidromel-blob',
      frames: this.anims.generateFrameNumbers('hidromel', { start: 0, end: 5 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'spawner-animation',
      frames: this.anims.generateFrameNumbers('hidromel_spawner', { start: 0, end: 24 }),
      frameRate: 8,
      repeat: -1
    });


    this.anims.create({
      key: 'coracao-beat',
      frames: this.anims.generateFrameNumbers('coracao', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    this.anims.create({
      key: 'hel',
      frames: this.anims.generateFrameNumbers('hel-bg', { start: 0, end: 9 }),
      frameRate: 9,
      repeat: -1
    })

    this.anims.create({
      key: 'fase9',
      frames: this.anims.generateFrameNumbers('fase9-sprite', { start: 0, end: 24 }),
      frameRate: 12,
      repeat: -1
    })

    this.anims.create({
      key: 'crow-flying',
      frames: this.anims.generateFrameNumbers('crow', { start: 0, end: 5 }),
      frameRate: 12,
      repeat: -1
    });

    this.anims.create({
      key: 'standing',
      frames: this.anims.generateFrameNumbers('odin', { start: 0, end: 7 }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'fire_spear',
      frames: this.anims.generateFrameNumbers('odin_fire_spear', { start: 0, end: 6 }),
      frameRate: 7,
      repeat: 0
    });

    this.anims.create({
      key: 'fire_spear_gold',
      frames: this.anims.generateFrameNumbers('odin_throw_spear_gold', { start: 0, end: 6 }),
      frameRate: 7,
      repeat: 0
    });

    this.anims.create({
      key: 'jump_fire_spear',
      frames: this.anims.generateFrameNumbers('air_attack', { start: 0, end: 6 }),
      frameRate: 7,
      repeat: 0
    })

    this.anims.create({
      key: 'gold_standing',
      frames: this.anims.generateFrameNumbers('odin_gold_idle', { start: 0, end: 7 }),
      frameRate: 7,
      repeat: -1
    });



    this.anims.create({
      key: 'jumping',
      frames: this.anims.generateFrameNumbers('odin', { start: 8, end: 10 }),
      frameRate: 3,
    });

    this.anims.create({
      key: 'gold_jumping',
      frames: this.anims.generateFrameNumbers('gold_jump', {start: 0, end: 4}),
      frameRate: 7
    })

    this.anims.create({
      key: 'gold_landing',
      frames: this.anims.generateFrameNumbers('gold_jump', {start: 5, end: 6}),
      frameRate: 7
    })

    this.anims.create({
      key: 'inAir',
      frames: this.anims.generateFrameNumbers('odin', { start: 11, end: 12 }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: 'inAir_gold',
      frames: this.anims.generateFrameNumbers('gold_jump', { start: 2, end: 4 }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: 'landing',
      frames: this.anims.generateFrameNumbers('odin', { start: 12, end: 14 }),
      frameRate: 6,
    });

    this.anims.create({
      key: 'walking',
      frames: this.anims.generateFrameNumbers('odin_gold_run', { start: 0, end: 7 }),
      frameRate: 7,
    });
    this.anims.create({
      key: 'gold_walking',
      frames: this.anims.generateFrameNumbers('odin_run', { start: 0, end: 7 }),
      frameRate: 7,
    });

    this.anims.create({
      key: 'rolling',
      frames: this.anims.generateFrameNumbers('barril', { start: 0, end: 7 }),
      frameRate: 7,
      repeat: -1
    });

    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('barril-explodir', { start: 0, end: 5 }),
      frameRate: 15,
      repeat: 0
    });

    this.anims.create({
      key: 'big-explosion',
      frames: this.anims.generateFrameNumbers('big-explosion', { start: 0, end: 8 }),
      frameRate: 16,
      repeat: 0
    });

    const previousData = JSON.parse(localStorage.getItem('currentGameState')) || {};

    this.odin = new Odin({
      scene: this,
      x: previousData.x || this.sys.game.config.width / 2,
      y: previousData.y || this.sys.game.config.height / 2,
      key: 'odin'
    });

    this.odin.x = -100;
    this.odin.y = -100;
    this.odin.create();
    this.odin.configureMainCharacter();
    this.cursors = this.input.keyboard.createCursorKeys(this);
    this.createCursorMovement();
  }

  update() {
    this.odin.update();

    if (this.input.activePointer.isDown) {
      // console.log(this.input.activePointer.x);
      // console.log(this.input.activePointer.y);
    }
  }

  createCursorMovement() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  keyUpPressed(callback, context) {
    this.input.keyboard.on('keydown_UP', function () {
      if (callback) {
        return callback();
      }
    });
  }

  keyDownPressed(callback, context) {
    this.input.keyboard.on('keydown_DOWN', function () {
      if (callback) {
        return callback();
      };
    });
  }
}

export default Boot;
