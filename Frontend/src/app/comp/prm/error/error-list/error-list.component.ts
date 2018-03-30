import { OnInit, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

import { XError } from '../../../../model/x_error';
import { XErrorFlt } from '../../../../model/x_error_flt';

import { PagerService } from '../../../../service/pager.service';
import { XErrorService } from '../../../../service/xerror.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.css']
})
export class ErrorListComponent implements OnInit {
    private _xerrorListIn: XError[];
    private _xerror: XError;
    @Output() xerrorOut = new EventEmitter<XError>();

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

    @Input() set xerrorListIn(x: XError[]) {
        if (x) {
            console.log(this.logHead() +'set xauftragExtListIn' + x.length);
            this._xerrorListIn = x;
            this.setXError(x[0]);
            // initialize to page 1
            this.setPage(1);
        }
    }
    get xerrorListIn() {
        console.log(this.logHead() +'get xauftragExtListIn');
        return this._xerrorListIn;
    }
    xerrorList() {
        return this._xerrorListIn;
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
        if (this._xerrorListIn) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this._xerrorListIn.length, page, this.pagesize);

            // get current page of items
            this.pagedItems = this._xerrorListIn.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }

    onSelect(xa: XError): void {
        this.setXError(xa);
        console.log(this.logHead() +'onSelect()' + xa.EO_ID);
    }
    setXError(x: XError) {
        this._xerror=x;
        this.xerrorOut.emit(x);
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-error-list';
        sRet = sRet + '\r\n _xerrorListIn:'; if (this._xerrorListIn) { sRet = sRet + this._xerrorListIn.length; }
        sRet = sRet + '\r\n _xerror:'; if (this._xerror) { sRet = sRet + this._xerror.EO_ID; }

        return sRet + ', \r\n';
    }
    logHead(){
        return this.constructor.name + ': ';
    }

}
