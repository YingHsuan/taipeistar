const express = require('express');
var path = require('path');
const app = express();

app.listen(3000, function () {
    app.get('/', function (req, res) {
        res.sendFile('index.html', { root: __dirname + '/doc' });
    });

    // static files
    app.use('/config', express.static('doc/config'));
    app.use('/js', express.static('doc/js'));
    app.use('/js', express.static(__dirname + '/node_modules/axios/doc/'));
    app.use('/js', express.static(__dirname + '/node_modules/lodash/'));
    app.use('/js', express.static(__dirname + '/node_modules/moment/'));
    app.use('/css', express.static('doc/css'));
    app.use('/data', express.static('doc/data'));
    app.use('/images', express.static('doc/images'));
    app.use('/fonts', express.static('doc/fonts'));
    console.log('open your explorer and go to localhost:3000');

    //404 handle
    app.use(function (req, res, next) {
        res.status(404);
        res.sendFile('not_found.html', { root: __dirname + '/doc' });
    });

});