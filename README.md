# Modal Vanilla

Modal Dialog window written in raw ES6 JavaScript. Functionally and visually  
compatible with Bootstrap framework.  

This Modal implementation is fairly opinionated and in most cases could be used  
as it is. However in cases where design or some functionality has to be modified  
it should be possible via Modal instance patching.

## Examples

View live [examples here](https://kanecohen.github.io/modal-vanilla).  

![GIF demo](https://cloud.githubusercontent.com/assets/578455/12984169/9ee6515a-d0fd-11e5-92d7-8e3e8e57d144.gif)

## Usage

### Via JavaScript

Unlike similar modals in Bootstrap, Modal Vanilla has to be instantiated and  
displayed manually from JavaScript instead of having such functionality as toggling
via `data-toggle` attribute.

#### Static

Within the page you'll have an HTML of the modal that you want to display. In this  
case element should have an `my-modal` ID.  

````js
var myModal = new Modal({
  el: document.getElementById('my-modal')
});
myModal.show();

// OR

var myModal = new Modal({
  el: document.getElementById('my-modal')
}).show();

````

#### Dynamic
It is possible to include some custom content without specifying actual HTML  
element. When Modal can't be attached to DOM element it will be constructed  
dynamically.  

````js
var myModal = new Modal({
  title: 'My Modal Dialog',
  content: 'This is a dynamic content for the modal injected from JS'
}).show();
````

#### Presets
Modal Vanilla has two ready-to-use presets: Alert and Confirm.  

**Alert** is used to display some message to the user and gives user option to  
close that modal with single button "OK".  
**Confirm** is used to display some prompt to the user with two buttons: "OK" and "Cancel".  

In both presets when user clicks on the button Modal Vanilla would fire an event  
`dismiss` which you can listen to. This event gives you an option to access  
modal itself, browser event that led to dismiss (click, keydown) and if dismiss  
was fired via one of the buttons - specific button.  

## Options

| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| el   | DOM Node or null | null | Existing DOM element that will be 'Modal-ized'. |
| animate | boolean | true | Show Modal using animation. |
| appendTo | string | `'body'` | DOM element selector to which constructed Modal will be appended. |
| backdrop | boolean or the string `'static'` | true | Show Modal backdrop bocking content. If `static` is set - modal won't be closed on backdrop click |
| keyboard | boolean | true | Close modal on esc key. |
| title | string or DOM Node | `'Dialog'` | Content of the title in the constructed dialog. |
| header | boolean | true | Flag specifying whether header of the constructed dialog should be rendered |
| content | boolean, string or DOM Node | false | Specify content that you want to display in the content area of the dialog |
| footer | boolean, string or DOM Node | true | Specify whether you want to see footer and what kind of footer. When set to `true` would show a single "OK" button. |
| headerClose | boolean | true | Show close button in the header. |
| construct | boolean | false | Force modal type - if set to `true` Modal would be constructed dynamically. |
| transition | integer | 300 | How much time in ms it takes to show the modal. |
| backdropTransition | integer | 150 | How much time in ms it takes to show backdrop. |

## Methods

`.show()`  
Shows modal instance. Returns instance itself.  
````js
var myModal = new Modal({
  el: document.getElementById('my-modal')
});
myModal.show();
````

`.hide()`  
Hides modal instance. Returns instance itself.  
````js
var myModal = new Modal({
  el: document.getElementById('my-modal')
}).show();
myModal.hide();
````

## Events

Modal Vanilla uses standard node.js EventEmitter and therefore supports such  
event as: 'on', 'once', 'removeAllListeners', 'removeListener'.

For more details on EventEmitter, please check official [documentation page](https://nodejs.org/api/events.html).  
Available events are:

| Event Type | Description |
| ---------- | ----------- |
| show | This event fires immediately after `.show()` method is called. |
| shown | This event is fired after Modal has been fully shown - with default options that would happen after 300ms. |
| hide | This event fires ately after `.hide()` method is called and immediately after user dismisses modal via button or keydown.  |
| hidden | This event is fired after modal has been completely hidden. |
| dismiss | This event fires iately after user clicks either on one of the buttons tat can close modal, on close element in the header, on backdrop if it is set to default behavior and after user hits "Esc" on the keyboard. |

````js
var myModal = new Modal({
  content: 'My Custom Content'
});
myModal.on('show', function(myModal, event) {
  // Do something before we start showing modal.
})
````
