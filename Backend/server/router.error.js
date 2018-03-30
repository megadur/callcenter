var express = require('express')
var router = express.Router()
var dateFormat = 'YYYY-MM-DD';
// var db = require('./base/dbconfig');
var database = require('./base/database-pool.js');


function generateParams(req, params) {
    if(params){
        return params.map(e => {
            var a = e.split('.');
            return req[String(a[0])][String(a[1])];
        });
        }
}

function log(sLog) {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var fdt = dt.format('Y-m-d H:M:S');
    console.log(fdt + ' ' + sLog);
}

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('Y-m-d H:M:S');
    console.log(formatted + ' router.use ' + req.baseUrl);
    next();
})

// define the  route
// suche nach XOID, LIKE Fehlercode, Status, System
router.get('/', function (req, res) {
    let params = [];
    sSQL = "SELECT 'X_ERROR_LIST' AS TBL, ";
    sSQL = sSQL + '\n XA.SO_TYPE_ID, XA.STATUS, ';
    sSQL = sSQL + '\n SOF.SPECIAL_ORDER_FLAG_ID, SOF.NAME, ';
    sSQL = sSQL + '\n XE.EO_ID, XE.SO_ID, XE.CODE_INT, XE.CODE_EXT, XE.SYS, XE.TASK, XE.TEXT_INT, XE.TEXT_EXT, XE.INC_TEXT_SHORT, XE.INC_TEXT_LONG, XE.HANDLING ';
    sSQL = sSQL + '\n FROM IDMA_AUFTRAGS_OPDB_DATA.X_ERROR XE '
    sSQL = sSQL + '\n LEFT JOIN IDMA_AUFTRAGS_OPDB_DATA.X_AUFTRAG XA ON XE.SO_ID = XA.SO_ID '
    sSQL = sSQL + '\n LEFT JOIN IDMA_AUFTRAGS_OPDB_DATA.X_AUFTRAG_EXT_2_SOF XAE2S ON XAE2S.EO_ID = XA.EO_ID '
    sSQL = sSQL + '\n LEFT JOIN IDMA_AUFTRAGS_OPDB_DATA.SPECIAL_ORDER_FLAG SOF ON SOF.SPECIAL_ORDER_FLAG_ID = XAE2S.SPECIAL_ORDER_FLAG_ID '
    sSQL = sSQL + '\n WHERE 1=1 '
    if (req.query) {
        if (req.query.EOID) {
            sSQL = sSQL + '\n AND (XE.EO_ID=:EO_ID OR :EO_ID IS NULL) ';
            params.push( req.query.EOID);
            params.push( req.query.EOID);
        }
        if (req.query.STATUS) {
            sSQL = sSQL + '\n AND (XA.STATUS=:STATUS OR :STATUS IS NULL) ';
            params.push( req.query.STATUS);
            params.push( req.query.STATUS);
        }
        if (req.query.SYSTEM) {
            sSQL = sSQL + '\n AND (XE.SYS=:SYSTEM OR :SYSTEM IS NULL) ';
            params.push( req.query.SYSTEM);
            params.push( req.query.SYSTEM);
        }
        if (req.query.CODEINT) {
            sSQL = sSQL + '\n AND XE.CODE_INT LIKE :CODE_INT ';
            let CODE_INT = '%' + req.query.CODEINT + '%';
            CODE_INT= CODE_INT.replace('*', '%');
            params.push( CODE_INT);
        }
        if (req.query.MAX_ROWS) {
            sSQL = sSQL + '\n AND (rownum<=:MAX_ROWS)';
            params.MAX_ROWS = req.query.MAX_ROWS;
        }
        if (req.query.MAX_VAL) {
            sSQL = sSQL + '\n AND (XE.ID>=:MAX_VAL)';
            params.MAX_VAL = req.query.MAX_VAL;
        }
    }

    //sSQL = sSQL + '\n AND (rownum<=:MAX_ROWS OR :MAX_ROWS IS NULL)';
    //sSQL = sSQL + '\n AND (EM.EM_MATNO>=:MAX_VAL OR :MAX_VAL IS NULL)';

    sSQL = sSQL + '\n AND rownum <= 10';
    sSQL = sSQL + '\n ORDER BY XE.ID';
    log(sSQL);
    if(params){
        //var reqparams = generateParams(req, params);
        //logger.info(' reqparams: ' + reqparams);    
    }

    log('params: ' + JSON.stringify(params));


    database.simpleExecute(
            sSQL,
            params,
            // {CAPTION:'%ISPX%', EM_MATNO:8822}, 
            //{EM_MATNO:'8822%'}, 
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

    //res.send('Birds home page')
    //res.send(JSON.stringify(results.rows));
})
// define the about route
router.get('/about', function (req, res) {
    res.send('About katalog')
})

module.exports = router;

// region random
function getRandomNumber(s) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const randomValue = s + ':' + Math.random();
            const error = randomValue > .8 ? true : false;
            if (error) {
                reject(new Error('Ooops, something broke!'));
            } else {
                resolve(randomValue);
            }
        }, 2000);
    });
}

async function logNumbersP(p) {
    let promises = [];
    promises[0] = getRandomNumber(p + '-A');
    promises[1] = getRandomNumber(p + '-B');
    promises[2] = getRandomNumber(p + '-C');
    Promise.all(promises)
        .then(function (values) {
            console.log('logNumbersP: ' + values);
        })
        .catch(function (err) {
            console.log(err);
        });
}

async function logNumbersS() {
    for (let x = 0; x < 3; x += 1) {
        console.log(await 'logNumbersS: ' + logNumbersP(x));
    }
}
//endregion