var express = require('express');
var router = express.Router();

var wrouter = require("./wrouter");

var thisArg = {
    router: router,
    db: 'kampagne',
    sAlias:'AA'
};  
let sSQL="";

// region KAMPAGNE_LIST all
/*
sSQL="\r\n SELECT " + 
"\r\n 'KAMPAGNE_LISTxx' AS TBL" + 
"\r\n, CAMPAIGN_ID, SERVICE, TICKET, TS_CREATION, REPRO_SPERRE, REPRO_EM, REPRO_RUFNR, REPRO_PARAM, STATUS, ANZ_JOBS, DELAY, WAITING_PERIOD" + 
"\r\n FROM  IDMA_AUFTRAGS_OPDB_DATA.KAMPAGNE" 
wrouter(thisArg, "xxx", sSQL);
*/
// endregion

//region KAMPAGNE single
sSQL="\r\n SELECT " + 
"\r\n 'KAMPAGNE' AS TBL" + 
"\r\n, CAMPAIGN_ID, SERVICE, TICKET, TS_CREATION, REPRO_SPERRE, REPRO_EM, REPRO_RUFNR, REPRO_PARAM, STATUS, ANZ_JOBS, DELAY, WAITING_PERIOD" + 
"\r\n FROM  IDMA_AUFTRAGS_OPDB_DATA.KAMPAGNE" + 
"\r\n WHERE 1=1" + 
"\r\n AND (CAMPAIGN_ID=:CAMPAIGN_ID OR :CAMPAIGN_ID IS NULL)" ;
wrouter(thisArg, "/:CAMPAIGN_ID", 
sSQL
,"params.CAMPAIGN_ID","params.CAMPAIGN_ID"
);
// endregion

// region KAMPAGNE_LIST filter
sSQL="\r\n SELECT " + 
"\r\n 'KAMPAGNE_LIST_FLT' AS TBL" + 
"\r\n, CAMPAIGN_ID, SERVICE, TICKET, TS_CREATION, REPRO_SPERRE, REPRO_EM, REPRO_RUFNR, REPRO_PARAM, STATUS, ANZ_JOBS, DELAY, WAITING_PERIOD" + 
"\r\n FROM  IDMA_AUFTRAGS_OPDB_DATA.KAMPAGNE" + 
"\r\n WHERE 1=1" + 
"\r\n AND (STATUS=:STATUS OR :STATUS IS NULL)" + 
"\r\n ORDER BY CAMPAIGN_ID" ;
wrouter(thisArg, "/", 
sSQL
,"query.STATUS","query.STATUS"
);
// endregion

// region KAMPAGNE_SERVICE_LIST filter
sSQL="\r\n SELECT " + 
"\r\n 'KAMPAGNE_SERVICES' AS TBL" + 
"\r\n, S.SERVICE, S.DESCRIPTION, SP.PARAMETER_NAME" + 
"\r\n FROM IDMA_AUFTRAGS_OPDB_DATA.KAMPAGNE_SERVICES S" + 
"\r\n LEFT JOIN IDMA_AUFTRAGS_OPDB_DATA.KAMPAGNE_SERVICES_PARAMETER SP ON S.SERVICE=SP.SERVICE" + 
wrouter(thisArg, "/SERVICES", 
sSQL,
);
// endregion

module.exports = router;