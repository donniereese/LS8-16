const eg, { AppManager };

const app = new AppManager();


const mainWindow = eg.createWindow();

app.manage(mainWindow);

app.show(mainWindow).when('ready');