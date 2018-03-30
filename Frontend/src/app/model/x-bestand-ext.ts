import { Stock } from './stock';
import { Em } from './em';
import { Rnr } from './rnr';
import { Spr } from './spr';
import { Ins } from './ins';
import { Par } from './par';
import { XAuftrag } from './x_auftrag';
import { XAuftragExt } from './x_auftrag_ext';
import { XMessage } from './x_message';
import { XError } from './x_error';
export class XBestandExt {
    id: string;
    stock: Stock;
    em: Em;
    par: Par;
    rnr: Rnr;
    spr: Spr;
    ins: Ins;
    xai: XAuftrag;
    xae: XAuftragExt;
    msg: XMessage;
    err: XError;
}
