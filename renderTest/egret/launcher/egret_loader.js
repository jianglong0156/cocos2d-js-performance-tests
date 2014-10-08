/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

egret_h5.startGame = function () {
    var canvas = document.getElementById(egret.StageDelegate.canvas_name);
    var  context = egret.MainContext.instance;
    context.touchContext = new egret.HTML5TouchContext(canvas);
    context.deviceContext = new egret.HTML5DeviceContext();
    context.netContext = new egret.HTML5NetContext();



    egret.StageDelegate.getInstance().setDesignSize(2000, 2000);
    context.stage = new egret.Stage();
    var scaleMode =  /*egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ? egret.StageScaleMode.SHOW_ALL : */egret.StageScaleMode.NO_SCALE;
    context.stage.scaleMode = scaleMode;

    window.QueryString = function () {
                  // This function is anonymous, is executed immediately and
                  // the return value is assigned to QueryString!
                  var query_string = {};
                  var query = window.location.search.substring(1);
                  var vars = query.split("&");
                  for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                        // If first entry with this name
                    if (typeof query_string[pair[0]] === "undefined") {
                      query_string[pair[0]] = pair[1];
                        // If second entry with this name
                    } else if (typeof query_string[pair[0]] === "string") {
                      var arr = [ query_string[pair[0]], pair[1] ];
                      query_string[pair[0]] = arr;
                        // If third or later entry with this name
                    } else {
                      query_string[pair[0]].push(pair[1]);
                    }
                  }
                    return query_string;
                } ();

    //WebGL是egret的Beta特性，默认关闭
    var useWebGL= typeof QueryString.webgl!=="undefined";
    if( useWebGL && egret.WebGLUtils.checkCanUseWebGL()) {
        context.rendererContext = new egret.WebGLRenderer(canvas);
    }
    else {
        context.rendererContext = new egret.HTML5CanvasRenderer(canvas);
    }

    egret.MainContext.instance.rendererContext.texture_scale_factor = 1;
    context.run();

    var rootClass;
    if(document_class){
        rootClass = egret.getDefinitionByName(document_class);
    }
    if(rootClass) {
        var rootContainer = new rootClass();
        if(rootContainer instanceof egret.DisplayObjectContainer){
            context.stage.addChild(rootContainer);
        }
        else{
            throw new Error("文档类必须是egret.DisplayObjectContainer的子类!");
        }
    }
    else{
        throw new Error("找不到文档类！");
    }
};