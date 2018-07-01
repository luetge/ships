import {AUTO, Game} from "phaser";
import boatImg from "/assets/sprites/Ships/boatymacboat.png"

var config = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload,
        create,
        update,
        render
    }
};

var game = new Game(config);
var keys
var player
var taxMan

function preload ()
{
	console.log('preloading...')
    this.load.image('boat', boatImg);
}

function create ()
{
	console.log('creating...')
    player = this.physics.add.image(0, 0, 'boat')
    taxMan = this.physics.add.image(0, 0, 'boat')
    //player.setDebug(true, true, Phaser.Display.Color(255,255,0).color) // showBody, showVelocity, bodyColor
    console.log(this)
    console.log(player)

    player.setDamping(true)
    player.setDrag(.95)
    player.setMaxVelocity(100)

    taxMan.setDamping(true)
    taxMan.setDrag(.9)
    taxMan.setMaxVelocity(90)


    player.__proto__.turnLeft = function () {player.setRotation(player.rotation - Math.PI / 36)}
    player.__proto__.turnRight = function () {player.setRotation(player.rotation + Math.PI / 36)}
    // find better verb for navigating forward
    player.__proto__.sail = function () {
    	player.scene.physics.velocityFromRotation(player.rotation, 100, player.body.acceleration)}

    //Phaser.Display.Align.In.Center(boat, this.add.zone(window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight))
    keys = this.input.keyboard.addKeys('LEFT,RIGHT,UP')

    //this.physic.add.image(window.innerWidth/2, innerHeight/2, player)

}

function update ()
{
	if (keys.LEFT.isDown == true){player.turnLeft()}
	if (keys.RIGHT.isDown == true){player.turnRight()}
	if (keys.UP.isDown == true){player.sail()}
	else{player.setAcceleration(0)}

	var a = Phaser.Math.Angle.Between(taxMan.x, taxMan.y, player.x, player.y)
	console.log(a)
	if (a > 0){
		if (a > Math.PI/3){
			taxMan.angle += Math.PI/3
			taxMan.setAcceleration(0)
		} else {
			//taxMan.angle += a
			if (Phaser.Math.Distance.Between(taxMan.x, taxMan.y, player.x, player.y) > 10)
			taxMan.scene.physics.velocityFromRotation(taxMan.rotation, 90, taxMan.body.acceleration)
		}
	} else if (a < 0) {
		if (a < -Math.PI/3){
			taxMan.angle += -Math.PI/3
			taxMan.setAcceleration(0)
		} else {
			//taxMan.angle += a
			if (Phaser.Math.Distance.Between(taxMan.x, taxMan.y, player.x, player.y) > 10)
			taxMan.scene.physics.velocityFromRotation(taxMan.rotation, 90, taxMan.body.acceleration)
		}
	}
	
}

function render()
{
	//this.debug.inputInfo(20, 20)
}

if (module.hot) {
  module.hot.accept(function () {
    const game_element = document.querySelector('canvas');
    game_element && game_element.parentNode.removeChild(game_element);
  });
}
