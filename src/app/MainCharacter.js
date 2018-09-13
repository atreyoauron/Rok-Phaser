/// <reference path="../../phaser.d.ts" />

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
        this.body.setMaxVelocity(120, 330)
    }

    createJump(character){
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
        if(context.cursors.right.isDown && context.cursors.left.isDown) {
            this.body.setVelocityX(0);  
        }
        
        if (context.cursors.right.isDown) {
            this.flipX = false;
            this.walking();
            this.body.setVelocityX(100);
        } else if (context.cursors.left.isDown) {
            this.walking();
            this.flipX = true;
            this.body.setVelocityX(-100);
        } else {            
            if(this.getData('jump') === false && this.getData('isDoubleJumping') === false) {
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
            boostTime: 3000,
            itens: {
                doubleJump: true,
                spear: true,
                armor: false
            }
        });
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