import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { XError } from '../../../../model/x_error';
import { XErrorFlt } from '../../../../model/x_error_flt';

import { XErrorService } from '../../../../service/xerror.service';

import * as myGlobals from '../../../../globals'; //<==== this one
@Component({
    selector: 'app-error-suche',
    templateUrl: './error-suche.component.html',
    styleUrls: ['./error-suche.component.css']
})
export class ErrorSucheComponent implements OnInit {
    private xerrorFlt: XErrorFlt;
    @Output() xerrorListOut = new EventEmitter<XError[]>();
    dbgLevel: number;
    formData = {
        EO_ID: '',
        STATUS: '',
        CODE_INT: '',
        SYSTEM: '',
    };
    selectedValue: any;
    selectedItem: string;
    constructor(private aService: XErrorService) { }

    initFormdata() {
        this.formData.EO_ID = 'XDM000000186315';
    }
    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.xerrorFlt= new XErrorFlt();
        this.initFormdata();
    }
    onSubmit() {
        console.log(this.logHead() +'onSubmit');
        this.xerrorFlt= new XErrorFlt();
        this.xerrorFlt.EO_ID=this.formData.EO_ID;
        this.xerrorFlt.CODE_INT=this.formData.CODE_INT;
        this.xerrorFlt.STATUS=this.formData.STATUS;
        this.xerrorFlt.SYSTEM=this.formData.SYSTEM;
        this.getXErrorList_ByFlt(this.xerrorFlt);
    }

    //region Input
    @Input() set xerrorFltIn(x: XErrorFlt) {

        if (x) {
            this.xerrorFlt = x;
            this.xerrorFlt.EO_ID = x.EO_ID;

            this.getXErrorList_ByFlt(this.xerrorFlt);
            if (x.EO_ID) this.formData.EO_ID = x.EO_ID;
        }
    }
    get xerrorFltIn() {
        return this.xerrorFlt;
    }
    //endregion

    getXErrorList_ByFlt(x: XErrorFlt) {
        console.log(this.logHead() +'getxerrorExtList_ByFlt()' + x.EO_ID);
        this.aService
            .getXErrorListByFilter(x)
            .subscribe(x => this.setXErrorList(x));
    }
    setXErrorList(x: XError[]) {
        if (x) {
            console.log(this.logHead() +'setXAuftragList:' + x.length);
            this.xerrorListOut.emit(x);
        }
    }
    logHead(){
        return this.constructor.name + ': ';
    }

}
