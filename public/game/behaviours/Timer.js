function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Base from "../../engine/Base.js";
import ScoreCalculator from "./ScoreCalculator.js";
import TapHandler from "./TapHandler.js";
import { createSession } from "../../Data.js";

var Timer = /*#__PURE__*/function (_Base$Behavior) {
  _inherits(Timer, _Base$Behavior);

  function Timer(bpm, soundPhaseTime, noSoundPhaseTime, cycles) {
    var _this;

    _classCallCheck(this, Timer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Timer).call(this));

    _defineProperty(_assertThisInitialized(_this), "bpm", void 0);

    _defineProperty(_assertThisInitialized(_this), "currentTime", void 0);

    _defineProperty(_assertThisInitialized(_this), "startTime", -1);

    _defineProperty(_assertThisInitialized(_this), "beatTime", void 0);

    _defineProperty(_assertThisInitialized(_this), "soundPhaseTime", void 0);

    _defineProperty(_assertThisInitialized(_this), "noSoundPhaseTime", void 0);

    _defineProperty(_assertThisInitialized(_this), "phaseSwitchTime", void 0);

    _defineProperty(_assertThisInitialized(_this), "cycles", void 0);

    _defineProperty(_assertThisInitialized(_this), "endTime", void 0);

    _defineProperty(_assertThisInitialized(_this), "tapHandler", void 0);

    _defineProperty(_assertThisInitialized(_this), "soundOn", true);

    _defineProperty(_assertThisInitialized(_this), "scoreCalculator", void 0);

    _defineProperty(_assertThisInitialized(_this), "gameOver", false);

    _defineProperty(_assertThisInitialized(_this), "interval", void 0);

    _defineProperty(_assertThisInitialized(_this), "beatSound", void 0);

    _defineProperty(_assertThisInitialized(_this), "mostRecentBeat", 0);

    _defineProperty(_assertThisInitialized(_this), "volumeChange", void 0);

    _defineProperty(_assertThisInitialized(_this), "currentCycle", 1);

    _this.bpm = bpm;
    _this.beatTime = Math.round(60000 / bpm);
    _this.soundPhaseTime = soundPhaseTime * 1000;
    _this.noSoundPhaseTime = noSoundPhaseTime * 1000;
    _this.cycles = cycles;
    return _this;
  }

  _createClass(Timer, [{
    key: "start",
    value: function start() {
      this.scoreCalculator = this.gameObject.getComponent(ScoreCalculator);
      this.beatSound = new Audio("./game/assets/newbeat.wav"); //Algorithm to determine the amount of volume change each beat once 3/4 of the way through soundPhase

      this.volumeChange = 1 / (0.25 * (this.soundPhaseTime / 1000) / (this.beatTime / 1000)); //Bind the variables that are being set in playBeat

      this.interval = setInterval(this.playBeat.bind(this), this.beatTime);
      this.mostRecentBeat = new Date().getTime();
    }
  }, {
    key: "playBeat",
    value: function playBeat() {
      //Check if we're in the sound on phase
      if (this.soundOn) {
        //Check if volume needs to be lowered (3/4 of the way through soundPhase), if so lower it
        if (this.currentTime >= this.startTime + 0.75 * this.soundPhaseTime && this.startTime != -1) {
          var newVolume = this.beatSound.volume - this.volumeChange;

          if (newVolume < 0) {
            newVolume = 0;
          }

          console.log("Lowering volume to " + newVolume);
          this.beatSound.volume = newVolume;
        }

        this.beatSound.play();
      } //If we're in the sound off phase, check if we're not on the last cycle
      else if (this.currentCycle != this.cycles) {
          //If not on the last cycle, check if we need to raise volume (3/4 of the way through soundOffPhase)
          if (this.currentTime >= this.phaseSwitchTime + 0.75 * this.noSoundPhaseTime && this.startTime != -1) {
            var _newVolume = this.beatSound.volume + this.volumeChange;

            if (_newVolume > 1) {
              _newVolume = 1;
            }

            console.log("Increasing volume to " + _newVolume);
            this.beatSound.volume = _newVolume;
          }

          if (this.beatSound.volume > 0) {
            this.beatSound.play();
          }
        }

      this.mostRecentBeat = new Date().getTime();
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      this.tapHandler = this.gameObject.getComponent(TapHandler); //Set the start time to the most recent beat that they are trying to hit

      this.startTime = this.mostRecentBeat;
      this.phaseSwitchTime = this.startTime + this.soundPhaseTime;
      this.endTime = this.phaseSwitchTime + this.noSoundPhaseTime + this.beatTime / 2;
      this.tapHandler.startTime = this.startTime;
      console.log("Start time is " + this.startTime);
      return this.startTime;
    }
  }, {
    key: "update",
    value: function update() {
      this.currentTime = new Date().getTime(); //If we're in the sound phase

      if (this.soundOn) {
        if (this.currentTime > this.phaseSwitchTime + this.beatTime / 2) {
          console.log("Turning sound off");
          this.soundOn = false;
        } //In the sound off phase

      } else {
        //If the current time we are at is the final time
        if (this.currentTime > this.endTime) {
          if (!this.gameOver) {
            //If we are on the last cycle
            if (this.currentCycle == this.cycles) {
              this.gameOver = true;
              var feedback = sessionStorage.getItem('feedback');
              var assignmentId = sessionStorage.getItem('aid');
              var stringTapVersion = JSON.parse(JSON.stringify(this.tapHandler.tapDataTotal));
              var ref = this;
              firebase.auth().onAuthStateChanged( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(firebaseUser) {
                  var sesh;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!firebaseUser) {
                            _context.next = 10;
                            break;
                          }

                          console.log(stringTapVersion);
                          _context.next = 4;
                          return createSession(assignmentId, ref.bpm, ref.soundPhaseTime, ref.noSoundPhaseTime, ref.cycles, feedback, firebaseUser.uid, stringTapVersion);

                        case 4:
                          sesh = _context.sent;
                          console.log(sesh);
                          sessionStorage.setItem('totalTapArray', JSON.stringify(ref.tapHandler.tapDataTotal));
                          sessionStorage.setItem('score', ref.scoreCalculator.calculateScore(ref.tapHandler.tapDataSoundOff, ref.beatTime, ref.noSoundPhaseTime, ref.cycles));
                          sessionStorage.setItem('data', JSON.stringify(ref.tapHandler.tapDataSoundOff));
                          document.location.href = "./results.html";

                        case 10:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x) {
                  return _ref.apply(this, arguments);
                };
              }());
            } else {
              //Reset everything for the next cycle
              console.log("Resetting");
              this.currentCycle++;
              this.startTimer();
              this.beatSound.volume = 1;
              this.soundOn = true;
              this.tapHandler.currentCycle = this.currentCycle;
            }
          }
        }
      }
    }
  }]);

  return Timer;
}(Base.Behavior);

export { Timer as default };