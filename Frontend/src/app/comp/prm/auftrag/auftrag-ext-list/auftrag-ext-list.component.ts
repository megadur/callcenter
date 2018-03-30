import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PagerService } from '../../../../service/pager.service';

import { XAuftragExt } from '../../../../model/x_auftrag_ext';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-auftrag-ext-list',
    templateUrl: './auftrag-ext-list.component.html',
    styleUrls: ['./auftrag-ext-list.component.css']
})
export class AuftragExtListComponent implements OnInit {
    private _xauftragExtListIn: XAuftragExt[];
    @Output() xauftragExtOut = new EventEmitter<XAuftragExt>();

    //xauftragExt: XAuftragExt;
    // array of all items to be paged
    // private allItems: any[];
    pagesize = 3;
    // pager object
    pager: any = {};
    // items: XError[];
    // paged items
    pagedItems: any[];
    dbgLevel = 1;

    constructor(private pagerService: PagerService) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
    }

    @Input() set xauftragExtListIn(x: XAuftragExt[]) {
        if (x) {
            this.log('set xauftragExtListIn' + x.length);
            this._xauftragExtListIn = x;
            this.setxauftragExt(x[0]);
            // initialize to page 1
            this.setPage(1);
        }
    }
    get xauftragExtListIn() {
        this.log('get xauftragExtListIn');
        return this._xauftragExtListIn;
    }


    setPageSize(p: number) {
        this.pagesize = p;
        // initialize to page 1
        this.setPage(1);

    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        if (this._xauftragExtListIn) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this._xauftragExtListIn.length, page, this.pagesize);

            // get current page of items
            this.pagedItems = this._xauftragExtListIn.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }

    onSelect(xa: XAuftragExt): void {

        this.setxauftragExt(xa);
        //this.xerrorOut.emit(this.xauftragExt);
        this.log('onSelect()' + xa.EO_ID);
    }
    setxauftragExt(x: XAuftragExt) {
        this.xauftragExtOut.emit(x);
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-auftrag-ext-list';
        sRet = sRet + '\r\n _xauftragExtListIn:'; if (this._xauftragExtListIn) { sRet = sRet + this._xauftragExtListIn.length; }
        //sRet = sRet + '\r\n xauftragExt:'; if (this.xauftragExt) { sRet = sRet + this.xauftragExt.EO_ID; }

        return sRet + ', \r\n';
    }

    log(s) {
        console.log('AuftragExtListComponent: ' + s); // {order: "popular"}        
    }

}
