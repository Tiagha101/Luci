var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

var GameState = {
  
  preload: function(){
    this.game.load.image('block', '/public/assets/images/block.png')
  },
  
  create: function(){
    this.game.stage.backgroundColor = '#ffffff';
    this.block = this.game.add.sprite(200, 200, 'block');
    
  },
  
  update: function(){
    
  }
  
}

game.state.add('GameState', GameState);
game.state.start('GameState');