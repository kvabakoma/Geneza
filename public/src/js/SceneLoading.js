var SceneLoading = new Phaser.Scene('SceneLoading');

SceneLoading.preload = function() {
    this.load.atlas('ui', 'assets/img/ui.png', 'assets/img/ui.json');
}

SceneLoading.create = function() {
    this.titleImg = this.add.sprite(game.config.width * .5, game.config.height * .5, 'ui', 'loading.png')
    .setOrigin(.5,.5)
    .setScale(.35,.35);
    
    // this.time.delayedCall(1000, function() {
        this.scene.launch('SceneGameplay');
        this.scene.bringToTop('SceneLoading'); 
    // },null, this)
}