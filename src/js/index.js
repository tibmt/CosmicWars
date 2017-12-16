import '../style/style.css';

import * as PIXI from 'pixi.js';
import * as Constant from './const.js'

import * as firstLazerSound from '../sounds/sfx_laser1.ogg'
import * as secondLazerSound from '../sounds/sfx_laser2.ogg'

import * as bkgImg from '../img/backgroundImgBlue.png'

import {functionalKeys} from './functionalKeys.js'
import {Howl} from 'howler';
import {initGame} from './initGame.js'
import {play} from './play.js'

class Game {

    constructor(name) {

        this.name = name;
        this.count = 0;
        this.index = 1;
        this.myHP = 100;
        this.enemyHP = 40;
        this.distance = 0;
        this.shootCount = 0;
        this.shootUpgreyd = 0;
        this.gameTime = 0;
        this.lastTime = Date.now();
        this.enemyShootSoundCount = true;
        this.tilingSpriteSpeed = 0;
        this.accuracyTrue = 0;
        this.accuracyFalse = 0;
        this.bonusCount = 0;
        this.boltTimer = 0;

        this.app = new PIXI.Application(Constant.width, Constant.height);

    }

    /**
     *  This method initialize menu
     */

    init() {

        /**
         * Add PIXI.Application on the screen
         */
        document.body.appendChild(this.app.view);

        /**
         * Draw background
         */
        this.texture = PIXI.Texture.fromImage(bkgImg),

            this.tilingSprite = new PIXI.extras.TilingSprite(
                this.texture,
                this.app.renderer.width,
                this.app.renderer.height
            );

        this.app.stage.addChild(this.tilingSprite);

        /**
         * Add buttons on the screen
         */
        this.buttons = [1, 1, 1];

        this.buttonPositions = [
            Constant.buttonPosWidth, 100,
            Constant.buttonPosWidth, 250,
            Constant.buttonPosWidth, 400
        ];

        this.buttons = this.buttons.map( (item, index) => {

            item = new PIXI.Graphics();
            item.beginFill(Constant.orange);
            item.drawRoundedRect(0, 0, 300, 100, 15);
            item.endFill();
            item.interactive = true;
            item.buttonMode = true;

            /**
             * You can click on the buttons
             */
            if(index === 0){
                item.on('pointerdown', () => {
                    this.app.stage.children.length = 0;
                    // this.app.start();
                    this.initGame();
                });

            }
            if(index === 1){
                item.on('pointerdown', () => {
                    this.controls();
                });

            }
            if(index === 2){
                item.on('pointerdown', () => {
                    this.description();
                });
            }
            item.position.set(this.buttonPositions[index * 2], this.buttonPositions[index * 2 + 1]);
            this.app.stage.addChild(item);

            /**
             * Add text on the buttons
             */
            this.styleItemText = new PIXI.TextStyle({
                fontSize: 35,
                fill: Constant.white,
                dropShadow: true,
                dropShadowColor: Constant.black,
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6
            });
            this.itemText = new PIXI.Text(Constant.text[index], this.styleItemText);
            this.itemText.anchor.set(0.5);
            this.itemText.position.set(item.width / 2, item.height / 2);
            item.addChild(this.itemText);

            return item

        });

    }

    /**
     * This method open controls field
     */

