import { OnInit, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';


import { XAuftragExt } from '../../../../model/x_auftrag_ext';
import { XAuftragService } from '../../../../service/xauftrag.service';


import { PagerService } from '../../../../service/pager.service';
import * as myGlobals from '../../../../globals'; //<==== this one


@Component({
  selector: 'app-nutzer-liste',
  templateUrl: './nutzer-liste.component.html',
  styleUrls: ['./nutzer-liste.component.css']
})
export class NutzerListeComponent implements OnInit {

    private _xauftragExtListIn: XAuftragExt[];
    private _xauftragExt: XAuftragExt;
    @Output() xauftragExtOut = new EventEmitter<XAuftragExt>();

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

    @Input() set xauftragExtListIn(x: XAuftragExt[]) {
        if (x) {
            console.log(this.logHead() +'set xauftragExtListIn len ' + x.length);
            this._xauftragExtListIn = x;
            this.setXAuftragExt(x[0]);
            // initialize to page 1
            this.setPage(1);
        }
    }
    get xauftragExtListIn() {
        console.log(this.logHead() +'get xauftragListIn');
        return this._xauftragExtListIn;
    }
    xauftragList() {
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
        if (this._xauftragExtListIn) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this._xauftragExtListIn.length, page, this.pagesize);

            // get current page of items
            this.pagedItems = this._xauftragExtListIn.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }

    onSelect(x: XAuftragExt): void {
        console.log(this.logHead() +'onSelect() ' + x.EO_ID);
        this.setXAuftragExt(x);
        /*
        let k=new XAuftrag();
        k.CAMPAIGN_ID='bitte warten...';
        this.setXAuftrag(k);
        this.getxauftrag_ById(x.CAMPAIGN_ID);
        */
    }
    onEditStopp(x: XAuftragExt){
        console.log(this.logHead()+' onEditStopp: ' + x.EO_ID);
        //this.setXAuftrag(x);
        // this.getxauftrag_ById(x.CAMPAIGN_ID);
        
    }

    setXAuftragExt(x: XAuftragExt) {
        console.log(this.logHead() +'setXAuftrag(): ' + x.EO_ID);
        this._xauftragExt=x;
        this.xauftragExtOut.emit(x);
    }
    /*
    getxauftrag_ById(soid: string) {
        console.log(this.logHead() +'getxauftrag_ById(): ' + soid);
        this.kService.getXAuftrag_BySoid(soid)
            .subscribe(x => this.setXAuftrag(x));
    }
*/
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-nutzer-liste';
        sRet = sRet + '\r\n _xauftragListIn:'; if (this._xauftragExtListIn) { sRet = sRet + this._xauftragExtListIn.length; }
        sRet = sRet + '\r\n pagedItems:'; if (this.pagedItems) { sRet = sRet + this.pagedItems.length; }
        sRet = sRet + '\r\n _xauftrag:'; if (this._xauftragExt) { sRet = sRet + this._xauftragExt.EO_ID; }
        sRet = sRet + '\r\n _xauftrag:'; if (this._xauftragExt) { sRet = sRet + + JSON.stringify(this._xauftragExt); }
        return sRet + ', \r\n';
    }
    logHead(){
        return this.constructor.name + '.';
    }

}
