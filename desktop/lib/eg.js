const Electron, { BrowserWindow, app } = require('electron')
const path = require('path')

const Trype = require('../../Trype/Trype.js');

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
  appRef;
  _winGen;
  
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
}



class WindowObject {
  windowRef;
  windowEvents;
  parentWindow;
  _icon;
  _title;
  _x;
  _y;

  constructor(data = Object.assign({}, windowOptions)) {
    if (!appInstance) appInstance = new AppManager();

    this.x(data.x || )
    this.windowRef = new BrowserWindow();
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