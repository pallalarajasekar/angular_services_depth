var config = {
    port: 8967,
    viewPath: __dirname + '/views', //Template Engine
    publicPath: __dirname + '/public', //Public Folder (Javascript, CSS)
    sessionStore: true,
    socketIO: true
};

var routes = require('./server/routes/index');
var readers = require('./server/routes/readers');
var books = require('./server/routes/books');

//var events=require('./eventController');
var us = require('underscore');
var assert = require('assert');
var XPressIO = require('xpressio');
var xpress = new XPressIO(config).start();
var app = xpress.app;
var io = xpress.io;

var fs = require('fs');

var datafile = 'server/data/books.json';

app.use('/', routes);
app.use('/api/readers', readers);
app.use('/api/books', books);

app.get('/index',function (req,res) {
    res.render('index')
});

//app.get('/data/event/:id',events);

/*
app.get('/api/books', function (req,res) {
    var data= fs.readFileSync(datafile, 'utf8');
    res.send(data);
});

/!*function getBookData() {

    var data = fs.readFileSync(datafile, 'utf8');
    return JSON.parse(data);
}*!/

app.put('/api/update', function(req, res) {

    var data = fs.readFileSync(datafile, 'utf8');

    var matchingBooks = data.filter(function(item) {
        return item.book_id == req.params.id;
    });

    if(matchingBooks.length === 0) {
        res.sendStatus(404);
    } else {

        var bookToUpdate = matchingBooks[0];
        bookToUpdate.title = req.body.title;
        bookToUpdate.author = req.body.author;
        bookToUpdate.year = req.body.year;

        saveBookData(data);
        res.sendStatus(204);

    }
});

app.get('/api/books/:bookID', function(req, res) {

    //console.log('Retrieving book id: ' + req.params.id);

    var data = fs.readFileSync(datafile, 'utf8');

    data = JSON.parse(data);

    var matchingBooks = data.filter(function(item) {
        return item.book_id == req.params.id;
    });

    if(matchingBooks.length === 0) {
        res.sendStatus(404);
    } else {
        res.send(matchingBooks[0]);
    }
});
*/