module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).default;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Vanilla JS Modal compatible with Bootstrap
                                                                                                                                                                                                                                                                               * modal-vanilla 0.13.0 <https://github.com/KaneCohen/modal-vanilla>
                                                                                                                                                                                                                                                                               * Copyright 2020 Kane Cohen <https://github.com/KaneCohen>
                                                                                                                                                                                                                                                                               * Available under BSD-3-Clause license
                                                                                                                                                                                                                                                                               */


var _events = __webpack_require__(2);

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _factory = null;

var _defaults = Object.freeze({
  el: null, // Existing DOM element that will be 'Modal-ized'.
  animate: true, // Show Modal using animation.
  animateClass: 'fade', //
  animateInClass: 'show', //
  appendTo: 'body', // DOM element to which constructed Modal will be appended.
  backdrop: true, // Boolean or 'static', Show Modal backdrop blocking content.
  keyboard: true, // Close modal on esc key.
  title: false, // Content of the title in the constructed dialog.
  header: true, // Show header content.
  content: false, // Either string or an HTML element.
  footer: true, // Footer content. By default will use buttons.
  buttons: null, //
  headerClose: true, // Show close button in the header.
  construct: false, // Creates new HTML with a given content.
  transition: 300, //
  backdropTransition: 150 //
});

var _buttons = deepFreeze({
  dialog: [{ text: 'Cancel',
    value: false,
    attr: {
      'class': 'btn btn-default',
      'data-dismiss': 'modal'
    }
  }, { text: 'OK',
    value: true,
    attr: {
      'class': 'btn btn-primary',
      'data-dismiss': 'modal'
    }
  }],
  alert: [{ text: 'OK',
    attr: {
      'class': 'btn btn-primary',
      'data-dismiss': 'modal'
    }
  }],
  confirm: [{ text: 'Cancel',
    value: false,
    attr: {
      'class': 'btn btn-default',
      'data-dismiss': 'modal'
    }
  }, { text: 'OK',
    value: true,
    attr: {
      'class': 'btn btn-primary',
      'data-dismiss': 'modal'
    }
  }]
});

var _templates = {
  container: '<div class="modal"></div>',
  dialog: '<div class="modal-dialog"></div>',
  content: '<div class="modal-content"></div>',
  header: '<div class="modal-header"></div>',
  headerClose: '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>',
  body: '<div class="modal-body"></div>',
  footer: '<div class="modal-footer"></div>',
  backdrop: '<div class="modal-backdrop"></div>'
};

function deepFreeze(obj) {
  for (var k in obj) {
    if (Array.isArray(obj[k])) {
      obj[k].forEach(function (v) {
        deepFreeze(v);
      });
    } else if (obj[k] !== null && _typeof(obj[k]) === 'object') {
      Object.freeze(obj[k]);
    }
  }
  return Object.freeze(obj);
}

function guid() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16) + ((1 + Math.random()) * 0x10000 | 0).toString(16);
}

function data(el, prop, value) {
  var prefix = 'data';
  var elData = el[prefix] || {};
  if (typeof value === 'undefined') {
    if (el[prefix] && el[prefix][prop]) {
      return el[prefix][prop];
    } else {
      var dataAttr = el.getAttribute(prefix + '-' + prop);
      if (typeof dataAttr !== 'undefined') {
        return dataAttr;
      }
      return null;
    }
  } else {
    elData[prop] = value;
    el[prefix] = elData;
    return el;
  }
}

function build(html, all) {
  if (html.nodeName) return html;
  html = html.replace(/(\t|\n$)/g, '');

  if (!_factory) {
    _factory = document.createElement('div');
  }

  _factory.innerHTML = '';
  _factory.innerHTML = html;
  if (all === true) {
    return _factory.childNodes;
  } else {
    return _factory.childNodes[0];
  }
}

function calcScrollbarWidth() {
  var inner = void 0;
  var width = void 0;
  var outerWidth = void 0;
  var outer = document.createElement('div');
  _extends(outer.style, {
    visibility: 'hidden',
    width: '100px'
  });
  document.body.appendChild(outer);

  outerWidth = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  width = outerWidth - inner.offsetWidth;
  document.body.removeChild(outer);

  return width;
}

