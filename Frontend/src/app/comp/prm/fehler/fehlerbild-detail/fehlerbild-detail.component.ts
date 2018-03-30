import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'underscore';

import { PagerService } from '../../../../service/pager.service';

import { Fehlerbild } from '../../../../model/fehlerbild';
import { FehlerbildService } from '../../../../service/fehlerbild.service';
import { XError } from '../../../../model/x_error';
import { XErrorService } from '../../../../service/xerror.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-fehlerbild-detail',
    templateUrl: './fehlerbild-detail.component.html',
    styleUrls: ['./fehlerbild-detail.component.css']
})
export class FehlerbildDetailComponent implements OnInit {
    dbgLevel=1;

    constructor(private xeService: XErrorService, private pagerService: PagerService) { }

    // array of all items to be paged
    private allItems: any[];
    pagesize = 3;
    // pager object
    pager: any = {};
    items: XError[];
 
    // paged items
    pagedItems: any[];

    ngOnInit() {
        this.pagesize = 3;
        this.xeService.getXErrorList()
            .subscribe(x => {
                this.allItems = x;

                // initialize to page 1
                this.setPage(1);

            });      
            this.dbgLevel=myGlobals.dbgLevel;

    }
 
    getItems():number {
        if (this.allItems) return this.allItems.length;
        return -1;
    }
    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page, this.pagesize);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}
