'use strict';
const electron = require('electron');

electron.app.on('ready', () => {
  const win = new electron.BrowserWindow({
    show: true
  });

  win.loadURL('file://' + __dirname + '/example.html');
});
