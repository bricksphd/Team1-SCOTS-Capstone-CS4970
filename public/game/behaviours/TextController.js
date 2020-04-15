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

var Timer = /*#__PURE__*/function (_Base$Behavior) {
  _inherits(Timer, _Base$Behavior);

  function Timer(timer, text) {
    var _this;

    _classCallCheck(this, Timer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Timer).call(this));

    _defineProperty(_assertThisInitialized(_this), "timer", void 0);

    _defineProperty(_assertThisInitialized(_this), "text", void 0);

    _this.timer = timer;
    _this.text = text;
    return _this;
  }

  _createClass(Timer, [{
    key: "start",
    value: function start() {}
  }, {
    key: "update",
    value: function update() {
      if (this.timer.startTime == -1) {
        this.text.text = "Press Spacebar in time with the beat!";
      } else if (this.timer.currentTime < this.timer.startTime + this.timer.soundPhaseTime / 4 * 3) {
        this.text.text = "The sound will soon fade out. Keep tapping after the sound fades out!";
      } else if (this.timer.currentTime < this.timer.startTime + this.timer.soundPhaseTime) {
        this.text.text = "The sound is fading out. Keep Tapping!";
      } else if (this.timer.currentTime > this.timer.startTime + this.timer.soundPhaseTime + this.timer.noSoundPhaseTime / 4 * 3 && this.timer.currentCycle != this.timer.cycles) {
        this.text.text = "The sound is coming back. Use this time to get back on beat!";
      } else {
        this.text.text = "Keep tapping!";
      }
    }
  }]);

  return Timer;
}(Base.Behavior);

export { Timer as default };