var express = require('express');
var router = express.Router();

var wrouter = require("./wrouter");

var thisArg = {
    router: router,
    db: 'katalog',
    sAlias:'AB'
};

// region query
// listet TOP 10 mit exaktem Filter
let sSQL="\r\n SELECT " + 
"\r\n 'KATALOG' AS TBL" + 
"\r\n, EM.*" + 
"\r\n FROM IDMA_BESTANDS_OPDB_DATA.PRD_EM EM" + 
"\r\n WHERE 1=1" + 
"\r\n AND (EM.EM_MATNO=:EM_MATNO OR :EM_MATNO IS NULL)" + 
"\r\n AND (EM.CAPTION LIKE :CAPTION OR :CAPTION IS NULL)" + 
"\r\n AND (rownum<=:MAX_ROWS OR :MAX_ROWS IS NULL)" + 
"\r\n AND (EM.EM_MATNO>=:MAX_VAL OR :MAX_VAL IS NULL)" + 
"\r\n AND rownum <= 10" + 
"\r\n ORDER BY EM.EM_MATNO" ;

wrouter(thisArg, "", 
sSQL
,"query.MAX_ROWS","query.MAX_ROWS"
,"query.MAX_VAL","query.MAX_VAL"
)
// endregion

module.exports = router;