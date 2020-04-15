function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import Engine from "../../engine/Engine.js";
import GameBehaviours from "../GameBehaviors.js";

var PlayScene = /*#__PURE__*/function (_Engine$Base$Scene) {
  _inherits(PlayScene, _Engine$Base$Scene);

  function PlayScene(bpm, timeWSound, timeWOSound, cycles, feedback) {
    var _this;

    _classCallCheck(this, PlayScene);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlayScene).call(this, "PlayScene"));
    console.log(bpm + " " + timeWSound + " " + timeWOSound + " " + cycles + " " + feedback);
    console.log("hello");
    var gameObject = new Engine.Base.GameObject(320, 240);
    var circle = new Engine.Components.CircleComponent(100, "white", "black");
    gameObject.addComponent(circle);
    var ScoreCalculator = new GameBehaviours.ScoreCalculator();
    gameObject.addComponent(ScoreCalculator);
    var Timer = new GameBehaviours.Timer(bpm, timeWSound, timeWOSound, cycles);
    gameObject.addComponent(Timer);
    var guideText = new Engine.Base.GameObject(0, -150);
    var text = new Engine.Components.TextComponent("", "15pt Times", "white");
    var textController = new GameBehaviours.TextController(Timer, text);
    guideText.addComponent(text);
    guideText.addComponent(textController);
    gameObject.children.push(guideText);
    var TapHandler = new GameBehaviours.TapHandler(bpm);
    gameObject.addComponent(TapHandler);
    var CircleBehaviour = new GameBehaviours.CircleBehaviour(feedback);
    gameObject.addComponent(CircleBehaviour);

    _this.children.push(gameObject);

    return _this;
  }

  return PlayScene;
}(Engine.Base.Scene);

export { PlayScene as default };