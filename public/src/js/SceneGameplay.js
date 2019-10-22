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
    this.races = ['SAPIENS','SYSTEMA', 'ENTROPIA', 'AHRIMAN','MATERIA','ANIMA','GENEZA' ];
    this.bodyparts = {'HEAD':'SAPIENS', 'ARM LEFT':'SAPIENS', 'ARM RIGHT':'SAPIENS', 'LEG LEFT':'SAPIENS', 'LEG RIGHT':'SAPIENS', 'BODY':'SAPIENS', 'CROUCH':'SAPIENS'};
    this.body = {};
    this.videoIsPlaying = false;
}

SceneGameplay.preload = function() {
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
    this.setupSounds();
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

SceneGameplay.setupSounds = function () {
    for (i = 0; i < this.races.length; i++) {
        for(j = 0; j < Object.keys(this.bodyparts).length; j++) {
            if (this.races[i].indexOf('ENTROPIA') >= 0) {
                /* console.log("*************************************************")
                console.log('sound-'+this.races[i]+"-"+Object.keys(this.bodyparts)[j])
                console.log('assets/sounds/'+this.races[i]+"-"+Object.keys(this.bodyparts)[j]+'.wav') */
                // console.log('assets/sounds/'+this.races[i]+"-"+encodeURIComponent(Object.keys(this.bodyparts)[j])+'.wav')
                SceneGameplay.load.audio('sound-'+this.races[i]+"-"+Object.keys(this.bodyparts)[j], 'assets/sounds/'+this.races[i]+"-"+encodeURIComponent(Object.keys(this.bodyparts)[j])+'.wav');  // urls: an array of file url
                // this.sound.play('sound-'+this.races[i]+"-"+Object.keys(this.bodyparts)[j])
            }
        }
    }
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

    this.body['ARM RIGHT'] = this.add.sprite(game.config.width*.775, game.config.height * .478, 'SAPIENS', 'ARM RIGHT/ARM RIGHT_1.png')
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
    if (this.videoIsPlaying) return;
    this.bodyparts[i] = this.races[(this.races.indexOf(this.bodyparts[i]) + 1) % this.races.length]
    if (checkIfEqual (this.bodyparts) ) {
       /* console.log('starting video');
        document.getElementById('my-video').classList.remove('display-none');
        document.getElementById('my-video').classList.add('display-block');
        this.videoIsPlaying = true;
        videoPlayer.play();*/
    }
    // console.log('bpanim-'+this.bodyparts[i]+'-'+i)
    this.body[i].play('bpanim-'+this.bodyparts[i]+'-'+i);

}

SceneGameplay.adjustBody=function (newBodyParts,init) {

  if(Object.keys(newBodyParts).length > 0){
    Object.keys(newBodyParts).forEach(function (key, index) {
      if (newBodyParts[key] ) {
        SceneGameplay.bodyparts[key] = newBodyParts[key]
        SceneGameplay.body[key].visible = true
        SceneGameplay.body[key].play('bpanim-'+newBodyParts[key]+'-'+key);

        if (newBodyParts[key].indexOf('ENTROPIA') >= 0) {
            console.log('sound-'+newBodyParts[key]+'-'+key)
            console.log(SceneGameplay.sound)
            SceneGameplay.sound.play('sound-'+newBodyParts[key]+'-'+key)
        }
      } else {

        SceneGameplay.bodyparts[key] = 'EMPTY'
        SceneGameplay.body[key].visible = false
      }

    });
    if (checkIfEqual (this.bodyparts) &&  !SceneGameplay.videoIsPlaying && !init) {
      console.log('starting video');

      this.videoIsPlaying = true;
        var videoSrc = '/assets/videos/'+ this.bodyparts["HEAD"]+'.mp4'

       videoPlayer.src(videoSrc)
      setTimeout(function () {
        document.getElementById('my-video').classList.remove('display-none');
        document.getElementById('my-video').classList.add('display-block');
        videoPlayer.play();
       // videoPlayer.muted(false)
        console.log(videoPlayer)
      },1000)

    }
  }


}


SceneGameplay.endVideo = function() {
    SceneGameplay.videoIsPlaying = false;
    console.log('video ended');
 // videoPlayer.muted(true)
    document.getElementById('my-video').classList.remove('display-block');
    document.getElementById('my-video').classList.add('display-none');
}

function checkIfEqual (bodyparts) {
    var result = true;
    for (i = 1; i < Object.values(bodyparts).length; i++) {
        if (Object.values(bodyparts)[i] != Object.values(bodyparts)[0]) result = false;
    }
    return result;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

function photoEpilepsy() {

}

