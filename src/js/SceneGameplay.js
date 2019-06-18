/*
0. declare races: races[ahriman, ]
1. declare videos array: videos[ahriman, anima...]
2. declare bodyparts array: bodyparts[left_hand] = ahriman
3. load spritesheets: left_hand[0] = ahriman anim; left_hand[1] = 
4. write input controller
5. on bodypart change, check if the same, if different - change, if different - check if all parts are with the same race and play video
*/

var SceneGameplay = new Phaser.Scene('SceneGameplay');

SceneGameplay.init = function() {
    this.races = ['AHRIMAN', 'ANIMA', 'ENTROPIA', 'GENEZA', 'MATERIA', 'SAPIENS', 'SYSTEMA'];
    this.videos = ['AHRIMAN', 'ANIMA', 'ENTROPIA', 'GENEZA', 'MATERIA', 'SAPIENS', 'SYSTEMA'];
    this.bodyparts = ['HEAD', 'ARM_LEFT', 'ARM_RIGHT', 'LEG_LEFT', 'LEG_RIGHT', 'BODY', 'CROTCH'];
    this.myStatics = [];
    // this.spritesheets = ['HEAD']['AHRIMAN'];
    
    // randomize starting body parts
    for (i = 0; i < this.bodyparts.length; i++) {
        this.bodyparts[i] = getRandomElement(this.races);
        // this.bodyparts[i] = "AHRIMAN";
    }
    console.log(this.bodyparts)
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
    this.setupKeyboardControlls();
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
    this.sceneFrame = this.add.sprite(0, 0, 'frame', 'FRAME_01.png')
    .setOrigin(.5,.5)
    .setPosition(game.config.width*.5)
    .setScale(1.08,1.08);
    this.sceneFrame.play('frameAnim');
    
    
}

SceneGameplay.setupKeyboardControlls = function () {
    this.input.keyboard.on('keydown-' + 'A', function (event) { 
        this.buttonPressed(0);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'S', function (event) { 
        this.buttonPressed(1);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'D', function (event) { 
        this.buttonPressed(2);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'F', function (event) { 
        this.buttonPressed(3);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'G', function (event) { 
        this.buttonPressed(4);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'H', function (event) { 
        this.buttonPressed(5);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'J', function (event) { 
        this.buttonPressed(6);
    }.bind(this));
}

SceneGameplay.buttonPressed = function (i) {
    this.bodyparts[i] = this.races[(this.races.indexOf(this.bodyparts[i]) + 1) % this.races.length]
    console.log(this.bodyparts)
    console.log(checkIfEqual(this.bodyparts));
}

function checkIfEqual (bodyparts) {
    var result = true;
    for (i = 1; i < bodyparts.length; i++) {
        if (bodyparts[i] != bodyparts[0]) result = false;
    }
    return result;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}