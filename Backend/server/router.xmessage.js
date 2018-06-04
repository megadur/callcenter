var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var oracledb = require('oracledb');
var Archiver = require('archiver');
var database = require('./base/database-pool.js');

database.setPool('AB');
const nSizeChunk = 3500;

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

router.get('/:ID', async function (req, res) {
    var MSG_ID = req.params.ID;
    console.log('xmessage.router.get/MSG/ID:', MSG_ID);
    database.setPool('AB');
    let msg = await getMsg_ById(MSG_ID);
    // console.log('getMsg_ById() ret ', msg[0].EO_ID);
    let xml=msg[0].XML;
    console.log('getMsg_ById() ret ', xml.length, ' bytes');
    res
    //.set("responseType: 'text'  ")
    .status(200)
    //.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS') 
    //.append('Access-Control-Allow-Origin', '*')
    //.append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method")
    //.json(xml)
    if(req.headers.accept){
        if(req.headers.accept.includes('json')){
            res.set('Content-Type', 'application/json')

            res.json(xml);
        }else{
            res.set('Content-Type', 'text/xml');
            res.send(xml);
        }
    }
    return;

})

async function getMsgChunks_ById(MsgId) {

    return new Promise(async resolve => {
        let len = await getMsgLen_ById(MsgId);

        console.log('getMessageLen_ById: return ', len);
        let s = '',
            ss = '';
        let nChunk = Math.floor(len / nSizeChunk);
        // nChunk = 55000 % 4000;
        for (let n = 0; n < nChunk + 1; n++) {
            // console.log('getMsgChunk_ById: ', MSG_ID, n, nSize, (len - n * nSize) % nSize);
            ss = await getMsgChunk_ById(MsgId, nSizeChunk, n * nSizeChunk + 1);
            s = s + ss
            console.log('getMsgChunk_ById  ', n, ss.length, s.length);
        }
        resolve(s);
    });
}

function getMsg_ById(MsgId) {

    return new Promise(async resolve => {
        //xmltype( MESSAGE ).extract( '.' ).getclobval()
        var sSQL = '' +
            'SELECT \'X_MESSAGES\' AS TBL ' +
            '\r\n , XM.EO_ID, XM.SERVICE' +
            '\r\n ,  MESSAGE AS XML' +
            //    '\r\n , xmltype( MESSAGE ).extract(\'.\').getclobval() AS XML' +
            //'\r\n , xmltype( MESSAGE ).getclobval() AS XML' +
            //'\r\n , XMLTYPE.CREATEXML( MESSAGE ).getclobval() AS XML' +
            '\r\n FROM IDMA_AUFTRAGS_DISPDB_DATA.X_MESSAGES XM' +
            '\r\n WHERE XM.ID=:ID' +
            '';
        // console.log('getMSG_ById sSQL:\n ', sSQL);
        let r = await getResultList(sSQL, {
            ID: MsgId
        }).catch(function (err) {
            reject(err);
        });
        resolve(r);
    }).catch(function (err) {
        reject(err);
    });
}

async function getMsgLen_ById(MsgId, callback) {
    // console.log(' getMsgLen: ', MsgId);
    return new Promise(async resolve => {
        var sSQL = '' +
            'SELECT \'X_MESSAGES\' AS TBL ' +
            '\r\n , XM.EO_ID, XM.SERVICE, dbms_lob.getlength(XM.MESSAGE) AS LEN' +
            '\r\n FROM IDMA_AUFTRAGS_DISPDB_DATA.X_MESSAGES XM' +
            '\r\n WHERE XM.ID=:ID' +
            '';
        // console.log('getMSG_ById sSQL:\n ', sSQL);
        let r = await getResultList(sSQL, {
            ID: MsgId
        });
        if (r.length > 0) {
            resolve(r[0].LEN);
        };
    });
}

function getMsgChunk_ById(MsgId, nLen, nOff) {
    //console.log('getMsgChunk_ById: ', MsgId, nLen, nOff);
    return new Promise(async resolve => {
        var sSQL = '' +
            'SELECT \'X_MESSAGES\' AS TBL ' +
            '\r\n , dbms_lob.substr(XM.MESSAGE, ' + nLen + ', ' + nOff + ') AS MSG' +
            '\r\n FROM IDMA_AUFTRAGS_DISPDB_DATA.X_MESSAGES XM' +
            '\r\n WHERE XM.ID=:MsgId' +
            '';
        //        console.log('getMsgChunk_ById sSQL:\n ', sSQL);
        let r = await getResultList(sSQL, {
            MsgId: MsgId
        });
        if (r.length > 0) {
            resolve(r[0].MSG);
        }
    }).catch(function (err) {
        reject(err);
    });
}

