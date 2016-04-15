'use strict';

const electron = require('electron');
const menuTemplate = [{
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
}];

function action(name) {
  const win = electron.remote.getCurrentWindow();
  win.webContents[name]();
}

const shortcut = electron.remote.require('electron-localshortcut');
shortcut.register('CmdOrCtrl+C', () => action('copy'));
shortcut.register('CmdOrCtrl+V', () => action('paste'));
shortcut.register('CmdOrCtrl+X', () => action('cut'));
shortcut.register('CmdOrCtrl+A', () => action('selectAll'));

module.exports = function inputMenu(ctx, next) {
  let node = ctx.elm;

  while (node) {
    if (node.matches('input, textarea, [contenteditable]')) {
      [].push.apply(ctx.menu, menuTemplate);
      break;
    }
    node = node.parentElement;
  }
  next();
};
