export class XAuftrag {
    name: string;
    SO_ID: string;
    EO_ID: string;
    SO_TYPE_ID: string;
    STATUS: string;
    TS_CREATED: string;
    TS_COMPLETED: string;
    TS_ABORTED: string;
    TS_EXECUTED: string;
    TS_ROLLBACKED: string;
    TS_COMMITED: string;
    TS_LAST_UPDATE: string;
    LAST_UPD: string;
    constructor() {
        console.log("class XAuftrag");
        this.name='XAuftrag';
        this.SO_ID='';
        this.EO_ID='';
        this.SO_TYPE_ID='';
        this.STATUS='';
        this.TS_CREATED='';
        this.TS_COMPLETED='';
        this.TS_ABORTED='';
        this.TS_EXECUTED='';
        this.TS_ROLLBACKED='';
        this.TS_COMMITED='';
        this.TS_LAST_UPDATE='';
           this.LAST_UPD='';
        }

}