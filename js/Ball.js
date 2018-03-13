const Ball = function() {
	const r=20
	let x=Math.floor(width/2)
	let y=Math.floor(height/2)
	let speedX=6 * randomDirection()
	let speedY=6 * randomDirection()

	const draw = function(){
		ellipseMode(CENTER)
		fill('#fff')
		noStroke()
		ellipse(x, y, r*2, r*2)
	}

	const reset = function() {
		x = Math.floor(width/2)
		y = Math.floor(height/2)

		speedX *= randomDirection()
		speedY *= randomDirection()
	}

	const move = function() {
		x += speedX
		y += speedY
		edges()
	}

	const edges = function() {
		if (y + r >= height || y - r <= 0)
			speedY *= -1
	}

	function randomDirection() {
		return Math.round(Math.random()) * 2 - 1
	}

	const checkScore = function() {
		if (x - r <= 0) {
			reset()
			return 2
		}
		if (x + r >= width) {
			reset()
			return 1
		}
		return 0
	}

	const collision = function(player) {
		let dx = Math.abs(x - player.getX() - player.getW() / 2)
		let dy = Math.abs(y - player.getY() - player.getH() / 2)

		if (dx > player.getW() / 2 + r || dy > player.getH() / 2 + r)
			return false

		if (dx <= player.getW() / 2 || dy <= player.getH() / 2) {
			speedX *= -1
			return true
		}
	}

	return {
		draw,
		move,
		collision,
		checkScore,
	}
}