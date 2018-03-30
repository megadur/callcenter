var express = require('express');
var router = express.Router();

var wrouter = require("./wrouter");

var thisArg = {
    router: router,
    db: 'nutzer',
    sAlias:'AA'
};
/*
SELECT  'X_AUFTRAG' AS TBL, AU.*  
FROM IDMA_AUFTRAGS_OPDB_DATA.X_ACCOUNT_INFO AI
INNER JOIN IDMA_BESTANDS_OPDB_DATA.X_ACCOUNT A ON A.TO_NR=AI.TO_NR
INNER JOIN IDMA_AUFTRAGS_OPDB_DATA.X_AUFTRAG AU ON AI.O_ID=AU.EO_ID
WHERE AU.SO_TYPE_ID='Nutzerzuordnung'
ORDER BY AU.TS_LAST_UPDATE
;
*/
wrouter(thisArg, "/", "SELECT \
'Nutzer',AU.* \
\r\n FROM IDMA_AUFTRAGS_OPDB_DATA.X_ACCOUNT_INFO AI \
\r\n INNER JOIN IDMA_BESTANDS_OPDB_DATA.X_ACCOUNT A ON A.TO_NR=AI.TO_NR \
\r\n INNER JOIN IDMA_AUFTRAGS_OPDB_DATA.X_AUFTRAG AU ON AI.O_ID=AU.EO_ID \
\r\n WHERE 1=1 \
\r\n AND (AU.SO_TYPE_ID='Nutzerzuordnung')  \
\r\n AND (AU.STATUS=:STATUS OR :STATUS IS NULL)  \
\r\n ORDER BY AU.EO_ID \
"
,"query.STATUS","query.STATUS"
)

module.exports = router;