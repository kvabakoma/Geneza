var SceneGameplay = new Phaser.Scene('SceneGameplay');

SceneGameplay.init = function() {
    console.log(game.config.height)
    this.races = ['SAPIENS','SYSTEMA', 'ENTROPIA', 'AHRIMAN','MATERIA','ANIMA','GENEZA' ];
    this.bodyparts = {
        'HEAD':this.getRandomRace(),
        'ARM LEFT':this.getRandomRace(),
        'ARM RIGHT':this.getRandomRace(),
        'LEG LEFT':this.getRandomRace(),
        'LEG RIGHT':this.getRandomRace(),
        'BODY':this.getRandomRace(),
        'CROUCH':this.getRandomRace()
    };
    console.log(this.bodyparts)
    this.body = {};
    this.videoIsPlaying = false;
    this.bodySounds = {};
    this.bodysounds = {
        'HEAD':this.bodyparts['HEAD'],
        'ARM LEFT':this.bodyparts['ARM LEFT'],
        'ARM RIGHT':this.bodyparts['ARM RIGHT'],
        'LEG LEFT':this.bodyparts['LEG LEFT'],
        'LEG RIGHT':this.bodyparts['LEG RIGHT'],
        'BODY':this.bodyparts['BODY'],
        'CROUCH':this.bodyparts['CROUCH']};
    this.sounds = {};
    this.defaultSFXvolume = .5;

    console.log( this.races[Math.floor(Math.random()*this.races.length)] )
}

SceneGameplay.preload = function() {

    this.load.atlas('ui', 'assets/img/ui.png', 'assets/img/ui.json');
    
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
    this.loadSounds();

}

SceneGameplay.create = function() {
    console.log("in SceneGameplay WEB")
    
    this.loadingContainer = this.add.container(game.config.width * .5, game.config.height * .5)
    .setDepth(99);
    
    var graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xaa0000 }, fillStyle: { color: 0x000000 } });
    var rect = new Phaser.Geom.Rectangle(game.config.width * -.45, game.config.height * -.45, game.config.width*.9, game.config.height*.9)
    graphics.fillRectShape(rect);
    
    // this.add.sprite(game.config.width*.502, game.config.height * .182, 'SAPIENS', 'HEAD/HEAD_1.png')
    this.titleImg = this.add.sprite(0, 0, 'ui', 'loading.png')
    .setOrigin(.5,.5)
    .setPosition(0,0)
    .setScale(.35,.35);
    
    this.startBtn = this.add.image(0, 0, 'ui','start.png')
    .setOrigin(.5,.5)
    .setPosition(0, game.config.height * .2)
    .setScale(.35,.35)
    .setInteractive()
    .on('pointerdown', function (pointer, localX, localY, event) {
        this.setupSounds();
        this.loadingContainer.destroy(true);
        document.getElementById('buttons').style.display = "flex";
    }, this);  
    
    this.loadingContainer.add(graphics)
    this.loadingContainer.add(this.titleImg)
    this.loadingContainer.add(this.startBtn)
    
    this.setupAnims();
    this.setupLevel();
    this.setupKeyboardControlls();    
    this.scene.bringToTop('SceneGameplay'); // BRING GAMEPLAY SCENE TO TOP AFTER THE ASSETS HAVE LOADED
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
        for(j = 0; j < Object.keys(this.bodyparts).length; j++) {
            var bpart = Object.keys(this.bodyparts)[j];
            // console.log('bpanim-'+this.races[i]+"-"+Object.keys(this.bodyparts)[j])
            this.anims.create({
                
                key: 'bpanim-'+this.races[i]+"-"+Object.keys(this.bodyparts)[j],
                frames: this.anims.generateFrameNames(this.races[i], {
                    start: 1, end: 16,
                    prefix: bpart + "/"+bpart+"_", suffix: '.png'
                }),
                frameRate: 8,
                repeat: -1
            });
        }
    }
}

