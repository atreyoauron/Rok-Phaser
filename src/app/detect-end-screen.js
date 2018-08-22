if(
    this.odin.x + this.odin.width > (this.cameras.main.scrollX + this.sys.game.config.width - this.odin.width / 2) && 
    this.odin.x + this.odin.width < (this.cameras.main.scrollX + this.sys.game.config.width + this.odin.width / 2)    
    ) {

    if (this.cameras.main.scrollX + this.sys.game.config.width >= this.bg.width) {
        return;
    }

    this.cameras.main.setScroll(this.cameras.main.scrollX + this.sys.game.config.width);
    this.odin.x = this.cameras.main.scrollX + this.odin.width * 2;
}

if(this.odin.x - this.odin.width < (this.cameras.main.scrollX)) {
    if (this.cameras.main.scrollX - this.odin.width < 0) {
        console.log('caindo aqui');
        return;
    }

    this.cameras.main.setScroll(this.cameras.main.scrollX - this.sys.game.config.width);
    this.odin.x = this.cameras.main.scrollX + this.sys.game.config.width - this.odin.width * 2;            
}