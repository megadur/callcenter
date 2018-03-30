import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { XBestand } from '../../../../model/x-bestand';
import { XAuftragService } from '../../../../service/xauftrag.service';
import { XAuftrag } from '../../../../model/x_auftrag';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-auftrag-ext-detail',
    templateUrl: './auftrag-ext-detail.component.html',
    styleUrls: ['./auftrag-ext-detail.component.css']
})
export class AuftragExtDetailComponent implements OnInit {
    private _xbestand: XBestand;

    constructor(private aService: XAuftragService, private router: Router) { }
    xauftragList: XAuftrag[];
    xauftrag: XAuftrag;
    dbgLevel: number;

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.xauftrag = new XAuftrag();
    }

    @Input() set xbestandIn(x: XBestand) {
        console.log('AuftragExtDetailComponent.xbestandIn: ' + x);

        this._xbestand = x;
        if (this._xbestand) {
            if (this._xbestand)
                this.getXAuftragBySoId(this._xbestand.SO_ID);
        }
    }

    get xbestandIn() {
        return this._xbestand;
    }
    getXAuftragBySoId(soid) {
        console.log('AuftragExtDetailComponent.xbestandIn: ', soid);
        let guid = '';
        let eoid = '';
        this.aService
            .getXAuftragList_ByParam(guid, eoid, soid)
            .subscribe(x => this.setXAuftragList(x));

    }
    setXAuftragList(x) {
        console.log('setXAuftragList: ', x);
        this.xauftragList = x;
        if (this.xauftragList)
            this.xauftrag = this.xauftragList[0];
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-auftrag-ext-detail';
        sRet = sRet + '\r\n xauftragList:'; if (this.xauftragList) { sRet = sRet + this.xauftragList.length; }
        sRet = sRet + '\r\n xauftrag:'; if (this.xauftrag) { sRet = sRet + this.xauftrag.EO_ID; }
        sRet = sRet + '\r\n xbestand:'; if (this._xbestand) { sRet = sRet + this._xbestand.SO_ID; }

        return sRet + ', \r\n';
    }
}
