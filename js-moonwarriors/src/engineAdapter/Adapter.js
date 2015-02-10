/**
 * Created by leo on 2015/1/29.
 */

var EDV3 = 1;
var EDV4 = 2;
var ED = ED || {};
ED.gameObj = {};
ED.version = EDV3;


if (!cc.sys)
{
    ED.version = EDV4;
    ED.sys = {};
    cc.sys = ED.sys;
    (function(sys){
    /**
     * Canvas of render type
     * @constant
     * @type {Number}
     */
    cc._RENDER_TYPE_CANVAS = 0;

    /**
     * WebGL of render type
     * @constant
     * @type {Number}
     */
    cc._RENDER_TYPE_WEBGL = 1;

    /**
     * English language code
     * @memberof cc.sys
     * @name LANGUAGE_ENGLISH
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_ENGLISH = "en";

    /**
     * Chinese language code
     * @memberof cc.sys
     * @name LANGUAGE_CHINESE
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_CHINESE = "zh";

    /**
     * French language code
     * @memberof cc.sys
     * @name LANGUAGE_FRENCH
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_FRENCH = "fr";

    /**
     * Italian language code
     * @memberof cc.sys
     * @name LANGUAGE_ITALIAN
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_ITALIAN = "it";

    /**
     * German language code
     * @memberof cc.sys
     * @name LANGUAGE_GERMAN
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_GERMAN = "de";

    /**
     * Spanish language code
     * @memberof cc.sys
     * @name LANGUAGE_SPANISH
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_SPANISH = "es";

    /**
     * Spanish language code
     * @memberof cc.sys
     * @name LANGUAGE_DUTCH
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_DUTCH = "du";

    /**
     * Russian language code
     * @memberof cc.sys
     * @name LANGUAGE_RUSSIAN
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_RUSSIAN = "ru";

    /**
     * Korean language code
     * @memberof cc.sys
     * @name LANGUAGE_KOREAN
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_KOREAN = "ko";

    /**
     * Japanese language code
     * @memberof cc.sys
     * @name LANGUAGE_JAPANESE
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_JAPANESE = "ja";

    /**
     * Hungarian language code
     * @memberof cc.sys
     * @name LANGUAGE_HUNGARIAN
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_HUNGARIAN = "hu";

    /**
     * Portuguese language code
     * @memberof cc.sys
     * @name LANGUAGE_PORTUGUESE
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_PORTUGUESE = "pt";

    /**
     * Arabic language code
     * @memberof cc.sys
     * @name LANGUAGE_ARABIC
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_ARABIC = "ar";

    /**
     * Norwegian language code
     * @memberof cc.sys
     * @name LANGUAGE_NORWEGIAN
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_NORWEGIAN = "no";

    /**
     * Polish language code
     * @memberof cc.sys
     * @name LANGUAGE_POLISH
     * @constant
     * @type {Number}
     */
    sys.LANGUAGE_POLISH = "pl";

    /**
     * @memberof cc.sys
     * @name OS_WINDOWS
     * @constant
     * @type {string}
     */
    sys.OS_WINDOWS = "Windows";
    /**
     * @memberof cc.sys
     * @name OS_IOS
     * @constant
     * @type {string}
     */
    sys.OS_IOS = "iOS";
    /**
     * @memberof cc.sys
     * @name OS_OSX
     * @constant
     * @type {string}
     */
    sys.OS_OSX = "OS X";
    /**
     * @memberof cc.sys
     * @name OS_UNIX
     * @constant
     * @type {string}
     */
    sys.OS_UNIX = "UNIX";
    /**
     * @memberof cc.sys
     * @name OS_LINUX
     * @constant
     * @type {string}
     */
    sys.OS_LINUX = "Linux";
    /**
     * @memberof cc.sys
     * @name OS_ANDROID
     * @constant
     * @type {string}
     */
    sys.OS_ANDROID = "Android";
    /**
     * @memberof cc.sys
     * @name OS_UNKNOWN
     * @constant
     * @type {string}
     */
    sys.OS_UNKNOWN = "Unknown";

    /**
     * @memberof cc.sys
     * @name WINDOWS
     * @constant
     * @default
     * @type {Number}
     */
    sys.WINDOWS = 0;
    /**
     * @memberof cc.sys
     * @name LINUX
     * @constant
     * @default
     * @type {Number}
     */
    sys.LINUX = 1;
    /**
     * @memberof cc.sys
     * @name MACOS
     * @constant
     * @default
     * @type {Number}
     */
    sys.MACOS = 2;
    /**
     * @memberof cc.sys
     * @name ANDROID
     * @constant
     * @default
     * @type {Number}
     */
    sys.ANDROID = 3;
    /**
     * @memberof cc.sys
     * @name IPHONE
     * @constant
     * @default
     * @type {Number}
     */
    sys.IPHONE = 4;
    /**
     * @memberof cc.sys
     * @name IPAD
     * @constant
     * @default
     * @type {Number}
     */
    sys.IPAD = 5;
    /**
     * @memberof cc.sys
     * @name BLACKBERRY
     * @constant
     * @default
     * @type {Number}
     */
    sys.BLACKBERRY = 6;
    /**
     * @memberof cc.sys
     * @name NACL
     * @constant
     * @default
     * @type {Number}
     */
    sys.NACL = 7;
    /**
     * @memberof cc.sys
     * @name EMSCRIPTEN
     * @constant
     * @default
     * @type {Number}
     */
    sys.EMSCRIPTEN = 8;
    /**
     * @memberof cc.sys
     * @name TIZEN
     * @constant
     * @default
     * @type {Number}
     */
    sys.TIZEN = 9;
    /**
     * @memberof cc.sys
     * @name WINRT
     * @constant
     * @default
     * @type {Number}
     */
    sys.WINRT = 10;
    /**
     * @memberof cc.sys
     * @name WP8
     * @constant
     * @default
     * @type {Number}
     */
    sys.WP8 = 11;
    /**
     * @memberof cc.sys
     * @name MOBILE_BROWSER
     * @constant
     * @default
     * @type {Number}
     */
    sys.MOBILE_BROWSER = 100;
    /**
     * @memberof cc.sys
     * @name DESKTOP_BROWSER
     * @constant
     * @default
     * @type {Number}
     */
    sys.DESKTOP_BROWSER = 101;

    sys.BROWSER_TYPE_WECHAT = "wechat";
    sys.BROWSER_TYPE_ANDROID = "androidbrowser";
    sys.BROWSER_TYPE_IE = "ie";
    sys.BROWSER_TYPE_QQ = "qqbrowser";
    sys.BROWSER_TYPE_MOBILE_QQ = "mqqbrowser";
    sys.BROWSER_TYPE_UC = "ucbrowser";
    sys.BROWSER_TYPE_360 = "360browser";
    sys.BROWSER_TYPE_BAIDU_APP = "baiduboxapp";
    sys.BROWSER_TYPE_BAIDU = "baidubrowser";
    sys.BROWSER_TYPE_MAXTHON = "maxthon";
    sys.BROWSER_TYPE_OPERA = "opera";
    sys.BROWSER_TYPE_OUPENG = "oupeng";
    sys.BROWSER_TYPE_MIUI = "miuibrowser";
    sys.BROWSER_TYPE_FIREFOX = "firefox";
    sys.BROWSER_TYPE_SAFARI = "safari";
    sys.BROWSER_TYPE_CHROME = "chrome";
    sys.BROWSER_TYPE_LIEBAO = "liebao";
    sys.BROWSER_TYPE_QZONE = "qzone";
    sys.BROWSER_TYPE_SOUGOU = "sogou";
    sys.BROWSER_TYPE_UNKNOWN = "unknown";

    /**
     * Is native ? This is set to be true in jsb auto.
     * @memberof cc.sys
     * @name isNative
     * @type {Boolean}
     */
    sys.isNative = false;

    var browserSupportWebGL = [sys.BROWSER_TYPE_BAIDU, sys.BROWSER_TYPE_OPERA, sys.BROWSER_TYPE_FIREFOX, sys.BROWSER_TYPE_CHROME, sys.BROWSER_TYPE_SAFARI];
    var osSupportWebGL = [sys.OS_IOS, sys.OS_WINDOWS, sys.OS_OSX, sys.OS_LINUX];
    var multipleAudioWhiteList = [
        sys.BROWSER_TYPE_BAIDU, sys.BROWSER_TYPE_OPERA, sys.BROWSER_TYPE_FIREFOX, sys.BROWSER_TYPE_CHROME, sys.BROWSER_TYPE_BAIDU_APP,
        sys.BROWSER_TYPE_SAFARI, sys.BROWSER_TYPE_UC, sys.BROWSER_TYPE_QQ, sys.BROWSER_TYPE_MOBILE_QQ, sys.BROWSER_TYPE_IE
    ];

    var win = window, nav = win.navigator, doc = document, docEle = doc.documentElement;
    var ua = nav.userAgent.toLowerCase();

    /**
     * Indicate whether system is mobile system
     * @memberof cc.sys
     * @name isMobile
     * @type {Boolean}
     */
    sys.isMobile = ua.indexOf('mobile') != -1 || ua.indexOf('android') != -1;

    /**
     * Indicate the running platform
     * @memberof cc.sys
     * @name platform
     * @type {Number}
     */
    sys.platform = sys.isMobile ? sys.MOBILE_BROWSER : sys.DESKTOP_BROWSER;

    var currLanguage = nav.language;
    currLanguage = currLanguage ? currLanguage : nav.browserLanguage;
    currLanguage = currLanguage ? currLanguage.split("-")[0] : sys.LANGUAGE_ENGLISH;

    /**
     * Indicate the current language of the running system
     * @memberof cc.sys
     * @name language
     * @type {String}
     */
    sys.language = currLanguage;

    var browserType = sys.BROWSER_TYPE_UNKNOWN;
    var browserTypes = ua.match(/sogou|qzone|liebao|micromessenger|qqbrowser|ucbrowser|360 aphone|360browser|baiduboxapp|baidubrowser|maxthon|trident|oupeng|opera|miuibrowser|firefox/i)
        || ua.match(/chrome|safari/i);
    if (browserTypes && browserTypes.length > 0) {
        browserType = browserTypes[0];
        if (browserType == 'micromessenger') {
            browserType = sys.BROWSER_TYPE_WECHAT;
        } else if (browserType === "safari" && (ua.match(/android.*applewebkit/)))
            browserType = sys.BROWSER_TYPE_ANDROID;
        else if (browserType == "trident") browserType = sys.BROWSER_TYPE_IE;
        else if (browserType == "360 aphone") browserType = sys.BROWSER_TYPE_360;
    }
    /**
     * Indicate the running browser type
     * @memberof cc.sys
     * @name browserType
     * @type {String}
     */
    sys.browserType = browserType;

    // Get the os of system
    var iOS = ( ua.match(/(iPad|iPhone|iPod)/i) ? true : false );
    var isAndroid = ua.match(/android/i) || nav.platform.match(/android/i) ? true : false;
    var osName = sys.OS_UNKNOWN;
    if (nav.appVersion.indexOf("Win") != -1) osName = sys.OS_WINDOWS;
    else if (iOS) osName = sys.OS_IOS;
    else if (nav.appVersion.indexOf("Mac") != -1) osName = sys.OS_OSX;
    else if (nav.appVersion.indexOf("X11") != -1 && nav.appVersion.indexOf("Linux") == -1) osName = sys.OS_UNIX;
    else if (isAndroid) osName = sys.OS_ANDROID;
    else if (nav.appVersion.indexOf("Linux") != -1) osName = sys.OS_LINUX;

    /**
     * Indicate the running os name
     * @memberof cc.sys
     * @name os
     * @type {String}
     */
    sys.os = osName;
    }(ED.sys));
}
else
{
    ED.sys = cc.sys;
    ED.version = EDV3;
}

