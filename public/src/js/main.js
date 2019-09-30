// GAME
var config = {
    type: Phaser.AUTO,
    parent: 'game', "render.transparent": true,
    scale: {
        mode: Phaser.Scale.FIT, 
        autoCenter: Phaser.Scale.CENTER_BOTH, 
        width: 1080,
        height: 1080,
        pixelArt: true,
    },
    scene: [SceneLoading,SceneGameplay],
    physics: {
        default: false  // no physics system enabled
    },
    disableContextMenu: true,
};
var game = new Phaser.Game(config);

function preload ()
{
    // load 
}

function create ()
{
    
}

function update () 
{
    
}