const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
const ipc = electron.ipcMain;
const webContents = electron.webContents;
const localshortcut = require('electron-localshortcut');
const os = require('os');

function invokeCommand(focusedWindow, commandName, commandArgument) {
    focusedWindow.webContents.send('mw:command', commandName, commandArgument);
}

let template = [{
    label: 'File',
    submenu: [{
        label: "New post",
        accelerator: 'CmdOrCtrl+N',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "NewPost");

            }
        }
    },
    {
        label: "Save",
        accelerator: 'CmdOrCtrl+S',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "SavePost");
            }
        }
    },
    { type: 'separator' },
    {
        label: "Publish",
        accelerator: 'CmdOrCtrl+Shift+P',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "PublishPost");
            }
        }
    },
    { type: 'separator' },
    {
        label: "Print",
        accelerator: 'CmdOrCtrl+P',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "PrintPost");
            }
        }
    },
    { type: 'separator' },
    {
        label: "Options",
        accelerator: 'CmdOrCtrl+Shift+O',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "ShowOptions");
            }
        }
    },
    { type: 'separator' },
    {
        label: "Exit",
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Exit");
                app.quit();
            }
        }
    }
    ]
}, {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Undo");
            }
        }
    },
    {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Redo");
            }
        }
    },
    { type: 'separator' },
    {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Cut");
            }
        }
    },
    {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Copy");
            }
        }
    },
    {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Paste");
            }
        }
    },
    {
        label: 'Delete',
        accelerator: 'Delete',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Delete");
            }
        }
    },
    { type: 'separator' },
    {
        label: 'Find',
        accelerator: 'CmdOrCtrl+F',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "SearchReplace");
            }
        }
    },
    {
        label: 'Replace',
        accelerator: 'CmdOrCtrl+H',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "SearchReplace");
            }
        }
    },
    { type: 'separator' },
    {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "SelectAll");
            }
        }
    }
    ]
}, {
    label: 'Format',
    submenu: [{
        label: 'Bold',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Bold");
            }
        }
    },
    {
        label: 'Italic',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Italic");
            }
        }
    },
    {
        label: 'Underline',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Underline");
            }
        }
    },
    {
        label: 'Strikethrough',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Strikethrough");
            }
        }
    },
    {
        label: 'Block Quote',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "BlockQuote");
            }
        }
    },
    { type: 'separator' },
    {
        label: 'Superscript',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Superscript");
            }
        }
    },
    {
        label: 'Subscript',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Subscript");
            }
        }
    },
    { type: 'separator' },
    {
        label: 'Increase Indent',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Indent");
            }
        }
    },
    {
        label: 'Decrease Indent',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "Outdent");
            }
        }
    },
    /*{ type: 'separator' },
    {
        label: 'Text color',
        click: function(item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "ForeColor");
            }
        }
    },
    {
        label: 'Text background',
        click: function(item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "HiliteColor");
            }
        }
    },*/
    { type: 'separator' },
    {
        label: 'Align',
        submenu: [{
            label: 'Align Left',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "JustifyLeft");
                }
            }
        },
        {
            label: 'Align Center',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "JustifyCenter");
                }
            }
        },
        {
            label: 'Align Right',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "JustifyRight");
                }
            }
        },
        {
            label: 'Justify',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "JustifyFull");
                }
            }
        }
        ]
    },
    { type: 'separator' },
    {
        label: 'Bullet List',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertUnorderedList");
            }
        }
        /*submenu: [{
                label: 'Default',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertUnorderedList");
                    }
                }
            },
            {
                label: 'Circle',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "BulletCircle");
                    }
                }
            },
            {
                label: 'Disc',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "BulletDisc");
                    }
                }
            },
            {
                label: 'Square',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "BulletSquare");
                    }
                }
            }
        ]*/
    },
    {
        label: 'Number List',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertOrderedList");
            }
        }
        /*submenu: [{
                label: 'Default',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertOrderedList");
                    }
                }
            },
            {
                label: 'Lower Alpha',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "NumberLowerAlpha");
                    }
                }
            },
            {
                label: 'Lower Greek',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "NumberLowerGreek");
                    }
                }
            },
            {
                label: 'Lower Roman',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "NumberLowerRoman");
                    }
                }
            },
            {
                label: 'Upper Alpha',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "NumberupperAlpha");
                    }
                }
            },
            {
                label: 'Upper Roman',
                click: function(item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "NumberUpperRoman");
                    }
                }
            }
        ] */
    },
    { type: 'separator' },
    {
        label: 'Clear Format',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "RemoveFormat");
            }
        }
    },
    ]
}, {
    label: 'Insert',
    submenu: [{
        label: 'Hyperlink',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertLink");
            }
        }
    },
    {
        label: 'Anchor',
        click: function(item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "mceAnchor");
            }
        }
    },
    {
        label: 'Horizontal Line',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertHorizontalRule");
            }
        }
    },
    {
        label: 'Page Break',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertPageBreak");
            }
        }
    },
    {
        label: 'Date',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertDate");
            }
        }
    },
    { type: 'separator' },
    {
        label: 'Picture',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertImageCommandName");
            }
        }
    },
    // {
    //     label: 'Screenshot',
    //     enabled: false,
    //     click: function (item, focusedWindow) {
    //         if (focusedWindow) {
    //             invokeCommand(focusedWindow, "InsertScreenshot");
    //         }
    //     }
    // },
    // {
    //     label: 'Make Collage',
    //     enabled: false,
    //     click: function (item, focusedWindow) {
    //         if (focusedWindow) {
    //             invokeCommand(focusedWindow, "MakeCollage");
    //         }
    //     }
    // },
    // {
    //     label: 'Dropbox',
    //     enabled: false,
    //     click: function (item, focusedWindow) {
    //         if (focusedWindow) {
    //             invokeCommand(focusedWindow, "InsertFromDropbox");
    //         }
    //     }
    // },
    {
        label: 'OneDrive',
        enabled: true,
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertOneDrive");
            }
        }
    },
    {
        label: 'Google Drive',
        enabled: true,
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertGDrive");
            }
        }
    },
    {
        label: 'Video',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertVideo");
            }
        }
    },
    {
        label: 'Google Map',
        enabled: true,
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertGoogleMap");
            }
        }
    },
    {
        label: 'Code Sample',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertCode");
            }
        }
    },
    {
        label: 'Plain Text',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertFromPlainTextFile");
            }
        }
    },
    { type: 'separator' },
    {
        label: 'Table',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "InsertTable");
            }
        }
    },
    ]
},
{
    label: 'View',
    submenu: [{
        label: 'Show Welcome',
        accelerator: 'CmdOrCtrl+Shift+H',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "ShowWelcome");
            }
        }
    },
    { type: 'separator' },
    {
        label: 'Visual Aid',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "ToggleVisualAid");
            }
        }
    },
    {
        label: 'Visual Blocks',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                invokeCommand(focusedWindow, "ToggleVisualBlocks");
            }
        }
    },
    { type: 'separator' },
    {
        label: 'Toggle Full Screen',
        accelerator: (function () {
            if (process.platform === 'darwin') {
                return 'Ctrl+Command+F'
            } else {
                return 'F11'
            }
        })(),
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
            }
        }
    }
        // , 
        // {
        //     label: 'Toggle Developer Tools',
        //     accelerator: (function () {
        //         if (process.platform === 'darwin') {
        //             return 'Alt+Command+I';
        //         } else {
        //             return 'F12'; // 'Ctrl+Shift+I'
        //         }
        //     })(),
        //     click: function (item, focusedWindow) {
        //         if (focusedWindow) {
        //             focusedWindow.toggleDevTools()
        //         }
        //     }
        // },
        // {
        //     label: 'Close',
        //     accelerator: 'CmdOrCtrl+W',
        //     role: 'close',
        //     click: function (item, focusedWindow) {

        //     }
        // }
    ]
}, {
    label: 'Help',
    role: 'help',
    submenu: [
        //     {
        //     label: 'About',
        //     click: function (item, focusedWindow) {
        //         invokeCommand(focusedWindow, "ShowAbout");
        //     }
        // },
        {
            label: 'Documentation',
            click: function (item, focusedWindow) {
                invokeCommand(focusedWindow, "ShowOnlineDocuments");
            }
        }]
}
];

