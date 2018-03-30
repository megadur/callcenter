 var logger = require('./base/logger');
 var database = require('./base/database-pool.js');

 logger.log('wrouter', 'info', "This is info level");
 logger.info('wrouter', 'This is info level');
 logger.error('wrouter', 'This is error level');
 logger.log('wrouter','debug', 'This is debug level');

 function generateParams(req, params) {
     return params.map(e => {
         var a = e.split(".");logger.error('wrouter', 'This is error level');

         if (a.length > 1) {
             return req[String(a[0])][String(a[1])];
         } else
             return null;
         //       return String(a[1]) +': \''+ req[String(a[0])][String(a[1])] + '\'';
     });
 }

 /*
  function logger.info(sLog) {
      var dateTime = require('node-datetime');
      var dt = dateTime.create();
      var fdt = dt.format('Y-m-d H:M:S');
      console.logger.info(fdt + sLog);
  }
 */
 module.exports = function (arg, selector, sSQL, ...params) {
     ({
         router,
         oracledb,
         connAttrs,
         sAlias
     } = arg);

     //logger.info(' DB conn pool set to ' + arg.sAlias + ' for ' + arg.db + '' + selector);
     database.setPool(arg.sAlias);
     router.get(selector, function (req, res, next) {
         "use strict";

         //logger.info(' database.setPool sAlias=' + arg.sAlias);
         database.setPool(arg.sAlias);

         // logger.info(" conn: " + JSON.stringify(conn));
         let p = database.getPool();
         if (p) {
             logger.info(' DB conn pool  is ' + p.poolAlias);
             // logger.info(' DB conn server is ' + JSON.stringify(dbconfig.getConn(p.poolAlias).connectString));
         }

         // logger.info( " arg.sAlias: " +  arg.db + '.' + arg.sAlias);
         var reqparams = generateParams(req, params);
         logger.info(" sSQL: " + sSQL);
         logger.info(" reqparams: " + reqparams);

         database.simpleExecute(
                 sSQL, reqparams, //no binds
                 {
                     outFormat: database.OBJECT
                 }
             )
             .then(function (results) {
                 logger.info(" results.rows: " + results.rows.length);
                 res.send(results.rows);
             })
             .catch(function (err) {
                 next(err);
             });

     });
     // Http method: POST
     // URI        : /user_profiles
     // Creates a new user profile
     router.post(selector, function (req, res) {
         "use strict";
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
                         logger.info(" Connection POST: " + selector);

                         // Successfully created the resource
                         res.status(201).set('Location', '/user_profiles/' + req.body.USER_NAME).end();
                         logger.info(" POST " + selector + "(" + reqparams + ") = length " + result.rows.length);
                         logger.info(" SQL " + sSQL);
                     }
                     // Release the connection
                     connection.release(
                         function (err) {
                             if (err) {
                                 console.error(err.message);
                             } else {
                                 logger.info("POST /user_profiles : Connection released");
                             }
                         });
                 });
         });
     });

     router.put(selector, function (req, res) {
         "use strict";
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
                         logger.info(" Connection PUT: " + router.String);
                         // Resource successfully updated. Sending an empty response body. 
                         res.status(204).end();
                     }
                     // Release the connection
                     connection.release(
                         function (err) {
                             if (err) {
                                 console.error(err.message);
                             } else {
                                 logger.info("PUT /user_profiles/" + req.params.USER_NAME + " : Connection released ");
                             }
                         });
                 });

         });
     });

 }