import { XAuftrag } from '../model/x_auftrag';
import { XAuftragExt } from '../model/x_auftrag_ext';
export class Error {
    name: string;
    ID: string;
    EO_ID: string;
    SO_ID: string;
    CODE_INT: string;
    CODE_EXT: string;
    SYS: string;
    TASK: string;
    TEXT_INT: string;
    TEXT_EXT: string;
    INC_TEXT_SHORT: string;
    INC_TEXT_LONG: string;
    TS_CREATED: string;
    TS_CLOSED: string;
    HANDLING: string;
    LAST_UPD: string;
    IO: XAuftrag;
    EO: XAuftragExt;
}
