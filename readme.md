# electron-input-menu

> Context menu for [electron](https://github.com/atom/electron) input elements.

[![Travis Build Status](https://img.shields.io/travis/parro-it/electron-input-menu.svg)](http://travis-ci.org/parro-it/electron-input-menu)
[![NPM module](https://img.shields.io/npm/v/electron-input-menu.svg)](https://npmjs.org/package/electron-input-menu)
[![NPM downloads](https://img.shields.io/npm/dt/electron-input-menu.svg)](https://npmjs.org/package/electron-input-menu)

# Installation

```bash
npm install --save electron-input-menu
```

# Usage

This module expose a middleware for [electron-contextmenu-middleware](https://github.com/parro-it/electron-contextmenu-middleware).

To use input context menu, you have to require this module and `electron-contextmenu-middleware` in `renderer` process and then mount this module as a middleware.

```js
  const inputMenu = require('electron-input-menu');
  const context = require('electron-contextmenu-middleware');

  context.use(inputMenu);

  context.activate();
```

# Keyboard shortcuts

`electron-input-menu` can also register shortcuts on DOM `document` object to handle copy, paste, cut, selectAll, undo and redo action. This is useful if your app doesn't provide an "Edit" menu that can handle this shortcuts.

To activate the shortcuts, call the `registerShortcuts` method in renderer process.

```js
  const inputMenu = require('electron-input-menu');
  inputMenu.registerShortcuts();
```


# Related projects

* [electron-contextmenu-middleware](https://github.com/parro-it/electron-contextmenu-middleware) - Build `electron` context menus composing multiple middlewares functions.

* [debug-menu](https://github.com/parro-it/debug-menu) - Chrome-like "inspect element" context-menu.



# License

The MIT License (MIT)

Copyright (c) 2016 parro-it
