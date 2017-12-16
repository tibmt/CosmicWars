import * as Constant from '../const.js'

class GameOverClass {

    constructor(){

    }

    /**
     * @param that - access to cosmicWars
     *  Game Over of game
     */

    gameOverMethod(that) {

        /**
         * Remove all items on screen
         */
        that.app.stage.children.length = 1;
        that.enemyShootSoundCount = false;

        if(that.accuracyFalse === 0) that.accuracyFalse = 1;

        /**
         * Sets style to text
         */
        that.style = new PIXI.TextStyle({
            fontSize: 60,
            fill: Constant.white,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6
        });

        /**
         * Add Game Over Text on screen
         */
        that.gameOverMessage = new PIXI.Text(`Game Over bro`, that.style);

        that.gameOverMessage.position.set(Constant.width / 2, 200);
        that.gameOverMessage.anchor.set(0.5);

        that.gameOverScoreMessage = new PIXI.Text(`Your score - ${that.count}
Your distance - ${Math.round(that.distance)},
Your accuracy - ${Math.round(that.accuracyTrue / that.accuracyFalse * 100)} %`, that.style);

        that.gameOverScoreMessage.anchor.set(0.5)
        that.gameOverScoreMessage.position.set(Constant.width / 2, 350);
        that.app.stage.addChild(that.gameOverMessage);
        that.app.stage.addChild(that.gameOverScoreMessage);

        /**
         * Updates games features
         */
        that.enemiesContainer.children.length = 0;
        that.shootContainer.children.length = 0;
        that.enemyShootContainer.children.length = 0;

        that.myHP = 100;
        that.count = 0;
        that.index = 0;
        that.myHP = 100;
        that.enemyHP = 40;
        that.distance = 0;
        that.shootCount = 0;
        that.shootUpgreyd = 0;
        that.gameTime = 0;
        that.lastTime = Date.now();
        that.tilingSpriteSpeed = 0;
    }

}

const gameOver = new GameOverClass();

export {gameOver};
