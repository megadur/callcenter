import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Fehlerbild } from '../../../../model/fehlerbild';
import { FehlerbildService } from '../../../../service/fehlerbild.service';
import { PagerService } from '../../../../service/pager.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-fehlerbild-list',
    templateUrl: './fehlerbild-list.component.html',
    styleUrls: ['./fehlerbild-list.component.css']
})
export class FehlerbildListComponent implements OnInit {
    @Output() fehlerbildOut = new EventEmitter<Fehlerbild>();
    private _fehlerbildListIn: Fehlerbild[];

    fehlerbildSel: Fehlerbild;

    // array of all items to be paged
    //private allItems: any[];
    pagesize = 3;
    // pager object
    pager: any = {};
    // items: XError[];
    // paged items
    pagedItems: any[];
    dbgLevel=1;

    constructor(private fbService: FehlerbildService, private pagerService: PagerService) {
        console.log('FehlerbildListComponent:  ()');
    }

    @Input() set fehlerbildListIn(x: Fehlerbild[]) {
        this._fehlerbildListIn = x;
        // initialize to page 1
        this.setPage(1);
    }
    get xerrorListIn() {
        return this._fehlerbildListIn;
    }

    ngOnInit() {
        console.log('FehlerbildListComponent:  ngOnInit()');
        this.pagesize = 3;
        this.dbgLevel=myGlobals.dbgLevel;

    }

    getItems(): number {
        if (this._fehlerbildListIn) return this._fehlerbildListIn.length;
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
        if (this._fehlerbildListIn) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this._fehlerbildListIn.length, page, this.pagesize);

            // get current page of items
            this.pagedItems = this._fehlerbildListIn.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }
    
    onSelect(x: Fehlerbild): void {
        this.fehlerbildSel = x;
        this.fehlerbildOut.emit(this.fehlerbildSel);
        console.log('FehlerbildListComponent: onSelect()' + this.fehlerbildSel.ID);
    }
    
    getFehlerbildList(): void {
        console.log('FehlerinstListComponent: getErrorList()');
        this.fbService.getFehlerbildList()
            .subscribe(x => {
                this.fehlerbildListIn = x;
                // initialize to page 1
                this.setPage(1);
            });
    }
    // TODO: Remove this when we're done
    get diagnostic() {

        let sRet = 'app-fehlerbild-list';
        sRet = sRet + '\r\n fehlerbildSel:'; if (this.fehlerbildSel) { sRet = sRet + this.fehlerbildSel; }
        sRet = sRet + '\r\n fehlerbildListIn:'; if (this.fehlerbildListIn) { sRet = sRet + this.fehlerbildListIn.length; }


        sRet = sRet + '\r\n pagedItems:'; if (this.pagedItems) { sRet = sRet + this.pagedItems.length; }
        sRet = sRet + '\r\n pagesize:'; if (this.pagesize) { sRet = sRet + this.pagesize; }

        return sRet + ', \r\n';
    }

}











