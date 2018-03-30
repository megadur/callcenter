import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Kampagne } from '../../../../model/kampagne';
import { KampagneService } from '../../../../service/kampagne.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
  selector: 'app-kampagne-edit',
  templateUrl: './kampagne-edit.component.html',
  styleUrls: ['./kampagne-edit.component.css']
})
export class KampagneEditComponent implements OnInit {

    @Input() kampagneIn: Kampagne;
    dbgLevel: number;
    formData = {
        VALUE: 'V1',
        //EM_NAME: '',
        //MAX_ROWS:null;
        //MAX_VAL:null;    
    };
    constructor(private aService: KampagneService) {

    }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.kampagneIn = new Kampagne();
    }

    getTitle(){
        if(this.kampagneIn){
            return this.kampagneIn.CAMPAIGN_ID;
        }
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-kampagne-edit';
        sRet = sRet + '\r\n kampagne:'; if (this.kampagneIn) { sRet = sRet + this.kampagneIn.CAMPAIGN_ID; }

        return sRet + ', \r\n';
    }
}
