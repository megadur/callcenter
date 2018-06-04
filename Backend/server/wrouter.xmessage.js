var express = require('express');
var router = express.Router();

var wrouter = require("./wrouter");

var thisArg = {
    router: router,
    db: 'xmessage',
    sAlias: 'AB'

};

//region query
//ID, EO_ID, SO_ID, CORRELATION_ID, TS_CREATED, RL_ID, SERVICE, MESSAGE, HIS_AUFTRAG_ID, CONTEXT, TS_SENT
// dbms_lob.substr( XM.MESSAGE, dbms_lob.getlength(XM.MESSAGE), 1)  AS MSG \
// \r\n AND  rownum <= 11 \
wrouter(thisArg, "", "SELECT   'X_MESSAGES' AS TBL \
\r\n  , ID, EO_ID, SO_ID, CORRELATION_ID, TS_CREATED, RL_ID, SERVICE, HIS_AUFTRAG_ID, CONTEXT, TS_SENT  \
\r\n  , (CASE WHEN INSTR(XM.SERVICE, '.')>0 THEN 'WS' ELSE 'QUEUE'  END)  AS TYPE \
\r\n  FROM IDMA_AUFTRAGS_DISPDB_DATA.X_MESSAGES XM \
\r\n WHERE 1=1 \
 \r\n AND (XM.ID=:MSG_ID OR :MSG_ID IS NULL)  \
 \r\n AND (XM.SO_ID=:SO_ID OR :SO_ID IS NULL)  \
 \r\n AND (XM.EO_ID=:EO_ID OR :EO_ID IS NULL)  \
 \r\n ORDER BY XM.ID \
"
, "query.MSG_ID","query.MSG_ID"
, "query.SO_ID","query.SO_ID"
, "query.EO_ID","query.EO_ID"
)

wrouter(thisArg, "/:MSGID", "  SELECT   XM.ID AS ID,  \
\r\n  dbms_lob.substr( MESSAGE, dbms_lob.getlength(MESSAGE), 1) AS XML \
\r\n  FROM IDMA_AUFTRAGS_DISPDB_DATA.X_MESSAGES XM \
\r\n WHERE 1=1 \
 \r\n AND (XM.ID=:MSGID ) \
"
, "params.MSGID"
)

wrouter(thisArg, "/MSG_LEN", "SELECT  \
XM.ID AS ID, dbms_lob.getlength(XM.MESSAGE) AS LEN \
 \r\n  FROM IDMA_AUFTRAGS_DISPDB_DATA.X_MESSAGES XM \
 \r\n WHERE 1=1 \
 \r\n AND (XM.ID=:MSG_ID OR :MSG_ID IS NULL)  \
 \r\n AND (XM.SO_ID=:SO_ID OR :SO_ID IS NULL)  \
 \r\n AND (XM.EO_ID=:EO_ID OR :EO_ID IS NULL)  \
 \r\n AND  rownum <= 11 \
 \r\n ORDER BY XM.ID \
"
, "query.MSG_ID","query.MSG_ID"
, "query.SO_ID","query.SO_ID"
, "query.EO_ID","query.EO_ID"
)
// endregion

module.exports = router;