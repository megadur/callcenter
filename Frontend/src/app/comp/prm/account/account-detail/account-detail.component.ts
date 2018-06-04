import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Account } from '../../../../model/account';
import { XBestand } from '../../../../model/x-bestand';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
    @Input() accountIn: Account;

    constructor() { }
    dbgLevel: number;
    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.accountIn = new Account();
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-account-detail';
        sRet = sRet + '\r\n accountIn:'; if (this.accountIn) { sRet = sRet + this.accountIn.GUID; }

        return sRet + ', \r\n';
    }


}
