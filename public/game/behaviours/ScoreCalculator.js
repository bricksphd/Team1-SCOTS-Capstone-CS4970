function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import Base from "../../engine/Base.js";

var ScoreCalculator = /*#__PURE__*/function (_Base$Behavior) {
  _inherits(ScoreCalculator, _Base$Behavior);

  function ScoreCalculator() {
    _classCallCheck(this, ScoreCalculator);

    return _possibleConstructorReturn(this, _getPrototypeOf(ScoreCalculator).apply(this, arguments));
  }

  _createClass(ScoreCalculator, [{
    key: "calculateScore",
    value: function calculateScore(data, beatTime, phaseTime, cycles) {
      var closestHitDelta = 0;
      var lastBeat = phaseTime;
      var misses = 0;
      var score = phaseTime;
      data.forEach(function (tap) {
        var currentBeat = tap.beat; //New beat

        if (currentBeat != lastBeat) {
          //New beat hit
          if (lastBeat + beatTime == currentBeat) {
            //Factor the last beat hit into the score
            score -= closestHitDelta;
            closestHitDelta = Math.abs(tap.delta);
            lastBeat = currentBeat;
          } //Missed a beat
          else {
              console.log("Missed a beat at " + lastBeat);
              var numMisses = currentBeat - beatTime - lastBeat;
              numMisses = numMisses / beatTime; //console.log("Number of misses: " + numMisses);

              misses += numMisses;
              closestHitDelta = Math.abs(tap.delta);
              lastBeat = currentBeat;
            }
        } //Tap on the same beat
        else {
            console.log("Hit the same beat"); //Current tap is closer

            if (closestHitDelta > Math.abs(tap.delta)) {
              closestHitDelta = Math.abs(tap.delta);
            }

            misses++;
          }
      }); //Check if missed the last beat

      if (lastBeat != phaseTime * 2) {
        console.log("Missed the last beat"); //Calculate the number of misses from the last beat

        var numMisses = phaseTime * 2 - lastBeat;
        numMisses = numMisses / beatTime;
        misses += numMisses;
      } else {
        score -= closestHitDelta;
      }

      var missPenalty = misses * beatTime;
      console.log("Miss Penalty: " + missPenalty + ", with " + misses + " misses");
      score -= missPenalty;
      score /= phaseTime * cycles + 0.5 * beatTime;

      if (score < 0) {
        score = 0;
      }

      return score;
    }
  }]);

  return ScoreCalculator;
}(Base.Behavior);

export { ScoreCalculator as default };