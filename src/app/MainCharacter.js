class MainCharacter extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setVelocity(0, 0);
        this.cursors;  
        this.right;        
        this.left;        
        this.up;        
        this.space;             
    }

    preload() {}
    create() {}
    update() {}
    destroy() {}

    jump(context) {
        const bodyRule = this.body.onFloor() || this.body.touching.down;

        if ((bodyRule)) {
            this.setData('isDoubleJumping', false);
            this.body.setVelocityY(-280);
        }

        if (!this.body.onFloor() && !this.body.touching.down) {
            const itens = this.getData('itens');
            const isDoubleJumping = this.getData('isDoubleJumping');

            if (itens.doubleJump && !isDoubleJumping) {
                this.body.setVelocityY(-330);
                this.setData('isDoubleJumping', true);
            }
        }
    }

    createCursorMovement(context) {
        
        context.input.enabled = true;
        this.right = context.input.keyboard.addKey('RIGHT');        
        this.left = context.input.keyboard.addKey('LEFT');        
        this.up = context.input.keyboard.addKey('UP');        
        this.space = context.input.keyboard.addKey('SPACE');   

        context.input.keyboard.on('keydown_UP', function () {
            this.jump(this);
        }, this);

        context.input.keyboard.on('keydown_SPACE', function() {
            this.jump(this);
        }, this);   
    }

    checkCursorMoviment(sceneName) {
        if(this.right.isDown && this.left.isDown) {
        this.body.setVelocityX(0);  
        }

        if (this.right.isDown) {
            this.body.setVelocityX(160);
        } else if (this.left.isDown) {
            this.body.setVelocityX(-160)
        } else {
            this.body.setVelocityX(0);
        }
    }

    removeKeys(context) {
        context.input.enabled = false;
        this.right.isDown = false;
        this.left.isDown = false;
        this.up.isDown = false;
        this.space.isDown = false;
        
        context.input.keyboard.removeKey('RIGHT');        
        context.input.keyboard.removeKey('LEFT');        
        context.input.keyboard.removeKey('UP');        
        context.input.keyboard.removeKey('SPACE');

        // console.log('tecla %s, status: %s, cena: %s', 'right', this.right.isDown, context.scene.key);
        // console.log('tecla %s, status: %s, cena: %s', 'left', this.left.isDown, context.scene.key);
        // console.log('tecla %s, status: %s, cena: %s', 'up', this.up.isDown, context.scene.key);
        // console.log('tecla %s, status: %s, cena: %s', 'space', this.space.isDown, context.scene.key);        
    }

    configureMainCharacter() {
        this.setDataEnabled();
        this.setData({
            isDoubleJumping: false,
            lifePoints: 400,
            shield: 0,
            itens: {
                doubleJump: false,
                spear: false,
                armor: false
            }
        });
    }

    getDoubleJumpItem() {
        const itens = {...this.getData('itens')};
        itens.doubleJump = true;
        this.setData('itens', itens);
    }
}

export default MainCharacter;