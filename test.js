'use strict';
const electron = require('electron');

electron.app.on('ready', () => {
  const win = new electron.BrowserWindow({
    show: true
  });

  win.webContents.executeJavaScript(`
    require('${__dirname}')();
  `);

  win.loadURL('https://google.com');
});
