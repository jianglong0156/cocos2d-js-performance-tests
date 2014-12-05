/**
* License: see license.txt file.
*/
/**
* @name cc
* @namespace
*/
/**
* Namespace for Action related objects.
* @name action
* @namespace
* @memberOf cc
*/
/**
* Namespace for math related stuff: vector, matrix, color, etc.
* @name math
* @namespace
* @memberOf cc
*/
/**
* Namespace for path related stuff: Segment, SegmentLine, SegmentBezier, etc.
* @name path
* @namespace
* @memberOf cc.math
*/
/**
* Namespace for Localization messages and utilities.
* @name locale
* @namespace
* @memberOf cc
*/
/**
* Namespace for Scene transitions.
* @name transition
* @namespace
* @memberOf cc
*/
/**
* Debug object.
* @name Debug
* @memberOf cc
* @namespace
*/
/**
* Namespace for nodes.
* @name node
* @namespace
* @memberOf cc
*/
/**
* Namespace for Sprite stuff
* @name sprite
* @namespace
* @memberOf cc.node
*/
/**
* Namespace for utilities.
* @name util
* @namespace
* @memberOf cc
*/
/**
* Namespace for render related objects.
* @name render
* @namespace
* @memberOf cc
*/
/**
* Namespace for renderer shader related objects.
* @name shader
* @namespace
* @memberOf cc.render
*/
var cc;
(function (cc) {
    (function () {
        console.log('%c', 'padding:140px 250px;line-height:300px;background:url(http://www.cocos2d-x.org/attachments/download/1508) no-repeat;');
    })();

    (function () {
        var frameTime = 1000 / 60;
        var lastTime = new Date().getTime();

        var stTime = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, frameTime - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback();
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

        var ctTime = function (id) {
            clearTimeout(id);
        };

        var win = window;

        win.requestAnimFrame = win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame || stTime;

        win.cancelAnimationFrame = win.cancelAnimationFrame || win.cancelRequestAnimationFrame || win.msCancelRequestAnimationFrame || win.mozCancelRequestAnimationFrame || win.oCancelRequestAnimationFrame || win.webkitCancelRequestAnimationFrame || win.msCancelAnimationFrame || win.mozCancelAnimationFrame || win.webkitCancelAnimationFrame || win.oCancelAnimationFrame || ctTime;
    })();
})(cc || (cc = {}));
//# sourceMappingURL=Boot.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (math) {
        "use strict";

        

        /**
        * @class cc.math.Color
        * @classdesc
        *
        * A color is represented by 4 components: RGBA encapsulated in a Float32Array.
        * <br>
        * Internally, Color components are stored as normalized color values 0..1
        * <br>
        * This object has cache capabilities for internal color string representation so calling repeatedly
        * <code>getFillStyle</code>, <code>getHexRGB</code> and <code>getHexRGBA</code> will always be fast.
        */
        var Color = (function () {
            /**
            * Instantiate a color.
            * @method cc.math.Color#constructor
            * @param r {number} 0..1
            * @param g {number} 0..1
            * @param b {number} 0..1
            * @param a {number} 0..1
            */
            function Color(r, g, b, a) {
                if (typeof r === "undefined") { r = 1; }
                if (typeof g === "undefined") { g = 1; }
                if (typeof b === "undefined") { b = 1; }
                if (typeof a === "undefined") { a = 1; }
                /**
                * Should rebuild canvas string representation cache ?
                * @member cc.math.Color#_dirty
                * @type {boolean}
                * @private
                */
                this._dirty = true;
                /**
                * Should rebuild hex string representation cache ?
                * @member cc.math.Color#_dirtyHex
                * @type {boolean}
                * @private
                */
                this._dirtyHex = true;
                this._color = new Float32Array(4);
                this._color[0] = r;
                this._color[1] = g;
                this._color[2] = b;
                this._color[3] = a;
            }
            /**
            * Get the color's RGB representation.
            * @method cc.math.Color#getHexRGB
            * @returns {string} "#RRGGBB" color representation
            */
            Color.prototype.getHexRGB = function () {
                if (this._dirtyHex) {
                    this.__calculateHexStyle();
                }

                return this._hexRGB;
            };

            /**
            * Get the color's RGB representation.
            * @method cc.math.Color#getHexRGBA
            * @returns {string} "#RRGGBBAA" color representation
            */
            Color.prototype.getHexRGBA = function () {
                if (this._dirtyHex) {
                    this.__calculateHexStyle();
                }

                return this._hexRGBA;
            };

            /**
            * Internal helper to calculate hex string color representation.
            * @method cc.math.Color#__calculateHexStyle
            * @private
            */
            Color.prototype.__calculateHexStyle = function () {
                var r = ((255 * this._color[0]) >> 0).toString(16).toUpperCase();
                var g = ((255 * this._color[1]) >> 0).toString(16).toUpperCase();
                var b = ((255 * this._color[2]) >> 0).toString(16).toUpperCase();

                this._hexRGB = "#" + (r.length < 2 ? "0" : "") + r + (g.length < 2 ? "0" : "") + g + (b.length < 2 ? "0" : "") + b;

                var a = ((255 * this._color[3]) >> 0).toString(16).toUpperCase();
                this._hexRGBA = this._hexRGB + (a.length < 2 ? "0" : "") + a;
            };

            /**
            * Internal helper to calculate canvas string color representation.
            * @method cc.math.Color#__calculateFillStyle
            * @private
            */
            Color.prototype.__calculateFillStyle = function () {
                this._fillStyle = "rgba(" + ((this._color[0] * 255) >> 0) + "," + ((this._color[1] * 255) >> 0) + "," + ((this._color[2] * 255) >> 0) + "," + this._color[3] + ")";

                this._dirty = false;
            };

            /**
            * Get the color's canvas string representation.
            * If color changed, the string will be recalculated.
            * @method cc.math.Color#getFillStyle
            * @returns {string}
            */
            Color.prototype.getFillStyle = function () {
                if (this._dirty) {
                    this.__calculateFillStyle();
                }
                return this._fillStyle;
            };

            Object.defineProperty(Color.prototype, "r", {
                /**
                * Get red color component.
                * @name cc.math.Color#get:r
                * @type {number}
                */
                get: function () {
                    return this._color[0];
                },
                /**
                * Set red color component.
                * @name cc.math.Color#set:r
                * @param v {number} red component. Should be in the range 0..1
                */
                set: function (v) {
                    this._color[0] = v;
                    this._dirty = true;
                    this._dirtyHex = true;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Color.prototype, "g", {
                /**
                * Get green color component.
                * @name cc.math.Color#get:g
                * @type {number}
                */
                get: function () {
                    return this._color[1];
                },
                /**
                * Set green color component.
                * @name cc.math.Color#set:g
                * @param v {number} green component. Should be in the range 0..1
                */
                set: function (v) {
                    this._color[1] = v;
                    this._dirty = true;
                    this._dirtyHex = true;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Color.prototype, "b", {
                /**
                * Get blue color component.
                * @name cc.math.Color#get:b
                * @type {number}
                */
                get: function () {
                    return this._color[2];
                },
                /**
                * Set blue color component.
                * @name cc.math.Color#set:b
                * @param v {number} blue component. Should be in the range 0..1
                */
                set: function (v) {
                    this._color[2] = v;
                    this._dirty = true;
                    this._dirtyHex = true;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Color.prototype, "a", {
                /**
                * Get alpha color component.
                * @name cc.math.Color#get:a
                * @type {number}
                */
                get: function () {
                    return this._color[3];
                },
                /**
                * Set alpha color component.
                * @name cc.math.Color#set:a
                * @param v {number} alpha component. Should be in the range 0..1
                */
                set: function (v) {
                    this._color[3] = v;
                    this._dirty = true;
                    this._dirtyHex = true;
                },
                enumerable: true,
                configurable: true
            });


            /**
            * Crate a Color instance from r,g,b,a or string or RGBAColor
            * @method cc.math.Color.createFromRGBA
            * @param r {cc.math.RGBAColor | string | number} if number, red color component. otherwise, color
            *      representation in string or cc.math.RGBAColor
            * @param g {number=} Color green component,
            * @param b {number=} Color blue component,
            * @param a {number=} Color alpha component,
            * @returns {cc.math.Color}
            */
            Color.createFromRGBA = function (r, g, b, a) {
                if (typeof r === "object") {
                    var c = r;
                    return new Color(c.r / 255, c.g / 255, c.b / 255, c.a / 255);
                } else if (typeof r === "number") {
                    return new Color(r / 255, g / 255, b / 255, a / 255);
                } else if (typeof r === "string") {
                    return Color.fromStringToColor(r);
                }

                return Color.WHITE;
            };

            /**
            * Parse a color of the from rgb(rrr,ggg,bbb) or rgba(rrr,ggg,bbb,a)
            * This method assumes the color parameter starts with rgb or rgba
            * @method cc.math.Color.fromRGBStringToColor
            * @param color {string}
            */
            Color.fromRGBStringToColor = function (color) {
                color = color.toLowerCase();

                var skip = 4;
                if (color.indexOf("rgba") === 0) {
                    skip = 5;
                }

                color = color.substring(skip, color.length - 1);
                var colors = color.split(",");

                var c;
                if (colors.length === 3) {
                    c = new Color(parseInt(colors[0]) / 255, parseInt(colors[1]) / 255, parseInt(colors[2]) / 255);
                } else {
                    c = new Color(parseInt(colors[0]) / 255, parseInt(colors[1]) / 255, parseInt(colors[2]) / 255, parseInt(colors[3]));
                }
                return c;
            };

            /**
            * Parse a CSS color. If the color is not recognizable will return MAGENTA;
            * @method cc.math.Color.fromStringToColor
            * @param hex {string} of the form RGB, RGBA, RRGGBB, RRGGBBAA, #RGB, #RGBA, #RRGGBB, #RRGGBBAA, rgb(rrr,ggg,bbb), rgba(rrr,ggg,bbb,a)
            * @returns {cc.math.Color}
            */
            Color.fromStringToColor = function (hex) {
                hex = hex.toLowerCase();

                if (hex.indexOf("rgb") === 0 || hex.indexOf("rgba") === 0) {
                    return Color.fromRGBStringToColor(hex);
                }

                if (hex.charAt(0) === "#") {
                    hex = hex.substring(1);
                }

                if (hex.length !== 3 && hex.length !== 4 && hex.length !== 6 && hex.length !== 8) {
                    return Color.MAGENTA;
                }

                var r, g, b, a;

                if (hex.length < 6) {
                    r = parseInt(hex.charAt(0), 16);
                    g = parseInt(hex.charAt(1), 16);
                    b = parseInt(hex.charAt(2), 16);

                    if (hex.length === 4) {
                        a = parseInt(hex.charAt(3), 16);
                    } else {
                        a = 15;
                    }

                    return new Color(r / 15, g / 15, b / 15, a / 15);
                } else {
                    r = parseInt(hex.substring(0, 2), 16);
                    g = parseInt(hex.substring(2, 4), 16);
                    b = parseInt(hex.substring(4, 6), 16);

                    // ALPHA
                    if (hex.length === 8) {
                        a = parseInt(hex.substring(6, 8), 16);
                    } else {
                        a = 255;
                    }

                    return new Color(r / 255, g / 255, b / 255, a / 255);
                }
            };

            Color.TRANSPARENT_BLACK = new Color(0, 0, 0, 0);

            Color.BLACK = new Color(0, 0, 0, 1);

            Color.RED = new Color(1, 0, 0, 1);

            Color.GREEN = new Color(0, 1, 0, 1);

            Color.BLUE = new Color(0, 0, 1, 1);

            Color.WHITE = new Color(1, 1, 1, 1);

            Color.MAGENTA = new Color(1, 0, 1, 1);

            Color.YELLOW = new Color(1, 1, 0, 1);

            Color.CYAN = new Color(0, 1, 1, 1);
            return Color;
        })();
        math.Color = Color;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=Color.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    /// <reference path="../node/Node.ts"/>
    /// <reference path="../render/RenderingContext.ts"/>
    (function (math) {
        "use strict";

        /**
        * @class cc.math.Matrix3
        *
        * @classdesc
        *
        * Affine transformation matrix Object.
        * <br>
        * The Matrix3 <strong>IS NOT</strong> a general purpose matrix calculation package. Do not use for anything else than affine
        * transformation purposes inside the Cocos2D HTML5 engine.
        */
        var Matrix3 = (function () {
            /**
            * Build a new Matrix3 object.
            * @method cc.math.Matrix3#constructor
            */
            function Matrix3() {
                this._matrix = new Float32Array(9);
                this.identity();
            }
            /**
            * Turn the matrix to identity.
            * @method cc.math.Matrix3#identity
            * @returns {cc.math.Matrix3}
            */
            Matrix3.prototype.identity = function () {
                this._matrix[0] = 1;
                this._matrix[1] = 0;
                this._matrix[2] = 0;

                this._matrix[3] = 0;
                this._matrix[4] = 1;
                this._matrix[5] = 0;

                this._matrix[6] = 0;
                this._matrix[7] = 0;
                this._matrix[8] = 1;

                return this;
            };

            /**
            * Copy a matrix to this one.
            * @method cc.math.Matrix#copy
            * @param m {cc.math.Matrix3}
            */
            Matrix3.prototype.copy = function (m) {
                this._matrix.set(m._matrix);
            };

            /**
            * Given a node, calculate a resulting matrix for position, scale and rotate.
            * @method cc.math.Matrix3#setTransformAll
            * @param node {cc.node.Node} a cc.node.Node instance
            */
            Matrix3.prototype.setTransformAll = function (node) {
                var c, s, _m00, _m01, _m10, _m11;
                var m00, m01, m02, m10, m11, m12;

                m00 = 1;
                m01 = 0;
                m10 = 0;
                m11 = 1;

                m02 = node._position.x - node._positionAnchor.x * node._contentSize.width;
                m12 = node._position.y - node._positionAnchor.y * node._contentSize.height;

                var rx = node._transformationAnchor.x * node._contentSize.width;
                var ry = node._transformationAnchor.y * node._contentSize.height;

                m02 += m00 * rx + m01 * ry;
                m12 += m10 * rx + m11 * ry;

                var angle = node._rotation.x * Math.PI / 180;

                c = Math.cos(angle);
                s = Math.sin(angle);
                _m00 = m00;
                _m01 = m01;
                _m10 = m10;
                _m11 = m11;
                m00 = _m00 * c + _m01 * s;
                m01 = -_m00 * s + _m01 * c;
                m10 = _m10 * c + _m11 * s;
                m11 = -_m10 * s + _m11 * c;

                m00 = m00 * node._scale.x;
                m01 = m01 * node._scale.y;
                m10 = m10 * node._scale.x;
                m11 = m11 * node._scale.y;

                m02 += -m00 * rx - m01 * ry;
                m12 += -m10 * rx - m11 * ry;

                var mm = this._matrix;
                mm[0] = m00;
                mm[1] = m01;
                mm[3] = m10;
                mm[4] = m11;
                mm[2] = m02;
                mm[5] = m12;
            };

            /**
            * Given a node, calculate a resulting matrix for position and scale.
            * @method cc.math.Matrix3#setTransformScale
            * @param node {cc.node.Node} a cc.node.Node instance
            */
            Matrix3.prototype.setTransformScale = function (node) {
                var m00, m01, m02, m10, m11, m12;

                m00 = 1;
                m01 = 0;
                m10 = 0;
                m11 = 1;

                m02 = node._position.x - node._positionAnchor.x * node._contentSize.width;
                m12 = node._position.y - node._positionAnchor.y * node._contentSize.height;

                var rx = node._transformationAnchor.x * node._contentSize.width;
                var ry = node._transformationAnchor.y * node._contentSize.height;

                m02 += m00 * rx + m01 * ry;
                m12 += m10 * rx + m11 * ry;

                m00 = m00 * node._scale.x;
                m01 = m01 * node._scale.y;
                m10 = m10 * node._scale.x;
                m11 = m11 * node._scale.y;

                m02 += -m00 * rx - m01 * ry;
                m12 += -m10 * rx - m11 * ry;

                var mm = this._matrix;
                mm[0] = m00;
                mm[1] = m01;
                mm[3] = m10;
                mm[4] = m11;
                mm[2] = m02;
                mm[5] = m12;
            };

            /**
            * Given a node, calculate a resulting matrix for position.
            * @method cc.math.Matrix3#setTransformTranslate
            * @param node {cc.node.Node} a cc.node.Node instance
            */
            Matrix3.prototype.setTransformTranslate = function (node) {
                var mm = this._matrix;
                var x = node._position.x - node._positionAnchor.x * node._contentSize.width;
                var y = node._position.y - node._positionAnchor.y * node._contentSize.height;
                mm[2] = x;
                mm[5] = y;
                mm[0] = 1;
                mm[1] = 0;
                mm[3] = 0;
                mm[4] = 1;
                mm[6] = 0;
                mm[7] = 0;
                mm[8] = 1;
            };

            /**
            * Multiply the matrix by another matrix.
            * <br>
            * Both matrices must be Matrix3 instances.
            * @method cc.math.Matrix3#multiply
            * @param mat1 {cc.math.Matrix3} a cc.math.Matrix3 instance.
            */
            Matrix3.prototype.multiply = function (mat1) {
                var m0 = this._matrix;
                var m1 = mat1._matrix;

                var mm0 = m1[0];
                var mm1 = m1[1];
                var mm2 = m1[2];
                var mm3 = m1[3];
                var mm4 = m1[4];
                var mm5 = m1[5];

                var tm0 = m0[0];
                var tm1 = m0[1];
                var tm2 = m0[2];

                m0[0] = tm0 * mm0 + tm1 * mm3;
                m0[1] = tm0 * mm1 + tm1 * mm4;
                m0[2] = tm0 * mm2 + tm1 * mm5 + tm2;

                var tm3 = m0[3];
                var tm4 = m0[4];
                var tm5 = m0[5];

                m0[3] = tm3 * mm0 + tm4 * mm3;
                m0[4] = tm3 * mm1 + tm4 * mm4;
                m0[5] = tm3 * mm2 + tm4 * mm5 + tm5;

                m0[6] = 0;
                m0[7] = 0;
                m0[8] = 1;
            };

            /**
            * Transform a point by the matrix.
            * <br>
            * The point will be overwritten by the resulting point.
            * @method cc.math.Matrix3#transformPoint
            * @param point {cc.math.Point} Point or Vector to transform.
            */
            Matrix3.prototype.transformPoint = function (point) {
                var x;
                var y;
                var tm = this._matrix;

                x = point.x;
                y = point.y;
                point.x = x * tm[0] + y * tm[1] + tm[2];
                point.y = x * tm[3] + y * tm[4] + tm[5];

                return point;
            };

            /**
            * Set transformation coeficients for a RenderingContext.
            * @method cc.math.Matrix3#setRenderingContextTransform
            * @param ctx {cc.render.RenderingContext} a rendering context.
            */
            Matrix3.prototype.setRenderingContextTransform = function (ctx) {
                var mm = this._matrix;

                // TODO: set optional clamping capabilities. old mobile browsers.
                ctx.setTransform(mm[0], mm[3], mm[1], mm[4], mm[2], mm[5]);
            };

            /**
            * Set the matrix as follows
            * [ a b x ]
            * | c d y |
            * [ 0 0 1 ]
            * @method cc.math.Matrix3#setTransform
            * @param a {number}
            * @param b {number}
            * @param c {number}
            * @param d {number}
            * @param tx {number}
            * @param ty {number}
            */
            Matrix3.prototype.setTransform = function (a, b, c, d, tx, ty) {
                var matrix = this._matrix;

                matrix[0] = a;
                matrix[3] = b;
                matrix[1] = c;
                matrix[4] = d;
                matrix[2] = tx;
                matrix[5] = ty;
                matrix[6] = 0;
                matrix[7] = 0;
                matrix[8] = 1;
            };

            /**
            * Concatenate the matrix with another matrix build of the coeficients set as parameters.
            * @method cc.math.Matrix3#transform
            * @param a {number}
            * @param b {number}
            * @param c {number}
            * @param d {number}
            * @param tx {number}
            * @param ty {number}
            */
            Matrix3.prototype.transform = function (a, b, c, d, tx, ty) {
                Matrix3._workingMatrix.setTransform(a, b, c, d, tx, ty);
                this.multiply(Matrix3._workingMatrix);
            };

            /**
            * Make the matrix a translation matrix.
            * @param x {number}
            * @param y {number}
            * @returns {cc.math.Matrix3} the same matrix.
            */
            Matrix3.prototype.setTranslate = function (x, y) {
                this.identity();
                this._matrix[2] = x;
                this._matrix[5] = y;
                return this;
            };

            /**
            * Make the matrix a rotation matrix.
            * @param angle {number} angle in radians.
            * @returns {cc.math.Matrix3} the same matrix.
            */
            Matrix3.prototype.setRotate = function (angle) {
                this.identity();
                this._matrix[0] = Math.cos(angle);
                this._matrix[1] = -Math.sin(angle);
                this._matrix[3] = Math.sin(angle);
                this._matrix[4] = Math.cos(angle);

                return this;
            };

            /**
            * Make the matrix a scale matrix.
            * @param x
            * @param y
            * @returns {cc.math.Matrix3}
            */
            Matrix3.prototype.setScale = function (x, y) {
                this.identity();
                this._matrix[0] = x;
                this._matrix[4] = y;

                return this;
            };
            Matrix3._workingMatrix = new Matrix3();

            Matrix3.IDENTITY = new Matrix3();
            return Matrix3;
        })();
        math.Matrix3 = Matrix3;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=Matrix3.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (math) {
        var Matrix4 = (function () {
            function Matrix4() {
                this._matrix = new Float32Array(16);
            }
            return Matrix4;
        })();
        math.Matrix4 = Matrix4;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=Matrix4.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (math) {
        "use strict";

        

        /**
        * @class cc.math.Vector
        * @classdesc
        *
        * Object represents a 2D or 3D vector.
        */
        var Vector = (function () {
            /**
            * Point x coordinate.
            * @member cc.math.Vector#x
            * @type {number}
            */
            /**
            * Point y coordinate.
            * @member cc.math.Vector#y
            * @type {number}
            */
            /**
            * Point z coordinate.
            * @member cc.math.Vector#z
            * @type {number}
            */
            /**
            * @method cc.math.Vector#constructor
            * @param x {number} vector x coordinate
            * @param y {number} vector y coordinate
            * @param z {number=} vector z coordinate. if not set zero by default.
            */
            function Vector(x, y, z) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof z === "undefined") { z = 0; }
                this.x = x;
                this.y = y;
                this.z = z;
            }
            /**
            * Set a Vector with new values.
            *
            * @method cc.math.Vector#set
            * @param x {number} vector x coordinate
            * @param y {number} vector y coordinate
            * @param z {number=} vector z coordinate. if not set zero by default.
            * @returns {cc.math.Vector}
            */
            Vector.prototype.set = function (x, y, z) {
                this.x = x;
                this.y = y;
                this.z = typeof z !== "undefined" ? z : 0;

                return this;
            };

            Vector.prototype.distance = function (v) {
                return Vector.distance(this, v);
            };

            Vector.prototype.sub = function (v) {
                this.x += v.x;
                this.y += v.y;
            };

            Vector.prototype.mult = function (v) {
                this.x *= v;
                this.y *= v;
                this.z *= v;
                return this;
            };

            Vector.sub = function (v0, v1) {
                return new Vector().set(v1.x - v0.x, v1.y - v0.y);
            };

            /**
            * Calculate the distance between two vectors
            * @param v0 {cc.math.Vector}
            * @param v1 {cc.math.Vector}
            * @returns {number} distance between vectors.
            */
            Vector.distance = function (v0, v1) {
                var dx = v1.x - v0.x;
                var dy = v1.y - v0.y;

                return Math.sqrt(dx * dx + dy * dy);
            };

            Vector.prototype.equals = function (v) {
                return this.x === v.x && this.y === v.y && this.z === v.z;
            };
            return Vector;
        })();
        math.Vector = Vector;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=Point.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    /// <reference path="./Point.ts"/>
    (function (math) {
        "use strict";

        /**
        * @class cc.math.Rectangle
        * @classdesc
        *
        * Rectangle Object.
        */
        var Rectangle = (function () {
            /**
            * Left-top x coordinate
            * @member cc.math.Rectangle#x
            * @type {number}
            */
            /**
            * Left-top y coordinate
            * @member cc.math.Rectangle#y
            * @type {number}
            */
            /**
            * Rectangle width
            * @member cc.math.Rectangle#w
            * @type {number}
            */
            /**
            * Rectangle height
            * @member cc.math.Rectangle#h
            * @type {number}
            */
            /**
            * Build a new Rectangle instance.
            * @method cc.math.Rectangle#constructor
            * @param x {number=} 'left' corner x coordinate.
            * @param y {number=} 'left' corner y coordinate.
            * @param w {number=} rectangle width.
            * @param h {number=} rectangle height.
            */
            function Rectangle(x, y, w, h) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (typeof w === "undefined") { w = 0; }
                if (typeof h === "undefined") { h = 0; }
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
                /**
                * 'right' corner x coord.
                * @member cc.math.Rectangle#x1
                * @type {number}
                */
                this.x1 = 0;
                /**
                * 'right' corner y coord.
                * @member cc.math.Rectangle#y1
                * @type {number}
                */
                this.y1 = 0;
                this.set(x, y, w, h);
            }
            /**
            * Overwrite the rectangle's coordinates with new values.
            * @method cc.math.Rectangle#set
            * @param x {number} rectangle position x coordinate
            * @param y {number} rectangle position y coordinate
            * @param w {number} rectangle width
            * @param h {number} rectangle height
            * @returns {cc.math.Rectangle} the rectangle instance.
            */
            Rectangle.prototype.set = function (x, y, w, h) {
                this.x = x;
                this.y = y;
                this.w = w;
                this.h = h;
                this.x1 = x + w;
                this.y1 = y + h;

                return this;
            };

            /**
            * Gets whether a rectangle of given dimension is inside the rectangle.
            * @method cc.math.Rectangle#intersects
            * @param x {number|Rectangle}
            * @param y {number}
            * @param w {number}
            * @param h {number}
            * @returns {boolean}
            */
            Rectangle.prototype.intersects = function (x, y, w, h) {
                if (x instanceof cc.math.Rectangle) {
                    var r = x;
                    x = r.x;
                    y = r.y;
                    w = r.w;
                    h = r.h;
                }

                if (this.x1 < x) {
                    return false;
                }
                if (this.y1 < y) {
                    return false;
                }
                if (this.x >= x + w) {
                    return false;
                }
                if (this.y >= y + h) {
                    return false;
                }

                return true;
            };

            /**
            * Normalize the rectangle's dimension with the given width and height.
            * @param w {number}
            * @param h {number}
            * @returns {cc.math.Rectangle} reference to this.
            */
            Rectangle.prototype.normalizeBy = function (w, h) {
                this.x /= w;
                this.y /= h;
                this.x1 /= w;
                this.y1 /= h;
                this.w /= w;
                this.h /= h;

                return this;
            };

            /**
            * Set the Rectangle with zero size.
            * @method cc.math.Rectangle#setEmpty
            */
            Rectangle.prototype.setEmpty = function () {
                this.x = 0;
                this.y = 0;
                this.x1 = 0;
                this.y1 = 0;
                this.w = 0;
                this.h = 0;
            };

            /**
            * Test whether the Rectangle is empty, eg either its width or height is zero.
            * @method cc.math.Rectangle#isEmpty
            * @returns {boolean}
            */
            Rectangle.prototype.isEmpty = function () {
                return this.w === 0 || this.h === 0;
            };

            /**
            * Intersect this rectangle with the parameter Rectangle.
            * @param r {cc.math.Rectangle}
            * @return {cc.math.Rectangle} reference to this.
            */
            Rectangle.prototype.intersectWith = function (r) {
                if (this.intersects(r)) {
                    if (this.x < r.x) {
                        this.w -= r.x - this.x;
                        this.x = r.x;
                    }
                    if (this.y < r.y) {
                        this.h -= r.y - this.y;
                        this.y = r.y;
                    }

                    if (this.w > r.w) {
                        this.w = r.w;
                    }
                    if (this.h > r.h) {
                        this.h = r.h;
                    }

                    this.x1 = this.x + this.w;
                    this.y1 = this.y + this.h;
                } else {
                    this.setEmpty();
                }

                return this;
            };

            Rectangle.prototype.contains = function (x, y) {
                var tx;
                var ty;

                if (typeof x !== "number") {
                    var v = x;
                    tx = v.x;
                    ty = v.y;
                } else {
                    tx = x;
                    ty = y;
                }

                return tx >= this.x && ty >= this.y && tx < this.x1 && ty < this.y1;
            };
            return Rectangle;
        })();
        math.Rectangle = Rectangle;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=Rectangle.js.map

/**
* License: see license.txt file
*/
var cc;
(function (cc) {
    (function (math) {
        /**
        * @class cc.math.Dimension
        * @classdesc
        *
        * This Class is for dimension definition.
        */
        var Dimension = (function () {
            /**
            * Dimension width.
            * @member cc.math.Dimension#width
            * @type {number}
            * @public
            */
            /**
            * Dimension height.
            * @member cc.math.Dimension#height
            * @type {number}
            * @public
            */
            /**
            * Build a new Dimension instance.
            * @method cc.math.Dimension#constructor
            * @param width {number}
            * @param height {number}
            */
            function Dimension(width, height) {
                if (typeof width === "undefined") { width = 0; }
                if (typeof height === "undefined") { height = 0; }
                this.width = width;
                this.height = height;
            }
            /**
            * Set the dimension.
            * @param w {any}
            * @param h {number}
            * @returns {cc.math.Dimension}
            */
            Dimension.prototype.set = function (w, h) {
                if (typeof w === 'number') {
                    this.width = w;
                    this.height = h;
                } else {
                    var d = w;
                    this.width = d.width;
                    this.height = d.height;
                }

                return this;
            };

            Dimension.prototype.clone = function () {
                return new Dimension(this.width, this.height);
            };
            return Dimension;
        })();
        math.Dimension = Dimension;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=Dimension.js.map

/**
* Created by ibon on 11/20/14.
*/
var cc;
(function (cc) {
    (function (math) {
        /// <reference path="../Point.ts"/>
        /// <reference path="../../util/Debug.ts"/>
        /// <reference path="../../locale/Locale.ts"/>
        (function (path) {
            path.DEFAULT_TRACE_LENGTH = 30;

            
        })(math.path || (math.path = {}));
        var path = math.path;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=Segment.js.map

/**
* License: see license.txt file
*/
var cc;
(function (cc) {
    (function (math) {
        /// <reference path="../Point.ts"/>
        /// <reference path="./Segment.ts"/>
        (function (path) {
            var Vector = cc.math.Vector;

            

            var __v = new Vector();

            /**
            *
            * @class cc.math.path.SegmentLine
            * @implements cc.math.path.Segment
            * @classdesc
            *
            * Objects of this type represent a line segment.
            * Line segments are added to a Path by calling <code>path.lineTo(x,y)</code>.
            *
            */
            var SegmentLine = (function () {
                /**
                * Build a new SegmentLine instance.
                * @method cc.math.path.SegmentLine#constructor
                * @param data {SegmentLineInitializer=}
                */
                function SegmentLine(data) {
                    /**
                    * Parent Segment. An instance of <code>ContainerSegment</code>
                    * @member cc.math.path.SegmentLine
                    * @type {cc.math.path.Segment}
                    * @private
                    */
                    this._parent = null;
                    /**
                    * The line segment length.
                    * @member cc.math.path.SegmentLine#_length
                    * @type {number}
                    * @private
                    */
                    this._length = 0;
                    if (data) {
                        this.initialize(data.start, data.end);
                    }
                }
                /**
                * Get the Segment's parent Segment.
                * @method cc.math.path.SegmentLine#getParent
                * @returns {cc.math.path.Segment}
                */
                SegmentLine.prototype.getParent = function () {
                    return this._parent;
                };

                /**
                * Set the Segment's parent Segment.
                * @method cc.math.path.SegmentLine#setParent
                * @param s {cc.math.path.Segment}
                */
                SegmentLine.prototype.setParent = function (s) {
                    this._parent = s;
                };

                /**
                * Initialize this segment points.
                * This method takes the supplied point references, does not build new points.
                * @method cc.math.path.SegmentLine#setPoints
                * @param start {cc.math.Point} start line point.
                * @param end {cc.math.Point} end line point.
                */
                SegmentLine.prototype.initialize = function (start, end) {
                    this._start = new Vector(start.x, start.y);
                    this._end = new Vector(end.x, end.y);

                    this._length = Math.sqrt((this._start.x - this._end.x) * (this._start.x - this._end.x) + (this._start.y - this._end.y) * (this._start.y - this._end.y));
                };

                /**
                * Get the line length.
                * @override
                * @method cc.math.path.SegmentLine#getLength
                * @returns {number}
                */
                SegmentLine.prototype.getLength = function () {
                    return this._length;
                };

                /**
                * Sample some points on the line segment.
                * This implementation only samples two points, initial and final.
                * It returns the points that conform the line, if they are changed, the line will be changed as well.
                * @method cc.math.path.SegmentLine#trace
                * @param numPoints {number=} number of points traced on the segment.
                * @param dstArray {Array<cc.math.Vector>=} array where to add the traced points.
                * @returns {Array<Vector>} returns the supplied array of points, or a new array of points if not set.
                */
                SegmentLine.prototype.trace = function (numPoints, dstArray) {
                    dstArray = dstArray || [];

                    dstArray.push(this._start);
                    dstArray.push(this._end);

                    return dstArray;
                };

                /**
                * Get a point on the line at the given proportional position.
                * @param normalizedPos {number} value in the range 0..1
                * @param out {cc.math.Vector=} optional out point. if not set, an internal spare point will be used.
                * @returns {cc.math.Vector} a point on the segment at the given position. This point should be copied,
                * successive calls to getValue will return the same point instance.
                */
                SegmentLine.prototype.getValueAt = function (normalizedPos, out) {
                    out = out || __v;

                    out.x = (this._end.x - this._start.x) * normalizedPos + this._start.x;
                    out.y = (this._end.y - this._start.y) * normalizedPos + this._start.y;

                    return out;
                };

                /**
                * Get the Segment's starting point.
                * It returns the original starting Point reference, not a copy of it.
                * @returns {cc.math.Vector}
                */
                SegmentLine.prototype.getStartingPoint = function () {
                    return this._start;
                };

                /**
                * Get the Segment's ending point.
                * It returns the original starting Point reference, not a copy of it.
                * @returns {cc.math.Vector}
                */
                SegmentLine.prototype.getEndingPoint = function () {
                    return this._end;
                };

                /**
                * Make a clone of the segment.
                * @method cc.math.path.SegmentLine#clone
                * @returns {cc.math.path.Segment}
                */
                SegmentLine.prototype.clone = function () {
                    var sl = new SegmentLine({
                        start: {
                            x: this._start.x,
                            y: this._start.y
                        },
                        end: {
                            x: this._end.x,
                            y: this._end.y
                        }
                    });

                    sl._length = this._length;
                    return this;
                };

                /**
                * Add this Segment control points to the array.
                * If the array is not set, a new one will be created.
                * The actual Segment points are added, so modifying them means modifying the path.
                * @method cc.math.path.SegmentLine#getControlPoints
                * @param arr {Array<cc.math.Vector>}
                * @returns {Array<cc.math.Vector>}
                */
                SegmentLine.prototype.getControlPoints = function (arr) {
                    arr = arr || [];

                    arr.push(this._start);
                    arr.push(this._end);

                    return arr;
                };

                /**
                * Mark the Segment dirty.
                * No action for lines.
                * @methodcc.math.path.SegmentLine#setDirty
                */
                SegmentLine.prototype.setDirty = function () {
                };
                return SegmentLine;
            })();
            path.SegmentLine = SegmentLine;
        })(math.path || (math.path = {}));
        var path = math.path;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=SegmentLine.js.map

/**
* License: see license.txt file
*/
var cc;
(function (cc) {
    (function (math) {
        /// <reference path="../Point.ts"/>
        (function (path) {
            "use strict";

            var Vector = cc.math.Vector;

            /**
            *
            * Original source:
            * http://www.antigrain.com/research/adaptive_bezier/index.html
            *
            */
            /**
            * Recursion limit to calculate curve.
            * @type {number}
            */
            var curve_recursion_limit = 8;

            /**
            * 0.2 when stroking is on lines > 1px in width.
            * You set it in radians. The less this value is the more accurate will be the approximation at sharp turns.
            * But 0 means that we don't consider angle conditions at all.
            * @type {number}
            */
            var m_angle_tolerance = 0.2;

            /**
            * should not exceed 10-15 degrees (in radians)
            * @type {number}
            */
            var m_cusp_limit = 15 * Math.PI / 180;

            /**
            * worlModelView scale factor. (1 by default)
            * @type {number}
            */
            var m_approximation_scale = 1;

            /**
            * colinearity threshold.
            * @type {number}
            */
            var curve_collinearity_epsilon = 0.001;

            /**
            *
            * @type {number}
            */
            var curve_angle_tolerance_epsilon = 0;

            /**
            * calculated by m_approximation_scale
            * @type {number}
            */
            var m_distance_tolerance = 0.0001;

            function __recursive_bezier(points, x1, y1, x2, y2, x3, y3, x4, y4, level) {
                if (level > curve_recursion_limit) {
                    return;
                }

                // Calculate all the mid-points of the line segments
                //----------------------
                var x12 = (x1 + x2) / 2;
                var y12 = (y1 + y2) / 2;
                var x23 = (x2 + x3) / 2;
                var y23 = (y2 + y3) / 2;
                var x34 = (x3 + x4) / 2;
                var y34 = (y3 + y4) / 2;
                var x123 = (x12 + x23) / 2;
                var y123 = (y12 + y23) / 2;
                var x234 = (x23 + x34) / 2;
                var y234 = (y23 + y34) / 2;
                var x1234 = (x123 + x234) / 2;
                var y1234 = (y123 + y234) / 2;

                if (level > 0) {
                    // Try to approximate the full cubic curve by a single straight line
                    //------------------
                    var dx = x4 - x1;
                    var dy = y4 - y1;

                    var d2 = Math.abs(((x2 - x4) * dy - (y2 - y4) * dx));
                    var d3 = Math.abs(((x3 - x4) * dy - (y3 - y4) * dx));

                    var da1, da2;

                    if (d2 > curve_collinearity_epsilon && d3 > curve_collinearity_epsilon) {
                        // Regular care
                        //-----------------
                        if ((d2 + d3) * (d2 + d3) <= m_distance_tolerance * (dx * dx + dy * dy)) {
                            // If the curvature doesn't exceed the distance_tolerance value
                            // we tend to finish subdivisions.
                            //----------------------
                            if (m_angle_tolerance < curve_angle_tolerance_epsilon) {
                                points.push(new Vector(x1234, y1234));
                                return;
                            }

                            // Angle & Cusp Condition
                            //----------------------
                            var a23 = Math.atan2(y3 - y2, x3 - x2);
                            da1 = Math.abs(a23 - Math.atan2(y2 - y1, x2 - x1));
                            da2 = Math.abs(Math.atan2(y4 - y3, x4 - x3) - a23);
                            if (da1 >= Math.PI)
                                da1 = 2 * Math.PI - da1;
                            if (da2 >= Math.PI)
                                da2 = 2 * Math.PI - da2;

                            if (da1 + da2 < m_angle_tolerance) {
                                // Finally we can stop the recursion
                                //----------------------
                                points.push(new Vector(x1234, y1234));
                                return;
                            }

                            if (m_cusp_limit !== 0.0) {
                                if (da1 > m_cusp_limit) {
                                    points.push(new Vector(x2, y2));
                                    return;
                                }

                                if (da2 > m_cusp_limit) {
                                    points.push(new Vector(x3, y3));
                                    return;
                                }
                            }
                        }
                    } else {
                        if (d2 > curve_collinearity_epsilon) {
                            // p1,p3,p4 are collinear, p2 is considerable
                            //----------------------
                            if (d2 * d2 <= m_distance_tolerance * (dx * dx + dy * dy)) {
                                if (m_angle_tolerance < curve_angle_tolerance_epsilon) {
                                    points.push(new Vector(x1234, y1234));
                                    return;
                                }

                                // Angle Condition
                                //----------------------
                                da1 = Math.abs(Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y2 - y1, x2 - x1));
                                if (da1 >= Math.PI)
                                    da1 = 2 * Math.PI - da1;

                                if (da1 < m_angle_tolerance) {
                                    points.push(new Vector(x2, y2));
                                    points.push(new Vector(x3, y3));
                                    return;
                                }

                                if (m_cusp_limit !== 0.0) {
                                    if (da1 > m_cusp_limit) {
                                        points.push(new Vector(x2, y2));
                                        return;
                                    }
                                }
                            }
                        } else if (d3 > curve_collinearity_epsilon) {
                            // p1,p2,p4 are collinear, p3 is considerable
                            //----------------------
                            if (d3 * d3 <= m_distance_tolerance * (dx * dx + dy * dy)) {
                                if (m_angle_tolerance < curve_angle_tolerance_epsilon) {
                                    points.push(new Vector(x1234, y1234));
                                    return;
                                }

                                // Angle Condition
                                //----------------------
                                da1 = Math.abs(Math.atan2(y4 - y3, x4 - x3) - Math.atan2(y3 - y2, x3 - x2));
                                if (da1 >= Math.PI)
                                    da1 = 2 * Math.PI - da1;

                                if (da1 < m_angle_tolerance) {
                                    points.push(new Vector(x2, y2));
                                    points.push(new Vector(x3, y3));
                                    return;
                                }

                                if (m_cusp_limit !== 0.0) {
                                    if (da1 > m_cusp_limit) {
                                        points.push(new Vector(x3, y3));
                                        return;
                                    }
                                }
                            }
                        } else {
                            // Collinear case
                            //-----------------
                            dx = x1234 - (x1 + x4) / 2;
                            dy = y1234 - (y1 + y4) / 2;
                            if (dx * dx + dy * dy <= m_distance_tolerance) {
                                points.push(new Vector(x1234, y1234));
                                return;
                            }
                        }
                    }
                }

                // Continue subdivision
                //----------------------
                __recursive_bezier(points, x1, y1, x12, y12, x123, y123, x1234, y1234, level + 1);
                __recursive_bezier(points, x1234, y1234, x234, y234, x34, y34, x4, y4, level + 1);
            }

            /**
            *
            * @param p0 {cc.math.Vector}
            * @param cp0 {cc.math.Vector}
            * @param cp1 {cc.math.Vector}
            * @param p1 {cc.math.Vector}
            * @param points {Array<cc.math.Vector>=}
            *
            * @static
            */
            function traceBezier(p0, cp0, cp1, p1, m_points) {
                var x1 = p0.x;
                var y1 = p0.y;
                var x2 = cp0.x;
                var y2 = cp0.y;
                var x3 = cp1.x;
                var y3 = cp1.y;
                var x4 = p1.x;
                var y4 = p1.y;

                var m_points = m_points || [];
                m_distance_tolerance = 0.5 / m_approximation_scale;
                m_distance_tolerance *= m_distance_tolerance;
                m_points.push(new Vector(x1, y1));
                __recursive_bezier(m_points, x1, y1, x2, y2, x3, y3, x4, y4, 0);
                m_points.push(new Vector(x4, y4));
                return m_points;
            }
            path.traceBezier = traceBezier;

            /**
            *
            * @param p0 {cc.math.Vector}
            * @param cp0 {cc.math.Vector}
            * @param p1 {cc.math.Vector}
            * @param m_points {Array<cc.math.Vector>=}
            * @static
            */
            function traceQuadratic(p0, cp0, p1, m_points) {
                var x1 = p0.x;
                var y1 = p0.y;
                var x2 = cp0.x;
                var y2 = cp0.y;
                var x3 = p1.x;
                var y3 = p1.y;

                m_points = m_points || [];
                m_distance_tolerance = 0.5 / m_approximation_scale;
                m_distance_tolerance *= m_distance_tolerance;

                m_points.push(new Vector(x1, y1));
                __recursive_quadratic(m_points, x1, y1, x2, y2, x3, y3, 0);
                m_points.push(new Vector(x3, y3));
                return m_points;
            }
            path.traceQuadratic = traceQuadratic;

            /**
            *
            * @param x1 {number}
            * @param y1 {number}
            * @param x2 {number}
            * @param y2 {number}
            * @param x3 {number}
            * @param y3 {number}
            * @param level {number}
            * @private
            * @static
            */
            function __recursive_quadratic(points, x1, y1, x2, y2, x3, y3, level) {
                if (level > curve_recursion_limit) {
                    return;
                }

                // Calculate all the mid-points of the line segments
                //----------------------
                var x12 = (x1 + x2) / 2;
                var y12 = (y1 + y2) / 2;
                var x23 = (x2 + x3) / 2;
                var y23 = (y2 + y3) / 2;
                var x123 = (x12 + x23) / 2;
                var y123 = (y12 + y23) / 2;

                var dx = x3 - x1;
                var dy = y3 - y1;
                var d = Math.abs(((x2 - x3) * dy - (y2 - y3) * dx));

                if (d > curve_collinearity_epsilon) {
                    // Regular care
                    //-----------------
                    if (d * d <= m_distance_tolerance * (dx * dx + dy * dy)) {
                        // If the curvature doesn't exceed the distance_tolerance value
                        // we tend to finish subdivisions.
                        //----------------------
                        if (m_angle_tolerance < curve_angle_tolerance_epsilon) {
                            points.push(new Vector(x123, y123));
                            return;
                        }

                        // Angle & Cusp Condition
                        //----------------------
                        var da = Math.abs(Math.atan2(y3 - y2, x3 - x2) - Math.atan2(y2 - y1, x2 - x1));
                        if (da >= Math.PI)
                            da = 2 * Math.PI - da;

                        if (da < m_angle_tolerance) {
                            // Finally we can stop the recursion
                            //----------------------
                            points.push(new Vector(x123, y123));
                            return;
                        }
                    }
                } else {
                    // Collinear case
                    //-----------------
                    dx = x123 - (x1 + x3) / 2;
                    dy = y123 - (y1 + y3) / 2;
                    if (dx * dx + dy * dy <= m_distance_tolerance) {
                        points.push(new Vector(x123, y123));
                        return;
                    }
                }

                // Continue subdivision
                //----------------------
                __recursive_quadratic(points, x1, y1, x12, y12, x123, y123, level + 1);
                __recursive_quadratic(points, x123, y123, x23, y23, x3, y3, level + 1);
            }
        })(math.path || (math.path = {}));
        var path = math.path;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=BezierTracer.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (math) {
        /// <reference path="../Point.ts"/>
        /// <reference path="./Segment.ts"/>
        /// <reference path="./BezierTracer.ts"/>
        /// <reference path="../Path.ts"/>
        (function (_path) {
            var Vector = cc.math.Vector;

            var __v0 = new Vector();

            

            /**
            * @class cc.math.path.SegmentBezier
            * @classdesc
            *
            * This Object is a Cubic Bezier Segment.
            * <p>
            *     It is composed of two points and a two tension control points. Internally, the Segment can cache its contour.
            * <p>
            *     The contour can be of two different types:
            *     + directly traced over the curve. Leaves points at different distances on the curve.
            *     + equi-distant on the curve. Internally traces the points as in the other type, but then creates a polyline
            *       path with the points, and samples the resulting path at regular intervals. This transforms the curve into
            *       a polyline, which is faster for most calculations, but could not be as smooth as the other type.
            * <p>
            * By default, the curve is calculated with the first type, directly tracing on the curve
            *
            */
            var SegmentBezier = (function () {
                /**
                * Create a new Cubic Segment instance.
                * @param data {cc.math.path.SegmentBezierInitializer=}
                */
                function SegmentBezier(data) {
                    /**
                    * Start Cubic curve point.
                    * @member cc.math.path.SegmentBezier#_p0
                    * @type {cc.math.Vector}
                    * @private
                    */
                    this._p0 = null;
                    /**
                    * First Cubic curve control point.
                    * @member cc.math.path.SegmentBezier#_cp0
                    * @type {cc.math.Vector}
                    * @private
                    */
                    this._cp0 = null;
                    /**
                    * Second Cubic curve control point.
                    * @member cc.math.path.SegmentBezier#_cp1
                    * @type {cc.math.Vector}
                    * @private
                    */
                    this._cp1 = null;
                    /**
                    * End Cubic curve point.
                    * @member cc.math.path.SegmentBezier#_p1
                    * @type {cc.math.Vector}
                    * @private
                    */
                    this._p1 = null;
                    /**
                    * Internal flag for cache validity.
                    * @member cc.math.path.SegmentBezier#_dirty
                    * @type {boolean}
                    * @private
                    */
                    this._dirty = true;
                    /**
                    * Parent segment.
                    * @member cc.math.path.SegmentBezier#_parent
                    * @type {cc.math.path.Segment}
                    * @private
                    */
                    this._parent = null;
                    /**
                    * Segment length. It is approximately calculated by subdividing the curve.
                    * @member cc.math.path.SegmentBezier#_length
                    * @type {number}
                    * @private
                    */
                    this._length = 0;
                    /**
                    * Whether the Cubic is internally treated as a polyline.
                    * @member cc.math.path.SegmentBezier#_flattened
                    * @type {boolean}
                    * @private
                    */
                    this._flattened = false;
                    /**
                    * A cache of points on the curve. This is approximation with which the length is calculated.
                    * @member cc.math.path.SegmentBezier#_cachedContourPoints
                    * @type {Array<cc.math.Vector>}
                    * @private
                    */
                    this._cachedContourPoints = null;
                    if (data) {
                        this.initialize(data.p0, data.p1, data.p2, data.p3);
                    }
                }
                /**
                * Initialize the Segment with the supplied points.
                * @param p0 {cc.math.Point} start curve point.
                * @param p1 {cc.math.Point} first curve control point.
                * @param p2 {cc.math.Point} second curve control point.
                * @param p3 {cc.math.Point} end curve point}
                */
                SegmentBezier.prototype.initialize = function (p0, p1, p2, p3) {
                    this._p0 = new Vector(p0.x, p0.y);
                    this._cp0 = new Vector(p1.x, p1.y);
                    this._cp1 = new Vector(p2.x, p2.y);
                    this._p1 = new Vector(p3.x, p3.y);

                    this.__update();
                    this._dirty = false;
                };

                /**
                * Flatten this Segment and consider it a polyline with equidistant points.
                * @param numPoints {number=} Number of points (meaning numPoints-1 line segments). If not set, the number of
                *        points will be exactly the same resulting from tracing the Cubic segment. (you are good by not
                *        supplying a value).
                * @returns {cc.math.path.SegmentBezier}
                */
                SegmentBezier.prototype.flatten = function (numPoints) {
                    // already flattened and with the same amount of points ? do nothing dude.
                    if (!this._dirty && this._flattened && numPoints === this._cachedContourPoints.length) {
                        return;
                    }

                    // trace this Cubic segment
                    var points = cc.math.path.traceBezier(this._p0, this._cp0, this._cp1, this._p1);

                    // build a polyline of the specified number of points, or as much as twice the traced contour.
                    // twice, since after all, we are approximating a curve to lines. and this is just preprocess, won't hurt
                    // the long term.
                    numPoints = numPoints || points.length * 2;

                    // now path is a polyline which is not proportionally sampled.
                    var path = cc.math.Path.createFromPoints(points);

                    // sample the path and get another polyline with each point at a regular distance.
                    points = [];
                    path.trace(numPoints, points);

                    // signal flattened data
                    this._flattened = true;

                    // save data for later usage
                    this._cachedContourPoints = points;

                    // update segment length
                    this.__calculateLength();

                    // not dirty, caches and length are freshly calculated
                    this._dirty = false;

                    return this;
                };

                /**
                * Update the Cubic Segment info.
                * @param numPoints {number=}
                * @private
                */
                SegmentBezier.prototype.__update = function (numPoints) {
                    this._dirty = false;

                    numPoints = numPoints || (this._cachedContourPoints && this._cachedContourPoints.length) || cc.math.path.DEFAULT_TRACE_LENGTH;

                    // and was flattened
                    if (this._flattened) {
                        // recalculate polyline of equally distributed points
                        this.flatten();
                    } else {
                        // was not flattened
                        this._cachedContourPoints = [];
                        for (var i = 0; i <= numPoints; i++) {
                            this._cachedContourPoints.push(this.getValueAt(i / numPoints, new Vector()));
                        }
                    }

                    this.__calculateLength();
                };

                SegmentBezier.prototype.__calculateLength = function () {
                    var points = this._cachedContourPoints;

                    // calculate distance
                    this._length = 0;
                    for (var i = 0; i < points.length - 1; i++) {
                        this._length += points[i].distance(points[i + 1]);
                    }
                };

                /**
                * Get the Segment's parent Segment.
                * @method cc.math.path.SegmentBezier#getParent
                * @returns {cc.math.path.Segment}
                */
                SegmentBezier.prototype.getParent = function () {
                    return this._parent;
                };

                /**
                * Set the Segment's parent Segment.
                * @method cc.math.path.SegmentBezier#setParent
                * @param s {cc.math.path.Segment}
                */
                SegmentBezier.prototype.setParent = function (s) {
                    this._parent = s;
                };

                /**
                * Get the Segment length.
                * @override
                * @method cc.math.path.SegmentBezier#getLength
                * @returns {number}
                */
                SegmentBezier.prototype.getLength = function () {
                    if (this._dirty) {
                        this.__update();
                    }
                    return this._length;
                };

                /**
                * Sample some points on the segment. It will return either the sampled contour, or the flattened version of it.
                * It returns the points that conform the Segment contour, if they are changed, the contour will be changed as well.
                * @method cc.math.path.SegmentBezier#trace
                * @param numPoints {number=} number of points traced on the segment.
                * @param dstArray {Array<cc.math.Vector>=} array where to add the traced points.
                * @returns {Array<Vector>} returns the supplied array of points, or a new array of points if not set.
                */
                SegmentBezier.prototype.trace = function (numPoints, dstArray) {
                    if (this._dirty) {
                        this.__update(numPoints);
                    }

                    dstArray = dstArray || [];

                    // copy flattened polyline to dst array.
                    if (this._cachedContourPoints !== dstArray) {
                        for (var i = 0; i < this._cachedContourPoints.length; i++) {
                            dstArray.push(this._cachedContourPoints[i]);
                        }
                    }

                    return dstArray;
                };

                /**
                * Get a point on the Segment at the given proportional position.
                * + If the segment is flattened, the value will be calculated from the internally cached curve contour.
                * + If not, if will be calculated by solving the curve.
                * The first is faster, but could be inaccurate for curves with a los number of flattened cached points.
                * For this kind of segment, the first method is way faster.
                * @param normalizedPos {number} value in the range 0..1
                * @param out {cc.math.Vector=} optional out point. if not set, an internal spare point will be used.
                * @returns {cc.math.Vector} a point on the segment at the given position. This point should be copied,
                * successive calls to getValue will return the same point instance.
                */
                SegmentBezier.prototype.getValueAt = function (normalizedPos, out) {
                    // if dirty, update curve info
                    if (this._dirty) {
                        this.__update();
                    }

                    // no out point, use a spare internal one. WARNING, will be continuously reused.
                    out = out || __v0;

                    // fix normalization values, just in case.
                    if (normalizedPos > 1 || normalizedPos < -1) {
                        normalizedPos %= 1;
                    }
                    if (normalizedPos < 0) {
                        normalizedPos += 1;
                    }

                    if (this._flattened) {
                        var fp = this._cachedContourPoints;
                        var segment = (normalizedPos * fp.length - 1);
                        normalizedPos = (segment - (segment | 0)) / (1 / (fp.length - 1));
                        segment |= 0;

                        out.x = fp[segment].x + (fp[segment + 1].x - fp[segment].x) * normalizedPos;
                        out.y = fp[segment].y + (fp[segment + 1].y - fp[segment].y) * normalizedPos;
                    } else {
                        if (normalizedPos === 1) {
                            out.set(this._p1.x, this._p1.y);
                        } else if (normalizedPos === 0) {
                            out.set(this._p0.x, this._p0.y);
                        } else {
                            var t = normalizedPos;
                            var t2 = t * t;
                            var t3 = t * t2;

                            var cl0 = this._p0;
                            var cl1 = this._cp0;
                            var cl2 = this._cp1;
                            var cl3 = this._p1;

                            // solve cubic bezier for nomalized time.
                            out.x = (cl0.x + t * (-cl0.x * 3 + t * (3 * cl0.x - cl0.x * t))) + t * (3 * cl1.x + t * (-6 * cl1.x + cl1.x * 3 * t)) + t2 * (cl2.x * 3 - cl2.x * 3 * t) + t3 * cl3.x;
                            out.y = (cl0.y + t * (-cl0.y * 3 + t * (3 * cl0.y - cl0.y * t))) + t * (3 * cl1.y + t * (-6 * cl1.y + cl1.y * 3 * t)) + t2 * (cl2.y * 3 - cl2.y * 3 * t) + t3 * cl3.y;
                        }
                    }

                    return out;
                };

                /**
                * Get the Segment's starting point.
                * It returns the original starting Point reference, not a copy of it.
                * @returns {cc.math.Vector}
                */
                SegmentBezier.prototype.getStartingPoint = function () {
                    return this._p0;
                };

                /**
                * Get the Segment's ending point.
                * It returns the original starting Point reference, not a copy of it.
                * @returns {cc.math.Vector}
                */
                SegmentBezier.prototype.getEndingPoint = function () {
                    return this._p1;
                };

                /**
                * Make a clone of the segment.
                * @method cc.math.path.SegmentBezier#clone
                * @returns {cc.math.path.Segment}
                */
                SegmentBezier.prototype.clone = function () {
                    var segment = new SegmentBezier({
                        p0: {
                            x: this._p0.x,
                            y: this._p0.y
                        },
                        p1: {
                            x: this._cp0.x,
                            y: this._cp0.y
                        },
                        p2: {
                            x: this._cp1.x,
                            y: this._cp1.y
                        },
                        p3: {
                            x: this._p1.x,
                            y: this._p1.y
                        }
                    });

                    if (this._flattened) {
                        segment.flatten(this._cachedContourPoints.length);
                    }

                    segment._length = this._length;

                    return segment;
                };

                /**
                * Add this Segment control points to the array.
                * If the array is not set, a new one will be created.
                * The actual Segment points are added, so modifying them means modifying the path.
                * @method cc.math.path.SegmentBezier#getControlPoints
                * @param arr {Array<cc.math.Vector>}
                * @returns {Array<cc.math.Vector>}
                */
                SegmentBezier.prototype.getControlPoints = function (arr) {
                    arr = arr || [];

                    arr.push(this._p0);
                    arr.push(this._cp0);
                    arr.push(this._cp1);
                    arr.push(this._p1);

                    return arr;
                };

                /**
                * Mark the bezier as dirty. Mark internal polilyne info as invalid.
                * @methodcc.math.path.SegmentBezier#setDirty
                */
                SegmentBezier.prototype.setDirty = function () {
                    this._dirty = true;
                };
                return SegmentBezier;
            })();
            _path.SegmentBezier = SegmentBezier;
        })(math.path || (math.path = {}));
        var path = math.path;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=SegmentBezier.js.map

/**
* Created by ibon on 11/23/14.
*/
var cc;
(function (cc) {
    (function (math) {
        /// <reference path="../Point.ts"/>
        /// <reference path="./Segment.ts"/>
        (function (path) {
            var Vector = cc.math.Vector;

            

            var __v0 = new Vector();

            /**
            * @class cc.math.path.SegmentArc
            * @implements Segment
            * @classdesc
            *
            * This Segment represents a circle's arc.
            * The arc is defined by a position, a radius and two angles. It also specified how the angles should be traversed
            * clock or counter clock wisely.
            * The arc will be the minimum angle between the start and end angles.
            *
            */
            var SegmentArc = (function () {
                /**
                * Build a new SegmentArc instance.
                * @method cc.math.path.SegmentArc#constructor
                * @param data {cc.math.path.SegmentArcInitializer=} optional arc initialization data.
                */
                function SegmentArc(data) {
                    /**
                    * Cached arc starting point.
                    * @member cc.math.path.SegmentArc#_startingPoint
                    * @type {cc.math.Vector}
                    * @private
                    */
                    this._startingPoint = null;
                    /**
                    * Cached arc ending point.
                    * @member cc.math.path.SegmentArc#_endingPoint
                    * @type {cc.math.Vector}
                    * @private
                    */
                    this._endingPoint = null;
                    /**
                    * Cached Segment length value.
                    * @member cc.math.path.SegmentArc#_length
                    * @type {number}
                    * @private
                    */
                    this._length = 0;
                    this.initialize(data);
                }
                /**
                * Initialize the Arc Segment with data.
                * @method cc.math.path.SegmentArc#initialize
                * @param data {cc.math.path.SegmentArcInitializer}
                */
                SegmentArc.prototype.initialize = function (data) {
                    this._x = data.x;
                    this._y = data.y;
                    this._radius = data.radius;
                    this._startAngle = data.startAngle;
                    this._endAngle = data.endAngle;
                    this._ccw = data.ccw;

                    if (!this._ccw && this._endAngle <= this._startAngle) {
                        this._endAngle += 2 * Math.PI;
                    } else if (this._ccw && this._startAngle <= this._endAngle) {
                        this._startAngle += 2 * Math.PI;
                    }

                    var s = this.getValueAt(0);
                    this._startingPoint = new Vector();
                    this._startingPoint.x = s.x;
                    this._startingPoint.y = s.y;
                    s = this.getValueAt(1);
                    this._endingPoint = new Vector();
                    this._endingPoint.x = s.x;
                    this._endingPoint.y = s.y;

                    this._length = Math.abs(this._radius * (this._endAngle - this._startAngle));
                };

                /**
                * Return the Segment's starting point reference. It is the stored one, not a copy.
                * @method cc.math.path.SegmentArc#getStartingPoint
                * @returns {cc.math.Vector}
                */
                SegmentArc.prototype.getStartingPoint = function () {
                    return this._startingPoint;
                };

                /**
                * Return the Segment's ending point reference. It is the stored one, not a copy.
                * @method cc.math.path.SegmentArc#getEndingPoint
                * @returns {cc.math.Vector}
                */
                SegmentArc.prototype.getEndingPoint = function () {
                    return this._endingPoint;
                };

                /**
                * Get the Segment's arc length.
                * @method cc.math.path.SegmentArc#getLength
                * @returns {number}
                */
                SegmentArc.prototype.getLength = function () {
                    return this._length;
                };

                /**
                * Get a Point in the Arc.
                * @method cc.math.path.SegmentArc#getValueAt
                * @param v {number} Position in path. 0= startingPoint, 1= endingPoint
                * @param out {cc.math.Vector=} an optional out Point. If not set, an internal spare point will be returned.
                * @returns {cc.math.Vector}
                */
                SegmentArc.prototype.getValueAt = function (v, out) {
                    var diffAngle = (this._endAngle - this._startAngle) * v;

                    out = out || __v0;

                    out.x = this._x + this._radius * Math.cos(this._startAngle + diffAngle);
                    out.y = this._y + this._radius * Math.sin(this._startAngle + diffAngle);

                    return out;
                };

                /**
                * Sample some points in the Segment.
                * @method cc.math.path.SegmentArc#trace
                * @param numPoints {number=} Number of points. if not set, cc.math.path.DEFAULT_TRACE_LENGTH points will be traced.
                * @param dstArray {Array<cc.math.Vector>=} optional output array of points. If not set, a new one will be created.
                * @returns {Array<Vector>} An array where the traced points have been added.
                */
                SegmentArc.prototype.trace = function (numPoints, dstArray) {
                    numPoints = numPoints || cc.math.path.DEFAULT_TRACE_LENGTH;
                    dstArray = dstArray || [];

                    if (this._startAngle === this._endAngle || this._radius === 0) {
                        return dstArray;
                    }

                    for (var i = 0; i < numPoints; i++) {
                        dstArray.push(this.getValueAt(i / numPoints, new Vector()));
                    }

                    return dstArray;
                };

                /**
                * Get the Segment's parent Segment.
                * @method cc.math.path.SegmentArc#getParent
                * @returns {cc.math.path.Segment}
                */
                SegmentArc.prototype.getParent = function () {
                    return this._parent;
                };

                /**
                * Set the Segment's parent Segment.
                * @method cc.math.path.SegmentArc#setParent
                * @param s {cc.math.path.Segment}
                */
                SegmentArc.prototype.setParent = function (s) {
                    this._parent = s;
                };

                /**
                * Make a clone of the segment.
                * @method cc.math.path.SegmentArc#clone
                * @returns {cc.math.path.Segment}
                */
                SegmentArc.prototype.clone = function () {
                    return new SegmentArc({
                        x: this._x,
                        y: this._y,
                        radius: this._radius,
                        startAngle: this._startAngle,
                        endAngle: this._endAngle,
                        ccw: this._ccw
                    });
                };

                /**
                * Add the Segment control points to the array.
                * If the array is not set, a new one will be created.
                * The actual Segment points are added, so modifying them means modifying the path.
                * Arc segments have no control points.
                * @method cc.math.path.SegmentArc#getControlPoints
                * @param arr {Array<cc.math.Vector>}
                * @returns {Array<cc.math.Vector>}
                */
                SegmentArc.prototype.getControlPoints = function (arr) {
                    arr = arr || [];

                    return arr;
                };

                /**
                * Mark the Segment dirty.
                * No action for Arcs.
                * @methodcc.math.path.ContainerSegment#setDirty
                */
                SegmentArc.prototype.setDirty = function () {
                };
                return SegmentArc;
            })();
            path.SegmentArc = SegmentArc;
        })(math.path || (math.path = {}));
        var path = math.path;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=SegmentArc.js.map

/**
* Created by ibon on 11/22/14.
*/
var cc;
(function (cc) {
    (function (math) {
        /// <reference path="./Segment.ts"/>
        (function (path) {
            var __v0 = new math.Vector();

            /**
            * @class cc.math.path.ContainerSegment
            * @implements Segment
            * @classdesc
            *
            * This object is the base for all Container segments. Container Segments are Path and SubPath, that is, Segments
            * that are build of a collection of Segment objects.
            *
            */
            var ContainerSegment = (function () {
                function ContainerSegment() {
                    /**
                    * Parent Segment. An instance of <code>ContainerSegment</code>
                    * @member cc.math.path.SegmentLine
                    * @type {cc.math.path.Segment}
                    * @private
                    */
                    this._parent = null;
                    /**
                    * The path length
                    * @member cc.math.path.ContainerSegment#_length
                    * @type {number}
                    * @private
                    */
                    this._length = 0;
                    /**
                    * The path segments. Any of the segments can be another path.
                    * @member cc.math.path.ContainerSegment#_segments
                    * @type {Array<cc.math.path.ContainerSegment.Segment>}
                    * @private
                    */
                    this._segments = [];
                    /**
                    * Mark this ContainerSegment as dirty.
                    * Dirty means length must be recalculated.
                    * @member cc.math.path.ContainerSegment#_dirty
                    * @type {boolean}
                    * @private
                    */
                    this._dirty = true;
                }
                /**
                * Get ContainerSegment's all segments lengths.
                * @returns {number}
                */
                ContainerSegment.prototype.getLength = function () {
                    if (this._dirty) {
                        this.__calculateLength();
                    }
                    return this._length;
                };

                ContainerSegment.prototype.__calculateLength = function () {
                    var length = 0;

                    for (var i = 0; i < this._segments.length; i++) {
                        length += this._segments[i].getLength();
                    }

                    this._dirty = false;
                    this._length = length;
                    return this._length;
                };

                /**
                * Get a Point on the ContainerSegment at a position proportional to normalizedPos.
                * If there's no Point in the path for the normalized position, the result of calling
                * <code>getStartingPoint</code> or <code>getEndingPoint</code> is returned.
                * This is consistent since a value for normalizedPos of 1 means end
                * of the path and a value of 0 the start of it.
                * @param normalizedPos {number} Normalized value between 0..1
                * @param out {cc.math.Vector=} out point. if not set, an internal spare point value will be used.
                * @returns {cc.math.Vector}
                */
                ContainerSegment.prototype.getValueAt = function (normalizedPos, out) {
                    if (this._dirty) {
                        this.__calculateLength();
                        this._dirty = false;
                    }

                    out = out || __v0;

                    // BUGBUG change for binary search
                    var pos = normalizedPos * this._length;
                    var search = 0;

                    for (var i = 0; i < this._segments.length; i++) {
                        if (pos >= search && pos < search + this._segments[i].getLength()) {
                            search = pos - search;
                            search /= this._segments[i].getLength();

                            return this._segments[i].getValueAt(search, out);
                        } else {
                            search += this._segments[i].getLength();
                        }
                    }

                    var ep = this.getEndingPoint();
                    return out.set(ep.x, ep.y);
                    //cc.Debug.error( locale.ERR_PATH_GETVALUEAT_HAS_NO_VALUE );
                };

                /**
                * Get sample points on the ContainerSegment.
                * @param numPoints {number=} number of points to sample. If not set, ContainerSegment.DEFAULT_TRACE will be used.
                * @param dstArray {Array<cc.math.Vector>=}
                * @returns {Array<cc.math.Vector>} the supplied array or a newly created one with the traced points .
                */
                ContainerSegment.prototype.trace = function (numPoints, dstArray) {
                    dstArray = dstArray || [];

                    numPoints = numPoints || cc.math.path.DEFAULT_TRACE_LENGTH;

                    for (var i = 0; i <= numPoints; i++) {
                        dstArray.push(this.getValueAt(i / numPoints, new math.Vector()));
                    }

                    return dstArray;
                };

                /**
                * @see {cc.math.path.Segment#getStartingPoint}
                * @returns {cc.math.Vector}
                */
                ContainerSegment.prototype.getStartingPoint = function () {
                    return null;
                };

                /**
                * @see {cc.math.path.Segment#getEndingPoint}
                * @returns {cc.math.Vector}
                */
                ContainerSegment.prototype.getEndingPoint = function () {
                    return null;
                };

                /**
                * Get the Segment's parent Segment.
                * @returns {cc.math.path.Segment}
                */
                ContainerSegment.prototype.getParent = function () {
                    return this._parent;
                };

                /**
                * Set the Segment's parent Segment.
                * @method cc.math.path.ContainerSegment#setParent
                * @param s {cc.math.path.Segment}
                */
                ContainerSegment.prototype.setParent = function (s) {
                    this._parent = s;
                };

                /**
                * Make a clone of the segment. It will clone all contained segments.
                * ContainerSegments are not allowed to exist by themselves except in the form of Path or SubPath, so cloning
                * one of them will throw an error.
                * @method cc.math.path.ContainerSegment#clone
                * @returns {cc.math.path.Segment}
                */
                ContainerSegment.prototype.clone = function () {
                    throw "ContainerSegments can't clone.";
                };

                /**
                * Add this Segment control points to the array.
                * If the array is not set, a new one will be created.
                * The actual Segment points are added, so modifying them means modifying the path.
                * @method cc.math.path.ContainerSegment#getControlPoints
                * @param arr {Array<cc.math.Vector>}
                * @returns {Array<cc.math.Vector>}
                */
                ContainerSegment.prototype.getControlPoints = function (arr) {
                    arr = arr || [];

                    for (var i = 0; i < this._segments.length; i++) {
                        this._segments[i].getControlPoints(arr);
                    }

                    return arr;
                };

                /**
                * Mark a Segment and all its SubSegments are dirty whatever that means.
                * @methodcc.math.path.ContainerSegment#setDirty
                */
                ContainerSegment.prototype.setDirty = function () {
                    this._dirty = true;
                    for (var i = 0; i < this._segments.length; i++) {
                        this._segments[i].setDirty();
                    }
                };
                return ContainerSegment;
            })();
            path.ContainerSegment = ContainerSegment;
        })(math.path || (math.path = {}));
        var path = math.path;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=ContainerSegment.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    (function (math) {
        /// <reference path="../Point.ts"/>
        /// <reference path="./Segment.ts"/>
        /// <reference path="./SegmentLine.ts"/>
        /// <reference path="./SegmentArc.ts"/>
        /// <reference path="./ContainerSegment.ts"/>
        /// <reference path="../../util/Debug.ts"/>
        /// <reference path="../../locale/Locale.ts"/>
        (function (path) {
            var Vector = cc.math.Vector;

            var SegmentLine = cc.math.path.SegmentLine;
            var SegmentArc = cc.math.path.SegmentArc;

            var ContainerSegment = cc.math.path.ContainerSegment;

            /**
            * @class cc.math.path.SubPath
            * @implements cc.math.path.Segment
            * @classdesc
            *
            * A Subpath is an open or closed Collection of chained Segments.
            * A Segment will share its starting Point with the previous Segment's
            * last Point (or the initial movedTo point) and the final Point with the next Segment's starting Point.
            *
            * A SubPath is considered empty when it has no segments.
            * The length of the SubPath will be the lengths of all its Segments.
            * The results from a call to <code>getValueAt</code> will be proportional to all the Segments it contains.
            * The result from a call to <code>trace</code> will be points proportional to all the Segments it contains.
            * The result from a call to <code>getStartingPoint</code> will be the starting point of the first segment.
            *
            * A SubPath can be closed. When it is in this state, no new Segments can be added to it.
            *
            */
            var SubPath = (function (_super) {
                __extends(SubPath, _super);
                /**
                * Build a new SubPath instance.
                * @method cc.math.path.SubPath#constructor
                */
                function SubPath() {
                    _super.call(this);
                    /**
                    * Path current tracing point. When adding segments to the path, this is the reference point.
                    * @member cc.math.path.SubPath#_currentPoint
                    * @type {cc.math.Vector}
                    * @private
                    */
                    this._currentPoint = null;
                    /**
                    * Is the path closed ? If so, more path tracing operations will require to build anothe SubPath.
                    * @member cc.math.path.SubPath#_closed
                    * @type {boolean}
                    * @private
                    */
                    this._closed = false;
                }
                /**
                * Whether the SubPath is closed.
                * @returns {boolean}
                */
                SubPath.prototype.isClosed = function () {
                    return this._closed;
                };

                /**
                * Test whether the SubPath is empty, that is, tracing info has not been set yet.
                * @returns {boolean}
                */
                SubPath.prototype.isEmpty = function () {
                    return this._currentPoint === null;
                };

                /**
                * Number of Segments contained in this SubPath.
                * If a Segment is actually another Path, it will count 1 segment.
                * @returns {number}
                */
                SubPath.prototype.numSegments = function () {
                    return this._segments.length;
                };

                /**
                * Add a Segment to the SubPath and set the Segment's parent as the SubPath.
                * @param s {cc.math.path.Segment}
                */
                SubPath.prototype.addSegment = function (s) {
                    s.setParent(this);
                    this._segments.push(s);
                };

                /**
                * Clear all sub-path data, and revert to the original path object status.
                * Make sure this path is not another's path segment.
                *
                * @method cc.math.path.SubPath#beginPath
                */
                SubPath.prototype.beginPath = function () {
                    this._segments = [];
                    this._length = 0;
                    this._currentPoint = null;
                    this._closed = false;

                    return this;
                };

                /**
                * Move the current path tracer to a position.
                *
                * @method cc.math.path.SubPath#moveTo
                * @param x {number}
                * @param y {number}
                */
                SubPath.prototype.moveTo = function (x, y) {
                    if (this._closed) {
                        cc.Debug.warn(cc.locale.WARN_MOVETO_IN_NON_EMPTY_SUBPATH);
                        return;
                    }

                    if (null === this._currentPoint) {
                        this._currentPoint = new Vector();
                    }

                    if (this.numSegments() === 0) {
                        this._currentPoint.x = x;
                        this._currentPoint.y = y;
                    }

                    return this;
                };

                /**
                * Add a line to the current path.
                * If the current path is not initialized, in will be initialized from 0,0 and a line added.
                *
                * @method cc.math.path.SubPath#lineTo
                * @param x {number}
                * @param y {number}
                */
                SubPath.prototype.lineTo = function (x, y) {
                    if (this._closed) {
                        cc.Debug.warn(cc.locale.WARN_TRACE_ON_CLOSED_SUBPATH, "lineTo");
                        return;
                    }

                    if (this.isEmpty()) {
                        this._currentPoint = new Vector();
                    } else {
                        this.addSegment(new SegmentLine({
                            start: {
                                x: this._currentPoint.x,
                                y: this._currentPoint.y
                            },
                            end: {
                                x: x,
                                y: y
                            }
                        }));
                    }

                    this._currentPoint.x = x;
                    this._currentPoint.y = y;

                    return this;
                };

                /**
                * Add an arc to the SubPath.
                * An arc is defined by a position, a radius, an start and an end angle and how to traverse from the start to
                * the end angle, eg clock or counter clock wisely.
                * The arc will be the minimum angle between start and end angles.
                * Though not strictly necessary, this method expects the difference between startAngle and endAngle
                * to be <= 2*Math.PI
                * @see {cc.math.path.SegmentArc}
                * @method cc.math.path.SubPath#arc
                * @param x {number}
                * @param y {number}
                * @param radius {number}
                * @param startAngle {number} radians
                * @param endAngle {number} radians
                * @param anticlockwise
                * @param addLineTo {boolean} When adding an arc to a Path, if any SubPath is present a line must be added
                *  to the current SubPath. If true add a line from the current SubPath point to the starting point on the arc.
                * @returns {cc.math.path.SubPath}
                */
                SubPath.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise, addLineTo) {
                    if (this._closed) {
                        cc.Debug.warn(cc.locale.WARN_TRACE_ON_CLOSED_SUBPATH, "ClosePath");
                        return;
                    }

                    var segment = new SegmentArc({
                        x: x,
                        y: y,
                        radius: radius,
                        startAngle: startAngle,
                        endAngle: endAngle,
                        ccw: anticlockwise
                    });

                    if (addLineTo) {
                        var sp = segment.getStartingPoint();
                        this.addSegment(new SegmentLine({
                            start: {
                                x: this._currentPoint.x,
                                y: this._currentPoint.y
                            },
                            end: {
                                x: sp.x,
                                y: sp.y
                            }
                        }));
                    }
                    this.addSegment(segment);

                    var fp = segment.getEndingPoint();
                    this._currentPoint.set(fp.x, fp.y);
                    this._dirty = true;

                    return this;
                };

                /**
                * Close the SubPath.
                * If the SubPath was already closed, in DEBUG mode will show a console message. In either case, nothing happens.
                * If the SubPath is empty
                * @returns {cc.math.path.SubPath}
                */
                SubPath.prototype.closePath = function () {
                    if (this._closed) {
                        cc.Debug.warn(cc.locale.WARN_TRACE_ON_CLOSED_SUBPATH, "ClosePath");
                        return;
                    }

                    if (this.isEmpty()) {
                        cc.Debug.warn(cc.locale.WARN_CLOSE_EMPTY_SUBPATH, "ClosePath");
                        return;
                    }

                    var p = this.getStartingPoint();

                    var segment = new SegmentLine({
                        start: { x: this._currentPoint.x, y: this._currentPoint.y },
                        end: { x: p.x, y: p.y }
                    });

                    this.addSegment(segment);

                    this._currentPoint = segment.getEndingPoint();
                    this._closed = true;
                    this._dirty = true;

                    return this;
                };

                /**
                * Get the SubPath's starting point.
                * It will return the original SubPath starting point, not a copy of it.
                * If this SubPath is empty (no points) an error is thrown if in DEBUG mode.
                * @returns {cc.math.Vector}
                */
                SubPath.prototype.getStartingPoint = function () {
                    if (!this.isEmpty()) {
                        return this._segments.length ? this._segments[0].getStartingPoint() : this._currentPoint;
                    }

                    cc.Debug.error(cc.locale.ERR_SUBPATH_NOT_STARTED, "getStartingPoint");
                };

                /**
                * Get the SubPath's ending point.
                * It will return the original SubPath ending point, not a copy of it.
                * If this SubPath is empty (no points) an error is thrown if in DEBUG mode.
                * @returns {cc.math.Vector}
                */
                SubPath.prototype.getEndingPoint = function () {
                    if (!this.isEmpty()) {
                        return this._segments.length ? this._segments[this._segments.length - 1].getEndingPoint() : this._currentPoint;
                    }

                    cc.Debug.error(cc.locale.ERR_SUBPATH_NOT_STARTED, "getEndingPoint");
                };

                SubPath.prototype.clone = function () {
                    var sp = new SubPath();

                    sp._currentPoint.set(this._currentPoint.x, this._currentPoint.y);
                    sp._closed = this._closed;

                    for (var i = 0; i < this._segments.length; i++) {
                        sp._segments.push(this._segments[i].clone());
                    }

                    sp._length = this._length;

                    return sp;
                };
                return SubPath;
            })(ContainerSegment);
            path.SubPath = SubPath;
        })(math.path || (math.path = {}));
        var path = math.path;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=Subpath.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="./path/Segment.ts"/>
    /// <reference path="./path/ContainerSegment.ts"/>
    /// <reference path="./path/SubPath.ts"/>
    /// <reference path="./Point.ts"/>
    /// <reference path="./Matrix3.ts"/>
    /// <reference path="../util/Debug.ts"/>
    (function (math) {
        var SubPath = cc.math.path.SubPath;
        var ContainerSegment = cc.math.path.ContainerSegment;
        var Vector = cc.math.Vector;
        var Matrix3 = cc.math.Matrix3;

        var __v0 = new Vector();
        var __v1 = new Vector();
        var __v2 = new Vector();
        var __v3 = new Vector();

        var __m0 = null;
        var __m1 = null;

        /**
        *
        * @class cc.math.Path
        * @implements cc.math.path.Segment
        * @classdesc
        *
        * This class represents a Path Object.
        * By definition a Path is a collection of Segment objects. These segments are SubPath objects or other Paths.
        * Polimorphically a Path is a Segment itself, so complete paths can be added to another SubPath or Path as a Segment.
        *
        * A path has tracing capabilities. It differentiates from a SubPath in a few aspects:
        *  + a Path may have a cache of the stroke it represents.
        *  + a Path may have a cache of the fill it represents.
        *  + when tracing a Path, the Segments added are transformed by a transformation matrix.
        *  + a path represents an aggregation of Subpaths (contours)
        */
        var Path = (function (_super) {
            __extends(Path, _super);
            /**
            * Build a new Path instance.
            * @method cc.math.Path#constructor
            */
            function Path() {
                _super.call(this);
                /**
                * Path current sub path to add segments to. Initially, the current sub-path is the path itself.
                * As new sub-paths are created, _currentSubPath will point to that last sub-path.
                * @member cc.math.Path#_currentSubPath
                * @type {null}
                * @private
                */
                this._currentSubPath = null;
            }
            /**
            * Get the Path's number of SubPaths.
            * @returns {number}
            */
            Path.prototype.numSubPaths = function () {
                return this._segments.length;
            };

            Path.prototype.__newSubPath = function () {
                var subpath = new SubPath();
                this._segments.push(subpath);
                subpath._parent = this;
                this._currentSubPath = subpath;
            };

            /**
            * Test whether this Path is empty, ie has no sub paths.
            * @returns {boolean}
            */
            Path.prototype.isEmpty = function () {
                return this._segments.length === 0;
            };

            /**
            *
            * Make sure the path has a valid sub-path to trace segments on.
            *
            * If the Path has no current sub-path,
            *   a new sub-path is created and its tracer initialized to 0,0.
            * else
            *   if the current sub-path is closed
            *     a new sub-path is created and its tracer initialized to the current sub-path tracer position
            *   endif
            * endif
            *
            * @param x {number=}
            * @param y {number=}
            * @private
            */
            Path.prototype.__ensureSubPath = function (x, y) {
                if (typeof x === "undefined") { x = 0; }
                if (typeof y === "undefined") { y = 0; }
                if (this.isEmpty()) {
                    this.__newSubPath();
                    this._currentSubPath.moveTo(x, y);
                }
            };

            Path.prototype.__chainSubPathIfCurrentIsClosed = function () {
                if (this._currentSubPath.isClosed()) {
                    var pt = this._currentSubPath._currentPoint;
                    this.__newSubPath();
                    this._currentSubPath.moveTo(pt.x, pt.y);
                }
            };

            /**
            * Get the Path current position for tracing.
            * This point corresponds to the tracing position of the current SubPath.
            * @returns {cc.math.Point}
            */
            Path.prototype.getCurrentTracePosition = function () {
                if (this._currentSubPath === null) {
                    cc.Debug.warn(cc.locale.WARN_TRACER_EMPTY, "getCurrentTracePosition");
                    return { x: 0, y: 0 };
                }

                return this._currentSubPath._currentPoint;
            };

            /**
            * Get the Path starting point.
            * It corresponds to the starting point of the first segment it contains, regardless of its type.
            * If there's no current SubPath, an empty Point (0,0) is returned.
            * @returns {*}
            */
            Path.prototype.getStartingPoint = function () {
                if (this._currentSubPath === null) {
                    cc.Debug.warn(cc.locale.WARN_TRACER_EMPTY, "getStartingPoint");
                    return __v0.set(0, 0);
                }

                return this._currentSubPath.getStartingPoint();
            };

            /**
            * Get the Path ending point.
            * It corresponds to the ending point of the last segment it contains, regardless of its type.
            * If there's no current SubPath, an empty Point (0,0) is returned.
            * @returns {*}
            */
            Path.prototype.getEndingPoint = function () {
                if (this._currentSubPath === null) {
                    cc.Debug.warn(cc.locale.WARN_TRACER_EMPTY, "getEndingPoint");
                    return __v0.set(0, 0);
                }

                return this._segments[this._segments.length - 1].getEndingPoint();
            };

            /**
            * Create a poli-line path from a set of Points.
            * If no points, or an empty array is passed, no Path is built and returns null.
            * @param points {Array<cc.math.Vector>}
            * @returns {cc.math.Path} Newly created path or null if the path can't be created.
            * @static
            */
            Path.createFromPoints = function (points) {
                if (!points || points.length === 0) {
                    return null;
                }

                var closedPath = points[0].equals(points[points.length - 1]);

                var path = new Path();
                path.beginPath();
                path.moveTo(points[0].x, points[0].y);

                for (var i = 1; i < (closedPath ? points.length - 1 : points.length); i++) {
                    path.lineTo(points[i].x, points[i].y);
                }

                if (closedPath) {
                    path.closePath();
                }

                return path;
            };

            /**
            * Clear all sub-path data, and revert to the original path object status.
            * Make sure this path is not another's path segment.
            *
            * @method cc.math.Path#beginPath
            */
            Path.prototype.beginPath = function () {
                this._segments = [];
                this._length = 0;
                this._currentSubPath = null;
                this._dirty = true;

                return this;
            };

            /**
            * Close the current SubPath.
            *
            * @returns {cc.math.Path}
            */
            Path.prototype.closePath = function () {
                this._currentSubPath.closePath();
                this._dirty = true;
                return this;
            };

            /**
            * Move the current path tracer to a position.
            * If the current sub-path is not started,
            *   set this point as the sub-path start point.
            * else
            *   if there are segments,
            *      create a new sub-path
            *   else
            *      set sub-path starting point to the new location
            * endif
            *
            * @method cc.math.Path#moveTo
            * @param x {number}
            * @param y {number}
            * @param matrix {cc.math.Matrix3=}
            */
            Path.prototype.moveTo = function (x, y, matrix) {
                if (matrix) {
                    __v0.set(x, y);
                    matrix.transformPoint(__v0);
                    x = __v0.x;
                    y = __v0.y;
                }

                this.__ensureSubPath(x, y);
                this._currentSubPath.moveTo(x, y);

                return this;
            };

            /**
            * Add a line to the current path.
            * If there's no current SubPath,
            * If the current path is not initialized, in will be initialized from 0,0 and a line added.
            *
            * @method cc.math.Path#lineTo
            * @param x {number}
            * @param y {number}
            * @param matrix {cc.math.Matrix3=}
            */
            Path.prototype.lineTo = function (x, y, matrix) {
                if (matrix) {
                    __v0.set(x, y);
                    matrix.transformPoint(__v0);
                    x = __v0.x;
                    y = __v0.y;
                }

                this.__ensureSubPath(x, y);
                this.__chainSubPathIfCurrentIsClosed();

                this._currentSubPath.lineTo(x, y);

                this._dirty = true;

                return this;
            };

            /**
            * Create a rect as a new SubPath. The rect has 4 segments which conform the rect.
            * It also created a new SubPath movedTo (x,y).
            * @param x {number}
            * @param y {number}
            * @param w {number}
            * @param h {number}
            * @param matrix {cc.math.Matrix3=} transformation matrix.
            * @returns {cc.math.Path}
            */
            Path.prototype.rect = function (x, y, w, h, matrix) {
                this.__ensureSubPath();

                // may reuse the current subpath ? (nosegments, and not empty)
                if (this._currentSubPath.numSegments() !== 0) {
                    this.__newSubPath();
                }

                __v0.set(x, y);
                __v1.set(x + w, y);
                __v2.set(x + w, y + h);
                __v3.set(x, y + h);

                if (matrix) {
                    matrix.transformPoint(__v0);
                    matrix.transformPoint(__v1);
                    matrix.transformPoint(__v2);
                    matrix.transformPoint(__v3);
                }

                this.moveTo(__v0.x, __v0.y);
                this.lineTo(__v1.x, __v1.y);
                this.lineTo(__v2.x, __v2.y);
                this.lineTo(__v3.x, __v3.y);
                this.closePath();

                this.__newSubPath();
                this._currentSubPath.moveTo(__v0.x, __v0.y);
                this._dirty = true;

                return this;
            };

            /**
            * Create an arc segment and add it to the current SubPath.
            * If a SubPath exists, a straight line to (x,y) is added.
            * if the angle difference is > 2PI the angle will be clampled to 2PI. The angle difference will be
            * endAngle - startAngle if anticlockwise is false, and startAngle - endAngle otherwise.
            * In this implementation if the radius is < 0, the radius will be set to 0.
            * If the radius is 0 or the diffangle is 0, no arc is added.
            *
            * @param x {number}
            * @param y {number}
            * @param radius {number}
            * @param startAngle {number}
            * @param endAngle {number}
            * @param anticlockwise {boolean} arc draw direction
            * @param matrix {cc.math.Matrix3}
            */
            Path.prototype.arc = function (x, y, radius, startAngle, endAngle, anticlockwise, matrix) {
                var addLine = false;

                // transform position
                __v0.set(x, y);
                if (matrix) {
                    matrix.transformPoint(__v0);
                }
                x = __v0.x;
                y = __v0.y;

                this.__ensureSubPath(x, y);

                if (this._currentSubPath.numSegments()) {
                    addLine = true;
                }

                var diffAngle = (endAngle - startAngle);
                if (diffAngle > 2 * Math.PI) {
                    diffAngle = 2 * Math.PI;
                } else if (diffAngle < -2 * Math.PI) {
                    diffAngle = -2 * Math.PI;
                }

                //diffAngle%=2*Math.PI;
                if ((-.0001 < diffAngle && diffAngle < .0001)) {
                    return this;
                }

                this.__chainSubPathIfCurrentIsClosed();

                // calculate radius based on transformation
                __v0.set(0, 0);
                __v1.set(radius, 0);
                if (matrix) {
                    matrix.transformPoint(__v0);
                    matrix.transformPoint(__v1);
                }
                radius = Vector.distance(__v0, __v1);

                // if radius < something visible, do nothing
                if (radius <= 0.1) {
                    this.__ensureSubPath(x, y);
                    return this;
                }

                // calculate start angle based on current matrix
                if (matrix) {
                    if (!__m0) {
                        __m0 = new Matrix3();
                    }
                    if (!__m1) {
                        __m1 = new Matrix3();
                    }

                    __m0.copy(matrix);
                    __m1.setRotate(startAngle);
                    __m0.multiply(__m1);

                    __v0.set(0, 0);
                    __v1.set(1, 0);

                    __m0.transformPoint(__v0);
                    __m0.transformPoint(__v1);

                    __v1.sub(__v0);

                    startAngle = Math.atan2(__v1.y, __v1.x);
                }

                this._currentSubPath.arc(x, y, radius, startAngle, startAngle + diffAngle, anticlockwise, addLine);
                this._dirty = true;

                return this;
            };

            Path.prototype.clone = function () {
                var path = new Path();

                for (var i = 0; i < this._segments.length; i++) {
                    path._segments.push(this._segments[i].clone());
                }

                path._currentSubPath = path._segments[path._segments.length - 1];
                path._length = this._length;

                return path;
            };
            return Path;
        })(ContainerSegment);
        math.Path = Path;
    })(cc.math || (cc.math = {}));
    var math = cc.math;
})(cc || (cc = {}));
//# sourceMappingURL=Path.js.map

/**
* License: see license.txt file
*/
/// <reference path="../math/Color.ts"/>
/// <reference path="../math/Point.ts"/>
/// <reference path="../node/Director.ts"/>
/// <reference path="../node/sprite/Animation.ts"/>
var cc;
(function (cc) {
    var Color = cc.math.Color;

    var Vector = cc.math.Vector;

    /**
    * Create a new Point/Vector object.
    * @param x {number}
    * @param y {number}
    * @returns {cc.math.Vector}
    * @deprecated call <code>new cc.math.Vector(x,y);</code>
    * @see {cc.math.Vector}
    */
    function p(x, y) {
        return new Vector(x, y);
    }
    cc.p = p;

    /**
    * create a new Color full opaque.
    * @param r {number}
    * @param g {number}
    * @param b {number}
    * @returns {cc.math.Color}
    * @deprecated call <code>new cc.math.Color(r,g,b,a?);</code>
    * @see {cc.math.Color}
    */
    function c3b(r, g, b) {
        return new cc.math.Color(r / 255, g / 255, b / 255);
    }
    cc.c3b = c3b;

    /**
    * create a new Color with RGBA
    * @param r {number}
    * @param g {number}
    * @param b {number}
    * @param a {number}
    * @returns {cc.math.Color}
    * @deprecated call <code>new cc.math.Color(r,g,b,a);</code>
    * @see {cc.math.Color}
    */
    function c4b(r, g, b, a) {
        return new cc.math.Color(r / 255, g / 255, b / 255, a / 255);
    }
    cc.c4b = c4b;

    /**
    *
    * @param r {number|string|{r:number,g:number,b:number,a:number=}}
    * @param g {number} 0..255
    * @param b {number} 0..255
    * @param a {number=} 0..255
    * @returns {*}
    */
    function color(r, g, b, a) {
        if (typeof r === 'undefined') {
            return Color.BLACK;
        }
        if (typeof r === 'string') {
            return Color.fromStringToColor(r);
        }
        if (typeof r === 'object') {
            return Color.createFromRGBA(r);
        }

        return new Color(r / 255, g / 255, b / 255, a / 255);
    }
    cc.color = color;

    /**
    * @name Director
    * @memberOf cc
    * @deprecated
    */
    (function (Director) {
        var directorInstance = null;

        /**
        * Get always the same director instance.
        * @method cc.Director.getInstance
        * @returns {cc.node.Director}
        */
        function getInstance() {
            if (directorInstance === null) {
                directorInstance = new cc.node.Director();
            }

            return directorInstance;
        }
        Director.getInstance = getInstance;
    })(cc.Director || (cc.Director = {}));
    var Director = cc.Director;

    function animation() {
        return new cc.node.sprite.Animation();
    }
    cc.animation = animation;

    (function (Animation) {
        Animation.create = cc.animation;
    })(cc.Animation || (cc.Animation = {}));
    var Animation = cc.Animation;
})(cc || (cc = {}));
//# sourceMappingURL=NodeV3.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    /// <reference path="../math/Point.ts"/>
    /// <reference path="../math/Rectangle.ts"/>
    /// <reference path="../math/Dimension.ts"/>
    /// <reference path="../math/Matrix3.ts"/>
    /// <reference path="../math/Color.ts"/>
    /// <reference path="../render/RenderingContext.ts"/>
    /// <reference path="../util/util.ts"/>
    /// <reference path="../util/Debug.ts"/>
    /// <reference path="../locale/Locale.ts"/>
    /// <reference path="./Scene.ts"/>
    (function (_node) {
        "use strict";

        var Vector = cc.math.Vector;

        var Rectangle = cc.math.Rectangle;
        var Dimension = cc.math.Dimension;
        var Matrix3 = cc.math.Matrix3;
        var Color = cc.math.Color;

        /**
        *
        * Internal transformation dirtiness flags.
        *
        * @tsenum cc.node.TransformationDirty
        */
        (function (TransformationDirty) {
            TransformationDirty[TransformationDirty["NONE"] = 0] = "NONE";
            TransformationDirty[TransformationDirty["TRANSLATE"] = 1] = "TRANSLATE";
            TransformationDirty[TransformationDirty["ROTATE"] = 7] = "ROTATE";
            TransformationDirty[TransformationDirty["SCALE"] = 3] = "SCALE";
            TransformationDirty[TransformationDirty["ALL"] = 7] = "ALL";
            TransformationDirty[TransformationDirty["PARENT"] = 0] = "PARENT";
        })(_node.TransformationDirty || (_node.TransformationDirty = {}));
        var TransformationDirty = _node.TransformationDirty;

        /**
        * Node flag values.
        * Instead of managing several boolean properties they are grouped in a number value.
        * @tsenum cc.node.NodeDirtyFlags
        */
        (function (NodeDirtyFlags) {
            NodeDirtyFlags[NodeDirtyFlags["NONE"] = 0] = "NONE";
            NodeDirtyFlags[NodeDirtyFlags["CHILDREN_SORT"] = 1] = "CHILDREN_SORT";
        })(_node.NodeDirtyFlags || (_node.NodeDirtyFlags = {}));
        var NodeDirtyFlags = _node.NodeDirtyFlags;

        

        /**
        * Index sequence variable for node's OrderOfArrival.
        * @type {number}
        * @private
        */
        var _OrderOfArrival = 0;

        /**
        * @class cc.node.Node
        * @classdesc
        *
        * Node is the base class for all Cocos2d HTML5 elements that are screen entities.
        *
        * A Node is composed by a dimension, and some properties like position, rotation and scale, and a collection of
        * children.
        * Children are divided into two groups: children that are behind the node (z-index<0) and children that are
        * in front of the node (z-index>=0).
        * These transformation properties are hierarchically applied to its children, meaning that if a node is rotated,
        * all its children will show rotated as well.
        * A node can have input routed to it, has drawing capabilities, and can have a collection of actions predefined
        * to be applied to it.
        *
        */
        var Node = (function () {
            /**
            * Create a new Node object.
            * @method cc.node.Node#constructor
            */
            function Node() {
                /**
                * Hierarchy dependent nodes.
                * @member cc.node.Node#_children
                * @type {Array<cc.node.Node>}
                * @private
                */
                this._children = [];
                /**
                * This node's parent node.
                * <br>
                * Don't set directly.
                * @member cc.node.Node#_parent
                * @type {cc.node.Node}
                * @private
                */
                this._parent = null;
                /**
                * This node's position.
                * @member cc.node.Node#_position
                * @type {cc.math.Vector}
                * @private
                */
                this._position = new Vector();
                /**
                * Node's position anchor.
                * The anchor is normalized, meaning 1 to be node's width or height.
                * @member cc.node.Node#_positionAnchor
                * @type {cc.math.Vector}
                * @private
                */
                this._positionAnchor = new Vector(0, 0);
                /**
                * Node's rotation angles for x and y.
                * @member cc.node.Node#_rotation
                * @type {cc.math.Vector}
                * @private
                */
                this._rotation = new Vector(0, 0);
                /**
                * Node's scale coeficients.
                * @member cc.node.Node#_scale
                * @type {cc.math.Vector}
                * @private
                */
                this._scale = new Vector(1, 1);
                /**
                * Node's skew values.
                * @member cc.node.Node#_skew
                * @type {cc.math.Vector}
                * @private
                */
                this._skew = new Vector(0, 0);
                /**
                * Node's transformation anchor. Scale and rotation will be around this anchor value.
                * @member cc.node.Node#_transformationAnchor
                * @type {cc.math.Vector}
                * @private
                */
                this._transformationAnchor = new Vector(.5, .5);
                /**
                * Node's local transformation matrix.
                * @member cc.node.Node#_modelViewMatrix
                * @type {cc.math.Matrix3}
                * @private
                */
                this._modelViewMatrix = new Matrix3();
                /**
                * Node's global transformation matrix.
                * @member cc.node.Node#_worldModelViewMatrix
                * @type {cc.math.Matrix3}
                * @private
                */
                this._worldModelViewMatrix = new Matrix3();
                /**
                * Node's color. This color, when drawing images, will be set as tint color.
                * Tinting will only be enabled in webgl renderers though.
                * @member cc.node.Node#_color
                * @type {cc.math.Color}
                * @private
                */
                this._color = new Color();
                /**
                * Node's transformation dirty values. Used internally for speeding up rendering.
                * When the node is moved, rotated or scaled, this value will reflect the operation.
                * @member cc.node.Node#_transformationDirty
                * @type {number}
                * @private
                */
                this._transformationDirty = 7 /* ROTATE */;
                /**
                * Internal flag for node's visibility.
                * @member cc.node.Node#_visible
                * @type {boolean}
                * @private
                */
                this._visible = true;
                /**
                * Node's dimension.
                * @member cc.node.Node#_contentSize
                * @type {cc.math.Vector}
                * @private
                */
                this._contentSize = new Dimension();
                /**
                * Node's z-index values.
                * Nodes with a less than zero z-index will be drawn first, then its parent, and then nodes with a greater or
                * equal than zero z-index value.
                * @member cc.node.Node#_localZOrder
                * @type {number}
                * @private
                */
                this._localZOrder = 0;
                /**
                * Node's order of arrival to the parent node.
                * When sorting a node's children, first, the z-index is taken into account. But nodes with the same z-index
                * will then be sorted by the order of arrival.
                * The order of arrival is by default set incrementally, but the developer has the option to modify it anytime.
                * @member cc.node.Node#_orderOfArrival
                * @type {number}
                * @private
                */
                this._orderOfArrival = 0;
                /**
                * internal flag that indicates if the node is rotated (false) or not (true).
                * @member cc.node.Node#_isAA
                * @type {boolean}
                * @private
                */
                this._isAA = false;
                /**
                * Axis aligned bounding box.
                * @member cc.node.Node#_AABB
                * @type {cc.math.Rectangle}
                * @private
                */
                this._AABB = new Rectangle();
                /**
                * Bounding Box. May overlap _AABB
                * @member cc.node.Node#_BBVertices
                * @type {Array<cc.math.Vector>}
                * @private
                */
                this._BBVertices = [new Vector(), new Vector(), new Vector(), new Vector()];
                /**
                * Node tag
                * @member cc.node.Node#_tag
                * @type {any}
                * @private
                */
                this._tag = null;
                /**
                * Node name.
                * @member cc.node.Node#_name
                * @type {string}
                * @private
                */
                this._name = "";
                /**
                * Internal integer value with some flags that affect a node.
                * Values for this flags variable are defined in cc.node.NodeDirtyFlags.
                * Never set this value manually.
                * @member cc.node.Node#_flags
                * @type {number}
                * @private
                */
                this._flags = 0;
                /**
                * Scene this node is running in.
                * @member cc.node.Node#_scene
                * @type {cc.node.Scene}
                * @private
                */
                this._scene = null;
                /**
                * When no scene is yet set, this array holds Node's actions.
                * @member cc.node.Node#_actionsToSchedule
                * @type {Array<cc.node.Action>}
                * @private
                */
                this._actionsToSchedule = [];
            }
            /**
            * Internal flag check for sorting children nodes.
            * @method cc.node.Node#__childrenMustSort
            * @returns {boolean}
            * @private
            */
            Node.prototype.__childrenMustSort = function () {
                return this._children.length > 1 && (this._flags & 1 /* CHILDREN_SORT */) !== 0;
            };

            /**
            * Clear a flag. To avoid managing several different boolean members we pack all of them in a number value.
            * Flag values are {@link cc.node.NodeDirtyFlags}
            * @method cc.node.Node#__clearFlag
            * @param f {number} a flag value.
            * @private
            */
            Node.prototype.__clearFlag = function (f) {
                this._flags &= ~f;
            };

            /**
            * Set a flag. To avoid managing several different boolean members we pack all of them in a number value.
            * Flag values are {@link cc.node.NodeDirtyFlags}
            * @method cc.node.Node#__clearFlag
            * @param f {number} a flag value.
            * @private
            */
            Node.prototype.__setFlag = function (f) {
                this._flags |= f;
            };

            /**
            * Set this node position in parent's coordinate space.
            * @method cc.node.Node#setPosition
            * @param x {number} x position.
            * @param y {number} y position.
            * @returns {cc.node.Node}
            */
            Node.prototype.setPosition = function (x, y) {
                if (x !== this._position.x || y !== this._position.y) {
                    this._position.set(x, y);
                    this._transformationDirty |= 1 /* TRANSLATE */;
                }

                return this;
            };

            /**
            * Set this node's rotation angle
            * @method cc.node.Node#setRotation
            * @param x {number} rotation angle in degrees.
            * @returns {cc.node.Node}
            */
            Node.prototype.setRotation = function (x) {
                if (x !== this._rotation.x || x !== this._rotation.y) {
                    this._rotation.set(x, x);
                    this._transformationDirty |= 7 /* ROTATE */;
                }

                return this;
            };

            /**
            * Set this node's scale.
            * If y parameter is not set, the scale will be the same for both axis.
            * @method cc.node.Node#setScale
            * @param x {number} scale for x axis
            * @param y {number=} optional scale for y axis. If not set, x scale will be set for y axis.
            * @returns {cc.node.Node}
            */
            Node.prototype.setScale = function (x, y) {
                if (typeof y === "undefined") {
                    y = x;
                }

                if (x !== this._scale.x || y !== this._scale.y) {
                    this._scale.set(x, y);
                    this._transformationDirty |= 3 /* SCALE */;
                }

                return this;
            };

            /**
            * Set the Node X axis scale value.
            * @param s {number} default scale is 1.
            * @returns {cc.node.Node}
            */
            Node.prototype.setScaleX = function (s) {
                if (s !== this._scale.x) {
                    this._scale.x = s;
                    this._transformationDirty |= 3 /* SCALE */;
                }

                return this;
            };

            /**
            * Set the Node Y axis scale value.
            * @param s {number} default scale is 1.
            * @returns {cc.node.Node}
            */
            Node.prototype.setScaleY = function (s) {
                if (s !== this._scale.y) {
                    this._scale.y = s;
                    this._transformationDirty |= 3 /* SCALE */;
                }

                return this;
            };

            /**
            * Gets node's parent. The parent is another Node. Some specialized node types like <code>Scene</code> and
            * <code>Director</code> don't have a parent.
            * @method cc.node.Node#getParent
            * @returns {Node} value will be null if no parent, and a Node instance otherwise.
            */
            Node.prototype.getParent = function () {
                return this._parent;
            };

            /**
            * Sets node's parent.
            * <br>
            * Never call directly.
            * @method cc.node.Node#__setParent
            * @param node {cc.node.Node}
            * @returns {cc.node.Node}
            * @private
            */
            Node.prototype.__setParent = function (node) {
                this._parent = node;
                return this;
            };

            /**
            * Set node's positional anchor.
            * <li>By default the node will be position anchored at 0,0.
            * <li>The position anchor is a normalized value. This means it must be set with values between 0 and 1.
            * <li>Calling this method with 0,0 will means the node will be positioned relative to top-left corner.
            * <li>Calling with 0.5, 0.5, means the node will be positioned relative to its center regardless of its size.
            * @method cc.node.Node#setPositionAnchor
            * @param x {number}
            * @param y {number}
            * @returns {cc.node.Node}
            */
            Node.prototype.setPositionAnchor = function (x, y) {
                this._positionAnchor.set(x, y);
                return this;
            };

            /**
            * Set node's positional and transformational anchors.
            * <li>By default the node will be position anchored at 0,0.
            * <li>The anchor is a normalized value. This means it must be set with values between 0 and 1.
            * <li>Calling this method with 0,0 will means the node will be positioned relative to top-left corner.
            * <li>Calling with 0.5, 0.5, means the node will be positioned relative to its center regardless of its size.
            * <li>This method is deprecated in favor of setTransformationAnchor and setPositionAnchor.
            * @method cc.node.Node#setAnchorPoint
            * @param x {number}
            * @param y {number}
            * @returns {cc.node.Node}
            * @deprecated
            */
            Node.prototype.setAnchorPoint = function (x, y) {
                this.setTransformationAnchor(x, y);
                return this.setPositionAnchor(x, y);
            };

            /**
            * Set node's transformation anchor.
            * By default the node will be transformed (scale/rotate) by the node's center.
            * @method cc.node.Node#setTransformationAnchor
            * @param x {number}
            * @param y {number}
            * @returns {cc.node.Node}
            */
            Node.prototype.setTransformationAnchor = function (x, y) {
                this._transformationAnchor.set(x, y);
                return this;
            };

            /**
            * Set this node's tag.
            * @method cc.node.Node#setTag
            * @param t {object}
            * @returns {cc.node.Node}
            */
            Node.prototype.setTag = function (t) {
                this._tag = t;
                return this;
            };

            /**
            * Set Node opacity. Opacity is alpha value.
            * @param v {number} value in the range 0..255
            * @returns {cc.node.Node}
            */
            Node.prototype.setOpacity = function (v) {
                this.setAlpha(v / 255);
                return this;
            };


            Object.defineProperty(Node.prototype, "alpha", {
                /**
                * Get node's transparency value.
                * Transparency values are from 0 to 1.
                * @name cc.node.Node#get:alpha
                * @returns {number}
                */
                get: function () {
                    return this._color._color[3];
                },
                /**
                * Setter for node's alpha (transparency) value.
                * Alpha values are from 0 to 1.
                * @name cc.node.Node#set:alpha
                * @param a {number}
                */
                set: function (a) {
                    this._color._color[3] = a;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(Node.prototype, "opacity", {
                /**
                * Get node's transparency value.
                * Transparency values are from 0 to 1.
                * @name cc.node.Node#get:opacity
                * @returns {number}
                */
                get: function () {
                    return this._color._color[3] * 255;
                },
                /**
                * Setter for node's alpha (transparency) value.
                * Alpha values are from 0 to 1.
                * @name cc.node.Node#set:opacity
                * @param a {number}
                */
                set: function (a) {
                    this._color._color[3] = a / 255;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Set node's transparency  value.
            * @method cc.node.Node#setAlpha
            * @param a {number} value from 0 to 1.
            * @returns {cc.node.Node}
            */
            Node.prototype.setAlpha = function (a) {
                this._color._color[3] = a;
                return this;
            };

            /**
            * Get node's transparency value.
            * Transparency values are from 0 to 1.
            * @method cc.node.Node#getAlpha
            * @returns {number}
            */
            Node.prototype.getAlpha = function () {
                return this._color._color[3];
            };

            /**
            * Set node's color.
            * <br>
            * Color components are values between 0 and 1.
            * 0 means no color, 1 means full color component.
            * @method cc.node.Node#setColor
            * @param r {number|cc.math.Color} value between 0 and 1 or a Color object instance.
            * @param g {number=} between 0 and 1
            * @param b {number=} between 0 and 1
            * @returns {cc.node.Node}
            */
            Node.prototype.setColor = function (r, g, b) {
                if (typeof r === "number") {
                    this._color._color[0] = r;
                    this._color._color[1] = g;
                    this._color._color[2] = b;
                } else {
                    var c = r;
                    this._color._color[0] = c.r;
                    this._color._color[1] = c.g;
                    this._color._color[2] = c.b;
                }
                this._color._dirty = true;
                return this;
            };

            Object.defineProperty(Node.prototype, "rotationAngle", {
                /**
                * Setter for node's rotationAngle.
                * @name cc.node.Node#set:rotationAngle
                * @param v {number} a number value in degrees.
                */
                set: function (v) {
                    this._rotation.x = v;
                    this._rotation.y = v;
                    this._transformationDirty |= 7 /* ROTATE */;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Set this node's content size.
            * @method cc.node.Node#setContentSize
            * @param w {number} node width
            * @param h {number} node height
            * @returns {cc.node.Node}
            */
            Node.prototype.setContentSize = function (w, h) {
                if (w !== this._contentSize.width || h !== this._contentSize.height) {
                    this._contentSize.set(w, h);
                    this._transformationDirty |= 7 /* ROTATE */;
                }
                return this;
            };

            /**
            * Set node's local and global transformation matrices.
            * The matrices may not change.
            * <br>
            * Do not call directly
            * @method cc.node.Node#__setTransform
            * @returns {cc.node.Node}
            * @private
            */
            Node.prototype.__setTransform = function () {
                this.__setLocalTransform();
                this.__setWorldTransform();

                return this;
            };

            /**
            * Set node's local transformation matrix.
            * This method is very specific and calls different code based on the transformation type that has
            * been detected.
            * @method cc.node.Node#__setLocalTransform
            * @private
            */
            Node.prototype.__setLocalTransform = function () {
                if (this._transformationDirty !== 0 /* NONE */) {
                    if (this._rotation.x !== 0 || this._transformationDirty === 7 /* ROTATE */) {
                        this._modelViewMatrix.setTransformAll(this);
                    } else if (this._scale.x !== 1 || this._scale.y !== 1 || this._transformationDirty === 3 /* SCALE */) {
                        this._modelViewMatrix.setTransformScale(this);
                    } else {
                        this._modelViewMatrix.setTransformTranslate(this);
                    }
                }
            };

            /**
            * Set node's global transformation when the node is not axis aligned.
            * @method cc.node.Node#__setWorldTransformNotAA
            * @private
            */
            Node.prototype.__setWorldTransformNotAA = function () {
                var mm;
                var mmm = this._worldModelViewMatrix._matrix;
                var pmm = this._parent._worldModelViewMatrix._matrix;

                mmm[0] = pmm[0];
                mmm[1] = pmm[1];
                mmm[2] = pmm[2];
                mmm[3] = pmm[3];
                mmm[4] = pmm[4];
                mmm[5] = pmm[5];

                if (this._isAA) {
                    mm = this._modelViewMatrix._matrix;
                    mmm[2] += (mm[2] * mmm[0]);
                    mmm[5] += (mm[5] * mmm[4]);
                } else {
                    this._worldModelViewMatrix.multiply(this._modelViewMatrix);
                }
            };

            /**
            * Set node's world transformation when the node is Axis Aligned.
            * An axis aligned Node means that the node, and all its ancestors are axis aligned.
            * @method cc.node.Node#__setWorldTransformAA
            * @private
            */
            Node.prototype.__setWorldTransformAA = function () {
                var wmm = this._worldModelViewMatrix._matrix;
                var mmm = this._modelViewMatrix._matrix;

                wmm[0] = mmm[0];
                wmm[1] = mmm[1];
                wmm[2] = mmm[2];
                wmm[3] = mmm[3];
                wmm[4] = mmm[4];
                wmm[5] = mmm[5];

                this._isAA = (this._rotation.x % 360) === 0;
            };

            /**
            * Calculate node's global transformation matrix.
            * @method cc.node.Node#__setWorldTransform
            * @private
            */
            Node.prototype.__setWorldTransform = function () {
                if (this._parent) {
                    this._isAA = this._parent._isAA && (this._rotation.x % 360) === 0 && this._scale.x === 1 && this._scale.y === 1;

                    if (this._transformationDirty !== 0 /* NONE */ || this._parent._transformationDirty !== 0 /* NONE */) {
                        this.__setWorldTransformNotAA();
                    }
                } else {
                    if (this._transformationDirty !== 0 /* NONE */) {
                        this.__setWorldTransformAA();
                    }
                }
            };

            /**
            * Visit a node.
            * The process of visiting implies several different steps and is only performed for visible nodes:
            *
            * <li>Calculate (if needed) local and global transformation matrices
            * <li>Prune the node if not showing on screen.
            * <li>Perform children sort.
            * <li>Visit children with z-index < 0
            * <li>Draw this node
            * <li>Visit children with z-index >= 0
            * <li>Reset transformation dirtiness
            *
            * @method cc.node.Node#visit
            * @param ctx {cc.render.RenderingContext}
            */
            Node.prototype.visit = function (ctx) {
                if (!this._visible) {
                    return;
                }

                this.__setTransform();

                if (!this.__AABBIntersectsScreen(ctx)) {
                    return;
                }

                if (this.__childrenMustSort()) {
                    this.__sortChildren();
                }

                var index = 0;

                for (index = 0; index < this._children.length; index++) {
                    var child = this._children[index];
                    if (child._localZOrder < 0) {
                        child.visit(ctx);
                    } else {
                        break;
                    }
                }

                this.__draw(ctx);

                for (; index < this._children.length; index++) {
                    var child = this._children[index];
                    child.visit(ctx);
                }

                this._transformationDirty = 0 /* NONE */;
            };

            /**
            * Calculate if a node is in screen bounds.
            * @param ctx {cc.render.RenderingContext}
            * @method cc.node.Node#__AABBIntersectsScreen
            * @returns {boolean} the node is in screen or not.
            * @private
            */
            Node.prototype.__AABBIntersectsScreen = function (ctx) {
                this.__calculateBoundingBox();

                return this._AABB.intersects(0, 0, ctx.canvas.width, ctx.canvas.height);
            };

            /**
            * Calculate a node's Bounding box when the node is not axis aligned.
            * @method cc.node.Node#__calculateNAABBVertices
            * @private
            */
            Node.prototype.__calculateNAABBVertices = function () {
                var vv = this._BBVertices;
                var _w = this._contentSize.width;
                var _h = this._contentSize.height;

                this.convertToWorldSpace(vv[0].set(0, 0));
                this.convertToWorldSpace(vv[1].set(_w, 0));
                this.convertToWorldSpace(vv[2].set(_w, _h));
                this.convertToWorldSpace(vv[3].set(0, _h));
            };

            /**
            * Calculate a node's bounding box when the node is axis aligned.
            * @method cc.node.Node#__calculateAABBVertices
            * @private
            */
            Node.prototype.__calculateAABBVertices = function () {
                var vv = this._BBVertices;
                var x, y, w, h;
                var mm = this._worldModelViewMatrix._matrix;

                x = mm[2];
                y = mm[5];
                w = this._contentSize.width * mm[0];
                h = this._contentSize.height * mm[4];

                vv[0].set(x, y);
                vv[1].set(x + w, y);
                vv[2].set(x + w, y + h);
                vv[3].set(x, y + h);
            };

            /**
            * Calculate a node's bounding box.
            * @method cc.node.Node#__calculateBoundingBox
            * @returns {cc.node.Node}
            * @private
            */
            Node.prototype.__calculateBoundingBox = function () {
                var vv = this._BBVertices;

                if (this._isAA) {
                    this.__calculateAABBVertices();
                } else {
                    this.__calculateNAABBVertices();
                }

                var xmin;
                var xmax;
                var ymin;
                var ymax;

                xmin = Math.min(vv[0].x, Math.min(vv[1].x, Math.min(vv[2].x, vv[3].x)));
                ymin = Math.min(vv[0].y, Math.min(vv[1].y, Math.min(vv[2].y, vv[3].y)));
                xmax = Math.max(vv[0].x, Math.max(vv[1].x, Math.max(vv[2].x, vv[3].x)));
                ymax = Math.max(vv[0].y, Math.max(vv[1].y, Math.max(vv[2].y, vv[3].y)));

                this._AABB.set(xmin, ymin, xmax - xmin, ymax - ymin);

                return this;
            };

            /**
            * Convert a coordinate to world (screen) space.
            * @method cc.node.Node#convertToWorldSpace
            * @param p {Vector}
            */
            Node.prototype.convertToWorldSpace = function (p) {
                this._worldModelViewMatrix.transformPoint(p);
            };

            /**
            * Draw a node.
            * @method cc.node.Node#__draw
            * @param ctx {cc.render.RenderingContext}
            * @private
            */
            Node.prototype.__draw = function (ctx) {
                this._worldModelViewMatrix.setRenderingContextTransform(ctx);
                this.draw(ctx);
            };

            /**
            * Add a child node to this node.
            * The Node is added immediately and the array of children nodes is flagged for sort at the next call to
            * the <code>visit</code> method.
            *
            * @method cc.node.Node#addChild
            * @param node {cc.node.Node} a Node to add as child.
            * @param localZOrder {number=} an optional zIndex for the Node. If set, this value will overwrite the Node's
            *   previous localZOrder value.
            *
            * @returns {cc.node.Node}
            *
            * @see {cc.node.Node#visit}
            */
            Node.prototype.addChild = function (node, localZOrder) {
                if (node._parent) {
                    cc.Debug.error(cc.locale.MSG_ERROR_NODE_WITH_PARENT);
                }

                node._orderOfArrival = _OrderOfArrival++;
                this._children.push(node);
                node._parent = this;

                if (typeof localZOrder !== "undefined") {
                    node._localZOrder = localZOrder;
                }

                this.__setFlag(1 /* CHILDREN_SORT */);

                // PENDING: running behavior, onEnter and onEnterTransitionDidFinish
                return this;
            };

            /**
            * Change a node's z-index.
            * <br>
            * This will schedule a children sort on next visit call.
            * A call to this method with set orderOfArrival no a new value.
            * @method cc.node.Node#reorderChild
            * @param node {cc.node.Node}
            * @param localZOrder
            */
            Node.prototype.reorderChild = function (node, localZOrder) {
                this.__setFlag(1 /* CHILDREN_SORT */);
                node._orderOfArrival = _OrderOfArrival++;
                node._localZOrder = localZOrder;
            };

            /**
            * Sort a node's children.
            * Children are sorted based on zOrder and orderOfArrival.
            * @method cc.node.Node#__sortChildren
            * @private
            */
            Node.prototype.__sortChildren = function () {
                this._children.sort(function (n0, n1) {
                    if (n0._localZOrder < n1._localZOrder) {
                        return -1;
                    }
                    if (n0._localZOrder > n1._localZOrder) {
                        return 1;
                    }

                    return n0._orderOfArrival < n1._orderOfArrival ? -1 : 1;
                });

                this.__clearFlag(1 /* CHILDREN_SORT */);
            };

            /**
            * Remove a child from a node.
            * @method cc.node.Node#removeChild
            * @param node {cc.node.Node} node to remove
            * @param cleanup {boolean=} should clean up ?
            */
            Node.prototype.removeChild = function (node, cleanup) {
                var index = this._children.indexOf(node);
                if (index >= 0) {
                    // PENDING: call onExit() if node is running
                    // PENDING: do cleanup of actions and/or scheduled callbacks
                    this._children.splice(index, 1);
                    node._parent = null;
                }

                return this;
            };

            Node.prototype.removeFromParent = function (cleanup) {
                if (!this._parent) {
                    cc.Debug.warn(cc.locale.NODE_WARN_REMOVEFROMPARENT_WITH_NO_PARENT);
                    return;
                }

                this._parent.removeChild(this, cleanup);

                return this;
            };

            Node.prototype.removeAllChildren = function () {
                for (var i = 0; i < this._children.length; i++) {
                    this._children[i]._parent = null;
                }
                this._children = [];

                // PENDING unschedule actions.
                return this;
            };

            /**
            * Get the node's children list.
            * @method cc.node.Node#getChildren
            * @returns {Array<cc.node.Node>}
            */
            Node.prototype.getChildren = function () {
                return this._children;
            };

            /**
            * Get a node's root node.
            * A node's root node normally will be a Scene type node.
            * @method cc.node.Node#getRootNode
            * @returns {cc.node.Node}
            */
            Node.prototype.getRootNode = function () {
                var node = this;
                while (node._parent) {
                    node = node._parent;
                }

                return node;
            };

            /**
            * Enumerate al children of a node that matches a pattern.
            * If a pattern starts with // the search will be recursively performed from the root node. It is only legal
            *  to define // at the beginning of the pattern.
            * If a pattern starts with / the search will be performed from the root node.
            *
            * The pattern accepts the wildcard symbol '*' meaning any value will match.
            * The pattern accepts the symbol '..' meaning it references a node's parent.
            *
            * Example patterns:
            *
            * <li><b>//*</b> . This pattern will get all descendant nodes from a node.
            * <li><b>/child0/grandchild1</b> . This pattern will get all grandchildren of a node with name grandchild1 that have
            * a parent node with name child0.
            * <li><b>/*\/grandchild0</b> . This pattern will get all grandchildren of a node which have the name grandchild0.
            *
            * @method cc.node.Node#enumerateChildren
            * @param patternName {string} a search pattern. Patterns are composed of regular expressions separated by slash / characters.
            * @param callback {EnumerateCallback} a callback function invoked for each node that matches the pattern.
            */
            Node.prototype.enumerateChildren = function (patternName, callback) {
                // no string patternName, nothing to check for.
                if (typeof patternName !== "string") {
                    return;
                }

                var node = this;
                var recursive = false;
                if (patternName.indexOf("//") === 0) {
                    recursive = true;
                    patternName = patternName.substr(2);
                    node = this.getRootNode();
                }

                if (patternName.indexOf("//") !== -1) {
                    cc.Debug.error(cc.locale.MSG_WRONG_ENUMERATE_PATTERN);
                }

                patternName = cc.util.fromPosixRegularExpression(patternName);

                while (patternName.indexOf("/") === 0) {
                    node = this.getRootNode();
                    patternName = patternName.substr(1);
                }

                var orgPatternData = [];
                var patterns = patternName.split("/");

                for (var i = 0; i < patterns.length; i++) {
                    var pattern = patterns[i];
                    if (pattern === "*") {
                        pattern = ".*";
                    }
                    orgPatternData.push(new RegExp(pattern));
                }

                node.__enumerateChildrenImpl(orgPatternData, orgPatternData, callback, recursive);
            };

            /**
            * Do the actual enumeration.
            * @method cc.node.Node#__enumerateChildrenImpl
            * @param orgPatternData {Array<RegExp>}
            * @param patternData {Array<RegExp>
            * @param callback {EnumerateCallback} callback function executed for each node that matches the pattern.
            * @param recursive {boolean} is this a recursive enumeration ?
            * @private
            */
            Node.prototype.__enumerateChildrenImpl = function (orgPatternData, patternData, callback, recursive) {
                // reached the end of a path
                if (!patternData.length) {
                    callback(this);
                    if (recursive) {
                        this.__enumerateChildrenImpl(orgPatternData, orgPatternData, callback, recursive);
                    }
                    return;
                } else if (patternData[0].toString() === "/../") {
                    if (!this._parent) {
                        cc.Debug.error(cc.locale.MSG_ENUMERATE_UNDERFLOW);
                    } else {
                        this._parent.__enumerateChildrenImpl(orgPatternData, patternData.slice(1, patternData.length), callback, recursive);
                    }
                    return;
                }

                for (var i = 0; i < this._children.length; i++) {
                    var child = this._children[i];

                    // the current pattern path is ok.
                    if (patternData[0].test(child._name)) {
                        child.__enumerateChildrenImpl(orgPatternData, patternData.slice(1, patternData.length), callback, recursive);
                    } else {
                        // current path is not ok, but if recursive, apply whole pattern path from this node.
                        if (recursive) {
                            child.__enumerateChildrenImpl(orgPatternData, orgPatternData, callback, recursive);
                        }
                    }
                }
            };

            /**
            * Draw a node.
            * Override this method to draw.
            * Draw like a boss w/o worrying of current affine transformation matrix.
            * @method cc.node.Node#draw
            * @param ctx {cc.render.RenderingContext} a rendering context, either canvas or webgl.
            */
            Node.prototype.draw = function (ctx) {
                ctx.tintColor = cc.math.Color.WHITE;
                ctx.fillStyle = this._color.getFillStyle();
                ctx.fillRect(0, 0, this._contentSize.width, this._contentSize.height);
            };

            /**
            * Set this node's name. Suitable for identifying and enumerateChildren.
            * @method cc.node.Node#setName
            * @param name {string} must be composed of [A-Za-z0-9_]+ characters.
            * @returns {cc.node.Node}
            */
            Node.prototype.setName = function (name) {
                if (!/[A-Za-z0-9_]+/.test(name)) {
                    cc.Debug.error(cc.locale.ERR_NODE_NAME_INVALID);
                }

                this._name = name;
                return this;
            };

            /**
            * Schedule an action to run.
            * By the time an action is meant to be scheduled for running in a Node, there may not yet be a
            * <code>Director</code> or <code>Scene</code>. This method saves locally the actions which will be
            * scheduled in a scene's <code>ActionManager</code> later.
            * @method cc.node.Node#runAction
            * @param action {cc.action.Action}
            * @returns {cc.node.Node}
            */
            Node.prototype.runAction = function (action) {
                if (this._scene) {
                    this._scene.scheduleActionForNode(this, action);
                } else {
                    this._actionsToSchedule.push(action);
                }

                return this;
            };

            /**
            * Set Node's Scene and allow for buffered Actions to be scheduled.
            * This method is called when <code>scene.onEnter</code> is called.
            * @method cc.node.Node#setScene
            * @param scene {cc.node.Scene}
            */
            Node.prototype.setScene = function (scene) {
                this._scene = scene;

                for (var i = 0; i < this._actionsToSchedule.length; i++) {
                    scene.scheduleActionForNode(this, this._actionsToSchedule[i]);
                }
                this._actionsToSchedule = [];
            };

            /**
            * Set the node's visibility.
            * @method cc.node.Node#setVisible
            * @param v {boolean}
            */
            Node.prototype.setVisible = function (v) {
                if (v !== this._visible) {
                    this._visible = v;
                    this._transformationDirty = 7 /* ALL */;
                }
            };

            /**
            * Set a bunch of properties for the node.
            * If a property does exists in Node, a warning is emitted and nothing will happen.
            * Only for backwards compatibility.
            * @deprecated
            * @method cc.node.Node#attr
            * @param properties {any} Collection of key/value pairs.
            * @returns {cc.node.Node}
            */
            Node.prototype.attr = function (properties) {
                for (var property in properties) {
                    if (properties.hasOwnProperty(property)) {
                        var value = properties[property];

                        this[property] = value;
                    }
                }

                return this;
            };

            Object.defineProperty(Node.prototype, "x", {
                set: function (v) {
                    this._position.x = v;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Node.prototype, "y", {
                set: function (v) {
                    this._position.y = v;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Node.prototype, "scaleX", {
                set: function (v) {
                    this._scale.x = v;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Node.prototype, "scaleY", {
                set: function (v) {
                    this._scale.y = v;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Node.prototype, "width", {
                set: function (v) {
                    this._contentSize.width = v;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Node.prototype, "height", {
                set: function (v) {
                    this._contentSize.height = v;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Node.prototype, "rotation", {
                set: function (v) {
                    this._rotation.x = v;
                    this._rotation.y = v;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Node.prototype, "color", {
                set: function (v) {
                    this.setColor(v);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Node.prototype, "visible", {
                set: function (v) {
                    this.setVisible(v);
                },
                enumerable: true,
                configurable: true
            });
            return Node;
        })();
        _node.Node = Node;
    })(cc.node || (cc.node = {}));
    var node = cc.node;
})(cc || (cc = {}));
//# sourceMappingURL=Node.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    /// <reference path="../node/Node.ts"/>
    /// <reference path="./TimeInterpolator.ts"/>
    /// <reference path="./ActionManager.ts"/>
    (function (_action) {
        "use strict";

        /**
        * Action internal states.
        * <br>
        * Status diagram is:
        *
        * <pre>
        *
        * CREATED ---> RUNNING ---> PAUSED <---> RESUMED
        *    ^          |  ^                           |
        *    |          |  |                           |
        *    |          |  +---------------------------+
        *    |          v
        *    +------> ENDED
        *
        * </pre>
        *
        * @tsenum cc.action.ActionStates
        */
        (function (ActionStates) {
            ActionStates[ActionStates["PAUSED"] = 1] = "PAUSED";
            ActionStates[ActionStates["RUNNING"] = 2] = "RUNNING";
            ActionStates[ActionStates["CREATED"] = 3] = "CREATED";
            ActionStates[ActionStates["ENDED"] = 4] = "ENDED";
            ActionStates[ActionStates["RESUMED"] = 5] = "RESUMED";
        })(_action.ActionStates || (_action.ActionStates = {}));
        var ActionStates = _action.ActionStates;

        

        /**
        *
        *  @class cc.action.Action
        *  @classdesc
        *
        * Actions are scheduled objects that modify a node's internal state.
        * For example, schedule a rotation from 0 to 360 degrees, scale from to twice a node's size, or a combination of
        * both.
        * <br>
        * cc.action.Action is an abstract class, and won't affect any target. This Class type must be subclassed.
        * <br>
        *
        * Actions are defined by the following elements:
        *
        *  <li>duration. How long the action will take to end.
        *  <li>delay before application. How long the action will take to start applying.
        *  <li>delay after application. How long the action will take to end after it ended modifying node's properties.
        *  <li>lifecycle. An action has callback functions for: start, pause, resume, end and repeat.
        *  <li>speed. An action has speed modifiers. if an action has speed 2, will take twice the time to execute.
        *  <li>interpolators. An action can have modifiers for time application, like easing functions or curve segments.
        *  <li>relativity. An action can be applied relative to a value, instead of absolutely. For example, rotate by an
        *     angle instead of rotate to.
        *  <li>From. Start values for action application.
        *  <li>To. End values for action application.
        *  <li>Reversability: an action can be set to be played backwards. This is accomplished not by modifying the action
        *      but by modifiying the Interpolator that transforms time into property values.
        *
        * Predefined actions exist for the following node's properties:
        *
        *  <li>AlphaAction. Modifies a node's transparency values.
        *  <li>MoveAction. Modifies a node's position by traversing a straight line.
        *  <li>PathAction. Modifies a node's position by traversing a complex path.
        *  <li>RotateAction. Modifies a node's rotation angle.
        *  <li>ScaleAction. Modifies a node's scale.
        *  <li>TintAction. Modifies a node's color. This action will only have a visible result when the node is rendered
        *      using WebGL.
        *  <li>SequenceAction. Allows for action sequencing and parallelization.
        *  <li>PropertyAction. Allows for modification of a node's arbitrary property.
        *
        * There are other type of actions that affect or create a mix of different node properties modification lile:
        *
        *  <li>BlinkAction
        *  <li>JumpAction
        *
        *  The current V4 action subsystem is a complete rebuild from the ground up. Although backwards compatible with
        *  Cocos2d HTML5's V2 and V3 action system, this new implementation offers the following features:
        *
        *  <li>Consistent Action naming: easeExponentialIn vs easeQuinticActionIn .
        *  <li>Simplification of cc namespace. From 150+ action objects to a few.
        *  <li>Reduced code complexity.
        *  <li>Offer a new more js-ish code convention via chaining of method calls.
        *  <li>Change concept of easing action. Easing is a property of an Action's time.
        *  <li>Reduce overly class-extension hierarchy from version 2 and 3
        *  <li>Full action lifecycle: START, END, PAUSE, RESUME, REPEAT.
        *
        *
        *
        */
        var Action = (function () {
            /**
            * Build an Action instance.
            * This type of objects must augmented.
            * @constructor
            * @method cc.action.Action#constructor
            */
            function Action() {
                /**
                * Delay to start applying the Action.
                * @member cc.action.Action#_startTime
                * @type {number}
                * @private
                */
                this._startTime = 0;
                /**
                * Action duration (in seconds). For how long the Action takes to get to the final application result.
                * @member cc.action.Action#_duration
                * @type {number}
                * @private
                */
                this._duration = 0;
                /**
                * Currently elapsed time.
                * @member cc.action.Action#_currentTime
                * @type {number}
                * @private
                */
                this._currentTime = 0;
                /**
                * Number of repeat times. 1 by default.
                * @member cc.action.Action#_repeatTimes
                * @type {number}
                * @private
                */
                this._repeatTimes = 1;
                /**
                * Current number or Action application repetition.
                * @member cc.action.Action#_repeatTimesCount
                * @type {number}
                * @private
                */
                this._repeatTimesCount = 0;
                /**
                * Current repetition count.
                * @member cc.action.Action#_currentRepeatCount
                * @type {number}
                * @private
                */
                this._currentRepeatCount = 0;
                /**
                * Action speed. Actual Action duration is: ( (_duration + _delayAfterApplication) * _times) / _speed
                * @type {number}
                * @private
                */
                this._speed = 1;
                /**
                * An action identifier. Defaults to @see(Action.DEFAULT_TAG).
                * @member cc.action.Action#_tag
                * @type {number}
                * @private
                */
                this._tag = Action.DEFAULT_TAG;
                /**
                * Action status.
                *
                * Status diagram:
                *
                * <pre>
                *
                * CREATED ---> RUNNING ---> PAUSED <---> RESUMED
                *    ^          |  ^                           |
                *    |          |  |                           |
                *    |          |  +---------------------------+
                *    |          v
                *    +------> ENDED
                *
                * </pre>
                *
                * @member cc.action.Action#_status
                * @type {cc.action.ActionStates}
                * @private
                */
                this._status = 3 /* CREATED */;
                /**
                * On start application callback. Called when the Action is first executed.
                * @member cc.action.Action#_onStart
                * @type {cc.action.ActionCallbackStartOrEndOrPauseOrResumeCallback}
                * @private
                */
                this._onStart = null;
                /**
                * On end application callback. Fired each time the Action ends applying.
                * This callback may not be called if _repeatTimes is set too high or is playing forever.
                * @member cc.action.Action#_onEnd
                * @type {cc.action.ActionCallbackStartOrEndOrPauseOrResumeCallback}
                * @private
                */
                this._onEnd = null;
                /**
                * On repeat application callback. Fired each time the action is repeated.
                * @member cc.action.Action#_onRepeat
                * @type {cc.action.ActionCallbackRepeatCallback}
                * @private
                */
                this._onRepeat = null;
                /**
                * On application callback. Fired each time the action is applied. this callback can be called many times
                * during the action life cycle.
                * @member cc.action.Action#_onApply
                * @type {cc.action.ActionCallbackApplicationCallback}
                * @private
                */
                this._onApply = null;
                /**
                * On pause callback. Fired each time the action is paused. this callback can be called many times
                * during the action life cycle.
                * @member cc.action.Action#_onPause
                * @type {cc.action.ActionCallbackStartOrEndOrPauseOrResumeCallback}
                * @private
                */
                this._onPause = null;
                /**
                * On resume callback. Fired each time the action is resumed. this callback can be called many times
                * during the action life cycle.
                * @member cc.action.Action#_onResume
                * @type { cc.action.ActionCallbackStartOrEndOrPauseOrResumeCallback }
                * @private
                */
                this._onResume = null;
                /**
                * Interpolation/Ease function application
                * @member cc.action.Action#_interpolator
                * @type {cc.action.TimeInterpolator}
                * @private
                */
                this._interpolator = null;
                /**
                * if the from values for an Action have not been set, a call to __setInitialValues with
                * the target as parameter to have them set.
                * @member cc.action.Action#_fromValuesSet
                * @type {boolean}
                * @private
                */
                this._fromValuesSet = false;
                /**
                * Flag for executing onStart callback. Do not use or modify.
                * @member cc.action.Action#_firstExecution
                * @type {boolean}
                * @private
                */
                this._firstExecution = true;
                /**
                * This delay will be applied after each application.
                * @member cc.action.Action#_delayAfterApplication
                * @type {number}
                * @private
                */
                this._delayAfterApplication = 0;
                /**
                * This delay will be applied before each application.
                * @member cc.action.Action#_delayBeforeApplication
                * @type {number}
                * @private
                */
                this._delayBeforeApplication = 0;
                /**
                * Action owner ie the ActionManager this Action executes in.
                * @member cc.action.Action#_owner
                * @type {cc.action.ActionManager}
                * @private
                */
                this._owner = null;
                /**
                * Reference for a chained action. Do not use or modify.
                * @member cc.action.Action#_chainAction
                * @type {cc.action.Action}
                * @private
                */
                this._chainAction = null;
                /**
                * If true, the actions must be ActionBy variations.
                * @member cc.action.Action#_relativeAction
                * @type {boolean}
                * @private
                */
                this._relativeAction = false;
                /**
                * Is the action reversed ?
                * A reversed action will be applied from end to begin.
                * @member cc.action.Action#_reversedTime
                * @type {boolean}
                * @private
                */
                this._reversedTime = false;
                /**
                * If this Action belongs to a SequenceAction this variable will be its parent sequence.
                * @member cc.action.Action#_parentSequence
                * @type {cc.action.SequenceAction}
                * @private
                */
                this._parentSequence = null;
                this._reversed = false;
            }
            /**
            * Set an arbitrary tag for an Action.
            * @method cc.action.Action#setTag
            * @param tag {string} a string composed only of [A-Za-z0-9_-]
            * @returns {cc.action.Action}
            */
            Action.prototype.setTag = function (tag) {
                this._tag = tag;
                return this;
            };

            /**
            * Update an Action's target node.
            * This function must be overriden by Action subclass Objects.
            * @method cc.action.Action#update
            * @param normalizedTime {number} value between 0 and 1.
            * @param target {cc.node.Node} node instance the action will be applied for.
            *
            * @returns {Object} a value descriptive for the action type. For example, ScaleAction will return an object with
            * the scale applied, and MoveAction a <code>cc.math.Vector</code> with node's set position.
            */
            Action.prototype.update = function (normalizedTime, target) {
            };

            /**
            * Set an Action's owner.
            * Don't call this method directly.
            * @method cc.action.Action#__setOwner
            * @param owner {cc.action.ActionManager}
            * @returns {cc.action.Action}
            * @private
            */
            Action.prototype.__setOwner = function (owner) {
                this._owner = owner;
                return this;
            };

            /**
            * Return an Action's owner.
            * @method cc.action.Action#__getOwner
            * @returns {cc.action.ActionManager}
            */
            Action.prototype.getOwner = function () {
                return this._owner;
            };

            /**
            * Set an Action's duration. Duration is in milliseconds.
            * @method cc.action.Action#setDuration
            * @param duration {number}
            */
            Action.prototype.setDuration = function (duration) {
                this._duration = duration;
                this.setDelay(this._delayBeforeApplication);
                return this;
            };

            /**
            * Set an action's pre application delay.
            * An action will take this milliseconds to start applying values in a node.
            * @method cc.action.Action#setDelay
            * @param d {number} milliseconds.
            * @returns {cc.action.Action}
            */
            Action.prototype.setDelay = function (d) {
                this._delayBeforeApplication = d;
                this.__updateDuration();
                return this;
            };

            /**
            * Restart an action's application.
            * Status gets back to CREATED.
            * First execution set to true.
            * Application times count set to 0.
            * @method cc.action.Action#restart
            * @returns {cc.action.Action}
            */
            Action.prototype.restart = function () {
                this._firstExecution = true;
                this._repeatTimesCount = 0;
                this._status = 3 /* CREATED */;
                return this;
            };

            /**
            * Get an action's current State.
            * @method cc.action.Action#getStatus
            * @returns {cc.action.ActionStates}
            */
            Action.prototype.getStatus = function () {
                return this._status;
            };

            /**
            * Get an action's application speed.
            * Speed values modify an action duration.
            * A speed value of 2 will make the action to take twice the time to execute.
            * @method cc.action.Action#getSpeed
            * @returns {number}
            */
            Action.prototype.getSpeed = function () {
                return this._speed;
            };

            /**
            * Set an action's application speed.
            * @method cc.action.Action#setSpeed
            * @param speed {number}
            * @returns {cc.action.Action}
            */
            Action.prototype.setSpeed = function (speed) {
                this._speed = speed;
                return this;
            };

            /**
            * Make this action repeat a finite number of timer.
            * 0 repeatTimes means repeat forerver.
            * @method cc.action.Action#setRepeatTimes
            * @param repeatTimes {number}
            * @param obj {RepeatTimesOptions}
            * @return Action
            */
            Action.prototype.setRepeatTimes = function (repeatTimes, obj) {
                this._repeatTimes = repeatTimes;
                this._delayAfterApplication = (obj && obj.withDelay) || 0;
                return this;
            };

            /**
            * Set this action to apply forever.
            * @method cc.action.Action#setRepeatForever
            * @param obj {RepeatTimesOptions}
            * @returns {cc.action.Action}
            */
            Action.prototype.setRepeatForever = function (obj) {
                return this.setRepeatTimes(Number.MAX_VALUE, obj);
            };

            /**
            * Register a callback notification function fired whenever the Action starts applying.
            * @method cc.action.Action#onStart
            * @param callback { cc.action.ActionCallbackStartOrEndOrPauseOrResumeCallback }
            * @returns {cc.action.Action}
            */
            Action.prototype.onStart = function (callback) {
                this._onStart = callback;
                return this;
            };

            /**
            * Register a callback notification function fired whenever the action expires applying.
            * If repeats forever, will never be called.
            * @method cc.action.Action#onEnd
            * @param callback { cc.action.ActionCallbackStartOrEndOrPauseOrResumeCallback }
            * @return Action
            */
            Action.prototype.onEnd = function (callback) {
                this._onEnd = callback;
                return this;
            };

            /**
            * Register a callback notification function fired whenever the action repeats.
            * BUGBUG if setRepeatForever is not fired.
            * @method cc.action.Action#onRepeat
            * @param callback { cc.action.ActionCallbackRepeatCallback }
            * @return Action
            */
            Action.prototype.onRepeat = function (callback) {
                this._onRepeat = callback;
                return this;
            };

            /**
            * Register a callback notification function fired whenever the action applies.
            * The action applies once per frame, and allows for getting values that have been set on the node.
            * @method cc.action.Action#onApply
            * @param callback { cc.action.ActionCallbackApplicationCallback }
            * @return Action
            */
            Action.prototype.onApply = function (callback) {
                this._onApply = callback;
                return this;
            };

            /**
            * Register a callback notification function fired whenever the action is paused.
            * @method cc.action.Action#onPause
            * @param callback { cc.action.ActionCallbackStartOrEndOrPauseOrResumeCallback }
            * @return Action
            */
            Action.prototype.onPause = function (callback) {
                this._onPause = callback;
                return this;
            };

            /**
            * Register a callback notification function fired whenever the action is resumed, that it, exits the
            * paused state.
            * @method cc.action.Action#onResume
            * @param callback { cc.action.ActionCallbackStartOrEndOrPauseOrResumeCallback }
            * @return Action
            */
            Action.prototype.onResume = function (callback) {
                this._onResume = callback;
                return this;
            };

            /**
            * Pause this action.
            * @method cc.action.Action#pause
            * @param target {Node=}
            * @returns Action
            */
            Action.prototype.pause = function (target) {
                this._status = 1 /* PAUSED */;
                if (this._onPause) {
                    this._onPause(this, target);
                }
                return this;
            };

            /**
            * Resume this action.
            * @method cc.action.Action#resume
            * @returns Action
            */
            Action.prototype.resume = function () {
                if (this._status === 1 /* PAUSED */) {
                    this._status = 5 /* RESUMED */;
                }
                return this;
            };

            /**
            * Get time to wait after action application to repeat.
            * This time will be spent even if repeat count is 1.
            * @method cc.action.Action#getDelayAfterApplication
            * @returns {number}
            */
            Action.prototype.getDelayAfterApplication = function () {
                return this._delayAfterApplication;
            };

            /**
            * Set time to wait after action application to repeat.
            * This time will be spent even if repeat count is 1.
            * @method cc.action.Action#setDelayAfterApplication
            * @param d {number} milliseconds to wait after application.
            * @returns {cc.action.Action}
            */
            Action.prototype.setDelayAfterApplication = function (d) {
                this._delayAfterApplication = d;
                return this;
            };

            /**
            * Get this action's delay time to start applying.
            * @method cc.action.Action#getDelay
            * @returns {number}
            */
            Action.prototype.getDelay = function () {
                return this._startTime;
            };

            /**
            * Changes default interpolator to another instance of @link{cc.action.TimeInterpolator}.
            * @method cc.action.Action#setInterpolator
            * @param interpolator {cc.action.TimeInterpolator}
            * @returns Action
            */
            Action.prototype.setInterpolator = function (interpolator) {
                this._interpolator = interpolator;
                return this;
            };

            /**
            * Update this Action's duration.
            * This must be done when a sub Action is updated or when delay times or duration itself have changed.
            * @method cc.action.Action#__updateDuration
            * @private
            */
            Action.prototype.__updateDuration = function () {
                this._startTime = this._delayBeforeApplication + (this._chainAction ? this._chainAction._startTime + this._chainAction.getDuration() : 0);
                if (this._parentSequence) {
                    this._parentSequence.__updateDuration();
                }
            };

            /**
            * Convert time into a normalized value in the range of the application duration.
            * The values will converted, so that 0 will be just after starting each repetition,
            * and 1 will be just the end of the Action, or the end of each repetition.
            * @method cc.action.Action#__normalizeTime
            * @param time {number}
            * @private
            */
            Action.prototype.__normalizeTime = function (time) {
                // still, initial delay time has not elapsed.
                if (time < this._startTime) {
                    time = 0;
                } else {
                    time = time - this._startTime;

                    if (time >= this.getDuration()) {
                        time = 1;
                    } else {
                        time %= this.getOneRepetitionDuration();

                        // time is in duration range
                        if (time < this._duration) {
                            time /= this._duration;
                        } else {
                            // time is in _delayAfterApplicationRange
                            time = 1;
                        }
                    }
                }

                if (this._reversedTime) {
                    time = 1 - time;
                }

                if (!this._interpolator) {
                    return time;
                }
                return this._interpolator(time);
            };

            /**
            * Get whole action duration. Takes into account action speed, duration, delayAfterApplication and repetition times.
            * @method cc.action.Action#getDuration
            * @returns {number}
            */
            Action.prototype.getDuration = function () {
                return this.getOneRepetitionDuration() * this._repeatTimes;
            };

            /**
            * Calculate one repetition duration.
            * @method cc.action.Action#getOneRepetitionDuration
            * @returns {number}
            */
            Action.prototype.getOneRepetitionDuration = function () {
                return (this._duration + this._delayAfterApplication) * this._speed;
            };

            /**
            * Chekcs whether the action is applicable.
            * In case it gets out of scene time, and has not been tagged as expired, the action is expired and observers
            * are notified about that fact.
            * @method cc.action.Action#__isActionApplicable
            * @param time {number} the scene time to check the action against.
            * @return {boolean} whether the action is applicable.
            */
            Action.prototype.__isActionApplicable = function (time) {
                // not correct status
                if (this._status === 1 /* PAUSED */ || this._status === 4 /* ENDED */) {
                    return false;
                }

                // still not in time
                return time >= this._startTime && time < this._startTime + this.getDuration();
            };

            /**
            * This method must no be called directly.
            * The director loop will call this method in order to apply node actions.
            * @method cc.action.Action#step
            * @param delta {number} elapsed time since last application.
            * @param node {cc.node.Node}  node the action is being applied to.
            */
            Action.prototype.step = function (delta, node) {
                this._currentTime += delta;
                this.__stepImpl(delta, this._currentTime, node);
            };

            /**
            * Actual step implementation.
            * @method cc.action.Action#__stepImpl
            * @param delta {number} elapsed time since last application.
            * @param time {number} Action accumulated time.
            * @param node {cc.node.Node} target to apply action to.
            * @private
            */
            Action.prototype.__stepImpl = function (delta, time, node) {
                // if an action is not ended, it has the chance of updating value
                if (this._status !== 4 /* ENDED */) {
                    // actions can be paused w/o even been started.
                    if (this._status === 5 /* RESUMED */) {
                        if (this._onResume) {
                            this._onResume(this, node);
                        }
                    }

                    // if the action is not ended, but can be executed due to time
                    if (this.__isActionApplicable(time)) {
                        this.__actionApply(time, node);
                    } else {
                        // if the action is expired, ie, current time is beyong the start and duration
                        if (time >= this._startTime + this.getDuration()) {
                            // apply for final state anyway
                            this.__actionApply(time, node);

                            // set the action as ENDED
                            this.stop(node);
                        }
                    }
                }
            };

            /**
            * When an action is in time, and able to be applied to a target, this method does all the necessary steps.
            * Do not call directly.
            * @method cc.action.Action#__actionApply
            * @param time {number} current action's application time.
            * @param node {cc.node.Node} target node.
            * @private
            */
            Action.prototype.__actionApply = function (time, node) {
                // manage first execution. it gives the chance to the Action of initializing with the target node
                if (this._firstExecution) {
                    // callback for onStart. only once. from now on, the action is not first_execution
                    if (this._onStart) {
                        this._onStart(this, node);
                    }

                    this._firstExecution = false;

                    // initialize with the target before updating its values.
                    this.initWithTarget(node);
                }

                // current status RUNNING
                this._status = 2 /* RUNNING */;

                // normalize the time, transform current time to a value in the range 0..1 proportinally to the
                // action length, start time, etc. it also applies the easing (if any).
                var ntime = this.__normalizeTime(time);

                // update target
                var v = this.update(ntime, node);

                // application callback. called each time the node has changed properties.
                if (this._onApply) {
                    this._onApply(this, node, v);
                }

                // if this is a repeating action
                if (this._repeatTimes !== 1) {
                    // calculate current repetition value
                    var repeatIndex = ((time - this._startTime) / this.getOneRepetitionDuration()) >> 0;

                    // if changed
                    if (repeatIndex !== this._currentRepeatCount) {
                        if (repeatIndex > this._repeatTimes) {
                            repeatIndex = this._repeatTimes;
                        }
                        this._currentRepeatCount = repeatIndex;

                        // callback about repetition
                        if (this._onRepeat) {
                            this._onRepeat(this, node, repeatIndex);
                        }
                    }
                }
            };

            /**
            * Pass in the target node this action will act on.
            * This method must be overriden by each action type.
            * @method cc.action.Action#initWithTarget
            * @param node {cc.node.Node}
            */
            Action.prototype.initWithTarget = function (node) {
            };

            /**
            * Solve Action first application values.
            * Must be overriden.
            * @method cc.action.Action#solveInitialValues
            * @param node {cc.node.Node}
            */
            Action.prototype.solveInitialValues = function (node) {
            };

            /**
            * End this action immediately. Will call onEnd callback if set.
            * @method cc.action.Action#stop
            * @param node {cc.node.Node=}
            */
            Action.prototype.stop = function (node) {
                this._status = 4 /* ENDED */;
                if (this._onEnd) {
                    this._onEnd(this, node);
                }
            };

            /**
            * Is this action finished ?
            * @method cc.action.Action#isFinished
            * @returns {boolean}
            */
            Action.prototype.isFinished = function () {
                return this._status === 4 /* ENDED */;
            };

            /**
            * Is this action paused ?
            * @method cc.action.Action#isPaused
            * @returns {boolean}
            */
            Action.prototype.isPaused = function () {
                return this._status === 1 /* PAUSED */;
            };

            /**
            * Set origin values for the action.
            * This method MUST be overriden and called from the override function.
            * @method cc.action.Action#from
            * @param obj {Object} any object necessary for the action initialization.
            * @returns {cc.action.Action}
            */
            Action.prototype.from = function (obj) {
                this._fromValuesSet = true;
                return this;
            };

            /**
            * Set destination values for the action.
            * @method cc.action.Action#to
            * @param obj {Object} any object necessary for the action initialization.
            * @returns {cc.action.Action}
            */
            Action.prototype.to = function (obj) {
                return this;
            };

            /**
            * Shortcut method for setting an action's duration, delay and easing function.
            * @method cc.action.Action#timeInfo
            * @param delay {number} milliseconds to wait for action start.
            * @param duration {number} milliseconds of this action application.
            * @param interpolator {cc.action.TimeInterpolator} a time interpolator interface object.
            * @returns {cc.action.Action}
            */
            Action.prototype.timeInfo = function (delay, duration, interpolator) {
                this.setDelay(delay);
                this._duration = duration;
                if (typeof interpolator !== "undefined") {
                    this._interpolator = interpolator;
                }
                return this;
            };

            /**
            * This method is called by ActionManager when chaining actions by calling <code>startChainingActionsForNode</code>.
            * Add a Move action to the Node.
            * @method cc.action.Action#actionMove
            * @returns {cc.action.Action}
            */
            Action.prototype.actionMove = function () {
                if (this._parentSequence) {
                    return this._parentSequence.actionMove();
                }
                return this._owner.actionMove();
            };

            /**
            * This method is called by ActionManager when chaining actions by calling <code>startChainingActionsForNode</code>.
            * Add a Rotate action to the Node.
            * @method cc.action.Action#actionRotate
            * @returns {cc.action.Action}
            */
            Action.prototype.actionRotate = function () {
                if (this._parentSequence) {
                    return this._parentSequence.actionRotate();
                }
                return this._owner.actionRotate();
            };

            /**
            * This method is called by ActionManager when chaining actions by calling <code>startChainingActionsForNode</code>.
            * Add a Scale action to the Node.
            * @method cc.action.Action#actionScale
            * @returns {cc.action.Action}
            */
            Action.prototype.actionScale = function () {
                if (this._parentSequence) {
                    return this._parentSequence.actionScale();
                }
                return this._owner.actionScale();
            };

            /**
            * This method is called by ActionManager when chaining actions by calling <code>startChainingActionsForNode</code>.
            * Add a Alpha (transparency) action to the Node.
            * @method cc.action.Action#actionAlpha
            * @returns {cc.action.Action}
            */
            Action.prototype.actionAlpha = function () {
                if (this._parentSequence) {
                    return this._parentSequence.actionAlpha();
                }
                return this._owner.actionAlpha();
            };

            /**
            * This method is called by ActionManager when chaining actions by calling <code>startChainingActionsForNode</code>.
            * Add a Tint action to the Node.
            * @method cc.action.Action#actionTint
            * @returns {cc.action.Action}
            */
            Action.prototype.actionTint = function () {
                if (this._parentSequence) {
                    return this._parentSequence.actionTint();
                }
                return this._owner.actionTint();
            };

            /**
            * This method is called by ActionManager when chaining actions by calling <code>startChainingActionsForNode</code>.
            * Add a Property action to the Node.
            * @method cc.action.Action#actionProperty
            * @returns {cc.action.Action}
            */
            Action.prototype.actionProperty = function () {
                if (this._parentSequence) {
                    return this._parentSequence.actionProperty();
                }
                return this._owner.actionProperty();
            };

            /**
            * This method is called by ActionManager when chaining actions by calling <code>startChainingActionsForNode</code>.
            * Add a Sequence action to the Node.
            * @method cc.action.Action#actionSequence
            * @returns {cc.action.SequenceAction}
            */
            Action.prototype.actionSequence = function () {
                if (this._parentSequence) {
                    return this._parentSequence.actionSequence();
                }
                return this._owner.actionSequence();
            };

            /**
            * End a sequence action.
            * Underflow on calling this function (ie, calling endSequence when there's no more Sequence actions) has no
            * effect.
            * @method cc.action.Action#endSequence
            * @returns {cc.action.Action}
            */
            Action.prototype.endSequence = function () {
                if (!this._parentSequence) {
                    return this;
                }

                return this._parentSequence.endSequence();
            };

            /**
            * This method is called by ActionManager when chaining actions by calling <code>startChainingActionsForNode</code>.
            * Calling this method will chain two actions.
            * @method cc.action.Action#then
            * @returns {cc.action.ActionInfo}
            */
            Action.prototype.then = function () {
                return this._owner.then();
            };

            /**
            * This method will make actions to be applied relatively instead of absolutely.
            * For example, moveBy will add the position to the current node's position instead of traversing through the
            * path.
            * @method cc.action.Action#setRelative
            * @param relative {boolean} make this action to behave as moveBy
            * @returns {cc.action.MoveAction}
            */
            Action.prototype.setRelative = function (relative) {
                this._relativeAction = relative;
                return this;
            };

            /**
            * @deprecated This method is deprecated because of its semantics. Use createReversed() instead.
            * @method cc.action.Action#reverse
            * @see {cc.action.Action#createReversed}
            */
            Action.prototype.reverse = function () {
                return this.createReversed();
            };

            /**
            * Create a new Action which is the reverse of this one.
            * A reverse Action is expected to be the inverse of what it was. In example, getting back from a path,
            * or rotating in the other direction.
            * In this new implementation, a reverse action is just inverting the TimeInterpolation value.
            * @method cc.action.Action#createReversed
            * @returns {cc.action.Action}
            */
            Action.prototype.createReversed = function () {
                var action = this.clone();
                return action.setReversed();
            };

            /**
            * Set an action to be its reversed action.
            * This method does not create any new action.
            * @method cc.action.Action#setReversed
            * @returns {cc.action.Action}
            */
            Action.prototype.setReversed = function () {
                this._reversed = !this._reversed;
                if (this._interpolator) {
                    this._interpolator = this._interpolator.reverse();
                } else {
                    this._interpolator = _action.Interpolator.Linear(true, false);
                }
                return this;
            };

            /**
            * Make the actual cloning implementation.
            * This method must be overriden by each action type.
            * @method cc.action.Action#__cloneImpl
            * @returns {cc.action.Action}
            * @private
            */
            Action.prototype.__cloneImpl = function () {
                var copy = new Action();
                this.__genericCloneProperties(copy);
                return copy;
            };

            /**
            * Create a copy of an action.
            * @method cc.action.Action#clone
            * @returns {cc.action.Action}
            */
            Action.prototype.clone = function () {
                return this.__cloneImpl();
            };

            /**
            * Is action relative.
            * In V2 and V3 language, a relative action corresponds to ActionBy types.
            * Non relative actions are ActionTo types.
            * @method cc.action.Action#isRelative
            * @returns {boolean}
            */
            Action.prototype.isRelative = function () {
                return this._relativeAction;
            };

            /**
            * Copy generic properties when cloning an Action.
            * Action event Callbacks are copied as well.
            * @method cc.action.Action#__genericCloneProperties
            * @param copy {cc.action.Action}
            * @private
            */
            Action.prototype.__genericCloneProperties = function (copy) {
                copy.setInterpolator(this._interpolator).setReversedTime(this._reversedTime).setRelative(this._relativeAction).timeInfo(this._startTime, this._duration).setDelayAfterApplication(this.getDelayAfterApplication()).__setOwner(this.getOwner()).setInterpolator(this._interpolator).setSpeed(this.getSpeed()).setRepeatTimes(this._repeatTimes);

                // explictly copy callbacks this way. Sequence overwrites onRepeat.
                copy._onStart = this._onStart;
                copy._onEnd = this._onEnd;
                copy._onApply = this._onApply;
                copy._onRepeat = this._onRepeat;
                copy._onPause = this._onPause;
                copy._onResume = this._onResume;

                copy._reversed = this._reversed;
            };

            /**
            * Backward compatible call.
            * @method cc.action.Action#easing
            * @param i {cc.action.Interpolator} an interpolator/easing function.
            * @returns {cc.action.Action}
            */
            Action.prototype.easing = function (i) {
                this.setInterpolator(i);
                return this;
            };

            /**
            * Backward compatible call.
            * @method cc.action.Action#speed
            * @param speed
            * @returns {cc.action.Action}
            * @deprecated Use setSpeed(speed)
            */
            Action.prototype.speed = function (speed) {
                this._speed *= speed;
                return this;
            };

            /**
            * Is time applied in inverse order ?
            * @method cc.action.Action#isReversedTime
            * @returns {boolean}
            */
            Action.prototype.isReversedTime = function () {
                return this._reversedTime;
            };

            /**
            * Set this action's time to be applied inversely.
            * @method cc.action.Action#setReversedTime
            * @param b {boolean} reverse time ?
            * @returns {cc.action.Action}
            */
            Action.prototype.setReversedTime = function (b) {
                this._reversedTime = b;
                return this;
            };

            Action.prototype.__recursivelySetCreatedStatus = function () {
                this._status = 3 /* CREATED */;
                this._firstExecution = true;
            };
            Action.DEFAULT_TAG = "";
            return Action;
        })();
        _action.Action = Action;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=Action.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (action) {
        "use strict";

        

        /**
        * @class cc.action.Interpolator
        *
        * @classdesc
        * Interpolators are functions used to modify a normalized value, commonly an action current time relative to
        * the action's duration.
        * <br>
        * The achieved effect is pretty interesting for animations, from slow acceleration to bounces, elastic behaviors,
        * etc. All interpolators are the same object types, and have same capabilities
        *   <li>inverse {boolean}: make the interpolator apply inversely (time applies from 1 to 0)
        *   <li>pingpong {boolean}: the interpolator will apply half the time non-inverse and the other half of the time
        *       inversely. This is suitable for effects that apply and de-apply. I.e. zoom from scale 1 to 2, and back from
        *       2 to 1. In previous API, two actions were needed for such effects.
        * <br>
        * Some of the interpolators are easing functions, quadratic bezier curves, etc.
        * <br>
        * In V2 and V3 API, interpolators were cc.easing actions, and in V4, they have been turned into an action
        * attribute.
        * <br>
        * An interpolator is set for an action by calling <code>action.setInterpolator</code>.
        */
        var Interpolator = (function () {
            function Interpolator() {
            }
            /**
            * Build a linear interpolator.
            * @method cc.action.Interpolator.Linear
            * @param inverse {boolean}
            * @param pingpong {boolean}
            * @returns {cc.action.TimeInterpolator}
            */
            Interpolator.Linear = function (inverse, pingpong) {
                var fn = function LinearImpl(time) {
                    if (pingpong) {
                        if (time < 0.5) {
                            time *= 2;
                        } else {
                            time = 1 - (time - 0.5) * 2;
                        }
                    }

                    if (inverse) {
                        time = 1 - time;
                    }

                    return time;
                };

                fn.reverse = function () {
                    return Interpolator.Linear(!inverse, pingpong);
                };

                return fn;
            };

            /**
            * Build an exponential-in interpolator.
            * @param exponent {number} exponent
            * @param inverse {boolean}
            * @param pingpong {boolean}
            * @returns {TimeInterpolator}
            * @method cc.action.Interpolator.EaseExponentialIn
            */
            Interpolator.EaseExponentialIn = function (exponent, inverse, pingpong) {
                var fn = function EaseExponentialInImpl(time) {
                    if (pingpong) {
                        if (time < 0.5) {
                            time *= 2;
                        } else {
                            time = 1 - (time - 0.5) * 2;
                        }
                    }

                    if (inverse) {
                        time = 1 - time;
                    }

                    return Math.pow(time, exponent);
                };

                fn.reverse = function () {
                    return Interpolator.EaseExponentialIn(exponent, !inverse, pingpong);
                };

                return fn;
            };

            /**
            * Build an exponential-out interpolator.
            * @param exponent {number} exponent
            * @param inverse {boolean}
            * @param pingpong {boolean}
            * @returns {TimeInterpolator}
            * @method cc.action.Interpolator.EaseExponentialOut
            */
            Interpolator.EaseExponentialOut = function (exponent, inverse, pingpong) {
                var fn = function EaseExponentialOutImpl(time) {
                    if (pingpong) {
                        if (time < 0.5) {
                            time *= 2;
                        } else {
                            time = 1 - (time - 0.5) * 2;
                        }
                    }

                    if (inverse) {
                        time = 1 - time;
                    }

                    return 1 - Math.pow(1 - time, exponent);
                };

                fn.reverse = function () {
                    return Interpolator.EaseExponentialOut(exponent, !inverse, pingpong);
                };

                return fn;
            };

            /**
            * Build an exponential-in-out interpolator.
            * @param exponent {number} exponent
            * @param inverse {boolean}
            * @param pingpong {boolean}
            * @returns {TimeInterpolator}
            * @method cc.action.Interpolator.EaseExponentialInOut
            */
            Interpolator.EaseExponentialInOut = function (exponent, inverse, pingpong) {
                var fn = function EaseExponentialInOutImpl(time) {
                    if (pingpong) {
                        if (time < 0.5) {
                            time *= 2;
                        } else {
                            time = 1 - (time - 0.5) * 2;
                        }
                    }

                    if (inverse) {
                        time = 1 - time;
                    }

                    if (time * 2 < 1) {
                        return Math.pow(time * 2, exponent) / 2;
                    }

                    return 1 - Math.abs(Math.pow(time * 2 - 2, exponent)) / 2;
                };

                fn.reverse = function () {
                    return Interpolator.EaseExponentialInOut(exponent, !inverse, pingpong);
                };

                return fn;
            };
            return Interpolator;
        })();
        action.Interpolator = Interpolator;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=TimeInterpolator.js.map

/**
* License: see license.txt file.
*/
/// <reference path="../node/Node.ts"/>
/// <reference path="./Action.ts"/>
"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    (function (action) {
        var Action = cc.action.Action;

        

        /**
        * @class cc.action.AlphaAction
        * @classdesc
        *
        * This action applies to a node's transparency.
        * <br>
        * Transparency values are defined by a number between 0 (fully transparent) and 1 (fully opaque).
        */
        var AlphaAction = (function (_super) {
            __extends(AlphaAction, _super);
            /**
            * AlphaAction constructor.
            * @method cc.action.AlphaAction#constructor
            * @param data {cc.action.AlphaActionInitializer=}
            */
            function AlphaAction(data) {
                _super.call(this);
                /**
                * When the action is initialized with a target, this value is the original transparency value.
                * @member cc.action.AlphaAction#_originalAlpha
                * @type {number}
                * @private
                */
                this._originalAlpha = 0;
                /**
                * Action start alpha.
                * @member cc.action.AlphaAction#_startAlpha
                * @type {number}
                * @private
                */
                this._startAlpha = 0;
                /**
                * Action end alpha.
                * @member cc.action.AlphaAction#_endAlpha
                * @type {number}
                * @private
                */
                this._endAlpha = 0;

                if (typeof data !== "undefined") {
                    this._startAlpha = data.start;
                    this._endAlpha = data.end;

                    if (typeof data.relative !== "undefined") {
                        this.setRelative(data.relative);
                    }
                }
            }
            /**
            * Update target Node's transparency.
            * {@link cc.action.Action#update}
            * @method cc.action.AlphaAction#update
            * @override
            * @return {number} Applied transparency value.
            */
            AlphaAction.prototype.update = function (delta, node) {
                var r = this._startAlpha + delta * (this._endAlpha - this._startAlpha);

                if (this._relativeAction) {
                    r += this._originalAlpha;
                    if (this._reversed) {
                        r -= this._endAlpha;
                    }
                }

                node._color._color[3] = r;

                return r;
            };

            /**
            * Capture before-application Node's property values.
            * {@link cc.action.Action#solveInitialValues}
            * @method cc.action.AlphaAction#solveInitialValues
            * @override
            */
            AlphaAction.prototype.solveInitialValues = function (node) {
                if (this._relativeAction && !this._fromValuesSet) {
                    this._startAlpha = 0;
                }
            };

            /**
            * {@link cc.action.Action#initWithTarget}
            * @method cc.action.AlphaAction#initWithTarget
            * @override
            */
            AlphaAction.prototype.initWithTarget = function (node) {
                this._originalAlpha = node._color._color[3];
                this.solveInitialValues(node);
            };

            /**
            * {@link cc.action.Action#from}
            * @method cc.action.AlphaAction#from
            * @override
            */
            AlphaAction.prototype.from = function (alpha) {
                _super.prototype.from.call(this, alpha);
                this._startAlpha = alpha;
                return this;
            };

            /**
            * {@link cc.action.Action#to}
            * @method cc.action.AlphaAction#to
            * @override
            */
            AlphaAction.prototype.to = function (alpha) {
                this._endAlpha = alpha;
                return this;
            };

            /**
            * {@link cc.action.Action#__cloneImpl}
            * @method cc.action.AlphaAction#__cloneImpl
            * @override
            */
            AlphaAction.prototype.__cloneImpl = function () {
                var copy = new AlphaAction();
                copy.to(this._endAlpha);

                if (this._fromValuesSet) {
                    copy.from(this._startAlpha);
                }

                copy._originalAlpha = this._originalAlpha;

                this.__genericCloneProperties(copy);

                return copy;
            };
            return AlphaAction;
        })(Action);
        action.AlphaAction = AlphaAction;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=AlphaAction.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="../math/Point.ts"/>
    /// <reference path="../node/Node.ts"/>
    /// <reference path="./Action.ts"/>
    (function (action) {
        "use strict";

        var Action = cc.action.Action;

        var __moveActionUpdateValue = { x: 0, y: 0 };

        

        /**
        * @class cc.action.MoveAction
        * @classdesc
        * This action applies to a node's position.
        * The action will traverse a line path.
        */
        var MoveAction = (function (_super) {
            __extends(MoveAction, _super);
            /**
            * Build a new MoveAction
            * @method cc.action.MoveAction#constructor
            * @param data {cc.action.MoveActionInitializer=}
            */
            function MoveAction(data) {
                _super.call(this);
                /**
                * Node's original x position.
                * @member cc.action.MoveAction#_originalX
                * @type {number}
                * @private
                */
                this._originalX = 0;
                /**
                * Node's original y position.
                * @member cc.action.MoveAction#_originalX
                * @type {number}
                * @private
                */
                this._originalY = 0;
                /**
                * Action initial X
                * @member cc.action.MoveAction#_x0
                * @type {number}
                * @private
                */
                this._x0 = 0;
                /**
                * Action initial Y
                * @member cc.action.MoveAction#_y0
                * @type {number}
                * @private
                */
                this._y0 = 0;
                /**
                * Action final X
                * @member cc.action.MoveAction#_x1
                * @type {number}
                * @private
                */
                this._x1 = 0;
                /**
                * Action final Y
                * @member cc.action.MoveAction#_y1
                * @type {number}
                * @private
                */
                this._y1 = 0;

                if (typeof data !== "undefined") {
                    this._x0 = data.x0;
                    this._y0 = data.y0;
                    this._x1 = data.x1;
                    this._y1 = data.y1;
                    if (typeof data.relative !== "undefined") {
                        this.setRelative(data.relative);
                    }
                }
            }
            /**
            * Update target Node's position.
            * {@link cc.action.Action#update}
            * @method cc.action.MoveAction#update
            * @override
            * @return {cc.math.Point} new Node position.
            */
            MoveAction.prototype.update = function (delta, node) {
                var x = this._x0 + delta * (this._x1 - this._x0);
                var y = this._y0 + delta * (this._y1 - this._y0);

                if (this._relativeAction) {
                    x += this._originalX;
                    y += this._originalY;
                    if (this._reversed) {
                        x -= this._x1;
                        y -= this._y1;
                    }
                }

                node.setPosition(x, y);

                __moveActionUpdateValue.x = x;
                __moveActionUpdateValue.y = y;

                return __moveActionUpdateValue;
            };

            /**
            * Capture before-application Node's property values.
            * {@link cc.action.Action#solveInitialValues}
            * @method cc.action.MoveAction#solveInitialValues
            * @override
            */
            MoveAction.prototype.solveInitialValues = function (node) {
                if (this._relativeAction && !this._fromValuesSet) {
                    this._x0 = 0;
                    this._y0 = 0;
                } else if (!this._fromValuesSet) {
                    this._x0 = node._position.x;
                    this._y0 = node._position.y;
                }
            };

            /**
            * {@link cc.action.Action#initWithTarget}
            * @method cc.action.MoveAction#initWithTarget
            * @override
            */
            MoveAction.prototype.initWithTarget = function (node) {
                this._originalX = node._position.x;
                this._originalY = node._position.y;

                this.solveInitialValues(node);
            };

            /**
            * {@link cc.action.Action#from}
            * @method cc.action.MoveAction#from
            * @override
            */
            MoveAction.prototype.from = function (point) {
                _super.prototype.from.call(this, point);
                this._x0 = point.x;
                this._y0 = point.y;

                return this;
            };

            /**
            * {@link cc.action.Action#to}
            * @method cc.action.MoveAction#to
            * @override
            */
            MoveAction.prototype.to = function (point) {
                this._x1 = point.x;
                this._y1 = point.y;
                return this;
            };

            /**
            * {@link cc.action.Action#__cloneImpl}
            * @method cc.action.MoveAction#__cloneImpl
            * @override
            */
            MoveAction.prototype.__cloneImpl = function () {
                var copy = new MoveAction().to({ x: this._x1, y: this._y1 });

                if (this._fromValuesSet) {
                    copy.from({ x: this._x0, y: this._y0 });
                }

                this.__genericCloneProperties(copy);

                return copy;
            };
            return MoveAction;
        })(Action);
        action.MoveAction = MoveAction;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=MoveAction.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="../node/Node.ts"/>
    /// <reference path="../action/Action.ts"/>
    (function (action) {
        "use strict";

        var Action = cc.action.Action;

        /**
        * Internal helper Object to store a property information.
        */
        var PropertyInfo = (function () {
            /**
            *
            * @param _property {string} property name.
            * @param _start {number} start value.
            * @param _end {number=} end value.
            */
            function PropertyInfo(_property, _start, _end) {
                this._property = _property;
                this._start = _start;
                this._end = _end;
                /**
                * Original property value.
                * @type {number}
                * @private
                */
                this._original = 0;
                /**
                * Property Units. For example, when the property is not a numeric value but something like '250px'.
                * @type {string}
                * @private
                */
                this._units = "";
            }
            PropertyInfo.prototype.setOriginal = function (n) {
                this._original = n;
                return this;
            };

            PropertyInfo.prototype.getOriginal = function () {
                return this._original;
            };

            PropertyInfo.prototype.clone = function () {
                return new PropertyInfo(this._property, this._start, this._end);
            };

            PropertyInfo.prototype.getValue = function (v) {
                if (this._units) {
                    return "" + v + this._units;
                }

                return v;
            };
            return PropertyInfo;
        })();

        /**
        * @class cc.action.PropertyAction
        * @extends cc.action.Action
        *
        * @classdesc
        *
        * This action applies to any arbitrary Node's properties. Could apply to multiple properties at the same time.
        * AlphaAction and RotateAction fit in the model of a PropertyInfo, but they are complete Actions for the shake of
        * clarity and performance.
        *
        * The properties a PropertyAction will handle must be simple properties, not Objects, only composed of a number and
        * an optional unit.
        *
        * A different set of properties can be specified in a call to <code>from</code> and <code>to</code>. Properties
        * specified not in both <code>from</code> and <code>to</code> at the same time, will get values either 'from' or
        * 'to' values when a call to <code>initWithTarget</code> is made.
        */
        var PropertyAction = (function (_super) {
            __extends(PropertyAction, _super);
            /**
            * PropertyAction constructor.
            * @method cc.action.PropertyAction#constructor
            */
            function PropertyAction() {
                _super.call(this);

                this._propertiesInfo = [];
            }
            /**
            * {@link cc.action.Action#initWithTarget}
            * @method cc.action.PropertyAction#initWithTarget
            * @override
            */
            PropertyAction.prototype.initWithTarget = function (node) {
                for (var i = 0; i < this._propertiesInfo.length; i++) {
                    var pi = this._propertiesInfo[i];
                    pi.setOriginal(node[pi._property]);
                }
            };

            /**
            * Update target Node's properties.
            * {@link cc.action.Action#update}
            * @method cc.action.PropertyAction#update
            * @override
            * @returns {Object} an Object with all the modified properties.
            */
            PropertyAction.prototype.update = function (delta, node) {
                var ret = {};

                for (var i = 0; i < this._propertiesInfo.length; i++) {
                    var pr = this._propertiesInfo[i];
                    var v = pr._start + delta * (pr._end - pr._start);

                    if (this.isRelative()) {
                        v += pr.getOriginal();
                    }

                    node[pr._property] = pr.getValue(v);

                    // register applied values only if there´s someone interested.
                    if (this._onApply) {
                        ret[pr._property] = v;
                    }
                }

                return ret;
            };

            /**
            * Capture before-application Node's property values.
            * {@link cc.action.Action#solveInitialValues}
            * @method cc.action.PropertyAction#solveInitialValues
            * @override
            */
            PropertyAction.prototype.solveInitialValues = function (node) {
                if (!this._fromValuesSet) {
                    this._fromValuesSet = true;

                    for (var i = 0; i < this._propertiesInfo.length; i++) {
                        var pr = this._propertiesInfo[i];
                        if (typeof pr._start === "undefined") {
                            pr._start = node[pr._property];
                        }
                        if (typeof pr._end === "undefined") {
                            pr._end = node[pr._property];
                        }
                    }
                }
            };

            /**
            * {@link cc.action.Action#from}
            * @method cc.action.PropertyAction#from
            * @override
            */
            PropertyAction.prototype.from = function (props) {
                for (var pr in props) {
                    if (props.hasOwnProperty(pr)) {
                        var propertyInfo = new PropertyInfo(pr, props[pr]);
                        this._propertiesInfo.push(propertyInfo);
                    }
                }

                return this;
            };

            /**
            * {@link cc.action.Action#to}
            * @method cc.action.PropertyAction#to
            * @override
            */
            PropertyAction.prototype.to = function (props) {
                var i;

                for (var pr in props) {
                    if (props.hasOwnProperty(pr)) {
                        // if no property set, create a property w/o initial value. will be filled automagically by a call to
                        // __setInitialValues
                        var property = null;
                        for (i = 0; i < this._propertiesInfo.length; i++) {
                            if (this._propertiesInfo[i]._property === pr) {
                                property = this._propertiesInfo[i];
                                break;
                            }
                        }

                        if (!property) {
                            property = new PropertyInfo(pr, 0, 0);
                            this._propertiesInfo.push(property);
                        }

                        property._end = props[pr];
                    }
                }

                return this;
            };

            /**
            * Helper function for cloning this property.
            * @memver cc.action.PropertyAction#__cloneProperties
            * @returns {Array<PropertyInfo>}
            * @private
            */
            PropertyAction.prototype.__cloneProperties = function () {
                var pr = [];

                for (var i = 0; i < this._propertiesInfo.length; i++) {
                    pr.push(this._propertiesInfo[i].clone());
                }

                return pr;
            };

            /**
            * {@link cc.action.Action#__cloneImpl}
            * @method cc.action.PropertyAction#__cloneImpl
            * @override
            */
            PropertyAction.prototype.__cloneImpl = function () {
                var copy = new PropertyAction().to(this.__cloneProperties());

                this.__genericCloneProperties(copy);

                return copy;
            };
            return PropertyAction;
        })(Action);
        action.PropertyAction = PropertyAction;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=PropertyAction.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="../node/Node.ts"/>
    /// <reference path="./Action.ts"/>
    (function (action) {
        "use strict";

        var Action = cc.action.Action;

        

        /**
        * @class cc.action.RotateAction
        * @classdesc
        *
        * This action applies to a node's rotation angle.
        * The rotation angle is defined in degrees.
        */
        var RotateAction = (function (_super) {
            __extends(RotateAction, _super);
            /**
            * Build a new RotateAction instance.
            * @method cc.action.RotateAction#constructor
            * @param data {cc.action.RotateActionInitializer=}
            */
            function RotateAction(data) {
                _super.call(this);
                /**
                * Node's original rotation angle.
                * @member cc.action.RotateAction#_originalAngle
                * @type {number}
                * @private
                */
                this._originalAngle = 0;
                /**
                * Action start angle
                * @member cc.action.RotateAction#_startAngle
                * @type {number}
                */
                this._startAngle = 0;
                /**
                * Action end angle
                * @member cc.action.RotateAction#_endAngle
                * @type {number}
                */
                this._endAngle = 360;

                if (typeof data !== "undefined") {
                    this._startAngle = data.start;
                    this._endAngle = data.end;
                    if (typeof data.relative !== "undefined") {
                        this.setRelative(data.relative);
                    }
                }
            }
            /**
            * Update target Node's rotation angle.
            * {@link cc.action.Action#update}
            * @method cc.action.RotateAction#update
            * @override
            * @return {number} new Node rotation angle.
            */
            RotateAction.prototype.update = function (delta, node) {
                var r = this._startAngle + delta * (this._endAngle - this._startAngle);

                if (this._relativeAction) {
                    r += this._originalAngle;
                    if (this._reversed) {
                        r -= this._endAngle;
                    }
                }

                node.rotationAngle = r;

                return r;
            };

            /**
            * Capture before-application Node's rotation angle.
            * {@link cc.action.Action#solveInitialValues}
            * @method cc.action.RotateAction#solveInitialValues
            * @override
            */
            RotateAction.prototype.solveInitialValues = function (node) {
                if (this._relativeAction && !this._fromValuesSet) {
                    this._startAngle = 0;

                    if (this._startAngle === this._endAngle) {
                        this._startAngle = this._originalAngle;
                        this._originalAngle = 0;
                    }
                } else if (!this._fromValuesSet) {
                    this._startAngle = node._rotation.x;
                }
            };

            /**
            * {@link cc.action.Action#initWithTarget}
            * @method cc.action.RotateAction#initWithTarget
            * @override
            */
            RotateAction.prototype.initWithTarget = function (node) {
                this._originalAngle = node._rotation.x;
                this.solveInitialValues(node);
            };

            /**
            * {@link cc.action.Action#from}
            * @method cc.action.RotateAction#from
            * @override
            */
            RotateAction.prototype.from = function (angle) {
                _super.prototype.from.call(this, angle);
                this._startAngle = angle;
                return this;
            };

            /**
            * {@link cc.action.Action#to}
            * @method cc.action.RotateAction#to
            * @override
            */
            RotateAction.prototype.to = function (angle) {
                this._endAngle = angle;
                return this;
            };

            /**
            * {@link cc.action.Action#__cloneImpl}
            * @method cc.action.RotateAction#__cloneImpl
            * @override
            */
            RotateAction.prototype.__cloneImpl = function () {
                var copy = new RotateAction().to(this._endAngle);

                if (this._fromValuesSet) {
                    copy.from(this._startAngle);
                }

                this.__genericCloneProperties(copy);

                return copy;
            };
            return RotateAction;
        })(Action);
        action.RotateAction = RotateAction;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=RotateAction.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="./Action.ts"/>
    /// <reference path="../math/Point.ts"/>
    /// <reference path="../node/Node.ts"/>
    (function (action) {
        "use strict";

        var Vector = cc.math.Vector;

        var Action = cc.action.Action;

        var __scaleActionUpdateValue = new Vector();

        

        /**
        * @class cc.action.ScaleAction
        * @classdesc
        *
        * This action applies to a Node's scale values.
        */
        var ScaleAction = (function (_super) {
            __extends(ScaleAction, _super);
            /**
            * Build a new ScaleAction instance.
            * @param data {cc.action.ScaleActionInitializer=}
            */
            function ScaleAction(data) {
                _super.call(this);
                /**
                * Node's original x axis scale.
                * @member cc.action.ScaleAction#_originalScaleX
                * @type {number}
                * @private
                */
                this._originalScaleX = 1;
                /**
                * Node's original y axis scale.
                * @member cc.action.ScaleAction#_originalScaleY
                * @type {number}
                * @private
                */
                this._originalScaleY = 1;
                /**
                * Action start x axis Scale.
                * @member cc.action.ScaleAction#_scaleX0
                * @type {number}
                */
                this._scaleX0 = 1;
                /**
                * Action start y axis Scale.
                * @member cc.action.ScaleAction#_scaleY0
                * @type {number}
                */
                this._scaleY0 = 1;
                /**
                * Action end x axis Scale.
                * @member cc.action.ScaleAction#_scaleX1
                * @type {number}
                */
                this._scaleX1 = 1;
                /**
                * Action end y axis Scale.
                * @member cc.action.ScaleAction#_scaleY1
                * @type {number}
                */
                this._scaleY1 = 1;

                if (typeof data !== "undefined") {
                    this._scaleX0 = data.x0;
                    this._scaleY0 = data.y0;
                    this._scaleX1 = data.x1;
                    this._scaleY1 = data.y1;
                    if (typeof data.relative !== "undefined") {
                        this.setRelative(data.relative);
                    }
                }
            }
            /**
            * Update target Node's scale.
            * {@link cc.action.Action#update}
            * @method cc.action.ScaleAction#update
            * @override
            * @returns {cc.math.Vector} new node's scale values.
            */
            ScaleAction.prototype.update = function (delta, node) {
                var x = this._scaleX0 + delta * (this._scaleX1 - this._scaleX0);
                var y = this._scaleY0 + delta * (this._scaleY1 - this._scaleY0);

                if (this._relativeAction) {
                    x += this._originalScaleX;
                    y += this._originalScaleY;
                    if (this._reversed) {
                        x -= this._scaleX1;
                        y -= this._scaleY1;
                    }
                }

                node.setScale(x, y);

                return __scaleActionUpdateValue.set(x, y);
            };

            /**
            * Capture before-application Node's scale for both axis x and y.
            * {@link cc.action.Action#solveInitialValues}
            * @method cc.action.ScaleAction#solveInitialValues
            * @override
            */
            ScaleAction.prototype.solveInitialValues = function (node) {
                if (this._relativeAction && !this._fromValuesSet) {
                    this._scaleX0 = 0;
                    this._scaleY0 = 0;
                } else if (!this._fromValuesSet) {
                    this._scaleX0 = node._scale.x;
                    this._scaleY0 = node._scale.y;
                }
            };

            /**
            * {@link cc.action.Action#initWithTarget}
            * @method cc.action.ScaleAction#initWithTarget
            * @override
            */
            ScaleAction.prototype.initWithTarget = function (node) {
                this._originalScaleX = node._scale.x;
                this._originalScaleY = node._scale.y;

                this.solveInitialValues(node);
            };

            /**
            * {@link cc.action.Action#from}
            * @method cc.action.ScaleAction#from
            * @override
            */
            ScaleAction.prototype.from = function (point) {
                _super.prototype.from.call(this, point);
                this._scaleX0 = point.x;
                this._scaleY0 = point.y;

                return this;
            };

            /**
            * {@link cc.action.Action#to}
            * @method cc.action.ScaleAction#to
            * @override
            */
            ScaleAction.prototype.to = function (point) {
                this._scaleX1 = point.x;
                this._scaleY1 = point.y;
                return this;
            };

            /**
            * {@link cc.action.Action#__cloneImpl}
            * @method cc.action.ScaleAction#__cloneImpl
            * @override
            */
            ScaleAction.prototype.__cloneImpl = function () {
                var copy = new ScaleAction().to({ x: this._scaleX1, y: this._scaleY1 });

                if (this._fromValuesSet) {
                    copy.from({ x: this._scaleX0, y: this._scaleY0 });
                }

                this.__genericCloneProperties(copy);

                return copy;
            };
            return ScaleAction;
        })(Action);
        action.ScaleAction = ScaleAction;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=ScaleAction.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="../node/Node.ts"/>
    /// <reference path="./Action.ts"/>
    /// <reference path="./MoveAction.ts"/>
    /// <reference path="./RotateAction.ts"/>
    /// <reference path="./ScaleAction.ts"/>
    /// <reference path="./PropertyAction.ts"/>
    /// <reference path="./AlphaAction.ts"/>
    /// <reference path="./TintAction.ts"/>
    (function (_action) {
        "use strict";

        var Action = cc.action.Action;
        var MoveAction = cc.action.MoveAction;
        var RotateAction = cc.action.RotateAction;
        var ScaleAction = cc.action.ScaleAction;
        var PropertyAction = cc.action.PropertyAction;
        var AlphaAction = cc.action.AlphaAction;
        var TintAction = cc.action.TintAction;

        

        /**
        * @class cc.action.SequenceAction
        * @classdesc
        *
        * SequenceAction is a collection of either parallel or sequential actions.
        * It is useful for grouping actions in a more convenient way.
        * <br>
        * This action maps to previous API versions' Sequence and Spawn, but internally works in a complete different way.
        * <br>
        * A Sequence, constraints its contained Actions to its own duration. That means that if the Sequence Actions are not
        * well setup relatively to the Sequence timing, Actions could not end playing, or callbacks could not be notified
        * appropriately.
        *
        * <li>Internally, a Sequence does not modify a Node's properties. It just choreographs the time for its children
        *  Actions. Hece there's no need to call <code>from</code> or <code>to</code> methods. This means that setting
        *  a Sequence as relative has no impact.
        * <li>A Sequence can contain other Sequences to the desired nesting level.
        * <li>A repeating ActionSequence will repeat its contained actions.
        * <li>A Sequence, if is sequential=true, will sequentialize contained actions, making one start when the previous one
        * ends. If it is sequential=false, Actions will happen at the same time.
        * <li>By default a Sequence Action will conform its duration to the one resulting of the contained Actions. It will
        * have special heuristics for sequential and not sequential behaviors.
        */
        var SequenceAction = (function (_super) {
            __extends(SequenceAction, _super);
            /**
            * Build a new Sequence action.
            * @method cc.action.SequenceAction#constructor
            * @param data {cc.action.SequenceActionInitializer=}
            */
            function SequenceAction(data) {
                _super.call(this);
                /**
                * Collection of Sequenced actions.
                * @member cc.action.SequenceAction#_actions
                * @type {Array<cc.action.Action>}
                * @private
                */
                this._actions = [];
                /**
                * Configures this action as Sequence or Spawn.
                * @member cc.action.SequenceAction#_sequential
                * @type {boolean}
                */
                this._sequential = true;
                this._prevOnRepeat = null;

                if (typeof data !== "undefined") {
                    this._sequential = data.sequential;
                }

                this._onRepeat = function (action, target, repetitionCount) {
                    var seq = action;
                    seq.recursivelySetCreatedStatus();
                    if (seq._prevOnRepeat) {
                        seq._prevOnRepeat(action, target, repetitionCount);
                    }
                };
            }
            SequenceAction.prototype.onRepeat = function (callback) {
                this._prevOnRepeat = callback;
                return this;
            };

            SequenceAction.prototype.recursivelySetCreatedStatus = function () {
                for (var i = 0; i < this._actions.length; i++) {
                    this._actions[i].__recursivelySetCreatedStatus();
                }
            };

            SequenceAction.prototype.__recursivelySetCreatedStatus = function () {
                _super.prototype.__recursivelySetCreatedStatus.call(this);
                for (var i = 0; i < this._actions.length; i++) {
                    this._actions[i].__recursivelySetCreatedStatus();
                }
            };

            /**
            * When an action is added, or has its duration, start time, or delay modified, the Sequence duration will be
            * recalculated.
            * @method cc.action.SequenceAction#__updateDuration
            * @override
            * @private
            */
            SequenceAction.prototype.__updateDuration = function () {
                var duration = 0;

                this.__sequentializeStartAndDuration();

                for (var i = 0; i < this._actions.length; i++) {
                    var nd = this._actions[i]._startTime + this._actions[i].getDuration();

                    if (nd > duration) {
                        duration = nd;
                    }
                }

                this._duration = duration;

                _super.prototype.__updateDuration.call(this);
            };

            /**
            * If this sequence has sequential behavior, this method will sequentialize in time all the Actions.
            * @method cc.action.SequenceAction#__sequentializeStartAndDuration
            * @private
            */
            SequenceAction.prototype.__sequentializeStartAndDuration = function () {
                var actions = this._actions;
                if (this._sequential) {
                    for (var i = 0; i < actions.length; i++) {
                        var curr = actions[i];

                        if (i > 0) {
                            var prev = actions[i - 1];
                            curr._startTime = prev.getDuration() + prev._startTime;
                        } else {
                            curr._startTime = 0;
                        }
                    }
                }
            };

            /**
            * Add an Action to the Sequence.
            * <br>
            * Added Actions can be other Sequences.
            * <br>
            * Adding actions triggers upwards recursive duration recalculation.
            * @method cc.action.SequenceAction#addAction
            * @param a {cc.action.Action}
            * @returns {cc.action.SequenceAction}
            */
            SequenceAction.prototype.addAction = function (a) {
                this._actions.push(a);

                a._owner = this._owner;
                a._parentSequence = this;

                this.__updateDuration();

                return this;
            };

            /**
            * Sequences do not update any target's properties.
            * @method cc.action.SequenceAction#update
            * @override
            */
            SequenceAction.prototype.update = function (time, node) {
            };

            /**
            * Do Sequence application process.
            * <br>
            * Do not call directly.
            *
            * @param delta {number} elapsed time between frames.
            * @param time {number} absolute Action time.
            * @param node {cc.node.Node} target node.
            * @private
            * @method cc.action.SequenceAction#__stepImpl
            */
            SequenceAction.prototype.__stepImpl = function (delta, time, node) {
                if (this._status !== 4 /* ENDED */) {
                    if (this.__isActionApplicable(time)) {
                        _super.prototype.__actionApply.call(this, time, node);

                        // absolute time for this action relative to its start time.
                        var ntime = (time - this._startTime) % this.getOneRepetitionDuration();

                        for (var i = 0; i < this._actions.length; i++) {
                            this._actions[i]._currentTime = (this._actions[i]._currentTime + delta) % this.getOneRepetitionDuration();
                            this._actions[i].__stepImpl(delta, ntime, node);
                        }
                    } else {
                        // apply all sub-actions for the final state.
                        if (time >= this._startTime + this.getDuration()) {
                            this._status = 4 /* ENDED */;

                            for (var i = 0; i < this._actions.length; i++) {
                                this._actions[i]._currentTime = (this._actions[i]._currentTime + delta);
                                this._actions[i].__stepImpl(0, time, node);
                            }

                            this.__actionApply(time, node);
                            if (this._onEnd) {
                                this._onEnd(this, node);
                            }
                        }
                    }
                }
            };

            /**
            * Internal method to apply children actions to a target Node.
            * @method cc.action.SequenceAction#__actionApply
            * @param time {number} Time relative to the Sequence to apply a child Action at.
            * @param node {cc.node.Node} target Node to apply actions to.
            * @private
            */
            SequenceAction.prototype.__actionApply = function (time, node) {
            };

            /**
            * Clone the Action and all its children Actions.
            * @method cc.action.SequenceAction#__cloneImpl
            * @override
            * @inheritDoc
            */
            SequenceAction.prototype.__cloneImpl = function () {
                var action = new SequenceAction({ sequential: this._sequential });

                this.__genericCloneProperties(action);
                action._prevOnRepeat = this._prevOnRepeat;
                action._duration = 0;

                for (var i = 0; i < this._actions.length; i++) {
                    action.addAction(this._actions[i].clone());
                }

                return action;
            };

            /**
            * Get Sequence's number of actions.
            * @method cc.action.SequenceAction#getNumActions
            * @returns {number}
            */
            SequenceAction.prototype.getNumActions = function () {
                return this._actions.length;
            };

            /**
            * Get action at index.
            * @method cc.action.SequenceAction#getAction
            * @param i {number}
            * @returns {cc.action.Action}
            */
            SequenceAction.prototype.getAction = function (i) {
                return this._actions[i];
            };

            /**
            * @override
            * @inheritDoc
            */
            SequenceAction.prototype.setReversed = function () {
                _super.prototype.setReversed.call(this);

                this._actions = this._actions.reverse();
                for (var i = 0; i < this._actions.length; i++) {
                    this._actions[i].setReversed();
                }

                this.__sequentializeStartAndDuration();

                return this;
            };

            /**
            * @override
            * @inheritDoc
            */
            SequenceAction.prototype.actionMove = function () {
                var a = new MoveAction();
                this.addAction(a);
                return a;
            };

            /**
            * @override
            * @inheritDoc
            */
            SequenceAction.prototype.actionRotate = function () {
                var a = new RotateAction();
                this.addAction(a);
                return a;
            };

            /**
            * @override
            * @inheritDoc
            */
            SequenceAction.prototype.actionScale = function () {
                var a = new ScaleAction();
                this.addAction(a);
                return a;
            };

            /**
            * @override
            * @inheritDoc
            */
            SequenceAction.prototype.actionAlpha = function () {
                var a = new AlphaAction();
                this.addAction(a);
                return a;
            };

            /**
            * @override
            * @inheritDoc
            */
            SequenceAction.prototype.actionTint = function () {
                var a = new TintAction();
                this.addAction(a);
                return a;
            };

            /**
            * @override
            * @inheritDoc
            */
            SequenceAction.prototype.actionProperty = function () {
                var a = new PropertyAction();
                this.addAction(a);
                return a;
            };

            /**
            * @override
            * @inheritDoc
            */
            SequenceAction.prototype.actionSequence = function () {
                var a = new SequenceAction();
                this.addAction(a);
                return a;
            };

            /**
            * @override
            * @inheritDoc
            */
            SequenceAction.prototype.endSequence = function () {
                if (!this._parentSequence) {
                    return this;
                }

                return this._parentSequence;
            };
            return SequenceAction;
        })(Action);
        _action.SequenceAction = SequenceAction;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=SequenceAction.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="../node/Node.ts"/>
    /// <reference path="../math/Point.ts"/>
    /// <reference path="./Action.ts"/>
    (function (action) {
        "use strict";

        var Action = cc.action.Action;

        var __updateRGB = { r: 1, g: 1, b: 1 };

        

        /**
        * @class cc.action.TintAction
        * @classdesc
        *
        * This action applies to a Node's color.
        * The tint color is not the actual node's color, it is a multiplicative value for color or texture.
        * Tint components are values between 0 and 1.
        */
        var TintAction = (function (_super) {
            __extends(TintAction, _super);
            /**
            * Build a new TintAction.
            * @method cc.action.TintAction#constructor
            * @param data {cc.action.TintActionInitializer=}
            */
            function TintAction(data) {
                _super.call(this);
                /**
                * Node's original color.
                * @member cc.action.TintAction#_originalColor
                * @type {cc.math.RGBAColor}
                * @private
                */
                this._originalColor = { r: 1, g: 1, b: 1 };
                /**
                * Action start color.
                * @member cc.action.TintAction#_startColor
                * @type {cc.math.RGBAColor}
                */
                this._startColor = { r: 1, g: 1, b: 1 };
                /**
                * Action end color.
                * @member cc.action.TintAction#_endColor
                * @type {cc.math.RGBAColor}
                */
                this._endColor = { r: 1, g: 1, b: 1 };
                if (typeof data !== "undefined") {
                    this._startColor.r = data.r0;
                    this._startColor.g = data.g0;
                    this._startColor.b = data.b0;
                    this._endColor.r = data.r1;
                    this._endColor.g = data.g1;
                    this._endColor.b = data.b1;

                    if (typeof data.relative !== "undefined") {
                        this.setRelative(data.relative);
                    }
                }
            }
            /**
            * Update target Node's tint color.
            * {@link cc.action.Action#update}
            * @method cc.action.TintAction#update
            * @override
            * @returns {cc.math.RGBAColor} new node's tint values.
            */
            TintAction.prototype.update = function (delta, node) {
                var r = this._startColor.r + delta * (this._endColor.r - this._startColor.r);
                var g = this._startColor.g + delta * (this._endColor.g - this._startColor.g);
                var b = this._startColor.b + delta * (this._endColor.b - this._startColor.b);

                if (this._relativeAction) {
                    r += this._originalColor.r;
                    g += this._originalColor.g;
                    b += this._originalColor.b;
                    if (this._reversed) {
                        r -= this._endColor.r;
                        g -= this._endColor.g;
                        b -= this._endColor.b;
                    }
                }

                node.setColor(r, g, b);

                // update returned value only if someone is interested on it.
                if (this._onApply) {
                    __updateRGB.r = r;
                    __updateRGB.g = g;
                    __updateRGB.b = b;
                }

                return __updateRGB;
            };

            /**
            * Capture before-application Node's tint color.
            * {@link cc.action.Action#solveInitialValues}
            * @method cc.action.TintAction#solveInitialValues
            * @override
            */
            TintAction.prototype.solveInitialValues = function (node) {
                if (this._relativeAction && !this._fromValuesSet) {
                    this._startColor.r = 0;
                    this._startColor.g = 0;
                    this._startColor.b = 0;
                } else {
                    this._startColor.r = node._color._color[0];
                    this._startColor.g = node._color._color[1];
                    this._startColor.b = node._color._color[2];
                }
            };

            /**
            * {@link cc.action.Action#initWithTarget}
            * @method cc.action.TintAction#initWithTarget
            * @override
            */
            TintAction.prototype.initWithTarget = function (node) {
                this._originalColor.r = node._color._color[0];
                this._originalColor.g = node._color._color[1];
                this._originalColor.b = node._color._color[2];

                this.solveInitialValues(node);
            };

            /**
            * {@link cc.action.Action#from}
            * @method cc.action.TintAction#from
            * @override
            */
            TintAction.prototype.from = function (color) {
                _super.prototype.from.call(this, color);
                this._startColor = { r: color.r, g: color.g, b: color.b };
                ;
                return this;
            };

            /**
            * {@link cc.action.Action#to}
            * @method cc.action.TintAction#to
            * @override
            */
            TintAction.prototype.to = function (color) {
                this._endColor = { r: color.r, g: color.g, b: color.b };
                return this;
            };

            /**
            * {@link cc.action.Action#__cloneImpl}
            * @method cc.action.TintAction#__cloneImpl
            * @override
            */
            TintAction.prototype.__cloneImpl = function () {
                var copy = new TintAction();
                copy.to({ r: this._endColor.r, g: this._endColor.g, b: this._endColor.b });

                if (this._fromValuesSet) {
                    copy.from({ r: this._startColor.r, g: this._startColor.g, b: this._startColor.b });
                }

                this.__genericCloneProperties(copy);

                return copy;
            };
            return TintAction;
        })(Action);
        action.TintAction = TintAction;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=TintAction.js.map

/**
* License: see license.txt file
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="./Action.ts"/>
    /// <reference path="../node/sprite/Animation.ts"/>
    /// <reference path="../node/sprite/SpriteFrame.ts"/>
    /// <reference path="../node/Node.ts"/>
    /// <reference path="../node/Sprite.ts"/>
    (function (action) {
        var Action = cc.action.Action;

        /**
        * @class cc.action.AnimateAction
        * @classdesc
        *
        * This action changes Sprite's images in a time basis.
        * <p>
        *     It handles an instance of <code>cc.node.sprite.Animation</code> which is collection of SpriteFrame objects.
        *     Each SpriteFrame references an image and a rect on the image. The action, selects a SpriteFrame on
        *     the Animation based on time keyframing.
        * <p>
        *     Even though an Animation object has control over how many times the animation will be repeated, calling
        *     <code>action.setRepeatTimes(times);</code> or <code>action.setRepeatForever();</code> will override the
        *     Animation value in favor of the newly set one.
        * <p>
        *     Warning. This action expects as its target a @link {cc.node.Sprite} instance and not a @link {cc.node.Node}
        *     like the other actions. The target supplied to this Action must have a <code>setSpriteFrame</code> method
        *     otherwise an undefined error will be thrown.
        *
        *
        *
        * @see {cc.node.sprite.Animation}
        *
        */
        var AnimateAction = (function (_super) {
            __extends(AnimateAction, _super);
            /**
            * Create a new Animate action instance.
            * @method cc.action.AnimateAction#constructor
            * @param data {cc.node.sprite.Animation}
            */
            function AnimateAction(data) {
                _super.call(this);
                /**
                * Original SpriteFrame for the Action target node.
                * @member cc.action.AnimateAction#_originalSpriteFrame
                * @type {cc.node.sprite.SpriteFrame}
                * @private
                */
                this._originalSpriteFrame = null;
                /**
                * Animation.
                * @member cc.action.AnimateAction#_animation
                * @type {cc.node.sprite.Animation}
                * @private
                */
                this._animation = null;

                if (typeof data !== "undefined") {
                    this.setAnimation(data);
                }
            }
            /**
            * Set the Animation object instance.
            * @method cc.action.AnimateAction#setAnimation
            * @param data {cc.node.sprite.Animation}
            */
            AnimateAction.prototype.setAnimation = function (data) {
                this._animation = data;
                this.setDuration(0);
                this.setRepeatTimes(data._loops);
            };

            /**
            * Set the Animate action duration.
            * Will always fallback to set the Animation duration.
            * @method cc.action.AnimateAction##setDuration
            * @param d
            */
            AnimateAction.prototype.setDuration = function (d) {
                if (this._animation) {
                    _super.prototype.setDuration.call(this, this._animation.getDuration());
                }

                return this;
            };

            /**
            * Update target Node's SpriteFrame.
            * {@link cc.action.Action#update}
            * @method cc.action.AnimateAction#update
            * @override
            * @return {number} Applied transparency value.
            */
            AnimateAction.prototype.update = function (normalizedTime, target) {
                var index = (normalizedTime * (this._animation.getSize() - 1)) >> 0;

                if (index >= 0 && index < this._animation.getSize()) {
                    target.setSpriteFrame(this._animation.getSpriteFrameAtIndex(index));
                }

                return index;
            };

            /**
            * Calculate one repetition duration. Must be explictly set for V3 bacwards compatiblity and
            * a call to Animate with an still loading animation. This is messy and wrong, but must be.
            * @method cc.action.AnimateAction#getOneRepetitionDuration
            * @returns {number}
            */
            AnimateAction.prototype.getOneRepetitionDuration = function () {
                return (this._animation.getDuration() + this._delayAfterApplication) * this._speed;
            };

            /**
            * This method does nothing.
            * {@link cc.action.Action#solveInitialValues}
            * @method cc.action.AnimateAction#solveInitialValues
            * @override
            */
            AnimateAction.prototype.solveInitialValues = function (node) {
            };

            /**
            * Initialize the action with a target node.
            * {@link cc.action.Action#initWithTarget}
            * @method cc.action.AnimateAction#initWithTarget
            * @override
            */
            AnimateAction.prototype.initWithTarget = function (node) {
                this._originalSpriteFrame = node._spriteFrame;
                this.solveInitialValues(node);
            };

            /**
            * {@link cc.action.Action#to}
            * @method cc.action.AnimateAction#to
            * @override
            */
            AnimateAction.prototype.to = function (a) {
                this.setAnimation(a);
                return this;
            };

            /**
            * Specific clone implementation function
            * {@link cc.action.Action#__cloneImpl}
            * @method cc.action.AnimateAction#__cloneImpl
            * @override
            * @private
            */
            AnimateAction.prototype.__cloneImpl = function () {
                var copy = new AnimateAction();
                copy.to(this._animation.clone());
                copy._originalSpriteFrame = this._originalSpriteFrame;

                this.__genericCloneProperties(copy);

                return copy;
            };

            /**
            * Stop the Action. If at Action initialization time a originalSpriteFrame was set, and the Animation specifies
            * restore original frame, the original SpriteFrame is set.
            * @param node
            */
            AnimateAction.prototype.stop = function (node) {
                _super.prototype.stop.call(this, node);
                if (this._animation._restoreOriginalFrame) {
                    node.setSpriteFrame(this._originalSpriteFrame);
                }
            };
            return AnimateAction;
        })(Action);
        action.AnimateAction = AnimateAction;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=AnimateAction.js.map

/**
* License: see license.txt file
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="../math/Point.ts"/>
    /// <reference path="../math/path/Segment.ts"/>
    /// <reference path="../node/Node.ts"/>
    /// <reference path="./Action.ts"/>
    (function (action) {
        "use strict";

        var Action = cc.action.Action;

        var __PathActionUpdateValue = { x: 0, y: 0 };

        

        /**
        * @class cc.action.PathAction
        * @classdesc
        * This action applies to a node's position.
        * The action will traverse a Segment path which can be a simple line or a complex path built out of a collection
        * of Segments and Paths. When traversing through out a simple linear path, prefer MoveAction in favor of this one.
        *
        * <p>
        *     Warning
        * <p>
        * The behavior for relative PathAction (equivalent for example to BezierBy in CocosJS V3 API) is intuitive: the
        * node will add the resulting traversal path to the Node position.
        * For non relative PathActions (for example, the older V3 BezierTo action) is not that clear:
        * + upon a call to <code>initWithNode</code> the Path points will have substracted the current node position and
        *   the first path point will be 0,0 (like in relative actions).
        * + upon a call to <code>update</code> the Path will be solved, and then will have added the node's position
        *   captured during the call to <code>initWithNode</code>.
        *
        * This means, the absolute PathAction will be treated as a relative action, with a modified path.
        *
        * @see cc.action.MoveAction
        */
        var PathAction = (function (_super) {
            __extends(PathAction, _super);
            /**
            * Build a new PathAction
            * @method cc.action.PathAction#constructor
            * @param data {cc.action.PathActionInitializer=}
            */
            function PathAction(data) {
                _super.call(this);
                /**
                * Node's original x position.
                * @member cc.action.PathAction#_originalX
                * @type {number}
                * @private
                */
                this._originalX = 0;
                /**
                * Node's original y position.
                * @member cc.action.PathAction#_originalX
                * @type {number}
                * @private
                */
                this._originalY = 0;
                this._segment = null;

                if (typeof data !== "undefined") {
                    // BUGBUG initializer must have serializable data.
                    this._segment = data.segment;
                    if (typeof data.relative !== "undefined") {
                        this.setRelative(data.relative);
                    }
                }
            }
            /**
            * Update target Node's position.
            * {@link cc.action.Action#update}
            * @method cc.action.PathAction#update
            * @override
            * @return {cc.math.Point} new Node position.
            */
            PathAction.prototype.update = function (delta, node) {
                var pos = this._segment.getValueAt(delta);
                var x = pos.x;
                var y = pos.y;

                x += this._originalX;
                y += this._originalY;

                //if ( this._relativeAction ) {
                if (this._reversed) {
                    var fp = this._segment.getEndingPoint();
                    x -= fp.x;
                    y -= fp.y;
                }

                //}
                node.setPosition(x, y);

                __PathActionUpdateValue.x = x;
                __PathActionUpdateValue.y = y;

                return __PathActionUpdateValue;
            };

            /**
            * Capture before-application Node's property values.
            * {@link cc.action.Action#solveInitialValues}
            * @method cc.action.PathAction#solveInitialValues
            * @override
            */
            PathAction.prototype.solveInitialValues = function (node) {
                if (!this.isRelative()) {
                    // older Cocos2D implelentation expects the following:
                    // current node position will be the first control point of the Segment.
                    // all other segment points will have node's position substracted.
                    var points = this._segment.getControlPoints();

                    if (points.length) {
                        for (var i = 1; i < points.length; i++) {
                            points[i].x -= node._position.x;
                            points[i].y -= node._position.y;
                        }

                        points[0].x = 0;
                        points[0].y = 0;
                    }

                    this._segment.setDirty();
                    this._segment.getLength();
                }
            };

            /**
            * {@link cc.action.Action#initWithTarget}
            * @method cc.action.PathAction#initWithTarget
            * @override
            */
            PathAction.prototype.initWithTarget = function (node) {
                this._originalX = node._position.x;
                this._originalY = node._position.y;

                this.solveInitialValues(node);
            };

            /**
            * {@link cc.action.Action#from}
            * @method cc.action.PathAction#from
            * @override
            */
            PathAction.prototype.from = function (point) {
                _super.prototype.from.call(this, point);

                return this;
            };

            /**
            * {@link cc.action.Action#to}
            * @method cc.action.PathAction#to
            * @override
            */
            PathAction.prototype.to = function (point) {
                return this;
            };

            /**
            * {@link cc.action.Action#__cloneImpl}
            * @method cc.action.PathAction#__cloneImpl
            * @override
            */
            PathAction.prototype.__cloneImpl = function () {
                var copy = new PathAction();
                copy._segment = this._segment.clone();

                this.__genericCloneProperties(copy);

                return copy;
            };
            return PathAction;
        })(Action);
        action.PathAction = PathAction;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=PathAction.js.map

/**
* License: see license.txt file
*/
/// <reference path="../math/Point.ts"/>
/// <reference path="../node/Node.ts"/>
/// <reference path="./Action.ts"/>
"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    (function (action) {
        var Action = cc.action.Action;
        var Vector = cc.math.Vector;

        var __v0 = new Vector();

        

        /**
        * @class cc.action.JumpAction
        * @classdesc
        *
        * This action applies to a node's position by bouncing up to a given altitude.
        */
        var JumpAction = (function (_super) {
            __extends(JumpAction, _super);
            /**
            * JumpAction constructor.
            * @method cc.action.JumpAction#constructor
            * @param data {cc.action.JumpActionInitializer=}
            */
            function JumpAction(data) {
                _super.call(this);
                /**
                * Node's original x position.
                * @member cc.action.MoveAction#_originalX
                * @type {number}
                * @private
                */
                this._originalX = 0;
                /**
                * Node's original y position.
                * @member cc.action.JumpAction#_originalX
                * @type {number}
                * @private
                */
                this._originalY = 0;
                /**
                * Action jump height.
                * @member cc.action.JumpAction#_amplitude
                * @type {number}
                * @private
                */
                this._amplitude = 80;
                /**
                * Number of jumps to perform.
                * @member cc.action.JumpAction#_jumps
                * @type {number}
                * @private
                */
                this._jumps = 1;
                this._jumpTo = null;

                if (typeof data !== "undefined") {
                    this._amplitude = data.amplitude;
                    this._jumps = data.jumps;
                    this._jumpTo = new Vector(data.position.x, data.position.y);

                    if (typeof data.relative !== "undefined") {
                        this.setRelative(data.relative);
                    }
                }
            }
            /**
            * Update target Node's position.
            * {@link cc.action.Action#update}
            * @method cc.action.JumpAction#update
            * @override
            * @return {number} Applied transparency value.
            */
            JumpAction.prototype.update = function (delta, node) {
                var frac = delta * this._jumps % 1.0;
                var y = this._amplitude * 4 * frac * (1 - frac);
                y += this._jumpTo.y * delta;

                var x = this._jumpTo.x * delta;

                x += this._originalX;
                y += this._originalY;

                if (this._relativeAction) {
                    if (this._reversed) {
                        x -= this._jumpTo.x;
                        y -= this._jumpTo.y;
                    }
                }

                node.setPosition(x, y);

                return __v0.set(x, y);
            };

            /**
            * Capture before-application Node's property values.
            * {@link cc.action.Action#solveInitialValues}
            * @method cc.action.JumpAction#solveInitialValues
            * @override
            */
            JumpAction.prototype.solveInitialValues = function (node) {
            };

            /**
            * {@link cc.action.Action#initWithTarget}
            * @method cc.action.JumpAction#initWithTarget
            * @override
            */
            JumpAction.prototype.initWithTarget = function (node) {
                this._originalX = node._position.x;
                this._originalY = node._position.y;

                if (!this._relativeAction) {
                    this._jumpTo.x -= this._originalX;
                    this._jumpTo.y -= this._originalY;
                }

                this.solveInitialValues(node);
            };

            /**
            * {@link cc.action.Action#__cloneImpl}
            * @method cc.action.JumpAction#__cloneImpl
            * @override
            */
            JumpAction.prototype.__cloneImpl = function () {
                var copy = new JumpAction();

                copy._amplitude = this._amplitude;
                copy._jumps = this._jumps;
                copy._jumpTo = new Vector(this._jumpTo.x, this._jumpTo.y);

                this.__genericCloneProperties(copy);

                return copy;
            };
            return JumpAction;
        })(Action);
        action.JumpAction = JumpAction;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=JumpAction.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    /// <reference path="./Action.ts"/>
    /// <reference path="./SequenceAction.ts"/>
    /// <reference path="../node/Node.ts"/>
    (function (__action) {
        "use strict";

        var SequenceAction = cc.action.SequenceAction;

        var __index = 0;

        /**
        * @class cc.action.ActionInfo
        * @classdesc
        *
        * This class is the information an <code>ActionManager</code> manages and keeps track of an
        * <code>Action</code> and a <code>Node</code>. It is an internal class for ActionManagers.
        *
        * You will have no direct interaction with this class.
        *
        */
        var ActionInfo = (function () {
            function ActionInfo(_actionManager, _target, _action) {
                this._actionManager = _actionManager;
                this._target = _target;
                this._action = _action;
                this._chain = null;
            }
            ActionInfo.prototype.__action = function (bh) {
                bh.__setOwner(this._actionManager);
                if (this._chain !== null) {
                    bh._chainAction = this._chain._action;
                }
                this._action = bh;
                bh.setTag("tag" + __index++);
                return bh;
            };

            ActionInfo.prototype.action = function (action) {
                var a = this.__action(action);

                /**
                * When calling this method, there's no explicit action duration set, which solves time chaining whith a previous action.
                * This naive operation, forces chain solve.
                * BUGBUG refactor.
                */
                a.setDelay(a._startTime);
                return a;
            };

            ActionInfo.prototype.actionMove = function () {
                return this.__action(new __action.MoveAction());
            };

            ActionInfo.prototype.actionRotate = function () {
                return this.__action(new __action.RotateAction());
            };

            ActionInfo.prototype.actionProperty = function () {
                return this.__action(new __action.PropertyAction());
            };

            ActionInfo.prototype.actionAlpha = function () {
                return this.__action(new __action.AlphaAction());
            };

            ActionInfo.prototype.actionTint = function () {
                return this.__action(new __action.TintAction());
            };

            ActionInfo.prototype.actionScale = function () {
                return this.__action(new __action.ScaleAction());
            };

            ActionInfo.prototype.actionSequence = function () {
                return this.__action(new SequenceAction());
            };

            ActionInfo.prototype.endSequence = function () {
                return this._action._parentSequence;
            };

            ActionInfo.prototype.step = function (elapsedTime) {
                this._action.step(elapsedTime, this._target);
            };

            ActionInfo.prototype.isFinished = function () {
                return this._action.isFinished();
            };

            ActionInfo.prototype.pause = function () {
                this._action.pause(this._target);
            };

            ActionInfo.prototype.resume = function () {
                this._action.resume();
            };

            ActionInfo.prototype.setChain = function (actionInfo) {
                this._chain = actionInfo;
            };

            ActionInfo.prototype.stop = function () {
                this._action.stop(this._target);
            };
            return ActionInfo;
        })();
        __action.ActionInfo = ActionInfo;

        /**
        * @class cc.action.ActionManager
        * @classdesc
        *
        * An <code>ActionManager</code> object manages and handles Actions ({@link cc.action.Action}).
        * Each <code>Scene</code> has an instance for managing its nodes Actions, and each <code>Director</code> has
        * another instance for handling Scene <code>Transitions</code> ({@link cc.transition.Transition}).
        * <br>
        * The ActionManager has a virtual timeline fed by Directors or Scenes.
        * On average, no direct interaction with this class will happen.
        * <br>
        * This class also offers a new API interface for adding actions to a Node. For example:
        *
        * <pre>
        * am.startChainingActionsForNode(n0).
        *        actionSequence().
        *            setRepeatForever().
        *            actionRotate().
        *                to(360).
        *                setRelative(true).
        *                setDuration(1000).
        *            actionSequence().
        *                actionScale().
        *                    to({ x: .5, y: .5 }).
        *                    setRelative(true).
        *                    setDuration(1500).
        *                actionRotate().
        *                    to(0).
        *                    setRelative(true).
        *                    setDuration(1500).
        *            endSequence().
        * </pre>
        *
        */
        var ActionManager = (function () {
            function ActionManager() {
                /**
                * Collection of pairs of Node-Action to execute.
                * @member cc.action.ActionManager#_actionInfos
                * @type {Array<cc.action.ActionInfo>}
                * @private
                */
                this._actionInfos = [];
            }
            /**
            * Associate a target with an action.
            * This method is useful when you pretend to reuse predefined behavior objects.
            * @method cc.action.ActionManager#scheduleActionForNode
            * @param target {cc.node.Node}
            * @param action {cc.action.Action}
            * @returns {ActionInfo}
            */
            ActionManager.prototype.scheduleActionForNode = function (target, action) {
                var tw = new ActionInfo(this, target);
                tw.action(action);
                this._actionInfos.push(tw);

                return this;
            };

            /**
            * Start a chaining actions for a Node.
            * @method cc.action.ActionManager#startChainingActionsForNode
            * @param target {cc.node.Node} normally a Node, but could be any other object.
            * @returns {cc.action.ActionInfo}
            */
            ActionManager.prototype.startChainingActionsForNode = function (target) {
                var ai = new ActionInfo(this, target);
                this._actionInfos.push(ai);
                return ai;
            };

            /**
            * Helper method to build a new ActionInfo with basic information.
            * @method cc.action.ActionManager#__newActionInfo
            * @returns {cc.action.ActionInfo}
            * @private
            */
            ActionManager.prototype.__newActionInfo = function () {
                var ai = new ActionInfo(this, this._actionInfos[this._actionInfos.length - 1]._target);
                this._actionInfos.push(ai);
                return ai;
            };

            /**
            * Create and add a MoveAction object to the current Node.
            * @method cc.action.ActionManager#actionMove
            * @returns {cc.action.Action}
            */
            ActionManager.prototype.actionMove = function () {
                return this.__newActionInfo().actionMove();
            };

            /**
            * Create and add a RotateAction object to the current Node.
            * @method cc.action.ActionManager#actionRotate
            * @returns {cc.action.Action}
            */
            ActionManager.prototype.actionRotate = function () {
                return this.__newActionInfo().actionRotate();
            };

            /**
            * Create and add a AlphaAction object to the current Node.
            * @method cc.action.ActionManager#actionAlpha
            * @returns {cc.action.Action}
            */
            ActionManager.prototype.actionAlpha = function () {
                return this.__newActionInfo().actionAlpha();
            };

            /**
            * Create and add a TintAction object to the current Node.
            * @method cc.action.ActionManager#actionTint
            * @returns {cc.action.Action}
            */
            ActionManager.prototype.actionTint = function () {
                return this.__newActionInfo().actionTint();
            };

            /**
            * Create and add a ScaleAction object to the current Node.
            * @method cc.action.ActionManager#actionScale
            * @returns {cc.action.Action}
            */
            ActionManager.prototype.actionScale = function () {
                return this.__newActionInfo().actionScale();
            };

            /**
            * Create and add a PropertyAction object to the current Node.
            * @method cc.action.ActionManager#actionProperty
            * @returns {Action}
            */
            ActionManager.prototype.actionProperty = function () {
                return this.__newActionInfo().actionProperty();
            };

            /**
            * Create and add a SequenceAction object to the current Node.
            * @method cc.action.ActionManager#actionSequence
            * @returns {SequenceAction}
            */
            ActionManager.prototype.actionSequence = function () {
                return this.__newActionInfo().actionSequence();
            };

            /**
            * Chain an action to the previous one. Chaining will make them sequential in time.
            * @method cc.action.ActionManager#then
            * @returns {cc.action.ActionInfo}
            */
            ActionManager.prototype.then = function () {
                var ltw = this._actionInfos[this._actionInfos.length - 1];
                var tw = this.startChainingActionsForNode(ltw._target);
                tw.setChain(ltw);
                return tw;
            };

            /**
            * Execute all scheduled Actions in this ActionManager.
            * @method cc.action.ActionManager#step
            */
            ActionManager.prototype.step = function (elapsedTime) {
                var i;
                var someActionsFinished = false;

                // prevent that added actions from callbacks from messing around.
                var len = this._actionInfos.length;

                for (i = 0; i < len; i++) {
                    this._actionInfos[i].step(elapsedTime);
                    if (this._actionInfos[i].isFinished()) {
                        someActionsFinished = true;
                    }
                }

                if (someActionsFinished) {
                    var actions = [];
                    for (i = 0; i < this._actionInfos.length; i++) {
                        if (!this._actionInfos[i].isFinished()) {
                            actions.push(this._actionInfos[i]);
                        }
                    }
                    this._actionInfos = actions;
                }
            };

            /**
            * Pause all Actions.
            * @method cc.action.ActionManager#pauseAll
            */
            ActionManager.prototype.pauseAll = function () {
                for (var i = 0; i < this._actionInfos.length; i++) {
                    this._actionInfos[i].pause();
                }
            };

            /**
            * Resume all Paused Actions.
            * @method cc.action.ActionManager#resumeAll
            */
            ActionManager.prototype.resumeAll = function () {
                for (var i = 0; i < this._actionInfos.length; i++) {
                    this._actionInfos[i].resume();
                }
            };

            /**
            * Get the number of scheduled actions (in any state).
            * @method cc.action.ActionManager#getNumActions
            * @returns {number} number of actions.
            */
            ActionManager.prototype.getNumActions = function () {
                return this._actionInfos.length;
            };

            /**
            * Get the number of scheduled actions (in any state).
            * @method cc.action.ActionManager#getNumActionsForNode
            * @param node {cc.node.Node} Node to check for actions.
            * @returns {number} number of actions for the Node.
            */
            ActionManager.prototype.getNumActionsForNode = function (node) {
                var count = 0;

                for (var i = 0; i < this._actionInfos.length; i++) {
                    if (this._actionInfos[i]._target === node) {
                        count++;
                    }
                }

                return count;
            };
            return ActionManager;
        })();
        __action.ActionManager = ActionManager;
    })(cc.action || (cc.action = {}));
    var action = cc.action;
})(cc || (cc = {}));
//# sourceMappingURL=ActionManager.js.map

/**
* License: see license.txt file.
*/
/// <reference path="../math/Point.ts"/>
/// <reference path="../math/path/Segment.ts"/>
/// <reference path="../math/path/SegmentBezier.ts"/>
/// <reference path="../node/Node.ts"/>
/// <reference path="../node/sprite/Animation.ts"/>
/// <reference path="../action/Action.ts"/>
/// <reference path="../action/MoveAction.ts"/>
/// <reference path="../action/RotateAction.ts"/>
/// <reference path="../action/ScaleAction.ts"/>
/// <reference path="../action/PropertyAction.ts"/>
/// <reference path="../action/SequenceAction.ts"/>
/// <reference path="../action/TintAction.ts"/>
/// <reference path="../action/AlphaAction.ts"/>
/// <reference path="../action/AnimateAction.ts"/>
/// <reference path="../action/PathAction.ts"/>
/// <reference path="../action/JumpAction.ts"/>
/// <reference path="../action/TimeInterpolator.ts"/>
var cc;
(function (cc) {
    "use strict";

    var Action = cc.action.Action;
    var MoveAction = cc.action.MoveAction;
    var RotateAction = cc.action.RotateAction;
    var PropertyAction = cc.action.PropertyAction;
    var SequenceAction = cc.action.SequenceAction;
    var TintAction = cc.action.TintAction;
    var AlphaAction = cc.action.AlphaAction;
    var ScaleAction = cc.action.ScaleAction;
    var AnimateAction = cc.action.AnimateAction;
    var PathAction = cc.action.PathAction;
    var JumpAction = cc.action.JumpAction;
    var SegmentBezier = cc.math.path.SegmentBezier;

    var Interpolator = cc.action.Interpolator;

    /**
    * Create a Animate like <code>AnimateAction</code> action.
    * @method cc.animate
    * @param animation {cc.node.sprite.Animation}
    * @returns {Action}
    */
    function animate(animation) {
        return new AnimateAction(animation);
    }
    cc.animate = animate;

    function callFunc(fn, _this, data) {
        return new Action().onEnd(function (action, target) {
            if (typeof _this !== "undefined") {
                fn.call(_this, target, data);
            } else {
                fn(target, data);
            }
        });
    }
    cc.callFunc = callFunc;

    function show() {
        return new Action().onEnd(function (action, target) {
            target.setVisible(!action._reversed);
        });
    }
    cc.show = show;

    function toggleVisibility() {
        return new Action().onEnd(function (action, target) {
            target.setVisible(!target._visible);
        });
    }
    cc.toggleVisibility = toggleVisibility;

    function hide() {
        return new Action().onEnd(function (action, target) {
            target.setVisible(action._reversed);
        });
    }
    cc.hide = hide;

    function place(v) {
        return new Action().onEnd(function (action, target) {
            target.setPosition(v.x, v.y);
        });
    }
    cc.place = place;

    function blink(timeInSecs, blinks) {
        var originalVisibility = true;

        var action = new Action().timeInfo(0, 1000 * timeInSecs).onStart(function (action, node) {
            originalVisibility = node._visible;
        }).onEnd(function (action, node) {
            node.setVisible(originalVisibility);
        });

        action.update = function (delta, node) {
            delta %= 1 / blinks;
            node.setVisible(delta >= 1 / blinks / 2);
        };

        return action;
    }
    cc.blink = blink;

    function jumpTo(timeInSecs, pos, amplitude, jumps) {
        if (typeof jumps === "undefined") { jumps = 1; }
        return __jump(timeInSecs, pos, amplitude, jumps, false);
    }
    cc.jumpTo = jumpTo;

    function jumpBy(timeInSecs, pos, amplitude, jumps) {
        if (typeof jumps === "undefined") { jumps = 1; }
        return __jump(timeInSecs, pos, amplitude, jumps, true);
    }
    cc.jumpBy = jumpBy;

    function __jump(timeInSecs, pos, amplitude, jumps, relative) {
        return new JumpAction({
            position: pos,
            jumps: jumps,
            amplitude: amplitude,
            relative: relative
        }).timeInfo(0, timeInSecs * 1000);
    }

    function __bezier(timeInSecs, p, relative) {
        var pa = new PathAction({
            segment: new SegmentBezier({
                p0: { x: 0, y: 0 },
                p1: p[0],
                p2: p[1],
                p3: p[2]
            })
        }).setRelative(relative).timeInfo(0, timeInSecs * 1000);

        return pa;
    }

    function bezierTo(timeInSecs, p) {
        return __bezier(timeInSecs, p, false);
    }
    cc.bezierTo = bezierTo;

    function bezierBy(timeInSecs, p) {
        return __bezier(timeInSecs, p, true);
    }
    cc.bezierBy = bezierBy;

    function __move(timeInSecs, p, relative) {
        return new MoveAction().to(p).setRelative(relative).timeInfo(0, timeInSecs * 1000);
    }

    /**
    * Create a moveTo like <code>MoveAction</code> action.
    * @method cc.moveTo
    * @param timeInSecs {number}
    * @param p {cc.math.Point}
    * @returns {Action}
    */
    function moveTo(timeInSecs, p) {
        return __move(timeInSecs, p, false);
    }
    cc.moveTo = moveTo;

    /**
    * Create a moveBy like <code>MoveAction</code> action.
    * @method cc.moveBy
    * @param timeInSecs {number}
    * @param p {cc.math.Point}
    * @returns {Action}
    */
    function moveBy(timeInSecs, p) {
        return __move(timeInSecs, p, true);
    }
    cc.moveBy = moveBy;

    function __scale(timeInSecs, x, y, relative) {
        return new ScaleAction().to({ x: x, y: y }).setRelative(relative).timeInfo(0, timeInSecs * 1000);
    }

    /**
    * Create a scaleTo like <code>ScaleAction</code> action.
    * @method cc.scaleTo
    * @param timeInSecs {number}
    * @param x {number}
    * @param y {number}
    * @returns {Action}
    */
    function scaleTo(timeInSecs, x, y) {
        return __scale(timeInSecs, x, typeof y === "undefined" ? x : y, false);
    }
    cc.scaleTo = scaleTo;

    /**
    * Create a scaleBy like <code>ScaleAction</code> action.
    * @method cc.scaleBy
    * @param timeInSecs {number}
    * @param x {number}
    * @param y {number}
    * @returns {Action}
    */
    function scaleBy(timeInSecs, x, y) {
        return __scale(timeInSecs, x, typeof y === "undefined" ? x : y, true);
    }
    cc.scaleBy = scaleBy;

    function __rotate(timeInSecs, a, relative) {
        return new RotateAction().to(a).setRelative(relative).timeInfo(0, timeInSecs * 1000);
    }

    /**
    * Create a rotateTo like <code>RotateAction</code> action.
    * @method cc.rotateTo
    * @param timeInSecs {number}
    * @param a {number}
    * @returns {Action}
    */
    function rotateTo(timeInSecs, a) {
        return __rotate(timeInSecs, a, false);
    }
    cc.rotateTo = rotateTo;

    /**
    * Create a rotateBy like <code>RotateAction</code> action.
    * @method cc.rotateBy
    * @param timeInSecs {number}
    * @param a {number}
    * @returns {Action}
    */
    function rotateBy(timeInSecs, a) {
        return __rotate(timeInSecs, a, true);
    }
    cc.rotateBy = rotateBy;

    /**
    * Create a fadeIn like <code>AlphaAction</code> action.
    * @method cc.fadeIn
    * @param timeInSecs {number}
    * @returns {cc.action.Action}
    */
    function fadeIn(timeInSecs) {
        return new AlphaAction().from(0).to(1).timeInfo(0, timeInSecs * 1000);
    }
    cc.fadeIn = fadeIn;

    /**
    * Create a fadeIn like <code>AlphaAction</code> action.
    * @method cc.fadeOut
    * @param timeInSecs {number}
    * @returns {cc.action.Action}
    */
    function fadeOut(timeInSecs) {
        return new AlphaAction().from(1).to(0).timeInfo(0, timeInSecs * 1000);
    }
    cc.fadeOut = fadeOut;

    function __fade(timeInSecs, a, relative) {
        return new AlphaAction().to(a).setRelative(relative).timeInfo(0, timeInSecs * 1000);
    }

    /**
    * Create a fadeTo like <code>AlphaAction</code> action.
    * @method cc.fadeTo
    * @param timeInSecs {number}
    * @param a {number}
    * @returns {Action}
    */
    function fadeTo(timeInSecs, a) {
        return __fade(timeInSecs, a, false);
    }
    cc.fadeTo = fadeTo;

    /**
    * Create a fadeBy like <code>AlphaAction</code> action.
    * @method cc.fadeBy
    * @param timeInSecs {number}
    * @param a {number}
    * @returns {Action}
    */
    function fadeBy(timeInSecs, a) {
        return __fade(timeInSecs, a, true);
    }
    cc.fadeBy = fadeBy;

    function __tint(timeInSecs, r, g, b, relative) {
        return new TintAction().to({ r: r / 255, g: g / 255, b: b / 255 }).setRelative(relative).timeInfo(0, timeInSecs * 1000);
    }

    /**
    * Create a tintTo like <code>TintAction</code> action.
    * @method cc.tintTo
    * @param timeInSecs {number}
    * @param r {number}
    * @param g {number}
    * @param b {number}
    * @returns {Action}
    */
    function tintTo(timeInSecs, r, g, b) {
        return __tint(timeInSecs, r, g, b, false);
    }
    cc.tintTo = tintTo;

    /**
    * Create a tintBy like <code>TintAction</code> action.
    * @method cc.tintBy
    * @param timeInSecs {number}
    * @param r {number}
    * @param g {number}
    * @param b {number}
    * @returns {Action}
    */
    function tintBy(timeInSecs, r, g, b) {
        return __tint(timeInSecs, r, g, b, true);
    }
    cc.tintBy = tintBy;

    /**
    * Reverses the target action
    * @method cc.reverseTime
    * @param action {cc.action.Action}
    * @returns {cc.reverseTime}
    */
    function reverseTime(action) {
        action.setReversedTime(!action.isReversedTime());
        return this;
    }
    cc.reverseTime = reverseTime;

    /**
    * Make an action repeat a number of times.
    * @method cc.repeat
    * @param action {cc.action.Action}
    * @param times {number}
    * @returns {Action}
    */
    function repeat(action, times) {
        if (times < 1) {
            times = 1;
        }
        action.setRepeatTimes(times);
        return action;
    }
    cc.repeat = repeat;

    /**
    * Make an action repeat forever.
    * @method cc.repeatForever
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function repeatForever(action) {
        action.setRepeatForever();
        return action;
    }
    cc.repeatForever = repeatForever;

    /**
    * Create an action that waits the given time.
    * @method cc.delayTime
    * @param delayInSecs {number}
    * @returns {cc.action.Action}
    */
    function delayTime(delayInSecs) {
        return new PropertyAction().from({}).to({}).timeInfo(0, delayInSecs * 1000);
    }
    cc.delayTime = delayTime;

    function __sequence(sequential, actions) {
        var seq = new SequenceAction({ sequential: sequential });

        if (!actions.length) {
            return null;
        }

        for (var i = 0; i < actions.length; i++) {
            seq.addAction(actions[i]);
        }

        return seq;
    }
    cc.__sequence = __sequence;

    /**
    * Set an action speed.
    * @method cc.speed
    * @param action {cc.action.Action}
    * @param speed {number} speed 1 is the default speed. speed 2 will make the action to take twice the time.
    * @returns {Action}
    */
    function speed(action, speed) {
        action.setSpeed(speed);
        return action;
    }
    cc.speed = speed;

    /**
    * Create a Sequence of Actions.
    * Actions can be other Sequences or Spawns.
    * @method cc.sequence
    * @param actions {Array<cc.action.Action>}
    * @returns {SequenceAction}
    */
    function sequence() {
        var actions = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            actions[_i] = arguments[_i + 0];
        }
        return __sequence(true, actions);
    }
    cc.sequence = sequence;

    /**
    * Create a Spawn of Actions.
    * Actions can be other Sequences or Spawns.
    * @methos cc.spawn
    * @param actions {Array<cc.action.Action>}
    * @returns {SequenceAction}
    */
    function spawn() {
        var actions = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            actions[_i] = arguments[_i + 0];
        }
        return __sequence(false, actions);
    }
    cc.spawn = spawn;

    /**
    * Apply easing to an action time.
    * @method cc.easing
    * @param action {cc.action.Action}
    * @param interpolator {cc.action.TimeInterpolator}
    * @returns {Action}
    */
    function easing(action, interpolator) {
        return action.easing(interpolator);
    }
    cc.easing = easing;

    /**
    * Apply exponentialIn easing to an action. Exponent 2.
    * @method cc.easeExponentialIn
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeExponentialIn(action) {
        return easing(action, Interpolator.EaseExponentialIn(2, false, false));
    }
    cc.easeExponentialIn = easeExponentialIn;

    /**
    * Apply exponentialOut easing to an action. Exponent 2.
    * @method cc.easeExponentialOut
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeExponentialOut(action) {
        return easing(action, Interpolator.EaseExponentialOut(2, false, false));
    }
    cc.easeExponentialOut = easeExponentialOut;

    /**
    * Apply exponentialInOut easing to an action. Exponent 2.
    * @method cc.easeExponentialInOut
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeExponentialInOut(action) {
        return easing(action, Interpolator.EaseExponentialInOut(2, false, false));
    }
    cc.easeExponentialInOut = easeExponentialInOut;

    /**
    * Apply exponentialIn easing to an action. Exponent 2.
    * @method cc.easeQuadraticActionIn
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeQuadraticActionIn(action) {
        return easing(action, Interpolator.EaseExponentialIn(2, false, false));
    }
    cc.easeQuadraticActionIn = easeQuadraticActionIn;

    /**
    * Apply exponentialOut easing to an action. Exponent 2.
    * @method cc.easeQuadraticActionOut
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeQuadraticActionOut(action) {
        return easing(action, Interpolator.EaseExponentialOut(2, false, false));
    }
    cc.easeQuadraticActionOut = easeQuadraticActionOut;

    /**
    * Apply exponentialInOut easing to an action. Exponent 2.
    * @method cc.easeQuadraticActionInOut
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeQuadraticActionInOut(action) {
        return easing(action, Interpolator.EaseExponentialInOut(2, false, false));
    }
    cc.easeQuadraticActionInOut = easeQuadraticActionInOut;

    /**
    * Apply exponentialIn easing to an action. Exponent 3.
    * @method cc.easeCubicActionIn
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeCubicActionIn(action) {
        return easing(action, Interpolator.EaseExponentialIn(3, false, false));
    }
    cc.easeCubicActionIn = easeCubicActionIn;

    /**
    * Apply exponentialOut easing to an action. Exponent 3.
    * @method cc.easeCubicActionOut
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeCubicActionOut(action) {
        return easing(action, Interpolator.EaseExponentialOut(3, false, false));
    }
    cc.easeCubicActionOut = easeCubicActionOut;

    /**
    * Apply exponentialInOut easing to an action. Exponent 3.
    * @method cc.easeCubicActionInOut
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeCubicActionInOut(action) {
        return easing(action, Interpolator.EaseExponentialInOut(3, false, false));
    }
    cc.easeCubicActionInOut = easeCubicActionInOut;

    /**
    * Apply exponentialIn easing to an action. Exponent 4.
    * @method cc.easeQuarticlActionIn
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeQuarticlActionIn(action) {
        return easing(action, Interpolator.EaseExponentialIn(4, false, false));
    }
    cc.easeQuarticlActionIn = easeQuarticlActionIn;

    /**
    * Apply exponentialOut easing to an action. Exponent 4.
    * @method cc.easeQuarticActionOut
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeQuarticActionOut(action) {
        return easing(action, Interpolator.EaseExponentialOut(4, false, false));
    }
    cc.easeQuarticActionOut = easeQuarticActionOut;

    /**
    * Apply exponentialInOut easing to an action. Exponent 4.
    * @method cc.easeQuarticActionInOut
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeQuarticActionInOut(action) {
        return easing(action, Interpolator.EaseExponentialInOut(4, false, false));
    }
    cc.easeQuarticActionInOut = easeQuarticActionInOut;

    /**
    * Apply exponentialIn easing to an action. Exponent 5.
    * @method cc.easeQuinticlActionIn
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeQuinticlActionIn(action) {
        return easing(action, Interpolator.EaseExponentialIn(5, false, false));
    }
    cc.easeQuinticlActionIn = easeQuinticlActionIn;

    /**
    * Apply exponentialOut easing to an action. Exponent 5.
    * @method cc.easeQuinticlActionOut
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeQuinticActionOut(action) {
        return easing(action, Interpolator.EaseExponentialOut(5, false, false));
    }
    cc.easeQuinticActionOut = easeQuinticActionOut;

    /**
    * Apply exponentialInOut easing to an action. Exponent 5.
    * @method cc.easeQuinticlActionInOut
    * @param action {cc.action.Action}
    * @returns {Action}
    */
    function easeQuinticActionInOut(action) {
        return easing(action, Interpolator.EaseExponentialInOut(5, false, false));
    }
    cc.easeQuinticActionInOut = easeQuinticActionInOut;
})(cc || (cc = {}));
//# sourceMappingURL=Action.js.map

/**
* License: see license.txt file.
*/
/// <reference path="./Action.ts"/>
/*
* Cocos2D HTML5 Version 2 backwards compatibility actions.
* These symbols are optional to be used in V4 API.
*/
var cc;
(function (cc) {
    "use strict";

    (function (BezierTo) {
        BezierTo.create = cc.bezierTo;
    })(cc.BezierTo || (cc.BezierTo = {}));
    var BezierTo = cc.BezierTo;

    (function (BezierBy) {
        BezierBy.create = cc.bezierBy;
    })(cc.BezierBy || (cc.BezierBy = {}));
    var BezierBy = cc.BezierBy;

    (function (MoveTo) {
        MoveTo.create = cc.moveTo;
    })(cc.MoveTo || (cc.MoveTo = {}));
    var MoveTo = cc.MoveTo;

    (function (MoveBy) {
        MoveBy.create = cc.moveBy;
    })(cc.MoveBy || (cc.MoveBy = {}));
    var MoveBy = cc.MoveBy;

    (function (ScaleTo) {
        ScaleTo.create = cc.scaleTo;
    })(cc.ScaleTo || (cc.ScaleTo = {}));
    var ScaleTo = cc.ScaleTo;

    (function (ScaleBy) {
        ScaleBy.create = cc.scaleBy;
    })(cc.ScaleBy || (cc.ScaleBy = {}));
    var ScaleBy = cc.ScaleBy;

    (function (RotateTo) {
        RotateTo.create = cc.rotateTo;
    })(cc.RotateTo || (cc.RotateTo = {}));
    var RotateTo = cc.RotateTo;

    (function (RotateBy) {
        RotateBy.create = cc.rotateBy;
    })(cc.RotateBy || (cc.RotateBy = {}));
    var RotateBy = cc.RotateBy;

    (function (FadeIn) {
        FadeIn.create = cc.fadeIn;
    })(cc.FadeIn || (cc.FadeIn = {}));
    var FadeIn = cc.FadeIn;

    (function (FadeOut) {
        FadeOut.create = cc.fadeOut;
    })(cc.FadeOut || (cc.FadeOut = {}));
    var FadeOut = cc.FadeOut;

    (function (FadeTo) {
        FadeTo.create = cc.fadeTo;
    })(cc.FadeTo || (cc.FadeTo = {}));
    var FadeTo = cc.FadeTo;

    (function (FadeBy) {
        FadeBy.create = cc.fadeBy;
    })(cc.FadeBy || (cc.FadeBy = {}));
    var FadeBy = cc.FadeBy;

    (function (TintTo) {
        TintTo.create = cc.tintTo;
    })(cc.TintTo || (cc.TintTo = {}));
    var TintTo = cc.TintTo;

    (function (TintBy) {
        TintBy.create = cc.tintBy;
    })(cc.TintBy || (cc.TintBy = {}));
    var TintBy = cc.TintBy;

    (function (ReverseTime) {
        ReverseTime.create = cc.reverseTime;
    })(cc.ReverseTime || (cc.ReverseTime = {}));
    var ReverseTime = cc.ReverseTime;

    (function (Repeat) {
        Repeat.create = cc.repeat;
    })(cc.Repeat || (cc.Repeat = {}));
    var Repeat = cc.Repeat;

    (function (RepeatForever) {
        RepeatForever.create = cc.repeatForever;
    })(cc.RepeatForever || (cc.RepeatForever = {}));
    var RepeatForever = cc.RepeatForever;

    (function (DelayTime) {
        DelayTime.create = cc.delayTime;
    })(cc.DelayTime || (cc.DelayTime = {}));
    var DelayTime = cc.DelayTime;

    (function (Speed) {
        Speed.create = cc.speed;
    })(cc.Speed || (cc.Speed = {}));
    var Speed = cc.Speed;

    (function (Sequence) {
        Sequence.create = cc.sequence;
    })(cc.Sequence || (cc.Sequence = {}));
    var Sequence = cc.Sequence;

    (function (Spawn) {
        Spawn.create = cc.spawn;
    })(cc.Spawn || (cc.Spawn = {}));
    var Spawn = cc.Spawn;

    (function (Easing) {
        Easing.create = cc.easing;
    })(cc.Easing || (cc.Easing = {}));
    var Easing = cc.Easing;

    (function (EaseExponentialIn) {
        EaseExponentialIn.create = cc.easeExponentialIn;
    })(cc.EaseExponentialIn || (cc.EaseExponentialIn = {}));
    var EaseExponentialIn = cc.EaseExponentialIn;

    (function (EaseExponentialOut) {
        EaseExponentialOut.create = cc.easeExponentialOut;
    })(cc.EaseExponentialOut || (cc.EaseExponentialOut = {}));
    var EaseExponentialOut = cc.EaseExponentialOut;

    (function (EaseExponentialInOut) {
        EaseExponentialInOut.create = cc.easeExponentialInOut;
    })(cc.EaseExponentialInOut || (cc.EaseExponentialInOut = {}));
    var EaseExponentialInOut = cc.EaseExponentialInOut;

    (function (EaseQuadraticActionIn) {
        EaseQuadraticActionIn.create = cc.easeQuadraticActionIn;
    })(cc.EaseQuadraticActionIn || (cc.EaseQuadraticActionIn = {}));
    var EaseQuadraticActionIn = cc.EaseQuadraticActionIn;

    (function (EaseQuadraticActionOut) {
        EaseQuadraticActionOut.create = cc.easeQuadraticActionOut;
    })(cc.EaseQuadraticActionOut || (cc.EaseQuadraticActionOut = {}));
    var EaseQuadraticActionOut = cc.EaseQuadraticActionOut;

    (function (EaseQuadraticActionInOut) {
        EaseQuadraticActionInOut.create = cc.easeQuadraticActionInOut;
    })(cc.EaseQuadraticActionInOut || (cc.EaseQuadraticActionInOut = {}));
    var EaseQuadraticActionInOut = cc.EaseQuadraticActionInOut;

    (function (EaseCubicActionIn) {
        EaseCubicActionIn.create = cc.easeCubicActionIn;
    })(cc.EaseCubicActionIn || (cc.EaseCubicActionIn = {}));
    var EaseCubicActionIn = cc.EaseCubicActionIn;

    (function (EaseCubicActionOut) {
        EaseCubicActionOut.create = cc.easeCubicActionOut;
    })(cc.EaseCubicActionOut || (cc.EaseCubicActionOut = {}));
    var EaseCubicActionOut = cc.EaseCubicActionOut;

    (function (EaseCubicInOut) {
        EaseCubicInOut.create = cc.easeCubicActionInOut;
    })(cc.EaseCubicInOut || (cc.EaseCubicInOut = {}));
    var EaseCubicInOut = cc.EaseCubicInOut;

    (function (EaseQuarticActionIn) {
        EaseQuarticActionIn.create = cc.easeQuarticlActionIn;
    })(cc.EaseQuarticActionIn || (cc.EaseQuarticActionIn = {}));
    var EaseQuarticActionIn = cc.EaseQuarticActionIn;

    (function (EaseQuarticActionOut) {
        EaseQuarticActionOut.create = cc.easeQuarticActionOut;
    })(cc.EaseQuarticActionOut || (cc.EaseQuarticActionOut = {}));
    var EaseQuarticActionOut = cc.EaseQuarticActionOut;

    (function (EaseQuarticActionInOut) {
        EaseQuarticActionInOut.create = cc.easeQuarticActionInOut;
    })(cc.EaseQuarticActionInOut || (cc.EaseQuarticActionInOut = {}));
    var EaseQuarticActionInOut = cc.EaseQuarticActionInOut;

    (function (EaseQuinticActionIn) {
        EaseQuinticActionIn.create = cc.easeQuinticlActionIn;
    })(cc.EaseQuinticActionIn || (cc.EaseQuinticActionIn = {}));
    var EaseQuinticActionIn = cc.EaseQuinticActionIn;

    (function (EaseQuinticActionOut) {
        EaseQuinticActionOut.create = cc.easeQuinticActionOut;
    })(cc.EaseQuinticActionOut || (cc.EaseQuinticActionOut = {}));
    var EaseQuinticActionOut = cc.EaseQuinticActionOut;

    (function (EaseQuinticActionInOut) {
        EaseQuinticActionInOut.create = cc.easeQuinticActionInOut;
    })(cc.EaseQuinticActionInOut || (cc.EaseQuinticActionInOut = {}));
    var EaseQuinticActionInOut = cc.EaseQuinticActionInOut;

    (function (CallFunc) {
        CallFunc.create = cc.callFunc;
    })(cc.CallFunc || (cc.CallFunc = {}));
    var CallFunc = cc.CallFunc;

    (function (Animate) {
        Animate.create = cc.animate;
    })(cc.Animate || (cc.Animate = {}));
    var Animate = cc.Animate;

    (function (Show) {
        Show.create = cc.show;
    })(cc.Show || (cc.Show = {}));
    var Show = cc.Show;

    (function (Hide) {
        Hide.create = cc.hide;
    })(cc.Hide || (cc.Hide = {}));
    var Hide = cc.Hide;

    (function (Place) {
        Place.create = cc.place;
    })(cc.Place || (cc.Place = {}));
    var Place = cc.Place;

    (function (ToggleVisibility) {
        ToggleVisibility.create = cc.toggleVisibility;
    })(cc.ToggleVisibility || (cc.ToggleVisibility = {}));
    var ToggleVisibility = cc.ToggleVisibility;

    (function (JumpTo) {
        JumpTo.create = cc.jumpTo;
    })(cc.JumpTo || (cc.JumpTo = {}));
    var JumpTo = cc.JumpTo;

    (function (JumpBy) {
        JumpBy.create = cc.jumpBy;
    })(cc.JumpBy || (cc.JumpBy = {}));
    var JumpBy = cc.JumpBy;

    (function (Blink) {
        Blink.create = cc.blink;
    })(cc.Blink || (cc.Blink = {}));
    var Blink = cc.Blink;
})(cc || (cc = {}));
//# sourceMappingURL=ActionV2.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="../action/Action.ts"/>
    /// <reference path="./Node.ts"/>
    /// <reference path="./Director.ts"/>
    /// <reference path="../action/ActionManager.ts"/>
    /// <reference path="../render/RenderingContext.ts"/>
    (function (_node) {
        "use strict";

        var Node = cc.node.Node;

        var ActionManager = cc.action.ActionManager;

        

        /**
        * @class cc.node.Scene
        * @classdesc
        *
        * Scenes are specialized Nodes useful for separating in-game functional pieces.
        * For example, a Scene can be the game menu, another scene can be the game and another scene the results window.
        *
        * <li>At any given moment, only one scene can be running.
        *
        * <li>A Scene can not contain other Scenes, or any Director instance.
        * <li>The size of the scene will by default be the same as the Director, and hence, equal to the Canvas size.
        *
        * <li>A Scene manages all the Actions of all the Node's it contains.
        * <li>A scene manages chronometers/events independently to any other scene.
        *
        * <li>Every Node that hierarchically belongs to this Scene will have a reference to the Scene. This reference will be
        * set when the <code>Director</code> the Scene is running in calls <code>onEnter</code> on the scene.
        *
        * <li>There´ no limitation on how many Scenes can be in a game.
        *
        * <li>Scenes have no parent Node. This means that a call to <code>enumerateChildren</code> will take a Scene as the
        * root search point.
        * <li>An Scene logical parent is a Director object. Scenes have a Director instance in _director variable.
        *
        */
        var Scene = (function (_super) {
            __extends(Scene, _super);
            /**
            * Create a new Scene instance.
            * @method cc.node.Scene#constructor
            */
            function Scene() {
                _super.call(this);
                /**
                * Node's ActionManager.
                * @member cc.node.Scene#_actionManager
                * @type {cc.action.ActionManager}
                * @private
                */
                this._actionManager = new ActionManager();
                /**
                * Callback reference for onEnter event.
                * @member cc.node.Scene#_onEnter
                * @type {cc.node.CallbackSceneTransition}
                * @private
                */
                this._onEnter = null;
                /**
                * Callback reference for onExit event.
                * @member cc.node.Scene#_onExit
                * @type {cc.node.CallbackSceneTransition}
                * @private
                */
                this._onExit = null;
                /**
                * Callback reference for enter transition end event.
                * @member cc.node.Scene#_onEnterTransitionDidFinish
                * @type {cc.node.CallbackSceneTransition}
                * @private
                */
                this._onEnterTransitionDidFinish = null;
                /**
                * Callback reference for exit transition start event.
                * @member cc.node.Scene#_onExitTransitionDidStart
                * @type {cc.node.CallbackSceneTransition}
                * @private
                */
                this._onExitTransitionDidStart = null;
                /**
                * Director reference this scene belongs to.
                * @member cc.node.Scene#_director
                * @type {cc.node.Director}
                * @private
                */
                this._director = null;

                this.setPositionAnchor(0, 0);
            }
            /**
            * Increment scene's timeline.
            * This time is local to this scene, and independent to other Scene's time.
            * @method cc.node.Scene#step
            * @param delta {number} elapsed time in milliseconds.
            * @param ctx {cc.render.RenderingContext} where node's will render.
            */
            Scene.prototype.step = function (delta, ctx) {
                // allow for this scene's nodes actions to run.
                this._actionManager.step(delta);

                // draw scene and its children.
                this.visit(ctx);
            };

            /**
            * Register Scene onEnter callback.
            * @method cc.node.Scene#onEnter
            * @param c {cc.node.CallbackSceneTransition}
            * @returns {cc.node.Scene}
            */
            Scene.prototype.onEnter = function (c) {
                this._onEnter = c;
                return this;
            };

            /**
            * Register Scene onExit callback.
            * @method cc.node.Scene#onExit
            * @param c {cc.node.CallbackSceneTransition}
            * @returns {cc.node.Scene}
            */
            Scene.prototype.onExit = function (c) {
                this._onExit = c;
                return this;
            };

            /**
            * Register onExitTransitionStart callback. Called when scenes are switched by Transition objects.
            * @method cc.node.Scene#onExitTransitionDidStart
            * @param c {cc.node.CallbackSceneTransition}
            * @returns {cc.node.Scene}
            */
            Scene.prototype.onExitTransitionDidStart = function (c) {
                this._onExitTransitionDidStart = c;
                return this;
            };

            /**
            * Register onEnterTransitionFinish callback. Called when scenes are switched by Transition objects.
            * @method cc.node.Scene#onEnterTransitionDidFinish
            * @param c {cc.node.CallbackSceneTransition}
            * @returns {cc.node.Scene}
            */
            Scene.prototype.onEnterTransitionDidFinish = function (c) {
                this._onEnterTransitionDidFinish = c;
                return this;
            };

            /**
            * Notifiy event registered callback.
            * @method cc.node.Scene#callOnEnterTransitionDidFinish
            */
            Scene.prototype.callOnEnterTransitionDidFinish = function () {
                if (this._onEnterTransitionDidFinish) {
                    this._onEnterTransitionDidFinish(this);
                }
            };

            /**
            * Notifiy event registered callback.
            * @method cc.node.Scene#callOnExitTransitionDidStart
            */
            Scene.prototype.callOnExitTransitionDidStart = function () {
                if (this._onExitTransitionDidStart) {
                    this._onExitTransitionDidStart(this);
                }
            };

            /**
            * Notifiy event registered callback.
            * @method cc.node.Scene#callOnEnter
            */
            Scene.prototype.callOnEnter = function () {
                var scene = this;

                // recursively set scene for nodes.
                this.enumerateChildren("//*", function (node) {
                    node.setScene(scene);
                });

                if (this._onEnter) {
                    this._onEnter(this);
                }

                this.resetScene();
            };

            /**
            * Notify event registered callback.
            * @method cc.node.Scene#callOnExit
            */
            Scene.prototype.callOnExit = function () {
                if (this._onExit) {
                    this._onExit(this);
                }
            };

            /**
            * Overriden Node's method for set scene reference.
            * A scene does not need a scene reference.
            * @method cc.node.Scene#setScene
            * @param scene {cc.node.Scene}
            */
            Scene.prototype.setScene = function (scene) {
                // assert scene===this
            };

            /**
            * Overriden Node's method for setting a parent.
            * Scenes have no parent reference so this method does nothing.
            * @method cc.node.Scene#setParent
            * @param node {cc.node.Node}
            * @returns {cc.node.Scene}
            */
            Scene.prototype.setParent = function (node) {
                return this;
            };

            /**
            * Set Scene's Director reference.
            * Do not call directly.
            * @method cc.node.Scene#setDirector
            * @param node {cc.node.Director}
            * @returns {cc.node.Scene}
            */
            Scene.prototype.setDirector = function (node) {
                this._director = node;
                return this;
            };

            /**
            * Get Scene's director reference.
            * @method cc.node.Scene#getDirector
            * @returns {cc.node.Director}
            */
            Scene.prototype.getDirector = function () {
                return this._director;
            };

            Object.defineProperty(Scene.prototype, "director", {
                /**
                * Director getter.
                * @name cc.node.Scene#get:director
                * @returns {cc.node.Director}
                */
                get: function () {
                    return this._director;
                },
                /**
                * Director setter.
                * @name cc.node.Scene#set:director
                * @param v {cc.node.Director}
                */
                set: function (v) {
                    this._director = v;
                },
                enumerable: true,
                configurable: true
            });


            /**
            * Reset this scene's properties.
            * Needed if the scene is managed by a Transition since position/scale/rotate can be changed.
            * @method cc.node.Scene#resetScene
            * @returns {cc.node.Scene}
            */
            Scene.prototype.resetScene = function () {
                this.alpha = 1;
                this.setScale(1, 1);
                this.setPositionAnchor(0, 0);
                this.setTransformationAnchor(0.5, 0.5);
                this._visible = true;

                return this;
            };

            /**
            * Run an Action for a Node.
            * @method cc.node.Scene#scheduleActionForNode
            * @param node {cc.node.Node}
            * @param action {cc.action.Action}
            * @returns {cc.node.Scene}
            */
            Scene.prototype.scheduleActionForNode = function (node, action) {
                this._actionManager.scheduleActionForNode(node, action);
                return this;
            };

            /**
            * Clear all this scene contents.
            * + all children are removed.
            */
            Scene.prototype.clear = function () {
                this.removeAllChildren();
            };
            return Scene;
        })(Node);
        _node.Scene = Scene;
    })(cc.node || (cc.node = {}));
    var node = cc.node;
})(cc || (cc = {}));
//# sourceMappingURL=Scene.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="./Node.ts"/>
    /// <reference path="./Scene.ts"/>
    /// <reference path="../math/Dimension.ts"/>
    /// <reference path="../transition/Transition.ts"/>
    /// <reference path="../action/ActionManager.ts"/>
    /// <reference path="../locale/Locale.ts"/>
    /// <reference path="../util/Debug.ts"/>
    /// <reference path="../render/RenderingContext.ts"/>
    /// <reference path="../render/Renderer.ts"/>
    (function (node) {
        "use strict";

        var Node = cc.node.Node;
        var Scene = cc.node.Scene;
        var Debug = cc.Debug;
        var Locale = cc.locale;

        var ActionManager = cc.action.ActionManager;

        /**
        * Enumeration of Director status.
        *
        * @tsenum cc.node.DirectorStatus
        */
        (function (DirectorStatus) {
            DirectorStatus[DirectorStatus["CREATED"] = 0] = "CREATED";
            DirectorStatus[DirectorStatus["RUNNING"] = 1] = "RUNNING";
            DirectorStatus[DirectorStatus["PAUSED"] = 2] = "PAUSED";
            DirectorStatus[DirectorStatus["STOPPED"] = 3] = "STOPPED";
        })(node.DirectorStatus || (node.DirectorStatus = {}));
        var DirectorStatus = node.DirectorStatus;

        var __window = window;

        /**
        * @class cc.node.Director
        * @classdesc
        *
        * A Director object is the root node of a game.
        * <li>As the primary component, it is a glue which puts together platform features such as Input routing or Texture
        * and image caching, and Scenes and game logic.
        * <li>Each Director has a renderer, which acts on its own Canvas Object. Since V4, Cocos2D HTML5 allows for multiple
        * <li>Director instances and each one can have a different renderer type.
        *
        * <li>Every Director present in a Document, will share a common Texture and Image cache for better resource management.
        *
        * <li>A Director object runs Scenes. The process of switching scenes is handled using a <code>Transition</code> object.
        * <li>The preferred way of buiding scenes is by calling <code>director.createScene() -> Scene</code>
        *
        * @see{cc.node.Scene}
        * @see{cc.node.Transition}
        *
        */
        var Director = (function (_super) {
            __extends(Director, _super);
            /**
            * Create a new Director instance.
            * @method cc.node.Director#constructor
            */
            function Director() {
                _super.call(this);
                /**
                * Director status
                * @member cc.node.Director#_status
                * @type {number}
                * @private
                */
                this._status = 0 /* CREATED */;
                /**
                * Director's renderer.
                * @member cc.node.Director#_renderer
                * @type {cc.render.RenderingContext}
                * @private
                */
                this._renderer = null;
                /**
                * Scenes available in this Director.
                * @member cc.node.Director#_scenes
                * @type {Array}
                * @private
                */
                this._scenes = [];
                /**
                * requestAnimationFrame shim id.
                * @member cc.node.Director#_animFrame
                * @type {number}
                * @private
                */
                this._animFrame = null;
                /**
                * Ideal milliseconds between two frames.
                * @member cc.node.Director#_animationInterval
                * @type {number}
                * @private
                */
                this._animationInterval = 1000 / 60;
                /**
                * Currently running Scene.
                * @member cc.node.Director#_currentScene
                * @type {cc.node.Scene}
                * @private
                */
                this._currentScene = null;
                /**
                * If <code>runAction</code> is called with a Transition, _exitingScene will be the currently moving out scene.
                * For internal usage only.
                * @member cc.node.Director#_exitingScene
                * @type {cc.node.Scene}
                * @private
                */
                this._exitingScene = null;
                /**
                * Scenes action manager that manages Transition objects.
                * @member cc.node.Director#_scenesActionManager
                * @type {cc.action.ActionManager}
                * @private
                * @see {cc.transition.Transition}
                */
                this._scenesActionManager = new ActionManager();
                /**
                * Timer management. This value is the previous time the director run at.
                * @member cc.node.Director#_prevPerf
                * @type {number}
                * @private
                */
                this._prevPerf = 0;
            }
            Director.prototype.getRenderer = function () {
                return this._renderer;
            };

            /**
            * Set the Director's renderer.
            * @method cc.node.Director#setRenderingContext
            * @param ctx {cc.render.RenderingContext}
            * @returns {cc.node.Director}
            */
            Director.prototype.setRenderer = function (renderer) {
                this._renderer = renderer;
                this._contentSize.set(renderer.getContentSize());
                return this;
            };

            /**
            * Pause the Director.
            * The animation loop is stopped.
            * @method cc.node.Director#pause
            */
            Director.prototype.pause = function () {
                if (this._status === 2 /* PAUSED */) {
                    return;
                }

                this.stopAnimation();

                this._status = 2 /* PAUSED */;
            };

            /**
            * Resume a paused director.
            * The animation loop restarts.
            * @method cc.node.Director#resume
            */
            Director.prototype.resume = function () {
                if (this._status !== 2 /* PAUSED */) {
                    return;
                }

                this.startAnimation();
            };

            /**
            * Run a Scene.
            * Optionally use a transition for switching between scenes.
            * @method cc.node.Director#runScene
            * @param scene {cc.node.Scene}
            * @param transition {cc.transition.Transition}
            */
            Director.prototype.runScene = function (scene, transition) {
                var _this = this;
                if (this._scenes.indexOf(scene) !== -1) {
                    Debug.error(Locale.ERR_RUNNING_ALREADY_EXISTING_SCENE);
                    return;
                }

                this._scenes.push(scene);

                // only one scene, then start animation.
                if (this._scenes.length === 1) {
                    this.startAnimation();
                }

                // if there's a transition, let the transition handle onExit.
                if (typeof transition !== "undefined") {
                    this._exitingScene = this._currentScene;
                    transition.initialize(scene, this._currentScene).onDirectorTransitionEnd(function (tr) {
                        _this._exitingScene = null;
                    });
                } else {
                    // if not, and there's a current scene
                    if (this._currentScene) {
                        // call onExit.
                        this._currentScene.callOnExit();
                    }
                    this._exitingScene = null;

                    // scene entered w/o transition.
                    scene.callOnEnter();
                }

                this._currentScene = scene;
            };

            /**
            * Push a new running scene on top of the stack.
            * @method cc.node.Director#pushScene
            * @param scene {cc.node.Scene}
            */
            Director.prototype.pushScene = function (scene) {
                this.runScene(scene);
            };

            /**
            * Pop a scene from the running stack.
            * @method cc.node.Director#popScene
            * @throws cc.locale.Locale.ERR_DIRECTOR_POPSCENE_UDERFLOW if DEBUG_LEVEL is RuntimeDebugLevel.DEBUG.
            */
            Director.prototype.popScene = function () {
                if (this._scenes.length === 0) {
                    Debug.error(Locale.ERR_DIRECTOR_POPSCENE_UNDERFLOW);
                    return;
                }

                var exitScene = this._scenes.pop();
                exitScene.callOnExit();

                if (this._scenes.length > 0) {
                    this._currentScene = this._scenes[this._scenes.length - 1];
                    this._currentScene.callOnEnter();
                } else {
                    // PENDING end director.
                }
            };

            /**
            * Pop all scenes but one.
            * @method cc.node.Director#popToRootScene
            */
            Director.prototype.popToRootScene = function () {
                this.popToSceneStackLevel(1);
            };

            /**
            * Remove scenes from the stack until reaching 'level' scenes stack length.
            * @method cc.node.Director#popToSceneStackLevel
            * @param level {number}
            */
            Director.prototype.popToSceneStackLevel = function (level) {
                level = this._scenes.length - level;

                if (level <= 0) {
                    Debug.error(Locale.ERR_DIRECTOR_POPSCENE_UNDERFLOW);
                    return;
                }

                while (level) {
                    this.popScene();
                    level--;
                }
            };

            /**
            * Start Director's animation loop.
            * Don't call directly, or only call after manually calling <code>stopAnimation</code>
            * @method cc.node.Director#startAnimation
            */
            Director.prototype.startAnimation = function () {
                if (this._status === 1 /* RUNNING */) {
                    Debug.warn(Locale.WARN_START_ANIMATION_ON_RUNNING_DIRECTOR);
                    return;
                }

                this._status = 1 /* RUNNING */;

                var fn = this.mainLoop.bind(this);
                var me = this;

                function raf(perf) {
                    me.mainLoop(perf);
                    me._animFrame = __window.requestAnimFrame(raf);
                }

                this._animFrame = __window.requestAnimFrame(raf);
            };

            /**
            * Stop Director's animation loop.
            * The Director status will be STOPPED.
            * @method cc.node.Director#stopAnimation
            */
            Director.prototype.stopAnimation = function () {
                if (this._status !== 1 /* RUNNING */) {
                    return;
                }

                this._status = 3 /* STOPPED */;
                if (this._animFrame) {
                    __window.cancelAnimFrame(this._animFrame);
                    this._animFrame = -1;
                }
            };

            /**
            * Throttle animation loop.
            * This value will be the minimum millis to wait between two frames.
            * @method cc.node.Director#setAnimationInterval
            * @param interval {number}
            */
            Director.prototype.setAnimationInterval = function (interval) {
                this._animationInterval = interval;
            };

            /**
            * Main director animation Loop.
            * Don't call directly this method. It is called by startAnimation when the first scene is scheduled in the
            * Director object.
            *
            * PENDING: throttle FPS with _animationInterval value.
            *
            * @method cc.node.Director#mainLoop
            * @param perf {number=} performance time elapsed between two RAF calls.
            */
            Director.prototype.mainLoop = function (perf) {
                if (this._status !== 1 /* RUNNING */) {
                    return;
                }

                var deltaTime;

                if (typeof perf === "undefined") {
                    perf = new Date().getTime();
                }

                deltaTime = perf - this._prevPerf;

                // prevent feeding huge time increments. Useful for debugging.
                if (deltaTime > 250) {
                    deltaTime = 250;
                }

                this._prevPerf = perf;

                var ctx = this._renderer.getRenderingContext();

                // do director's paint as a node.
                // A director does not have any action associated, so just paint.
                this.visit(ctx);

                // Step time for active scenes.
                // At any given moment, as much as two scenes can be active.
                // If a transition is in place, two scenes will be active.
                // If not, only one scene is active.
                this._scenesActionManager.step(deltaTime);

                // do current scene's visit when
                // transitions end.
                if (this._exitingScene) {
                    this._exitingScene.step(deltaTime, ctx);
                }
                this._currentScene.step(deltaTime, ctx);

                if (this._renderer.flush) {
                    this._renderer.flush();
                }
            };

            /**
            * Create an scene object.
            * The created Scene will have the size of this director object and have a reference to the director.
            * @method cc.node.Director#createScene
            * @returns {cc.node.Scene}
            */
            Director.prototype.createScene = function () {
                var scene = new Scene();
                scene.setContentSize(this._contentSize.width, this._contentSize.height);
                scene.setDirector(this);

                return scene;
            };

            Director.prototype.getWinSize = function () {
                return this._contentSize.clone();
            };
            return Director;
        })(Node);
        node.Director = Director;
    })(cc.node || (cc.node = {}));
    var node = cc.node;
})(cc || (cc = {}));
//# sourceMappingURL=Director.js.map

/**
* Created by ibon on 11/17/14.
*/
var cc;
(function (cc) {
    (function (render) {
        /**
        * @class cc.render.Texture2D
        * @classdesc
        *
        * This Object encapsulated a rendering texture, either for Canvas or WebGL.
        * The texture will handle all the burden of creating a webgl texture when needed.
        *
        */
        var Texture2D = (function () {
            function Texture2D(el) {
                this._webglRenderingContext = null;
                this._glId = -1;
                this._textureWidth = 0;
                this._textureHeight = 0;
                this._image = null;
                this._hasMipmaps = false;
                this._u0 = 0;
                this._v0 = 0;
                this._u1 = 0;
                this._v1 = 0;
                // offset in image.
                this._offsetX = 0;
                this._offsetY = 0;
                // when image is set to texture, the original image is dismissed in favor of a new dummy image.
                // from then, calling image.width or image.height will give wrong values.
                this._imageWidth = 0;
                this._imageHeight = 0;
                this._isLoaded = false;
                if (el) {
                    this.initWithElement(el);
                }
            }
            Texture2D.prototype.initWithElement = function (el) {
                if (typeof el === "string") {
                    var image = new Image();
                    image.onload = (function (me) {
                        return function (e) {
                            me.initWithElement(e.target);
                        };
                    })(this);
                    image.src = el;
                } else {
                    this._image = el;
                    this._imageWidth = el.width;
                    this._imageHeight = el.height;
                    this._image._textureInfo = this;

                    this._isLoaded = true;
                }
            };

            Texture2D.prototype.getPixelsWide = function () {
                return this._imageWidth;
            };

            Texture2D.prototype.getPixelsHigh = function () {
                return this._imageHeight;
            };

            Texture2D.prototype.getImage = function () {
                return this._glId ? this._glId : this._image;
            };

            Texture2D.prototype.isWebGLEnabled = function () {
                return this._glId !== null;
            };

            /**
            *
            * @param gl {WebGLRenderingContext}
            * @returns {any}
            * @private
            */
            Texture2D.prototype.__setAsGLTexture = function (gl) {
                this._webglRenderingContext = gl;
                if (!gl) {
                    return;
                }

                function POT(v) {
                    var current = 1;
                    while (current < v) {
                        current <<= 1;
                    }
                    return current;
                }

                // already set as texture, do nothing.
                if (this._glId !== -1) {
                    return this._image;
                }

                this._glId = gl.createTexture();

                var iw = POT(this._image.width);
                var ih = POT(this._image.height);

                this._textureWidth = iw;
                this._textureHeight = ih;

                gl.bindTexture(gl.TEXTURE_2D, this._glId);
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, iw, ih, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
                gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, gl.RGBA, gl.UNSIGNED_BYTE, this._image);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                this._u1 = this._imageWidth / this._textureWidth;
                this._v1 = this._imageHeight / this._textureHeight;

                // BUGBUG Find a better way of doing this
                // reset previous image. get rid of it, and keep a dummy image with the appropriate gl texture id.
                var c = document.createElement("canvas");
                c.width = 1;
                c.height = 1;
                this._image = c;
                c._textureInfo = this;

                //this._image._textureInfo= this;
                return this;
            };

            Texture2D.prototype.setTexParameters = function (texParams, magFilter, wrapS, wrapT) {
                var gl = this._webglRenderingContext;
                if (!gl) {
                    return;
                }

                var minFilter;

                if (typeof magFilter === "undefined") {
                    magFilter = texParams.magFilter;
                    wrapS = texParams.wrapS;
                    wrapT = texParams.wrapT;
                    minFilter = texParams.minFilter;
                } else {
                    minFilter = texParams;
                }

                gl.bindTexture(gl.TEXTURE_2D, this._glId);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
            };

            Texture2D.prototype.setAntiAliasTexParameters = function () {
                var gl = this._webglRenderingContext;
                if (!gl) {
                    return;
                }

                gl.bindTexture(gl.TEXTURE_2D, this._glId);

                if (!this._hasMipmaps) {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                } else {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
                }

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            };

            Texture2D.prototype.setAliasTexParameters = function () {
                var gl = this._webglRenderingContext;
                if (!gl) {
                    return;
                }

                gl.bindTexture(gl.TEXTURE_2D, this._glId);

                if (!this._hasMipmaps) {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                } else {
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
                }
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            };

            Texture2D.prototype.generateMipmap = function () {
                var gl = this._webglRenderingContext;
                if (!gl) {
                    return;
                }

                gl.bindTexture(gl.TEXTURE_2D, this._glId);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
                gl.generateMipmap(gl.TEXTURE_2D);

                this._hasMipmaps = true;
            };
            return Texture2D;
        })();
        render.Texture2D = Texture2D;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=Texture2D.js.map

/**
* Created by ibon on 11/26/14.
*/
var cc;
(function (cc) {
    (function (node) {
        /// <reference path="../../math/Point.ts"/>
        /// <reference path="../../math/Rectangle.ts"/>
        /// <reference path="../Sprite.ts"/>
        /// <reference path="../../render/RenderingContext.ts"/>
        /// <reference path="../../render/Texture2D.ts"/>
        /// <reference path="../../locale/Locale.ts"/>
        /// <reference path="../../util/Debug.ts"/>
        (function (_sprite) {
            var Vector = cc.math.Vector;
            var Rectangle = cc.math.Rectangle;

            var getSpriteFrameName = (function () {
                var index = 0;
                return function () {
                    return "frame" + index++;
                };
            })();

            /**
            * @class cc.node.sprite.SpriteFrame
            * @classdesc
            *
            * This Object defines a pixels source (image, canvas, texture, etc.) and an associated Rect for image blitting
            * operations.
            * It has parent-child capabilities. A SpriteFrame can create subFrames. SubFrames will have a parent reference,
            * share the same Texture instance and will apply the appropriate offset.
            *
            */
            var SpriteFrame = (function () {
                /**
                * Create a new SpriteFrame instance.
                * @method cc.node.sprite.SpriteFrame#constructor
                * @param _texture {Texture2D} an string or Texture2D
                * @param rect {cc.math.Rectangle=} an optional rect on the texture. If not set, the whole image will be used.
                */
                function SpriteFrame(_texture, rect) {
                    this._texture = _texture;
                    /**
                    * Parent's SpriteFrame. When creating Frames from an image, a call to <code>spriteFrame.createFrame</code>
                    * will create a child of a frame, set its parent, and inherit the offseting based on parent's chain.
                    * Both frames will share the same Texture2D instance.
                    * @type {cc.node.SpriteFrame}
                    * @member cc.node.sprite.SpriteFrame#_parent
                    * @private
                    */
                    this._parent = null;
                    /**
                    * Offset position in texture.
                    * When setting parents, the offset will be the parent's position.
                    * @member cc.node.sprite.SpriteFrame#_offset
                    * @type {cc.math.Vector}
                    * @private
                    */
                    this._offset = new Vector();
                    /**
                    * Is the frame rotated ?. Not by default.
                    * @member cc.node.sprite.SpriteFrame#_rotated
                    * @type {boolean}
                    * @private
                    */
                    this._rotated = false;
                    /**
                    * Recatangle in pixels the SpriteFrame represents.
                    * @member cc.node.sprite.SpriteFrame#_rect
                    * @type {cc.math.Rectangle}
                    * @private
                    */
                    this._rect = null;
                    /**
                    * Recatangle in uv the SpriteFrame represents.
                    * @member cc.node.sprite.SpriteFrame#_rectgl
                    * @type {cc.math.Rectangle}
                    * @private
                    */
                    this._rectgl = new Rectangle();
                    /**
                    * Texture data. Texture is a source of pixels, either Image, Canvas or a GLTexture
                    * @member cc.node.sprite.SpriteFrame#_texture
                    * @type {cc.render.Texture2D}
                    * @private
                    */
                    /**
                    * The frames cache is shared by all the SpriteFrame objects that share a common root.
                    * When calling <code>spriteFrame.createSubSpriteFrame</code> the newly created SpriteFrame instance
                    * will share the same cache with the parent.
                    * This cache is a handy way of keeping all the SpriteFrame objects for atlas accessible.
                    */
                    this._framesCache = {};
                    /**
                    *
                    * @type {null}
                    * @private
                    */
                    this._name = null;
                    this._rect = rect ? rect : new Rectangle(0, 0, _texture._imageWidth, _texture._imageHeight);
                    this._name = "root";
                    this._framesCache[this._name] = this;
                }
                /**
                * Create a new SpriteFrame from this one. The rect will be relative to this SpriteFrame's rect and offset.
                * The rect supplied is clipped against this SpriteFrame's rect. If the resulting rect is Empty (has no dimension)
                * null will be returned.
                * @method cc.node.sprite.SpriteFrame#createSubSpriteFrame
                * @param x {number}
                * @param y {number}
                * @param w {number}
                * @param h {number}
                * @param name {string} a frame's name. If not set, "frameXXX" where XXX is a sequence value will be set.
                * @returns {SpriteFrame} a new SubSpriteFrame created from this one or null if the supplied rect does not
                *  intersect this SpriteFrame's rect.
                */
                SpriteFrame.prototype.createSubSpriteFrame = function (x, y, w, h, name) {
                    var newRect = new Rectangle(x, y, w, h);
                    newRect.intersectWith(this._rect);

                    if (newRect.isEmpty()) {
                        return null;
                    }

                    var sf = new SpriteFrame(this._texture, newRect);

                    if (typeof name === "undefined") {
                        name = getSpriteFrameName();
                    } else {
                        if (this._framesCache.hasOwnProperty(name)) {
                            name = getSpriteFrameName();
                            cc.Debug.warn(cc.locale.WARN_SPRITEFRAME_CREATING_SUBFRAME_WITH_EXISTING_NAME, "new name: " + name);
                        }
                    }

                    this._framesCache[name] = sf;
                    sf._name = name;
                    sf._parent = this;
                    sf.setOffset(this._offset.x + this._rect.x, this._offset.y + this._rect.y);

                    sf._framesCache = this._framesCache;

                    return sf;
                };

                /**
                * Set the SpriteFrame offset. This is useful to properly position a Frame inside a frame. For example, a texture
                * atlas with a font, which effectively another atlas.
                * If the offset position is not contained the SpriteFrame's rect, the offset operation does nothing.
                * @method cc.node.sprite.SpriteFrame#setOffset
                * @param x {number}
                * @param y {number}
                */
                SpriteFrame.prototype.setOffset = function (x, y) {
                    if (!this._texture) {
                        cc.Debug.error(cc.locale.ERR_SPRITE_FRAME_NO_TEXTURE, "setOffset");
                    }
                    if (this._rect.contains(x, y)) {
                        this._offset.set(x, y);
                        this.__calculateRectGL();
                    }
                };


                Object.defineProperty(SpriteFrame.prototype, "rotated", {
                    /**
                    * Is this SpriteFrame rotated ?
                    * @method cc.node.sprite.SpriteFrame#get:rotated
                    * @returns {boolean}
                    */
                    get: function () {
                        return this._rotated;
                    },
                    /**
                    * Set this SpriteFrame to have the image rotated.
                    * @method cc.node.sprite.SpriteFrame#set:rotated
                    * @param v {boolean}
                    */
                    set: function (v) {
                        this._rotated = v;
                    },
                    enumerable: true,
                    configurable: true
                });

                /**
                * Calculate WebGL rect based on the current frame info.
                * @member cc.node.sprite.SpriteFrame#__calculateRectGL
                * @private
                */
                SpriteFrame.prototype.__calculateRectGL = function () {
                    if (this._texture.isWebGLEnabled()) {
                        this._rectgl.set(this._offset.x + this._rect.x, this._offset.y + this._rect.y, this._rect.w, this._rect.h).normalizeBy(this._texture._textureWidth, this._texture._textureHeight);
                    }
                };

                /**
                * Draw the SpriteFrame.
                * This method takes care of drawing the Frame with the correct rotation and Sprite's status of flip axis values.
                * @method cc.node.sprite.SpriteFrame#draw
                * @param ctx {cc.render.RenderingContext}
                * @param sprite {cc.node.Sprite}
                */
                SpriteFrame.prototype.draw = function (ctx, sprite) {
                    var x = 0;
                    var y = 0;
                    var w = sprite._contentSize.width;
                    var h = sprite._contentSize.height;
                    var flippedX = sprite.flippedX;
                    var flippedY = sprite.flippedY;

                    if (flippedX && flippedY) {
                        ctx.translate(w, h);
                        ctx.scale(-1, -1);
                    } else if (flippedX) {
                        ctx.translate(w, 0);
                        ctx.scale(-1, 1);
                    } else if (flippedY) {
                        ctx.translate(0, h);
                        ctx.scale(1, -1);
                    }

                    if (this._rotated) {
                        ctx.translate(w / 2, h / 2);
                        ctx.rotate(-Math.PI / 2);
                        ctx.translate(-w / 2, -h / 2);
                    }

                    ctx.drawImage(this._texture._image, this._rect.x, this._rect.y, this._rect.w, this._rect.h, x, y, w, h);
                };

                /**
                * Get a SpriteFrame from the cache.
                * The cache is populated by successive calls on any child to <code>createSubSpriteFrame</code>
                * @method cc.node.sprite.SpriteFrame#getSpriteFrame
                * @param name {string}
                * @returns {cc.node.sprite.SpriteFrame} a SpriteFrame from the cache or null if it does not exist.
                */
                SpriteFrame.prototype.getSpriteFrame = function (name) {
                    return this._framesCache.hasOwnProperty(name) ? this._framesCache[name] : null;
                };

                /**
                * Get a collection array of SpriteFrame objects from the cache.
                * The function silently fails when a name from the array is not found in the cache.
                * @method cc.node.sprite.SpriteFrame#getSpriteFrames
                * @param names {Array} An array of objects. Typically these names will be number or string objects.
                * @returns {SpriteFrame[]}
                */
                SpriteFrame.prototype.getSpriteFrames = function (names) {
                    var ret = [];

                    for (var i = 0; i < names.length; i++) {
                        var sf = this.getSpriteFrame(names[i]);
                        if (sf) {
                            ret.push(sf);
                        }
                    }

                    return ret;
                };
                return SpriteFrame;
            })();
            _sprite.SpriteFrame = SpriteFrame;
        })(node.sprite || (node.sprite = {}));
        var sprite = node.sprite;
    })(cc.node || (cc.node = {}));
    var node = cc.node;
})(cc || (cc = {}));
//# sourceMappingURL=SpriteFrame.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (node) {
        /// <reference path="./SpriteFrame.ts"/>
        /// <reference path="../../render/Texture2D.ts"/>
        (function (sprite) {
            var Texture2D = cc.render.Texture2D;

            /**
            * @class cc.node.sprite.AnimationCache
            */
            var AnimationCache = (function () {
                function AnimationCache() {
                    this._animations = {};
                }
                AnimationCache.prototype.addAnimation = function () {
                };
                return AnimationCache;
            })();
            sprite.AnimationCache = AnimationCache;

            var __index = 0;

            /**
            * @class cc.node.sprite.Animation
            * @classdesc
            *
            * An animation is a set of SpriteFrames, playback duration and a loop value. A <code>cc.action.AnimateAction</code>
            * will play the sequence that the animation defines.
            * SpriteFrames roughly define rectangles in images. So if each of these frames is set for a node at a given speed,
            * we get the notion of a sprite animation.
            */
            var Animation = (function () {
                /**
                * Create a new Animation instance.
                * @method cc.node.sprite.Animation#constructor
                */
                function Animation() {
                    /**
                    * A collection of SpriteFrames to define an animation.
                    * @type {Array<cc.node.sprite.SpriteFrame>}
                    * @member cc.node.sprite.Animation#_frames
                    * @private
                    */
                    this._frames = [];
                    /**
                    * How many times the sequence will be played.
                    * @type {number}
                    * @member cc.node.sprite.Animation#_loops
                    * @private
                    */
                    this._loops = 1;
                    /**
                    * Set the sprite back to the original frame after the animation ends playing.
                    * @type {number}
                    * @member cc.node.sprite.Animation#_restoreOriginalFrame
                    * @private
                    */
                    this._restoreOriginalFrame = false;
                    /**
                    * Time to change to the next frame. Defaults to 0.150 seconds. Value in milliseconds.
                    * @member cc.node.sprite.Animation#_delayPerUnit
                    * @type {number}
                    * @private
                    */
                    this._delayPerUnit = 150;
                    /**
                    * Animation name. By default will be "animationXXX" where XXX is an index sequence value.
                    * @member cc.node.sprite.Animation#_name
                    * @type {string}
                    * @private
                    */
                    this._name = null;
                }
                /**
                * Add an animation frame.
                * @method cc.node.sprite.Animation#addFrame
                * @param f {cc.node.sprite.SpriteFrame}
                */
                Animation.prototype.addFrame = function (f) {
                    this._frames.push(f);
                    return this;
                };

                /**
                * Add a collection of animation frames.
                * @method cc.node.sprite.Animation#addFrames
                * @param f {Array<cc.node.sprite.SpriteFrame>}
                */
                Animation.prototype.addFrames = function (f) {
                    for (var i = 0; i < f.length; i++) {
                        this.addFrame(f[i]);
                    }
                    return this;
                };

                /**
                * Set the amount of time each frame of the animation will be shown.
                * @method cc.node.sprite.Animation#setDelayPerUnit
                * @param d {number} delay in seconds.
                */
                Animation.prototype.setDelayPerUnit = function (d) {
                    this._delayPerUnit = d;
                    return this;
                };

                /**
                * Set the number of animation repetitions. If <1, it will be set to 1.
                * @method cc.node.sprite.Animation#setLoops
                * @param l {number} number of loops
                */
                Animation.prototype.setLoops = function (l) {
                    if (l < 1) {
                        l = 1;
                    } else {
                        l = l | 0;
                    }
                    this._loops = l;

                    return this;
                };

                /**
                * Restore the original frame when the animation ends.
                * @method cc.node.sprite.Animation#setRestoreOriginalFrame
                * @param r {boolean}
                */
                Animation.prototype.setRestoreOriginalFrame = function (r) {
                    this._restoreOriginalFrame = r;
                    return this;
                };

                /**
                * Load an image, create a texture, a frame and then add the resulting SpriteFrame to the animation.
                * @method cc.node.sprite.Animation#addSpriteFrameWithFile
                * @deprecated
                * @param f {string} valid url string for an image resource.
                */
                Animation.prototype.addSpriteFrameWithFile = function (f) {
                    var me = this;
                    var img = new Image();
                    img.onload = function (e) {
                        var t2d = new Texture2D(img);
                        var sf = new sprite.SpriteFrame(t2d);
                        me.addFrame(sf);
                    };
                    img.src = f;
                };

                /**
                * Get the animation duration. It is the number of frames * delayPerUnit
                * @method cc.node.sprite.Animation#getDuration
                * @returns {number} animation duration in seconds.
                */
                Animation.prototype.getDuration = function () {
                    return this._delayPerUnit * this._frames.length;
                };

                /**
                * Get the number of frames in the Animation.
                * @method cc.node.sprite.Animation#getSize
                * @returns {number}
                */
                Animation.prototype.getSize = function () {
                    return this._frames.length;
                };

                /**
                * Get an SpriteFrame from the array at an index.
                * @method cc.node.sprite.Animation#getSpriteFrameAtIndex
                * @param i {number}
                * @returns {cc.node.sprite.SpriteFrame}
                */
                Animation.prototype.getSpriteFrameAtIndex = function (i) {
                    return this._frames[i];
                };

                /**
                * Set this animation to loop forever.
                * @method cc.node.sprite.Animation#setLoopForever
                * @returns {cc.node.sprite.Animation}
                */
                Animation.prototype.setLoopForever = function () {
                    this._loops = Number.MAX_VALUE;
                    return this;
                };

                /**
                * Create a copy of this Animation.
                * The new Animation name will be the original+<an index sequence value>
                * @method cc.node.sprite.Animation#clone
                * @returns {cc.node.sprite.Animation}
                */
                Animation.prototype.clone = function () {
                    var animation = new Animation();
                    animation._frames = Array.prototype.slice.call(this._frames);
                    animation._delayPerUnit = this._delayPerUnit;
                    animation._loops = this._loops;
                    animation._restoreOriginalFrame = this._restoreOriginalFrame;
                    animation._name = this._name + __index++;

                    return animation;
                };

                /**
                * Reverse this animation. The SpriteFrame collection is reversed.
                * @method cc.node.sprite.Animation#reverse
                * @returns {cc.node.sprite.Animation}
                */
                Animation.prototype.reverse = function () {
                    this._frames = this._frames.reverse();
                    return this;
                };
                return Animation;
            })();
            sprite.Animation = Animation;
        })(node.sprite || (node.sprite = {}));
        var sprite = node.sprite;
    })(cc.node || (cc.node = {}));
    var node = cc.node;
})(cc || (cc = {}));
//# sourceMappingURL=Animation.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="Node.ts"/>
    /// <reference path="./sprite/SpriteFrame.ts"/>
    /// <reference path="../math/Point.ts"/>
    /// <reference path="../math/Rectangle.ts"/>
    /// <reference path="../render/RenderingContext.ts"/>
    /// <reference path="../render/Texture2D.ts"/>
    /// <reference path="../locale/Locale.ts"/>
    /// <reference path="../util/Debug.ts"/>
    (function (node) {
        "use strict";

        var Node = cc.node.Node;

        var Texture2D = cc.render.Texture2D;
        var SpriteFrame = cc.node.sprite.SpriteFrame;

        /**
        * @class cc.node.Sprite
        * @classdesc
        * Sprite creates an sprite, a Node that shows images with animations.
        */
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            /**
            * @method cc.node.Sprite#constructor
            * @param data {cc.node.SpriteInitializer}
            */
            function Sprite(ddata) {
                _super.call(this);
                /**
                * Set this frame horizontally flipped.
                * @member cc.node.sprite.SpriteFrame#_flippedX
                * @type {boolean}
                * @private
                */
                this._flippedX = false;
                /**
                * Set this frame horizontally flipped.
                * @member cc.node.sprite.SpriteFrame#_flippedY
                * @type {boolean}
                * @private
                */
                this._flippedY = false;
                /**
                * @union
                * @type {cc.render.Texture2D|cc.node.SpriteFrame}
                * @private
                */
                this._spriteFrame = null;

                if (ddata instanceof cc.node.sprite.SpriteFrame) {
                    // V3 call.
                    this._spriteFrame = ddata;
                    cc.Debug.warn(cc.locale.WARN_SPRITE_CONSTRUCTOR_DEPRECATED_CALL);
                } else if (ddata instanceof cc.render.Texture2D) {
                    // V3 call
                    this._spriteFrame = new SpriteFrame(ddata, arguments[2]);
                    cc.Debug.warn(cc.locale.WARN_SPRITE_CONSTRUCTOR_DEPRECATED_CALL);
                } else if (typeof ddata === "string") {
                    // V3 call
                    this.__createFromURL(ddata);
                    cc.Debug.warn(cc.locale.WARN_SPRITE_CONSTRUCTOR_DEPRECATED_CALL);
                } else {
                    var data = ddata;

                    // V4 call
                    if (data.texture) {
                        this._spriteFrame = new SpriteFrame(data.texture, data.rect);
                    } else if (data.frame) {
                        this._spriteFrame = data.frame;
                    } else {
                        cc.Debug.warn(cc.locale.ERR_SPRITE_CONSTRUCTOR_PARAM_ERROR);
                    }
                }
            }
            Sprite.prototype.__createFromURL = function (url) {
                var image = new Image();
                var me = this;
                image.onload = function (e) {
                    var img = e.target;
                    me.setSpriteFrame(new SpriteFrame(new Texture2D(img)));
                };
                image.src = url;
            };

            /**
            * Specialized Sprite draw function.
            * The Sprite must have a SpriteFrame, which references a region of an Image.
            * @method cc.node.Sprite#draw
            * @param ctx {cc.render.RenderingContext}
            */
            Sprite.prototype.draw = function (ctx) {
                if (this._spriteFrame) {
                    ctx.tintColor = this._color;
                    this._spriteFrame.draw(ctx, this);
                }
            };

            Object.defineProperty(Sprite.prototype, "flippedX", {
                /**
                * Get flipped value for x axis.
                * @method cc.math.Sprite#get:flippedX
                * @returns {boolean} Sprite is mirrored horizontally ?
                */
                get: function () {
                    return this._flippedX;
                },
                /**
                * Set flipped value for x axis.
                * @method cc.math.Sprite#set:flippedX
                * @returns {boolean} set Sprite to be horizontally mirrored.
                */
                set: function (v) {
                    this._flippedX = v;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Sprite.prototype, "flippedY", {
                /**
                * Get flipped value for y axis.
                * @method cc.math.Sprite#get:flippedY
                * @returns {boolean} Sprite is mirrored vertically ?
                */
                get: function () {
                    return this._flippedY;
                },
                /**
                * Set flipped value for y axis.
                * @method cc.math.Sprite#set:flippedY
                * @returns {boolean} set Sprite to be vertically mirrored.
                */
                set: function (v) {
                    this._flippedY = v;
                },
                enumerable: true,
                configurable: true
            });



            /**
            * Set this Sprite's frame. Until a frame is set the Sprite won't be drawn on screen.
            * @param s {cc.node.sprite.SpriteFrame}
            */
            Sprite.prototype.setSpriteFrame = function (s) {
                if (s !== this._spriteFrame) {
                    this._spriteFrame = s;
                    this.setContentSize(s._rect.w, s._rect.h);
                }
            };
            return Sprite;
        })(Node);
        node.Sprite = Sprite;
    })(cc.node || (cc.node = {}));
    var node = cc.node;
})(cc || (cc = {}));
//# sourceMappingURL=Sprite.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="../node/Node.ts"/>
    /// <reference path="../node/Scene.ts"/>
    /// <reference path="../node/Director.ts"/>
    /// <reference path="../action/Action.ts"/>
    /// <reference path="../action/MoveAction.ts"/>
    /// <reference path="../action/TimeInterpolator.ts"/>
    (function (_transition) {
        var MoveAction = cc.action.MoveAction;
        var Interpolator = cc.action.Interpolator;

        

        /**
        * @class cc.transition.Transition
        * @classdesc
        *
        * Transitions are special action groups that move in and out Scenes.
        * <br>
        * As such, only Scenes have Transtions applied, while regulars Nodes have Actions.
        * This is the preferred way for a Director to switch between scenes by calling
        * <code>director.runScene( scene, transition )</code>.
        */
        var Transition = (function () {
            /**
            * Create a new Transition
            * @method cc.transition.Transition#constructor
            * @param duration {number} transition duration in milliseconds.
            */
            function Transition(duration) {
                /**
                * Director callback for transition end events.
                * @member cc.transition.Transition#_transitionCallback
                * @type {cc.transition.CallbackTransitionEnd}
                * @private
                */
                this._transitionCallback = null;
                /**
                * User defined callback for transition end events.
                * @member cc.transition.Transition#_userTransitionCallback
                * @type {cc.transition.CallbackTransitionEnd}
                * @private
                */
                this._userTransitionCallback = null;
                /**
                * Transition duration in milliseconds.
                * @member cc.transition.Transition#_duration
                * @type {number}
                * @private
                */
                this._duration = 0;
                /**
                * Transition interpolator.
                * <br>
                * {@link cc.action.TimeInterpolator}
                * @member cc.transition.Transition#_interpolator
                * @type {cc.action.TimeInterpolator}
                * @private
                */
                this._interpolator = Interpolator.Linear(false, false);
                this._duration = duration;
            }
            /**
            * Initialize the transition.
            * @method cc.transition.Transition#initialize
            * @param sceneIn {cc.node.Scene} entering scene.
            * @param sceneOut {cc.node.Scene} exiting scene
            * @returns {cc.transition.Transition} the initialized transition
            */
            Transition.prototype.initialize = function (sceneIn, sceneOut) {
                return this;
            };

            /**
            * Register director callback for transition end events.
            * @method cc.transition.Transition#onDirectorTransitionEnd
            * @param callback {cc.transition.CallbackTransitionEnd}
            * @returns {cc.transition.Transition}
            */
            Transition.prototype.onDirectorTransitionEnd = function (callback) {
                this._transitionCallback = callback;
                return this;
            };

            /**
            * Register user callback for transition end events.
            * @method cc.transition.Transition#onTransitionEnd
            * @param callback {cc.transition.CallbackTransitionEnd}
            * @returns {cc.transition.Transition}
            */
            Transition.prototype.onTransitionEnd = function (callback) {
                this._userTransitionCallback = callback;
                return this;
            };

            /**
            * Set the transition interpolator.
            * @method cc.transition.Transition#setInterpolator
            * @param i {cc.action.TimeInterpolator}
            * @returns {cc.transition.Transition}
            */
            Transition.prototype.setInterpolator = function (i) {
                this._interpolator = i;
                return this;
            };

            /**
            * Prepare the Transition Actions callbacks.
            * In a transition, only the entering scene is mandatory. For example, when the director starts and only one
            * scene slides in.
            * @method cc.transition.Transition#__setupActionCallbacks
            * @param actionIn {cc.node.Scene} enter scene.
            * @param actionOut {cc.node.Scene=} exit scene.
            * @private
            */
            Transition.prototype.__setupActionCallbacks = function (actionIn, actionOut) {
                var _this = this;
                actionIn.onStart(function (action, target) {
                    target.callOnEnter();
                });
                actionIn.onEnd(function (action, target) {
                    if (_this._transitionCallback) {
                        _this._transitionCallback(_this);
                    }
                    if (_this._userTransitionCallback) {
                        _this._userTransitionCallback(_this);
                    }

                    target.callOnEnterTransitionDidFinish();
                });

                if (actionOut) {
                    actionOut.onStart(function (action, target) {
                        target.callOnExitTransitionDidStart();
                    });
                    actionOut.onEnd(function (action, target) {
                        target.callOnExit();
                        target._visible = false;
                    });
                }
            };
            return Transition;
        })();
        _transition.Transition = Transition;

        /**
        * Enumeration for TransitionMove directions.
        *
        * @tsenum cc.transition.TransitionMoveDirection
        */
        (function (TransitionMoveDirection) {
            TransitionMoveDirection[TransitionMoveDirection["LEFT"] = 0] = "LEFT";
            TransitionMoveDirection[TransitionMoveDirection["RIGHT"] = 1] = "RIGHT";
            TransitionMoveDirection[TransitionMoveDirection["TOP"] = 2] = "TOP";
            TransitionMoveDirection[TransitionMoveDirection["BOTTOM"] = 3] = "BOTTOM";
        })(_transition.TransitionMoveDirection || (_transition.TransitionMoveDirection = {}));
        var TransitionMoveDirection = _transition.TransitionMoveDirection;

        /**
        * @class cc.transition.TransitionMove
        * @classdesc
        *
        * Base Transition for Slide Transitions.
        */
        var TransitionMove = (function (_super) {
            __extends(TransitionMove, _super);
            /**
            * Transition Slide direction.
            * @member cc.transition.TransitionMove#direction
            * @type {cc.transition.TransitionMoveDirection}
            */
            /**
            * @method cc.transition.TransitionMove#constructor
            * @param duration {number} transition duration in milliseconds.
            * @param direction {cc.transition.TransitionMoveDirection}
            */
            function TransitionMove(duration, direction) {
                if (typeof direction === "undefined") { direction = 0 /* LEFT */; }
                _super.call(this, duration);
                this.direction = direction;
            }
            /**
            * Initialize the transition.
            * @method cc.transition.TransitionMove#initialize
            * @override
            * @param sceneIn {cc.node.Scene} scene in.
            * @param sceneOut {cc.node.Scene} scene out.
            * @returns {cc.transition.TransitionMove}
            */
            TransitionMove.prototype.initialize = function (sceneIn, sceneOut) {
                var actionIn = null;
                var actionOut = null;
                var director = null;

                var _inX = 0;
                var _inY = 0;

                switch (this.direction) {
                    case 0 /* LEFT */:
                        _inX = -sceneIn._contentSize.width;
                        break;
                    case 1 /* RIGHT */:
                        _inX = sceneIn._contentSize.width;
                        break;
                    case 2 /* TOP */:
                        _inY = -sceneIn._contentSize.height;
                        break;
                    case 3 /* BOTTOM */:
                        _inY = sceneIn._contentSize.height;
                        break;
                }

                sceneIn.resetScene().setPosition(_inX, _inY);

                actionIn = new MoveAction({ x0: 0, y0: 0, x1: -_inX, y1: -_inY, relative: true }).setDuration(this._duration);
                if (this._interpolator) {
                    actionIn.setInterpolator(this._interpolator);
                }

                director = sceneIn.getDirector();
                director._scenesActionManager.scheduleActionForNode(sceneIn, actionIn);

                if (sceneOut) {
                    sceneOut.resetScene();

                    actionOut = actionIn.clone();

                    director._scenesActionManager.scheduleActionForNode(sceneOut, actionOut);
                }

                this.__setupActionCallbacks(actionIn, actionOut);

                return this;
            };
            return TransitionMove;
        })(Transition);
        _transition.TransitionMove = TransitionMove;

        /**
        * @class cc.transition.TransitionSlideInL
        * @classdesc
        * A Transition that enters from the left. This is just some sugar to build a TransitionMove.
        */
        var TransitionSlideInL = (function (_super) {
            __extends(TransitionSlideInL, _super);
            function TransitionSlideInL(duration) {
                _super.call(this, duration, 0 /* LEFT */);
            }
            return TransitionSlideInL;
        })(TransitionMove);
        _transition.TransitionSlideInL = TransitionSlideInL;

        /**
        * @class cc.transition.TransitionSlideInR
        * @classdesc
        * A Transition that enters from the right. This is just some sugar to build a TransitionMove.
        */
        var TransitionSlideInR = (function (_super) {
            __extends(TransitionSlideInR, _super);
            function TransitionSlideInR(duration) {
                _super.call(this, duration, 1 /* RIGHT */);
            }
            return TransitionSlideInR;
        })(TransitionMove);
        _transition.TransitionSlideInR = TransitionSlideInR;

        /**
        * @class cc.transition.TransitionSlideInT
        * @classdesc
        * A Transition that enters from the top. This is just some sugar to build a TransitionMove.
        */
        var TransitionSlideInT = (function (_super) {
            __extends(TransitionSlideInT, _super);
            function TransitionSlideInT(duration) {
                _super.call(this, duration, 2 /* TOP */);
            }
            return TransitionSlideInT;
        })(TransitionMove);
        _transition.TransitionSlideInT = TransitionSlideInT;

        /**
        * @class cc.transition.TransitionSlideInB
        * @classdesc
        * A Transition that enters from the bottom. This is just some sugar to build a TransitionMove.
        */
        var TransitionSlideInB = (function (_super) {
            __extends(TransitionSlideInB, _super);
            function TransitionSlideInB(duration) {
                _super.call(this, duration, 3 /* BOTTOM */);
            }
            return TransitionSlideInB;
        })(TransitionMove);
        _transition.TransitionSlideInB = TransitionSlideInB;
    })(cc.transition || (cc.transition = {}));
    var transition = cc.transition;
})(cc || (cc = {}));
//# sourceMappingURL=Transition.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    (function (render) {
        (function (shader) {
            "use strict";

            

            /**
            * @class cc.render.shader.Uniform
            * @classdesc
            *
            * Base class for Shader uniforms.
            *
            */
            var Uniform = (function () {
                /**
                * Uniform name
                * @member cc.render.shader.Uniform#_name
                * @type {string}
                */
                /**
                * Uniform type
                * @member cc.render.shader.Uniform#_type
                * @type {string}
                */
                /**
                * Uniform initial value.
                * The value is not set in the shader until <code>setValue</code> is called.
                * @member cc.render.shader.Uniform#_value
                * @type {any}
                */
                /**
                * Create a new Uniform instance.
                * @method cc.render.shader.Uniform#constructor
                * @param _name {string}
                * @param _type {string}
                * @param _value {any}
                */
                function Uniform(_name, _type, _value) {
                    this._name = _name;
                    this._type = _type;
                    this._value = _value;
                    /**
                    * Previously value set in shader's location.
                    * @member cc.render.shader.Uniform#_prevValue
                    * @type {any}
                    * @private
                    */
                    this._prevValue = null;
                    /**
                    * Shader program location.
                    * @member cc.render.shader.Uniform#_location
                    * @type {any}
                    * @private
                    */
                    this._location = null;
                }
                /**
                * Set Uniform shader location.
                * @method cc.render.shader.Uniform#setLocation
                * @param l {any} shader location.
                */
                Uniform.prototype.setLocation = function (l) {
                    this._location = l;
                };

                /**
                * Set shader location value.
                * @method cc.render.shader.Uniform#setValue
                * @param gl {WebGLRenderingContext}
                */
                Uniform.prototype.updateValue = function (gl) {
                    if (this._value !== this._prevValue) {
                        gl["uniform" + this._type](this._location, this._value);
                        this._prevValue = this._value;
                    }
                };

                Uniform.prototype.setValue = function (v) {
                    this._value = v;
                };

                /**
                * Create a uniform instance based on its type.
                * @method cc.render.shader.Uniform.createUniform
                * @param name {string} uniform name
                * @param type {string} uniform type
                * @param value {any} uniform value.
                * @returns {cc.render.Uniform} A Uniform instance.
                */
                Uniform.createUniform = function (name, type, value) {
                    if (type === "t") {
                        return new TextureUniform(name, type, value);
                    } else if (type === "m4v") {
                        return new MatrixUniform(name, type, value);
                    } else {
                        return new Uniform(name, type, value);
                    }
                };
                return Uniform;
            })();
            shader.Uniform = Uniform;

            /**
            * @class cc.render.shader.TextureUniform
            * @classdesc
            *
            * Create a Texture uniform.
            * Texture value is global for every shader that uses a sampler.
            *
            */
            var TextureUniform = (function (_super) {
                __extends(TextureUniform, _super);
                /**
                * Create a TextureUniform instance.
                * @method cc.render.shader.TextureUniform#constructor
                * @param name {string}
                * @param type {string}
                * @param value {any}
                */
                function TextureUniform(name, type, value) {
                    _super.call(this, name, type, value);
                }
                /**
                * Set shader location value.
                * The current texture Id is compared with an statically stored texture Id.
                * @member cc.render.shader.TextureUniform#setValue
                * @param gl {WebGLRenderingContext}
                */
                TextureUniform.prototype.updateValue = function (gl) {
                    if (this._value !== TextureUniform._textureId) {
                        gl.activeTexture(gl.TEXTURE0);
                        gl.bindTexture(gl.TEXTURE_2D, this._value);
                        gl.uniform1i(this._location, 0);
                        TextureUniform._textureId = this._value;
                    }
                };
                TextureUniform._textureId = null;
                return TextureUniform;
            })(Uniform);
            shader.TextureUniform = TextureUniform;

            /**
            * @class cc.render.shader.MatrixUniform
            * @classdesc
            *
            * Create a Matrix uniform.
            *
            */
            var MatrixUniform = (function (_super) {
                __extends(MatrixUniform, _super);
                /**
                * @method cc.render.shader.MatrixUniform#constructor
                * @param name {string}
                * @param type {string}
                * @param value {any}
                */
                function MatrixUniform(name, type, value) {
                    _super.call(this, name, type, value);
                }
                /**
                * Set Shader location value.
                * @method cc.render.shader.MatrixUniform#setValue
                * @param gl {WebGLRenderingContext}
                */
                MatrixUniform.prototype.updateValue = function (gl) {
                    if (this._value !== this._prevValue) {
                        // PENDING: componentwise matrix comparison
                        gl.uniformMatrix4fv(this._location, false, this._value);
                        this._prevValue = this._value;
                    }
                };
                return MatrixUniform;
            })(Uniform);
            shader.MatrixUniform = MatrixUniform;
        })(render.shader || (render.shader = {}));
        var shader = render.shader;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=Uniform.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (render) {
        (function (shader) {
            /**
            * @class cc.render.shader.Attribute
            * @classdesc
            *
            * Shader attribute.
            *
            */
            var Attribute = (function () {
                /**
                * Attribute name.
                * @member cc.render.shader.Attribute#_name
                * @type {string}
                */
                /**
                * Attribute location.
                * @member cc.render.shader.Attribute#_location
                * @type {any}
                */
                /**
                * Create a new Attribute instance.
                * @method cc.render.shader.Attribute#constructor
                * @param _name {string}
                * @param _location {any}
                */
                function Attribute(_name, _location) {
                    this._name = _name;
                    this._location = _location;
                }
                /**
                * Enable the shader attribute.
                * @method cc.render.shader.Attribute#enable
                * @param gl {WebGLRenderingContext}
                */
                Attribute.prototype.enable = function (gl) {
                    gl.enableVertexAttribArray(this._location);
                };

                /**
                * Disable the shader attribute.
                * @method cc.render.shader.Attribute#disable
                * @param gl {WebGLRenderingContext}
                */
                Attribute.prototype.disable = function (gl) {
                    gl.disableVertexAttribArray(this._location);
                };
                return Attribute;
            })();
            shader.Attribute = Attribute;
        })(render.shader || (render.shader = {}));
        var shader = render.shader;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=Attribute.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (render) {
        /// <reference path="./Uniform.ts"/>
        /// <reference path="./Attribute.ts"/>
        /// <reference path="../../math/matrix3.ts"/>
        (function (_shader) {
            var Uniform = cc.render.shader.Uniform;

            var Attribute = cc.render.shader.Attribute;

            "use strict";

            

            /**
            * @class cc.render.shader.AbstractShader
            * @classdesc
            *
            * Base class for all 2D rendering shaders.
            *
            */
            var AbstractShader = (function () {
                /**
                * WebGLRenderingContext
                * @member cc.render.shader.AbstractShader#_gl
                * @type {WebGLRenderingContext}
                */
                /**
                * Build a new AbstractShader instance.
                * @method cc.render.shader.AbstractShader#constructor
                * @param _gl {WebGLRenderingContext}
                * @param shaderDefinition {cc.render.shader.AbstractShaderInitializer}
                */
                function AbstractShader(_gl, shaderDefinition) {
                    this._gl = _gl;
                    /**
                    * Collection of the shader uniform objects.
                    * @member cc.render.shader.AbstractShader#_uniforms
                    * @type {Array<cc.render.shader.Uniform>}
                    * @private
                    */
                    this._uniforms = [];
                    /**
                    * Collection of the shader attribute objects.
                    * @member cc.render.shader.AbstractShader#_attributes
                    * @type {Array<cc.render.shader.Uniform>}
                    * @private
                    */
                    this._attributes = [];
                    /**
                    * Compiled shader program.
                    * @member cc.render.shader.AbstractShader#_shaderProgram
                    * @type {any}
                    * @private
                    */
                    this._shaderProgram = null;
                    this.__initializeFromShaderDefinition(shaderDefinition);
                }
                AbstractShader.prototype.enableAttributes = function () {
                    for (var i = 0; i < this._attributes.length; i++) {
                        this._attributes[i].enable(this._gl);
                    }

                    return this;
                };

                AbstractShader.prototype.disableAttributes = function () {
                    for (var i = 0; i < this._attributes.length; i++) {
                        this._attributes[i].disable(this._gl);
                    }

                    return this;
                };

                /**
                * Initialize a shader from a shader initializer.
                * Do not call directly. Ever.
                * @method cc.render.shader.AbstractShader#__initializeFromShaderDefinition
                * @param shaderDef {cc.render.shader.AbstractShaderInitializer}
                * @private
                */
                AbstractShader.prototype.__initializeFromShaderDefinition = function (shaderDef) {
                    var gl = this._gl;

                    this._shaderProgram = gl.createProgram();
                    gl.attachShader(this._shaderProgram, this.__getShader(this._gl, "x-shader/x-vertex", shaderDef.vertexShader));

                    gl.attachShader(this._shaderProgram, this.__getShader(this._gl, "x-shader/x-fragment", shaderDef.fragmentShader));

                    gl.linkProgram(this._shaderProgram);
                    if (gl.getError()) {
                        console.log(gl.getProgramInfoLog(this._shaderProgram));
                    }

                    this._gl.useProgram(this._shaderProgram);

                    if (shaderDef.uniforms) {
                        for (var uniformName in shaderDef.uniforms) {
                            var uniformDef = shaderDef.uniforms[uniformName];
                            var type = uniformDef.type;
                            var value = uniformDef.value;

                            var uniform = Uniform.createUniform(uniformName, type, value);
                            uniform.setLocation(gl.getUniformLocation(this._shaderProgram, uniformName));

                            if (typeof value !== "undefined" && value !== null) {
                                uniform.setValue(value);
                                uniform.updateValue(gl);
                            }

                            this._uniforms.push(uniform);
                        }
                    }

                    if (shaderDef.attributes) {
                        for (var i = 0; i < shaderDef.attributes.length; i++) {
                            var attribute = new Attribute(shaderDef.attributes[i], gl.getAttribLocation(this._shaderProgram, shaderDef.attributes[i]));

                            this._attributes.push(attribute);
                        }
                    }
                };

                /**
                * Get a shader of given type.
                * Do not call directly.
                * @member cc.render.shader.AbstractShader#__getShader
                * @param gl {WebGLRenderingContext}
                * @param type {string}
                * @param str {string}
                * @returns {any}
                * @private
                */
                AbstractShader.prototype.__getShader = function (gl, type, str) {
                    var shader;
                    if (type === "x-shader/x-fragment") {
                        shader = gl.createShader(gl.FRAGMENT_SHADER);
                    } else if (type === "x-shader/x-vertex") {
                        shader = gl.createShader(gl.VERTEX_SHADER);
                    } else {
                        return null;
                    }

                    gl.shaderSource(shader, str);
                    gl.compileShader(shader);

                    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                        alert(gl.getShaderInfoLog(shader));
                        return null;
                    }

                    return shader;
                };

                /**
                * Use this program for gpu rendering.
                * @method cc.render.shader.AbstractShader#useProgram
                * @returns {cc.render.shader.AbstractShader}
                */
                AbstractShader.prototype.useProgram = function () {
                    if (this._shaderProgram !== AbstractShader.GLOBAL_PROGRAM_ID) {
                        this._gl.useProgram(this._shaderProgram);
                        AbstractShader.GLOBAL_PROGRAM_ID = this._shaderProgram;
                        this.enableAttributes();
                    }
                };

                AbstractShader.prototype.notUseProgram = function () {
                    if (this._shaderProgram === AbstractShader.GLOBAL_PROGRAM_ID) {
                        this.disableAttributes();
                    }
                };

                /**
                * Flush geometry.
                * Must br overridden.
                * @method cc.render.shader.AbstractShader#flushBuffersWithContent
                * @param vertexPositionBuffer {WebGLBuffer} webgl vertex buffer id.
                * @param vertexDataArray {Float32Array} array with geometry position, color and uv
                * @param vertexIndexBuffer {WebGLBuffer} webgl vertex index  id.
                * @param vertexIndexArray {Uint16Array} array with geometry indices
                * @param numVertex {number} number of vertices.
                */
                AbstractShader.prototype.flushBuffersWithContent = function () {
                };

                AbstractShader.prototype.__updateUniformValues = function () {
                    for (var i = 0; i < this._uniforms.length; i++) {
                        this._uniforms[i].updateValue(this._gl);
                    }
                };

                /**
                * Find a uniform by name.
                * @method cc.render.shader.AbstractShader#findUniform
                * @param name {string}
                * @returns {cc.render.shader.Uniform}
                */
                AbstractShader.prototype.findUniform = function (name) {
                    for (var i = 0; i < this._uniforms.length; i++) {
                        if (this._uniforms[i]._name === name) {
                            return this._uniforms[i];
                        }
                    }

                    return null;
                };

                /**
                * Find an attribute by name.
                * @method cc.render.shader.AbstractShader#findAttribute
                * @param name {string}
                * @returns {cc.render.shader.Attribute}
                */
                AbstractShader.prototype.findAttribute = function (name) {
                    for (var i = 0; i < this._attributes.length; i++) {
                        if (this._attributes[i]._name === name) {
                            return this._attributes[i];
                        }
                    }

                    return null;
                };

                /**
                * Build a shader mat4 from a Matrix3 instance.
                * @method cc.render.shader.AbstractShader#mat4_from_mat3
                * @param mat3 {Float32Array}
                * @param __mat4 {Float32Array}
                * @returns {Float32Array}
                */
                AbstractShader.prototype.mat4_from_mat3 = function (mat3, __mat4) {
                    __mat4[0] = mat3[0];
                    __mat4[4] = mat3[1];
                    __mat4[1] = mat3[3];
                    __mat4[5] = mat3[4];
                    __mat4[12] = mat3[2];
                    __mat4[13] = mat3[5];

                    return __mat4;
                };
                AbstractShader.GLOBAL_PROGRAM_ID = null;
                return AbstractShader;
            })();
            _shader.AbstractShader = AbstractShader;
        })(render.shader || (render.shader = {}));
        var shader = render.shader;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=AbstractShader.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    (function (render) {
        /// <reference path="./AbstractShader.ts"/>
        /// <reference path="../../util/util.ts"/>
        (function (shader) {
            "use strict";

            var AbstractShader = cc.render.shader.AbstractShader;

            /**
            * @class cc.render.shader.SolidColorShader
            * @classdesc
            *
            * This shader fills geometry with a solid color.
            *
            */
            var SolidColorShader = (function (_super) {
                __extends(SolidColorShader, _super);
                /**
                * Build a new SolidColorShader instance.
                * @method cc.render.shader.SolidColorShader#constructor
                * @param gl {WebGLRenderingContext} gl context
                * @param ortho {Float32Array} projection matrix.
                */
                function SolidColorShader(gl, ortho) {
                    _super.call(this, gl, {
                        vertexShader: "" + "attribute vec2 aPosition; \n" + "attribute vec4 aColor; \n" + "uniform mat4 uProjection; \n" + "uniform mat4 uTransform; \n" + "varying vec4 vAttrColor; \n" + "void main(void) { \n" + "gl_Position = uProjection * uTransform * vec4( aPosition.x, aPosition.y, 0.0, 1.0 );\n" + "vAttrColor = aColor;\n" + "}\n",
                        fragmentShader: "precision mediump float; \n" + "varying vec4 vAttrColor;\n" + "void main(void) { \n" + "  gl_FragColor = vAttrColor; \n" + "}\n",
                        uniforms: {
                            "uProjection": {
                                type: "m4v",
                                value: ortho
                            },
                            "uTransform": {
                                type: "m4v",
                                value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                            }
                        },
                        attributes: ["aPosition", "aColor"]
                    });
                    /**
                    * Shader Uniform projection matrix.
                    * @member cc.render.shader.SolidColorShader#_uniformProjection
                    * @type {any}
                    * @private
                    */
                    this._uniformProjection = null;
                    /**
                    * Shader Uniform transformation matrix.
                    * @member cc.render.shader.SolidColorShader#_uniformTransform
                    * @type {any}
                    * @private
                    */
                    this._uniformTransform = null;
                    /**
                    * Shader geometry attribute.
                    * @member cc.render.shader.SolidColorShader#_attributePosition
                    * @type {any}
                    * @private
                    */
                    this._attributePosition = null;
                    /**
                    * Shader texture coords attribute. Not used in this shader.
                    * @member cc.render.shader.SolidColorShader#_attributeTexture
                    * @type {any}
                    * @private
                    */
                    this._attributeTexture = null;
                    /**
                    * Shader geometry color attribute.
                    * @member cc.render.shader.SolidColorShader#_attributeColor
                    * @type {any}
                    * @private
                    */
                    this._attributeColor = null;

                    this._uniformProjection = this.findUniform("uProjection");
                    this._uniformTransform = this.findUniform("uTransform");

                    this._attributePosition = this.findAttribute("aPosition");
                    this._attributeColor = this.findAttribute("aColor");

                    SolidColorShader.mat[0] = 1.0;
                    SolidColorShader.mat[5] = 1.0;
                    SolidColorShader.mat[10] = 1.0;
                    SolidColorShader.mat[15] = 1.0;
                }
                SolidColorShader.prototype.flushBuffersWithContent = function () {
                    this.__updateUniformValues();

                    var gl = this._gl;

                    gl.vertexAttribPointer(this._attributePosition._location, 2, gl.FLOAT, false, 8 * 4, 0);
                    gl.vertexAttribPointer(this._attributeColor._location, 4, gl.FLOAT, false, 8 * 4, 2 * 4);
                    //            gl.vertexAttribPointer(this._attributeTexture._location, 2, gl.FLOAT, false, 8*4, 6*4 );
                };
                SolidColorShader.mat = new Float32Array(16);
                return SolidColorShader;
            })(AbstractShader);
            shader.SolidColorShader = SolidColorShader;
        })(render.shader || (render.shader = {}));
        var shader = render.shader;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=SolidColorShader.js.map

/**
* Created by ibon on 11/17/14.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    (function (render) {
        /// <reference path="./AbstractShader"/>
        (function (shader) {
            var AbstractShader = cc.render.shader.AbstractShader;

            /**
            * @class cc.render.shader.TextureShader
            * @classdesc
            *
            * This shader fills rects with an image. It is expected to be invoked by calls to drawImage.
            *
            */
            var TextureShader = (function (_super) {
                __extends(TextureShader, _super);
                function TextureShader(gl, ortho) {
                    _super.call(this, gl, {
                        vertexShader: "" + "attribute vec2 aPosition; \n" + "attribute vec4 aColor; \n" + "attribute vec2 aTexture; \n" + "uniform mat4 uProjection; \n" + "uniform mat4 uTransform; \n" + "varying vec2 vTextureCoord; \n" + "varying vec4 vAttrColor; \n" + "void main(void) { \n" + "gl_Position = uProjection * uTransform * vec4( aPosition.x, aPosition.y, 0.0, 1.0 );\n" + "vTextureCoord = aTexture;\n" + "vAttrColor = aColor;\n" + "}\n",
                        fragmentShader: "" + "precision mediump float; \n" + "varying vec2 vTextureCoord; \n" + "uniform sampler2D uTextureSampler; \n" + "varying vec4 vAttrColor;\n" + "void main(void) { \n" + "  vec4 textureColor= texture2D(uTextureSampler, vec2(vTextureCoord)); \n" + "  gl_FragColor = textureColor * vAttrColor; \n" + "}\n",
                        attributes: ["aPosition", "aColor", "aTexture"],
                        uniforms: {
                            "uProjection": {
                                type: "m4v",
                                value: ortho
                            },
                            "uTransform": {
                                type: "m4v",
                                value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                            },
                            "uTextureSampler": {
                                type: "t",
                                value: null
                            }
                        }
                    });
                    /**
                    * Shader Uniform projection matrix.
                    * @member cc.render.shader.SolidColorShader#_uniformProjection
                    * @type {any}
                    * @private
                    */
                    this._uniformProjection = null;
                    /**
                    * Shader Uniform transformation matrix.
                    * @member cc.render.shader.SolidColorShader#_uniformTransform
                    * @type {any}
                    * @private
                    */
                    this._uniformTransform = null;
                    /**
                    * Shader Uniform for texture.
                    * @member cc.render.shader.SolidColorShader#_uniformTextureSampler
                    * @type {any}
                    * @private
                    */
                    this._uniformTextureSampler = null;
                    /**
                    * Shader geometry attribute.
                    * @member cc.render.shader.SolidColorShader#_attributePosition
                    * @type {any}
                    * @private
                    */
                    this._attributePosition = null;
                    /**
                    * Shader geometry attribute.
                    * @member cc.render.shader.SolidColorShader#_attributeTexture
                    * @type {any}
                    * @private
                    */
                    this._attributeTexture = null;
                    /**
                    * Shader geometry color attribute.
                    * @member cc.render.shader.SolidColorShader#_attributeColor
                    * @type {any}
                    * @private
                    */
                    this._attributeColor = null;

                    this._uniformTextureSampler = this.findUniform("uTextureSampler");
                    this._uniformProjection = this.findUniform("uProjection");
                    this._uniformTransform = this.findUniform("uTransform");

                    this._attributePosition = this.findAttribute("aPosition");
                    this._attributeColor = this.findAttribute("aColor");
                    this._attributeTexture = this.findAttribute("aTexture");

                    TextureShader.mat[0] = 1.0;
                    TextureShader.mat[5] = 1.0;
                    TextureShader.mat[10] = 1.0;
                    TextureShader.mat[15] = 1.0;
                    return this;
                }
                TextureShader.prototype.flushBuffersWithContent = function () {
                    this.__updateUniformValues();

                    var gl = this._gl;

                    gl.vertexAttribPointer(this._attributePosition._location, 2, gl.FLOAT, false, 8 * 4, 0);
                    gl.vertexAttribPointer(this._attributeColor._location, 4, gl.FLOAT, false, 8 * 4, 2 * 4);
                    gl.vertexAttribPointer(this._attributeTexture._location, 2, gl.FLOAT, false, 8 * 4, 6 * 4);
                };
                TextureShader.mat = new Float32Array(16);
                return TextureShader;
            })(AbstractShader);
            shader.TextureShader = TextureShader;
        })(render.shader || (render.shader = {}));
        var shader = render.shader;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=TextureShader.js.map

/**
* Created by ibon on 11/19/14.
*/
var cc;
(function (cc) {
    (function (render) {
        (function (shader) {
            var Buffer = (function () {
                function Buffer(_gl, _type) {
                    this._gl = _gl;
                    this._type = _type;
                    this._buffer = null;
                    this._prevValue = null;
                    this._buffer = _gl.createBuffer();
                }
                /**
                *
                * @param gl {WebGLRenderingContext}
                * @param v {Float32Array|UInt16Array}
                */
                Buffer.prototype.enableWithValue = function (v) {
                    this._gl.bindBuffer(this._type, this._buffer);
                    if (this._prevValue !== v) {
                        this._gl.bufferData(this._type, v, this._gl.STREAM_DRAW);
                        this._prevValue = v;
                    }
                };
                return Buffer;
            })();
            shader.Buffer = Buffer;
        })(render.shader || (render.shader = {}));
        var shader = render.shader;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=Buffer.js.map

/**
* License: see license.txt file.
*/
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cc;
(function (cc) {
    /// <reference path="../math/Dimension.ts"/>
    /// <reference path="./RenderingContext.ts"/>
    /// <reference path="./DecoratedWebGLRenderingContext.ts"/>
    /// <reference path="../node/Node.ts"/>
    (function (render) {
        "use strict";

        var Dimension = cc.math.Dimension;

        /**
        * @class cc.render.Renderer
        * @classdesc
        *
        * Interface for any renderer.
        * Must be subclassed to build a canvas or gl renderer.
        *
        */
        var Renderer = (function () {
            /**
            * Create a new Renderer instance.
            * @param w {width} surface pixels width
            * @param h {height} surface pixels height
            * @param surface {HTMLCanvasElement=} canvas object. @see {cc.render.Renderer#initialize}
            * @member cc.render.Renderer#constructor
            */
            function Renderer(w, h, surface) {
                /**
                * Surface to render to.
                * @member cc.render.Renderer#_surface
                * @type {HTMLCanvasElement}
                * @private
                */
                this._surface = null;
                /**
                * Rendering context to render on the surface.
                * @member cc.render.Renderer#_renderingContext
                * @type {cc.render.RenderingContext}
                * @private
                */
                this._renderingContext = null;
                this._dimension = new Dimension();
                this._surface = typeof surface !== "undefined" ? surface : document.createElement("canvas");
                this._surface.width = typeof w !== "undefined" ? w : 800;
                this._surface.height = typeof h !== "undefined" ? h : 600;

                this._dimension.set(w, h);
            }
            /**
            * Get the rendering context. @see {cc.render.Renderer#getRenderingContext}
            * @method cc.render.Renderer#getRenderingContext
            * @returns {cc.render.RenderingContext}
            */
            Renderer.prototype.getRenderingContext = function () {
                return this._renderingContext;
            };

            /**
            * Render a node. @see {cc.render.Renderer#render}
            * @method cc.render.Renderer#render
            */
            Renderer.prototype.render = function (node) {
                node.visit(this._renderingContext);
            };

            /**
            * Flush this renderer (push remaining content to the scene).
            * @method cc.render.Renderer#flush
            */
            Renderer.prototype.flush = function () {
                this._renderingContext.flush();
            };

            Renderer.prototype.getContentSize = function () {
                return this._dimension;
            };
            return Renderer;
        })();
        render.Renderer = Renderer;

        function dc2d(canvas) {
            var c2d = canvas.getContext("2d");
            var rc = c2d;
            rc.flush = function () {
            };
            Object.defineProperty(rc, "type", {
                get: function () {
                    return "canvas";
                },
                enumerable: true,
                configurable: true
            });

            return rc;
        }

        /**
        * @class cc.render.CanvasRenderer
        * @classdesc
        *
        * Create a Canvas renderer.
        */
        var CanvasRenderer = (function (_super) {
            __extends(CanvasRenderer, _super);
            /**
            * Create a new CanvasRenderer instance
            * @method cc.render.CanvasRenderer#constructor
            * @param w {width} surface pixels width
            * @param h {height} surface pixels height
            * @param surface {HTMLCanvasElement=} canvas object. @see {cc.render.Renderer#initialize}
            */
            function CanvasRenderer(w, h, surface) {
                _super.call(this, w, h, surface);
                this._renderingContext = dc2d(this._surface);
            }
            Object.defineProperty(CanvasRenderer.prototype, "renderingContext", {
                /**
                * Get a renderingContext. Has drawing capabilities.
                * @method cc.render.CanvasRenderer#get:renderingContext
                * @returns {RenderingContext}
                */
                get: function () {
                    return this._renderingContext;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(CanvasRenderer.prototype, "canvasContext", {
                /**
                * Get Canvas context (result from calling <code>canvas.getContext</code>).
                * @method cc.render.CanvasRenderer#get:canvasContext
                * @returns {any}
                */
                get: function () {
                    return this._renderingContext;
                },
                enumerable: true,
                configurable: true
            });

            CanvasRenderer.prototype.getCanvasContext = function () {
                return this._renderingContext;
            };
            return CanvasRenderer;
        })(Renderer);
        render.CanvasRenderer = CanvasRenderer;

        /**
        * @class cc.render.WebGLRenderer
        * @classdesc
        *
        * Create a WebGL Renderer with drawing capabilities like a canvas object.
        */
        var WebGLRenderer = (function (_super) {
            __extends(WebGLRenderer, _super);
            /**
            * Create a new WebGLRenderer instance.
            * @method cc.render.WebGLRenderer#constructor
            * @param w {width} surface pixels width
            * @param h {height} surface pixels height
            * @param surface {HTMLCanvasElement=} canvas object. @see {cc.render.Renderer#initialize}
            */
            function WebGLRenderer(w, h, surface) {
                _super.call(this, w, h, surface);
                /**
                * The canvas result of calling <code>canvas.getContext("webgl")</code>
                * @member cc.render.WebGLRenderer#_gl
                * @type {WebGLRenderingContext}
                * @private
                */
                this._gl = null;

                var drc = new cc.render.DecoratedWebGLRenderingContext(this._surface);
                this._gl = drc._gl;
                this._renderingContext = drc;

                var gl = this._gl;

                if (gl) {
                    gl.clearColor(0, 0, 0, 0); // Set clear color to black, fully transparent
                    gl.disable(gl.DEPTH_TEST); // Disable depth testing
                    gl.disable(gl.CULL_FACE); // Disable back face culling

                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT); // Clear the color as well as the depth buffer.
                }

                gl.viewport(0, 0, w, h);
            }
            WebGLRenderer.prototype.getCanvasContext = function () {
                return this._gl;
            };

            Object.defineProperty(WebGLRenderer.prototype, "renderingContext", {
                /**
                * Get a renderingContext. Has drawing capabilities like a <code>CanvasRenderingContext2D</code>
                * @method cc.render.WebGLRenderer#get:renderingContext
                * @returns {RenderingContext}
                */
                get: function () {
                    return this._renderingContext;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(WebGLRenderer.prototype, "canvasContext", {
                /**
                * Get Canvas context (result from calling <code>canvas.getContext</code>). Gets a gl context.
                * @method cc.render.WebGLRenderer#get:canvasContext
                * @returns {any}
                */
                get: function () {
                    return this._gl;
                },
                enumerable: true,
                configurable: true
            });
            return WebGLRenderer;
        })(Renderer);
        render.WebGLRenderer = WebGLRenderer;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=Renderer.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (render) {
        "use strict";

        
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=RenderingContext.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    /// <reference path="../math/Matrix3.ts"/>
    /// <reference path="../math/Color.ts"/>
    (function (render) {
        var Matrix3 = cc.math.Matrix3;
        var Color = cc.math.Color;

        /**
        * @class cc.render.RenderingContextSnapshot
        * @classdesc
        *
        * This class has all the necessary information for a canvas rendering context.
        * Whenever a call to <code>save</code> or <code>restore</code> is made, a new Object of this type will be
        * created/destroyed.
        * A developer never interacts with this objects directly, but by calling RenderingContext methods.
        * This class is for internal use of RenderingContext implementations (webgl).
        */
        var RenderingContextSnapshot = (function () {
            /**
            * Build a new RenderingContextSnapshot instance.
            * @method cc.render.RenderingContextSnapshot#constructor
            */
            function RenderingContextSnapshot() {
                /**
                * Composite operation.
                * @member cc.render.RenderingContextSnapshot#_globalCompositeOperation
                * @type {string}
                * @private
                */
                this._globalCompositeOperation = "source-over";
                /**
                * Current transformation matrix.
                * @member cc.render.RenderingContextSnapshot#_currentMatrix
                * @type {cc.math.Matrix3}
                * @private
                */
                this._currentMatrix = new Matrix3();
                /**
                * Current global alpha value.
                * @member cc.render.RenderingContextSnapshot#_globalAlpha
                * @type {number}
                * @private
                */
                this._globalAlpha = 1;
                /**
                * Current miter limit.
                * @member cc.render.RenderingContextSnapshot#_miterLimit
                * @type {number}
                * @private
                */
                this._miterLimit = 10;
                /**
                * Current fill style.
                * @member cc.render.RenderingContextSnapshot#_fillStyle
                * @type {any}
                * @private
                */
                this._fillStyle = Color.BLACK;
                /**
                * When passing an string as fill style, it will be turned into a Color object. We want to keep the Color and
                * the original string.
                * @member cc.render.RenderingContextSnapshot#_parsedFillStyle
                * @type {any}
                * @private
                */
                this._parsedFillStyle = Color.BLACK;
                /**
                * Current stroke style.
                * @member cc.render.RenderingContextSnapshot#_strokeStyle
                * @type {any}
                * @private
                */
                this._strokeStyle = Color.BLACK;
                /**
                * When passing an string as fill style, it will be turned into a Color object. We want to keep the Color and
                * the original string.
                * @member cc.render.RenderingContextSnapshot#_parsedStrokeStyle
                * @type {any}
                * @private
                */
                this._parsedStrokeStyle = Color.BLACK;
                /**
                * Current tint color. Only makes sense in webgl renderers.
                * @member cc.render.RenderingContextSnapshot#_tintColor
                * @type {Float32Array|Array}
                * @private
                */
                this._tintColor = Color.WHITE;
                /**
                * Current stroke line width.
                * @member cc.render.RenderingContextSnapshot#_lineWidth
                * @type {number}
                * @private
                */
                this._lineWidth = 1.0;
                /**
                * Current font data.
                * @member cc.render.RenderingContextSnapshot#_fontDefinition
                * @type {string}
                * @private
                */
                this._fontDefinition = "10px sans-serif";
                /**
                * Current font baseline.
                * @member cc.render.RenderingContextSnapshot#_textBaseline
                * @type {string}
                * @private
                */
                this._textBaseline = "alphabetic";
                /**
                * Current text align. Valid values are: left, center, right
                * @member cc.render.RenderingContextSnapshot#_textAlign
                * @type {string}
                * @private
                */
                this._textAlign = "left";
                /**
                * Current path tracing data.
                * @member cc.render.RenderingContextSnapshot#_currentPath
                * @type {any}
                * @private
                */
                this._currentPath = null;
                /**
                * Current clipping paths stack
                * @member cc.render.RenderingContextSnapshot#_clippingStack
                * @type {Array}
                * @private
                */
                this._clippingStack = [];
            }
            /**
            * Clone this snapshot and create a new one.
            * @method cc.render.RenderingContextSnapshot#clone
            * @returns {cc.render.RenderingContextSnapshot}
            */
            RenderingContextSnapshot.prototype.clone = function () {
                var rcs = new RenderingContextSnapshot();

                rcs._globalCompositeOperation = this._globalCompositeOperation;
                rcs._globalAlpha = this._globalAlpha;
                rcs._currentMatrix.copy(this._currentMatrix);
                rcs._fillStyle = this._fillStyle;
                rcs._parsedFillStyle = this._parsedFillStyle;
                rcs._strokeStyle = this._strokeStyle;
                rcs._parsedStrokeStyle = this._parsedStrokeStyle;
                rcs._tintColor = this._tintColor;
                rcs._lineWidth = this._lineWidth;
                rcs._miterLimit = this._miterLimit;
                rcs._fontDefinition = this._fontDefinition;
                rcs._textBaseline = this._textBaseline;
                rcs._textAlign = this._textAlign;

                //rcs._currentPath = this._currentPath.clone();
                rcs._clippingStack = this._clippingStack;

                return rcs;
            };
            return RenderingContextSnapshot;
        })();
        render.RenderingContextSnapshot = RenderingContextSnapshot;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=RenderingContextSnapshot.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    /// <reference path="../math/Point.ts"/>
    /// <reference path="../math/Color.ts"/>
    /// <reference path="../math/Matrix3.ts"/>
    /// <reference path="./RenderingContextSnapshot.ts"/>
    /// <reference path="./shader/AbstractShader.ts"/>
    /// <reference path="./shader/Buffer.ts"/>
    (function (render) {
        "use strict";

        var Buffer = cc.render.shader.Buffer;

        var __vv = { x: 0, y: 0 };

        /**
        * @class cc.render.GeometryBatcher
        * @classdesc
        *
        * This class handles geometry, batches it into ping-pong'ed buffers and signals when to flush.
        */
        var GeometryBatcher = (function () {
            /**
            * The canvas WebGLRenderingContext
            * @member cc.render.GeometryBatcher#_gl
            * @type {WebGLRenderingContext}
            */
            /**
            * Build a new GeometryBatcher instance. You probably will need one of this.
            * @method cc.render.GeometryBatcher#constructor
            * @param _gl {WebGLRenderingContext}
            */
            function GeometryBatcher(_gl) {
                this._gl = _gl;
                /**
                * WebGL geometry, color and uv buffer ids.
                * @member cc.render.GeometryBatcher#_glDataBuffers;
                * @type {Array<WebGLBuffer>}
                * @private
                */
                this._glDataBuffers = [];
                /**
                * WebGL indices buffer ids.
                * @member cc.render.GeometryBatcher#_glIndexBuffers;
                * @type {Array<WebGLBuffer>}
                * @private
                */
                this._glIndexBuffers = [];
                /**
                * Batching buffers index.
                * @member cc.render.GeometryBatcher#_currentBuffersIndex
                * @type {number}
                * @private
                */
                this._currentBuffersIndex = 0;
                /**
                * Current rendering buffer for geometry, color and uv.
                * @member cc.render.GeometryBatcher#_dataBuffer
                * @type {Float32Array}
                * @private
                */
                this._dataBuffer = null;
                /**
                * Current Buffer index.
                * @member cc.render.GeometryBatcher#_dataBufferIndex
                * @type {number}
                * @private
                */
                this._dataBufferIndex = 0;
                /**
                * Current rendering buffer for geometry indices.
                * @member cc.render.GeometryBatcher#_indexBuffer
                * @type {Float32Array}
                * @private
                */
                this._indexBuffer = null;
                /**
                * Current Buffer index.
                * @member cc.render.GeometryBatcher#_indexBufferIndex
                * @type {number}
                * @private
                */
                this._indexBufferIndex = 0;
                this._dataBuffer = new Float32Array(GeometryBatcher.MAX_QUADS * (8 + 16 + 8));
                this._indexBuffer = new Uint16Array(GeometryBatcher.MAX_QUADS * 6);

                // preset geometry indices.
                var indexBufferIndex = 0;
                var elementIndex = 0;
                var indexBuffer = this._indexBuffer;
                for (var i = 0; i < GeometryBatcher.MAX_QUADS; i++) {
                    indexBuffer[indexBufferIndex] = elementIndex;
                    indexBuffer[indexBufferIndex + 1] = elementIndex + 1;
                    indexBuffer[indexBufferIndex + 2] = elementIndex + 2;

                    indexBuffer[indexBufferIndex + 3] = elementIndex;
                    indexBuffer[indexBufferIndex + 4] = elementIndex + 2;
                    indexBuffer[indexBufferIndex + 5] = elementIndex + 3;
                    indexBufferIndex += 6;
                    elementIndex += 4;
                }

                this._glDataBuffers.push(new Buffer(this._gl, this._gl.ARRAY_BUFFER));
                this._glDataBuffers.push(new Buffer(this._gl, this._gl.ARRAY_BUFFER));

                this._glIndexBuffers.push(new Buffer(this._gl, this._gl.ELEMENT_ARRAY_BUFFER));
                this._glIndexBuffers.push(new Buffer(this._gl, this._gl.ELEMENT_ARRAY_BUFFER));

                this._glDataBuffer = this._glDataBuffers[0];
                this._glIndexBuffer = this._glIndexBuffers[0];
            }
            /**
            * Batch a rectangle with texture info and tint color.
            * Tint color will be modified by currently alpha value set.
            * @member cc.render.GeometryBatcher#batchRectWithTexture
            * @param x {number} rectangle position
            * @param y {number}
            * @param w {number} rectangle size
            * @param h {number}
            * @param rcs {RenderingContextSnapshot} current rendering context snapshot info
            * @param u0 {number} texture position
            * @param v0 {number}
            * @param u1 {number} texture size
            * @param v1 {number}
            * @param text {number} WebGL texture id.
            */
            GeometryBatcher.prototype.batchRectWithTexture = function (x, y, w, h, rcs, u0, v0, u1, v1, text) {
                //            var color:Float32Array= (<Color>rcs._parsedFillStyle)._color;
                var tint = rcs._tintColor._color;

                var r = tint[0];
                var g = tint[1];
                var b = tint[2];
                var a = tint[3] * rcs._globalAlpha;

                var cm = rcs._currentMatrix;

                __vv.x = x;
                __vv.y = y;
                this.batchVertex(cm.transformPoint(__vv), r, g, b, a, u0, v0);
                __vv.x = x + w;
                __vv.y = y;
                this.batchVertex(cm.transformPoint(__vv), r, g, b, a, u1, v0);
                __vv.x = x + w;
                __vv.y = y + h;
                this.batchVertex(cm.transformPoint(__vv), r, g, b, a, u1, v1);
                __vv.x = x;
                __vv.y = y + h;
                this.batchVertex(cm.transformPoint(__vv), r, g, b, a, u0, v1);

                // add two triangles * 3 values each.
                this._indexBufferIndex += 6;

                return this._dataBufferIndex + 32 >= this._dataBuffer.length;
            };

            /**
            * Batch a rect with the current rendering info. The rect color will be tinted. Resulting transparency value will
            * be modified by currently rendering context alpha value set.
            * @method cc.render.GeometryBatcher#batchRect
            * @param x {number}
            * @param y {number}
            * @param w {number}
            * @param h {number}
            * @param rcs {cc.render.RenderingContextSnapshot} current rendering context snapshot info
            */
            GeometryBatcher.prototype.batchRect = function (x, y, w, h, rcs) {
                var color = rcs._parsedFillStyle._color;
                var tint = rcs._tintColor._color;

                var r = color[0] * tint[0];
                var g = color[1] * tint[1];
                var b = color[2] * tint[2];
                var a = color[3] * tint[3] * rcs._globalAlpha;

                var cm = rcs._currentMatrix;

                __vv.x = x;
                __vv.y = y;
                this.batchVertex(cm.transformPoint(__vv), r, g, b, a, 0, 0);
                __vv.x = x + w;
                __vv.y = y;
                this.batchVertex(cm.transformPoint(__vv), r, g, b, a, 0, 0);
                __vv.x = x + w;
                __vv.y = y + h;
                this.batchVertex(cm.transformPoint(__vv), r, g, b, a, 0, 0);
                __vv.x = x;
                __vv.y = y + h;
                this.batchVertex(cm.transformPoint(__vv), r, g, b, a, 0, 0);

                // add two triangles * 3 values each.
                this._indexBufferIndex += 6;

                return this._dataBufferIndex + 32 >= this._dataBuffer.length;
            };

            /**
            * Batch a vertex with color and texture.
            * @method cc.render.GeometryBatcher#batchVertex
            * @param p {Point}
            * @param r {number}
            * @param g {number}
            * @param b {number}
            * @param a {number}
            * @param u {number}
            * @param v {number}
            */
            GeometryBatcher.prototype.batchVertex = function (p, r, g, b, a, u, v) {
                this._dataBuffer[this._dataBufferIndex++] = p.x;
                this._dataBuffer[this._dataBufferIndex++] = p.y;
                this._dataBuffer[this._dataBufferIndex++] = r;
                this._dataBuffer[this._dataBufferIndex++] = g;
                this._dataBuffer[this._dataBufferIndex++] = b;
                this._dataBuffer[this._dataBufferIndex++] = a;
                this._dataBuffer[this._dataBufferIndex++] = u;
                this._dataBuffer[this._dataBufferIndex++] = v;
            };

            /**
            * Flush currently batched geometry and related info with a given shader program.
            * @method cc.render.GeometryBatcher#flush
            * @param shader {AbstractShader} program shader
            */
            GeometryBatcher.prototype.flush = function (shader) {
                if (!this._indexBufferIndex) {
                    return;
                }

                this._glDataBuffer.enableWithValue(this._dataBuffer.subarray(0, this._dataBufferIndex));
                this._glIndexBuffer.enableWithValue(this._indexBuffer.subarray(0, this._indexBufferIndex));

                shader.flushBuffersWithContent();

                this._gl.drawElements(this._gl.TRIANGLES, this._indexBufferIndex, this._gl.UNSIGNED_SHORT, 0);

                // reset buffer data index.
                this._dataBufferIndex = 0;
                this._indexBufferIndex = 0;

                // ping pong rendering buffer.
                this._currentBuffersIndex = (this._currentBuffersIndex + 1) % 2;
                this._glDataBuffer = this._glDataBuffers[this._currentBuffersIndex];
                this._glIndexBuffer = this._glIndexBuffers[this._currentBuffersIndex];
            };
            GeometryBatcher.MAX_QUADS = 8192;
            return GeometryBatcher;
        })();
        render.GeometryBatcher = GeometryBatcher;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=GeometryBatcher.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    /// <reference path="../math/Color.ts"/>
    /// <reference path="../math/Matrix3.ts"/>
    /// <reference path="./RenderingContext.ts"/>
    /// <reference path="./RenderingContextSnapshot.ts"/>
    /// <reference path="./Texture2D.ts"/>
    /// <reference path="./GeometryBatcher.ts"/>
    /// <reference path="./shader/AbstractShader.ts"/>
    /// <reference path="./shader/SolidColorShader.ts"/>
    /// <reference path="./shader/TextureShader.ts"/>
    /// <reference path="./shader/Uniform.ts"/>
    (function (render) {
        "use strict";

        var Color = cc.math.Color;

        var RenderingContextSnapshot = cc.render.RenderingContextSnapshot;
        var GeometryBatcher = cc.render.GeometryBatcher;

        var SolidColorShader = cc.render.shader.SolidColorShader;
        var TextureShader = cc.render.shader.TextureShader;

        /**
        * Decorated WebGL Rendering Context fill style types.
        * @tsenum cc.render.FillStyleType
        */
        (function (FillStyleType) {
            FillStyleType[FillStyleType["COLOR"] = 0] = "COLOR";
            FillStyleType[FillStyleType["IMAGE"] = 1] = "IMAGE";
        })(render.FillStyleType || (render.FillStyleType = {}));
        var FillStyleType = render.FillStyleType;

        /**
        * Shader types
        * @tsenum cc.render.ShaderType
        */
        (function (ShaderType) {
            ShaderType[ShaderType["COLOR"] = 0] = "COLOR";
            ShaderType[ShaderType["IMAGE"] = 1] = "IMAGE";
        })(render.ShaderType || (render.ShaderType = {}));
        var ShaderType = render.ShaderType;

        /**
        * BIT Flag for WebGL enabled/disabled flags.
        * @tsenum cc.render.WEBGL_FLAGS
        */
        (function (WEBGL_FLAGS) {
            WEBGL_FLAGS[WEBGL_FLAGS["BLEND"] = 1] = "BLEND";
            WEBGL_FLAGS[WEBGL_FLAGS["DEPTH_TEST"] = 2] = "DEPTH_TEST";
            WEBGL_FLAGS[WEBGL_FLAGS["CULL_FACE"] = 4] = "CULL_FACE";
        })(render.WEBGL_FLAGS || (render.WEBGL_FLAGS = {}));
        var WEBGL_FLAGS = render.WEBGL_FLAGS;

        

        /**
        * This variable is a map from internal webgl flag values @see {cc.render.WEBGL_FLAGS} to actual WebGL constants.
        * Thus, an internal call to __enable will say <code>__enable( WEBGL_FLAGS.BLEND )</code> which allow a caching
        * mechanism for what GL flags have been enabled/disabled and hence not emit uneeded gl calls.
        * @member cc.render.WEBGL_FLAGS_CONSTANTS
        * @type {cc.render.IWEBGL_FLAGS_CONSTANTS}
        */
        render.WEBGL_FLAGS_CONSTANTS = {};

        /**
        * @class cc.render.DecoratedWebGLRenderingContext
        * @classdesc
        *
        * This object wraps a 3D canvas context (webgl) and exposes a canvas like 2d rendering API.
        * The implementation should be extremely efficient by:
        *   <li>lazily set every property.
        *   <li>batch all drawing operations as much as possible.
        *   <li>ping pong between buffers
        *
        * <br>
        * All this would be transparent for the developer and happen automatically. For example, is a value is set to
        * <code>globalCompositeOperation</code> (set a blend mode), a gl call is not immediately executed, which prevents
        * consecutive calls to <code>globalCompositeOperation</code> to make explicit gl calls. Instead, the gl call
        * is deferred until the moment when some geometry will happen, for example, a fillRect call.
        * <br>
        * This mechanism is set for every potential flushing operation like changing fillStyle, compisite, textures, etc.
        */
        var DecoratedWebGLRenderingContext = (function () {
            /**
            * Rendering surface (canvas object)
            * @member cc.render.DecoratedWebGLRenderingContext#_canvas
            * @type {HTMLCanvasElement}
            * @private
            */
            /**
            * Create a new DecoratedWebGLRenderingContext instance.
            * @method cc.render.DecoratedWebGLRenderingContext#constructor
            * @param _canvas {HTMLCanvasElement}
            */
            function DecoratedWebGLRenderingContext(_canvas) {
                this._canvas = _canvas;
                this.__mat3 = new cc.math.Matrix3();
                /**
                * WebGL canvas context.
                * @member cc.render.DecoratedWebGLRenderingContext#_gl
                * @type {WebGLRenderingContext}
                * @private
                */
                this._gl = null;
                /**
                * Internal webgl flags status holder.
                * @member cc.render.DecoratedWebGLRenderingContext#_webglFlags
                * @type {number}
                * @private
                */
                this._webglFlags = 0;
                /**
                * Current rendering context data.
                * @member cc.render.DecoratedWebGLRenderingContext#_currentContextSnapshot
                * @type {cc.render.RenderingContextSnapshot}
                * @private
                */
                this._currentContextSnapshot = null;
                /**
                * Each call to save will create a new rendering context snapshot that will be tracked here.
                * @member cc.render.DecoratedWebGLRenderingContext#_contextSnapshots
                * @type {Array<cc.render.RenderingContextSnapshot>}
                * @private
                */
                this._contextSnapshots = [];
                /**
                * Currently set fill style. Next fill operation should check for this property.
                * @member cc.render.DecoratedWebGLRenderingContext#_currentFillStyle
                * @type {any}
                * @private
                */
                this._currentFillStyle = null;
                /**
                * Current fill style type. The style type reflects what shader is currently set for rendering.
                * @member cc.render.DecoratedWebGLRenderingContext#_currentFillStyleType
                * @type {cc.render.FillStyleType}
                * @private
                */
                this._currentFillStyleType = 0 /* COLOR */;
                /**
                * Last global composite operation set.
                * @member cc.render.DecoratedWebGLRenderingContext#_currentGlobalCompositeOperation
                * @type {string}
                * @private
                */
                this._currentGlobalCompositeOperation = "source-over";
                /**
                * Internal rendering shaders.
                * @member cc.render.DecoratedWebGLRenderingContext#_shaders
                * @type {Array<cc.render.shader.SolidColorShader>}
                * @private
                */
                this._shaders = [];
                /**
                * Geometry batcher.
                * @member cc.render.DecoratedWebGLRenderingContext#_batcher
                * @type {cc.render.GeometryBatcher}
                * @private
                */
                this._batcher = null;
                function createContext() {
                    var _gl = null;
                    try  {
                        var obj = {
                            premultipliedAlpha: DecoratedWebGLRenderingContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                            antialias: DecoratedWebGLRenderingContext.ANTIALIAS,
                            alpha: DecoratedWebGLRenderingContext.CTX_ALPHA,
                            stencil: true
                        };

                        _gl = _canvas.getContext("webgl", obj) || _canvas.getContext("experimental-webgl", obj);

                        _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, DecoratedWebGLRenderingContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL ? 1 : 0);
                    } catch (e) {
                        alert(e);
                    }

                    if (!_gl) {
                        throw new Error('WebGL is not available.');
                    }

                    return _gl;
                }

                function initializeFlagsMap(_gl) {
                    cc.render.WEBGL_FLAGS_CONSTANTS[1 /* BLEND */] = _gl.BLEND;
                    cc.render.WEBGL_FLAGS_CONSTANTS[2 /* DEPTH_TEST */] = _gl.DEPTH_TEST;
                    cc.render.WEBGL_FLAGS_CONSTANTS[4 /* CULL_FACE */] = _gl.CULL_FACE;
                }

                function initializeContext(_gl) {
                    // Set clear color to black, fully transparent
                    _gl.clearColor(0, 0, 0, 0);

                    // Disable depth testing
                    _gl.disable(_gl.DEPTH_TEST);

                    // Disable back face culling
                    _gl.disable(_gl.CULL_FACE);

                    // Clear the color as well as the depth buffer.
                    _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT | _gl.STENCIL_BUFFER_BIT);

                    _gl.viewport(0, 0, _canvas.width, _canvas.height);
                }

                this._gl = createContext();
                initializeFlagsMap(this._gl);
                initializeContext(this._gl);

                this._batcher = new GeometryBatcher(this._gl);

                this._currentContextSnapshot = new RenderingContextSnapshot();
                this._contextSnapshots.push(this._currentContextSnapshot);

                this.__createRenderingShaders(_canvas.width, _canvas.height);

                this.__setGlobalCompositeOperation();
            }
            /**
            * Create internal rendering shaders.
            * Do not call directly.
            * @method cc.render.DecoratedWebGLRenderingContext#__createRenderingShaders
            * @param w {number}
            * @param h {number}
            * @private
            */
            DecoratedWebGLRenderingContext.prototype.__createRenderingShaders = function (w, h) {
                /**
                * Make an orthographics projection matrix.
                * @param left {number}
                * @param right {number}
                * @param bottom {number}
                * @param top {number}
                * @param znear {number}
                * @param zfar {number}
                *
                * @returns {Float32Array}
                */
                function createOrthographicProjectionMatrix(left, right, bottom, top, znear, zfar) {
                    var tx = -(right + left) / (right - left);
                    var ty = -(top + bottom) / (top - bottom);
                    var tz = -(zfar + znear) / (zfar - znear);

                    return new Float32Array([
                        2 / (right - left), 0, 0, 0,
                        0, 2 / (top - bottom), 0, 0,
                        0, 0, -2 / (zfar - znear), 0,
                        tx, ty, tz, 1]);
                }

                var opm = createOrthographicProjectionMatrix(0, w, h, 0, -1, 1);

                this._shaders.push(new SolidColorShader(this._gl, opm));
                this._shaders.push(new TextureShader(this._gl, opm));

                this._shaders[0].useProgram();
            };

            Object.defineProperty(DecoratedWebGLRenderingContext.prototype, "canvas", {
                /**
                * Get the rendering surface object (canvas).
                * @method cc.render.DecoratedWebGLRenderingContext#get:canvas
                * @returns {HTMLCanvasElement}
                */
                get: function () {
                    return this._canvas;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(DecoratedWebGLRenderingContext.prototype, "fillStyle", {
                /**
                * Get the current rendering fill style.
                * @method cc.render.DecoratedWebGLRenderingContext#get:fillStyle
                * @returns {any}
                */
                get: function () {
                    return this._currentContextSnapshot._fillStyle;
                },
                /**
                * Set the current rendering fill style.
                * @method cc.render.DecoratedWebGLRenderingContext#set:fillStyle
                * @param fs {any}
                */
                set: function (fs) {
                    this._currentFillStyle = fs;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(DecoratedWebGLRenderingContext.prototype, "tintColor", {
                /**
                * Set the current rendering tint color. Tint color is an array of 4 components for rgba. Values 0..1
                * @method cc.render.DecoratedWebGLRenderingContext#set:tintColor
                * @param c {Array<number>}
                */
                set: function (c) {
                    this._currentContextSnapshot._tintColor = c;
                },
                enumerable: true,
                configurable: true
            });


            Object.defineProperty(DecoratedWebGLRenderingContext.prototype, "globalCompositeOperation", {
                /**
                * Get the current rendering composite operation (blend mode).
                * @method cc.render.DecoratedWebGLRenderingContext#get:globalCompositeOperation
                * @returns {string}
                */
                get: function () {
                    return this._currentGlobalCompositeOperation;
                },
                /**
                * Set the current rendering composite operation (blend mode).
                * The value is any of:
                *
                * "source-over", "source-out", "source-in", "source-atop", "destination-over", "destination-in",
                * "destination-out", "destination-atop", "multiply", "screen", "copy", "lighter", "darker", "xor", "add"
                *
                * @method cc.render.DecoratedWebGLRenderingContext#set:globalCompositeOperation
                * @param gco {string}
                */
                set: function (gco) {
                    this._currentGlobalCompositeOperation = gco;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Internal webgl enable flag caching and management.
            * @method cc.render.DecoratedWebGLRenderingContext#__enable
            * @param v {cc.render.WEBGL_FLAGS}
            * @private
            */
            DecoratedWebGLRenderingContext.prototype.__enable = function (v) {
                if (this._webglFlags & v) {
                    return;
                }

                this._gl.enable(cc.render.WEBGL_FLAGS_CONSTANTS[v]);
                this._webglFlags |= v;
            };

            /**
            * Internal webgl disable flag caching and management.
            * @method cc.render.DecoratedWebGLRenderingContext#__enable
            * @param v {cc.render.WEBGL_FLAGS}
            * @private
            */
            DecoratedWebGLRenderingContext.prototype.__disable = function (v) {
                if (!(this._webglFlags & v)) {
                    return;
                }

                this._gl.disable(cc.render.WEBGL_FLAGS_CONSTANTS[v]);
                this._webglFlags &= ~v;
            };

            /**
            * Internal blending mode set.
            * This function is called not when the blending mode is set, but when an actual geometry operation is about
            * to happen.
            * @method cc.render.DecoratedWebGLRenderingContext#__setGlobalCompositeOperation
            * @private
            */
            DecoratedWebGLRenderingContext.prototype.__setGlobalCompositeOperation = function () {
                var gl = this._gl;

                this.__enable(1 /* BLEND */);

                switch (this._currentGlobalCompositeOperation) {
                    case "source-over":
                        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                        break;
                    case "source-out":
                        gl.blendFunc(gl.ONE_MINUS_DST_ALPHA, gl.ZERO);
                        break;
                    case "source-in":
                        gl.blendFunc(gl.DST_ALPHA, gl.ZERO);
                        break;
                    case "source-atop":
                        gl.blendFunc(gl.DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                        break;
                    case "destination-over":
                        gl.blendFunc(gl.ONE_MINUS_DST_ALPHA, gl.DST_ALPHA);
                        break;
                    case "destination-in":
                        gl.blendFunc(gl.ZERO, gl.SRC_ALPHA);
                        break;
                    case "destination-out":
                        gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA);
                        break;
                    case "destination-atop":
                        gl.blendFunc(gl.ONE_MINUS_DST_ALPHA, gl.SRC_ALPHA);
                        break;
                    case "multiply":
                        gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
                        break;
                    case "screen":
                        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
                        break;
                    case "copy":
                        gl.blendFunc(gl.ONE, gl.ZERO);
                        break;
                    case "lighter":
                        gl.blendFunc(gl.ONE, gl.ONE);
                        break;
                    case "darker":
                        gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA);
                        break;
                    case "xor":
                        gl.blendFunc(gl.ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                        break;
                    case "add":
                        gl.blendFunc(gl.SRC_ALPHA, gl.DST_ALPHA);
                        break;
                    default:
                        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                }

                this._currentContextSnapshot._globalCompositeOperation = this._currentGlobalCompositeOperation;
            };

            /**
            * Set the current transformation matrix.
            * @method cc.render.DecoratedWebGLRenderingContext#setTransform
            * @param a {number}
            * @param b {number}
            * @param c {number}
            * @param d {number}
            * @param tx {number}
            * @param ty {number}
            */
            DecoratedWebGLRenderingContext.prototype.setTransform = function (a, b, c, d, tx, ty) {
                this._currentContextSnapshot._currentMatrix.setTransform(a, b, c, d, tx, ty);
            };

            /**
            * Concatenate current transformation matrix with the given matrix coeficients.
            * @method cc.render.DecoratedWebGLRenderingContext#transform
            * @param a {number}
            * @param b {number}
            * @param c {number}
            * @param d {number}
            * @param tx {number}
            * @param ty {number}
            */
            DecoratedWebGLRenderingContext.prototype.transform = function (a, b, c, d, tx, ty) {
                this._currentContextSnapshot._currentMatrix.transform(a, b, c, d, tx, ty);
            };

            /**
            * Fill an area with the current fillStyle.
            * If w or h are <= 0 the call does nothing.
            * @method cc.render.DecoratedWebGLRenderingContext#fillRect
            * @param x {number}
            * @param y {number}
            * @param w {number}
            * @param h {number}
            */
            DecoratedWebGLRenderingContext.prototype.fillRect = function (x, y, w, h) {
                if (w <= 0 || h <= 0) {
                    return;
                }

                if (this._currentFillStyle !== this._currentContextSnapshot._fillStyle) {
                    this.__fillFlushIfNeeded();
                }

                if (this._batcher.batchRect(x, y, w, h, this._currentContextSnapshot)) {
                    this.flush();
                }
            };

            DecoratedWebGLRenderingContext.prototype.drawImage = function (img, sx, sy, sw, sh, dx, dy, dw, dh) {
                var ti = img._textureInfo;
                var textureId = ti._glId;

                // no texture info, or invalid gl texture id. do nothing.
                if (!img._textureInfo || textureId === -1) {
                    // BUGBUG refactor this
                    console.log(" --- lazy image to texture call.");
                    new cc.render.Texture2D(img).__setAsGLTexture(this._gl);
                    textureId = img._textureInfo._glId;
                    //return;
                }

                this.__drawImageFlushIfNeeded(textureId);

                var _sx;
                var _sy;
                var _sw;
                var _sh;
                var _dx;
                var _dy;
                var _dw;
                var _dh;

                if (arguments.length >= 9) {
                    _sx = (sx + ti._offsetX) / ti._textureWidth;
                    _sy = (sy + ti._offsetY) / ti._textureHeight;
                    _sw = (sx + sw + ti._offsetX) / ti._textureWidth;
                    _sh = (sy + sh + ti._offsetY) / ti._textureHeight;

                    _dx = dx;
                    _dy = dy;
                    _dw = dw;
                    _dh = dh;
                } else if (arguments.length >= 5) {
                    _dx = sx;
                    _dy = sy;
                    _dw = sw;
                    _dh = sh;

                    _sx = ti._u0;
                    _sy = ti._v0;
                    _sw = ti._u1;
                    _sh = ti._v1;
                } else {
                    _dx = sx;
                    _dy = sy;
                    _dw = ti._imageWidth;
                    _dh = ti._imageHeight;

                    _sx = ti._u0;
                    _sy = ti._v0;
                    _sw = ti._u1;
                    _sh = ti._v1;
                }

                if (this._batcher.batchRectWithTexture(_dx, _dy, _dw, _dh, this._currentContextSnapshot, _sx, _sy, _sw, _sh, textureId)) {
                    this.flush();
                }
            };

            /**
            * Translate the current rendering context transformation matrix.
            * @method cc.render.DecoratedWebGLRenderingContext#translate
            * @param x {number}
            * @param y {number}
            */
            DecoratedWebGLRenderingContext.prototype.translate = function (x, y) {
                this._currentContextSnapshot._currentMatrix.multiply(this.__mat3.setTranslate(x, y));
            };

            /**
            * Rotate the current rendering context transformation matrix.
            * @method cc.render.DecoratedWebGLRenderingContext#rotate
            * @param angle {number} angle in radians.
            */
            DecoratedWebGLRenderingContext.prototype.rotate = function (angle) {
                this._currentContextSnapshot._currentMatrix.multiply(this.__mat3.setRotate(angle));
            };

            /**
            * Scale the current rendering context transformation matrix.
            * @method cc.render.DecoratedWebGLRenderingContext#scale
            * @param x {number} scale x axis.
            * @param y {number} scale y axis.
            */
            DecoratedWebGLRenderingContext.prototype.scale = function (x, y) {
                this._currentContextSnapshot._currentMatrix.multiply(this.__mat3.setScale(x, y));
            };

            /**
            * Flush the content geometry, color and texture to the screen.
            * @member cc.render.DecoratedWebGLRenderingContext#flush
            */
            DecoratedWebGLRenderingContext.prototype.flush = function () {
                this._batcher.flush(this._shaders[this._currentFillStyleType]);
                //            this._debugInfo._draws++;
            };

            Object.defineProperty(DecoratedWebGLRenderingContext.prototype, "type", {
                /**
                * Get RenderingContext type.
                * @member cc.render.DecoratedWebGLRenderingContext#get:type
                * @returns {string} "webgl" or "canvas" (lowercase)
                */
                get: function () {
                    return "webgl";
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Flush content if rendering conditions changed.
            * @method cc.render.DecoratedWebGLRenderingContext#__fillFlushIfNeeded
            * @private
            */
            DecoratedWebGLRenderingContext.prototype.__fillFlushIfNeeded = function () {
                var inferredFillStyleType;
                var inferredFillStyle;

                // different fill styles set.
                if (this._currentFillStyle !== this._currentContextSnapshot._fillStyle) {
                    // a string means a color of any form.
                    if (typeof this._currentFillStyle === "string") {
                        inferredFillStyleType = 0 /* COLOR */;
                        inferredFillStyle = cc.math.Color.createFromRGBA(this._currentFillStyle);
                    } else if (this._currentFillStyle instanceof Color) {
                        inferredFillStyle = this._currentFillStyle;
                        inferredFillStyleType = 0 /* COLOR */;
                    } else {
                        // PENDING check for other fillStyleTypes
                        // no option for this fillstyle.
                        // switch to a nice indicator of something is wrong: solid magenta color.
                        inferredFillStyleType = 0 /* COLOR */;
                        inferredFillStyle = Color.MAGENTA;
                    }

                    if (inferredFillStyleType !== this._currentFillStyleType) {
                        this.flush();
                        this.__setCurrentFillStyleType(inferredFillStyleType);
                    }

                    this._currentContextSnapshot._parsedFillStyle = inferredFillStyle;
                }

                // if composite changed, flush as well.
                this.__compositeFlushIfNeeded();
            };

            /**
            * @method cc.render.DecoratedWebGLRenderingContext#__drawImageFlushIfNeeded
            * @param textureId {WebGLTexture}
            * @private
            */
            DecoratedWebGLRenderingContext.prototype.__drawImageFlushIfNeeded = function (textureId) {
                if (this._currentFillStyleType !== 1 /* IMAGE */) {
                    this.flush();

                    this.__setCurrentFillStyleType(1 /* IMAGE */);

                    var ts = this._shaders[1 /* IMAGE */];
                    ts._uniformTextureSampler.setValue(textureId);
                    if (cc.render.shader.TextureUniform._textureId !== textureId) {
                        ts._uniformTextureSampler.updateValue(this._gl);
                    }
                } else {
                    // different textures ? flush.
                    if (cc.render.shader.TextureUniform._textureId !== textureId) {
                        this.flush();
                        // BUGBUG use global WebGLState object
                    }

                    var ts = this._shaders[1 /* IMAGE */];
                    ts._uniformTextureSampler.setValue(textureId);

                    this.__compositeFlushIfNeeded();
                }
            };

            DecoratedWebGLRenderingContext.prototype.__compositeFlushIfNeeded = function () {
                if (this._currentGlobalCompositeOperation !== this._currentContextSnapshot._globalCompositeOperation) {
                    this.flush();
                    this.__setGlobalCompositeOperation();
                }
            };

            /**
            * @method cc.render.DecoratedWebGLRenderingContext#__setCurrentFillStyleType
            * @param f {cc.render.FillStyleType}
            * @private
            */
            DecoratedWebGLRenderingContext.prototype.__setCurrentFillStyleType = function (f) {
                this._shaders[this._currentFillStyleType].notUseProgram();
                this._currentFillStyleType = f;
                this._shaders[f].useProgram();
            };
            DecoratedWebGLRenderingContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL = false;

            DecoratedWebGLRenderingContext.ANTIALIAS = false;

            DecoratedWebGLRenderingContext.CTX_ALPHA = false;
            return DecoratedWebGLRenderingContext;
        })();
        render.DecoratedWebGLRenderingContext = DecoratedWebGLRenderingContext;
    })(cc.render || (cc.render = {}));
    var render = cc.render;
})(cc || (cc = {}));
//# sourceMappingURL=DecoratedWebGLRenderingContext.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (util) {
        "use strict";

        /**
        * Create a Float32Array. If it is not possible a plain Array will be created.
        * @method cc.util.FloatArray
        * @param size {number} array size.
        * @param defaultValue {number} default array values.
        * @returns {Float32Array|Array}
        */
        function FloatArray(size, defaultValue) {
            var a, i;

            defaultValue = defaultValue || 0;

            if (typeof Float32Array !== "undefined") {
                a = new Float32Array(size);
                if (defaultValue) {
                    for (i = 0; i < size; i++) {
                        a[i] = defaultValue;
                    }
                }
            } else {
                a = new Array(size);
                for (i = 0; i < size; i++) {
                    a[i] = defaultValue;
                }
            }

            return a;
        }
        util.FloatArray = FloatArray;

        /**
        * Create a UInt16Array. If it is not possible a plain Array will be created.
        * @method cc.util.UInt16Array
        * @param size {number} array size.
        * @param defaultValue {number} default array value.
        * @returns {Uint16Array|Array}
        */
        function UInt16Array(size, defaultValue) {
            var a, i;

            defaultValue = defaultValue || 0;

            if (typeof Uint16Array !== "undefined") {
                a = new Uint16Array(size);
                if (defaultValue) {
                    for (i = 0; i < size; i++) {
                        a[i] = defaultValue;
                    }
                }
            } else {
                a = new Array(size);
                for (i = 0; i < size; i++) {
                    a[i] = defaultValue;
                }
            }

            return a;
        }
        util.UInt16Array = UInt16Array;

        /**
        * Transform an string with POSIX like regular expressions into javascript regular expressions.
        * @method cc.util.fromPosixRegularExpression
        * @param expr {string}
        * @returns {string} a javascript like valid regular expression string.
        */
        function fromPosixRegularExpression(expr) {
            expr = expr.replace(/\[\:digit\:\]/g, "\\d");
            expr = expr.replace(/\[\:alpha\:\]/g, "[A-Za-z]");
            expr = expr.replace(/\[\:alnum\:\]/g, "[A-Za-z0-9]");
            expr = expr.replace(/\[\:word\:\]/g, "\\w");

            expr = expr.replace(/\[\:cntrl\:\]/g, "[\\x00-\\x1F\\x7F]");
            expr = expr.replace(/\[\:graph\:\]/g, "[\\x21-\\x7E]");
            expr = expr.replace(/\[\:lower\:\]/g, "[a-z]");
            expr = expr.replace(/\[\:print\:\]/g, "[\\x20-\\x7E]");
            expr = expr.replace(/\[\:punct\:\]/g, "[][!\"#$%&\'()*+,./:;<=>?@\\^_`{|}~-]");
            expr = expr.replace(/\[\:space\:\]/g, "\\s");
            expr = expr.replace(/\[\:upper\:\]/g, "[A-Z]");
            expr = expr.replace(/\[\:xdigit\:\]/g, "[A-Fa-f0-9]");

            return expr;
        }
        util.fromPosixRegularExpression = fromPosixRegularExpression;
    })(cc.util || (cc.util = {}));
    var util = cc.util;
})(cc || (cc = {}));
//# sourceMappingURL=util.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (Debug) {
        "use strict";

        /**
        * Runtime debug level.
        * if DEBUG, a error message will throw an exception.
        * in RELEASE, the exception is not thrown.
        *
        * @tsenum cc.Debug.RuntimeDebugLevel
        */
        (function (RuntimeDebugLevel) {
            RuntimeDebugLevel[RuntimeDebugLevel["DEBUG"] = 0] = "DEBUG";
            RuntimeDebugLevel[RuntimeDebugLevel["RELEASE"] = 1] = "RELEASE";
        })(Debug.RuntimeDebugLevel || (Debug.RuntimeDebugLevel = {}));
        var RuntimeDebugLevel = Debug.RuntimeDebugLevel;

        /**
        * Current Runtime debug level. DEBUG by default.
        * @member cc.Debug.DEBUG_LEVEL
        * @type {RuntimeDebugLevel}
        */
        Debug.DEBUG_LEVEL = 0 /* DEBUG */;

        /**
        * Debug message levels.
        *
        * @tsenum cc.Debug.DebugLevel
        */
        (function (DebugLevel) {
            DebugLevel[DebugLevel["Info"] = 0] = "Info";
            DebugLevel[DebugLevel["Warning"] = 1] = "Warning";
            DebugLevel[DebugLevel["Error"] = 2] = "Error";
        })(Debug.DebugLevel || (Debug.DebugLevel = {}));
        var DebugLevel = Debug.DebugLevel;

        var __consoleDecoration = [
            "",
            "background: orange; color: #000",
            "background: #a00; color: #fff"
        ];
        var __defaultDecoration = "background: #fff; color: #000";

        /**
        * Show a message in the console.
        * @method cc.Debug.debug
        * @param level {cc.Debug.RuntimeDebugLevel} debug level criticism
        * @param msg {string} message to show
        * @param rest {Array<any>} other parameters to show in console.
        */
        function debug(level, msg, rest) {
            console.log("%c%s:%c %s", __consoleDecoration[level], DebugLevel[level], __defaultDecoration, msg);
            if (rest.length) {
                console.log(rest);
            }

            if (level === 2 /* Error */ && Debug.DEBUG_LEVEL === 0 /* DEBUG */) {
                throw msg;
            }
        }
        Debug.debug = debug;

        /**
        * Show an error message.
        * @method cc.Debug.error
        * @param msg {string} error message.
        * @param rest {Array<any>} other elements to show in console.
        */
        function error(msg) {
            var rest = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                rest[_i] = arguments[_i + 1];
            }
            cc.Debug.debug(2 /* Error */, msg, rest);
        }
        Debug.error = error;

        /**
        * Show a warning message.
        * @method cc.Debug.warn
        * @param msg {string} error message.
        * @param rest {Array<any>} other elements to show in console.
        */
        function warn(msg) {
            var rest = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                rest[_i] = arguments[_i + 1];
            }
            cc.Debug.debug(1 /* Warning */, msg, rest);
        }
        Debug.warn = warn;

        /**
        * Show an info message.
        * @method cc.Debug.info
        * @param msg {string} error message.
        * @param rest {Array<any>} other elements to show in console.
        */
        function info(msg) {
            var rest = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                rest[_i] = arguments[_i + 1];
            }
            cc.Debug.debug(0 /* Info */, msg, rest);
        }
        Debug.info = info;
    })(cc.Debug || (cc.Debug = {}));
    var Debug = cc.Debug;
})(cc || (cc = {}));
//# sourceMappingURL=Debug.js.map

/**
* License: see license.txt file.
*/
var cc;
(function (cc) {
    (function (locale) {
        "use strict";

        //////////// Nodes
        /**
        * Calling removeFromParent and the Node has no parent.
        * @member cc.locale.NODE_WARN_REMOVEFROMPARENT_WITH_NO_PARENT
        * @type {string}
        */
        locale.NODE_WARN_REMOVEFROMPARENT_WITH_NO_PARENT = "Calling removeFromParent and the Node has no parent.";

        /**
        * Invalid pattern for naming.
        * @member cc.locale.ERR_NODE_NAME_INVALID
        * @type {string}
        */
        locale.ERR_NODE_NAME_INVALID = "Node name invalid. Must match [A-Za-z0-9_]+";

        /**
        * Invalid pattern for a call to <code>node.enumerateChildren</code>.
        * @member cc.locale.MSG_WRONG_ENUMERATE_PATTERN
        * @type {string}
        */
        locale.MSG_WRONG_ENUMERATE_PATTERN = "Wrongly defined search pattern path";

        /**
        * A call to <code>node.enumerateChildren</code> goes beyond root node.
        * @member cc.locale.MSG_ENUMERATE_UNDERFLOW
        * @type {string}
        */
        locale.MSG_ENUMERATE_UNDERFLOW = "Enumerate path underflow. Trying to go above root node.";

        /**
        * Trying to add a node with parent to another node.
        * @member cc.locale.MSG_ERROR_NODE_WITH_PARENT
        * @type {string}
        */
        locale.MSG_ERROR_NODE_WITH_PARENT = "A node added as child has already a parent.";

        /**
        * A call to <code>director.runScene</code> is made in an already running scene.
        * @member cc.locale.ERR_RUNNING_ALREADY_EXISTING_SCENE
        * @type {string}
        */
        locale.ERR_RUNNING_ALREADY_EXISTING_SCENE = "runScene trying to run already existing Scene.";

        /**
        * A call to <code>director.popScene</code> to an empty director.
        * @member cc.locale.ERR_DIRECTOR_POPSCENE_UNDERFLOW
        * @type {string}
        */
        locale.ERR_DIRECTOR_POPSCENE_UNDERFLOW = "Director popScene underflow.";

        /**
        * A call to <code>director.startAnimation</code> to a director in RUNNING state.
        * @member cc.locale.WARN_START_ANIMATION_ON_RUNNING_DIRECTOR
        * @type {string}
        */
        locale.WARN_START_ANIMATION_ON_RUNNING_DIRECTOR = "Starting animation on a running director.";

        locale.WARN_NODE_ATTRIBUTE_DOES_NOT_EXIST = "Attribute does not exist in Node object.";

        //////////// Path tracing
        /**
        * A call to an empty path.getCurrentTracePosition.
        * @member cc.locale.ERR_TRACER_EMPTY
        * @type {string}
        */
        locale.WARN_TRACER_EMPTY = "Path not initialized so no current trace position. Defaulting to (0,0).";

        /**
        * A tracing operation (lineTo, quadraticTo, etc.) is being performed in a closed SubPath.
        * @member cc.locale.WARN_TRACE_ON_CLOSED_SUBPATH
        * @type {string}
        */
        locale.WARN_TRACE_ON_CLOSED_SUBPATH = "Tracing on a closed SubPath.";

        /**
        * A closePath call is performed on an empty SubPath. No previous tracing happened on it.
        * @member cc.locale.WARN_CLOSE_EMPTY_SUBPATH
        * @type {string}
        */
        locale.WARN_CLOSE_EMPTY_SUBPATH = "Closing empty SubPath.";

        /**
        * A moveTo call is made to a SubPath with segments.
        * @member cc.locale.WARN_MOVETO_IN_NON_EMPTY_SUBPATH
        * @type {string}
        */
        locale.WARN_MOVETO_IN_NON_EMPTY_SUBPATH = "MoveTo in non empty SubPath.";

        /**
        * A getStartingPoint call is made to an empty SubPath.
        * @member cc.locale.ERR_SUBPATH_NOT_STARTED
        * @type {string}
        */
        locale.ERR_SUBPATH_NOT_STARTED = "getStartingPoint called in an empty path.";

        ///////////// Sprites
        /**
        * An operation is made in a SpriteFrame that has no associated texture.
        * @member cc.locale.ERR_SPRITE_FRAME_NO_TEXTURE
        * @type {string}
        */
        locale.ERR_SPRITE_FRAME_NO_TEXTURE = "SpriteFrame w/o Texture.";

        /**
        * Trying to create a new Sprite with wrong SpriteInitializer data.
        * @member cc.locale.ERR_SPRITE_CONSTRUCTOR_PARAM_ERROR
        * @type {string}
        */
        locale.ERR_SPRITE_CONSTRUCTOR_PARAM_ERROR = "No suitable SpriteInitializer to Sprite constructor.";

        /**
        * Calling Sprite constructor with V3 signature.
        * @member cc.locale.WARN_SPRITE_CONSTRUCTOR_DEPRECATED_CALL
        * @type {string}
        */
        locale.WARN_SPRITE_CONSTRUCTOR_DEPRECATED_CALL = "Sprite constructor call deprecated.";

        /**
        * Trying to create a add a SpriteFrame with an existing name in cache.
        * @member cc.locale.WARN_SPRITEFRAME_CREATING_SUBFRAME_WITH_EXISTING_NAME
        * @type {string}
        */
        locale.WARN_SPRITEFRAME_CREATING_SUBFRAME_WITH_EXISTING_NAME = "Adding a SpriteFrame with existing name in cache.";
    })(cc.locale || (cc.locale = {}));
    var locale = cc.locale;
})(cc || (cc = {}));
//# sourceMappingURL=Locale.js.map
