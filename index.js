#!/usr/bin/env node

const gulp = require('gulp');
const inject = require('gulp-inject');
const path = require('path');
const mainBowerFiles = require('main-bower-files');
const program = require('commander');
const package = require('./package.json');

let args = null;

program
    .arguments('<htmlFile>')
    .version(package.version)
    .option('-i, --ignorePath <dir>', 'ignore path', '.')
    .option('-w, --watch', 'Watch bower.json')
    .option('-r, --relative', 'relative path', false)
    .action(function (htmlFile, options) {
        args = {
            htmlFile: htmlFile,
            options: options
        };
    })
    .parse(process.argv);

if (!args) {
    try {
        let config = require('./binject.json');
        if (!config.htmlFile) {
            throw new Error("htmlFile isn't set in binject.json");
        }
        args = {
            htmlFile: config.htmlFile,
            options: {
                ignorePath: config.ignorePath || '.',
                watch: !!config.watch,
                relative: !!config.relative
            }
        }
    } catch (e) {
        program.outputHelp();
        process.exit(-1);
    }
}

function perform() {
    gulp.src(args.htmlFile)
        .pipe(inject(gulp.src(mainBowerFiles(), { read: false }), {
            name: 'bower',
            relative: args.options.relative,
            ignorePath: args.options.ignorePath,
            endtag: '<!-- endbower -->'
        }))
        .pipe(gulp.dest(path.dirname(args.htmlFile)));
}
perform();

if (args.options.watch) {
    gulp.watch('bower.json', function () {
        perform();
    });
}