var HelloWorldScene = cc.Layer.extend({

    _sprites: null,

    _num: 0,

    numElem: document.getElementById("num"),

    ctor: function () {
        this._super();

        window.scene = this;

        this._sprites = [];

        this.create500();
        this.create500();
        this.create500();
        this.create500();
        this.create500();
        this.create500();

        this.bindEvent();
    },

    create500: function(){
        var sprites = this._sprites;
        if(this._num + 500 < sprites.length){
            for(var i=this._num, len=this._num+500; i<len; i++){
                this.addChild(sprites[i]);
                performanceActions(sprites[i]);
                this._num += 1;
            }
        }else{

            for(var i=0; i<500; i++){
                var sprite = new cc.Sprite("res/grossini.png");
                this._sprites.push(sprite);
                this.addChild(sprite);
                performanceActions(sprite);
                this._num += 1;
            }
        }
        this.numElem.innerHTML = this._num;
    },

    remove500: function(){
        var sprites = this._sprites;
        if(this._num - 500 > 0){
            for(var i=this._num, len=this._num-500; i>len; i--){
                sprites[i-1].stopAllActions();
                this.removeChild(sprites[i-1]);
                this._num -= 1;
            }
        }
        this.numElem.innerHTML = this._num;
    },

    bindEvent: function(){
        var self = this;
        var a = document.getElementById("+");
        a.addEventListener("click", function(){
            self.create500();
        }, false);
        var b = document.getElementById("-");
        b.addEventListener("click", function(){
            self.remove500();
        }, false);
    }

});

var performanceActions = function(sprite){
    var size = cc.director.getWinSize();
    sprite.x = parseInt(Math.random() * size.width);
    sprite.y = parseInt(Math.random() * size.height);

    var period = 0.5 + (Math.random() * 1000) / 500.0;
    var rot = cc.rotateBy(period, 360.0 * Math.random());
    var rot_back = rot.reverse();
    var permanentRotation = cc.sequence(rot, rot_back).repeatForever();
    sprite.runAction(permanentRotation);

    var growDuration = 0.5 + (Math.random() * 1000) / 500.0;
    var grow = cc.scaleBy(growDuration, 0.5, 0.5);
    var permanentScaleLoop = cc.sequence(grow, grow.reverse()).repeatForever();
    sprite.runAction(permanentScaleLoop);
};