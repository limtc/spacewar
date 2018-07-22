/**
    Alien
**/

const ALIEN_MAX = 8;
const ALIEN_WAVE = 40; // 40
const ALIEN_SIZE = 5;
const ALIEN_COLORS = [RED, LBLUE, PBLUE, ORANGE, GREEN, YELLOW];

var alienCount = 0;
var alienImages = [];
var aliens = [];

alienImages[0] = loadImage("rock1.png");
alienImages[1] = loadImage("rock2.png");

for (i = 2; i < ALIEN_MAX; i++)
	alienImages[i] = loadImage("alien" + (i - 1) + ".png");

function Alien(x, y) {
    this.x = x;
    this.y = y;
	
	var type = 0;
	var bcolor = 0;
	var bullet = new Bullet();
	var speedX = random(3);
	var speedY = random(3) + 2;

	if (random(2) == 0)
		speedX = -speedX;
	
	// Get bullet
	
	this.getBullet = function() {
		return bullet;
	}
	
	// Move alien
	
	this.move = function() {
		drawImage(alienImages[type], this.x, this.y);
		
		if (this.y < -40)
			this.y += speedY + 2;
		else {	
			switch (type) {
			
				// Asteroid stages
			
				case 0:
					this.y += speedY + 2;						
					break;
					
				case 1:
					this.x += speedX;
					this.y += speedY + 2;
	
					if (this.x < -40)
						this.x = 320;
					else if (this.x > 320)
						this.x = -40;
						
					break;
					
				// Alien stages
						
				case 2:
					this.x += speedX;
					this.y += speedY + 3;
				
					if (this.x < -40) {
						this.x = 320;
						this.y = random(100);
					}
					else if (this.x > 320) {
						this.x = -40;
						this.y = random(100);
					}
						
					break;
					
				case 3:
					this.x += speedX * 2;
					
					if (this.x < -40 || this.x > 320) {
						speedX = -speedX;
						this.x += speedX * 2;
						this.y = random(100);
					}
					else {
						if (this.y > 0)
							this.y++;
						else
							this.y += speedY + 3;
					}					
					
					break;
						
				case 4:
					this.x += speedX * 2;
							
					if (this.y < 20 || this.x < 40 || this.x > 240) {
						this.y += speedY + 3;
							
						if (this.x < 0 || this.x > 280)
							speedX = -speedX;
					}
						
					break;
						
				case 5:
					if (this.y < 120)
						this.y += speedY + 4;
					else {
						this.x += speedX * 2;
						this.y += speedY + 2;
				
						if (this.x < -40)
							this.x = 320;
						else if (this.x > 320)
							this.x = -40;
					}

						
					break;
						
				case 6:
					if (this.y < 80) {
						this.x += speedX * 2;
						this.y += speedY + 1;
		
						if (this.x < 0 || this.x > 280) {
							speedX = -speedX;
							this.x += speedX * 2;
						}
					}
					else
						this.y += speedY;
						
					break;		
					
				default:
					this.x += speedX * 2;
					this.y += speedY + 3;
	
					if (this.x < 0 || this.x > 280) {
						speedX = -speedX;
						this.x += speedX * 2;
					}
					else if (this.x < 40 || this.x > 240)
						this.x--;
					else
						this.y--;
			}
			
			if (this.y > 480) {
				this.x = random(280);
				this.y = -40;
				speedX = random(3);
				speedY = random(3);

				if (random(2) == 0)
					speedX = -speedX;
				
			}
		}
	}
	
	// Explode alien
	
	this.explode = function() {
		setColor(ORANGE);
		paintCircle(this.x + 20, this.y + 20, 30);
		alienCount++;
		
		this.reset();
	}
	
	// Reset alien
	
	this.reset = function() {
		this.x = random(280);
		this.y = -random(50) - 100;
		speedX = random(3) + 2;
		if (this.x > 160)
			speedX = -speedX;
		
		speedY = random(3) + type + 2;
		
		if (type < ALIEN_MAX - 1) {
			if (alienCount > (type + 1) * ALIEN_WAVE - 5) {
				type++;
				this.y -= 300;
			}
		}
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
			bcolor = ALIEN_COLORS[type - 2];
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
		return 10 + 5 * type;
	}
}