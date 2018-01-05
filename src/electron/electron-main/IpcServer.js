const electron = require('electron');
const app = electron.app;
const ipc = electron.ipcMain;
const dialog = electron.dialog;
const http = require("http");
const url = require("url");

ipc.on('mw:log', function (event, message) {
    //event.sender.send('asynchronous-reply', 'pong')
    console.log(message);
})

ipc.on('mw:OpenFileDialog', function (event, title, defaultFolder, filters) {
    console.log(defaultFolder);

    dialog.showOpenDialog({
        title: title,
        defaultPath: defaultFolder,
        filters: filters,
        properties: ['openFile']
    }, function (files) {
        if (files)
            event.returnValue = files;
        else
            event.returnValue = "";
    });
})

ipc.on('mw:StartLocalServer', function (event) {

    var server;
    server = http.createServer(function (request, response) {
        console.log("local server get request");
        console.log(request.url);
        let urlValue = url.parse(request.url);
        // console.log( urlValue);
        // console.log( urlValue.href);
        // console.log( urlValue.search);
        // console.log( urlValue.query);
        // console.log( urlValue.pathname);
        let code = urlValue.query.toString();
        console.log(code);
        event.sender.send('mw:GetAuthCode', code);

        response.writeHead(200, { "Content-Type": "text/html" });      
        response.write(`
        <!DOCTYPE \"html\">
        <html>
        <head>
        <title>Matrix Writer</title>
        </head>
        <body>
             Your request was processed! 
        <script>
            window.open('','_self').close();
        </script>
        </body>
        </html>
        `);
        response.end();
        server.close();
    });

    server.listen(0, "127.0.0.1", function () {
        var port = server.address().port;
        console.log('Listening on port ' + port);
        event.returnValue = port;
        event.sender.send('mw:HttpServerStarted', port)
    });

})