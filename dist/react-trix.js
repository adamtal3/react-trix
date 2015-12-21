(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Trix"] = factory(require("React"));
	else
		root["Trix"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Trix = __webpack_require__(1);

	var _Trix2 = _interopRequireDefault(_Trix);

	exports['default'] = _Trix2['default'];
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	// There are 2 flows possible for updates:

	// 1. regular user flow: User types stuff -> this.editor.value + trix-change -> this.props.onChange
	// 2. forced flow (reset...): this.props.value -> this.editor.value (trix-change not triggered)

	var TrixEditor = (function (_React$Component) {
	  _inherits(TrixEditor, _React$Component);

	  function TrixEditor() {
	    _classCallCheck(this, TrixEditor);

	    _get(Object.getPrototypeOf(TrixEditor.prototype), 'constructor', this).apply(this, arguments);

	    this._id = this._generateId();
	  }

	  _createClass(TrixEditor, [{
	    key: 'componentDidMount',

	    // 1. For the first flow we forward trix-change events to this.props.onChange
	    value: function componentDidMount() {
	      this.editor = document.getElementById('editor-' + this._id);
	      this.editor.addEventListener('trix-change', this.trixChanged.bind(this));
	      this.editor.addEventListener('trix-initialize', this.trixChanged.bind(this));
	    }
	  }, {
	    key: 'trixChanged',
	    value: function trixChanged(nativeEvent) {
	      this.props.onChange(this._value, nativeEvent);
	    }

	    // 2. Value is not read after initialization (See https://github.com/spiffytech/trix/commit/0e19f2cadb5cd0092fe6b16c25919f0c4ae387de)
	    // so for the second flow, we need to check that we are not at the end of the feedback loop
	    // of the firt flow and update Trix' value
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.value !== this.editor.value) {
	        this.editor.value = nextProps.value;
	      }
	    }

	    // We don't need to update on this.props.value changes since Trix won't read it anyway.
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return false;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.editor.removeEventListener('trix-change', this.props.onChange);
	      this.editor.removeEventListener('trix-initialize', this.props.onChange);
	    }
	  }, {
	    key: '_generateId',

	    // I don't get it, I guess you took it from someone who did ;)
	    value: function _generateId() {
	      var timestamp = Date.now();
	      var uniqueNumber = 0;

	      (function () {
	        // If created at same millisecond as previous
	        if (timestamp <= uniqueNumber) {
	          timestamp = ++uniqueNumber;
	        } else {
	          uniqueNumber = timestamp;
	        }
	      })();

	      return 'T' + timestamp;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      // http://stackoverflow.com/questions/25553910/one-liner-to-take-some-properties-from-object-in-es6
	      var forwardedProps = function forwardedProps(_ref) {
	        var toolbar = _ref.toolbar;
	        return { toolbar: toolbar };
	      };
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement('trix-editor', { id: 'editor-' + this._id, input: 'input-' + this._id }),
	        _react2['default'].createElement('input', _extends({ type: 'hidden',
	          ref: function (el) {
	            return _this._value = el.value;
	          },
	          id: 'input-' + this._id,
	          value: this.props.value
	        }, forwardedProps(this.props)))
	      );
	    }
	  }]);

	  return TrixEditor;
	})(_react2['default'].Component);

	TrixEditor.propTypes = {
	  onChange: _react.PropTypes.func.isRequired,
	  value: _react.PropTypes.string,
	  toolbar: _react.PropTypes.object
	};

	exports['default'] = TrixEditor;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;