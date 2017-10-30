var BootState = {
  
  init(){
    //game initiation functions in boot state
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHoritontally = true;
    this.scale.pageAlignVertically = true;
  },
  
  preload(){
    this.game.load.image('preloadBar', '/public/assets/images/preloadBar.png');
    
  },
  
  create(){
    this.game.stage.backgroundColor = '#ffffff';
    
    this.state.start('PreloadState');
  }
};