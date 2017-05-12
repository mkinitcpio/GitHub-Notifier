const {
  Menu,
  Tray
} = require('electron')

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

let mainWindow

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  tray = new Tray('github-notifier-icon.png');
  tray.on('click', () => {
    win.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  let contextMenu = Menu.buildFromTemplate([{
      label: 'Show App',
      click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Quit',
      click: function () {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);

  mainWindow.setMenuBarVisibility(false);
  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.on('minimize', function (event) {
    event.preventDefault()
    mainWindow.hide();
    mainWindow.on('close', function (event) {
      if (!app.isQuiting) {
        event.preventDefault();
        mainWindow.hide();
      }
      return false;
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})