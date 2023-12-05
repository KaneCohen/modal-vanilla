/**
 * Vanilla JS Modal compatible with Bootstrap
 * modal-vanilla 0.13.0 <https://github.com/KaneCohen/modal-vanilla>
 * Copyright 2020 Kane Cohen <https://github.com/KaneCohen>
 * Available under BSD-3-Clause license
 */
import EventEmitter from 'events';

let _factory = null;

const _defaults = Object.freeze({
  el: null,               // Existing DOM element that will be 'Modal-ized'.
  animate: true,          // Show Modal using animation.
  animateClass: 'fade',   //
  animateInClass: 'show', //
  appendTo: 'body',       // DOM element to which constructed Modal will be appended.
  backdrop: true,         // Boolean or 'static', Show Modal backdrop blocking content.
  keyboard: true,         // Close modal on esc key.
  title: false,           // Content of the title in the constructed dialog.
  header: true,           // Show header content.
  content: false,         // Either string or an HTML element.
  footer: true,           // Footer content. By default will use buttons.
  buttons: null,          //
  headerClose: true,      // Show close button in the header.
  construct: false,       // Creates new HTML with a given content.
  transition: 300,        //
  backdropTransition: 150 //
});

const _buttons = deepFreeze({
  dialog: [
    {text: 'Cancel',
      value: false,
      attr: {
        'class': 'btn btn-default',
        'data-dismiss': 'modal'
      }
    },
    {text: 'OK',
      value: true,
      attr: {
        'class': 'btn btn-primary',
        'data-dismiss': 'modal'
      }
    }
  ],
  alert: [
    {text: 'OK',
      attr: {
        'class': 'btn btn-primary',
        'data-dismiss': 'modal'
      }
    }
  ],
  confirm: [
    {text: 'Cancel',
      value: false,
      attr: {
        'class': 'btn btn-default',
        'data-dismiss': 'modal'
      }
    },
    {text: 'OK',
      value: true,
      attr: {
        'class': 'btn btn-primary',
        'data-dismiss': 'modal'
      }
    }
  ]
});

const _templates = {
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
  for (let k in obj) {
    if (Array.isArray(obj[k])) {
      obj[k].forEach(v => {
        deepFreeze(v);
      });
    } else if (obj[k] !== null && typeof obj[k] === 'object') {
      Object.freeze(obj[k]);
    }
  }
  return Object.freeze(obj);
}

function guid() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16) +
    (((1 + Math.random()) * 0x10000) | 0).toString(16);
}

