import { Stock } from './stock';
import { Em } from './em';
import { Rnr } from './rnr';
import { Spr } from './spr';
import { Ins } from './ins';
import { Par } from './par';
export class XBestand {
    TBL: string;
    STOCK_ID: string;
    GUID: string;
    SO_ID: string;
    STATUS: string;
    TS_BEREIT: string;
    TS_OBSOLET: string;
    TS_AKTIVIERT: string;
    TS_VERALTET: string;
    TS_LAST_UPDATE: string;
    PREV_STOCK_ID: string;
    LAST_UPD: string;
    em: Em[];
    par: Par[];
    rnr: Rnr[];
    spr: Spr[];
    ins: Ins[];
}
