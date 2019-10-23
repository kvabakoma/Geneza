var SceneLoading = new Phaser.Scene('SceneLoading');

SceneLoading.preload = function() {
    this.load.image('loading', 'assets/ui/loading.png');
    this.load.image('startBtn', 'assets/ui/start.png')
}

SceneLoading.create = function() {
    this.titleImg = this.add.image(0, 0, 'loading')
    .setOrigin(.5,.5)
    .setPosition(game.config.width * .5)
    .setScale(.35,.35);
    
    /* this.startBtn = this.add.image(0, 0, 'startBtn')
    .setOrigin(.5,.5)
    .setPosition(game.config.width * .5, game.config.height * .7)
    .setScale(.35,.35)
    .setInteractive()
    .on('pointerdown', function (pointer, localX, localY, event) {
        //videoPlayer.muted(false)
        this.scene.launch('SceneGameplay');
    }, this); */
    
    this.time.delayedCall(1000, function() {
        this.scene.launch('SceneGameplay');
    },null, this)
}