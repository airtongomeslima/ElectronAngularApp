const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");
const AdmZip = require('adm-zip-electron');

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    try {
        var zip = new AdmZip("./test.zip");
        zip.extractAllTo("./appb/", true);
    }
    catch (e) {
        fs.writeFileSync(".log.html",
            e,
            "utf-8");
    }
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})