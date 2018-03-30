import { OnInit, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

import { Kampagne } from '../../../../model/kampagne';
import { KampagneService } from '../../../../service/kampagne.service';

import { PagerService } from '../../../../service/pager.service';
import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
  selector: 'app-kampagne-liste',
  templateUrl: './kampagne-liste.component.html',
  styleUrls: ['./kampagne-liste.component.css']
})
export class KampagneListeComponent implements OnInit {

    private _kampagneListIn: Kampagne[];
    private _kampagne: Kampagne;
    @Output() kampagneOut = new EventEmitter<Kampagne>();

    // array of all items to be paged
    // private allItems: any[];
    pagesize = 15;
    // pager object
    pager: any = {};
    // items: Kampagne[];
    // paged items
    pagedItems: any[];
    dbgLevel = 1;

    constructor(private pagerService: PagerService,private kService: KampagneService) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
    }

    @Input() set kampagneListIn(x: Kampagne[]) {
        if (x) {
            console.log(this.logHead() +'set kampagneListIn len ' + x.length);
            this._kampagneListIn = x;
            this.setKampagne(x[0]);
            // initialize to page 1
            this.setPage(1);
        }
    }
    get kampagneListIn() {
        console.log(this.logHead() +'get kampagneListIn');
        return this._kampagneListIn;
    }
    kampagneList() {
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
        if (this._kampagneListIn) {
            // get pager object from service
            this.pager = this.pagerService.getPager(this._kampagneListIn.length, page, this.pagesize);

            // get current page of items
            this.pagedItems = this._kampagneListIn.slice(this.pager.startIndex, this.pager.endIndex + 1);
        }
    }

    onSelect(x: Kampagne): void {
        console.log(this.logHead() +'onSelect() ' + x.CAMPAIGN_ID);
        this.setKampagne(x);
        /*
        let k=new Kampagne();
        k.CAMPAIGN_ID='bitte warten...';
        this.setKampagne(k);
        this.getkampagne_ById(x.CAMPAIGN_ID);
        */
    }
    onEditStopp(x: Kampagne){
        console.log(this.logHead()+' onEditStopp: ' + x.CAMPAIGN_ID);
        //this.setKampagne(x);
        // this.getkampagne_ById(x.CAMPAIGN_ID);
        
    }
    onEditEinzel(){
        
    }
    onEditListe(){
        
    }
    onEditError(){
        
    }

    onEditStart(){
        
    }
    onEditModify(){
        
    }

    setKampagne(x: Kampagne) {
        console.log(this.logHead() +'setKampagne(): ' + x.CAMPAIGN_ID);
        this._kampagne=x;
        this.kampagneOut.emit(x);
    }
    getkampagne_ById(x: string) {
        console.log(this.logHead() +'getkampagne_ById(): ' + x);
        this.kService
        .getKampagneById(x)
            .subscribe(x => this.setKampagne(x));
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-kampagne-list';
        sRet = sRet + '\r\n _kampagneListIn:'; if (this._kampagneListIn) { sRet = sRet + this._kampagneListIn.length; }
        sRet = sRet + '\r\n _kampagne:'; if (this._kampagne) { sRet = sRet + this._kampagne.CAMPAIGN_ID; }
        return sRet + ', \r\n';
    }
    logHead(){
        return this.constructor.name + '.';
    }


}