async function getMsg_ByMsgId(MSG_ID, callback) {
    console.log('getMsg_ByMsgId: ', MSG_ID);

    let len = await getMsgLen_ById(MSG_ID);
    // console.log('getMessageLen_ById: return ', len);
    const nSize = 2000;
    let s = '',
        ss = '';
    let nChunk = Math.floor(len / nSize);
    // nChunk = 55000 % 4000;
    for (let n = 0; n < nChunk + 1; n++) {
        // console.log('getMsgChunk_ById: ', MSG_ID, n, nSize, (len - n * nSize) % nSize);
        ss = await getMsgChunk_ById(MSG_ID, nSize, n * nSize + 1, connection);
        s = s + ss
        // console.log('getMsgChunk_ById s= ', ss.length, s.length);
    }
    callback(s);
}

router.get('/:ID/LEN', function (req, res) {
    var MSG_ID = req.params.ID;
    console.log('xmessage.router.get/:ID/LEN:', MSG_ID);
    database.setPool('AB');

    getMsgLen_ById(MSG_ID, function (x) {
        console.log('call getMessageLen_ById() returns ', x);
        res.contentType('application/json').status(200);
        res.send(JSON.stringify(x));
        return;
    });
})

router.get('/', async function (req, res) {
    var msgid = req.query.MSG_ID;
    var eoid = req.query.EO_ID;

    database.setPool('AB');

    console.log('xmessage.router.get/MSG:', msgid, eoid);
    if (msgid) {
        var r = await getMsg_ById(msgid, function (x) {
            res.send(JSON.stringify(x));
            return;
        });
    }
    if (eoid) {
        var r = getMsgs_ByEoId(eoid, function (msgList) {
            var zip = Archiver('zip');
            // Tell the browser that this is a zip file.
            res.writeHead(200, {
                'Content-Type': 'application/zip',
                'Content-disposition': 'attachment; filename=' + eoid + '.zip'
            });
            // Send the file to the page output.
            zip.pipe(res);
            var i = 0;
            for (i in msgList) {
                var r = msgList[i];
                zip.append(r.XML, {
                    name: r.ID + '_' + r.SERVICE + '.xml'
                })
            }
            zip.finalize();
            /*
            // Create zip with some files. Two dynamic, one static. Put #2 in a sub folder.
            zip.append('Some text to go in file 1.', {
                    name: '1.txt'
                })
                .append('Some text to go in file 2. I go in a folder!', {
                    name: 'somefolder/2.txt'
                })
                .file('staticFiles/3.txt', {
                    name: '3.txt'
                })
                .finalize();
                */
            // console.log('getMsg_ById() ret ', x);
            //res.set('Content-Type', 'text/xml');
            //res.send(x);
            return;

        });

    }
})


async function getMsgs_ByEoId(eoid, callback) {
    log('getMsgs_ByEoId: ', eoid);
    let xmlist = await getMsgIdList_ByEoId(eoid);
    var i = 0;
    let msgList = [];
    for (i in xmlist) {
        var r = xmlist[i];
        let msg = await getMsg_ById(r.ID);
        console.log('getMsg_ById: ', r.ID, msg[0].EO_ID, msg[0].SERVICE);
        r.XML = msg[0].XML;
        msgList[i] = r;
        /*msgList[i] = {
            MSG: msg,
            ID: r.ID,
            SERVICE: r.SERVICE
        };*/
    }
    callback(msgList);
}

function xgetMsgs_ByEoId(connAttrs, EO_ID, callback) {
    console.log('getMsgs_ByEoId: ', EO_ID);
    /**/
    oracledb.getConnection(connAttrs,
        async function (err, connection) {
            if (err) throw err;
            let xmlist = await getMsgIdList_ByEoId(connection, EO_ID);
            var i = 0;
            let msgList = [];
            for (i in xmlist) {
                var r = xmlist[i];
                let msg = await getMsg_ById(r.ID, connection);
                // console.log('getMsg_ById: ', r.ID, msg.length);
                msgList[i] = {
                    MSG: msg,
                    ID: r.ID,
                    SERVICE: r.SERVICE
                };

            }

            callback(msgList);

        }
    );

}

async function getMsgIdList_ByEoId(eoid) {
    return new Promise(resolve => {
        var sSQL = '' +
            'SELECT \'X_MESSAGES\' AS TBL' +
            '\n, XM.ID, XM.EO_ID , XM.SERVICE  ' +
            '\n FROM IDMA_AUFTRAGS_DISPDB_DATA.X_MESSAGES XM  ' +
            '\n WHERE XM.EO_ID=:eoid'
        '';
        // console.log('getMsgIdList_ByEoId sSQL:\n ', sSQL);
        resolve(getResultList(sSQL, {
            eoid: eoid
        }).catch(function (err) {
            reject(err);
        }));
    });
}

async function getResultList(sSQL, params, options) {
    //log(" sSQL: " + sSQL);
    // log(" getResultList.params:   " + JSON.stringify(params));
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            database.fetchAsString = [oracledb.CLOB];
            database.simpleExecute(
                    sSQL, params, //{} no binds
                    {
                        outFormat: database.OBJECT,
                        fetchInfo: {
                            "XML": {
                                type: oracledb.STRING
                            }
                        }
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

/**/
module.exports = router;