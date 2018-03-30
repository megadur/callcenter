var express = require('express');
var database = require('../base/database-pool.js');

function getEmps(req, res, next) {
    
    let sSQL = 'SELECT EM_RULE_ID, CAPTION, LAST_UPD ' +
        '    FROM IDMA_BESTANDS_OPDB_DATA.PRD_EM_RULE';
        console.log('getEmps with '+sSQL);

    database.simpleExecute(
            sSQL, {}, //no binds
            {
                outFormat: database.OBJECT
            }
        )
        .then(function (results) {
            res.send(results.rows);
        })
        .catch(function (err) {
            next(err);
        });
}

module.exports.getEmps = getEmps;