let macMenu = [
    {
        label: 'View',
        submenu: [
            {
                label: 'Toggle Full Screen',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F'
                    } else {
                        return 'F11'
                    }
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                    }
                }
            }
        ]
    },
    {
        label: 'Window',
        role: 'window',
        submenu: [
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            }, {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }, {
                type: 'separator'
            }, {
                label: 'Reopen Window',
                accelerator: 'CmdOrCtrl+Shift+T',
                enabled: false,
                key: 'reopenMenuItem',
                click: function () {
                    app.emit('activate')
                }
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Learn More',
                click: function () {
                    electron.shell.openExternal('http://www.matrixrepublic.com/product/details/matrix-writer')
                }
            }
        ]
    }
];

function addUpdateMenuItems(items, position) {
    if (process.mas) return

    const version = electron.app.getVersion()
    let updateItems = [{
        label: `Version ${version}`,
        enabled: false
    }, {
        label: 'Checking for Update',
        enabled: false,
        key: 'checkingForUpdate'
    }, {
        label: 'Check for Update',
        visible: false,
        key: 'checkForUpdate',
        click: function () {
            //require('electron').autoUpdater.checkForUpdates()
        }
    }, {
        label: 'Restart and Install Update',
        enabled: true,
        visible: false,
        key: 'restartToUpdate',
        click: function () {
            //require('electron').autoUpdater.quitAndInstall()
        }
    }]

    items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem() {
    const menu = Menu.getApplicationMenu()
    if (!menu)
        return

    let reopenMenuItem
    menu.items.forEach(function (item) {
        if (item.submenu) {
            item.submenu.items.forEach(function (item) {
                if (item.key === 'reopenMenuItem') {
                    reopenMenuItem = item
                }
            })
        }
    })
    return reopenMenuItem
}

if (process.platform === 'darwin') {
    const name = electron.app.getName()
    macMenu.unshift({
        label: name,
        submenu: [{
            label: `About ${name}`,
            role: 'about'
        }, {
            type: 'separator'
        }, {
            label: 'Services',
            role: 'services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: `Hide ${name}`,
            accelerator: 'Command+H',
            role: 'hide'
        }, {
            label: 'Hide Others',
            accelerator: 'Command+Alt+H',
            role: 'hideothers'
        }, {
            label: 'Show All',
            role: 'unhide'
        }, {
            type: 'separator'
        }, {
            label: 'Quit Matrix Writer',
            accelerator: 'Command+Q',
            click: function () {
                app.quit()
            }
        }]
    })

    // Window menu.
    template[3].submenu.push({
        type: 'separator'
    }, {
            label: 'Bring All to Front',
            role: 'front'
        })

    //addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
    const helpMenu = template[template.length - 1].submenu
    //addUpdateMenuItems(helpMenu, 0)
}


app.on('ready', function () {
    if (IsMac()) {
        const menu = Menu.buildFromTemplate(macMenu)
        Menu.setApplicationMenu(menu)
    }
})

app.on('browser-window-created', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem)
        reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem)
        reopenMenuItem.enabled = true
})

ipc.on('mw:ShowMainMenu', function (event) {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
});
ipc.on('mw:HideMainMenu', function (event) {
    if (IsMac()) {
        const menu = Menu.buildFromTemplate(macMenu)
        Menu.setApplicationMenu(menu)
    }
    else {
        Menu.setApplicationMenu(null);
    }
});

function IsMac() {
    return os.platform() == "darwin";
}