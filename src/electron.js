
const electron = require('electron');
const ChildProcess = require('child_process');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const glob = require('glob')
const path = require('path')
const os = require('os');
const ipc = electron.ipcMain;
const Menu = electron.Menu
const localshortcut = require('electron-localshortcut');
const autoUpdater = require('./electron/auto-updater');
const settings = require('electron-settings');

var mainWindow;
var debug = false;
var quitApp = true;

if (process.mas || os.platform() == "darwin")
    app.setName('Matrix Writer');

function initialize() {

    loadModules();

    function createWindow() {
        console.time('init')

        const winSetting = settings.get('main-window');
        
        mainWindow = new BrowserWindow({
            width: 1280,
            height: 800,
            minWidth: 860,
            name: 'mainWindow',
            backgroundColor: '#eceff4',
            icon: `${__dirname}/assets/app-icon/win/app.ico`,
            title:'Matrix Writer',
            frame: false
        });

        if (winSetting) {
            // console.log('set windows bounds');
            // console.log(winSetting);
            mainWindow.setBounds(winSetting);
        }
        mainWindow.loadURL(`file://${__dirname}/index.html`, {userAgent:'MatrixWriter/1.3'})

        let contents = mainWindow.webContents;

        mainWindow.on('close', (e) => {
            var bounds = mainWindow.getBounds();
            console.log(bounds);
            settings.set('main-window', bounds);

            if (quitApp) {
                if (debug) {
                    //client.close(mainWindow);
                }
                //save windo location

                mainWindow = null;
            } else {
                e.preventDefault();
                contents.send('mw:command', 'Exit');
                mainWindow.hide();
            }
        });

        mainWindow.once('ready-to-show', () => {
            console.timeEnd('init')
            localshortcut.unregisterAll(mainWindow);
        });
       
        if (debug) {
            contents.openDevTools();
        }
        // hide main menu
        Menu.setApplicationMenu(null);

        //let window = BrowserWindow.getFocusedWindow();
        // register shortcuts

        localshortcut.register(mainWindow, 'Ctrl+Shift+I', () => {
            mainWindow.toggleDevTools();
        });
        localshortcut.register(mainWindow, 'F4', () => {
            invokeCommand(mainWindow, "NewPost");
        });
        localshortcut.register(mainWindow, 'F5', () => {
            invokeCommand(mainWindow, "PublishPost");
        });
        localshortcut.register(mainWindow, 'CmdOrCtrl+T', () => {
            invokeCommand(mainWindow, "InsertTab");
        });
        localshortcut.register(mainWindow, 'Alt+Shift+F', () => {
            invokeCommand(mainWindow, "FormatParagraphs");
        });
    }

    app.on('ready', createWindow);

    app.on('window-all-closed', function () {
        if (process.platform != 'darwin') {
            app.quit();
        }
    });

    app.on('activate', function () {
        if (mainWindow == null) {
            createWindow();
        }
    });

    app.on('before-quit', function (e) {
        quitApp = true;
    })

    ipc.on('mw:Exit', function () {
        quitApp = true;
        app.quit();
    })
}


function invokeCommand(focusedWindow, commandName, commandArgument) {
    focusedWindow.webContents.send('mw:command', commandName, commandArgument);
}

function loadModules() {
    try {
        var dir = path.join(__dirname, './electron/electron-main/*.js');
        console.log(dir);
        var files = glob.sync(dir);
        files.forEach(function (file) {
            console.log(file);
            require(file);
        });
    } catch (error) {
        console.log(error);
    }
};


// Handle Squirrel on Windows startup events
switch (process.argv[1]) {
    case '--squirrel-install':
        autoUpdater.createShortcut(function () { app.quit() });
        break
    case '--squirrel-uninstall':
        autoUpdater.removeShortcut(function () { app.quit() })
        break
    case '--squirrel-obsolete':
    case '--squirrel-updated':
        app.quit()
        break
    default:
        initialize()
}