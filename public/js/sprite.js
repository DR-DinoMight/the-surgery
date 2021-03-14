/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./resources/js/stream/AvatarObject.js":
/*!*********************************************!*\
  !*** ./resources/js/stream/AvatarObject.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AvatarLoaded": () => (/* binding */ AvatarLoaded),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SpriteMaker_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpriteMaker.js */ "./resources/js/stream/SpriteMaker.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var SPRITE_INCREMENT = 48,
    SPRITE_SIZE = 64,
    MOVEMENT_SPEED = 1.5,
    MIN_ANIMATION_TIME = 3000,
    MAX_ANIMATION_TIME = 7000,
    TIMESPERFRAME = 250;

var a = function a(n) {
  return n.split(',').map(function (k) {
    return {
      x: parseInt(k),
      f: !!k.match('f')
    };
  });
};

var ANIMS = {
  rotate: a("0,0f,4,2"),
  down: a("0,3,5f,2f"),
  up: a("1,4,4f,1f"),
  left: a("2,5"),
  right: a("0f,3f"),
  idle: a("3,2f")
};
var currentAnimName;

var AvatarObject = /*#__PURE__*/function () {
  function AvatarObject() {
    var char_config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'idle';
    var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, AvatarObject);

    currentAnimName = direction;
    this.spriteSheetMaker = new _SpriteMaker_js__WEBPACK_IMPORTED_MODULE_1__.default(char_config);
    this.ideling = false;
    var keys = Object.keys(ANIMS);
    this.direction = keys[keys.length * Math.random() << 0];
    this.x = x; // where to draw X coordinate

    this.y = y; // where to draw Y coordinate.
    // the height of sprite

    this.timePerFrame = TIMESPERFRAME; //time in(ms) given to each frame default 250ms

    this.numberOfFrames = ANIMS[this.direction].length - 1; //number of frames(sprites) in the spritesheet, default 1
    //current frame pointer

    this.frameIndex = 0;
    this.require_redraw = false;
  }

  _createClass(AvatarObject, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var _this = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.spriteSheetMaker.load();
                window.addEventListener("SpritMakerLoaded", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
                  var image;
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          image = new Image();
                          image.src = _this.spriteSheetMaker.getImage();
                          _this.spriteSheet = image;
                          _this.reversedSpriteSheet = document.createElement('canvas');

                          _this.spriteSheet.addEventListener('load', function () {
                            _this.reversedSpriteSheet.width = _this.spriteSheet.width;
                            _this.reversedSpriteSheet.height = _this.spriteSheet.height;

                            var ctx2 = _this.reversedSpriteSheet.getContext('2d');

                            ctx2.scale(-1, 1); // flip

                            ctx2.drawImage(_this.spriteSheet, -_this.spriteSheet.width, 0);
                          }, {
                            once: true
                          });

                          _this.width = _this.spriteSheet.width; //the width of sprite

                          _this.height = _this.spriteSheet.height; //last time frame index was updated

                          _this.lastUpdate = Date.now();
                          _this.lastAnimationChange = Date.now();
                          document.dispatchEvent(AvatarLoaded);

                        case 10:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })), {
                  once: true,
                  passive: true,
                  capture: true
                }); // co;nsole.image( await this.spriteSheetMaker.getImage());

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.require_redraw) {
                  _context3.next = 5;
                  break;
                }

                console.log("here redrawing");
                _context3.next = 4;
                return this.load();

              case 4:
                this.require_redraw = false;

              case 5:
                if (Date.now() - this.lastUpdate >= this.timePerFrame) {
                  this.frameIndex++;

                  if (this.frameIndex > this.numberOfFrames) {
                    this.frameIndex = 0;
                  }

                  this.lastUpdate = Date.now();
                }

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "changeAnimation",
    value: function changeAnimation(context) {
      var _this2 = this;

      var currentDate = Date.now();

      if (currentDate >= this.lastAnimationChange + MIN_ANIMATION_TIME && Math.random() < 0.20 || currentDate >= this.lastAnimationChange + MAX_ANIMATION_TIME) {
        var keys = Object.keys(ANIMS).filter(function (dir) {
          return dir !== _this2.direction;
        }); // console.log(keys);

        this.direction = keys[keys.length * Math.random() << 0];
        this.lastAnimationChange = currentDate;
      }

      if (this.y + SPRITE_SIZE > context.canvas.height - 5) {
        this.direction = 'up'; // this.lastAnimationChange = Date.now();
      } else if (this.y < 5) {
        this.direction = 'down'; // this.lastAnimationChange = Date.now();
      } else if (this.x < 0 && this.direction == 'left') {
        // this.direction = 'right'
        this.x = context.canvas.width - 5; // this.lastAnimationChange = Date.now();
      } else if (this.x + SPRITE_SIZE > context.canvas.width && this.direction == 'right') {
        this.x = 0; // this.lastAnimationChange = Date.now();
      } // console.log(this.x + SPRITE_SIZE, context.canvas.width, this.x + SPRITE_SIZE > context.canvas.width)
      // this.direction = direction;
      // this.frameIndex = 0;

    }
  }, {
    key: "setMessage",
    value: function setMessage(message) {
      this.message = message;
    }
  }, {
    key: "setDirection",
    value: function setDirection(direction, time) {
      var dateNow = Date.now();
      this.direction = direction;

      if (time) {
        dateNow += time;
      }

      this.lastAnimationChange = dateNow;
    }
  }, {
    key: "displayMessage",
    value: function displayMessage(context, message) {
      this.drawTextBG(context, message || this.message);
    }
  }, {
    key: "drawTextBG",
    value: function drawTextBG(ctx, txt) {
      var font = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '18px Pixeled';
      /// lets save current state as we make a lot of changes
      ctx.save(); /// set font

      ctx.font = font; /// draw text from top - makes life easier at the moment

      ctx.textBaseline = 'top'; /// color for background

      ctx.fillStyle = 'rgb(204, 153, 0, 0.6)'; /// get width of text

      var width = ctx.measureText(txt).width;
      var y = this.y; //- 40;

      var x = this.x; //- width;

      if (y - 40 < ctx.canvas.height / 2) {
        y = this.y + SPRITE_SIZE + parseInt(font, 10);
      } else if (this.y > ctx.canvas.height / 2) {
        y = this.y - (parseInt(font, 10) + 20);
      }

      if (x < 0) {
        x = width + SPRITE_SIZE;
      } else if (this.x > ctx.canvas.width / 2) {
        x = this.x - width + SPRITE_SIZE;
      } /// draw background rect assuming height of font


      ctx.fillRect(x, y, width + 10, parseInt(font, 10) + 10); /// text color

      ctx.fillStyle = '#0F111A'; // ctx.textAlign = "center";
      /// draw text on top

      ctx.fillText(txt, x + 5, y + 5); /// restore original state

      ctx.restore();
    }
  }, {
    key: "draw",
    value: function () {
      var _draw = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4(context) {
        var time, nt, anim, len, findex, frame;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.loading) {
                  time = Date.now ? Date.now() : +new Date();
                  nt = parseInt(time / 200); // var anim = ANIMS[this.direction];

                  anim = ANIMS[this.direction];
                  len = anim.length;
                  findex = nt % len;
                  frame = anim[findex];
                  this.changeAnimation(context);
                  this.displayMessage(context);

                  if (!this.ideling) {
                    if (this.direction == 'down') {
                      this.y += MOVEMENT_SPEED;
                    } else if (this.direction == 'up') {
                      this.y -= MOVEMENT_SPEED;
                    } else if (this.direction == 'right') {
                      this.x += MOVEMENT_SPEED;
                    } else if (this.direction == 'left') {
                      this.x -= MOVEMENT_SPEED;
                    }
                  }

                  context.save();
                  context.drawImage(!frame.f ? this.spriteSheet : this.reversedSpriteSheet, frame.x * 16, 0, 16, 16, this.x, this.y, SPRITE_SIZE, SPRITE_SIZE);
                  context.restore();
                }

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function draw(_x) {
        return _draw.apply(this, arguments);
      }

      return draw;
    }()
  }]);

  return AvatarObject;
}();

