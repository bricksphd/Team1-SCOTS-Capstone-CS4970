function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TapInfo = /*#__PURE__*/function () {
  function TapInfo(beat, beatLength, pressTime, releaseTime, timeSinceLast, soundOn, side, cycleNumber) {
    _classCallCheck(this, TapInfo);

    _defineProperty(this, "beat", void 0);

    _defineProperty(this, "prevBeat", void 0);

    _defineProperty(this, "nextBeat", void 0);

    _defineProperty(this, "pressTime", void 0);

    _defineProperty(this, "releaseTime", void 0);

    _defineProperty(this, "duration", void 0);

    _defineProperty(this, "delta", void 0);

    _defineProperty(this, "nextDelta", void 0);

    _defineProperty(this, "prevDelta", void 0);

    _defineProperty(this, "timeSinceLast", void 0);

    _defineProperty(this, "soundOn", void 0);

    _defineProperty(this, "side", void 0);

    _defineProperty(this, "cycleNumber", void 0);

    this.beat = beat;
    this.prevBeat = beat - beatLength;
    this.nextBeat = beat + beatLength;
    this.pressTime = pressTime;
    this.releaseTime = releaseTime;
    this.duration = releaseTime - pressTime;
    this.delta = pressTime - beat;
    this.nextDelta = pressTime - this.nextBeat;
    this.prevDelta = pressTime - this.prevBeat;
    this.timeSinceLast = timeSinceLast;
    this.soundOn = soundOn;
    this.side = side;
    this.cycleNumber = cycleNumber;
  }

  _createClass(TapInfo, [{
    key: "updateDuration",
    value: function updateDuration() {
      this.duration = this.releaseTime - this.pressTime;
    }
  }]);

  return TapInfo;
}();

export default TapInfo;