ED.LoaderScene = {
    preload:function(resourceArr, callBackFun, target)
    {
        if (ED.version === EDV3)
        {
            cc.LoaderScene.preload(resourceArr, callBackFun, target)
        }
        else
        {
            ED.gameObj.load(resourceArr, callBackFun, target);
        }
    }
};

ED._super=function(target)
{
    var fun = null;
    if (ED.version === EDV3)
    {
        fun = target._super;
    }
    else
    {
        // it's hack method, can't not judge the sprite class
        if (arguments.length > 1)
        {
            fun = cc.Sprite.prototype.constructor;
        }
        else
        {
            fun = cc.Node.prototype.constructor;
        }

    }
    switch (arguments.length)
    {
        case 1:
            fun.call(target);
            break;
        case 2:
            fun.call(target, arguments[1]);
            break;
        case 3:
            fun.call(target, arguments[1], arguments[2]);
            break;
        case 4:
            fun.call(target, arguments[1],  arguments[2], arguments[3]);
            break;
        case 5:
            fun.call(target, arguments[1],  arguments[2], arguments[3], arguments[4]);
            break;
    }
};

if (ED.version === EDV4)
{
    cc.spriteFrameCache.getSpriteFrame = cc.plugin.asset.AssetManager.getSpriteFrame;
}