var AvatarLoaded = new Event("AvatarLoaded", {
  bubbles: true,
  cancelable: true,
  composed: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AvatarObject);

/***/ }),

/***/ "./resources/js/stream/SpriteMaker.js":
/*!********************************************!*\
  !*** ./resources/js/stream/SpriteMaker.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpriteMakerLoaded": () => (/* binding */ SpriteMakerLoaded),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var gTextures = {
  loaded: 0,
  requested: 0
};
var PARTS_MAX = {
  eyes: 16,
  mouth: 8,
  ears: 7,
  torso: 6,
  hair: 22
};
var COLORS = {
  'dr_dinos': ["#181B29", "#81F900", "#FFB626", "#315F00"],
  'panthers': ["#181B29", "#F11012", "#FFB626", "#F2F2F2"],
  "battlebot by luce carter": ["#181B29", "#FFA03A", "#0F2745", "#787878"],
  "basic": ["#000000", "#787878", "#e8e8e8", "#ffffff"],
  "ice cream gb palette by kerrie lake": ["#7c3f58", "#eb6b6f", "#f9a875", "#fff6d3"],
  "mist gb palette by kerrie lake": ["#2d1b00", "#1e606e", "#5ab9a8", "#c4f0c2"],
  "rustic gb palette by kerrie lake": ["#2c2137", "#764462", "#edb4a1", "#a96868"],
  "en4 palette by endesga": ["#20283d", "#426e5d", "#e5b083", "#fbf7f3"],
  "grand dad 4 palette by starlane": ["#4c1c2d", "#d23c4e", "#5fb1f5", "#eaf5fa"],
  "pokemon (sgb) palette": ["#181010", "#84739c", "#f7b58c", "#ffefff"],
  "grafxkid gameboy pocket (gray) palette by grafxkid": ["#2b2b26", "#706b66", "#a89f94", "#e0dbcd"],
  "cga palette 1 (high) palette": ["#000000", "#ff55ff", "#55ffff", "#ffffff"],
  "nintendo gameboy (arne) palette by arne": ["#243137", "#3f503f", "#768448", "#acb56b"],
  "jb4 palette by haretro for his game jet boy": ["#260016", "#ed008c", "#00bff3", "#daf3ec"],
  "sweet guaranã palette by madpezkoh": ["#253b46", "#18865f", "#61d162", "#ebe7ad"],
  "grafxkid gameboy pocket (green) palette by grafxkid": ["#4c625a", "#7b9278", "#abc396", "#dbf4b4"],
  "yellow mellow": ["#181b29", "#b3760a", "#ffb626", "#cc9900"],
  "sql by matty_twoshoes": ["#755ACD", "#000000", "#82E4C6", "#4c625a"]
};
var gParts = {};
var gColorMode = '013';