function data(el, prop, value) {
 let prefix = 'data';
 let elData = el[prefix] || {};
 if (typeof value === 'undefined') {
   if (el[prefix] && el[prefix][prop]) {
     return el[prefix][prop];
   } else {
     var dataAttr = el.getAttribute(`${prefix}-${prop}`);
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
  let inner;
  let width;
  let outerWidth;
  let outer = document.createElement('div');
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
  let nodes = [node];
  while (node.parentNode) {
    node = node.parentNode;
    nodes.push(node);
  }
  return nodes;
}

class Modal extends EventEmitter {
  static set templates(templates) {
    this._baseTemplates = templates;
  }

  static get templates() {
    return Object.assign({}, _templates, Modal._baseTemplates || {});
  }

  static set buttons(buttons) {
    this._baseButtons = buttons;
  }

  static get buttons() {
    return Object.assign({}, _buttons, Modal._baseButtons || {});
  }

  static set options(options) {
    this._baseOptions = options;
  }

  static get options() {
    return Object.assign({}, _defaults, Modal._baseOptions || {});
  }

  static get version() {
    return '0.13.0';
  }

  static alert(message, _options = {}) {
    let options = Object.assign({},
      _defaults,
      {
        title:  message,
        content: false,
        construct: true,
        headerClose: false,
        buttons: Modal.buttons.alert
      },
      _options
    );

    return new Modal(options);
  }

  static confirm(question, _options = {}) {
    let options = Object.assign({},
      _defaults,
      {
        title:  question,
        content: false,
        construct: true,
        headerClose: false,
        buttons: Modal.buttons.confirm
      },
      _options
    );

    return new Modal(options);
  }

  constructor(options = {}) {
    super();

    this.id = guid();
    this.el = null;
    this._html = {};
    this._events = {};
    this._visible = false;
    this._pointerInContent = false;
    this._options = Object.assign({}, Modal.options, options);
    this._templates = Object.assign({}, Modal.templates, options.templates || {});
    this._html.appendTo = document.querySelector(this._options.appendTo);
    this._scrollbarWidth = calcScrollbarWidth();

    if (this._options.buttons === null) {
      this._options.buttons = Modal.buttons.dialog;
    }

    if (this._options.el) {
      let el = this._options.el;
      if (typeof this._options.el == 'string') {
        el = document.querySelector(this._options.el);
        if (! el) {
          throw new Error(`Selector: DOM Element ${this._options.el} not found.`);
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

  _render() {
    let html = this._html;
    let o = this._options;
    let t = this._templates;
    let animate = o.animate ? o.animateClass : false;

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

  _mapDom() {
    let html = this._html;
    let o = this._options;

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

  _setHeader() {
    let html = this._html;
    let o = this._options;

    if (o.header && html.header) {
      if (o.title.nodeName) {
        html.header.innerHTML = o.title.outerHTML;
      } else if (typeof o.title === 'string') {
        html.header.innerHTML = `<h4 class="modal-title">${o.title}</h4>`;
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

  _setContent() {
    let html = this._html;
    let o = this._options;

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

  _setFooter() {
    let html = this._html;
    let o = this._options;

    if (o.footer && html.footer) {
      if (o.footer.nodeName) {
        html.footer.innerHTML = o.footer.outerHTML;
      } else if (typeof o.footer === 'string') {
        html.footer.innerHTML = o.footer;
      } else if (! html.footer.children.length) {
        o.buttons.forEach((button) => {
          let el = document.createElement('button');
          data(el, 'button', button);
          el.innerHTML = button.text;
          el.setAttribute('type', 'button');
          for (let j in button.attr) {
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

  _setEvents() {
    let o = this._options;
    let html = this._html;

    this._events.keydownHandler = this._handleKeydownEvent.bind(this);
    document.body.addEventListener('keydown',
      this._events.keydownHandler
    );

    this._events.mousedownHandler = this._handleMousedownEvent.bind(this);
    html.container.addEventListener('mousedown',
      this._events.mousedownHandler
    );

    this._events.clickHandler = this._handleClickEvent.bind(this);
    html.container.addEventListener('click',
      this._events.clickHandler
    );

    this._events.resizeHandler = this._handleResizeEvent.bind(this);
    window.addEventListener('resize',
      this._events.resizeHandler
    );
  }

  _handleMousedownEvent(e) {
    this._pointerInContent = false;
    let path = getPath(e.target);
    path.every(node => {
      if (node.classList && node.classList.contains('modal-content')) {
        this._pointerInContent = true;
        return false;
      }
      return true;
    });
  }

  _handleClickEvent(e) {
    let path = getPath(e.target);
    path.every(node => {
      if (node.tagName === 'HTML') {
        return false;
      }
      if (this._options.backdrop !== true && node.classList.contains('modal')) {
        return false;
      }
      if (node.classList.contains('modal-content')) {
        return false;
      }
      if (node.getAttribute('data-dismiss') === 'modal') {
        this.emit('dismiss', this, e, data(e.target, 'button'));
        this.hide();
        return false;
      }

      if (!this._pointerInContent && node.classList.contains('modal')) {
        this.emit('dismiss', this, e, null);
        this.hide();
        return false;
      }
      return true;
    });

    this._pointerInContent = false;
  }

  _handleKeydownEvent(e) {
    if (e.which === 27 && this._options.keyboard) {
      this.emit('dismiss', this, e, null);
      this.hide();
    }
  }

  _handleResizeEvent(e) {
    this._resize();
  }

  show() {
    let o = this._options;
    let html = this._html;
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
      this.once('showBackdrop', () => {
        this._setEvents();

        if (o.animate) html.container.offsetWidth; // Force reflow

        html.container.classList.add(o.animateInClass);

        setTimeout(() => {
          this._visible = true;
          this.emit('shown', this);
        }, o.transition);
      });
      this._backdrop();
    } else {
      this._setEvents();

      if (o.animate) html.container.offsetWidth; // Force reflow

      html.container.classList.add(o.animateInClass);

      setTimeout(() => {
        this._visible = true;
        this.emit('shown', this);
      }, o.transition);
    }
    this._resize();

    return this;
  }

  toggle() {
    if (this._visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  _resize() {
    var modalIsOverflowing =
      this._html.container.scrollHeight > document.documentElement.clientHeight;

    this._html.container.style.paddingLeft =
      ! this.bodyIsOverflowing && modalIsOverflowing ? this._scrollbarWidth + 'px' : '';

    this._html.container.style.paddingRight =
      this.bodyIsOverflowing && ! modalIsOverflowing ? this._scrollbarWidth + 'px' : '';
  }

  _backdrop() {
    let html = this._html;
    let t = this._templates;
    let o = this._options;
    let animate = o.animate ? o.animateClass : false;

    html.backdrop = build(t.backdrop);
    if (animate) html.backdrop.classList.add(animate);
    html.appendTo.appendChild(html.backdrop);

    if (animate) html.backdrop.offsetWidth;

    html.backdrop.classList.add(o.animateInClass);

    setTimeout(() => {
      this.emit('showBackdrop', this);
    }, this._options.backdropTransition);
  }

  hide() {
    let html = this._html;
    let o = this._options;
    let contCList = html.container.classList;
    this.emit('hide', this);

    contCList.remove(o.animateInClass);

    if (o.backdrop) {
      let backCList = html.backdrop.classList;
      backCList.remove(o.animateInClass);
    }

    this._removeEvents();

    setTimeout(() => {
      document.body.classList.remove('modal-open');
      document.body.style.paddingRight = this.originalBodyPad;
    }, o.backdropTransition);

    setTimeout(() => {
      if (o.backdrop) {
        html.backdrop.parentNode.removeChild(html.backdrop);
      }
      html.container.style.display = 'none';

      if (o.construct) {
        html.container.parentNode.removeChild(html.container);
      }

      this._visible = false;
      this.emit('hidden', this);
    }, o.transition);

    return this;
  }

  _removeEvents() {
    if (this._events.keydownHandler) {
      document.body.removeEventListener('keydown',
        this._events.keydownHandler
      );
    }

    this._html.container.removeEventListener('mousedown',
      this._events.mousedownHandler
    );

    this._html.container.removeEventListener('click',
      this._events.clickHandler
    );

    window.removeEventListener('resize',
      this._events.resizeHandler
    );
  }

  _checkScrollbar() {
    this.bodyIsOverflowing = document.body.clientWidth < window.innerWidth;
  }

  _setScrollbar() {
    this.originalBodyPad = document.body.style.paddingRight || '';
    if (this.bodyIsOverflowing) {
      let basePadding = parseInt(this.originalBodyPad || 0, 10);
      document.body.style.paddingRight = basePadding + this._scrollbarWidth + 'px';
    }
  }
}

export default Modal;