SceneGameplay.loadSounds = function () {
    for (i = 0; i < this.races.length; i++) {
        for(j = 0; j < Object.keys(this.bodyparts).length; j++) {
            SceneGameplay.load.audio('sound-'+this.races[i]+"-"+Object.keys(this.bodyparts)[j], 'assets/sounds/'+this.races[i]+"-"+encodeURIComponent(Object.keys(this.bodyparts)[j])+'.wav');  // urls: an array of file url
        }
    }
}

SceneGameplay.setupSounds = function () {
    
    for (i = 0; i < this.races.length; i++) {
        for(j = 0; j < Object.keys(this.bodyparts).length; j++) {
            SceneGameplay.bodySounds['sound-'+this.races[i]+"-"+Object.keys(this.bodyparts)[j]] = SceneGameplay.sound.add('sound-'+this.races[i]+"-"+Object.keys(this.bodyparts)[j], {
                volume: SceneGameplay.defaultSFXvolume,
                loop: true
            });
        }
    }
}

SceneGameplay.setupLevel = function() {
    this.sceneFrame = this.add.sprite(0, 0, 'frame', 'FRAME_01.png')
    .setOrigin(.5,.5)
    .setPosition(game.config.width*.5)
    .setScale(1.08,1.08);
    this.sceneFrame.play('frameAnim');
    
    this.body['HEAD'] = this.add.sprite(game.config.width*.502, game.config.height * .182, 'ui', 'Head.png')
    .setOrigin(.5,.5)
    .setDepth(7);
    
    this.body['ARM LEFT'] = this.add.sprite(game.config.width*.26, game.config.height * .357, 'ui', 'Left Arm.png')
    .setOrigin(.5,.5)
    .setDepth(3);
    
    this.body['ARM RIGHT'] = this.add.sprite(game.config.width*.775, game.config.height * .478, 'ui', 'Right Arm.png')
    .setOrigin(.5,.5)
    .setDepth(4);
    
    this.body['BODY'] = this.add.sprite(game.config.width*.503, game.config.height * .289, 'ui', 'Body.png')
    .setOrigin(.5,.5)
    .setDepth(6);
    
    this.body['CROUCH'] = this.add.sprite(game.config.width*.503, game.config.height * .518, 'ui', 'Hip.png')
    .setOrigin(.5,.5)
    .setDepth(5);
    
    this.body['LEG LEFT'] = this.add.sprite(game.config.width*.463, game.config.height * .735, 'ui', 'Left Leg.png')
    .setOrigin(.5,.5)
    .setDepth(1);
    
    this.body['LEG RIGHT'] = this.add.sprite(game.config.width*.549, game.config.height * .735, 'ui', 'Right Leg.png')
    .setOrigin(.5,.5)
    .setDepth(2);
    
    /* this.template = this.add.image(game.config.width * .5, game.config.height*.5, 'TEMPLATE')
    .setOrigin(.5,.5); */
    
}

SceneGameplay.setupKeyboardControlls = function () {
    this.input.keyboard.on('keydown-' + 'A', function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[0], false);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'S', function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[1], false);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'D', function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[2], false);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'F', function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[3], false);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'G', function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[4], false);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'H', function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[5], false);
    }.bind(this));
    this.input.keyboard.on('keydown-' + 'J', function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[6], false);
    }.bind(this));

    $('#btnHead').click(function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[0], false);
    }.bind(this));
    $('#btnArmLeft').click(function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[1], false);
    }.bind(this));
    $('#btnArmRight').click(function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[2], false);
    }.bind(this));
    $('#btnLegLeft').click(function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[3], false);
    }.bind(this));
    $('#btnLegRight').click(function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[4], false);
    }.bind(this));
    $('#btnBody').click(function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[5], false);
    }.bind(this));
    $('#btnCrouch').click(function (event) {
        this.buttonPressed(Object.keys(this.bodyparts)[6], false);
    }.bind(this));
    

    /* 'HEAD':this.getRandomRace(),
        'ARM LEFT':this.getRandomRace(),
        'ARM RIGHT':this.getRandomRace(),
        'LEG LEFT':this.getRandomRace(),
        'LEG RIGHT':this.getRandomRace(),
        'BODY':this.getRandomRace(),
        'CROUCH':this.getRandomRace() */
}

