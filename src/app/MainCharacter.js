class MainCharacter extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setVelocity(0, 0).setCollideWorldBounds(true);
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

        if (cursors.right.isDown) {
            this.body.setVelocityX(160);
        } else if (cursors.left.isDown) {
            console.log('is down');
            this.body.setVelocityX(-160)
        } else {
            this.body.setVelocityX(0);
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