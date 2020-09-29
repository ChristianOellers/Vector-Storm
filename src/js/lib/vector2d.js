/**
 * ES6 upgrade of original source:
 *
 * @author
 *   Vector2d V1.0.0
 *   (c) 2010 by R Cecco. <http://www.professorcloud.com>
 *   MIT License
 *   ---
 *   Please retain this copyright header in all versions of the software
 */
class Vector2D {

  constructor (x, y) {
    this.vx = x;
    this.vy = y;
  }

  // Scale up/down
	scale (val) {
		this.vx *= val;
		this.vy *= val;
	}

	// Add another vector
	add (vector) {
		this.vx += vector.vx;
		this.vy += vector.vy;
	}

	// Subtract another vector
	subtract (vector) {
		this.vx -= vector.vx;
		this.vy -= vector.vy;
	}

	dotProduct (val) {
		return (this.vx * val.vx) + (this.vy * val.vy);
	}

	// Negate - Point to opposite direction
	negate () {
		this.vx = -this.vx;
		this.vy = -this.vy;
	}

	// Normalize unit length
  // Return length before normalisation
	normalize () {
		var size = Math.sqrt(this.vx * this.vx + this.vy * this.vy);

    if (size) {
			this.vx /= size;
			this.vy /= size;
		}

		return size;
	}

	// Rotate by angle in radians
	rotate (angle) {
		this.vx = (this.vx * Math.cos(angle)) - (this.vy * Math.sin(angle));
		this.vy = (this.vy * Math.cos(angle)) + (this.vx * Math.sin(angle));
	}

	// Length
	size () {
		return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
	}

  // Fast length calculation - Return squared length
  // Useful to just compare vector lengths
	sizeSquared () {
		return this.vx * this.vx + this.vy * this.vy;
	}

	// Debug
	toString () {
		return 'vx = ' + this.vx + ', vy = ' + this.vy;
	}

}

