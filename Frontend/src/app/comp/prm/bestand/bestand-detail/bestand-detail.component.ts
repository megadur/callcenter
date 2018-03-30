import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Account } from '../../../../model/account';
import { Bestand } from '../../../../model/bestand';
import { XBestand } from '../../../../model/x-bestand';

import { XBestandService } from '../../../../service/xbestand.service';

import * as myGlobals from '../../../../globals'; //<==== this one
@Component({
    selector: 'app-bestand-detail',
    templateUrl: './bestand-detail.component.html',
    styleUrls: ['./bestand-detail.component.css']
})
export class BestandDetailComponent implements OnInit {
    //    private _account: Account;
    //    xbestandList: XBestand[];
    //    @Output() xbestandOut = new EventEmitter<XBestand[]>();
    bestand: Bestand;
    xbestand: XBestand;
    dbgLevel: number = 1;
    constructor(private bService: XBestandService) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.xbestand = new XBestand();
        //        this._account=new  Account();
        //        this.xbestandList=new Array<XBestand>() ;
    }
    @Input() set bestandIn(x: Bestand) {
        this.setBestand(x);
    }
    get bestandIn() {
        return this.bestand;
    }

    setBestand(x: Bestand): void {
        if (x) console.log('BestandDetailComponent.setBestand(' + x.STOCK_ID + ')');
        this.bestand = x;
        if (x) {
            this.getXBestandList_BySid(x.STOCK_ID);
        }
    }
    getXBestandList_BySid(sid: string) {
        console.log('AccountListComponent.getXBestandList_BySid()' + sid);
        this.bService.getXBestand_BySid( sid)
            .subscribe(x => {
                this.setXBestand(x);
            });
    }
    setXBestand(x: XBestand): void {
        if (x) console.log('AccountListComponent.setXBestand()' + x.STOCK_ID);
        this.xbestand = x;
    }
    getEMList() {
        if (this.xbestand)
            return this.xbestand.em;
    }
    getPARList() {
        if (this.xbestand)
            return this.xbestand.par;
    }
    getSPRList() {
        if (this.xbestand)
            return this.xbestand.spr;
    }
    getRNRList() {
        if (this.xbestand)
            return this.xbestand.rnr;
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-bestand-detail';
        sRet = sRet + '\r\n bestand:'; if (this.bestand) { sRet = sRet + this.bestand.SO_ID; }
        sRet = sRet + '\r\n xbestand:'; if (this.xbestand) { sRet = sRet + this.xbestand.SO_ID; }

        return sRet + ', \r\n';
    }

}
