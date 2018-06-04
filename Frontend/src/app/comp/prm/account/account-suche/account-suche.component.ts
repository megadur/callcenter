import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Account } from '../../../../model/account';
import { XAccountService } from '../../../../service/xaccount.service';
import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-account-suche',
    templateUrl: './account-suche.component.html',
    styleUrls: ['./account-suche.component.css']
})
export class AccountSucheComponent implements OnInit {
    @Output() accountListOut = new EventEmitter<Account[]>();
    @Output() accountOut = new EventEmitter<Account>();

    accountList: Account[];
    account: Account;
    dbgLevel: number;

    formData = {
        ID: '100049012081112430100001',
    };

    constructor(private accountService: XAccountService) { }

    ngOnInit() {
        console.log('AccountSucheComponent.ngOnInit()');
        this.dbgLevel = myGlobals.dbgLevel;
        this.onSubmit();
    }
    onSubmit() {
        console.log('AccountSucheComponent.onSubmit()');
        this.getAccountByGuid(this.formData.ID);
    }
    getAccountByGuid(guid): void {
        console.log('AccountSucheComponent.getAccountByGuid(' + guid + ')');
        this.accountService.getAccountByGuid(guid)
            .subscribe(x => {
                 if(x) this.setAccount(x[0]);
                 });
    }
    findAccountListByKdnr(kdnr): void {
        console.log('AccountSucheComponent.findAccountListByKdnr(' + kdnr + ')');
        let a = new Account();
        a.KDNR = kdnr;
        this.accountService.findAccountList(a)
            .subscribe(x => this.setAccountList(x));
    }
    getAccountList(): void {
        console.log('AccountSucheComponent.getAccountList()');
        this.accountService.getAccountList()
            .subscribe(x => this.setAccountList(x));
    }

    setAccountList(x: Account[]): void {
        console.log('AccountSucheComponent.setAccountList[' + x.length + ']');
        this.accountList = x;
        this.accountListOut.emit(x);
    }

    setAccount(x: Account): void {
        console.log('AccountSucheComponent.setAccount(' + x.GUID + ')');
        this.account = x;
        this.findAccountListByKdnr(x.KDNR)
        this.accountOut.emit(x);
    }


    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-account-suche';
        sRet = sRet + '\r\n account:'; if (this.account) { sRet = sRet + this.account.GUID; }
        sRet = sRet + '\r\n accountList:'; if (this.accountList) { sRet = sRet + this.accountList.length; }

        return sRet + ', \r\n';
    }

}
