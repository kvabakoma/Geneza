var SceneLoading = new Phaser.Scene('SceneLoading');

SceneLoading.preload = function() {
    this.load.image('loading', 'assets/img/loading.png');
}

SceneLoading.create = function() {
    this.titleImg = this.add.image(0, 0, 'loading')
    .setOrigin(.5,.5)
    .setPosition(game.config.width * .5);
    
    this.time.delayedCall(1000, function() {
        this.scene.launch('SceneGameplay');
    },null, this)
}