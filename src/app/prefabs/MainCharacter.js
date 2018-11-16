/// <reference path="../../../phaser.d.ts" />

class MainCharacter extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.setOrigin(0.5);
        this.body.setSize(this.body.sourceWidth * 0.5, this.body.height, this.body.sourceWidth * 0.5, this.height)
        this.common;
        this.body.wasTouching.none = false
        this.body.touching.none = false;
        this.body.setMaxVelocity(120, 330);
        this.ui = config.scene.scene.get('userInterface');
    }

    createJump(character){
        this.scene.events.addListener('jump', function () {
          this.jump(character);
        }, this);

        this.scene.input.keyboard.addKey('SPACE');
        this.scene.input.keyboard.on('keydown_SPACE', function() {
            this.jump(character);
        }, this);

        this.scene.input.keyboard.addKey('UP');
        this.scene.input.keyboard.on('keydown_UP', function() {
            this.jump(character);
        }, this);
    }

    resetJump() {
        const bodyRule = this.body.onFloor() || this.body.touching.down;

        let jump = this.getData('jump');
        let isDoubleJumping = this.getData('isDoubleJumping');


        if (bodyRule) {
            if(jump || isDoubleJumping) {
                this.superHeroLanding();
            }
            this.setData('isDoubleJumping', false);
            this.setData('jump', false);
        }
    }

    jump(character) {
        let bodyRule = this.body.onFloor() || this.body.touching.down;

        let jump = this.getData('jump');
        let isDoubleJumping = this.getData('isDoubleJumping');

        if (bodyRule) {
            this.jumping();
            this.body.setVelocityY(-280);
            this.setData('jump', true);
            return;
        }

        if (!jump && !isDoubleJumping) {
            this.jumping();
            this.body.setVelocityY(-280);
            this.setData('jump', true);
            return;
        }

        if (jump) {
            const itens = this.getData('itens');

            if (itens.doubleJump && !isDoubleJumping) {
                this.body.setVelocityY(-300);
                if(!itens.armor) {
                    this.setData('isDoubleJumping', true);
                    this.setData('jump', false);
                }
            }
        }
    }

    checkBodyRule() {
        return this.body.onFloor() || this.body.touching.down;
    }

    checkCursorMoviment(context) {
        const pointer = this.scene.input.activePointer;

        if(!pointer.isDown) {
          this.leftButtonPressed = false;
          this.rightButtonPressed = false;
          this.attackButtonPressed = false;
          this.jumpButtonPressed = false;
        } else {
          console.log(pointer);
        }

        if(context.cursors.right.isDown && context.cursors.left.isDown) {
            this.body.setVelocityX(0);
        }

        if (context.cursors.right.isDown || this.ui.rightButtonPressed) {
            this.flipX = false;
            this.walking();
            this.body.setVelocityX(75);
        } else if (context.cursors.left.isDown || this.ui.leftButtonPressed) {
            this.walking();
            this.flipX = true;
            this.body.setVelocityX(-75);
        } else {
            if (this.anims.currentAnim.key !== 'fire_spear') {
              this.anims.stop();
            }

            if(this.getData('jump') === false && this.getData('isDoubleJumping') === false && this.anims.currentAnim.key !== 'standing' && !this.anims.isPlaying) {
              this.idle();
            }

            this.body.setVelocityX(0);
        }
    }

    configureMainCharacter() {
        this.setDataEnabled();
        this.setData({
            isDoubleJumping: false,
            jump: false,
            totalLifePoints: 1000,
            currentLifePoints: 1000,
            powerBoost: 0,
            takingDamage: false,
            powerBostActive: false,
            attacking: false,
            boostTime: 3000,
            currentTime: 0,
            itens: {
                doubleJump: false,
                spear: false,
                armor: false
            }
        });
    }

    finishPowerUp() {
        const itens = {...this.getData('itens')};
        itens.armor = false;
        this.setData('itens', itens);
    }

    startPowerUp() {
        const itens = {...this.getData('itens')};
        itens.armor = true;
        this.setData('itens', itens);
    }

    getDoubleJumpItem() {
        const itens = {...this.getData('itens')};
        itens.doubleJump = true;
        this.setData('itens', itens);
    }

    getSpear() {
        const itens = {...this.getData('itens')};
        itens.spear = true;
        this.setData('itens', itens);
    }
}

export default MainCharacter;
