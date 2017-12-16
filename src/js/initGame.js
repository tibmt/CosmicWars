import * as Constant from './const.js'

import * as bkgImg from '../img/backgroundImgBlue.png'
import * as shipBlue from '../img/playerShip1_blue.png'
import * as lazerBlue from '../img/laserBlue02.png'
import * as lazerRed from '../img/laserRed02.png'
import * as enemyRed from '../img/enemyRed1.png'
import * as bolt from '../img/bolt_gold.png'
import * as pill from '../img/pill_yellow.png'
import * as star from '../img/star_gold.png'

class InitGameClass{
    
    constructor() {
        
    }

    /**
     * @param that - access to cosmicWars
     *  This method start game
     */
    
    initGameMethod(that) {

        that.tilingSpriteSpeed = -1;

        /**
         * Draw background
         */
        that.texture = PIXI.Texture.fromImage(bkgImg);

        that.tilingSprite = new PIXI.extras.TilingSprite(
            that.texture,
            that.app.renderer.width,
            that.app.renderer.height
        );

        that.app.stage.addChild(that.tilingSprite);
        that.app.ticker.add( () => {
            that.tilingSprite.tilePosition.x += that.tilingSpriteSpeed;
        });

        /**
         * Draw header(with healthBar)
         */
        that.header = new PIXI.Container();

        that.header.position.set(0, 0);
        that.app.stage.addChild(that.header);

        /**
         * Add healthBar on header
         */
        that.healthBarBlack = new PIXI.Graphics();

        that.healthBarBlack.beginFill(Constant.healthBarBlack);
        that.healthBarBlack.drawRoundedRect(5, 5, 100, 20, 10);
        that.healthBarBlack.endFill();
        that.header.addChild(that.healthBarBlack);

        that.healthBarRed = new PIXI.Graphics();

        that.healthBarRed.beginFill(Constant.healthBarRed);
        that.healthBarRed.drawRoundedRect(5, 5, 100, 20, 10);
        that.healthBarRed.endFill();
        that.header.addChild(that.healthBarRed);

        /**
         * Add my Space Ship on screen
         */
        that.spaceShip = PIXI.Sprite.fromImage(shipBlue);

        that.spaceShip.x = 50;
        that.spaceShip.y = that.app.renderer.height / 2;
        that.spaceShip.vx = 0;
        that.spaceShip.vy = 0;
        that.app.stage.addChild(that.spaceShip);

        /**
         * Draw my shoots
         */
        that.shootContainer = new PIXI.Container();

        that.app.stage.addChild(that.shootContainer);
        that.shootTexture = PIXI.Texture.fromImage(lazerBlue);

        /**
         * Draw enemies shoots
         */
        that.enemyShootContainer = new PIXI.Container();

        that.app.stage.addChild(that.enemyShootContainer);
        that.enemyShootTexture = PIXI.Texture.fromImage(lazerRed);

        /**
         * Draw enemies
         */
        that.enemiesContainer = new PIXI.Container();

        that.app.stage.addChild(that.enemiesContainer);
        that.enemyTexture = PIXI.Texture.fromImage(enemyRed);

        that.enemy = new PIXI.Sprite(that.enemyTexture);
        that.enemy.vx = -1.5;

        /**
         * Draw bonuses
         */
        that.bonusContainer = new PIXI.Container();

        that.app.stage.addChild(that.bonusContainer);
        that.pillTexture = PIXI.Texture.fromImage(pill);

        that.boltTexture = PIXI.Texture.fromImage(bolt);

        that.starTexture = PIXI.Texture.fromImage(star);

        that.pill = new PIXI.Sprite(that.pillTexture);

        that.pill.anchor.set(0.5);
        that.pill.x = Constant.width + 100;
        that.pill.y = 100;
        that.pill.count = true;
        that.pill.vx = 0;
        that.bonusContainer.addChild(that.pill);

        that.bolt = new PIXI.Sprite(that.boltTexture);

        that.bolt.anchor.set(0.5);
        that.bolt.x = Constant.width + 100;
        that.bolt.y = 100;
        that.bolt.count = true;
        that.bolt.vx = 0;
        that.bonusContainer.addChild(that.bolt);

        that.star = new PIXI.Sprite(that.starTexture);

        that.star.anchor.set(0.5);
        that.star.x = Constant.width + 100;
        that.star.y = 100;
        that.star.count = true;
        that.star.vx = 0;
        that.bonusContainer.addChild(that.star);
        
    }
    
}

const initGame = new InitGameClass();

export {initGame}
