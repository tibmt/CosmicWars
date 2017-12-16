class Container {

    constructor() {

    }

    /**
     *
     * @param sprite - first object
     * @param container - container which contains or not object
     * @returns {string|string|string|undefined|*|string}
     * If container contain sprite and touch border
     * return top|left|right|bottom - touch side
     */

    containMethod(sprite, container) {

        this.collision = undefined;

        /**
         * Detect Left collision
         */
        if (sprite.x < container.x) {
            sprite.x = container.x;
            this.collision = "left";
        }

        /**
         * Detect Up collision
         */
        if (sprite.y < container.y) {
            sprite.y = container.y;
            this.collision = "top";
        }

        /**
         * Detect Right collision
         */
        if (sprite.x + sprite.width > container.width) {
            sprite.x = container.width - sprite.width;
            this.collision = "right";
        }

        /**
         * Detect Bottom collision
         */
        if (sprite.y + sprite.height > container.height) {
            sprite.y = container.height - sprite.height;
            this.collision = "bottom";
        }

        /**
         * Return the `collision` value
         */
        return this.collision;

    }

}

const contain = new Container();

export {contain}
