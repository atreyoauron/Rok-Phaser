/// <reference path="../../phaser.d.ts" />

class UserInterface extends Phaser.Scene {
    constructor() {
        super({
            key: 'userInterface',
            pixelArt: true,
            physics: {
                arcade: {
                    gravity: { y: 700 }
                }
            }
        })

        this.data;
    }

    init() {
        this.common = this.scene.get('preloading');
        this.odin = this.common.odin;
    }

    preload() {

    }

    create() {
        this.cameras.main.flash(500, 0, 0, 0);

        const lifeBarBox = this.add.graphics();
        const powerBoostBox = this.add.graphics();
        this.lifeBar = this.add.graphics();
        this.powerBoost = this.add.graphics();

        lifeBarBox.fillStyle(0x000000, 1);
        lifeBarBox.fillRect(10, 10, 100, 10);
        this.updateCharacterLifeBar(0);
        lifeBarBox.setDepth(1);

        powerBoostBox.fillStyle(0x000000, 1);
        powerBoostBox.fillRect(10, 30, 100, 10);
        this.updateCharacterLifeBar(0);
        powerBoostBox.setDepth(1);

        this.events.addListener('damageTaken', function(damage) {
            this.updateCharacterLifeBar(damage);
        }, this);
    }

    getPowerBoost(boost) {
        let updateBoost = this.odin.setData('powerBoost');
        this.powerBoost.clear();
        this.powerBoost.fillStyle(0xffff00, 1);
        this.powerBoost.setDepth(2)
        this.powerBoost.fillRect(10, 30, boost, 10);
    }

    userPowerBost() {
        let powerBoost = this.odin.setData('powerBoost');
        let boostTime = this.odin.setData('boostTime');
        this.config.scene.time.addEvent({
            delay: boostTime,
            repeat: -1,
        });
    }

    updateCharacterLifeBar(damage) {
        let updatedLifePoints = this.odin.getData('currentLifePoints') - damage;
        let porcentagem;
        this.odin.setData('currentLifePoints', updatedLifePoints);
        porcentagem = (this.odin.getData('currentLifePoints') * 100) / this.odin.getData('totalLifePoints');
        
        if (porcentagem <= 0) {
            console.log('killed!');
            this.lifeBar.clear();
            this.lifeBar.fillStyle(0xff0000, 1);
            this.lifeBar.setDepth(2)
            this.lifeBar.fillRect(10, 10, 0, 10);
            return;
        }

        this.lifeBar.clear();
        this.lifeBar.fillStyle(0xff0000, 1);
        this.lifeBar.setDepth(2)
        this.lifeBar.fillRect(10, 10, porcentagem, 10);
    }
}

export default UserInterface;