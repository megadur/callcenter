var express = require('express')
var router = express.Router()
var dateFormat = 'YYYY-MM-DD';
// var db = require("./base/dbconfig");
var database = require('./base/database-pool.js');


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
// define the home page route
router.get('/', function (req, res) {
    let param = {};
    database.setPool('AB');

    /*
    --EM_MATNO, CAPTION, DESCRIPTION, PRODUCT_STATUS, EM_TYPE_ID, INID_TYPE_ID, SUSP_GROUP_ID, IS_DELETED, TS_DELETION, LAST_UPD
    SELECT 
    --COUNT(EM.EM_MATNO)
    EM.*, EM2MP.MP_MATNO, EM2MP.MP_NAME
    FROM IDMA_BESTANDS_OPDB_DATA.PRD_EM EM
    LEFT JOIN IDMA_BESTANDS_DISPDB_DATA.PRD_EM2MP EM2MP ON EM.EM_MATNO=EM2MP.EM_MATNO;
    */

    sSQL = "SELECT 'KATALOG' AS TBL,  ";
    sSQL = sSQL + '\n EM.*, EM2MP.MP_MATNO, EM2MP.MP_NAME, EMT.CAPTION AS EMT_CAPTION, INIT.MULTI_INIDS_ALLOWED, INIT.IK_REQUIRED, INIT.IS_KEPT_ALIVE '
    sSQL = sSQL + '\n FROM IDMA_BESTANDS_OPDB_DATA.PRD_EM EM '
    sSQL = sSQL + '\n LEFT JOIN IDMA_BESTANDS_DISPDB_DATA.PRD_EM2MP EM2MP ON EM.EM_MATNO=EM2MP.EM_MATNO '
    sSQL = sSQL + '\n JOIN IDMA_BESTANDS_OPDB_DATA.PRD_EM_TYPE EMT ON EM.EM_TYPE_ID=EMT.EM_TYPE_ID '
    sSQL = sSQL + '\n JOIN IDMA_BESTANDS_OPDB_DATA.PRD_INID_TYPE INIT ON EM.INID_TYPE_ID=INIT.INID_TYPE_ID '
    sSQL = sSQL + '\n WHERE 1=1 '
    if (req.query) {
        if (req.query.EM_MATNO) {
            sSQL = sSQL + '\n AND EM.EM_MATNO LIKE ';
            let par = req.query.EM_MATNO;
            par=par.replaceAll('*', '%');
            if (par.indexOf('%') < 0) {
                par = '%' + par + '%';
            }
            sSQL = sSQL + '\'' + par + '\''
            //param.EM_MATNO = '' + req.query.EM_MATNO + '';
            //param.EM_MATNO = param.EM_MATNO.replace("*", "%");
        }
        if (req.query.CAPTION) {
            sSQL = sSQL + '\n AND EM.CAPTION LIKE ';
            let par = req.query.CAPTION;
            par=par.replaceAll('*', '%');
            if (par.indexOf('%') < 0) {
                par = '%' + par + '%';
            }
            sSQL = sSQL + '\'' + par + '\''
            //param.CAPTION = '\'' + req.query.CAPTION + '\'';
            //param.CAPTION = param.CAPTION.replaceAll("*", "%");
        }
        if (req.query.MAX_ROWS) {
            sSQL = sSQL + '\n AND (rownum<=:MAX_ROWS)';
            param.MAX_ROWS = req.query.MAX_ROWS;
        }
        if (req.query.MAX_VAL) {
            sSQL = sSQL + '\n AND (EM.EM_MATNO>=:MAX_VAL)';
            param.MAX_VAL = req.query.MAX_VAL;
        }
    }

    //sSQL = sSQL + '\n AND (rownum<=:MAX_ROWS OR :MAX_ROWS IS NULL)';
    //sSQL = sSQL + "\n AND (EM.EM_MATNO>=:MAX_VAL OR :MAX_VAL IS NULL)";

    //sSQL = sSQL + "\n AND rownum <= 11";
    sSQL = sSQL + "\n ORDER BY EM.EM_MATNO";
    //sSQL = sSQL + "\n ;";
     log(sSQL);
     log('param: ' + JSON.stringify(param));

    database.simpleExecute(
            sSQL,
            param,
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
            console.log(err);
            next(err);
        });

    //res.send('Birds home page')
    //res.send(JSON.stringify(results.rows));
})

