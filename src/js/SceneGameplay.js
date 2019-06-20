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
    this.bodyparts = {'HEAD':'', 'ARM LEFT':'', 'ARM right':'', 'LEG LEFT':'', 'LEG RIGHT':'', 'BODY':'', 'CROUCH':''};
    this.myStatics = [];
/*     this.bodyanims = [];
    console.log(this.bodyanims) */
    
    // randomize starting body parts
    /* for (var property in this.bodyparts) {
        if (this.bodyparts.hasOwnProperty(property)) {
            this.bodyparts[i] = getRandomElement(this.races);
        }
    }
    console.log(this.bodyparts['HEAD']) */
}

SceneGameplay.preload = function() {
    // console.log("In Scene: SceneGameplay")  
    this.cameras.main.setBackgroundColor('#000');
    this.load.image('TEMPLATE', 'assets/img/TAMPLATE_transparent_SAPIENS.png');
    this.load.atlas('frame', 'assets/img/frame.png', 'assets/img/frame.json');
    this.load.atlas('AHRIMAN', 'assets/img/AHRIMAN.png', 'assets/img/AHRIMAN.json');
    this.load.multiatlas('ANIMA', 'assets/img/ANIMA.json', 'assets/img');
    this.load.atlas('ENTROPIA', 'assets/img/ENTROPIA.png', 'assets/img/ENTROPIA.json');
    this.load.atlas('GENEZA', 'assets/img/GENEZA.png', 'assets/img/GENEZA.json');
    this.load.atlas('MATERIA', 'assets/img/MATERIA.png', 'assets/img/MATERIA.json');
    this.load.atlas('SAPIENS', 'assets/img/SAPIENS.png', 'assets/img/SAPIENS.json');
    this.load.atlas('SYSTEMA', 'assets/img/SYSTEMA.png', 'assets/img/SYSTEMA.json');
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
    
    for (i = 0; i < this.races.length; i++) {
        // console.log('outer loop');
        for(j = 0; j < Object.keys(this.bodyparts).length; j++) {            
            var bpart = Object.keys(this.bodyparts)[j];
            // console.log(bpart + "/"+bpart+"_")
            this.anims.create({
                key: 'bpanim-'+this.races[i]+"-"+Object.keys(this.bodyparts)[j],
                frames: this.anims.generateFrameNames(this.races[i], {
                    start: 1, end: 16, 
                    prefix: bpart + "/"+bpart+"_", suffix: '.png'
                }),
                frameRate: 12,
                repeat: -1
            });
        }        
    }
    console.log(this.anims);        
}

SceneGameplay.setupLevel = function() {
    this.sceneFrame = this.add.sprite(0, 0, 'frame', 'FRAME_01.png')
    .setOrigin(.5,.5)
    .setPosition(game.config.width*.5)
    .setScale(1.08,1.08);
    this.sceneFrame.play('frameAnim');
    
    this.bodyHEAD = this.add.sprite(game.config.width*.502, game.config.height * .182, 'SAPIENS', 'HEAD/HEAD_1.png')
    .setOrigin(.5,.5);

    this.bodyLeftArm = this.add.sprite(game.config.width*.26, game.config.height * .357, 'SAPIENS', 'ARM LEFT/ARM LEFT_1.png')
    .setOrigin(.5,.5);

    this.bodyRightArm = this.add.sprite(game.config.width*.775, game.config.height * .478, 'SAPIENS', 'ARM RIGHT/ARM right_1.png')
    .setOrigin(.5,.5);

    this.bodyBody = this.add.sprite(game.config.width*.503, game.config.height * .289, 'SAPIENS', 'BODY/BODY_1.png')
    .setOrigin(.5,.5);

    this.bodyCrouch = this.add.sprite(game.config.width*.503, game.config.height * .518, 'SAPIENS', 'CROUCH/CROUCH_1.png')
    .setOrigin(.5,.5);

    this.bodyLegLeft = this.add.sprite(game.config.width*.463, game.config.height * .735, 'SAPIENS', 'LEG LEFT/LEG LEFT_1.png')
    .setOrigin(.5,.5);

    this.bodyLegRight = this.add.sprite(game.config.width*.549, game.config.height * .735, 'SAPIENS', 'LEG RIGHT/LEG RIGHT_1.png')
    .setOrigin(.5,.5);

    /* this.template = this.add.image(game.config.width * .5, game.config.height*.5, 'TEMPLATE')
    .setOrigin(.5,.5); */
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