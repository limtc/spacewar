/**
    Power
**/

const POWER_SHIELD = 0;
const POWER_HEALTH = 1;
const POWER_LASER = 2;
const POWER_RFIRE = 3;
const POWER_TFIRE = 4;
const POWER_SFIRE = 5;

var powerImages = [];

powerImages[POWER_SHIELD] = loadImage("pshield.png");
powerImages[POWER_HEALTH] = loadImage("phealth.png");
powerImages[POWER_LASER] = loadImage("plaser.png");
powerImages[POWER_RFIRE] = loadImage("prfire.png");
powerImages[POWER_TFIRE] = loadImage("ptfire.png");
powerImages[POWER_SFIRE] = loadImage("psfire.png");

function Power() {
	this.x = -1;
    this.y = -1;
	this.type;
	this.shown = false;
	
	// Show power
	
	this.show = function(x, y) {
		if (!this.shown) {
			this.x = x;
			this.y = y;
			this.type = random(6);
			this.shown = true;
		}
	}

	// Hide power
	
	this.hide = function() {
		this.shown = false;
	}
	
	// Check collision
	
	this.collide = function() {
		return (this.shown && this.x > ship.x - 40 && this.x + 40 < ship.x + 80 && this.y > ship.y - 40 && this.y + 40 < ship.y + 80);
	}
	
	// Move power
	
	this.move = function() {
		if (this.shown) {
			drawImage(powerImages[this.type], this.x, this.y);

			this.y++;
			if (this.y > 480)
				this.hide();
		}
	}
}