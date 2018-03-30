var express = require('express')
var router = express.Router()
var dateFormat = 'YYYY-MM-DD';
var bodyParser = require('body-parser');
var db = require("./base/dbconfig");

function generateParams(req, params) {
    return params.map(e => {
        var a = e.split(".");
        return req[String(a[0])][String(a[1])];
    });
}

function log(sLog) {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var fdt = dt.format('Y-m-d H:M:S');
    console.log(fdt + ' ' + sLog);
}
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    console.log(formatted + " router.use " + req.baseUrl);
    next();
})

// aktuelle DB config
router.get('/', function (req, res, next) { // GET 'http://www.example.com/admin/new'
    /*   console.log('app.get config');
    console.log("req.originalUrl:" + req.originalUrl); // '/admin/new'
    console.log("req.baseUrl:" + req.baseUrl); // '/admin'
    console.log("req.path:" + req.path); // '/new'
*/
    // TODO: res.send(JSON.stringify(db.getConn()));
    console.log("req.query.db_name:" + req.query.db_name); // '/new'
//    res.send(JSON.stringify(db.setConn(req.query.db_name)));
    res.send(db.setConn(req.query.db_name));
    next();
});
router.put('/', function (req, res, next) { // GET 'http://www.example.com/admin/new'
    /*   console.log('app.put config');
    console.log("req.originalUrl:" + req.originalUrl); // '/admin/new'
    console.log("req.baseUrl:" + req.baseUrl); // '/admin'
    console.log("req.path:" + req.path); // '/new'
*/
    console.log("req.query.db_name:" + req.query.db_name); // '/new'
//    res.send(JSON.stringify(db.setConn(req.query.db_name)));
    res.send(db.setConn(req.query.db_name));
    next();
});
// define the home page route
router.get('/home', function (req, res) {

    //res.send('Birds home page')
    //res.send(JSON.stringify(results.rows));
})

// define the about route
router.get('/about', function (req, res) {
    res.send('About katalog')
})

module.exports = router;