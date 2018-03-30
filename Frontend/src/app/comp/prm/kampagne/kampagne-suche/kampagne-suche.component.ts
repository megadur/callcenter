import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Kampagne } from '../../../../model/kampagne';
import { PrdFlt } from '../../../../model/prd_flt';

import { KampagneService } from '../../../../service/kampagne.service';

import * as myGlobals from '../../../../globals'; //<==== this one
import { isNumber } from 'util';


@Component({
    selector: 'app-kampagne-suche',
    templateUrl: './kampagne-suche.component.html',
    styleUrls: ['./kampagne-suche.component.css']
})
export class KampagneSucheComponent implements OnInit {

    //private kampagneFlt: PrdFlt;
    @Output() kampagneListOut = new EventEmitter<Kampagne[]>();
    dbgLevel: number;
    formData = {
        VALUE: '',
        //EM_NAME: '',
        //MAX_ROWS:null;
        //MAX_VAL:null;    
    };
    selectedValue: any;
    selectedItem: string;
    constructor(private kService: KampagneService) { }

    initFormdata() {
        this.formData.VALUE = 'Alle';
    }
    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        // this.prdFlt= new PrdFlt();
        this.initFormdata();
        this.onSubmit();
    }
    onSubmit() {
        console.log(this.logHead() + 'onSubmit');
        //this.prdFlt= new PrdFlt();
        let inp = this.formData.VALUE;
        this.getkampagneList_ByStatus(inp);
    }
    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    getStatus() {
        return ['Alle', 'abgebrochen','aktiv','erstellt','abgeschlossen', 'ausgesetzt'];
    }
    getkampagneList_ByStatus(status: string) {
        console.log(this.logHead() + 'getkampagneList_ByFlt()' + status);
        let fd = { STATUS: status };
        if(fd.STATUS=='Alle'){fd.STATUS=''};
        this.kService
            .getKampagneListByFilter(fd)
            .subscribe(x => this.setkampagneList(x));
    }
    setkampagneList(x: Kampagne[]) {
        if (x) {
            console.log(this.logHead() + 'setkampagneList: len ' + x.length);
            this.kampagneListOut.emit(x);
        }
    }
    logHead() {
        return this.constructor.name + ': ';
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-katalog-suche';
        sRet = sRet + '\r\n kampagneListOut:'; if (this.kampagneListOut.map) { sRet = sRet + this.kampagneListOut.map.length; }
        //sRet = sRet + '\r\n prdFlt:'; if (this.prdFlt) { sRet = sRet + JSON.stringify(this.prdFlt); }

        return sRet + ', \r\n';
    }

}
