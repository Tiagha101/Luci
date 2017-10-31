var GameState = {
  
  init(){
    //keyboard controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.RUNNING_SPEED = 1000;
    this.JUMPING_SPEED = 550;
    this.BOULDER_SPEED = 700;
    
    this.game.world.setBounds(0,0,20000, 2000)
  },
  
  create(){
    this.game.stage.backgroundColor = '#0052e7';
    
    //parse json level data file
    this.levelData = JSON.parse(this.game.cache.getText('level'));
    
    //all sprites initiated
    this.luci = this.game.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'luci');
    this.boulder = this.game.add.sprite(-400, -1000, 'boulder');
//    this.blue = this.game.add.sprite(500, 400, 'blue', 4);


    
   /* ----- Platform Group from level data ----- */
    
    this.platforms = this.add.group();
    this.platforms.enableBody = true;
    
    this.levelData.platformData.forEach(function(element){
      this.platforms.create(element.x, element.y, 'ground')
    }, this);
    
    //this has to come after the forEach loop in order to work
    this.platforms.setAll('body.immovable', true);
    this.platforms.setAll('body.allowGravity', false);
    
    /* ------ Peasant Group ------ */
    this.peasants = this.add.group();
    this.peasants.enableBody = true;
    
    var peasant;
    this.levelData.peasantData.forEach(function(element){
      peasant = this.peasants.create(this.game.world.randomX, element.y, 'blue');
      peasant.scale.setTo(0.4);
      peasant.tint = Math.random() * 0xc93535;
      peasant.frame = Math.floor(Math.random() * 11);
    }, this);
    
     //physics enabled
    this.game.physics.arcade.enable([this.luci, this.platforms, this.boulder, this.peasants]);
    
    /* ----- Characters ----- */
    
    //luci
    this.luci.anchor.setTo(0.5);
    this.luci.scale.setTo(0.4);
    this.luci.inputEnabled = true;
    this.luci.input.pixelPerfectClick = true;
    this.luci.input.enableDrag();
    this.luci.customParams = { health: 100 };
    
    //animations
    this.luci.animations.add('walking', [ 6, 2, 6, 2], 6, true);
    this.luci.animations.add('jumping', [ 3, 2, 10], 5, false);
    this.luci.animations.add('hurting', [ 7, 8, 7, 8, 7, 8, 7, 8, 7, 8, 7, 8, 7, 8], 6, false);
    
//    this.peasant.animations.add('walking', [ 6, 2, 6, 2], 6, true)
//    this.peasant.animations.add('hurting', [ 7, 8, 7, 8, 7, 8, 7, 8, 7, 8, 7, 8, 7, 8], 6, false);

//    this.luci.events.onInputDown.add(function(){
//      this.takeDamage();
//    }, this);
    
    //camera
    this.game.camera.follow(this.luci);
    
    /* ------ Boulder ------ */
    this.boulder.anchor.setTo(0.5);
    this.boulder.scale.setTo(1);
    this.boulder.inputEnabled = true;
    this.boulder.input.pixelPerfectClick = true;
    this.boulder.input.enableDrag();
    this.boulder.body.setSize(500, 708, 0, 0);
    
  },
  
  update(){
    this.game.physics.arcade.collide(this.luci, this.platforms);//there is an optional callback function
    this.game.physics.arcade.collide(this.boulder, this.platforms);
    this.game.physics.arcade.collide(this.peasants, this.platforms);
    
    if(this.luci.customParams.health <= 0) this.gameOver();
    
    this.luci.body.velocity.x = 0;
    
    /* ----- Keyboard Controls ----- */
    
    if(this.cursors.left.isDown) {
      this.luci.body.velocity.x = -this.RUNNING_SPEED;
      this.luci.scale.setTo(-0.4, 0.4);
      if(this.luci.body.touching.down){
        this.luci.play('walking');
      } else {
        this.luci.frame = 9;
      }
    } else if(this.cursors.right.isDown) {
      this.luci.scale.setTo(0.4);
      this.luci.body.velocity.x = this.RUNNING_SPEED;
      if(this.luci.body.touching.down) {
        this.luci.play('walking');
      } else {
        this.luci.frame = 9;
      }
    } else {
      this.luci.animations.stop();
      this.luci.frame = 0;
   }
    
    if(this.cursors.down.isDown) {
      this.luci.frame = 3;
    }
      //&& this.luci.body.touching.down
    if(this.cursors.up.isDown ) {
      this.luci.body.velocity.y = -this.JUMPING_SPEED;
      this.luci.play('jumping')
      
    } 
    
//    if(this.peasant.body.touching.down){
//      this.peasant.play('walking');
//    }
    
    this.boulder.body.velocity.x = this.BOULDER_SPEED;
    this.boulder.angle += 25;
    
//    this.game.physics.arcade.collide(this.luci, this.boulder, function(luci, boulder){
//      console.log(luci.customParams.health)
//      luci.play('hurting');
//      luci.customParams.health-=1
//    });
    this.game.physics.arcade.collide(this.luci, this.boulder, this.killPlayer);
    this.game.physics.arcade.collide(this.peasants, this.boulder, this.deadPeasant);

  },
  
  gameOver(){
    this.game.time.events.add(2000, function(){
    //true refreshses the game world, game cage property is next, then you can pass a variable. You can pass the player stats here too
    this.game.state.start('HomeState', true, false, 'You Died');
    }, this);
  },
  
  //not used
  
  deadPeasant(boulder, peasant){
    console.log('Peasant is:', peasant);
    peasant.alpha = 0;  
  },
  
  killPlayer(player, boulder){
//    var attacked = this.game.add.tween(this.luci.scale);
//    attacked.to({x: '+.1', y: '-.1'});
//    attacked.start();
    console.log('You Died');
    game.state.start('GameOverState', true, false, 'You Dead');
    
  }
  
}