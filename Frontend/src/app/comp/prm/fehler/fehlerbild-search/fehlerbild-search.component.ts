import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { Fehlerbild } from '../../../../model/fehlerbild';
import { FehlerbildService } from '../../../../service/fehlerbild.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-fehlerbild-search',
    templateUrl: './fehlerbild-search.component.html',
    styleUrls: ['./fehlerbild-search.component.css']
})
export class FehlerbildSearchComponent implements OnInit {
    @Input() fehlerbildListIn: Fehlerbild[];
    @Output() fehlerbildListOut = new EventEmitter<Fehlerbild[]>();

    fehlerbild: Fehlerbild;
    submitted = false;
    formData = {
        BILDNUMMER: '',
        AUSLOESER: '',
        BESCHREIBUNG: '',
        LOESUNG: '',
        PRIO: '',
        STATUS: '',
        SYMPTOM: '',
        ERSTELLT_TS: '',
        GEAENDERT_TS: '',
    };

    dbgLevel = 1;

    constructor(private fbService: FehlerbildService) {
        console.log('FehlerbildSearchComponent:  ()');

    }// */constructor() { }

    ngOnInit() {
        console.log('FehlerbildSearchComponent:  ngOnInit()');
        this.dbgLevel = myGlobals.dbgLevel;

    }
    emitList(x): void {
        this.fehlerbildListIn = x;
        this.fehlerbildListOut.emit(this.fehlerbildListIn);
    }
    onSubmit() {
        this.submitted = true;
        console.log('FehlerbildSearchComponent:  onSubmit()');
        this.fbService.getFehlerbildListByFilter(this.formData)
            .subscribe(x => this.emitList(x));

    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = '';
        if (this.formData) { sRet = sRet + 'formData:' + JSON.stringify(this.formData) + ',  \r\n'; }
        if (this.fehlerbildListIn) { sRet = sRet + 'fehlerbildList:' + this.fehlerbildListIn.length + ', \r\n'; }
        if (this.fehlerbild) { sRet = sRet + 'fehlerbild:' + this.fehlerbild.ID + ',  \r\n'; }

        return sRet + ', \r\n';
    }


}
