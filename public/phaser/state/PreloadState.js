var PreloadState = {
 
  //load the assests before the game starts, as well as the loading screen
  preload(){
    
    this.game.stage.backgroundColor = 'black';
    
    // Loading Bar
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(0.8);
    this.load.setPreloadSprite(this.preloadBar);
    
    //Loading text
    this.preloadLoading = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading...', {font: '45px American Typewriter', fill: 'blue'})
    this.preloadLoading.anchor.setTo(0.5);
    this.preloadLoading.setShadow(1, 1, "#ffffff", 1, true, true);
    
    //Assets
    this.game.load.image('logo', '/public/assets/images/logo.png'); //Luci logo from Illustrator font
    this.game.load.image('background', '/public/assets/images/background.png');
    this.game.load.image('block', '/public/assets/images/block.png');
    this.game.load.image('ground', '/public/assets/images/ground.png');

  },
  
  create(){
    this.game.time.events.add(500, function(){
      this.state.start('HomeState');
    }, this)
  }
}