// get EM Details 
router.get('/EM/:EM_MATNO', async function (req, res) {
    var emId = generateParams(req, ["params.EM_MATNO"]);
    log('router.get: ' + req.path + ' mit ' + emId);
    database.setPool('AB');
    var prdem = await getEMDetails_ById(emId, res);
    // log('router.send: ' + JSON.stringify(prdem));
    res.send(prdem);
})

// get LSI Details 
router.get('/LSI/:LSI_ID', async function (req, res) {
    var lsiId = generateParams(req, ["params.LSI_ID"]);
    log('router.get: ' + req.path + ' mit ' + lsiId);
    var prdem = await getLSIDetails_ByLsiId(lsiId, res);
//    log('router.send: ' + JSON.stringify(prdem));
    res.send(prdem);
})
// define the about route
router.get('/about', function (req, res) {
    res.send('About katalog')
})

module.exports = router;

// module.exports = getBestandByGuid;
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


async function getEMDetails_ById(emId, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let promises = [];
            log('getEMDetails_ById for: ' + emId);
            let params = {
                emId: emId
            }
            promises[0] = getEMDetails_ByEmId(emId);
            promises[1] = getEMRuleList_ByEmId(emId);
            promises[2] = getLSIListe_ByEmId(emId);

            var prdem = {};
            Promise.all(promises)
                .then(function (values) {
                    log('getEMDetails_ById got: ' + values.length + ' promises');
                    prdem = values[0][0];
                    prdem.EMR = values[1];
                    prdem.LSI = values[2];
                    resolve(prdem);
                })
                .catch(function (err) {
                    reject(err);
                });


        }, 2000);
    }).catch((error) => {
        console.error(error, 'getEMDetails_ById: Promise error');
    });;

}

async function getRows(sSQL, params) {
    // log(" sSQL: " + sSQL);
    // log(" Id:   " + Id);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            database.simpleExecute(
                    sSQL, params, //{} no binds
                    {
                        outFormat: database.OBJECT
                    }
                )
                .then(function (results) {
                    log(results.rows.length);
                    resolve(results.rows);
                })
                .catch(function (err) {
                    reject(err);
                });
        }, 2000);
    }).catch((error) => {
        console.error(error, 'Promise error');
    });;
}

function getEMDetails_ByEmId(emId) {
    log('getEMDetails_ByEmId for: ' + emId);

    let sSQL = 'SELECT \'EM\' AS TBL, E.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.PRD_EM  E \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (E.EM_MATNO=:emId)';
    // sSQL = sSQL + ' AND (rownum <10)';
    return getRows(sSQL, emId);
}

