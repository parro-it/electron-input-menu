'use strict';

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
