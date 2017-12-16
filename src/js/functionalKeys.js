import {keyboard} from './lib/keyBoard.js';

class FunctionalKeysClass{
    
    constructor() {
        
    }

    /**
     *
     *  All things about control-keys
     *  and how to use it
     */
    
    functionalKeysMethod(that) {
        that.left = keyboard(37);
        that.up = keyboard(38);
        that.right = keyboard(39);
        that.down = keyboard(40);
        that.fire = keyboard(90);
        that.menu = keyboard(77);

        /**
         * Add Left arrow methods
         */
        that.left.press = () => {
            that.spaceShip.vx = -5;
            that.spaceShip.vy = 0;
        };
        that.left.release = () => {
            if (!that.right.isDown && that.spaceShip.vy === 0) {
                that.spaceShip.vx = 0;
            }
        };

        /**
         * Add Up arrow methods
         */
        that.up.press = () => {
            that.spaceShip.vy = -5;
            that.spaceShip.vx = 0;
        };
        that.up.release = () => {
            if (!that.down.isDown && that.spaceShip.vx === 0) {
                that.spaceShip.vy = 0;
            }
        };

        /**
         * Add Right arrow methods
         */
        that.right.press = () => {
            that.spaceShip.vx = 5;
            that.spaceShip.vy = 0;
        };
        that.right.release = () => {
            if (!that.left.isDown && that.spaceShip.vy === 0) {
                that.spaceShip.vx = 0;
            }
        };

        /**
         * Add Down arrow methods
         */
        that.down.press = () => {
            that.spaceShip.vy = 5;
            that.spaceShip.vx = 0;
        };
        that.down.release = () => {
            if (!that.up.isDown && that.spaceShip.vx === 0) {
                that.spaceShip.vy = 0;
            }
        };

        /**
         * Add 'Z' methods
         */
        that.fire.press = () => {

            that.myShootSound.play();
            if (that.shootUpgreyd) {

                that.shootOne = new PIXI.Sprite(that.shootTexture);

                that.shootOne.anchor.set(0.5);
                that.shootOne.x = that.spaceShip.x + that.spaceShip.width / 2;
                that.shootOne.y = that.spaceShip.y + that.spaceShip.height / 2 - 15;
                that.shootContainer.addChild(that.shootOne);

                that.shootTwo = new PIXI.Sprite(that.shootTexture);

                that.shootTwo.anchor.set(0.5);
                that.shootTwo.x = that.shootOne.x;
                that.shootTwo.y = that.spaceShip.y + that.spaceShip.height / 2 + 15;
                that.shootContainer.addChild(that.shootTwo);

                that.accuracyFalse += 2;
            } else {

                that.shoot = new PIXI.Sprite(that.shootTexture);

                that.shoot.anchor.set(0.5);
                that.shoot.x = that.spaceShip.x + that.spaceShip.width / 2;
                that.shoot.y = that.shootCount % 2 === 0 ? that.spaceShip.y + that.spaceShip.height / 2 + 15 : that.spaceShip.y + that.spaceShip.height / 2 - 15;
                that.shootContainer.addChild(that.shoot);
                that.accuracyFalse += 1;
            }
            that.shootCount++;
        };

        /**
         * Add 'M' methods
         */
        that.menu.press = () => {

            // that.app.stop();
            // that.app.renderer.resize(100, 100);

            that.count = 0;
            that.index = 1;
            that.myHP = 100;
            that.enemyHP = 40;
            that.distance = 0;
            that.shootCount = 0;
            that.shootUpgreyd = 0;
            that.gameTime = 0;
            that.lastTime = Date.now();
            that.enemyShootSoundCount = false;
            that.accuracyTrue = 0;
            that.accuracyFalse = 0;

            that.app.stage.children.length = 1;

            that.init();

        }
    }

}

const functionalKeys = new FunctionalKeysClass();

export {functionalKeys};
