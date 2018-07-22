/**
    Boss
**/

var bossImages = [];
var bosss = [];

bossImages[0] = loadImage("boss1.png");
bossImages[1] = loadImage("boss2.png");

function Boss(x, y) {
    this.x = x;
    this.y = y;
    this.shown = false;
	
	var type = 0;
	var bcolor = 0;
	var bullet = new Bullet();
	var speedX = random(3);
	var speedY = random(3);

	if (random(2) == 0)
		speedX = -speedX;
	
	// Get bullet
	
	this.getBullet = function() {
		return bullet;
	}
	
	// Move boss
	
	this.move = function() {
		drawImage(bossImages[type], this.x, this.y);
		
		if (this.y < -160)
			this.y += speedY + 2;
		else {	
			this.x += speedX;
			this.y += speedY + 2;

			if (this.x < -160)
				this.x = 320;
			else if (this.x > 320)
				this.x = -160;
			
			if (this.y > 480) {
				this.x = random(280);
				this.y = -160;
				speedX = random(3);
				speedY = random(3);

				if (random(2) == 0)
					speedX = -speedX;
			}
		}
	}
	
	// Explode boss
	
	this.explode = function() {
		setColor(EXPLODE_COLOR);
		paintCircle(this.x + 20, this.y + 20, 80);
		alienCount++;
	}
	
	// Fire bullet
	
	this.fireBullet = function() {
		if (type > 1 && !bullet.shown && this.y > 0 && random(80 - type * 10) == 0) {
			var bx = 0;
			
			if (this.x < ship.x - 40)
				bx = 1;
			else if (this.x > ship.x + 40)
				bx = -1;
			
			bullet.show(this.x + 20, this.y + 40, bx, 10 + type);
			bcolor = ORANGE;
		}
	}
	
	// Move bullet
	
	this.moveBullet = function() {
		if (bullet.shown) {
			setPenColor(bcolor);
			line(bullet.x, bullet.y, bullet.x, bullet.y + 20);
			bullet.move();
		}
	}
	
	// Reset bullet
	
	this.resetBullet = function() {
		bullet.hide();
	}
	
	// Collide bullet
	
	this.collideBullet = function(j) {
		var sx = ship.getBullet(j).x;
		var sy = ship.getBullet(j).y;
		
		return (sy > 0 && sx > this.x && sx < this.x + 40 && sy > this.y && sy < this.y + 40);
	}
	
	// Get score
	
	this.getScore = function() {
		return 50;
	}
}