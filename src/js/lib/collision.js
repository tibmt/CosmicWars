class Collision {

    constructor() {

    }

    /**
     *
     * @param r1 - first object
     * @param r2 - second object
     * @returns {boolean}
     *  This method compare two objects collision
     */

    hitTestRectangle(r1, r2) {

        this.hit;
        this.combinedHalfWidths;
        this.combinedHalfHeights;
        this.vx;
        this.vy;

        /**
         * hit will determine whether there's a collision
         */
        this.hit = false;

        /**
         * Find the center points of each sprite
         */
        r1.centerX = r1.x + r1.width / 2;
        r1.centerY = r1.y + r1.height / 2;
        r2.centerX = r2.x + r2.width / 2;
        r2.centerY = r2.y + r2.height / 2;

        /**
         * Find the half-widths and half-heights of each sprite
         */
        r1.halfWidth = r1.width / 2;
        r1.halfHeight = r1.height / 2;
        r2.halfWidth = r2.width / 2;
        r2.halfHeight = r2.height / 2;

        /**
         * Calculate the distance vector between the sprites
         */
        this.vx = r1.centerX - r2.centerX;
        this.vy = r1.centerY - r2.centerY;

        /**
         * Figure out the combined half-widths and half-heights
         */
        this.combinedHalfWidths = r1.halfWidth + r2.halfWidth;
        this.combinedHalfHeights = r1.halfHeight + r2.halfHeight;

        /**
         * Check for a collision on the x axis
         */
        if (Math.abs(this.vx) < this.combinedHalfWidths) {

            /**
             * A collision might be occuring. Check for a collision on the y axis
             */
            if (Math.abs(this.vy) < this.combinedHalfHeights) {

                /**
                 * There's definitely a collision happening
                 */
                this.hit = true;
            } else {

                /**
                 * There's no collision on the y axis
                 */
                this.hit = false;
            }
        } else {

            /**
             * There's no collision on the x axis
             */
            this.hit = false;
        }

        /**
         * `hit` will be either `true` or `false`
         */
        return this.hit;

    }

}

const collision = new Collision();

export {collision}
