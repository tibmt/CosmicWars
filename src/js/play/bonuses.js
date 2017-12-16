import {contain} from '../lib/contains.js'
import {collision} from '../lib/collision.js'
import * as Constant from '../const.js'

class Bonus{

    constructor() {

    }

    /**
     * @param that - access to cosmicWars
     *  All things about bonuses
     */

    bonusInit(that) {

        /**
         * Bonuses movement
         */
        that.pill.x += that.pill.vx;
        that.star.x += that.star.vx;
        that.bolt.x += that.bolt.vx;

        /**
         * Bolt collision detection
         */
        if (collision.hitTestRectangle(that.bolt, that.spaceShip)) {
            that.bolt.x = Constant.width + 100 ;
            that.bolt.y = 100;
            that.bolt.count = true;
            that.bolt.vx = 0;
            that.bonusCount = 0;
            that.shootUpgreyd = 1;
            that.boltTimer = that.gameTime;
        }

        /**
         * Detect if bolt got left border
         */
        if (contain.containMethod(that.bolt, {x: -20, y: 0, width: 5000, height: Constant.height + 100})) {
            that.bolt.x = Constant.width + 100 ;
            that.bolt.y = 100;
            that.bolt.count = true;
            that.bolt.vx = 0;
            that.bonusCount = 0;
        }

        /**
         * Star collision detection
         */
        if (collision.hitTestRectangle(that.star, that.spaceShip)) {
            that.star.x = Constant.width + 100 ;
            that.star.y = 200;
            that.star.count = true;
            that.star.vx = 0;
            that.bonusCount = 0;
            that.count += 50;
        }

        /**
         * Detect if star got left border
         */
        if (contain.containMethod(that.star, {x: -20, y: 0, width: 5000, height: Constant.height + 100})) {
            that.star.x = Constant.width + 100 ;
            that.star.y = 200;
            that.star.count = true;
            that.star.vx = 0;
            that.bonusCount = 0;
        }

        /**
         * Pill colision detection
         */
        if (collision.hitTestRectangle(that.pill, that.spaceShip)) {
            that.pill.x = Constant.width + 100 ;
            that.pill.y = 300;
            that.pill.count = true;
            that.pill.vx = 0;
            that.bonusCount = 0;
            if(that.myHP < 80){
                that.myHP += 20;
            } else {
                that.myHP = 100;
            }
        }

        /**
         * Detect if pill got left border
         */
        if (contain.containMethod(that.pill, {x: -20, y: 0, width: 5000, height: Constant.height + 100})) {
            that.pill.x = Constant.width + 100 ;
            that.pill.y = 300;
            that.pill.count = true;
            that.pill.vx = 0;
            that.bonusCount = 0;
        }

        /**
         * Calculate 15 seconds for bolt
         */
        if(that.boltTimer + 15 < that.gameTime && that.boltTimer != 0){
            that.shootUpgreyd = 0;
            that.boltTimer = 0;
        }
    }
}

const bonus = new Bonus();

export {bonus}
