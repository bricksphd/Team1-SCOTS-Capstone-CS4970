function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
import TapInfo from "../data/TapInfo.js";
import Timer from "./Timer.js";

var TapHandler = /*#__PURE__*/function (_Base$Behavior) {
  _inherits(TapHandler, _Base$Behavior);

  function TapHandler(bpm) {
    var _this;

    _classCallCheck(this, TapHandler);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TapHandler).call(this));

    _defineProperty(_assertThisInitialized(_this), "startTime", -1);

    _defineProperty(_assertThisInitialized(_this), "beatTime", 0);

    _defineProperty(_assertThisInitialized(_this), "lastTap", 0);

    _defineProperty(_assertThisInitialized(_this), "soundOn", true);

    _defineProperty(_assertThisInitialized(_this), "side", 0);

    _defineProperty(_assertThisInitialized(_this), "tapInfo", void 0);

    _defineProperty(_assertThisInitialized(_this), "timer", void 0);

    _defineProperty(_assertThisInitialized(_this), "tapDataSoundOff", []);

    _defineProperty(_assertThisInitialized(_this), "tapDataTotal", []);

    _defineProperty(_assertThisInitialized(_this), "currentCycle", 1);

    _this.beatTime = Math.round(60000 / bpm);
    return _this;
  }

  _createClass(TapHandler, [{
    key: "start",
    value: function start() {
      this.timer = this.gameObject.getComponent(Timer);
    }
  }, {
    key: "tapDown",
    value: function tapDown() {
      var date = new Date();
      var currentTime = date.getTime(); //First tap, set startTime to that tap

      if (this.timer.startTime == -1) {
        this.startTime = this.timer.startTimer(); //this.startTime = this.timer.startTime;
      }

      var timing = (currentTime - this.startTime) % this.beatTime;

      if (timing > this.beatTime / 2) {
        timing = timing - this.beatTime;
      }

      this.tapInfo = new TapInfo(currentTime - this.startTime - timing, this.beatTime, currentTime - this.startTime, "none", currentTime - this.startTime - this.lastTap, this.soundOn, this.side, this.currentCycle);
      this.lastTap = currentTime - this.startTime;
      return this.tapInfo.delta;
    }
  }, {
    key: "tapUp",
    value: function tapUp() {
      var date = new Date();
      var currentTime = date.getTime();
      this.tapInfo.releaseTime = currentTime - this.startTime;
      this.tapInfo.updateDuration();
      if (!this.timer.soundOn && !this.timer.gameOver) this.tapDataSoundOff.push(this.tapInfo);
      this.tapDataTotal.push(this.tapInfo);
      console.log(this.tapInfo);
    }
  }]);

  return TapHandler;
}(Base.Behavior);

export { TapHandler as default };