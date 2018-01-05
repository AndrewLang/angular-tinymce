var gulp = require('gulp');
var shell = require('gulp-shell');
var sequence = require('run-sequence');
var packager = require("electron-packager");
var package = require("./package.json");
var path = require('path');

const outFolder = "pack-result";
const ignoreFilter = [
    ".vscode",
    "resources",
    outFolder,
    "e2e",
    /^\/\bsrc\//i,
    ".angular-cli.json|.editorconfig|.gitignore|.gulpfile.js|karma.conf.js|protractor.conf.js|README.md|tsconfig.json|tslint.json"
];
const copyright = '(C) Matrix Republic 2017-2018';
const name = 'MatrixWriter';
const source = '.';
const version = '1.3.0';

gulp.task('electron-start', () => {
    return gulp.src('/').pipe(shell('electron ./dist/electron.js'));
});
gulp.task('cli-build', () => {
    return gulp.src('/').pipe(shell('ng build --base-href .'));
});

gulp.task('build', () => {
    return sequence('cli-build');
});
gulp.task('release', () => {
    return gulp.src('/').pipe(shell('ng build --base-href .'));
});
gulp.task('start', () => {
    return sequence('cli-build', 'electron-start');
});
gulp.task('run', () => {
    return sequence('electron-start');
});

gulp.task('win-pack', () => {
    var options = {
        dir: source,
        name: name,
        arch: 'all',
        platform: 'win32',
        packageManager: "npm",
        overwrite: true,
        asar: true,
        prune: true,
        out: './' + outFolder + '/win',
        appCopyright: copyright,
        appVersion: version,
        buildVersion: version,
        icon: './src/assets/app-icon/win/app.ico',

        win32metadata: {
            CompanyName: "Matrix Republic",
            FileDescription: "Matrix Writer",
            OriginalFilename: "MatrixWriter.exe",
            ProductName: "Matrix Writer",
            LegalCopyright: "(C) Matrix Republic 2017"
        },
        ignore: ignoreFilter
    };

    return packager(options, (error, appPath) => {
        if (error) {
            console.log("Pack error:");
            console.log(error);
        }

        console.log(appPath);
        // callback();
    });
});

gulp.task('win-installer', () => {
    return gulp.src('/')
        .pipe(shell('node ./resources/scripts/installer.js'));
});

gulp.task('win-appstore', () => {
    return gulp.src('/')
        .pipe(shell('node ./resources/scripts/windows-store.js'));
});

gulp.task('win-publish', () => {
    return sequence('release', 'win-pack', 'win-installer', 'win-appstore', function (message) {
        console.log(message);
    });
});

gulp.task('mac-pack', () => {
    var options = {
        dir: source,
        name: name,
        arch: 'x64',
        platform: 'darwin',
        packageManager: "npm",
        overwrite: true,
        asar: false,
        prune: true,
        out: './' + outFolder + '/mac',
        appCopyright: copyright,
        appVersion: version,
        buildVersion: version,
        icon: './src/assets/app-icon/mac/app.icns',
        // appBundleId:'',
        // appCategoryType:'',
        // extendInfo:'',
        // extraResource:'',
        // helperBundleId:'',
        ignore: ignoreFilter
    };

    console.log(options);
    console.log(packager);

    return packager(options, (error, appPath) => {
        if (error) {
            console.log("Pack error:");
            console.log(error);
        }

        console.log(appPath);
    });
});

gulp.task('mac-store', () => {
    return gulp.src('/')
        .pipe(shell('bash ./resources/scripts/mas.sh'));
});

gulp.task('mac-publish', () => {
    return sequence('release', 'mac-pack', 'mac-store', function (message) {
        console.log(message);
    });
});