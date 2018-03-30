// var db = require("../db");
var express = require('express');
var router = express.Router();
var database = require('./database.js');

function generateParams(req, params) {
    return params.map(e => {
        var a = e.split(".");
        if (a.length > 1) {
            return req[String(a[0])][String(a[1])];
        } else
            return null;
        //       return String(a[1]) +': \''+ req[String(a[0])][String(a[1])] + '\'';
    });
}

function log(sLog) {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var fdt = dt.format('Y-m-d H:M:S');
    console.log(fdt + sLog);
}

module.exports = function ( selector, sSQL, ...params) {
        log(" wrouter: selector " + selector);
    
    router.get(selector, function (req, res) {
        "use strict";
        log(" wrouter: get selector " + selector);

        
        //log(" wrouter get: db.connectString: " + db.getConn().connectString);
        // connAttrs = db.getConn();
        //log(" wrouter get: router.get.connectString: " + connAttrs.connectString);

        // console.log( " params: " + params);
        var reqparams = generateParams(req, params);
        log(" wrouter:  sSQL = " + sSQL);
        log(" wrouter:  reqparams = " + reqparams);

        database.simpleExecute(
                sSQL, reqparams, //no binds
                {
                    outFormat: database.OBJECT
                }
            )
            .then(function (results) {
                // res.send(results.rows);
                log(" GET [" + selector + "](" + reqparams + ")(" + "(" + params + ") = length " + results.rows.length);
                res.contentType('application/json').status(200);
                res.send(JSON.stringify(results.rows));
            })
            .catch(function (err) {
                next(err);
            });
        /*
                database.execute(sSQL, reqparams, {
                    outFormat: oracledb.OBJECT // Return the result as Object
                }, function (err, result) {
                    if (err) {
                        log(" wrouter:  err " + err);

                        res.set('Content-Type', 'application/json');
                        res.status(500).send(JSON.stringify({
                            status: 500,
                            message: "wrouter: Error getting the user profile",
                            detailed_message: err.message
                        }));
                    } else {
                        log(" wrouter:  Connection GET: " + selector);
                        log(" wrouter:  req.baseUrl: " + req.baseUrl);
                        if (req.baseUrl == '/bestand') {
                            result.rows.forEach(function (row) {
                                log(" wrouter:  row[0][1]: " + row.STOCK_ID);
                                best.getDepartment(connAttrs, 'selector', null);
                            })
                        }
                        res.contentType('application/json').status(200);
                        res.send(JSON.stringify(result.rows));
                        log(" GET [" + selector + "](" + reqparams + ")(" + "(" + params + ") = length " + result.rows.length);
                        //  console.log(fdt+ " SQL " + sSQL);
                    }
                });
        */
    });
    // Http method: POST
    // URI        : /user_profiles
    // Creates a new user profile
    router.post(selector, function (req, res) {
        "use strict";
        log(" wrouter: post selector " + selector);
        if ("application/json" !== req.get('Content-Type')) {
            res.set('Content-Type', 'application/json').status(415).send(JSON.stringify({
                status: 415,
                message: "Wrong content-type. Only application/json is supported",
                detailed_message: null
            }));
            return;
        }
        oracledb.getConnection(connAttrs, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json').status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }

            var reqparams = generateParams(req, params);

            connection.execute(sSQL, reqparams, {
                    autoCommit: true,
                    outFormat: oracledb.OBJECT // Return the result as Object
                },
                function (err, result) {
                    if (err) {
                        // Error
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err.message.indexOf("ORA-00001") > -1 ? "User already exists" : "Input Error",
                            detailed_message: err.message
                        }));
                    } else {
                        log(" Connection POST: " + selector);

                        // Successfully created the resource
                        res.status(201).set('Location', '/user_profiles/' + req.body.USER_NAME).end();
                        log(" POST " + selector + "(" + reqparams + ") = length " + result.rows.length);
                        log(" SQL " + sSQL);
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                log("POST /user_profiles : Connection released");
                            }
                        });
                });
        });
    });

    router.put(selector, function (req, res) {
        "use strict";
        log(" wrouter: put selector " + selector);

        if ("application/json" !== req.get('Content-Type')) {
            res.set('Content-Type', 'application/json').status(415).send(JSON.stringify({
                status: 415,
                message: "Wrong content-type. Only application/json is supported",
                detailed_message: null
            }));
            return;
        }

        oracledb.getConnection(connAttrs, function (err, connection) {
            if (err) {
                // Error connecting to DB
                res.set('Content-Type', 'application/json');
                res.status(500).send(JSON.stringify({
                    status: 500,
                    message: "Error connecting to DB",
                    detailed_message: err.message
                }));
                return;
            }

            var reqparams = params.map(e => req.params[String(e)]);
            var updateStatement = buildUpdateStatement(req);
            connection.execute(updateStatement.statement, updateStatement.bindValues, {
                    autoCommit: true,
                    outFormat: oracledb.OBJECT // Return the result as Object
                },
                function (err, result) {
                    if (err || result.rowsAffected === 0) {
                        // Error
                        res.set('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify({
                            status: 400,
                            message: err ? "Input Error" : "User doesn't exist",
                            detailed_message: err ? err.message : ""
                        }));
                    } else {
                        log(" Connection PUT: " + router.String);
                        // Resource successfully updated. Sending an empty response body. 
                        res.status(204).end();
                    }
                    // Release the connection
                    connection.release(
                        function (err) {
                            if (err) {
                                console.error(err.message);
                            } else {
                                log("PUT /user_profiles/" + req.params.USER_NAME + " : Connection released ");
                            }
                        });
                });

        });
    });

}