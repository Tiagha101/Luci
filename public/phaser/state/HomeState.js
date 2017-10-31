var HomeState = {
  
  init(message){
    this.message = message;
    
  },
  
  preload(){
    this.game.stage.backgroundColor = '#fff';
  },
  
  create(){
    
    //Background
    this.background = this.game.add.sprite(0,-350,'background');
    this.background.scale.setTo(0.7);
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(function(){
      this.state.start('GameState');
    }, this);
    
    //Background animation
    var backgroundSlide = this.game.add.tween(this.background);
    backgroundSlide.to({y: '-330'});
    backgroundSlide.start();
    
    //Logo
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.logo.anchor.setTo(0.5);
    
    //Logo animation
    var logoGrow = this.game.add.tween(this.logo.scale);
    logoGrow.to({x: '+.6', y: '+.6'});
    logoGrow.start();
    
    //Text styles
    var styleStart = { font: '35px Arial', fill: 'black' };
    var styleEnd = { font: '35px Arial', fill: 'red' };
    
    // Text
    var startText = this.game.add.text(this.game.world.centerX, this.game.world.centerY+140, 'TOUCH TO START', styleStart)
    startText.anchor.setTo(0.5);
    startText.setShadow(2, 2, "#333333", 2, true, true);
    
    if(this.message){
      this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, this.message, styleEnd).anchor.setTo(0.5);
      this.game.time.events.add(3000, function(){
        this.state.start('HomeState');//probably not the best way to do this!
      }, this)
    }
  }
}