'use strict';

const electron = require('electron');
const remote = electron.remote;
const Menu = remote.Menu;

const menu = Menu.buildFromTemplate([{
  label: 'Undo',
  role: 'undo',
}, {
  label: 'Redo',
  role: 'redo',
}, {
  type: 'separator',
}, {
  label: 'Cut',
  role: 'cut',
}, {
  label: 'Copy',
  role: 'copy',
}, {
  label: 'Paste',
  role: 'paste',
}, {
  type: 'separator',
}, {
  label: 'Select all',
  role: 'selectall',
}]);


module.exports = function inputMenu() {
  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();

    let node = e.target;

    while (node) {
      debugger
      if (node.matches('input, textarea, contenteditable')) {
        menu.popup(remote.getCurrentWindow());
        break;
      }
      node = node.parentElement;
    }
  });
};
