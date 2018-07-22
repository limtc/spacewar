/**
	Spaceship
**/

const SHIP_TIMER = 10;
const SHIP_BULLET = 12;
const SHIELD_COLOR = RGBColor(0, 255, 255, 64);

var shipImage = loadImage("ship.png");

function Ship(x, y) {
    this.x = x;
    this.y = y;
	this.alive = true;
	this.shield = 0;
	this.health = 10;
	this.timer = 0;
	this.firePower = POWER_RFIRE;
	this.timerMax = SHIP_TIMER;

	var bullets = [];
	
	for (i = 0; i < SHIP_BULLET; i++)
		bullets[i] = new Bullet();

	// Get bullet
	
	this.getBullet = function(b) {
		return bullets[b];
	}
	
	// Draw ship
	
	this.draw = function() {
		if (this.shield > 0) {
			setColor(SHIELD_COLOR);
			paintCircle(this.x + 20, this.y + 20, 30);
		}
		
		drawImage(shipImage, this.x, this.y);	
	}
	
	// Move ship
	
	this.move = function(dx, dy) {
		this.x += dx;
		this.y += dy;
	}
	
	// Damage ship
	
	this.damage = function(dmg) {
		if (this.shield > 0) {
			this.shield -= dmg;
			if (this.shield < 0)
				this.shield = 0;
		}
		else {
			this.health -= dmg;
			this.timerMax = SHIP_TIMER;			
		}
		
		setColor(EXPLODE_COLOR);
		paintCircle(this.x + 20, this.y + 20, 30);

		if (this.health <= 0) {
			this.alive = false;
			paintCircle(this.x + 20, this.y + 20, 100);
		}
	}
	
	// Fire
	
	this.fire = function() {
		if (this.timer == 0) {
			switch (this.firePower) {
				case POWER_TFIRE:
					this.fireBullet(-15, 20, 0);
					this.fireBullet(15, 20, 0);
					break;
					
				case POWER_SFIRE:
					this.fireBullet(-5, 10, -2);
					this.fireBullet(5, 10, 2);
					break;
					
				default:
					this.fireBullet(0, 0, 0);
			}
		}
	}
		
	this.fireBullet = function(dx, dy, bx) {
		for (i in bullets) {
			var bullet = bullets[i];
			
			if (!bullet.shown) {
				bullet.show(this.x + 20 + dx, this.y - 20 + dy, bx, -15);
				this.timer = this.timerMax;
				return;
			}
		}
	}
	
	// Move bullet
	
	this.moveBullet = function() {
		for (i in bullets) {
			var bullet = bullets[i];
			
			if (bullet.shown) {
				setPenColor(WHITE);
				line(bullet.x, bullet.y, bullet.x, bullet.y + 20); 
				bullet.move();
			}	
		}
	}
	
	// Reset bullet
	
	this.resetBullet = function(b) {
		bullets[b].hide();
	}
	
	// Collision detection
	
   this.collideAlien = function(alien) {
	   var ax = alien.x;
	   var ay = alien.y;
	   
	   if (ax > this.x - 40 && ax + 40 < this.x + 80 && ay > this.y - 40 && ay + 40 < this.y + 80) {
		   alien.explode();
		   alien.reset();
		   ship.damage(2);
		   return true;
	   }
	   else
		   return false;
    }
    
    this.collideBullet = function(alien) {
		var ax = alien.getBullet().x;
		var ay = alien.getBullet().y;
		
		if (ax > this.x && ax < this.x + 40 && ay + 20 > this.y && ay + 20 < this.y + 40) {
			alien.resetBullet();
			ship.damage(1);
			return true;
    	}
    	
    	return false;
    } 
}