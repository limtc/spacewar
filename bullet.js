/**
	Bullet
**/

function Bullet() {
	this.x = -1;
	this.y = -1;
	this.dx = 0;
	this.dy = 0;
	this.shown = false;
	
	// Show bullet
	
	this.show = function(x, y, dx, dy) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.shown = true;
	}
	
	this.hide = function() {
		this.x = -1;
		this.y = -1;
		this.shown = false;
	}
  
	// Move bullet
	
	this.move = function() {
		this.x += this.dx;
		this.y += this.dy;
		
		if (this.y < 0 || this.y > 480)
			this.hide();
	}
}