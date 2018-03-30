import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { PrdEm } from '../../../model/prd_em';
import { PrdFlt } from '../../../model/prd_flt';

import { KatalogService } from '../../../service/katalog.service';
import { ConfigurationService } from '../../../service/configuration.service';

import * as myGlobals from '../../../globals'; //<==== this one

@Component({
  selector: 'app-katalog',
  templateUrl: './katalog.component.html',
  styleUrls: ['./katalog.component.css']
})
export class KatalogComponent implements OnInit {
    @Output() prdFltOut = new EventEmitter<PrdFlt>();
    prdFlt: PrdFlt;

    prdem: PrdEm;
    prdemList: PrdEm[];

    dbgLevel: number;
    dbMode: string;
    constructor(private route: ActivatedRoute,
        private kService: KatalogService,
        private cfgService: ConfigurationService,
    ) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.dbMode = myGlobals.getMode();
        this.prdem = new PrdEm();
    }
    getMode() {
        return myGlobals.getMode();
    }
    hasEmList(xl: PrdEm[]) {
        if (xl) {
            console.log(this.logHead() + 'hasEmList()' + xl.length);
            this.prdemList = xl;
            if (xl) this.prdem = xl[0];
        }
    }
    hasPrdEm(x: PrdEm) {
        if (x) {
            console.log(this.logHead() + 'hasPrdEm()' + x.EM_MATNO);
            this.prdem = x;
        }
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-katalog';
        sRet = sRet + '\r\n prdem:'; if (this.prdem) { sRet = sRet + this.prdem.EM_MATNO; }
        sRet = sRet + '\r\n prdemList:'; if (this.prdemList) { sRet = sRet + this.prdemList.length; }
        sRet = sRet + '\r\n prdemFlt:'; if (this.prdFlt) { sRet = sRet + JSON.stringify(this.prdFlt); }

        return sRet + ', \r\n';
    }
    logHead() {
        return this.constructor.name + ': ';
    }
}
