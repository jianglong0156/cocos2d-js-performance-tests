(function() {
    var W = 2000;

    var H = 2000;

    var img = new Image();
    img.onload = function () {
        run();
    };
    img.src = "anim1.png";

    var QueryString = function () {
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

    function run() {
        var renderer;
        if ( typeof QueryString.webgl !== "undefined") {
            renderer = new GS.RendererWebGL(W, H);
        } else {
            renderer = new GS.RendererCanvas(W, H);
        }

        document.body.appendChild(renderer._surface);
        var si = new GS.SpriteImage(img, "fish").createWithRowsAndColumns(1, 3);
        renderer.prepareImage(si);
        var scene = new GS.Scene().setBounds(0, 0, W, H).setFillStyle("#33f");

        var TestScene ;
        if ( typeof QueryString.phone !== "undefined" ) {
            var TestScene = [
                {a: 2, b: 25},
                {a: 4, b: 25}, //100
                {a: 6, b: 25}, //150
                {a: 8, b: 25}, //200
                {a: 10, b: 25}, //250
                {a: 10, b: 30}, //300
                {a: 10, b: 35}, //350
                {a: 10, b: 40} //400
            ];
        } else {
            TestScene = [
                {a: 10, b: 20}, //200
                {a: 15, b: 30}, //450
                {a: 20, b: 40}, //800
                {a: 25, b: 50}, //1250
                {a: 30, b: 60}, //1800
                {a: 35, b: 70}, //2450
                {a: 40, b: 80} //3200
            ];
        }

        //fish元素队列
        var fishList = [];

        var level = 0;
        var addition = document.getElementById("addition");
        if (addition) {
            addition.addEventListener("click", function () {
                level++;
                if (TestScene.length <= level) level = TestScene.length - 1;
                createFish(TestScene[level], fishList);
            }, false);
        }

        var subtraction = document.getElementById("subtraction");
        if (subtraction) {
            subtraction.addEventListener("click", function () {
                level--;
                if (level <= 0) level = 0;
                createFish(TestScene[level], fishList);
            }, false);
        }
        var rotateBtn = document.getElementById("rotate");
        if (rotateBtn) {
            rotateBtn.addEventListener("click", function () {
                createFish(TestScene[level], fishList);
                rotate(fishList);
            }, false);
        }
        var moveBtn = document.getElementById("move");
        if (moveBtn) {
            moveBtn.addEventListener("click", function () {
                createFish(TestScene[level], fishList);
                move(fishList);
            }, false);
        }
        var scaleBtn = document.getElementById("scale");
        if (scaleBtn) {
            scaleBtn.addEventListener("click", function () {
                createFish(TestScene[level], fishList);
                scale(fishList);
            }, false);
        }
        var allBtn = document.getElementById("all");
        if (allBtn) {
            allBtn.addEventListener("click", function () {
                createFish(TestScene[level], fishList);
                all(fishList);
            }, false);
        }

        createFish(TestScene[level], fishList);


        function createFish() {
            _rotate = undefined;
            _move = undefined;
            _scale = undefined;
            _all = undefined;
            _num = 0;

            scene.removeAllActors();

            var a = TestScene[level].a;
            var b = TestScene[level].b;
            var totalNum = a * b;
            var info = document.getElementById("info");
            if (info) {
                info.innerHTML = totalNum.toString();
            }

            for (var i = 0; i < totalNum; i++) {

                /*
                 var fish = new GS.Sprite();
                 fish.addAnimationWithIndices(
                 "walk",
                 si,
                 [0,1,2]
                 );

                 fish.playAnimation("walk", 50);
                 */
                var fish = new GS.Actor();
                fish.setSpriteImageData(si.getImageDataByIndex(0), true);

                fish.x = (i % a) * 50 + 25;
                fish.y = (i / a | 0) * 25 + 13;
                scene.addActor(fish);
                fishList.push(fish);
            }
        }

        var _rotate = undefined;

        function rotate() {
            _rotate = 0;
        }

        var _move = undefined;

        function move() {
            _move = 0;
        }

        var _scale = undefined;

        function scale() {
            _scale = 0;
        }

        var _all = undefined;

        function all() {
            _all = 0;
        }

        var fpsElem = document.getElementById("fps");
        var fpsNum = 0;
        setInterval(function () {
            fpsElem && (fpsElem.innerHTML = fpsNum);
            fpsNum = 0;
        }, 1000);

        var _num = 0;


        function anim(perf) {

            var elapsed = 0;
            if (typeof perf === "undefined") {
                perf = new Date().getTime();
                elapsed = perf - t;
                t = perf;
            } else {
                elapsed = perf - tperf;
                tperf = perf;
            }


            fpsNum++;

            if (_rotate !== undefined) {
                _num++;
                if (_num > 2) {
                    _num = 0;
                    _rotate += 0.05;
                    for (var i = 0; i < fishList.length; i++) {
                        fishList[i].rotationAngle = _rotate;
                    }
                    if (_rotate >= 6.3) {
                        _rotate = undefined;
                    }
                }
            }
            if (_move != undefined) {
                _num++;
                if (_num > 2) {
                    _num = 0;
                    _move++;
                    for (var i = 0; i < fishList.length; i++) {
                        fishList[i].x += 0.5;
                    }
                    if (_move >= 100) {
                        _move = undefined;
                    }
                }
            }
            if (_scale != undefined) {
                _num++;
                if (_num > 2) {
                    _num = 0;
                    _scale++;
                    for (var i = 0; i < fishList.length; i++) {
                        fishList[i].scaleX += 0.01;
                    }
                    if (_scale >= 100) {
                        _scale = undefined;
                    }
                }
            }
            if (_all != undefined) {
                _num++;
                if (_num > 2) {
                    _num = 0;
                    _all++;
                    for (var i = 0; i < fishList.length; i++) {
                        fishList[i].rotationAngle += 0.063;
                        fishList[i].x += 0.5;
                        fishList[i].scaleX += 0.01;
                    }
                    if (_all >= 100) {
                        _all = undefined;
                    }
                }
            }


            renderer.startRender();
            renderer.render(scene, elapsed);
            renderer.getContext().flush();

            window.requestAnimationFrame(anim, null);
        }

        var t = new Date().getTime();
        var tperf = 0;
        window.requestAnimationFrame(anim, null);
    }
})();