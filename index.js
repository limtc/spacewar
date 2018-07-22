/**
    Space War - by Lim Thye Chean
**/

const TITLE = 0;
const PLAY = 1;
const OVER = 2;

const EXPLODE_COLOR = RGBColor(255, 255, 255, 127);

var score = 0;
var game;
var ship;
var power = new Power();
var sy = [];
var ss = [];

var titleImage = loadImage("title.jpg");
var overImage = loadImage("over.jpg");

var music = getSound("musicPhotonix", "mp3");
var shieldSound = getSound("soundShield", "wav");
var healthSound = getSound("soundHealth", "wav");
var laserSound = getSound("soundLaser", "wav");
var rfireSound = getSound("soundRapidFire", "wav");
var tfireSound = getSound("soundTwinFire", "wav");
var sfireSound = getSound("soundSpreadFire", "wav");
var explosionSound = getSound("soundExplosion", "wav");

// Setup

graphics();
setPenSize(2);
music.loop = 9;

for (i = 0; i < 10; i++) {
	sy[i] = random(480);
	ss[i] = random(3) + 2;
}

// Start Game

showGameTitle();
registerEvents();
setInterval(main, 50);

// Show Game Title

function showGameTitle() {
	game = TITLE;
	hideElement("comment");
	showElement("message");
}

// Show Game

function showGame() {
	game = PLAY;
	ship = new Ship(140, 380);
	score = 0;
	alienCount = 0;
	
	for (i = 0; i < ALIEN_SIZE; i++)
		aliens[i] = new Alien(random(280), -40 - random(200));
	
	hideElement("message");
	setElement("score", score);	
	play(music);
}

// Show Game Over

function showGameOver() {
	var comment;
	game = OVER;
	power.hide();
	stop(music);
	
	if (score >= 8000)
		comment = "Awesome!";
	else if (score >= 6000)
		comment = "Excellent!";
	else if (score >= 4000)
		comment = "Well Done!";
	else if (score >= 2000)
		comment = "Not Bad.";
	else
		comment = "Try Again.";	
		
	setElement("comment", comment);
	showElement("comment");
}

// Main loop

function main() {	
	switch (game) {
		case PLAY:
			drawGame();
			break;
		
		case TITLE:
			drawGameTitle();
			break;
			
		case OVER:
			drawGameOver();
			break;
	}
}

// Draw Game

function drawGame() {
	clearScreen();
	drawStars();
	
	// Draw health bar
	
	setColor(BLUE);
	paintRect(10, 20, 10 + 10 * (ship.health), 20);

	// Draw aliens
	
	for (i in aliens) {
		var alien = aliens[i];
        alien.move();
		alien.fireBullet();
		alien.moveBullet();
		
		for (b = 0; b < SHIP_BULLET; b++) {
			if (alien.y > -40 && alien.collideBullet(b)) {				
				if (random(6) == 0)
					power.show(alien.x, alien.y);
				
				score += alien.getScore();
				alien.explode();
				ship.resetBullet(b);
				setElement("score", score);
			}	
		}
		
		if (ship.collideBullet(alien) || ship.collideAlien(alien)) {
			if (!ship.alive) {
				play(explosionSound);
				showGameOver();
			}
		}
	}
	
	// Draw ship
	
	ship.draw();
	ship.moveBullet();
	
	// Draw power
	
	power.move();
	if (power.collide()) {
		power.hide();
		
		switch (power.type) {
			case POWER_SHIELD:
				ship.shield++;
				play(shieldSound);
				break;
				
			case POWER_HEALTH:
				ship.health += 2;
				play(healthSound);
				break;
				
			case POWER_LASER:
				setPenColor(WHITE);

				for (i in aliens) {
					var alien = aliens[i];	
					
					if (alien.y > -40) {
						line(ship.x + 20, ship.y, alien.x + 20, alien.y + 20);
						score += alien.getScore();
						alien.explode();
					}
					else
						if (random(2) == 0)
							line(ship.x + 20, ship.y, 0, random(480));
						else
							line(ship.x + 20, ship.y, 319, random(480));
				}
				
				play(laserSound);
				break;
				
			case POWER_RFIRE:
				ship.firePower = POWER_RFIRE;
				ship.timerMax = 4;
				play(rfireSound);
				break;
				
			case POWER_TFIRE:
				ship.firePower = POWER_TFIRE;
				play(tfireSound);
				break;
				
			case POWER_SFIRE:
				ship.firePower = POWER_SFIRE;
				play(sfireSound);
				break;
		}
	}
	
	if (ship.timer > 0)
		ship.timer--;
}

// Draw Game title

function drawGameTitle() {
	clearScreen();
	drawImage(titleImage, 0, 0);
	drawStars();
}

// Draw Game Over

function drawGameOver() {
	drawImage(overImage, 0, 0);
	drawStars();

	for (i in aliens) {
		var alien = aliens[i];
		
        alien.move();
		alien.moveBullet();
	}
	
	 ship.moveBullet();
}

// Draw Stars

function drawStars() {	
	setColor(WHITE);
	
	for (i = 0; i < 10; i++) {
		plot(i * 32 + 16, sy[i]);
		
		sy[i] += ss[i];
        if (sy[i] > 480) {
            sy[i] = 0;
			ss[i] = random(3) + 2;
		}
	}	
}

// Get sound

function getSound(sound, type) {
	return new Audio("sound/" + sound + "." + type);
	// return sound;
}

// Play sound

function play(sound) {
	if (sound != null)
		sound.play();
		
	//	document.location = sound + ":";
}

// Stop sound

function stop(sound) {
	if (sound != null) {
		sound.pause();
		sound.currentTime = 0;
	}
}