var game = new Phaser.Game(1920, 720, Phaser.AUTO, 'game');

game.state.add('GameState', GameState);
game.state.add('HomeState', HomeState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.start('BootState');