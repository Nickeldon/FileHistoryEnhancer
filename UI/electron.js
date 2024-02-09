const electron = require('electron');
const {app, BrowserWindow, contextBridge} = electron
const url = require('url')
const path = require('path');
const electronIpcMain = require('electron').ipcMain;
const instancelimit = app.requestSingleInstanceLock()

try {
  require("./server")  
} catch (e) {
  console.log(e)
}


//require('electron-reload')(__dirname,{electron: path.join(__dirname, 'node_modules', '.bin', 'electron')})

let windowObj = null

if (!instancelimit) {
  app.quit()
} else{
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (windowObj) {
      if (windowObj.isMinimized()) windowObj.restore()
      windowObj.focus()
    }
  })
  function createWindow(){
    windowObj = new BrowserWindow({
      width: 1025,
      height: 576,
      alwaysOnTop: false,
      maximizable: false,
      minimizable: false,
      center: true,
      autoHideMenuBar: true,
      resizable: false,
      fullscreenable: false,
      frame: false,
      titleBarStyle: 'hidden',
      transparent: true,
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false,
        preload: path.join(__dirname, 'renderer.js')
      }
    });
    windowObj.loadURL(url.format(path.join(__dirname, 'index.html')));  
    //windowObj.webContents.openDevTools()
    windowObj.on('closed', () => {
      windowObj = null
    })
  
    //Workaround for frame top-bar glitch (electron 25)
    windowObj.on('blur', () => {
      windowObj.setBackgroundColor('#00000000')
    })
    
    windowObj.on('focus', () => {
      windowObj.setBackgroundColor('#00000000')
    })
    const [w, h] = windowObj.getSize();
    windowObj.setSize(w, h);
  }
  
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
  
  app.on('ready', createWindow);
  
  electronIpcMain.on('window:minimize', () => {
    windowObj.minimize();
  })
  
  electronIpcMain.on('window:restore', () => {
    windowObj.restore();
  })
}
