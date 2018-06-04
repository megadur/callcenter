import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PagerService } from '../../../../service/pager.service';

import { XAuftrag } from '../../../../model/x_auftrag';
import { XAuftragExt } from '../../../../model/x_auftrag_ext';
import { XAuftragService } from '../../../../service/xauftrag.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-auftrag-int-list',
    templateUrl: './auftrag-int-list.component.html',
    styleUrls: ['./auftrag-int-list.component.css']
})
export class AuftragIntListComponent implements OnInit {
    dbgLevel: number;
    xauftragList: XAuftrag[];
    @Output() xauftragOut = new EventEmitter<XAuftrag>();
    xauftragExt: XAuftragExt;
    xauftrag: XAuftrag;
    // array of all items to be paged
    // private allItems: any[];
    pagesize = 3;
    // pager object
    pager: any = {};
    // items: XError[];
    // paged items
    pagedItems: any[];

    @Input() set xauftragExtIn(x: XAuftragExt) {
        if (x) {
            this.log('set xauftragExtIn: ' + x.EO_ID);
            this.xauftragExt = x;
                this.xauftrag = new XAuftrag()
            this.xauftrag.EO_ID = this.xauftragExt.EO_ID;
            this.getXAuftragList_ByXauftrag(this.xauftrag);
        }
        // initialize to page 1
        this.setPage(1);
    }
    get xauftragExtListIn() {
        this.log('get xauftragExtIn');
        return this.xauftragExtIn;
    }

    constructor(private pagerService: PagerService, private aService: XAuftragService) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.xauftrag = new XAuftrag();
        this.xauftragExt = new XAuftragExt();
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
        if (this.xauftragList) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this.xauftragList.length, page, this.pagesize);

            // get current page of items
            this.pagedItems = this.xauftragList.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }
    getXAuftragList_ByXauftrag(x: XAuftrag) {
        this.log('getXAuftragList_ByXauftrag()' + x.EO_ID);
        this.aService
            .getXAuftragList_ByXAuftrag(x)
            .subscribe(x => this.setXAuftragList(x));
    }
    setXAuftragList(x: XAuftrag[]) {
        if (x) {
            this.log('setXAuftragList: ' + x.length);
            this.xauftragList = x;
            this.xauftrag = x[0];
            this.xauftragOut.emit(this.xauftrag);
        }
    }
    onSelect(a: XAuftrag): void {
        this.log('onSelect()' + a.SO_ID);
        this.setXAuftrag(a);
        //this.xerrorOut.emit(this.xauftragExt);
     }
    setXAuftrag(a: XAuftrag) {
        this.xauftrag=a;
        this.xauftragOut.emit(a);
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-auftrag-int-list';
        sRet = sRet + '\r\n xauftragList:'; if (this.xauftragList) { sRet = sRet + this.xauftragList.length; }
        sRet = sRet + '\r\n xauftragExt:'; if (this.xauftragExt) { sRet = sRet + this.xauftragExt.EO_ID; }
        sRet = sRet + '\r\n xauftrag:'; if (this.xauftrag) { sRet = sRet + this.xauftrag.SO_ID; }
    
        return sRet + ', \r\n';
    }

    log(s) {
        console.log('AuftragIntListComponent: ' + s); // {order: "popular"}        
    }
}
