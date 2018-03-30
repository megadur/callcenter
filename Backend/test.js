var db = require("./server/base/dbconfig");
var dbconfig = require('./server/base/dbcfg.js');

var database = require('./server/base/database-pool.js');
var rb = require('./server/router.bestand.js');


function log(sLog) {
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var fdt = dt.format('Y-m-d H:M:S');
    console.log(fdt + ' ' + sLog);
}
// region Database
database.addBuildupSql({
    sql: "BEGIN EXECUTE IMMEDIATE q'[alter session set NLS_DATE_FORMAT='DD-MM-YYYY']'; END;"
});

database.addTeardownSql({
    sql: "BEGIN sys.dbms_session.modify_package_state(sys.dbms_session.reinitialize); END;"
});

database.createPool(dbconfig.getConn())
    .then(function () {

        console.log('createPool');
        test();
    })
    .catch(function (err) {
        console.error('Error occurred creating database connection pool', err);
        console.log('Exiting process');
        process.exit(0);
    });

database.terminatePool();
//endregion

function test() {
    console.log('test: start');

    //rb.getRandomNumber('a');
    var connAttrs = db; //.getConn('ET3');
    getBestandByGuid(db, ['100049012081112430100001'],
        function (bestand) {
            log('test callback :getBestandByGuid: ', bestand);
            log(JSON.stringify(bestand));
            //console.log('check: em:' & bestand.em == undefined & ', rnr:' & bestand.rnr == undefined & ', spr:' & bestand.spr == undefined & ', par:' & bestand.par == undefined & ', ins:' & bestand.ins == undefined);
        }
    ).catch(function (err) {
        console.log(err);
        next(err);
    });

    console.log('test: end');
}
// region random
function getRandomNumber(s) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const randomValue = s + ':' + Math.random();
            const error = randomValue > .8 ? true : false;
            if (error) {
                reject(new Error('Ooops, something broke!'));
            } else {
                resolve(Math.round(randomValue));
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

async function getBestandByGuid(connAttrs, reqparams, callback) {
    console.log('getBestandByGuid: ', reqparams);

    let sSQL = 'SELECT \'BESTAND\' AS TBL, B.*';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_BESTAND B  ';
    sSQL = sSQL + ' WHERE B.GUID = :GUID';

    let xbestandList = {};
    let xbestand = await getDetails(sSQL, {
        GUID: reqparams[0]
    });
    Promise.all([xbestand])
        .then(async function (values) {
            // log('getBestandByGuid getDetails: ' + values);
            // logNumbersS();

            let xbestandList = {};
            let i = 0;
            log("getBestandByGuid getBestand_ByStockId: " + values[0].length);
            let promises = [];

            values[0].forEach(function (row) {
                try {
                    let bestand=row;
                    let sid = bestand.STOCK_ID;
                    log("getBestandByGuid getBestand_ByStockId: " + sid);
                    xbestandList[i] = bestand;
                    log("getBestandByGuid getBestand_ByStockId: " + i + ' = ' + JSON.stringify(bestand));
                    promises[i] = getBestand_ByStockId(sid, function (bestand) {
                        // log("getBestandByGuid getBestand_ByStockId: next " + i);
                    });
                    i++;
                    log("getBestandByGuid getBestand_ByStockId: end " + i);
                } catch (ex) {
                    log('ex:' + ex);
                    throw ex;
                }
            })
            Promise.all(promises)
                .then(function (values) {
                    log("getBestandByGuid xbestandList len: " + values.length);
                    for (let i=0; i<values.length;i++){
                        // log("getBestandByGuid xbestandList row: " + row);
                         xbestandList[i]=values[i];

                    }

                    values.forEach(function (row) {
                    })
                    callback(xbestandList);
                })
                .catch(function (err) {
                    log(err);
                });

        })
        .catch(function (err) {
            console.log(err);
        });
    // region oldcode
    /*
        database.simpleExecute(
                sSQL, reqparams, //no binds
                {
                    outFormat: database.OBJECT
                }
            )
            .then(function (results) {
                var xbestandList = {};
                // logNumbersS();
                let i = 0;
                results.rows.forEach(async function (row) {
                    try {
                        let sid = row.STOCK_ID;
                        log(" getBestand_ByStockId: " + sid);
                        //let bestand = await getBestand_ByStockId(sid);
                       // xbestandList[i] = bestand;
                        i++;
                    } catch (ex) {
                        throw ex;
                    }
                })

            })
            .catch(function (err) {
                console.log(err);
                next(err);
            });
            */
    //endregion
}

async function getBestand_ByStockId(sid, callback) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
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
            var bestand = {};
            // xbestandList[0] = bestand;

            // console.log('bestand: results=' + results.rows.length);
            // console.table(results);

            Promise.all(promises)
                .then(function (values) {
                    log('getBestand_ByStockId got: ' + values.length);
                    bestand.EMS = values[0];
                    bestand.PAR = values[1];
                    bestand.RNR = values[2];
                    bestand.SPR = values[3];
                    bestand.INS = values[4];
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

async function getDetails(sSQL, params) {
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

function getEMDetails(stockId) {
    let sSQL = 'SELECT \'EM\' AS TBL, E.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_EINZELMODUL E \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (E.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getDetails(sSQL, stockId);
}

function getPARDetails(stockId) {
    let sSQL = 'SELECT \'PAR\' AS TBL, P.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_PARAMETER P \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (P.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getDetails(sSQL, stockId);
}

function getRNRDetails(stockId) {
    let sSQL = 'SELECT \'RNR\' AS TBL, R.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_RUFNUMMER R \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (R.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getDetails(sSQL, stockId);
}

function getSPRDetails(stockId) {
    let sSQL = 'SELECT \'SPR\' AS TBL, S.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_SPERRE S \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (S.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getDetails(sSQL, stockId);
}

function getINSDetails(stockId) {
    let sSQL = 'SELECT \'INS\' AS TBL, I.*  \n';
    sSQL = sSQL + ' FROM IDMA_BESTANDS_OPDB_DATA.X_INSTANZ I \n';
    sSQL = sSQL + ' WHERE 1=1 ';
    sSQL = sSQL + ' AND (I.STOCK_ID=:stockId)';
    sSQL = sSQL + ' AND (rownum <10)';
    return getDetails(sSQL, stockId);
}
