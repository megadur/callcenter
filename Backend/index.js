/* Copyright (c) 2015, Oracle and/or its affiliates. All rights reserved. */

/******************************************************************************
 *
 * You may not use the identified files except in compliance with the Apache
 * License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * NAME
 *   server.js
 *
 * DESCRIPTION
 *   The main entry point for the Node.js application.
 *
 *****************************************************************************/

var http = require('http');
var express = require('express');
// var morgan = require('morgan');
// var dbconfig = require('./server/dbconfig.js');
var dbconfig = require('./server/base/dbconfig.js');
var database = require('./server/base/database-pool.js');
var api = require('./server/samples/api.js');

var openHttpConnections = {};
var app;
var httpServer;


process.on('uncaughtException', function (err) {
    console.error('Uncaught exception ', err);

    shutdown();
});


process.on('SIGTERM', function () {
    console.log('Received SIGTERM');

    shutdown();
});

process.on('SIGINT', function () {
    console.log('Received SIGINT');

    shutdown();
});

initApp();

function initApp() {
    console.log('Server: initApp');
    app = express();
    httpServer = http.Server(app);
    // app.use(morgan('combined')); //logger
    dbconfig.setConn('ET3');
    // db.setConn('CIT2');
    app.use('/api', api.getRouter());

    app.use('/config', require('./server/router.config'));
    app.use('/error', require('./server/router.error'));
    app.use('/kampagne', require('./server/wrouter.kampagne'));
    app.use('/katalog', require('./server/router.katalog'));
    app.use('/nutzer', require('./server/wrouter.nutzer'));
    app.use('/xaccount', require('./server/wrouter.xaccount'));
    app.use('/xauftrag', require('./server/wrouter.xauftrag'));
    app.use('/xauftragext', require('./server/wrouter.xauftragext'));
    app.use('/xbestand', require('./server/router.xbestand'));
    app.use('/xerror', require('./server/wrouter.xerror'));
    app.use('/xmessages', require('./server/wrouter.xmessages'));

    app.use(handleError);

    httpServer.on('connection', function (conn) {
        var key = conn.remoteAddress + ':' + (conn.remotePort || '');

        openHttpConnections[key] = conn;

        conn.on('close', function () {
            delete openHttpConnections[key];
        });
    });

    database.addBuildupSql({
        sql: "BEGIN EXECUTE IMMEDIATE q'[alter session set NLS_DATE_FORMAT='DD-MM-YYYY']'; END;"
    });

    database.addTeardownSql({
        sql: "BEGIN sys.dbms_session.modify_package_state(sys.dbms_session.reinitialize); END;"
    });

    let promises = [];
    promises[0] = database.createPool(dbconfig.getConn('AA'));
    promises[1] = database.createPool(dbconfig.getConn('AB'));

    Promise.all(promises)
        .then(function (values) {
            console.log('Server: database.createPools done');
            httpServer.listen(3300, function () {
                "use strict";
                var host = httpServer.address().address,
                    port = httpServer.address().port;

                console.log(' Webserver is listening at http://%s:%s', host, port);
                let p = database.getPool();
                if (p) {
                    console.log(' DB pool  is ' + p.poolAlias);
                    console.log(' DB server is ' + JSON.stringify(dbconfig.getConn(p.poolAlias).connectString));
                }
            });
        })
        .catch(function (err) {
            console.error('Error occurred creating database connection pool', err);
            console.log('Exiting process');
            process.exit(0);
        });
}

function handleError(err, req, res, next) {
    console.error(err);
    res.status(500).send({
        error: 'An error has occurred, please contact support if the error persists'
    });
    shutdown(); //process would usually be restarted via something like https://github.com/foreverjs/forever
}


function shutdown() {
    console.log('Shutting down');
    console.log('Closing web server');

    httpServer.close(function () {
        console.log('Web server closed');

        database.terminatePool()
            .then(function () {
                console.log('node-oracledb connection pool terminated');
                console.log('Exiting process');
                process.exit(0);
            })
            .catch(function (err) {
                console.error('Error occurred while terminating node-oracledb connection pool', err);
                console.log('Exiting process');
                process.exit(0);
            });
    });

    for (key in openHttpConnections) {
        openHttpConnections[key].destroy();
    }
}