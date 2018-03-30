import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { XError } from '../../../model/x_error';
import { Fehlerbild } from '../../../model/fehlerbild';

import { XErrorService } from '../../../service/xerror.service';
import { FehlerbildService } from '../../../service/fehlerbild.service';

import * as myGlobals from '../../../globals'; //<==== this one

@Component({
    selector: 'app-fehler',
    templateUrl: './fehler.component.html',
    styleUrls: ['./fehler.component.css']
})
export class FehlerComponent implements OnInit {
    @Output() outXEList = new EventEmitter<XError[]>();
    @Output() outFbList = new EventEmitter<Fehlerbild[]>();
    xerrorList: XError[];
    xerror: XError;
    fehlerbildList: Fehlerbild[];
    fehlerbild: Fehlerbild;
    formData = {
        EO_ID: '',
        STATUS: '',
        CODE_INT: '',
        SYSTEM: 'IDMA',
    };
    dbgLevel: number;
    constructor(private xerrorService: XErrorService, private fehlerbildService: FehlerbildService) {
        console.log('FehlerComponent:  ngOnInit()');

    }// */
    // constructor() { console.log('FehlerComponent:  ngOnInit()'); }
    emitXEList(x): void {
        // console.log('FehlerComponent:  emitXEList()'+ x.length);
        this.xerrorList = x;
        this.outXEList.emit(this.xerrorList);
    }
    emitFbList(x): void {
        // console.log('FehlerComponent:  emitFbList()' + x.length);
        this.fehlerbildList = x;
        this.outFbList.emit(this.fehlerbildList);
    }

    ngOnInit() {
        console.log('FehlerComponent:  ngOnInit()');
        this.xerrorService.getXErrorListByFilter(this.formData)
            .subscribe(x => this.emitXEList(x));
        this.fehlerbildService.getFehlerbildList()
            .subscribe(x => this.emitFbList(x));
            this.dbgLevel=myGlobals.dbgLevel;

    }


    hasFehlerbildList(xl: Fehlerbild[]) {
        console.log('FehlerComponent:  hasFehlerbildList()');
        this.fehlerbildList = xl;
    }
    hasXErrorList(xl: XError[]) {
        console.log('FehlerComponent:  hasXErrorList()');
        this.xerrorList = xl;
    }
    hasXError(x: XError) {
        console.log('FehlerComponent:  hasXError()');
        this.xerror = x;
    }
    hasFehlerbild(x: Fehlerbild) {
        console.log('FehlerComponent:  hasFehlerbild()' + x);
        this.fehlerbild = x;
    }

    getFBCount() {
        if (this.fehlerbildList)
            return this.fehlerbildList.length;
    }
    getFICount() {
        if (this.xerrorList)
            return this.xerrorList.length;
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-fehler';

        //   if (this.outXEList) { sRet = sRet + 'outXEList:' + this.outXEList + ' \r\n'; }else { sRet = sRet + 'outXEList:  \r\n'; }
        if (this.xerrorList) { sRet = sRet + 'xerrorList:' + this.xerrorList.length + ' \r\n'; } else { sRet = sRet + 'xerrorList:  \r\n'; }
        if (this.xerror) { sRet = sRet + 'xerror:' + this.xerror.ID + ' \r\n'; } else { sRet = sRet + 'xerror:  \r\n'; }
        // if (this.outFbList) { sRet = sRet + 'outFbList:' + this.outFbList + ' \r\n'; }else { sRet = sRet + 'outFbList:  \r\n'; }
        if (this.fehlerbildList) { sRet = sRet + 'fehlerbildList:' + this.fehlerbildList.length + ' \r\n'; } else { sRet = sRet + 'fehlerbildList:  \r\n'; }
        if (this.fehlerbild) { sRet = sRet + 'fehlerbild:' + this.fehlerbild.ID + '  \r\n'; } else { sRet = sRet + 'fehlerbild:  \r\n'; }
        // if (this.fehlerbild) { sRet = sRet + 'fehlerbild:' + JSON.stringify(this.fehlerbild) + ',  \r\n'; }

        return sRet + ', \r\n';
    }

}
