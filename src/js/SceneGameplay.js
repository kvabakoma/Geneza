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
    this.bodyparts = {'HEAD':'SAPIENS', 'ARM LEFT':'SAPIENS', 'ARM RIGHT':'SAPIENS', 'LEG LEFT':'SAPIENS', 'LEG RIGHT':'SAPIENS', 'BODY':'SAPIENS', 'CROUCH':'SAPIENS'};
    this.body = {};
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
    
    this.body['HEAD'] = this.add.sprite(game.config.width*.502, game.config.height * .182, 'SAPIENS', 'HEAD/HEAD_1.png')
    .setOrigin(.5,.5)
    .setDepth(7);

    this.body['ARM LEFT'] = this.add.sprite(game.config.width*.26, game.config.height * .357, 'SAPIENS', 'ARM LEFT/ARM LEFT_1.png')
    .setOrigin(.5,.5)
    .setDepth(3);

    this.body['ARM RIGHT'] = this.add.sprite(game.config.width*.775, game.config.height * .478, 'SAPIENS', 'ARM RIGHT/ARM right_1.png')
    .setOrigin(.5,.5)
    .setDepth(4);

    this.body['BODY'] = this.add.sprite(game.config.width*.503, game.config.height * .289, 'SAPIENS', 'BODY/BODY_1.png')
    .setOrigin(.5,.5)
    .setDepth(6);

    this.body['CROUCH'] = this.add.sprite(game.config.width*.503, game.config.height * .518, 'SAPIENS', 'CROUCH/CROUCH_1.png')
    .setOrigin(.5,.5)
    .setDepth(5);

    this.body['LEG LEFT'] = this.add.sprite(game.config.width*.463, game.config.height * .735, 'SAPIENS', 'LEG LEFT/LEG LEFT_1.png')
    .setOrigin(.5,.5)
    .setDepth(1);

    this.body['LEG RIGHT'] = this.add.sprite(game.config.width*.549, game.config.height * .735, 'SAPIENS', 'LEG RIGHT/LEG RIGHT_1.png')
    .setOrigin(.5,.5)
    .setDepth(2);

    /* this.template = this.add.image(game.config.width * .5, game.config.height*.5, 'TEMPLATE')
    .setOrigin(.5,.5); */
}

SceneGameplay.setupKeyboardControlls = function () {
    this.input.keyboard.on('keydown-' + 'A', function (event) { 
        this.buttonPressed(Object.keys(this.bodyparts)[0]);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'S', function (event) { 
        this.buttonPressed(Object.keys(this.bodyparts)[1]);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'D', function (event) { 
        this.buttonPressed(Object.keys(this.bodyparts)[2]);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'F', function (event) { 
        this.buttonPressed(Object.keys(this.bodyparts)[3]);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'G', function (event) { 
        this.buttonPressed(Object.keys(this.bodyparts)[4]);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'H', function (event) { 
        this.buttonPressed(Object.keys(this.bodyparts)[5]);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'J', function (event) { 
        this.buttonPressed(Object.keys(this.bodyparts)[6]);
    }.bind(this));
}

SceneGameplay.buttonPressed = function (i) {
    console.log(i)
    this.body[i].play('bpanim-'+this.bodyparts[i]+'-'+i);
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