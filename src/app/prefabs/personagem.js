/// <reference path="../../../phaser.d.ts" />

import MainCharacter from './MainCharacter.js';
import SpearSpawner from './spear.js';

class Odin extends MainCharacter {
  constructor(config) {
    super(config);
    this.anims.play('standing', true);
    this.setName('mainCharacter');
    this.config = config;
    this.spearGroupCreatedOnThisScene = {};
    this.scene = config.scene;
  }

  create() {
    this.setName('odin');

    this.scene.events.addListener('fireSpear', function () {
      this.fireSpear();
      this.setData('attacking', true);
    }, this);

    this.createJump();

    this.spear = new SpearSpawner({
      scene: this,
      groupConfig: {
        defaultKey: 'lanca',
        maxSize: 1,
      },
      groupMultipleConfig: {},
      customConfig: {
        x: 400,
        y: 300,
        bounce: {
          x: 0,
          y: 0
        },
        speedDirection: {
          x: 0,
          y: -400
        }
      }
    });

    this.scene.input.keyboard.addKey('C');
    this.scene.input.keyboard.addKey('X');

    this.up = this.scene.input.keyboard.addKey('UP');
    this.space = this.scene.input.keyboard.addKey('SPACE');

    this.scene.input.keyboard.on('keydown_X', function () {
      const userInterface = this.scene.scene.get('userInterface');
      const itens = this.getData('powerBoost');

      if (itens < 100) {
        return;
      }

      if (userInterface) {
        this.setData('powerBostActive', true);
        this.startPowerUp();
        userInterface.userPowerBost(true);
        this.idle();
      }
    }, this);

    this.scene.input.keyboard.on('keydown_C', function () {
      const itens = this.getData('itens');

      if(!itens.spear) { return; }
      if (this.anims.currentAnim.key === 'fire_spear' && !itens.armor
      || this.anims.currentAnim.key === 'jump_fire_spear' && !itens.armor ) { return; }

      this.scene.events.emit('fireSpear');
      // this.fireSpear();
    }, this);
  }

  fireSpear() {
    const itens = this.getData('itens');

    this.attacking();
    if (!itens.spear) return;

    const scene = this.getActivatedScene(this.scene.scene.manager.scenes);

    if (!this.spearGroupCreatedOnThisScene[scene.scene.key]) {
      if (!this.spearGroupCreatedOnThisScene[scene.scene.key]) {
        this.spear.createSpearGroup(scene);
        this.spearGroupCreatedOnThisScene[scene.scene.key] = scene.scene.key;
      }
    }

    const direction = (this.flipX) ? -400 : 400;
    const xOrigin = (this.flipX) ? this.x - 30 : this.x + 30;

    const crows = (scene.crows) ? scene.crows.crowGroup : {};
    const helSwitch = (scene.helSwitch) ? scene.helSwitch : {};
    const breakableWall = (scene.breakableWall) ? scene.breakableWall : {};
    const firstSwitchWall = (scene.firstSwitchWall) ? scene.firstSwitchWall : {};
    const secondSwitchWall = (scene.secondSwitchWall) ? scene.secondSwitchWall : {};
    const thirdSwitchWall = (scene.thirdSwitchWall) ? scene.thirdSwitchWall : {};
    const fourthSwitchWall = (scene.fourthSwitchWall) ? scene.fourthSwitchWall : {};
    const barrelSwitch = (scene.barrelSwitch) ? scene.barrelSwitch : {};

    const colliders = [
      scene.ground,
      crows,
      helSwitch,
      breakableWall,
      firstSwitchWall,
      secondSwitchWall,
      thirdSwitchWall,
      fourthSwitchWall,
      barrelSwitch
    ];

    const config = {
      scene: scene,
      speedDirection: {
        x: direction,
        y: 0
      },
      odin: this,
      bounce: 0,
      x: xOrigin,
      y: this.y,
      colliderList: colliders,
    };
    this.spear.createNewSpear(config);
  }

  inAir() {
    if (this.anims.currentAnim.key === 'fire_spear' && this.anims.isPlaying
    || this.anims.currentAnim.key === 'jump_fire_spear' && this.anims.isPlaying ) {
      return;
    }

    this.anims.play('inAir', true);
  }

  jumping() {
    const powerBostActive = this.getData('powerBostActive');

    if (powerBostActive) {
      this.anims.play('gold_jumping');
    } else {
      this.anims.play('jumping');
    }
  }

  attacking() {
    let jump = this.getData('jump');
    let double = this.getData('isDoubleJumping');

    if (jump || double) {
      this.anims.play('jump_fire_spear');
    } else {
      this.anims.play('fire_spear');
    }
  }

  walking() {
    let jump = this.getData('jump');
    let double = this.getData('isDoubleJumping');
    let powerBostActive = this.getData('powerBostActive');
    let key = (powerBostActive) ? 'walking' : 'gold_walking';

    if (this.anims.currentAnim.key === 'fire_spear' && this.anims.isPlaying ||
    this.anims.currentAnim.key === 'jump_fire_spear' && this.anims.isPlaying) {
      return;
    }

    if (!jump || !double) {
      this.anims.play(key, true);
    }
  }

  idle() {
    const powerBostActive = this.getData('powerBostActive');

    if (powerBostActive) {
      this.anims.play('gold_standing', true);
    } else {
      this.anims.play('standing', true);
    }
  }

  superHeroLanding() {
    this.anims.play('landing', true);
    this.scene.sound.play('Impacto_com_o_chao');
  }

  getActivatedScene(scenes) {
    const scene = scenes.filter(scene => {
      if (scene.scene.key !== 'boot' && scene.scene.key !== 'userInterface') {
        if (scene.scene.settings.active) {
          return scene;
        } else {
          this.spearGroupCreatedOnThisScene[scene.scene.key] = false;
        }
      }
    });

    return scene[0];
  }

  resetSpearGroup() {
    this.getActivatedScene(this.scene.scene.manager.scenes);
  }

  update() {
    let jump = this.getData('jump');
    let double = this.getData('isDoubleJumping');

    if (jump || double) {
      if (this.anims.currentAnim.key !== 'jumping' && this.anims.currentAnim.key !== 'gold_jumping') {
        this.inAir();
      }
    }
  }

  shootSpear() {
  }
}

export {
  Odin, MainCharacter
};
