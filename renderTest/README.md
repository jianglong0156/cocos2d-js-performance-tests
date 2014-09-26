Render test
============================

##The test environment##

###Canvas###

Canvas size: 2000x2000

Canvas color: black

Allow beyond page display range.

Insert the FPS statistics inside each engine loop.

###Sprite###

texture size: 150x26

Sprite size: 50x26

Clipping texture.

##Testing Items##

###Test Levels###

1. 200 sprites
2. 450 sprites
3. 800 sprites
4. 1250 sprites (only desktop)
5. 1800 sprites (only desktop)
6. 2450 sprites (only desktop)
7. 3200 sprites (only desktop)

###Static sprite###

Rendering static Sprite.

Statistical data after the frame rate stable.

###Rotation###

Rotate 360 degrees.

###Move###

Move to the right of the 50 pixel.

###Scale###

The ScaleX will be enlarged to 2.

##The test engine##

|engine|version|
|:-:|:-:|
|cocos2d-html5|new renderer|
|egret|1.0.6|
|impact|1.23|
|phaser|2.1.1|
|pixi|1.6.0|