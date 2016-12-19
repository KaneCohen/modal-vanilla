module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Vanilla JS Modal compatible with Bootstrap
	 * modal-vanilla 0.3.3 <https://github.com/KaneCohen/modal-vanilla>
	 * Copyright 2016 Kane Cohen <https://github.com/KaneCohen>
	 * Available under BSD-3-Clause license
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _events = __webpack_require__(1);

	var _events2 = _interopRequireDefault(_events);

	var _factory = document.createElement('div');

	var _scrollbarWidth = calcScrollbarWidth();

	var _defaults = Object.freeze({
	  el: null, // Existing DOM element that will be 'Modal-ized'.
	  animate: true, // Show Modal using animation.
	  animateClass: 'fade', //
	  appendTo: 'body', // DOM element to which constructed Modal will be appended.
	  backdrop: true, // Boolean or 'static', Show Modal backdrop bocking content.
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
	      'class': 'btn btn-flat btn-danger',
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
	      'class': 'btn btn-danger',
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
	    } else if (obj[k] !== null && typeof obj[k] === 'object') {
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

	  _factory.innerHTML = '';
	  _factory.innerHTML = html;
	  if (all === true) {
	    return _factory.childNodes;
	  } else {
	    return _factory.childNodes[0];
	  }
	}

	function calcScrollbarWidth() {
	  var inner = undefined;
	  var width = undefined;
	  var outerWidth = undefined;
	  var outer = document.createElement('div');
	  Object.assign(outer.style, {
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

	var Modal = (function (_EventEmitter) {
	  _inherits(Modal, _EventEmitter);

	  _createClass(Modal, null, [{
	    key: 'alert',
	    value: function alert(message) {
	      var _options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var options = Object.assign({}, _defaults, {
	        title: message,
	        content: false,
	        construct: true,
	        headerClose: false,
	        buttons: _buttons.alert
	      }, _options);

	      return new Modal(options);
	    }
	  }, {
	    key: 'confirm',
	    value: function confirm(question) {
	      var _options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      var options = Object.assign({}, _defaults, {
	        title: question,
	        content: false,
	        construct: true,
	        headerClose: false,
	        buttons: _buttons.confirm
	      }, _options);

	      return new Modal(options);
	    }
	  }, {
	    key: 'templates',
	    get: function get() {
	      return Object.assign({}, _templates);
	    }
	  }, {
	    key: 'buttons',
	    get: function get() {
	      return Object.assign({}, _buttons);
	    }
	  }, {
	    key: 'options',
	    get: function get() {
	      return Object.assign({}, _defaults);
	    }
	  }, {
	    key: 'version',
	    get: function get() {
	      return '0.3.1';
	    }
	  }]);

	  function Modal() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Modal);

	    _get(Object.getPrototypeOf(Modal.prototype), 'constructor', this).call(this);

	    this.id = guid();
	    this.el = null;
	    this._html = {};
	    this._events = {};
	    this._visible = false;
	    this._options = Object.assign({}, Modal.options, options);
	    this._templates = Object.assign({}, Modal.templates, options.templates || {});
	    this._html.appendTo = document.querySelector(this._options.appendTo);

	    if (this._options.buttons === null) {
	      this._options.buttons = Modal.buttons.dialog;
	    }

	    if (this._options.el) {
	      var el = this._options.el;
	      if (typeof this._options.el == 'string') {
	        el = document.querySelector(this._options.el);
	        if (!el) {
	          throw new Error('Selector: DOM Element ' + this._options.el + ' not found.');
	        }
	      }
	      data(el, 'modal', this);
	      this.el = el;
	    } else {
	      this._options.construct = true;
	    }

	    if (this._options.construct) {
	      this._render();
	    } else {
	      this._mapDom();
	    }
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

	      if (o.header && !html.header || o.title) {
	        if (o.title.nodeName) {
	          html.header.innerHTML = o.title.outerHTML;
	        } else if (typeof o.title === 'string') {
	          html.header.innerHTML = '<h4 class="modal-title">' + o.title + '</h4>';
	        }
	        // Add header close button only to constructed modals.
	        if (this.el === null && html.headerClose && o.headerClose) {
	          html.header.insertBefore(html.headerClose, html.header.firstChild);
	        }
	        html.content.appendChild(html.header);
	      }
	    }
	  }, {
	    key: '_setContent',
	    value: function _setContent() {
	      var html = this._html;
	      var o = this._options;

	      if (o.content) {
	        if (typeof o.content === 'string') {
	          html.body.innerHTML = o.content;
	        } else {
	          html.body.innerHTML = o.content.outerHTML;
	        }
	        html.content.appendChild(html.body);
	      }
	    }
	  }, {
	    key: '_setFooter',
	    value: function _setFooter() {
	      var html = this._html;
	      var o = this._options;

	      if (o.footer) {
	        html.footer.innerHTML = '';
	        if (o.footer.nodeName) {
	          html.footer.ineerHTML = o.footer.outerHTML;
	        } else if (typeof o.footer === 'string') {
	          html.footer.innerHTML = o.footer;
	        } else {
	          o.buttons.forEach(function (button) {
	            var el = document.createElement('button');
	            data(el, 'button', button);
	            el.innerHTML = button.text;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	              for (var _iterator = Object.keys(button.attr)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var j = _step.value;

	                el.setAttribute(j, button.attr[j]);
	              }
	            } catch (err) {
	              _didIteratorError = true;
	              _iteratorError = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion && _iterator['return']) {
	                  _iterator['return']();
	                }
	              } finally {
	                if (_didIteratorError) {
	                  throw _iteratorError;
	                }
	              }
	            }

	            html.footer.appendChild(el);
	          });
	        }
	        html.content.appendChild(html.footer);
	      }
	    }
	  }, {
	    key: '_setEvents',
	    value: function _setEvents() {
	      var o = this._options;
	      var html = this._html;

	      if (o.backdrop === true) {
	        this._events.keydownHandler = this._handleKeydownEvent.bind(this);
	        document.body.addEventListener('keydown', this._events.keydownHandler);
	      }

	      this._events.clickHandler = this._handleClickEvent.bind(this);
	      html.container.addEventListener('click', this._events.clickHandler);

	      this._events.resizeHandler = this._handleResizeEvent.bind(this);
	      window.addEventListener('resize', this._events.resizeHandler);
	    }
	  }, {
	    key: '_handleClickEvent',
	    value: function _handleClickEvent(e) {
	      var _this = this;

	      var path = getPath(e.target);
	      path.every(function (node) {
	        if (node.tagName === 'HTML') {
	          return false;
	        }
	        if (node.classList.contains('modal-content')) {
	          return false;
	        }
	        if (node.getAttribute('data-dismiss') === 'modal') {
	          _this.emit('dismiss', _this, e, data(e.target, 'button'));
	          _this.hide();
	          return false;
	        }
	        if (node.classList.contains('modal')) {
	          _this.emit('dismiss', _this, e, null);
	          _this.hide();
	          return false;
	        }
	        return true;
	      });
	    }
	  }, {
	    key: '_handleKeydownEvent',
	    value: function _handleKeydownEvent(e) {
	      if (e.which === 27) {
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
	      var _this2 = this;

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

	      this.once('showBackdrop', function () {
	        _this2._setEvents();

	        if (o.animate) html.container.offsetWidth; // Force reflow

	        html.container.classList.add('in');

	        setTimeout(function () {
	          _this2._visible = true;
	          _this2.emit('shown', _this2);
	        }, o.transition);
	      });

	      this._backdrop();
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

	      this._html.container.style.paddingLeft = !this.bodyIsOverflowing && modalIsOverflowing ? _scrollbarWidth + 'px' : '';

	      this._html.container.style.paddingRight = this.bodyIsOverflowing && !modalIsOverflowing ? _scrollbarWidth + 'px' : '';
	    }
	  }, {
	    key: '_backdrop',
	    value: function _backdrop() {
	      var _this3 = this;

	      var html = this._html;
	      var t = this._templates;
	      var o = this._options;
	      var animate = o.animate ? o.animateClass : false;

	      html.backdrop = build(t.backdrop);
	      if (animate) html.backdrop.classList.add(animate);
	      html.appendTo.appendChild(html.backdrop);

	      if (animate) html.backdrop.offsetWidth;

	      html.backdrop.classList.add('in');

	      setTimeout(function () {
	        _this3.emit('showBackdrop', _this3);
	      }, this._options.backdropTransition);
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      var _this4 = this;

	      var html = this._html;
	      var o = this._options;
	      var backCList = html.backdrop.classList;
	      var contCList = html.container.classList;
	      this.emit('hide', this);

	      backCList.remove('in');
	      contCList.remove('in');

	      this._removeEvents();

	      setTimeout(function () {
	        document.body.classList.remove('modal-open');
	        document.body.style.paddingRight = _this4.originalBodyPad;
	      }, o.backdropTransition);

	      setTimeout(function () {
	        html.backdrop.remove();
	        html.container.style.display = 'none';

	        if (o.construct) {
	          html.container.remove();
	        }

	        _this4._visible = false;
	        _this4.emit('hidden', _this4);
	      }, o.transition);

	      return this;
	    }
	  }, {
	    key: '_removeEvents',
	    value: function _removeEvents() {
	      if (this._events.keydownHandler) {
	        document.body.removeEventListener('keydown', this._events.keydownHandler);
	      }

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
	        document.body.style.paddingRight = basePadding + _scrollbarWidth + 'px';
	      }
	    }
	  }]);

	  return Modal;
	})(_events2['default']);

	exports['default'] = Modal;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ }
/******/ ]);