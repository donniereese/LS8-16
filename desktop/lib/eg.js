const path = require('path')
const Electron = require('electron')
const BrowserWindow = Electron.BrowserWindow
const app = Electron.app

const Trype = require('../src/modules/Trype.js');

const { windowOptions } = require('./options.js');

let appInstance = null;


class DisplayReference {
  constructor(appManager, target) {
    this.appManager = appManager;
    this.target = target;
  }

  when(event) {}
  now() {}
};


class AppManager {
  constructor() {
    this.appRef = app;
    this._winGen = false;
  }

  on(event, handler) {
    
  }

  createRegisteredWindows() {
    
  }

  show(target) {
    return new DisplayReference(this, target);
  }

  hide() {
    
  }

  manage() {
    
  }
}



class WindowObject {
  constructor(data = Object.assign({}, windowOptions)) {
    if (!appInstance) appInstance = new AppManager();

    this.x(data.x || 0)
    this.windowRef = new BrowserWindow();
    this.windowEvents;
    this.parentWindow;
    this._icon;
    this._title;
    this._x;
    this._y;
  }

  on(event, handler) {
    
  }

  get title() {}
  set title(str) {}
}




function createWindow() {
  
}

function cloneWindow() {
  
}

function destroyWindow() {
  
}



module.exports = {
  createWindow,
  cloneWindow,
  destroyWindow,
  AppManager,
  WindowObject,
}