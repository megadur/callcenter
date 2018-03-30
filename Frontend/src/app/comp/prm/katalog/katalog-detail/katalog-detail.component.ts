import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { PrdEm } from '../../../../model/prd_em';
import { KatalogService } from '../../../../service/katalog.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
  selector: 'app-katalog-detail',
  templateUrl: './katalog-detail.component.html',
  styleUrls: ['./katalog-detail.component.css']
})
export class KatalogDetailComponent implements OnInit {

    @Input() prdemIn: PrdEm;
    dbgLevel: number;

    constructor(private aService: KatalogService) {

    }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.prdemIn = new PrdEm();
    }
    prdemrList(){
        if(this.prdemIn)
        return this.prdemIn.EMR;
    }
    prdlsiList(){
        if(this.prdemIn)
        return this.prdemIn.LSI;
    }
    getTitle(){
        if(this.prdemIn){
            return this.prdemIn.CAPTION;
        }
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-katalog-detail';
        sRet = sRet + '\r\n prdem:'; if (this.prdemIn) { sRet = sRet + this.prdemIn.EM_MATNO; }

        return sRet + ', \r\n';
    }
}
