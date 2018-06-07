const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const images = require('./images');

let mainWindow = null;

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 725,
        resizable: true
    });

    mainWindow.loadFile(`${__dirname}/mainWindow.html`);

    mainWindow.webContents.openDevTools();

    images.mkdir(images.getPicturesDir(app))

    mainWindow.on('closed', _ => {
        mainWindow = null;
    });

});

ipcMain.on('image-capture', (evt, contents) => {
    images.save(images.getPicturesDir(app), contents, (err, imgPath) => {
        images.cache(imgPath);
    });
});

ipcMain.on('image-remove', (evt, index) => {
    images.rm(index, _ => {
        evt.sender.send('image-removed', index);
    })
})