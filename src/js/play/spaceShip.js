import {contain} from '../lib/contains.js'
import {collision} from '../lib/collision.js'
import {gameOver} from './gameOver.js'
import * as Constant from '../const.js'

class SpaceShip{

    constructor() {

    }

    /**
     * @param that - access to cosmicWars
     *  All things about my Space Ship
     */

    spaceShipInit(that) {

        /**
         * My ship movement
         */
        that.spaceShip.x += that.spaceShip.vx;
        that.spaceShip.y += that.spaceShip.vy;

        /**
         * My shoots movement
         */
        that.shootContainer.children.forEach((item) => {
            item.x += 10;
        });

        /**
         * Detect if my space ship touch border
         */
        that.blobHitsWall = contain.containMethod(that.spaceShip, {x: 0, y: 0, width: Constant.width, height: Constant.height});

        if (that.blobHitsWall === "top") {
            that.spaceShip.y = 0;
        }
        if (that.blobHitsWall === "bottom") {
            that.spaceShip.y = Constant.height - 99;
        }
        if (that.blobHitsWall === "left") {
            that.spaceShip.x = 0;
        }
        if (that.blobHitsWall === "right") {
            that.spaceShip.xy = Constant.width;
        }

        /**
         * My shoot which got right border disappear
         */
        that.shootContainer.children.forEach((item) => {
            if (contain.containMethod(item, {x: 0, y: 0, width: Constant.width, height: Constant.height})) {
                that.shootContainer.removeChild(item);
            }
        });

        /**
         * Detect if I hit the enemy
         */
        if (that.shootContainer.children.length && that.enemiesContainer.children.length) {
            that.shootContainer.children.forEach((shootItem) => {
                that.enemiesContainer.children.forEach((enemyItem) => {
                    if (collision.hitTestRectangle(enemyItem, shootItem)) {

                        enemyItem.HP -= 20;
                        that.shootContainer.removeChild(shootItem);
                        that.count += 5;
                        that.accuracyTrue += 1;
                    }
                })
            })
        }

        /**
         * My space ship death
         */
        if (that.myHP <= 0) {

            gameOver.gameOverMethod(that);

        }

        /**
         * Detect if there is collision between my apsce ship and enemy ship
         */
        if (that.enemiesContainer.children.length) {
            that.enemiesContainer.children.forEach((item) => {
                if (collision.hitTestRectangle(that.spaceShip, item)) {
                    item.HP -= 40;
                    that.myHP -= 50;
                }
            })
        }

    }

}

const myShip = new SpaceShip();

export {myShip}
