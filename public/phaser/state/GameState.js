var GameState = {
  
  create(){

    this.game.stage.backgroundColor = '#0052e7';

    //all sprites initiated
    this.ground = this.game.add.sprite(0, 680, 'ground');
    this.luci = this.game.add.sprite(200, 200, 'block');
    
    //physics enabled
    this.game.physics.arcade.enable([this.luci, this.ground]);
    
    /* ----- Environments ----- */
    
    //ground
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;
    
    /* ----- Characters ----- */
    
    //luci
    this.luci.anchor.setTo(0.5);
    this.luci.inputEnabled = true;
    this.luci.input.pixelPerfectClick = true;
    this.luci.input.enableDrag();
    this.luci.customParams = { health: 100 };
    
    this.luci.events.onInputDown.add(function(){
      this.takeDamage();
      console.log('Health:', this.luci.customParams.health);
      if(this.luci.customParams.health <= 0) this.gameOver();
    }, this);
    
  },
  
  update(){
    
  },
  
  gameOver(){
    //true refreshses the game world, game cage property is next, then you can pass a variable. You can pass the player stats here too
    this.state.start('HomeState', true, false, 'You Died');
  },
  
  takeDamage(){
    var attacked = this.game.add.tween(this.luci.scale);
    attacked.to({x: '+.1', y: '-.1'});
    attacked.start();
    this.luci.customParams.health -= 10;
  }
  
}