if (ED.version === EDV3)
{
    ED.animationCache = cc.animationCache;
}
else
{
    ED.animationCache = {
        _animations: {},
        addAnimation:function (animation, name) {
            this._animations[name] = animation;
        },
        getAnimation:function (name) {
            if (this._animations[name])
                return this._animations[name];
            return null;
        }
    }
}

if (ED.version === EDV4)
{
    window["CocosEngine"] = "Cocos2d-JS v4";
    ED.getUpdateTime = function(dt)
    {
        return dt / 1000;
    }
    ED.schedule = function (target, callbackFun, delayTime)
    {
        target.schedule.call(target, callbackFun, delayTime * 1000);
    }
}
else
{
    ED.getUpdateTime = function(dt)
    {
        return dt;
    }
    ED.schedule = function (target, callbackFun, delayTime)
    {
        target.schedule.call(target, callbackFun, delayTime);
    }
}



if (ED.version === EDV4)
{
    ED.rectIntersectsRect = function (ra, rb) {
        var maxax = ra.x + ra.w,
            maxay = ra.y + ra.h,
            maxbx = rb.x + rb.w,
            maxby = rb.y + rb.h;
        return !(maxax < rb.x || maxbx < ra.x || maxay < rb.y || maxby < ra.y);
    };
    cc.rectIntersectsRect = ED.rectIntersectsRect;
}
else
{
    ED.rectIntersectsRect = cc.rectIntersectsRect;
}

