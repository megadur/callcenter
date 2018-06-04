import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { XAuftragExt } from '../../../model/x_auftrag_ext';
import { XAuftragService } from '../../../service/xauftrag.service';

import { ConfigurationService } from '../../../service/configuration.service';
import * as myGlobals from '../../../globals'; //<==== this one


@Component({
  selector: 'app-nutzer',
  templateUrl: './nutzer.component.html',
  styleUrls: ['./nutzer.component.css']
})
export class NutzerComponent implements OnInit {

    @Output() xauftragExtOut = new EventEmitter<XAuftragExt>();
    // prdFlt: XAuftrag;

    xauftragExt: XAuftragExt;
    xauftragExtList: XAuftragExt[];

    dbgLevel: number;
    dbMode: string;
    constructor(private route: ActivatedRoute,
        private aService: XAuftragService,
        private cfgService: ConfigurationService,
    ) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.dbMode = myGlobals.getMode();
        this.xauftragExt = new XAuftragExt();
    }
    getMode() {
        return myGlobals.getMode();
    }
    hasXAuftragExtList(xl: XAuftragExt[]) {
        if (xl) {
            console.log(this.logHead() + 'hasXAuftragExtList()' + xl.length);
            this.xauftragExtList = xl;
            if (xl) this.xauftragExt = xl[0];
        }
    }
    hasXAuftragExt(x: XAuftragExt) {
        if (x) {
            console.log(this.logHead() + 'hasXAuftragExt() ' + x.EO_ID);
            this.xauftragExt = x;
        }
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-nutzer';
        sRet = sRet + '\r\n xauftragExt:'; if (this.xauftragExt) { sRet = sRet + this.xauftragExt.name; }
        sRet = sRet + '\r\n xauftragList:'; if (this.xauftragExtList) { sRet = sRet + this.xauftragExtList.length; }
        // sRet = sRet + '\r\n nmauftragFlt:'; if (this.prdFlt) { sRet = sRet + JSON.stringify(this.prdFlt); }

        return sRet + ', \r\n';
    }
    logHead() {
        return this.constructor.name + ': ';
    }
}