SceneGameplay.buttonPressed = function (i, init) {
    console.log(i)
    if (this.videoIsPlaying) return;
    
    this.bodyparts[i] = this.races[(this.races.indexOf(this.bodyparts[i]) + 1) % this.races.length]

    this.body[i].play('bpanim-'+this.bodyparts[i]+'-'+i);
    
    console.log(i)
    if (SceneGameplay.bodysounds[i].isPlaying) SceneGameplay.bodysounds[i].stop();
    SceneGameplay.bodysounds[i] = SceneGameplay.sound.add('sound-'+this.bodyparts[i]+'-'+i, {
        volume: SceneGameplay.defaultSFXvolume,
        loop: true
    });
    if (game.sound.context.state === 'suspended') {
        game.sound.context.resume();
    }
    SceneGameplay.bodysounds[i].play();
    
    if (checkIfEqual (this.bodyparts) && !SceneGameplay.videoIsPlaying && !init) {
        console.log('starting video');
        
        this.videoIsPlaying = true;
        var videoSrc = 'assets/videos/'+ this.bodyparts["HEAD"]+'.mp4'
        videoPlayer.src(videoSrc)
        setTimeout(function () {
            document.getElementById('my-video').classList.remove('display-none');
            document.getElementById('my-video').classList.add('display-block');
            videoPlayer.play();
            videoPlayer.muted(false)
            SceneGameplay.fadeOutVolume();
        },1000)
    }   
    
}

SceneGameplay.endVideo = function() {
    SceneGameplay.videoIsPlaying = false;
    console.log('video ended');
    document.getElementById('my-video').classList.remove('display-block');
    document.getElementById('my-video').classList.add('display-none');
    SceneGameplay.fadeInVolume();
}

function checkIfEqual (bodyparts) {
    var result = true;
    for (i = 1; i < Object.values(bodyparts).length; i++) {
        if (Object.values(bodyparts)[i] != Object.values(bodyparts)[0] || Object.values(bodyparts)[i] == null) result = false;
    }
    return result;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function photoEpilepsy() {
    
}

SceneGameplay.stopSFX = function () {
    for (i = 0; i < Object.values(SceneGameplay.bodysounds).length; i++) {
        if (Object.values(SceneGameplay.bodysounds)[i].isPlaying) {
            Object.values(SceneGameplay.bodysounds)[i].stop();
        }
    }
}

SceneGameplay.fadeOutVolume = function() {
    var muted = true;
    for (i = 0; i < Object.values(SceneGameplay.bodysounds).length; i++) {
        Object.values(SceneGameplay.bodysounds)[i].setVolume(Object.values(SceneGameplay.bodysounds)[i].volume - .0125);
        if (i == Object.values(SceneGameplay.bodysounds).length - 1 && Object.values(SceneGameplay.bodysounds)[i].volume > 0) muted = false;
    }
    if (!muted) {
        setTimeout(function(){
            SceneGameplay.fadeOutVolume();
        },40);
    }
}

SceneGameplay.fadeInVolume = function() {
    var muted = true;
    for (i = 0; i < Object.values(SceneGameplay.bodysounds).length; i++) {
        Object.values(SceneGameplay.bodysounds)[i].setVolume(Object.values(SceneGameplay.bodysounds)[i].volume + .0125);
        if (i == Object.values(SceneGameplay.bodysounds).length - 1 && Object.values(SceneGameplay.bodysounds)[i].volume < SceneGameplay.defaultSFXvolume) muted = false;
    }
    if (!muted) {
        setTimeout(function(){
            SceneGameplay.fadeInVolume();
        },40);
    }
}

SceneGameplay.getRandomRace = function () {
    return this.races[Math.floor(Math.random()*this.races.length)];
}

