import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { XError } from '../../../../model/x_error';
import { PagerService } from '../../../../service/pager.service';

import { XErrorService } from '../../../../service/xerror.service';
import * as myGlobals from '../../../../globals'; //<==== this one
@Component({
    selector: 'app-fehlerinst-list',
    templateUrl: './fehlerinst-list.component.html',
    styleUrls: ['./fehlerinst-list.component.css']
})
export class FehlerinstListComponent implements OnInit {
    private _xerrorListIn: XError[];
    @Output() xerrorOut = new EventEmitter<XError>();
    xerrorSel: XError;
    xerrorList: XError[];
    // array of all items to be paged
    // private allItems: any[];
    pagesize = 3;
    // pager object
    pager: any = {};
    // items: XError[];
    // paged items
    pagedItems: any[];
    dbgLevel=1;
    constructor(private xerrorService: XErrorService, private pagerService: PagerService) {
        console.log('FehlerinstListComponent:  ()');
    }

    @Input() set xerrorListIn(x: XError[]) {
        this.dbgLevel=myGlobals.dbgLevel;
        this._xerrorListIn = x;
        // initialize to page 1
        this.setPage(1);
    }
    get xerrorListIn() {
        return this._xerrorListIn;
    }

    ngOnInit() {
        console.log('FehlerinstListComponent:  ngOnInit()');
        this.pagesize = 3;
    }

    getItems(): number {
        if (this._xerrorListIn) return this._xerrorListIn.length;
        return -1;
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

    onSelect(xerror: XError): void {
        this.xerrorSel = xerror;
        this.xerrorOut.emit(this.xerrorSel);
        console.log('FehlerinstListComponent: onSelect()' + this.xerrorSel.ID);
    }

    getXErrorList(): void {
        console.log('FehlerinstListComponent: getErrorList()');
        this.xerrorService.getXErrorList()
            .subscribe(x => {
                this.xerrorList = x;
                // initialize to page 1
                this.setPage(1);
            });
    }
    // TODO: Remove this when we're done
    get diagnostic() {

        let sRet = 'app-fehlerinst-list';
        sRet = sRet + '\r\n xerrorSel:'; if (this.xerrorSel) { sRet = sRet + this.xerrorSel.ID; }
        sRet = sRet + '\r\n xerrorList:'; if (this.xerrorList) { sRet = sRet + this.xerrorList.length; }
        sRet = sRet + '\r\n xerrorListIn:'; if (this.xerrorListIn) { sRet = sRet + this.xerrorListIn.length; }
        sRet = sRet + '\r\n xerrorOut:'; if (this.xerrorOut) { sRet = sRet + this.xerrorOut; }
        sRet = sRet + '\r\n pagedItems:'; if (this.pagedItems) { sRet = sRet + this.pagedItems.length; }
        sRet = sRet + '\r\n pagesize:'; if (this.pagesize) { sRet = sRet + this.pagesize; }
        //        if (this.xerrorSel) { sRet = sRet + 'xerror:' + JSON.stringify(this.xerrorSel) + ', <br/> \r\n'; }

        return sRet + ', \r\n';
    }
    log(s){
        console.log('AuftragComponent: ' + s); // {order: "popular"}        
    }

}










