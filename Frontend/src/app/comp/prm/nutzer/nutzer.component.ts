import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { XAuftrag } from '../../../model/x_auftrag';

import { XAuftragService } from '../../../service/xauftrag.service';
import { ConfigurationService } from '../../../service/configuration.service';

import * as myGlobals from '../../../globals'; //<==== this one


@Component({
  selector: 'app-nutzer',
  templateUrl: './nutzer.component.html',
  styleUrls: ['./nutzer.component.css']
})
export class NutzerComponent implements OnInit {

    @Output() nmauftragOut = new EventEmitter<XAuftrag>();
    // prdFlt: XAuftrag;

    nmauftrag: XAuftrag;
    nmauftragList: XAuftrag[];

    dbgLevel: number;
    dbMode: string;
    constructor(private route: ActivatedRoute,
        private kService: XAuftragService,
        private cfgService: ConfigurationService,
    ) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.dbMode = myGlobals.getMode();
        this.nmauftrag = new XAuftrag();
    }
    getMode() {
        return myGlobals.getMode();
    }
    hasXAuftragList(xl: XAuftrag[]) {
        if (xl) {
            console.log(this.logHead() + 'hasXAuftragList()' + xl.length);
            this.nmauftragList = xl;
            if (xl) this.nmauftrag = xl[0];
        }
    }
    hasXAuftrag(x: XAuftrag) {
        if (x) {
            console.log(this.logHead() + 'hasXAuftrag() ' + x.EO_ID);
            this.nmauftrag = x;
        }
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-katalog';
        sRet = sRet + '\r\n nmauftrag:'; if (this.nmauftrag) { sRet = sRet + this.nmauftrag.name; }
        sRet = sRet + '\r\n nmauftragList:'; if (this.nmauftragList) { sRet = sRet + this.nmauftragList.length; }
        // sRet = sRet + '\r\n nmauftragFlt:'; if (this.prdFlt) { sRet = sRet + JSON.stringify(this.prdFlt); }

        return sRet + ', \r\n';
    }
    logHead() {
        return this.constructor.name + ': ';
    }
}
