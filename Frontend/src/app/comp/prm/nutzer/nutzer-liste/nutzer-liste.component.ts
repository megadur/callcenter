import { OnInit, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';


import { XAuftrag } from '../../../../model/x_auftrag';

import { XAuftragService } from '../../../../service/xauftrag.service';


import { PagerService } from '../../../../service/pager.service';
import * as myGlobals from '../../../../globals'; //<==== this one


@Component({
  selector: 'app-nutzer-liste',
  templateUrl: './nutzer-liste.component.html',
  styleUrls: ['./nutzer-liste.component.css']
})
export class NutzerListeComponent implements OnInit {

    private _nmauftragListIn: XAuftrag[];
    private _nmauftrag: XAuftrag;
    @Output() nmauftragOut = new EventEmitter<XAuftrag>();

    // array of all items to be paged
    // private allItems: any[];
    pagesize = 15;
    // pager object
    pager: any = {};
    // items: XAuftrag[];
    // paged items
    pagedItems: any[];
    dbgLevel = 1;

    constructor(private pagerService: PagerService,private kService: XAuftragService) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
    }

    @Input() set nmauftragListIn(x: XAuftrag[]) {
        if (x) {
            console.log(this.logHead() +'set nmauftragListIn len ' + x.length);
            this._nmauftragListIn = x;
            this.setXAuftrag(x[0]);
            // initialize to page 1
            this.setPage(1);
        }
    }
    get nmauftragListIn() {
        console.log(this.logHead() +'get nmauftragListIn');
        return this._nmauftragListIn;
    }
    nmauftragList() {
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
        if (this._nmauftragListIn) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this._nmauftragListIn.length, page, this.pagesize);

            // get current page of items
            this.pagedItems = this._nmauftragListIn.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }

    onSelect(x: XAuftrag): void {
        console.log(this.logHead() +'onSelect() ' + x.EO_ID);
        this.setXAuftrag(x);
        /*
        let k=new XAuftrag();
        k.CAMPAIGN_ID='bitte warten...';
        this.setXAuftrag(k);
        this.getnmauftrag_ById(x.CAMPAIGN_ID);
        */
    }
    onEditStopp(x: XAuftrag){
        console.log(this.logHead()+' onEditStopp: ' + x.EO_ID);
        //this.setXAuftrag(x);
        // this.getnmauftrag_ById(x.CAMPAIGN_ID);
        
    }

    setXAuftrag(x: XAuftrag) {
        console.log(this.logHead() +'setXAuftrag(): ' + x.EO_ID);
        this._nmauftrag=x;
        this.nmauftragOut.emit(x);
    }
    getnmauftrag_ById(soid: string) {
        console.log(this.logHead() +'getnmauftrag_ById(): ' + soid);
        this.kService.getXAuftrag_BySoid(soid)
            .subscribe(x => this.setXAuftrag(x));
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-nmauftrag-list';
        sRet = sRet + '\r\n _nmauftragListIn:'; if (this._nmauftragListIn) { sRet = sRet + this._nmauftragListIn.length; }
        sRet = sRet + '\r\n _nmauftrag:'; if (this._nmauftrag) { sRet = sRet + this._nmauftrag.EO_ID; }
        return sRet + ', \r\n';
    }
    logHead(){
        return this.constructor.name + '.';
    }

}
