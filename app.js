const express = require('express');
var path = require('path');
const app = express();

app.listen(3000, function () {
    app.get('/', function (req, res) {
        res.sendFile('index.html', { root: __dirname + '/docs' });
    });
    app.get('/index', function (req, res) {
        res.sendFile('index.html', { root: __dirname + '/docs' });
    });
    app.get('/registered', function (req, res) {
        res.sendFile('registered.html', {
            root: __dirname + '/docs'
        });
    });
    app.get('/notice', function (req, res) {
        res.sendFile('notice.html', {
            root: __dirname + '/docs'
        });
    });
    app.get('/explanation', function (req, res) {
        res.sendFile('explanation.html', {
            root: __dirname + '/docs'
        });
    });
    app.get('/list', function (req, res) {
        res.sendFile('list.html', {
            root: __dirname + '/docs'
        });
    });
    app.get('/team_info', function (req, res) {
        res.sendFile('team_info.html', {
            root: __dirname + '/docs'
        });
    });
    app.get('/booking', function (req, res) {
        res.sendFile('booking.html', {
            root: __dirname + '/docs'
        });
    });
    app.get('/success', function (req, res) {
        res.sendFile('success.html', {
            root: __dirname + '/docs'
        });
    });

    // static files
    app.use('/config', express.static('doc/config'));
    app.use('/js', express.static('docs/js'));
    app.use('/js', express.static(__dirname + '/node_modules/axios/dist/'));
    app.use('/js', express.static(__dirname + '/node_modules/lodash/'));
    app.use('/js', express.static(__dirname + '/node_modules/moment/'));
    app.use('/css', express.static('docs/css'));
    app.use('/data', express.static('docs/data'));
    app.use('/images', express.static('docs/images'));
    app.use('/fonts', express.static('docs/fonts'));
    console.log('open your explorer and go to localhost:3000');

    //404 handle
    app.use(function (req, res, next) {
        res.status(404);
        res.sendFile('not_found.html', { root: __dirname + '/docs' });
    });

});