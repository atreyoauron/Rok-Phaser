/// <reference path="../../../phaser.d.ts" />

class SpearSpawner extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.scene, config.groupConfig, config.groupMultipleConfig, config.customConfig);
        this.config = config;
        this.spearGroup;
    }

    createSpearGroup(scene) {
        this.spearGroup = scene.physics.add.group();
    }

    createNewSpear(config) {
        const spear = this.spearGroup.create(config.x, config.y, 'tridente');
        const itens = config.odin.getData('itens');

        if (config.speedDirection.x < 0) {
            spear.flipX = true;
        } else {
            spear.flipX = false;
        }
        this.configureSpear(spear, config);

        if(itens.armor) {
            this.queueBarrel(this.kill, spear, config.scene, 3000);
        } else {
            this.queueBarrel(this.kill, spear, config.scene);
        }

        this.addSpearCollider(config);
    }

  addSpearCollider(config) {
    config.scene.physics.add.collider(this.spearGroup, [...config.colliderList], function (firstCollider, collider) {
      if (firstCollider.name === "switchBarrelOff") {
        this.shutDownBarrelSpawner(firstCollider, collider);
        return;
      }
      if(firstCollider.name === 'hel-weak-points') {
        if(firstCollider.getData('alreadyHit')) { return; }
        const hel = collider.getData('hel');
        firstCollider.anims.stop();
        firstCollider.setTint(0x808080);
        hel.reduceHelLifePoints();
        firstCollider.setData('alreadyHit', true);
      } else {
        if(collider.name === 'hel-weak-points') {
          if(collider.getData('alreadyHit')) { return; }
          const hel = collider.getData('hel');
          collider.anims.stop();
          collider.setTint(0x808080);
          hel.reduceHelLifePoints();
          collider.setData('alreadyHit', true);
        }
      }
      if (firstCollider.body.onWall()) {
        config.scene.sound.play('impacto_da_lanca');
        this.kill(firstCollider);
        return;
      }
      if (firstCollider.body.touching.left || firstCollider.body.touching.right) {
        collider.setDataEnabled();
        collider.setData({ hit: true });
        config.scene.sound.play('impacto_da_lanca');
        firstCollider.destroy();
      }
    }, null, this);
  }

  configureSpear(spear, config) {
    spear.setVelocity(config.speedDirection.x, config.speedDirection.y);
    spear.body.setAllowGravity(false);
    spear.setOrigin(0.5);
    spear.body.setSize(spear.body.sourceWidth * 0.5, spear.body.sourceHeight * 0.5, spear.body.sourceWidth * 0.5, spear.body.sourceHeight * 0.5);
    spear.anims.play('lancando');
  }

  shutDownBarrelSpawner(firstCollider, collider) {
    const barrels = firstCollider.getData('barrels');
    barrels.forEach(barrel => {
      barrel.destroySpawner();
    });
    firstCollider.setTint(0x00ff00);
    firstCollider.setScale(0.9);
    collider.destroy();
  }

    kill(crow) {
        crow.destroy();
    }

    queueBarrel(callback, crow, scene, timing = 400) {
        scene.time.addEvent({
            delay: timing,
            callback: callback.bind(this, crow)
        })
    }
}

export default SpearSpawner;