ED.setFrames = function (animation, animFrames){
    if (ED.version === EDV3)
    {
        for (var frameindex in animFrames)
            animation.addSpriteFrame(animFrames[frameindex]);
    }
    else
    {
        animation.addFrames(animFrames);
    }

};
ED.setDelayPerUnit = function(animation, perUnit){
    if (ED.version === EDV3)
    {
        animation.setDelayPerUnit(perUnit);
    }
    else
    {
        animation.setDelayPerUnit(perUnit * 1000);
    }

};

ED.getRenderStr = function ()
{
    if (ED.version === EDV3)
    {
        if (cc._renderType == cc._RENDER_TYPE_WEBGL)
        {
            return "WebGL";
        }
        else
        {
            return "Canvas";
        }
    }
    else
    {
        if (ED.gameObj._director.getRenderer().getRenderingContext().type === "webgl")
        {
            return "WebGL"
        }
        else
        {
            return "Canvas";
        }

    }
};

if (ED.version === EDV4)
{
    cc.SpriteBatchNode = cc.Node.extend({
        _img:null,
        _texture:null,
        actors:[],
        ctor: function (fileUrl) {
            cc.Node.prototype.constructor.call(this);
        }


    });
}
if (ED.version === EDV3)
{
    ED.FastSprite = cc.Sprite;
}
else
{
    ED.FastSprite = cc.node.FastSprite;
    //ED.FastSprite = cc.Sprite;
}

ED.enemyInit = function (target, arg)
{
    if (ED.version === EDV3)
    {
        ED._super(target,arg);
    }
    else
    {
        ED._super(target, arg);
    }
}