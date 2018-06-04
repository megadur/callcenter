import { Component, OnInit } from '@angular/core';

import { Account } from '../../../model/account';
import { Bestand } from '../../../model/bestand';

import * as myGlobals from '../../../globals'; //<==== this one

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    accountList: Account[];
    account: Account;
    bestand: Bestand
    constructor() { }
    dbgLevel: number;
    dbMode: string;
    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.dbMode = myGlobals.getMode();
    }

    hasAccount(x: Account) {
        if (x) {
            console.log('AccountComponent:  hasAccount()', x.GUID);
        }
        this.account = x;
    }
    hasAccountList(xl: Account[]) {
        console.log('AccountComponent:  hasAccountList()' + xl.length);
        this.accountList = xl;
    }
    hasBestand(x: Bestand) {
        if (x) {
            console.log('AccountComponent:  hasBestand() ', x.STOCK_ID);
        }
        this.bestand = x;
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-account';

        sRet = sRet + '\r\n accountList:'; if (this.accountList) { sRet = sRet + this.accountList.length; }
        sRet = sRet + '\r\n account:'; if (this.account) { sRet = sRet + this.account.GUID; }
        sRet = sRet + '\r\n bestand:'; if (this.bestand) { sRet = sRet + this.bestand.SO_ID; }
        
        return sRet + ', \r\n';
    }

}
