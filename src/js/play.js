import {bonus} from './play/bonuses.js'
import {enemies} from './play/enemy.js'
import {myShip} from './play/spaceShip.js'

class PlayClass{
    
    constructor() {
        
    }

    /**
     *
     * @param that - access to cosmicWars
     *  This method init all game method
     */
    
    playMethod(that) {

        that.timer();

        /**
         * Calculate distance
         */
        that.distance += 1 / 10;

        /**
         * Draw HealthBar
         */
        that.header.children[1].width = that.myHP;

        /**
         * Init bonus
         */
        bonus.bonusInit(that);

        /**
         * Init enemies
         */
        enemies.enemyInit(that);

        /**
         * Init my Space Ship
         */
        myShip.spaceShipInit(that);

    }
    
}

const play = new PlayClass();

export {play}
