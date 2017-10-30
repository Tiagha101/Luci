var GameState = {
  
  create(){

    this.game.stage.backgroundColor = '#ffffff';
    
    this.block = this.game.add.sprite(200, 200, 'block');
    this.block.anchor.setTo(0.5);
    
    this.game.physics.arcade.enable(this.block);
    
    this.block.inputEnabled = true;
    this.block.input.pixelPerfectClick = true;
    
  
    
    this.block.events.onInputDown.add(function(){
      this.takeDamage();
      console.log('Health:', this.block.customParams.health);
      
      if(this.block.customParams.health <= 0){
        this.gameOver();
      }
    }, this);
    
    this.block.input.enableDrag();
    
    this.block.customParams = { health: 100 };
  },
  
  update(){
    
  },
  
  gameOver(){
    //true refreshses the game world, game cage property is next, then you can pass a variable. You can pass the player stats here too
    this.state.start('HomeState', true, false, 'You Died');
  },
  
  takeDamage(){
    var attacked = this.game.add.tween(this.block.scale);
    attacked.to({x: '+.1', y: '-.1'});
    attacked.start();
    this.block.customParams.health -= 10;
  }
  
}