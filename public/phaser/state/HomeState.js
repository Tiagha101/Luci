var HomeState = {
  
  init(message){
    this.message = message;
    
  },
  
  preload(){
    this.game.stage.backgroundColor = '#fff';
  },
  
  create(){
    
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);
    
    var background = this.game.add.sprite(0,-350,'background');
    background.inputEnabled = true;
    
    background.events.onInputDown.add(function(){
      this.state.start('GameState');
    }, this);
    
    var styleStart = { font: '35px Arial', fill: 'black' };
    var styleEnd = { font: '35px Arial', fill: 'red' };
    
    this.game.add.text(this.game.world.centerX, this.game.world.centerY+110, 'TOUCH TO START', styleStart).anchor.setTo(0.5);
    
    if(this.message){
      this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, this.message, styleEnd).anchor.setTo(0.5);
      this.game.time.events.add(3000, function(){
        this.state.start('HomeState');//probably not the best way to do this!
      }, this)
    }
  }
}