class MainCharacter extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setVelocity(0, 0).setBounce(0.2).setCollideWorldBounds(true);
    }

    preload() {
    }

    create() {

    }
    update() {
        
    }
    destroy() { }

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
        var cursors = context.input.keyboard.createCursorKeys();

        context.input.keyboard.on('keydown_UP', function () {
            this.jump(this);
        }, this);

        context.input.keyboard.on('keydown_SPACE', function() {
            this.jump(this);
        }, this);

        if (context.input.activePointer.isDown) {
            const clickedX = context.input.activePointer.x;
            this.body.setVelocityX(200);
            if (clickedX > context.sys.game.config.width / 2) {
                this.body.setVelocityX(200);
            } else {
                this.body.setVelocityX(-160);
            }
        } else {
            if (cursors.right.isDown) {
                this.body.setVelocityX(160);
            } else if (cursors.left.isDown) {
                this.body.setVelocityX(-160)
            } else {
                this.body.setVelocityX(0);
            }
        }        
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