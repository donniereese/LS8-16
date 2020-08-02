const { BrowserWindow } = require('electron');
const hat = require('hat');
const { Trype } = require('./Trype.js');

let app;
let ViewManager = (function() {
  let instance = null;

  class ViewManager {
    views = {}
    groups = {}
    panes = {}
    docks = {}

    constructor() {
      if(!instance) {
        instance = this;
      }

      return instance;
    }

    registerView(view) {
      if (!(view instanceof View))
        throw new Error('Cannot register view that is not a type of View', view);

    }

    unregisterView(viewOrId) {
      if (!(viewOrId instanceof View) && viewOrId !== )
    }
  }

  return ViewManager;
}());

// A View is BrowserWindow Manager
class View {
  id;
  browserWindow;

  constructor(winObj = defaultViewSettings) {
    this.id = winObj.id || hat();
    this.settings = {
      path: {
        urlString: ''
      }
    }
    this.events = {
      standard: {
        'page-title-updated': [],
        'close': [],
        'closed': [],
        'session-end': [], // Event: 'session-end' WINDOWS ONLY
        'unresponsive': [],
        'responsive': [],
        'blur': [],
        'focus': [],
        'show': [],
        'hide': [],
        'ready-to-show': [],
        'maximize': [],
        'unmaximize': [],
        'minimize': [],
        'restore': [],
        'will-resize': [],
        'resize': [],
        'will-movie': [],
        'move': [],
        'moved': [],
        'enter-full-screen': [],
        'leave-full-screen': [],
        'enter-html-full-screen': [],
        'leave-html-full-screen': [],
        'always-on-top-changed': [],
        'app-command': [],
        'scroll-touch-begin': [],
        'scroll-touch-end': [],
        'scroll-touch-edge': [],
        'swipe': [],
        'sheet-begin': [],
        'sheet-end': [],
        'new-window-for-tab': [],
        'did-finish-load': [],
      },
      custom: {

      }
    }

    this.window = new BrowserWindow(defaultViewSettings.window);
    ViewManager.registerView(this);
  }

  toggle() {

  }

  close() {

  }

  once(eventType, cb) {

  }

  getWindowPosition(win) {
    const trayWindowBounds = win.getBounds()
    const trayBounds = tray.getBounds()

    // Center trayWindow horizontally below the tray icon
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (trayWindowBounds.width / 2))

    // Position trayWindow 4 pixels vertically below the tray icon
    const y = Math.round(trayBounds.y + trayBounds.height + 4)

    return { x: x, y: y }
  }

  loadURL(url) {
    Trype.check(url).is('string', 'null').orThrow();
    this.url = url;
    browserWindow.loadURL(this.url);
  }

  get width() {
    return this._browserConfig.width;
  }

  set width(w) {
    this._browserConfig.width = w;
  }

  get height() {
    return this._browserConfig.height;
  }

  set height(h) {
    this._browserConfig.height = h;
  }

  get url() {
    return this.settings.path.urlString;
  }

  set url(url) {
    this.settings.path.urlString = url;
  }
}

class Dock {
  constructor() {

  }

  hide() {

  }
}

const defaultViewSettings = {
  type: 'window',
  window: {
    width: 480,
    height: 600,
    show: true,
    frame: true,
    fullescreenable: true
  },
  content: {
    url: ''
  }
}

module.exports = { ViewManager, Pane }
