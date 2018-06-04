var express = require('express')
var router = express.Router()
var dateFormat = 'YYYY-MM-DD';
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
    var reqparams = generateParams(req, ["query.GUID", "query.STOCK_ID"]);
    log('router.xbestand.get: ' + req.path + ' mit ' + reqparams);
    if (reqparams[0]) {
        let guid = reqparams[0];
        getBestandList_ByGuid(guid, function (bestand) {
            // console.log('getBestandList_ByGuid returns: ', JSON.stringify(bestand));
            res.send(JSON.stringify(bestand));
        });
    }
    if (reqparams[1]) {
        let sid = reqparams[1];
        getBestand_ByStockId(sid, function (bestand) {
            log('getBestand_ByStockId returns: ', bestand);
            res.send(JSON.stringify(bestand));
        });
    }
});


router.get('/:STOCKID', function (req, res) {
    var reqparams = generateParams(req, ["params.STOCKID"]);
    log('router.xbestand.get: /:STOCKID ' + req.path + ' mit ' + reqparams);
    let sid = reqparams[0];
    //logNumbersP('1');
    //logNumbersS();
    getXBestand_ByStockId(sid, function (xbestand) {
        log('router.xbestand.get: /:STOCKID returns: ', xbestand.em);
        res.send(JSON.stringify(xbestand));
    });
})
router.get('/:GUID/DET', function (req, res) {
    console.log('router.xbestand.get: /:GUID/DET ' + req.path + ' mit ' + reqparams);
    var reqparams = generateParams(req, ["params.GUID"]);
    let guid = reqparams[0];
    getBestandList_ByGuid(guid, async function (bestandList) {
        console.log('router.xbestand.get: ', bestandList.length);
        let bestandListOut = [];
        let promises = [];
        bestandList.forEach(async function (bestand) {
            console.log('forEach.get: req', bestand.STOCK_ID);
            let i = 0;
            promises.push(getBestandDetails_ByStock(bestand));
            i++;
        });
        bestandListOut = await Promise.all(promises);
        res.send(JSON.stringify(bestandListOut));
    });
});

// define the about route
router.get('/about', function (req, res) {
    res.send('About birds')
})

module.exports = router;
// region random
function getRandomNumber(s) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const randomValue = Math.random();
            const error = randomValue > .8 ? true : false;
            if (error) {
                reject(new Error('Ooops, something broke!'));
            } else {
                resolve(s + ':' + Math.round(randomValue * 100) / 100);
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
    console.log('logNumbersS: start');
    for (let x = 0; x < 3; x += 1) {
        console.log(await 'logNumbersS: ' + logNumbersP(x));
    }
}
//endregion
async function getXBestand_ByStockId(sid, callback) {
    log('getXBestand_ByStockId: ', sid);

    let sSQL = 'SELECT \'BESTAND\' AS TBL, B.*';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_BESTAND B  ';
    sSQL = sSQL + ' WHERE B.STOCK_ID = :SID';

    let bestandlist = await getResultList(sSQL, {
        SID: sid
    })
    let bestand={}
    if(bestandlist){
        bestand=bestandlist[0];    
        log('getBestand_ByStockId: resolved ' + bestand.STOCK_ID);
    }
        
    let xbestand = await addXBestand_ByBestand(bestand);
    log('getXBestand_ByStockId: resolved ' + xbestand.STOCK_ID);

    callback(xbestand);

}

async function addXBestand_ByBestand(bestand) {
    log('addXBestand_ByBestand for: ' + bestand.STOCK_ID);
    return new Promise(function (resolve, reject) {
        setTimeout(async function () {
            let promises = [];
            // log('addXBestand_ByBestand with ' + bestand.STOCK_ID);
            let params = {
                stockId: bestand.STOCK_ID
            }
            promises[0] = getEMDetails(params);
            promises[1] = getPARDetails(params);
            promises[2] = getRNRDetails(params);
            promises[3] = getSPRDetails(params);
            promises[4] = getINSDetails(params);

            Promise.all(promises)
                .then(function (values) {
                    log('addXBestand_ByBestand got promises: ' + values.length);
                    bestand.em = values[0];
                    bestand.par = values[1];
                    bestand.rnr = values[2];
                    bestand.spr = values[3];
                    bestand.ins = values[4];
                    resolve(bestand);
                })
                .catch(function (err) {
                    reject(err);
                });
        }, 2000);
    }).catch((error) => {
        console.error(error, 'addXBestand_ByBestand Promise error');
    });;

}

async function getBestandList_ByGuid(guid, callback) {
    console.log('getBestandList_ByGuid: ', guid);

    let sSQL = 'SELECT \'BESTAND\' AS TBL, B.*';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_BESTAND B  ';
    sSQL = sSQL + ' WHERE B.GUID = :GUID';

    //let xbestandList = {};
    let promisesBestand = await getResultList(sSQL, {
        GUID: guid
    });
    log('getBestandList_ByGuid: await ' + promisesBestand.length);
    Promise.all([promisesBestand])
        .then(async function (values) {
            log('getBestandList_ByGuid: resolve ' + values.length);
            callback(values[0]);
        })
        .catch(function (err) {
            console.log(err);
        });
}