function getEMRuleList_ByEmId(emId) {
    log('getEMRuleList_ByEmId for: ' + emId);

    let sSQL = 'SELECT \'EM Rules\' AS TBL';
    sSQL = sSQL + ', EMR.*, EM2R.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.PRD_EM_RULE EMR \n';
    sSQL = sSQL + ' LEFT JOIN IDMA_BESTANDS_OPDB_DATA.PRD_EM_2_EM_RULE EM2R ON EMR.EM_RULE_ID=EM2R.EM_RULE_ID\n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (EM2R.EM_MATNO=:emId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getRows(sSQL, emId);
}
async function getLSIList_ByEmId(emId) {
    let sSQL = 'SELECT \'LSI LIST\' AS TBL  \n';
    sSQL = sSQL + ', PL.*, E2L.* \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.PRD_LSI PL \n';
    sSQL = sSQL + ' JOIN IDMA_BESTANDS_OPDB_DATA.PRD_EM_2_LSI E2L ON PL.LSI_ID=E2L.LSI_ID \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (E2L.EM_MATNO=:emId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getRows(sSQL, emId);
}
async function getLSIListe_ByEmId(emId) {
    let sSQL = 'SELECT \'LSI LIST\' AS TBL  \n';
    sSQL = sSQL + ', PL.*, E2L.* \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.PRD_LSI PL \n';
    sSQL = sSQL + ' JOIN IDMA_BESTANDS_OPDB_DATA.PRD_EM_2_LSI E2L ON PL.LSI_ID=E2L.LSI_ID \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (E2L.EM_MATNO=:emId)';
    sSQL = sSQL + ' AND (rownum <10)';
    let lsilist = await getRows(sSQL, emId);
    /*
    if (lsilist) {
        for (let i = 0; i < lsilist.length; i++) {
            let lsiId = lsilist[i].LSI_ID;
            let lsi=await getLSIDetails_ByLsiId(lsiId);
            lsilist[i].LSIR = lsi.LSIR;
            lsilist[i].LSIE = lsi.LSIE;
        }
    }*/
    return lsilist;
}
async function getLSI_ByEmId(emId) {
    let sSQL = 'SELECT \'LSI LIST\' AS TBL  \n';
    sSQL = sSQL + ', PL.*, E2L.* \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.PRD_LSI PL \n';
    sSQL = sSQL + ' JOIN IDMA_BESTANDS_OPDB_DATA.PRD_EM_2_LSI E2L ON PL.LSI_ID=E2L.LSI_ID \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (E2L.EM_MATNO=:emId)';
    sSQL = sSQL + ' AND (rownum <10)';
    let lsilist = await getRows(sSQL, emId);
    /*
    if (lsilist) {
        for (let i = 0; i < lsilist.length; i++) {
            let lsiId = lsilist[i].LSI_ID;
            let lsi=await getLSIDetails_ByLsiId(lsiId);
            lsilist[i].LSIR = lsi.LSIR;
            lsilist[i].LSIE = lsi.LSIE;
        }
    }*/
    return lsilist;
}

async function getLSIDetails_ByLsiId(lsiId) {
    log('getLSIDetails_ByLsiId for: ' + lsiId);
    let sSQL = 'SELECT \'LSI\' AS TBL  \n';
    sSQL = sSQL + ', PL.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.PRD_LSI PL \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (PL.LSI_ID=:lsiId)';
    sSQL = sSQL + ' AND (rownum <10)';
    let lsilist = await getRows(sSQL, lsiId);
    let lsi = lsilist[0];
    lsi.LSIR = await getLSIRuleListe_ByLsiId(lsiId);
    lsi.LSIE = await getLSIEnumListe_ByLsiId(lsiId);
    return lsi;
}

function getLSIRuleListe_ByLsiId(lsiId) {
    log('getLSIRuleListe_ByLsiId for: ' + lsiId);

    let sSQL = 'SELECT \'LSI RULE LIST \' AS TBL  \n';
    sSQL = sSQL + ', LR.* \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.PRD_LSI_2_LSI_RULE L2R \n';
    sSQL = sSQL + ' JOIN IDMA_BESTANDS_OPDB_DATA.PRD_LSI_RULE LR ON L2R.LSI_RULE_ID=LR.LSI_RULE_ID \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (L2R.LSI_ID=:lsiId)';
    let params = {
        lsiId: lsiId
    }
    return getRows(sSQL, lsiId);
}

function getLSIEnumListe_ByLsiId(lsiId) {
    log('getLSIEnumListe_ByLsiId for: ' + lsiId);

    let sSQL = 'SELECT \'LSI ENUM LIST \' AS TBL  \n';
    sSQL = sSQL + ', PE.* \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.PRD_ENUMERATION PE \n';
    sSQL = sSQL + ' JOIN IDMA_BESTANDS_OPDB_DATA.PRD_LSI_2_ENUMERATION L2E ON PE.ENUMERATION_ID=L2E.ENUMERATION_ID \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (L2E.LSI_ID=:lsiId)';
    let params = {
        lsiId: lsiId
    }
    return getRows(sSQL, lsiId);
}