const eg, { AppManager } = require('./lib/eg');

const app = new AppManager();


const mainWindow = eg.createWindow();

app.manage(mainWindow);

app.show(mainWindow).when('ready');