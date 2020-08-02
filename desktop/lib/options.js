const wo = {
  width: 800,
  heigt: 600,
  x: 0,
  y: 0,
  useContentSize: false,
  center: false,
  resizable: true,
  movable:true,
  minimizable: true,
  maximizable: true,
  closable: true,
  focusable: true,
  alwaysOnTop: false,
  fullscreen: true,
  fullscreenable: true,
  simpleFullscreen: false,
  skipTaskbar: false,
  kiosk: false,
  title: "EG Window",
  icon: '',
  show: true,
  frame: true,
  parent: null,
  modal: false,
  backgroundColor String (optional) - Window's background color as a hexadecimal value, like #66CD00 or #FFF or #80FFFFFF (alpha in #AARRGGBB format is supported if transparent is set to true). Default is #FFF (white).
  opacity Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
  transparent Boolean (optional) - Makes the window transparent. Default is false. On Windows, does not work unless the window is frameless.
  type String (optional) - The type of window, default is normal window. See more about this below.
}





module.exports {
  windowOptions: wo,
}