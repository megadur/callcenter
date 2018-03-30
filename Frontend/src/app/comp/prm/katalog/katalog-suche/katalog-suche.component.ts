import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { PrdEm } from '../../../../model/prd_em';
import { PrdFlt } from '../../../../model/prd_flt';

import { KatalogService } from '../../../../service/katalog.service';

import * as myGlobals from '../../../../globals'; //<==== this one
import { isNumber } from 'util';

@Component({
  selector: 'app-katalog-suche',
  templateUrl: './katalog-suche.component.html',
  styleUrls: ['./katalog-suche.component.css']
})
export class KatalogSucheComponent implements OnInit {

    private prdFlt: PrdFlt;
    @Output() prdemListOut = new EventEmitter<PrdEm[]>();
    dbgLevel: number;
    formData = {
        VALUE: '',
        //EM_NAME: '',
        //MAX_ROWS:null;
        //MAX_VAL:null;    
    };
    selectedValue: any;
    selectedItem: string;
    constructor(private kService: KatalogService) { }

    initFormdata() {
        this.formData.VALUE = '88219286';
        this.formData.VALUE = '8821928';
    }
    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.prdFlt= new PrdFlt();
        this.initFormdata();
        this.onSubmit();
    }
    onSubmit() {
        console.log(this.logHead() +'onSubmit');
        this.prdFlt= new PrdFlt();
        let inp=this.formData.VALUE;
        //if(this.formData.VALUE.length==8){
            if(this.isNumber(inp)){
                this.prdFlt.EM_MATNO=inp+'*';
            }
        //}
        if(this.prdFlt.EM_MATNO==''){
            this.prdFlt.EM_NAME=this.formData.VALUE;
        }
        this.getprdemList_ByFlt(this.prdFlt);
    }
     isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
    //region Input
    @Input() set prdFltIn(x: PrdFlt) {

        if (x) {
            this.prdFlt = x;
            this.prdFlt.EM_MATNO = x.EM_MATNO;
            this.prdFlt.EM_NAME = x.EM_NAME;

            this.getprdemList_ByFlt(this.prdFlt);
            if (x.EM_MATNO) this.formData.VALUE = x.EM_MATNO;
            if (x.EM_NAME) this.formData.VALUE = x.EM_NAME;
        }
    }
    get prdFltIn() {
        return this.prdFlt;
    }
    //endregion

    getprdemList_ByFlt(x: PrdFlt) {
        console.log(this.logHead() +'getprdemList_ByFlt()' + x.EM_NAME);
        this.kService
        .getPrdEmListByFilter(x)
            .subscribe(x => this.setprdemList(x));
    }
    setprdemList(x: PrdEm[]) {
        if (x) {
            console.log(this.logHead() +'setprdemList: len ' + x.length);
            this.prdemListOut.emit(x);
        }
    }
    logHead(){
        return this.constructor.name + ': ';
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-katalog-suche';
        sRet = sRet + '\r\n prdemListOut:'; if (this.prdemListOut.map) { sRet = sRet + this.prdemListOut.map.length; }
        sRet = sRet + '\r\n prdFlt:'; if (this.prdFlt) { sRet = sRet + JSON.stringify(this.prdFlt); }

        return sRet + ', \r\n';
    }

}
