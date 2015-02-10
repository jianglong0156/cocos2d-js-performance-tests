/****************************************************************************
 Cocos2d-html5 show case : Moon Warriors

 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 @Authors:
 Programmer: Shengxiang Chen (陈升想), Dingping Lv (吕定平), Ricardo Quesada
 Effects animation: Hao Wu (吴昊)
 Quality Assurance: Sean Lin (林顺)
 ****************************************************************************/

STATE_PLAYING = 0;
STATE_GAMEOVER = 1;
MAX_CONTAINT_WIDTH = 40;
MAX_CONTAINT_HEIGHT = 40;

var g_sharedGameLayer;

var GameLayer = cc.Layer.extend({
    _time: null,
    _oldTime:0,
    _ship: null,
    _backSky: null,
    _backSkyHeight: 0,
    _backSkyRe: null,
    _levelManager: null,
    _tmpScore: 0,
    _isBackSkyReload: false,
    _isBackTileReload: false,
    screenRect: null,
    explosionAnimation: [],
    _beginPos: cc.p(0, 0),
    _state: STATE_PLAYING,
    _explosions: null,
    _texOpaqueBatch: null,
    _texTransparentBatch: null,
    _totalDt: 0,
    _enemyNode: null,
    _hideAllFlag:false,
    ctor: function () {
        ED._super(this);
        this.init();
    },
    init: function () {
        cc.spriteFrameCache.addSpriteFrames(res.enemys_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.textureTransparentPack_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.textureOpaquePack_plist);
        //cc.spriteFrameCache.addSpriteFrames(res.b01_plist);

        // reset global values
        MW.CONTAINER.ENEMIES = [];
        MW.CONTAINER.ENEMY_BULLETS = [];
        MW.CONTAINER.PLAYER_BULLETS = [];
        MW.CONTAINER.EXPLOSIONS = [];
        MW.CONTAINER.SPARKS = [];
        MW.CONTAINER.HITS = [];
        MW.CONTAINER.BACKSKYS = [];
        MW.CONTAINER.BACKTILEMAPS = [];
        MW.ACTIVE_ENEMIES = 0;

        MW.SCORE = 0;
        MW.LIFE = 4;
        this._state = STATE_PLAYING;

        // OpaqueBatch
        this._texOpaqueBatch = new cc.Node();
        this._sparkBatch = new cc.Node();
        this.addChild(this._texOpaqueBatch);
        this.addChild(this._sparkBatch);

        // TransparentBatch
        this._texTransparentBatch = new cc.Node();
        this.addChild(this._texTransparentBatch);

        this._enemyNode = new cc.SpriteBatchNode(res.enemys_png);
        this.addChild(this._enemyNode);

        winSize = cc.director.getWinSize();
        this._levelManager = new LevelManager(this);

        this.screenRect = cc.rect(0, 0, winSize.width, winSize.height + 10);

        // ship life
        var life = new cc.Sprite("res/ship03.png");
        life.setAnchorPoint(0.5, 0.5);
        life.attr({
            scale: 0.6,
            x: 30,
            y: MW.HEIGHT - 30
        });
        this._texTransparentBatch.addChild(life, 1, 5);

        // ship
        this._ship = new Ship();
        this._texTransparentBatch.addChild(this._ship, this._ship.zOrder, MW.UNIT_TAG.PLAYER);

        // explosion batch node
        cc.spriteFrameCache.addSpriteFrames(res.explosion_plist);

        this._explosions = new cc.SpriteBatchNode(res.explosion_png);
        this.addChild(this._explosions);
        Explosion.sharedExplosion();


        // schedule
        this.scheduleUpdate();
        //ED.schedule(this, this.refreshGame, 0.1);
        ED.schedule(this, this.scoreCounter, 1);


        g_sharedGameLayer = this;

        //pre set
        Bullet.preSet();
        Enemy.preSet();
        HitEffect.preSet();
        SparkEffect.preSet();
        Explosion.preSet();
        BackSky.preSet();
        BackTileMap.preSet();

        this.initBackground();

        return true;
    },

    scoreCounter:function () {
        if (this._state == STATE_PLAYING) {
            //this._time++;
            if (this._oldTime == 0) {
                this._oldTime = new Date().getTime();
            }
            this._time = Math.round(( new Date().getTime() - this._oldTime ) / 1000);
            console.log(this._time);
            if (this._time > 5) {

                this._levelManager.loadLevelResource(this._time);
            }

        }
        if (this._hideAllFlag)
        {
            cc.director.pause();
        }
    },

    processEvent:function (event) {
        if (this._state == STATE_PLAYING) {
            var delta = event.getDelta();
            var curPos = cc.p(this._ship.x, this._ship.y);
            curPos = cc.pAdd(curPos, delta);
            curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
            this._ship.x = curPos.x;
	        this._ship.y = curPos.y;
	        curPos = null;
        }
    },

    addDataInArr:function (dt)
    {
        var nodeNum = 0;
        var i, selChild, children = this._texOpaqueBatch.children;
        if (!children)
        {
            children = this._texOpaqueBatch._children;
        }
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                nodeNum++;
        }

        children = this._sparkBatch.children;
        if (!children)
        {
            children = this._sparkBatch._children;
        }
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                nodeNum++;
        }

        children = this._texTransparentBatch.children;
        if (!children)
        {
            children = this._texTransparentBatch._children;
        }
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                nodeNum++;
        }

        children = this._enemyNode.children;
        if (!children)
        {
            children = this._enemyNode._children;
        }
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                nodeNum++;
        }
        SaveDataToServer.addData(dt, nodeNum);
    },

    update:function (dt) {
        var runTime =ED.getUpdateTime(dt);
        this._totalDt += runTime;
        //console.log(this._totalDt);
        if (this._state == STATE_PLAYING) {
            if (this._totalDt > MW.calcStartTime)
            {
                this.addDataInArr(runTime);
                if (this._totalDt - MW.calcStartTime >= MW.calcTimeOfDuration && !this._hideAllFlag)
                {
                    this._state = STATE_GAMEOVER;
                    //cc.director.pause();
                    SaveDataToServer.sendDataToNet();
                }
            }

            this.removeInactiveUnit(runTime);
            this._movingBackground(runTime);
            this.refreshGame();
        }


    },
    refreshGame:function () {
        if (this._state == STATE_PLAYING) {
            this.checkIsCollide();
            this.checkIsReborn();
            this.updateUI();
        }
    },
    hideAll:function ()
    {
        var selChild;
        for (i = 0; i < MW.CONTAINER.ENEMIES.length; i++) {
            selChild = MW.CONTAINER.ENEMIES[i];
            selChild.setVisible(false);
        }
        for (i = 0; i < MW.CONTAINER.BACKSKYS.length; i++) {
            selChild = MW.CONTAINER.BACKSKYS[i];
            selChild.setVisible(false);
        }
        for (i = 0; i < MW.CONTAINER.BACKTILEMAPS.length; i++) {
            selChild = MW.CONTAINER.BACKTILEMAPS[i];
            selChild.setVisible(false);
        }
        this._hideAllFlag = true;
    },
    checkIsCollide:function () {
        var selChild, bulletChild;
        // check collide
        var i, locShip =this._ship;
        for (i = 0; i < MW.CONTAINER.ENEMIES.length; i++) {
            selChild = MW.CONTAINER.ENEMIES[i];
            if (!selChild.active)
                continue;

            for (var j = 0; j < MW.CONTAINER.PLAYER_BULLETS.length; j++) {
                bulletChild = MW.CONTAINER.PLAYER_BULLETS[j];
                if (bulletChild.active && this.collide(selChild, bulletChild)) {
                    //bulletChild.hurt();
                    //selChild.hurt();
                }
            }
            if (this.collide(selChild, locShip)) {
                if (locShip.active) {
                    selChild.hurt();
                    locShip.hurt();
                }
            }
        }

        for (i = 0; i < MW.CONTAINER.ENEMY_BULLETS.length; i++) {
            selChild = MW.CONTAINER.ENEMY_BULLETS[i];
            if (selChild.active && this.collide(selChild, locShip)) {
                if (locShip.active) {
                    selChild.hurt();
                    locShip.hurt();
                }
            }
        }
    },
    removeInactiveUnit:function (dt) {
        var i, selChild, children = this._texOpaqueBatch.getChildren();
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }

        children = this._sparkBatch.getChildren();
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }

        children = this._texTransparentBatch.getChildren();
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }

        children = this._enemyNode.getChildren();
        for (i in children) {
            selChild = children[i];
            if (selChild && selChild.active)
                selChild.update(dt);
        }

    },
    checkIsReborn:function () {
        var locShip = this._ship;
        if (MW.LIFE > 0 && !locShip.active) {
            locShip.born();
        } else if (MW.LIFE <= 0 && !locShip.active) {
            this._state = STATE_GAMEOVER;
            // XXX: needed for JS bindings.
            this._ship = null;
            this.runAction(cc.sequence(
                cc.delayTime(0.2),
                cc.callFunc(this.onGameOver, this)
            ));
        }
    },
    updateUI:function () {
        if (this._tmpScore < MW.SCORE) {
            this._tmpScore += 1;
        }
    },
    collide:function (a, b) {
	    var ax = a.x, ay = a.y, bx = b.x, by = b.y;
        if (Math.abs(ax - bx) > MAX_CONTAINT_WIDTH || Math.abs(ay - by) > MAX_CONTAINT_HEIGHT)
            return false;

        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        return ED.rectIntersectsRect(aRect, bRect);
    },
    initBackground:function () {
        this._backSky = BackSky.getOrCreate();
        this._backSkyHeight = this._backSky.height;

        this.moveTileMap();
        ED.schedule(this, this.moveTileMap, 5);
    },
    moveTileMap:function () {
        var backTileMap = BackTileMap.getOrCreate();
        var ran = 0.5;
        backTileMap.x = ran * 320;
	    backTileMap.y = winSize.height;
        var move = cc.moveBy(ran * 2 + 10, cc.p(0, -winSize.height-backTileMap.height));
        var fun = cc.callFunc(function(){
            backTileMap.destroy();
        },this);
        backTileMap.runAction(cc.sequence(move,fun));
    },

    _movingBackground:function(dt){
        var movingDist = 16 * dt;       // background's moving rate is 16 pixel per second

        var locSkyHeight = this._backSkyHeight, locBackSky = this._backSky;
        var currPosY = locBackSky.y - movingDist;
        var locBackSkyRe = this._backSkyRe;

        if(locSkyHeight + currPosY <= winSize.height){
             if(locBackSkyRe != null)
                throw "The memory is leaking at moving background";
            locBackSkyRe = this._backSky;
            this._backSkyRe = this._backSky;

            //create a new background
            this._backSky = BackSky.getOrCreate();
            locBackSky = this._backSky;
            locBackSky.y = currPosY + locSkyHeight - 5;
        } else
            locBackSky.y = currPosY;

        if(locBackSkyRe){
            //locBackSkyRe
            currPosY = locBackSkyRe.y - movingDist;
            if(currPosY + locSkyHeight < 0){
                locBackSkyRe.destroy();
                this._backSkyRe = null;
            } else
                locBackSkyRe.y = currPosY;
        }
    },

    onGameOver:function () {
        var scene = new cc.Scene();
        scene.addChild(new GameOver());
	    cc.director.runScene(new cc.TransitionFade(1.2, scene));
    }
});

GameLayer.scene = function () {
    var scene = new cc.Scene();
    var layer = new GameLayer();
    scene.addChild(layer, 1);
    return scene;
};

GameLayer.prototype.addEnemy = function (enemy, z, tag) {
    this._enemyNode.addChild(enemy, z, tag);
};

GameLayer.prototype.addExplosions = function (explosion) {
    this._explosions.addChild(explosion);
};

GameLayer.prototype.addBulletHits = function (hit, zOrder) {
    this._texOpaqueBatch.addChild(hit, zOrder);
};

GameLayer.prototype.addSpark = function (spark) {
    this._sparkBatch.addChild(spark);
};

GameLayer.prototype.addBullet = function (bullet, zOrder, mode) {
    this._texOpaqueBatch.addChild(bullet, zOrder, mode);
};
