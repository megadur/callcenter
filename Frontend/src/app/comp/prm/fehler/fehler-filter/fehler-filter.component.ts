import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { XError } from '../../../../model/x_error';
import { Fehlerbild } from '../../../../model/fehlerbild';
import { FehlerbildService } from '../../../../service/fehlerbild.service';
import { XErrorService } from '../../../../service/xerror.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-fehler-filter',
    templateUrl: './fehler-filter.component.html',
    styleUrls: ['./fehler-filter.component.css']
})
export class FehlerFilterComponent implements OnInit {
    @Input() xErrorIn: XError;
    @Input() fehlerbildIn: Fehlerbild;
    @Output() fehlerbildListOut = new EventEmitter<Fehlerbild[]>();
    @Output() xerrorListOut = new EventEmitter<XError[]>();
    @Output() fehlerbildOut = new EventEmitter<Fehlerbild>();

    // fehlerbild: Fehlerbild;
    fehlerbildList: Fehlerbild[];
    xerrorList: XError[];
    // inp: string;
    // counter: number;
    submitted = false;
    dbgLevel=1;

    // constructor() { }
    // /*
    constructor(private xerrorService: XErrorService, private fbService: FehlerbildService) {
        // this.counter = 0;
        console.log('FehlerFilterComponent()');
    }// */

    ngOnInit() {
        console.log('FehlerFilterComponent:  ngOnInit()');
        this.fehlerbildIn = new Fehlerbild();
        this.fehlerbildIn.FLT_SYS = 'IDMA';
        this.xErrorIn = new XError();
        /*{
            NAME: "",
            ID: "",
            EO_ID: "",
            SO_ID: "",
            CODE_INT: "",
            CODE_EXT: "",
            SYS: "",
            TASK: "",
            TEXT_INT: "",
            TEXT_EXT: "",
            INC_TEXT_SHORT: "",
            INC_TEXT_LONG: "",
            TS_CREATED: "",
            TS_CLOSED: "",
            HANDLING: "",
            LAST_UPD: "",
        };*/
        this.dbgLevel=myGlobals.dbgLevel;

    }
    findFehlerBild() {
        this.submitted = true;
        console.log('FehlerFilterComponent:  findFehlerBild()');
        //this.fbService.getFehlerbildListByFilter(this.fehlerbildIn).subscribe(x => this.emitList(x));
        this.xerrorService
            .getXErrorListByFehlerbild(this.fehlerbildIn, null, 0, null)
            .subscribe(x => this.emitXEList(x));
    }
    findFehlerInst() {
        console.log('FehlerFilterComponent:  findFehlerInst()');
        this.xerrorService
            .getXErrorListByFehlerbild(this.fehlerbildIn, null, 0, null)
            .subscribe(x => this.emitXEList(x));

    }
    emitXEList(x): void {
        this.xerrorList = x;
        this.xerrorListOut.emit(x);
    }
    emitFBList(x): void {
        this.fehlerbildList = x;
        this.fehlerbildListOut.emit(this.fehlerbildList);
    }
    newForm() {
        console.log('FehlerFilterComponent: newForm() ');
        this.fehlerbildIn = new Fehlerbild();
    }
    pad(num:string, size:number): string {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
      }
    edtitFB(){
        console.log('FehlerFilterComponent: edtitFB() ');
        // copie xerror nach FB und emit FB nach FB def
        let fehlerbild = new Fehlerbild();
        fehlerbild.BILDNUMMER='04' + this.pad(this.xErrorIn.CODE_INT, 5) + this.pad('1', 9)
        fehlerbild.FLT_SYS = 'IDMA';
        fehlerbild.FLT_CODE_INT=this.xErrorIn.CODE_INT;
        fehlerbild.PRIO='999';
        this.fehlerbildOut.emit(fehlerbild);
    }
    xgetXError(): void {
        console.log('FehlerFilterComponent: getXError() in ');
        /*
        if (this.inp) {
            this.xerrorService
                .getXErrorListById(this.inp)
                .subscribe((a) => {
                    this.xError = a[0];
                    this.counter++; // application state changed
                });
        }
        */
        //      .subscribe(a => this.account = a);
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-fehlerinst-list';
        sRet = sRet + '\r\n xErrorIn:'; if (this.xErrorIn) { sRet = sRet + this.xErrorIn.ID; }
        sRet = sRet + '\r\n xerrorList:'; if (this.xerrorList) { sRet = sRet + this.xerrorList.length; }
        sRet = sRet + '\r\n fehlerbildList:'; if (this.fehlerbildList) { sRet = sRet + this.fehlerbildList.length; }
        sRet = sRet + '\r\n fehlerbildIn:'; if (this.fehlerbildIn) { sRet = sRet + this.fehlerbildIn; }
      // sRet = sRet + '\r\n pagedItems:'; if (this.pagedItems) { sRet = sRet + this.pagedItems.length; }
        // sRet = sRet + '\r\n pagesize:'; if (this.pagesize) { sRet = sRet + this.pagesize; }
                if (this.fehlerbildIn) { sRet = sRet + 'fehlerbildIn:' + JSON.stringify(this.fehlerbildIn) + ' \r\n'; }

        return sRet + ', \r\n';
    }


}
