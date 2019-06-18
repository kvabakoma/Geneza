/*
0. declare races: races[ahriman, ]
1. declare videos array: videos[ahriman, anima...]
2. declare bodyparts array: bodyparts[left_hand] = ahriman
3. load spritesheets: left_hand[0] = ahriman anim; left_hand[1] = 
4. write input controller
5. on bodypart change, check if 

*/

var SceneGameplay = new Phaser.Scene('SceneGameplay');

SceneGameplay.init = function() {
    this.races = ['AHRIMAN', 'ANIMA', 'ENTROPIA', 'GENEZA', 'MATERIA', 'SAPIENS', 'SYSTEMA'];
    this.videos = ['AHRIMAN', 'ANIMA', 'ENTROPIA', 'GENEZA', 'MATERIA', 'SAPIENS', 'SYSTEMA'];
    this.bodyparts = ['HEAD', 'ARM_LEFT', 'ARM_RIGHT', 'LEG_LEFT', 'LEG_RIGHT', 'BODY', 'CROTCH'];
    this.myStatics = [];
    // this.spritesheets = [][];
}

SceneGameplay.preload = function() {
    // console.log("In Scene: SceneGameplay")  
    this.cameras.main.setBackgroundColor('#000')
    this.load.atlas('frame', 'assets/img/frame.png', 'assets/img/frame.json');
}

SceneGameplay.create = function() {
    console.log("in SceneGameplay")
    this.scene.bringToTop('SceneGameplay'); // BRING GAMEPLAY SCENE TO TOP AFTER THE ASSETS HAVE LOADED
    this.setupAnims();
    this.setupLevel();
}

SceneGameplay.update = function() {

}

SceneGameplay.setupAnims = function() {
    this.anims.create({
        key: 'frameAnim',
        frames: this.anims.generateFrameNames('frame', {
            start: 1, end: 3, 
            prefix: 'FRAME_0', suffix: '.png'
        }),
        frameRate: 12,
        repeat: -1
    });
}

SceneGameplay.setupLevel = function() {
    this.myStatics.asd = this.add.sprite(0, 0, 'frame', 'FRAME_01.png')
    .setOrigin(.5,.5)
    .setPosition(game.config.width*.5)
    .setScale(1.08,1.08);
    this.myStatics.asd.play('frameAnim');
}