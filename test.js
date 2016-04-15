'use strict';
const electron = require('electron');

electron.app.on('ready', () => {
  const win = new electron.BrowserWindow({
    show: true
  });
  const empty = electron.Menu.buildFromTemplate([]);
  win.setMenu(empty);
  electron.Menu.setApplicationMenu(empty);
  win.loadURL('file://' + __dirname + '/example.html');
  win.webContents.openDevTools();
});