async function getBestandDetList_ByGuid(guid, callback) {
    console.log('getBestandDetList_ByGuid: ', guid);

    let sSQL = 'SELECT \'BESTAND\' AS TBL, B.*';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_BESTAND B  ';
    sSQL = sSQL + ' WHERE B.GUID = :GUID';

    //let xbestandList = {};
    let promisesBestand = await getResultList(sSQL, {
        GUID: guid
    });
    log('getBestandList_ByGuid: await', promisesBestand.length);
    Promise.all([promisesBestand])
        .then(async function (values) {
            log('getBestandList_ByGuid: got ', values[0].length);

            let xbestandList = [];
            let i = 0;
            let promisesDet = [];

            values[0].forEach(function (row) {
                try {
                    let bestand = row;
                    let sid = bestand.STOCK_ID;
                    //log("getBestandList_ByGuid getBestand_ByStockId: " + sid);
                    xbestandList[i] = {};
                    xbestandList[i] = bestand;
                    log('getBestandList_ByGuid getBestand_ByStockId(' + sid + '): promise[' + i + '] = ' + JSON.stringify(bestand.STOCK_ID));
                    promisesDet[i] = getBestand_ByStockId(sid, function (bestand) {
                        // log("getBestandByGuid getBestand_ByStockId: next " + i);
                    });
                    i++;
                } catch (ex) {
                    log('ex:' + ex);
                    throw ex;
                }
            })
            log("getBestandList_ByGuid getBestand_ByStockId: await " + promisesDet.length);
            Promise.all(promisesDet)
                .then(function (values) {
                    log("getBestandList_ByGuid got " + values.length);
                    for (let i = 0; i < values.length; i++) {
                        // log("getBestandByGuid xbestandList row: " + row);
                        let v = values[i];
                        xbestandList[i].em = v.EMS;
                        xbestandList[i].ins = v.INS;
                        xbestandList[i].par = v.PAR;
                        xbestandList[i].rnr = v.RNR;
                        xbestandList[i].spr = v.SPR;

                    }

                    callback(xbestandList);
                })
                .catch(function (err) {
                    log(err);
                });

        })
        .catch(function (err) {
            console.log(err);
        });
}
async function getBestand_ByStockId(sid, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(async function () {
            let promises = [];
            log('getBestand_ByStockId for: ' + sid);
            let params = {
                stockId: sid
            }
            promises[0] = getEMDetails(params);
            promises[1] = getPARDetails(params);
            promises[2] = getRNRDetails(params);
            promises[3] = getSPRDetails(params);
            promises[4] = getINSDetails(params);

            var bestand = await getBestandDetails(params);

            Promise.all(promises)
                .then(function (values) {
                    log('getBestand_ByStockId got: ' + values.length);
                    bestand.em = values[0];
                    bestand.par = values[1];
                    bestand.rnr = values[2];
                    bestand.spr = values[3];
                    bestand.ins = values[4];
                    resolve(bestand);
                })
                .catch(function (err) {
                    reject(err);
                });


        }, 2000);
    }).catch((error) => {
        console.error(error, 'Promise error');
    });;

}

async function getResultList(sSQL, params) {
    //log(" sSQL: " + sSQL);
    log(" getResultList.params:   " + JSON.stringify(params));
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            database.simpleExecute(
                    sSQL, params, //{} no binds
                    {
                        outFormat: database.OBJECT
                    }
                )
                .then(function (results) {
                    //res.send(results.rows);
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

function getBestandDetails(stockId) {
    let sSQL = 'SELECT \'Stock\' AS TBL, B.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_BESTAND B \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (B.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getResultList(sSQL, stockId);
}

function getEMDetails(stockId) {
    let sSQL = 'SELECT \'EM\' AS TBL, E.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_EINZELMODUL E \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (E.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getResultList(sSQL, stockId);
}

function getPARDetails(stockId) {
    let sSQL = 'SELECT \'PAR\' AS TBL, P.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_PARAMETER P \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (P.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getResultList(sSQL, stockId);
}

function getRNRDetails(stockId) {
    let sSQL = 'SELECT \'RNR\' AS TBL, R.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_RUFNUMMER R \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (R.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getResultList(sSQL, stockId);
}

function getSPRDetails(stockId) {
    let sSQL = 'SELECT \'SPR\' AS TBL, S.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_SPERRE S \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (S.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getResultList(sSQL, stockId);
}

function getINSDetails(stockId) {
    let sSQL = 'SELECT \'INS\' AS TBL, I.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_INSTANZ I \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (I.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getResultList(sSQL, stockId);
}