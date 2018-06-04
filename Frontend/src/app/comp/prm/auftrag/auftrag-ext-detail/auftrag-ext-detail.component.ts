import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Bestand } from '../../../../model/bestand';
import { XAuftragService } from '../../../../service/xauftrag.service';
import { XAuftragExt } from '../../../../model/x_auftrag_ext';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-auftrag-ext-detail',
    templateUrl: './auftrag-ext-detail.component.html',
    styleUrls: ['./auftrag-ext-detail.component.css']
})
export class AuftragExtDetailComponent implements OnInit {
    private _bestand: Bestand;

    constructor(private aService: XAuftragService, private router: Router) { }
    xauftragList: XAuftragExt[];
    xauftrag: XAuftragExt;
    dbgLevel: number;

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.xauftrag = new XAuftragExt();
    }

    @Input() set bestandIn(x: Bestand) {
        console.log('AuftragExtDetailComponent.bestandIn: ' + x);

        this._bestand = x;
        if (this._bestand) {
            if (this._bestand)
                this.getXAuftragBySoId(this._bestand.SO_ID);
        }
    }

    get bestandIn() {
        return this._bestand;
    }
    getXAuftragBySoId(soid) {
        console.log('AuftragExtDetailComponent.getXAuftragBySoId: ', soid);
        let guid = '';
        let eoid = '';
        this.aService
            .getXAuftragList_ByParam(guid, eoid, soid)
            .subscribe(x => this.setXAuftragList(x));

    }
    setXAuftragList(x) {
        console.log('AuftragExtDetailComponent.setXAuftragList: ', x);
        this.xauftragList = x;
        if (this.xauftragList)
            this.xauftrag = this.xauftragList[0];
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-auftrag-ext-detail';
        sRet = sRet + '\r\n xauftragList:'; if (this.xauftragList) { sRet = sRet + this.xauftragList.length; }
        sRet = sRet + '\r\n xauftrag:'; if (this.xauftrag) { sRet = sRet + this.xauftrag.EO_ID; }
        sRet = sRet + '\r\n bestand:'; if (this._bestand) { sRet = sRet + this._bestand.SO_ID; }

        return sRet + ', \r\n';
    }
}