function getPath(node) {
  var nodes = [node];
  while (node.parentNode) {
    node = node.parentNode;
    nodes.push(node);
  }
  return nodes;
}

var Modal = function (_EventEmitter) {
  _inherits(Modal, _EventEmitter);

  _createClass(Modal, null, [{
    key: 'alert',
    value: function alert(message) {
      var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var options = _extends({}, _defaults, {
        title: message,
        content: false,
        construct: true,
        headerClose: false,
        buttons: Modal.buttons.alert
      }, _options);

      return new Modal(options);
    }
  }, {
    key: 'confirm',
    value: function confirm(question) {
      var _options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var options = _extends({}, _defaults, {
        title: question,
        content: false,
        construct: true,
        headerClose: false,
        buttons: Modal.buttons.confirm
      }, _options);

      return new Modal(options);
    }
  }, {
    key: 'templates',
    set: function set(templates) {
      this._baseTemplates = templates;
    },
    get: function get() {
      return _extends({}, _templates, Modal._baseTemplates || {});
    }
  }, {
    key: 'buttons',
    set: function set(buttons) {
      this._baseButtons = buttons;
    },
    get: function get() {
      return _extends({}, _buttons, Modal._baseButtons || {});
    }
  }, {
    key: 'options',
    set: function set(options) {
      this._baseOptions = options;
    },
    get: function get() {
      return _extends({}, _defaults, Modal._baseOptions || {});
    }
  }, {
    key: 'version',
    get: function get() {
      return '0.13.0';
    }
  }]);

  function Modal() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

    _this.id = guid();
    _this.el = null;
    _this._html = {};
    _this._events = {};
    _this._visible = false;
    _this._pointerInContent = false;
    _this._options = _extends({}, Modal.options, options);
    _this._templates = _extends({}, Modal.templates, options.templates || {});
    _this._html.appendTo = document.querySelector(_this._options.appendTo);
    _this._scrollbarWidth = calcScrollbarWidth();

    if (_this._options.buttons === null) {
      _this._options.buttons = Modal.buttons.dialog;
    }

    if (_this._options.el) {
      var el = _this._options.el;
      if (typeof _this._options.el == 'string') {
        el = document.querySelector(_this._options.el);
        if (!el) {
          throw new Error('Selector: DOM Element ' + _this._options.el + ' not found.');
        }
      }
      data(el, 'modal', _this);
      _this.el = el;
    } else {
      _this._options.construct = true;
    }

    if (_this._options.construct) {
      _this._render();
    } else {
      _this._mapDom();
    }
    return _this;
  }

  _createClass(Modal, [{
    key: '_render',
    value: function _render() {
      var html = this._html;
      var o = this._options;
      var t = this._templates;
      var animate = o.animate ? o.animateClass : false;

      html.container = build(t.container);
      html.dialog = build(t.dialog);
      html.content = build(t.content);
      html.header = build(t.header);
      html.headerClose = build(t.headerClose);
      html.body = build(t.body);
      html.footer = build(t.footer);
      if (animate) html.container.classList.add(animate);

      this._setHeader();
      this._setContent();
      this._setFooter();

      this.el = html.container;

      html.dialog.appendChild(html.content);
      html.container.appendChild(html.dialog);

      return this;
    }
  }, {
    key: '_mapDom',
    value: function _mapDom() {
      var html = this._html;
      var o = this._options;

      if (this.el.classList.contains(o.animateClass)) {
        o.animate = true;
      }

      html.container = this.el;
      html.dialog = this.el.querySelector('.modal-dialog');
      html.content = this.el.querySelector('.modal-content');
      html.header = this.el.querySelector('.modal-header');
      html.headerClose = this.el.querySelector('.modal-header .close');
      html.body = this.el.querySelector('.modal-body');
      html.footer = this.el.querySelector('.modal-footer');

      this._setHeader();
      this._setContent();
      this._setFooter();

      return this;
    }
  }, {
    key: '_setHeader',
    value: function _setHeader() {
      var html = this._html;
      var o = this._options;

      if (o.header && html.header) {
        if (o.title.nodeName) {
          html.header.innerHTML = o.title.outerHTML;
        } else if (typeof o.title === 'string') {
          html.header.innerHTML = '<h4 class="modal-title">' + o.title + '</h4>';
        }
        // Add header close button only to constructed modals.
        if (this.el === null && html.headerClose && o.headerClose) {
          html.header.appendChild(html.headerClose);
        }
        if (o.construct) {
          html.content.appendChild(html.header);
        }
      }
    }
  }, {
    key: '_setContent',
    value: function _setContent() {
      var html = this._html;
      var o = this._options;

      if (o.content && html.body) {
        if (typeof o.content === 'string') {
          html.body.innerHTML = o.content;
        } else {
          html.body.innerHTML = o.content.outerHTML;
        }
        if (o.construct) {
          html.content.appendChild(html.body);
        }
      }
    }
  }, {
    key: '_setFooter',
    value: function _setFooter() {
      var html = this._html;
      var o = this._options;

      if (o.footer && html.footer) {
        if (o.footer.nodeName) {
          html.footer.innerHTML = o.footer.outerHTML;
        } else if (typeof o.footer === 'string') {
          html.footer.innerHTML = o.footer;
        } else if (!html.footer.children.length) {
          o.buttons.forEach(function (button) {
            var el = document.createElement('button');
            data(el, 'button', button);
            el.innerHTML = button.text;
            el.setAttribute('type', 'button');
            for (var j in button.attr) {
              el.setAttribute(j, button.attr[j]);
            }
            html.footer.appendChild(el);
          });
        }
        if (o.construct) {
          html.content.appendChild(html.footer);
        }
      }
    }
  }, {
    key: '_setEvents',
    value: function _setEvents() {
      var o = this._options;
      var html = this._html;

      this._events.keydownHandler = this._handleKeydownEvent.bind(this);
      document.body.addEventListener('keydown', this._events.keydownHandler);

      this._events.mousedownHandler = this._handleMousedownEvent.bind(this);
      html.container.addEventListener('mousedown', this._events.mousedownHandler);

      this._events.clickHandler = this._handleClickEvent.bind(this);
      html.container.addEventListener('click', this._events.clickHandler);

      this._events.resizeHandler = this._handleResizeEvent.bind(this);
      window.addEventListener('resize', this._events.resizeHandler);
    }
  }, {
    key: '_handleMousedownEvent',
    value: function _handleMousedownEvent(e) {
      var _this2 = this;

      this._pointerInContent = false;
      var path = getPath(e.target);
      path.every(function (node) {
        if (node.classList && node.classList.contains('modal-content')) {
          _this2._pointerInContent = true;
          return false;
        }
        return true;
      });
    }
  }, {
    key: '_handleClickEvent',
    value: function _handleClickEvent(e) {
      var _this3 = this;

      var path = getPath(e.target);
      path.every(function (node) {
        if (node.tagName === 'HTML') {
          return false;
        }
        if (_this3._options.backdrop !== true && node.classList.contains('modal')) {
          return false;
        }
        if (node.classList.contains('modal-content')) {
          return false;
        }
        if (node.getAttribute('data-dismiss') === 'modal') {
          _this3.emit('dismiss', _this3, e, data(e.target, 'button'));
          _this3.hide();
          return false;
        }

        if (!_this3._pointerInContent && node.classList.contains('modal')) {
          _this3.emit('dismiss', _this3, e, null);
          _this3.hide();
          return false;
        }
        return true;
      });

      this._pointerInContent = false;
    }
  }, {
    key: '_handleKeydownEvent',
    value: function _handleKeydownEvent(e) {
      if (e.which === 27 && this._options.keyboard) {
        this.emit('dismiss', this, e, null);
        this.hide();
      }
    }
  }, {
    key: '_handleResizeEvent',
    value: function _handleResizeEvent(e) {
      this._resize();
    }
  }, {
    key: 'show',
    value: function show() {
      var _this4 = this;

      var o = this._options;
      var html = this._html;
      this.emit('show', this);

      this._checkScrollbar();
      this._setScrollbar();
      document.body.classList.add('modal-open');

      if (o.construct) {
        html.appendTo.appendChild(html.container);
      }

      html.container.style.display = 'block';
      html.container.scrollTop = 0;

      if (o.backdrop !== false) {
        this.once('showBackdrop', function () {
          _this4._setEvents();

          if (o.animate) html.container.offsetWidth; // Force reflow

          html.container.classList.add(o.animateInClass);

          setTimeout(function () {
            _this4._visible = true;
            _this4.emit('shown', _this4);
          }, o.transition);
        });
        this._backdrop();
      } else {
        this._setEvents();

        if (o.animate) html.container.offsetWidth; // Force reflow

        html.container.classList.add(o.animateInClass);

        setTimeout(function () {
          _this4._visible = true;
          _this4.emit('shown', _this4);
        }, o.transition);
      }
      this._resize();

      return this;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this._visible) {
        this.hide();
      } else {
        this.show();
      }
    }
  }, {
    key: '_resize',
    value: function _resize() {
      var modalIsOverflowing = this._html.container.scrollHeight > document.documentElement.clientHeight;

      this._html.container.style.paddingLeft = !this.bodyIsOverflowing && modalIsOverflowing ? this._scrollbarWidth + 'px' : '';

      this._html.container.style.paddingRight = this.bodyIsOverflowing && !modalIsOverflowing ? this._scrollbarWidth + 'px' : '';
    }
  }, {
    key: '_backdrop',
    value: function _backdrop() {
      var _this5 = this;

      var html = this._html;
      var t = this._templates;
      var o = this._options;
      var animate = o.animate ? o.animateClass : false;

      html.backdrop = build(t.backdrop);
      if (animate) html.backdrop.classList.add(animate);
      html.appendTo.appendChild(html.backdrop);

      if (animate) html.backdrop.offsetWidth;

      html.backdrop.classList.add(o.animateInClass);

      setTimeout(function () {
        _this5.emit('showBackdrop', _this5);
      }, this._options.backdropTransition);
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this6 = this;

      var html = this._html;
      var o = this._options;
      var contCList = html.container.classList;
      this.emit('hide', this);

      contCList.remove(o.animateInClass);

      if (o.backdrop) {
        var backCList = html.backdrop.classList;
        backCList.remove(o.animateInClass);
      }

      this._removeEvents();

      setTimeout(function () {
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = _this6.originalBodyPad;
      }, o.backdropTransition);

      setTimeout(function () {
        if (o.backdrop) {
          html.backdrop.parentNode.removeChild(html.backdrop);
        }
        html.container.style.display = 'none';

        if (o.construct) {
          html.container.parentNode.removeChild(html.container);
        }

        _this6._visible = false;
        _this6.emit('hidden', _this6);
      }, o.transition);

      return this;
    }
  }, {
    key: '_removeEvents',
    value: function _removeEvents() {
      if (this._events.keydownHandler) {
        document.body.removeEventListener('keydown', this._events.keydownHandler);
      }

      this._html.container.removeEventListener('mousedown', this._events.mousedownHandler);

      this._html.container.removeEventListener('click', this._events.clickHandler);

      window.removeEventListener('resize', this._events.resizeHandler);
    }
  }, {
    key: '_checkScrollbar',
    value: function _checkScrollbar() {
      this.bodyIsOverflowing = document.body.clientWidth < window.innerWidth;
    }
  }, {
    key: '_setScrollbar',
    value: function _setScrollbar() {
      this.originalBodyPad = document.body.style.paddingRight || '';
      if (this.bodyIsOverflowing) {
        var basePadding = parseInt(this.originalBodyPad || 0, 10);
        document.body.style.paddingRight = basePadding + this._scrollbarWidth + 'px';
      }
    }
  }]);

  return Modal;
}(_events2.default);

exports.default = Modal;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ })
/******/ ]);