var SpriteMaker = /*#__PURE__*/function () {
  function SpriteMaker() {
    var char_config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, SpriteMaker);

    this.canvas = document.createElement('canvas');
    this.canvas.width = 16 * 6;
    this.canvas.height = 16 * 1;
    this.context = this.canvas.getContext('2d');
    this.loading = true;

    if (char_config) {
      this.char_config = JSON.parse(char_config);
    } // console.log(this.chosenColor, color, COLORS);
    // console.log('this.chosenColor', this.chosenColor)

  }

  _createClass(SpriteMaker, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.loadAllTextures();

              case 2:
                if (!(this.char_config != null)) {
                  _context.next = 13;
                  break;
                }

                gParts['hair'] = this.char_config.hair;
                gParts['eyes'] = this.char_config.eyes;
                gParts['mouth'] = this.char_config.mouth;
                gParts['ears'] = this.char_config.ears;
                gParts['torso'] = this.char_config.torso;
                this.chosenColor = COLORS[this.char_config.color];
                gColorMode = this.char_config.gColorMode;
                console.log('pred', this.char_config, this.chosenColor, this.char_config.color, COLORS);
                _context.next = 15;
                break;

              case 13:
                _context.next = 15;
                return this.randomiseAll();

              case 15:
                _context.next = 17;
                return this.updatecanvas();

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "getCanvas",
    value: function getCanvas() {
      return this.canvas;
    }
  }, {
    key: "getImage",
    value: function getImage() {
      var image = this.canvas.toDataURL("image/png");
      return image;
    }
  }, {
    key: "loadTexture",
    value: function () {
      var _loadTexture = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2(key) {
        var self, texture;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                self = this;
                texture = new Image();
                texture.src = "/imgs/spriteParts/".concat(key, ".png?v=").concat(Math.random());
                gTextures.requested++;
                gTextures[key] = texture;

                texture.onload = function (e) {
                  gTextures.loaded++;

                  if (gTextures.loaded == gTextures.requested) {
                    self.updatecanvas().then(function () {
                      window.dispatchEvent(SpriteMakerLoaded);
                    });
                  }
                };

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadTexture(_x) {
        return _loadTexture.apply(this, arguments);
      }

      return loadTexture;
    }()
  }, {
    key: "loadAllTextures",
    value: function () {
      var _loadAllTextures = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.loadTexture("hair");

              case 2:
                _context3.next = 4;
                return this.loadTexture("base");

              case 4:
                _context3.next = 6;
                return this.loadTexture("eyes");

              case 6:
                _context3.next = 8;
                return this.loadTexture("mouth");

              case 8:
                _context3.next = 10;
                return this.loadTexture("ears");

              case 10:
                _context3.next = 12;
                return this.loadTexture("torso");

              case 12:
                _context3.next = 14;
                return this.loadTexture("hands");

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadAllTextures() {
        return _loadAllTextures.apply(this, arguments);
      }

      return loadAllTextures;
    }()
  }, {
    key: "drawPart",
    value: function drawPart(key, forceY, forceFrame) {
      var y = gParts[key] == null ? forceY : gParts[key]; // 0's falsy

      if (y == null) {
        return;
      }

      var w = 16 * 6;
      var h = 16;

      if (forceFrame || forceFrame === 0) {
        this.context.drawImage(gTextures[key], forceFrame * 16, y * 16, 16, 16, forceFrame * 16, 0, 16, 16);
      } else {
        this.context.drawImage(gTextures[key], 0, y * 16, w, h, 0, 0, w, h);
      }
    }
  }, {
    key: "updatecanvas",
    value: function () {
      var _updatecanvas = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(gTextures.loaded == gTextures.requested)) {
                  _context4.next = 14;
                  break;
                }

                this.loading = true;
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.drawImage(gTextures['base'], 0, 0);
                this.drawPart("hair");
                this.drawPart("torso");
                this.drawPart("ears");
                this.drawPart("mouth");
                this.drawPart("eyes");
                this.drawPart("hands", 0); // back of the hair
                // this.drawPart("hair", null, 4);
                // this.drawPart("hair", null, 1);

                _context4.next = 12;
                return this.colourSprite();

              case 12:
                this.loading = false;
                return _context4.abrupt("return", this.canvas);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updatecanvas() {
        return _updatecanvas.apply(this, arguments);
      }

      return updatecanvas;
    }()
  }, {
    key: "colourSprite",
    value: function () {
      var _colourSprite = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee5() {
        var imageData, data, keys, color, C, mode, dark, mid, light, i, r;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
                data = imageData.data;
                keys = Object.keys(COLORS); // console.log(keys);

                color = this.chosenColor || COLORS[keys[keys.length * Math.random() << 0]];

                C = function C(n) {
                  return [parseInt(color[n].substr(1, 2), 16), parseInt(color[n].substr(3, 2), 16), parseInt(color[n].substr(5, 2), 16)];
                };

                mode = gColorMode.split('').map(function (n) {
                  return parseInt(n);
                });
                dark = C(mode[0]);
                mid = C(mode[1]);
                light = C(mode[2]);

                for (i = 0; i < data.length; i += 4) {
                  r = data[i];

                  if (r < 50) {
                    data[i + 0] = dark[0];
                    data[i + 1] = dark[1];
                    data[i + 2] = dark[2];
                    data[i + 3] = 255;
                  } else if (r < 180) {
                    data[i + 0] = mid[0];
                    data[i + 1] = mid[1];
                    data[i + 2] = mid[2];
                    data[i + 3] = 255;
                  } else if (r < 245) {
                    data[i + 0] = light[0];
                    data[i + 1] = light[1];
                    data[i + 2] = light[2];
                    data[i + 3] = 255;
                  } else if (r < 251) {
                    data[i + 0] = light[0];
                    data[i + 1] = light[1];
                    data[i + 2] = light[2];
                    data[i + 3] = 255;
                  } else {
                    data[i + 0] = 255;
                    data[i + 1] = 255;
                    data[i + 2] = 255;
                    data[i + 3] = 0;
                  }
                }

                this.context.putImageData(imageData, 0, 0);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function colourSprite() {
        return _colourSprite.apply(this, arguments);
      }

      return colourSprite;
    }()
  }, {
    key: "randomise",
    value: function () {
      var _randomise = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee6(key) {
        var i, max, randval;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                for (i = 0; i < 6; i++) {
                  max = PARTS_MAX[key];
                  randval = Math.floor(Math.random() * (max + 1));
                  gParts[key] = randval;
                }

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function randomise(_x2) {
        return _randomise.apply(this, arguments);
      }

      return randomise;
    }()
  }, {
    key: "randomiseAll",
    value: function () {
      var _randomiseAll = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee7() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.randomise("hair");

              case 2:
                _context7.next = 4;
                return this.randomise("eyes");

              case 4:
                _context7.next = 6;
                return this.randomise("mouth");

              case 6:
                _context7.next = 8;
                return this.randomise("ears");

              case 8:
                _context7.next = 10;
                return this.randomise("torso");

              case 10:
                this.loading = false;

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function randomiseAll() {
        return _randomiseAll.apply(this, arguments);
      }

      return randomiseAll;
    }()
  }]);

  return SpriteMaker;
}();

