import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Fehlerbild } from '../../../../model/fehlerbild';
import { FehlerbildService } from '../../../../service/fehlerbild.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-fehlerbild-def',
    templateUrl: './fehlerbild-def.component.html',
    styleUrls: ['./fehlerbild-def.component.css']
})
export class FehlerbildDefComponent implements OnInit {
    @Input() fehlerbildIn: Fehlerbild;
    @Output() fehlerbildOut = new EventEmitter<Fehlerbild[]>();
    dbgLevel=1;

    fbid:String;
    constructor(private fbService: FehlerbildService) {
        console.log('FehlerbildDefComponent()');
    }

    ngOnInit() {
        this.fehlerbildIn = new Fehlerbild();
        this.fehlerbildIn.ERSTELLT_TS = new Date();
        this.dbgLevel=myGlobals.dbgLevel;

    }
    initFB(){
        this.fehlerbildIn.BILDNUMMER = '04' + new Date().toLocaleString();
        this.fehlerbildIn.FLT_SO_TYPE_ID = 'FLT_SO_TYPE_ID';
        this.fehlerbildIn.FLT_STATUS = 'FLT_STATUS';
        this.fehlerbildIn.FLT_SPECIAL_ORDER_FLAG_ID = 'FLT_SPECIAL_ORDER_FLAG_ID';
        this.fehlerbildIn.FLT_INC_TEXT_SHORT = 'FLT_INC_TEXT_SHORT';
        this.fehlerbildIn.FLT_INC_TEXT_LONG = 'FLT_INC_TEXT_LONG';
        this.fehlerbildIn.FLT_CODE_INT = 'FLT_CODE_INT';
        this.fehlerbildIn.FLT_TEXT_INT = 'FLT_TEXT_INT';
        this.fehlerbildIn.FLT_CODE_EXT = 'FLT_CODE_EXT';
        this.fehlerbildIn.FLT_TEXT_EXT = 'FLT_TEXT_EXT';
        this.fehlerbildIn.FLT_SYS = 'FLT_SYS';
        this.fehlerbildIn.FLT_TASK = 'FLT_TASK';
        this.fehlerbildIn.FLT_HANDLING = 'FLT_HANDLING';
        this.fehlerbildIn.AUSLOESER = 'AUSLOESER';
        this.fehlerbildIn.BESCHREIBUNG = 'BESCHREIBUNG';
        this.fehlerbildIn.LOESUNG = 'Allgemein';
        this.fehlerbildIn.PRIO = '999';
        this.fehlerbildIn.STATUS = 'inaktiv';
        this.fehlerbildIn.SYMPTOM = 'SYMPTOM';
        this.fehlerbildIn.ERSTELLT_TS = new Date();
        this.fehlerbildIn.GEAENDERT_TS = new Date();

    }
    emitFB(x): void {
        this.fehlerbildOut.emit(x);
    }

    onSubmit() {
        console.log('FehlerbildDefComponent:onSubmit()');
        this.fbService.addFehlerbild(this.fehlerbildIn).subscribe(x => this.emitFB(x));
    }
    onDelete() {
        console.log('FehlerbildDefComponent:onDelete()');
         
        if ( !this.fehlerbildIn.ID) 
        this.fbid="kein Fehlerbild ausgewählt!";
        else
        this.fbService.delFehlerbild(this.fehlerbildIn.ID.toString()).subscribe(x => this.fbid=x);
    }
}
