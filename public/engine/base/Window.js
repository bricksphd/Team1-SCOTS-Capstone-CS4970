function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Window = function Window() {
  _classCallCheck(this, Window);
};

_defineProperty(Window, "width", void 0);

_defineProperty(Window, "height", void 0);

export { Window as default };