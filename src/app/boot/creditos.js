/// <reference path="../../../phaser.d.ts" />

class Creditos extends Phaser.Scene {
    constructor() {
        super({
            key: 'Creditos',
            pixelArt: true,
            debug: true
        })

        this.text;
        this.membroIndex = 0;
        this.membros = [
          {
            nome: 'Atreyo Alves Geraldi',
            cargo: 'Pesquisador, Artista, Documentador'
          },
          {
            nome: 'Bruno Cirino Vanni',
            cargo: 'Artista'
          },
          {
            nome: 'Bruno Manoel Almeida de Oliveira',
            cargo: 'Animador, Artista'
          },
          {
            nome: 'Davide Puato',
            cargo: 'Artista, Level Design, Roteirista, Edicao Sonora'
          },
          {
            nome: 'Eduardo dos Santos',
            cargo: 'Lider de equipe, organizador do grupo'
          },
          {
            nome: 'Henrique Assuncao',
            cargo: 'Programador'
          },
          {
            nome: 'Lucas Franciscon Miranda',
            cargo: 'Artista de cenario'
          },
          {
            nome: 'Luigi Vinicisu Gisolfi Germano da Silva',
            cargo: 'Pesquisa sonora'
          },
        ]
        this.nome;
        this.cargo;
    }

    preload() {

    }

    create() {
        this.nome = this.make.text({
            align: 'center',
            text: '',
            style: {
                font: '20px Nordic Alternative',
                fill: '#FFF',
            }
        });


        this.cargo = this.make.text({
            align: 'center',
            text: '',
            style: {
                font: '20px Nordic Alternative',
                fill: '#FFF',
            }
        })
        this.changeText(this.nome, this.cargo);
    }

    changeText(nome, cargo) {
      nome.setText(this.membros[this.membroIndex].nome);
      cargo.setText(this.membros[this.membroIndex].cargo);

      this.nome.setShadow(2, 2, '#ff0000', true, true, true)
      this.nome.setX(this.sys.game.config.width / 2 - (this.nome.width / 2));
      this.nome.setY(this.sys.game.config.height / 2 - this.nome.height);

      this.cargo.setShadow(2, 2, '#0000ff', true, true, true)
      this.cargo.setX(this.sys.game.config.width / 2 - (this.cargo.width / 2));
      this.cargo.setY(this.sys.game.config.height / 2 + this.nome.height / 2);

      this.membroIndex++;

      if(this.membroIndex < this.membros.length) {
        this.time.addEvent({
          delay: 2000,
          repeat: 0,
          callback: () => { this.changeText(nome, cargo) }
        }, this)
      } else {
        this.cameras.main.fadeOut(3000, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', function (camera) {
          console.log('iniciar menu');
          this.scene.start('menu');
        }, this);
      }
    }

    update() {

    }
}

export default Creditos;
