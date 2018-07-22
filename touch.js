/**
    Touch Event
**/

// Register events

function registerEvents() {
	onEvent("touchstart", onTouchStart);
	onEvent("touchmove", onTouchMove);
	onEvent("touchend", onTouchEnd);
}

// Handle touch events

function onTouchStart(event) {
	event.preventDefault();
	
	if (game == PLAY)
		ship.fire();
	else if (game == TITLE)
		showGame();
	else
		showGameTitle();
}

function onTouchMove(event) {
	event.preventDefault();
	
	if (game == PLAY) {
		var touches = event.touches;
		var x = touches[0].pageX;
		var y = touches[0].pageY;
		var sx = ship.x;
		var sy = ship.y;
		
		ship.fire();
		
		if (x >= 20) {
			x -= 20;
			
			if (sx < x - 10)
				ship.move(10, 0);
			else if (sx > x + 10)
				ship.move(-10, 0);
		}
		
		if (y >= 80) {
			y -= 80;
			
			if (sy < y - 10)
				ship.move(0, 10);
			else if (sy > y + 10)
				ship.move(0, -10);
		}
	}
}

function onTouchEnd(event) {
	event.preventDefault();
	ship.fire();
}