import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Kampagne } from '../../../model/kampagne';

import { KatalogService } from '../../../service/katalog.service';
import { ConfigurationService } from '../../../service/configuration.service';

import * as myGlobals from '../../../globals'; //<==== this one

@Component({
  selector: 'app-kampagne',
  templateUrl: './kampagne.component.html',
  styleUrls: ['./kampagne.component.css']
})
export class KampagneComponent implements OnInit {

    @Output() kampagneOut = new EventEmitter<Kampagne>();
    // prdFlt: Kampagne;

    kampagne: Kampagne;
    kampagneList: Kampagne[];

    dbgLevel: number;
    dbMode: string;
    constructor(private route: ActivatedRoute,
        private kService: KatalogService,
        private cfgService: ConfigurationService,
    ) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.dbMode = myGlobals.getMode();
        this.kampagne = new Kampagne();
    }
    getMode() {
        return myGlobals.getMode();
    }
    hasKampagneList(xl: Kampagne[]) {
        if (xl) {
            console.log(this.logHead() + 'hasKampagneList()' + xl.length);
            this.kampagneList = xl;
            if (xl) this.kampagne = xl[0];
        }
    }
    hasKampagne(x: Kampagne) {
        if (x) {
            console.log(this.logHead() + 'hasKampagne() ' + x.CAMPAIGN_ID);
            this.kampagne = x;
        }
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-katalog';
        sRet = sRet + '\r\n kampagne:'; if (this.kampagne) { sRet = sRet + this.kampagne.name; }
        sRet = sRet + '\r\n kampagneList:'; if (this.kampagneList) { sRet = sRet + this.kampagneList.length; }
        // sRet = sRet + '\r\n kampagneFlt:'; if (this.prdFlt) { sRet = sRet + JSON.stringify(this.prdFlt); }

        return sRet + ', \r\n';
    }
    logHead() {
        return this.constructor.name + ': ';
    }

}
