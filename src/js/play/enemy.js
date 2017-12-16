import {contain} from '../lib/contains.js'
import {collision} from '../lib/collision.js'
import * as Constant from '../const.js'

class Enemy {

    constructor() {

    }

    /**
     * @param that - access to cosmicWars
     *  All things about enemies
     */

    enemyInit(that) {

        /**
         * Enemy movement
         */
        that.enemiesContainer.children.forEach((item) => {
            that.enemy.vx = -1.5;
            item.x += that.enemy.vx;
        });

        /**
         * Enemies shoot movement
         */
        that.enemyShootContainer.children.forEach((item) => {
            item.x -= 10;
        });

        /**
         * Start enemies disposition
         */
        if (that.index === 1) {
            for (let i = 0; i < 3; i++) {
                that.y = Math.random() * Constant.height;

                that.enemy = new PIXI.Sprite(that.enemyTexture);

                that.enemy.x = Constant.width + Math.random() * 1250;
                that.enemy.y = that.y < 93 ? 0 : that.y - 93;
                that.enemy.HP = that.enemyHP;
                that.enemiesContainer.addChild(that.enemy);
            }
            that.index++;
        }
        /**
         * After start enemies disposition
         */
        if (that.enemiesContainer.children.length === 0) {

            for (let i = 0; i < 2 * that.index + 1; i++) {
                that.y = Math.random() * Constant.height;

                that.enemy = new PIXI.Sprite(that.enemyTexture);

                that.enemy.x = Constant.width + Math.random() * 1250;
                that.enemy.y = that.y < 93 ? 0 : that.y - 93;
                that.enemy.HP = that.enemyHP;
                that.enemiesContainer.addChild(that.enemy);
            }
            that.index++;
        }

        /**
         * Enemies shoot drawing
         */
        that.enemiesContainer.children.forEach((item) => {
            if (Math.random() < 0.01 && item.x < Constant.width) {

                if(that.enemyShootSoundCount){
                    that.enemyShootSound.play();
                }

                that.enemyShoot = new PIXI.Sprite(that.enemyShootTexture);

                that.enemyShoot.anchor.set(0.5);
                that.enemyShoot.x = item.x + item.width / 2;
                that.enemyShoot.y = item.y + item.height / 2;
                that.enemyShootContainer.addChild(that.enemyShoot);
            }
        });

        /**
         * Enemy which got left border disappears
         */
        that.enemiesContainer.children.forEach((item) => {
            if (contain.containMethod(item, {x: -100, y: 0, width: 5000, height: Constant.height + 100})) {
                that.enemiesContainer.removeChild(item);
            }
        });

        /**
         * Enemies shoot which got left border disappears
         */
        that.enemyShootContainer.children.forEach((item) => {
            if (contain.containMethod(item, {x: item.width, y: 0, width: Constant.width, height: Constant.height})) {
                that.enemyShootContainer.removeChild(item);
            }
        });

        /**
         * Detect enemies shoot hit
         */
        if (that.enemiesContainer.children.length) {
            that.enemyShootContainer.children.forEach((item) => {
                if (collision.hitTestRectangle(that.spaceShip, item)) {
                    that.enemyShootContainer.removeChild(item);
                    that.myHP -= 20;
                }
            })
        }

        /**
         * Enemies death
         */
        that.enemiesContainer.children.forEach((item) => {
            if (item.HP <= 0) {

                if(Math.random() < 0.05 && that.bolt.count === true && that.bonusCount === 0){
                    that.bolt.x = item.x + item.width / 2 ;
                    that.bolt.y = item.y + item.height / 2;
                    that.bolt.count = false;
                    that.bolt.vx = -3.5;
                    that.bonusCount += 1;
                }
                if(Math.random() < 0.05 && that.star.count === true && that.bonusCount === 0){
                    that.star.x = item.x + item.width / 2 ;
                    that.star.y = item.y + item.height / 2;
                    that.star.count = false;
                    that.star.vx = -3.5;
                    that.bonusCount += 1;
                }
                if(Math.random() < 0.05 && that.pill.count === true && that.bonusCount === 0){
                    that.pill.x = item.x + item.width / 2 ;
                    that.pill.y = item.y + item.height / 2;
                    that.pill.count = false;
                    that.pill.vx = -3.5;
                    that.bonusCount += 1;
                }

                that.enemiesContainer.removeChild(item);
            }
        });

    }

}

const enemies = new Enemy();

export {enemies}
