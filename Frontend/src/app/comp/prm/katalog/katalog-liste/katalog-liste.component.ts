import { OnInit, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

import { PrdEm } from '../../../../model/prd_em';
import { KatalogService } from '../../../../service/katalog.service';

import { PagerService } from '../../../../service/pager.service';
import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
  selector: 'app-katalog-liste',
  templateUrl: './katalog-liste.component.html',
  styleUrls: ['./katalog-liste.component.css']
})
export class KatalogListeComponent implements OnInit {

    private _prdemListIn: PrdEm[];
    private _prdem: PrdEm;
    @Output() prdemOut = new EventEmitter<PrdEm>();

    // array of all items to be paged
    // private allItems: any[];
    pagesize = 15;
    // pager object
    pager: any = {};
    // items: PrdEm[];
    // paged items
    pagedItems: any[];
    dbgLevel = 1;

    constructor(private pagerService: PagerService,private kService: KatalogService) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
    }

    @Input() set prdemListIn(x: PrdEm[]) {
        if (x) {
            console.log(this.logHead() +'set prdemListIn' + x.length);
            this._prdemListIn = x;
            this.setPrdEm(x[0]);
            // initialize to page 1
            this.setPage(1);
        }
    }
    get prdemListIn() {
        console.log(this.logHead() +'get prdemListIn');
        return this._prdemListIn;
    }
    prdemList() {
        return this.pagedItems;
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
        if (this._prdemListIn) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this._prdemListIn.length, page, this.pagesize);

            // get current page of items
            this.pagedItems = this._prdemListIn.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }

    onSelect(xa: PrdEm): void {
        console.log(this.logHead() +'onSelect()' + xa.EM_MATNO);
        let x=new PrdEm();
        x.CAPTION='bitte warten...'
        this.setPrdEm(x);
        this.getprdem_ById(xa.EM_MATNO);
    }
    setPrdEm(x: PrdEm) {
        this._prdem=x;
        this.prdemOut.emit(x);
    }
    getprdem_ById(x: string) {
        console.log(this.logHead() +'getprdem_ById()' + x);
        this.kService
        .getPrdEmDetails(x)
            .subscribe(x => this.setPrdEm(x));
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-error-list';
        sRet = sRet + '\r\n _prdemListIn:'; if (this._prdemListIn) { sRet = sRet + this._prdemListIn.length; }
        sRet = sRet + '\r\n _prdem:'; if (this._prdem) { sRet = sRet + this._prdem.EM_MATNO; }
        return sRet + ', \r\n';
    }
    logHead(){
        return this.constructor.name + ': ';
    }


}
