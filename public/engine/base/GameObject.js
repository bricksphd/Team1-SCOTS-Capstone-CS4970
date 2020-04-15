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

import NameableParent from "./NamableParent.js";

var GameObject = /*#__PURE__*/function (_NameableParent) {
  _inherits(GameObject, _NameableParent);

  function GameObject() {
    var _this;

    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var scaleX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var scaleY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var rotation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    _classCallCheck(this, GameObject);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameObject).call(this));

    _defineProperty(_assertThisInitialized(_this), "x", void 0);

    _defineProperty(_assertThisInitialized(_this), "y", void 0);

    _defineProperty(_assertThisInitialized(_this), "scaleX", void 0);

    _defineProperty(_assertThisInitialized(_this), "scaleY", void 0);

    _defineProperty(_assertThisInitialized(_this), "rotation", void 0);

    _defineProperty(_assertThisInitialized(_this), "components", []);

    var _ref = [x, y, scaleX, scaleY, rotation];
    _this.x = _ref[0];
    _this.y = _ref[1];
    _this.scaleX = _ref[2];
    _this.scaleY = _ref[3];
    _this.rotation = _ref[4];
    return _this;
  }

  _createClass(GameObject, [{
    key: "addComponent",
    value: function addComponent(component) {
      this.components.push(component);
      component.gameObject = this;
      if (component.start) component.start();
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scaleX, this.scaleY);
      ctx.rotate(this.rotation);
      this.components.filter(function (i) {
        return i.draw;
      }).forEach(function (i) {
        return i.draw(ctx);
      }); //Now draw all the children

      this.children.filter(function (i) {
        return i.draw;
      }).forEach(function (i) {
        return i.draw(ctx);
      });
      ctx.restore();
    }
  }, {
    key: "update",
    value: function update() {
      this.components.filter(function (i) {
        return i.update;
      }).forEach(function (i) {
        return i.update();
      }); //Now update all the children

      this.children.filter(function (i) {
        return i.update;
      }).forEach(function (i) {
        return i.update();
      });
    }
  }, {
    key: "getComponent",
    value: function getComponent(type) {
      var component = this.components.find(function (i) {
        return i instanceof type;
      });
      if (component) return component;
      throw "Error, couldn't find type " + type;
    }
  }, {
    key: "pulse",
    value: function pulse() {
      this.components.filter(function (i) {
        return i.pulse;
      }).forEach(function (i) {
        return i.pulse();
      });
      this.children.filter(function (i) {
        return i.pulse;
      }).forEach(function (i) {
        return i.pulse();
      });
    }
  }]);

  return GameObject;
}(NameableParent);

export { GameObject as default };