/// <reference path="../../../phaser.d.ts" />

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
        this.common = this.scene.get('boot');
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

        lifeBarBox.clear();
        lifeBarBox.fillStyle(0x000000, 1);
        lifeBarBox.fillRect(10, 10, 100, 10);
        this.updateCharacterLifeBar(0);
        lifeBarBox.setDepth(1);

        powerBoostBox.clear();
        powerBoostBox.fillStyle(0x000000, 1);
        powerBoostBox.fillRect(10, 30, 100, 10);
        this.updateCharacterLifeBar(0);
        powerBoostBox.setDepth(1);

        this.events.addListener('damageTaken', function (damage) {
            this.updateCharacterLifeBar(damage);
        }, this);

        this.events.addListener('characterDied', function (damage) {
            const activatedScene = this.getActivatedScene(this.scene.manager.scenes);
            activatedScene.scene.stop();
            this.resetGame(activatedScene);
        }, this);
    }

    resetGame(activatedScene) {
        this.odin.setData('currentLifePoints', 1000);
        this.odin.setData('takingDamage', false);

        activatedScene.scene.start('faseum', {
            odinX: 321,
            odinY: 169
        });
    }

    getActivatedScene(scenes) {
        console.log(scenes);
        const scene = scenes.filter(scene => {
            if (scene.scene.key !== 'boot' && scene.scene.key !== 'userInterface') {
                if (scene.scene.settings.active) {
                    return scene;
                }
            }
        });

        return scene[0];
    }

    getPowerBoost(boost) {
        this.odin.setData('powerBoost');
        
        if (this.odin.getData('powerBostActive')) {
            this.odin.setData('currentTime', 3000);
        }

        this.powerBoost.clear();
        this.powerBoost.fillStyle(0xffff00, 1);
        this.powerBoost.setDepth(2)
        this.powerBoost.fillRect(10, 30, boost, 10);
    }

    userPowerBost(firstTime) {        
        if (firstTime) {
            this.odin.setData('currentTime', this.odin.getData('boostTime'));
        }

        this.time.addEvent({
            delay: 100,
            repeat: -1,
            callback: this.reducePowerBar.bind(this)
        });
    }

    reducePowerBar() {
        let currentTime = this.odin.getData('currentTime');
        let boostTime = this.odin.getData('boostTime');
        let powerBostActive = this.odin.getData('powerBostActive');
        
        let segundosRestantes = currentTime * 100 / boostTime;

        this.odin.setData('powerBoost', segundosRestantes);

        this.powerBoost.clear();
        this.powerBoost.fillStyle(0xffff00, 1);
        this.powerBoost.setDepth(2)
        this.powerBoost.fillRect(10, 30, segundosRestantes, 10);

        this.odin.setData('currentTime', currentTime - 100);

        if (this.odin.getData('currentTime') <= 0 && powerBostActive) {
            this.time.removeAllEvents();
            this.time.clearPendingEvents();
            this.odin.setData('powerBostActive', false);
            this.odin.finishPowerUp();
            this.powerBoost.clear();
            this.powerBoost.fillStyle(0xffff00, 1);
            this.powerBoost.setDepth(2)
            this.powerBoost.fillRect(10, 30, 0, 10);            
        }
    }

    updateCharacterLifeBar(damage) {
        if (this.odin.getData('currentLifePoints') < 1) {
            return;
        }

        let updatedLifePoints = this.odin.getData('currentLifePoints') - damage;
        let porcentagem;
        this.odin.setData('currentLifePoints', updatedLifePoints);
        porcentagem = (this.odin.getData('currentLifePoints') * 100) / this.odin.getData('totalLifePoints');

        if (porcentagem <= 0) {
            this.events.emit('characterDied');
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