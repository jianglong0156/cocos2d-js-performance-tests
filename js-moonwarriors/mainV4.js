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

/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "../../frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

window.addEventListener("DOMContentLoaded", function() {
    var gameObj = ED.gameObj = new cc.game.Game();

        // adjustViewport(true).    --> developer decision to add it to the html document. why force ?
    gameObj.setDesignResolutionSize({
            width: 480,
            height: 720,
            scaleStrategy: "scale_aspect",
            canvasPosition: "center",
            canvasElement: "gameCanvas",
            rendererType:"canvas"
        });
        //resizeWithBrowserSize(true).  --> implicit yes.
        ED.LoaderScene.preload(
            g_mainmenu.concat(g_maingame),
        /**
         * Why receive the loaded resources and the game reference.
         * Current CocosV3, makes some [wrong] assumptions:
         *   * it stores webgl texture info as well as the image content per image file.
         *   * it stores every loaded content in a singleton object. normally, loaded resources are read, transformed,
         *     (and some discarded) in the same process. For example, a plist with SpriteFrame definition, should loaded,
         *     transformed and discarded. There's no need in reloading or keeping its content in memory.
         *     This is the current case.
         *   * it assumes one loader instance and loader Scene: cc.LoaderScene
         *   * it assumes one single singleton director object instance.
         *   * it creates a polling mechanism to the DOM until the document element is created and attached. (this is
         *     very wrong). That's why the window.addEventListener("DOMContentLoaded",... is added.
         *   * the plist defining SpriteFrames for an Image MUST be in the same directory.
         *   * treates Image objects as if they were loaded synchronously. they are ALL lazy loaded at reference time.
         *
         * New V4 version, makes some (different) assumptions:
         *
         *   * multiple director instances.
         *   * multiple game instances.
         *   * no constraints in loading/loader scene. In this sense, total freedom of multiple loaders running at the same
         *     time, and thus, loading status callback functions.
         *
         * In the new V4, a game [director, renderer, scalemanager, inputmanager, etc.] is created. In order to avoid
         * boilerplate code for loading resources, a convenience method load is supplied in the game itself.
         * This method receives the list of loaded cc.plugin.resource.Resource objects. This new version does not store
         * the resources, since it is expected to turn the Resources into in-game assets. This is something only the
         * developer knows how to do (we can't make assumption about whether a plist is a list of SpriteFrames or
         * Animations).
         * This is why, the onResourcesLoaded callback receives the game instance (for the shake of chaining, impossible
         * otherwise) and the Resources array [store them or whatever].
         *
         * It is important to allow the developer manipulate resources. For example, what if He want's to texture-pack
         * some resources, build some sprite fonts on-the-fly or use a webgl with mipmap texture.
         *
         * What if I need to load content in stages:
         *   * first resources to show a proper loading progress
         *   * in-game assets after that, etc.
         *
         * Use the AssetManager.load method to load the initial assets. Build a Scene, then call AssetManager.load
         * again to get the new content. Use loaded resouces at will.
         *
         */
        function onEnd(game) {
            cc.render.RENDER_ORIGIN = "top";
            // prefer this form:
            game.runScene(SysMenu.scene());

            var scene = new cc.Scene();
            scene.addChild(new GameLayer());
            scene.addChild(new GameControlMenu());
            game.runScene(scene);
        }
    );
}, false);