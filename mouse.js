/**
    Mouse Event
**/

// Register events

function registerEvents() {
	onEvent("mousedown", onMouseDown);
	onEvent("mousemove", onMouseMove);
	onEvent("mouseup", onMouseUp);
}

// Handle mouse events

function onMouseDown(event) {
	event.preventDefault();
	
	if (game == PLAY)
		ship.fire();
	else if (game == TITLE)
		showGame();
	else
		showGameTitle();
}

function onMouseMove(event) {
	event.preventDefault();
	
	if (game == PLAY) {
		var touches = event.touches;
		var x = event.clientX;
		var y = event.clientY;
		var sx = ship.x;
		var sy = ship.y;
		
		ship.fire();
		
		if (x >= 0) {
			x -= 20;
			
			if (sx < x - 10)
				ship.move(10, 0);
			else if (sx > x + 10)
				ship.move(-10, 0);
		}
		
		if (y >= 20) {
			y -= 20;
			
			if (sy < y - 10)
				ship.move(0, 10);
			else if (sy > y + 10)
				ship.move(0, -10);
		}	
	}
}

function onMouseUp(event) {
	event.preventDefault();
}