var SpriteMakerLoaded = new Event("SpritMakerLoaded", {
  bubbles: true,
  cancelable: true,
  composed: true
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SpriteMaker);

/***/ }),

/***/ "./resources/js/stream/UserObject.js":
/*!*******************************************!*\
  !*** ./resources/js/stream/UserObject.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AvatarObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AvatarObject.js */ "./resources/js/stream/AvatarObject.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var DEATHRATE = 300000;

var UserObject = /*#__PURE__*/function () {
  function UserObject(username) {
    var char_config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, UserObject);

    this.username = username;
    this.avatar = new _AvatarObject_js__WEBPACK_IMPORTED_MODULE_1__.default(char_config);
    this.avatar.load();
    this.avatar.setMessage(this.username);
    this.lastTimeSeen = Date.now();
    this.deathTime = this.lastTimeSeen + DEATHRATE;
    this.lastGenerate = Date.now();
  }

  _createClass(UserObject, [{
    key: "updateActivity",
    value: function () {
      var _updateActivity = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var direction,
            time,
            char_config,
            _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                direction = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
                time = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                char_config = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
                this.lastTimeSeen = Date.now();

                if (direction) {
                  this.avatar.setDirection(direction, time);
                }

                this.deathTime = this.lastTimeSeen + DEATHRATE;

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateActivity() {
        return _updateActivity.apply(this, arguments);
      }

      return updateActivity;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var displayDebug,
            config,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                displayDebug = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : false;
                config = _args2.length > 1 ? _args2[1] : undefined;

                if (Date.parse(config.last_fetched_data_at) > this.lastGenerate) {
                  this.avatar.spriteSheetMaker.char_config = JSON.parse(config['sprite_data']);
                  this.avatar.require_redraw = true;
                  this.lastGenerate = Date.parse(config.last_fetched_data_at);
                }

                _context2.next = 5;
                return this.avatar.update();

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update() {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return UserObject;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserObject);

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************************!*\
  !*** ./resources/js/sprite.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stream_UserObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stream/UserObject.js */ "./resources/js/stream/UserObject.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var canvas, context;
var users = [];
var disallowList = ['pretzelrocks', 'streamelements'];
var client = new tmi.Client({
  connection: {
    reconnect: true
  },
  channels: ['Dr_DinoMight']
});

window.onload = function () {
  canvas = document.getElementById('container');
  canvas.width = document.documentElement.clientWidth - 16;
  canvas.height = document.documentElement.clientHeight - 16;
  context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;
  client.connect();
  client.on("connected", function (address, port) {
    console.log("connected");
  });
  client.on("chat", function (channel, userstate, message, self) {
    // Don't listen to my own messages..
    if (self || disallowList.indexOf(userstate['display-name'].toLowerCase()) == 1) return; // Do your stuff.

    var user = users.find(function (o) {
      return o.username.toLowerCase() == userstate['display-name'].toLowerCase();
    }); // console.log(!user);

    if (!user) {
      var prefectedChannelsUser = prefectedChannels[userstate['display-name'].toLowerCase()];

      if (prefectedChannels[userstate['display-name'].toLowerCase()]) {
        users.push(new _stream_UserObject_js__WEBPACK_IMPORTED_MODULE_1__.default(prefectedChannelsUser["twitch_username"], prefectedChannelsUser["sprite_data"]));
      } else {
        users.push(new _stream_UserObject_js__WEBPACK_IMPORTED_MODULE_1__.default(userstate['display-name']));
      } // console.log(users);

    } else {
      var action = null,
          time = null; // commands

      if (message.startsWith('!')) {
        var command = message.split(" ")[0];

        switch (command.toLowerCase()) {
          case '!dance':
            action = 'rotate';
            time = parseInt(message.replace('!dance', '').trim());
            break;

          case '!idle':
            action = 'idle';
            time = parseInt(message.replace('!idle', '').trim());
            break;

          case '!left':
            action = 'left';
            time = parseInt(message.replace('!left', '').trim());
            break;

          case '!right':
            action = 'right';
            time = parseInt(message.replace('!right', '').trim());
            break;

          case '!up':
            action = 'up';
            time = parseInt(message.replace('!up', '').trim());
            break;

          case '!down':
            action = 'down';
            time = parseInt(message.replace('!down', '').trim());
            break;
        }

        if (Number.isNaN(time) || time > 999999 || time < 0) {
          time = 1000;
        }
      }

      user.updateActivity(action, time);
    }
  }); // users.push(new UserObject('hello long name', 'dr_dinos'));

  document.addEventListener('AvatarLoaded', function () {
    loop();
  }, {
    once: true,
    passive: true,
    capture: true
  });
};

var loop = function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
};

var update = function update() {
  var newUser = [];
  users.forEach(function (user) {
    if (user.deathTime >= Date.now()) {
      newUser.push(user);
      var config = prefectedChannels[user.username];
      user.update(true, config);
    }
  });
  users = newUser;
};

var draw = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            context.clearRect(0, 0, canvas.width, canvas.height);
            users.forEach(function (user) {
              // console.log('useruser)
              user.avatar.draw(context);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function draw() {
    return _ref.apply(this, arguments);
  };
}();
})();

/******/ })()
;