    controls() {

        /**
         * Remove all items on screen
         */
        this.app.stage.children.length = 1;

        /**
         * Sets style to text
         */
        this.controlsStyle = new PIXI.TextStyle({
            fontSize: 60,
            fill: Constant.white,
            dropShadow: true,
            dropShadowColor: Constant.black,
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6
        });
        this.controlsKeyStyle = new PIXI.TextStyle({
            fontSize: 60,
            fill: Constant.yellow,
            dropShadow: true,
            dropShadowColor: Constant.black,
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6
        });

        /**
         * Add controls text on the screen
         */
        this.controlsTextOne = new PIXI.Text('To Move your ship use the', this.controlsStyle);
        this.controlsTextOne.anchor.set(0.5);
        this.controlsTextOne.position.set(Constant.controlsTextWidth - 100, 200);
        this.app.stage.addChild(this.controlsTextOne);

        this.controlsTextOneKey = new PIXI.Text('arrows', this.controlsKeyStyle);
        this.controlsTextOneKey.anchor.set(0.5);
        this.controlsTextOneKey.position.set(this.controlsTextOne.width / 2 + 100, 0 );
        this.controlsTextOne.addChild(this.controlsTextOneKey);

        this.controlsTextTwo = new PIXI.Text('To shoot you have to press', this.controlsStyle);
        this.controlsTextTwo.anchor.set(0.5);
        this.controlsTextTwo.position.set(Constant.controlsTextWidth - 50, 300);
        this.app.stage.addChild(this.controlsTextTwo);

        this.controlsTextTwoKey = new PIXI.Text('\'Z\'', this.controlsKeyStyle);
        this.controlsTextTwoKey.anchor.set(0.5);
        this.controlsTextTwoKey.position.set(this.controlsTextOne.width / 2 + 50, 0 );
        this.controlsTextTwo.addChild(this.controlsTextTwoKey);

        this.controlsTextThree = new PIXI.Text('To exit the menu press', this.controlsStyle);
        this.controlsTextThree.anchor.set(0.5);
        this.controlsTextThree.position.set(Constant.controlsTextWidth - 50, 400);
        this.app.stage.addChild(this.controlsTextThree);

        this.controlsTextThreeKey = new PIXI.Text('\'M\'', this.controlsKeyStyle);
        this.controlsTextThreeKey.anchor.set(0.5);
        this.controlsTextThreeKey.position.set(this.controlsTextThree.width / 2 + 50, 0 );
        this.controlsTextThree.addChild(this.controlsTextThreeKey);
    }

    /**
     *  This method open description field
     */

    description() {

        /**
         * Remove all items on screen
         */
        this.app.stage.children.length = 1;

        /**
         * Sets style to text
         */
        this.descriptionStyle = new PIXI.TextStyle({
            fontSize: 40,
            fontFamily: "Arial",
            fill: Constant.white,
            dropShadow: true,
            dropShadowColor: Constant.black,
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6
        });

        /**
         * Add description text on the screen
         */
        this.controlsTextOne = new PIXI.Text('Get ready for a huge space battle,', this.descriptionStyle);
        this.controlsTextTwo = new PIXI.Text('the enemy army is preparing to attack us.,', this.descriptionStyle);
        this.controlsTextThree = new PIXI.Text('You need to sit in a space ship and rush to meet them.', this.descriptionStyle);
        this.controlsTextFour = new PIXI.Text('Forward, to protect the Earth', this.descriptionStyle);

        this.controlsTextOne.anchor.set(0.5);
        this.controlsTextTwo.anchor.set(0.5);
        this.controlsTextThree.anchor.set(0.5);
        this.controlsTextFour.anchor.set(0.5);

        this.controlsTextOne.position.set(Constant.controlsTextWidth, Constant.height / 2 - 100);
        this.controlsTextTwo.position.set(Constant.controlsTextWidth, this.controlsTextOne.y + 50);
        this.controlsTextThree.position.set(Constant.controlsTextWidth, this.controlsTextOne.y + 100);
        this.controlsTextFour.position.set(Constant.controlsTextWidth, this.controlsTextOne.y + 150);

        this.app.stage.addChild(this.controlsTextOne);
        this.app.stage.addChild(this.controlsTextTwo);
        this.app.stage.addChild(this.controlsTextThree);
        this.app.stage.addChild(this.controlsTextFour);

    }

    /**
     *  This method start game
     */

    initGame() {

        initGame.initGameMethod(this)

        this.sounds();

        this.gameLoop();

    }

    /**
     *  This method make game loop
     */

    gameLoop() {

        setInterval(() => {

            play.playMethod(this);
            this.app.renderer.render(this.app.stage);

        }, Constant.gameLoopSec);

    }

    /**
     *  Timer in the game
     */

    timer() {

        this.now = Date.now()

        this.dt = (this.now - this.lastTime) / 1000.0;

        this.gameTime += this.dt;

        this.lastTime = this.now;

    }

    /**
     *  Sounds of game
     */

    sounds() {

        this.myShootSound = new Howl({
            src: firstLazerSound
        });

        this.enemyShootSound = new Howl({
            src: secondLazerSound
        });

    }

}
let cosmicWars = new Game('Cosmic Wars');
cosmicWars.init();
functionalKeys.functionalKeysMethod(cosmicWars);

