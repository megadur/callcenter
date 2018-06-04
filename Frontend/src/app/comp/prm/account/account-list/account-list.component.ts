import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Account } from '../../../../model/account';

import { Bestand } from '../../../../model/bestand';
import { XBestandService } from '../../../../service/xbestand.service';

import { XAuftrag } from '../../../../model/x_auftrag';
import { XAuftragService } from '../../../../service/xauftrag.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-account-list',
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
    private _accountListIn: Account[];
    private account: Account;
    @Output() accountOut = new EventEmitter<Account>();
  
    bestandList: Bestand[];
    bestand: Bestand;
    @Output() bestandOut = new EventEmitter<Bestand>();

    private xauftragList: XAuftrag[];
    xauftrag: XAuftrag;
    @Output() xauftragOut = new EventEmitter<XAuftrag>();

    dbgLevel: number = 1;

    constructor(private bService: XBestandService, private aService: XAuftragService) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.xauftrag = new XAuftrag();
        this.bestand = new Bestand();
        this.account = new Account();
    }
    getStyle(s) {
        if (s == "deaktiviert")
            return { 'color': 'red' };
        if (s == "aktiviert")
            return { 'color': 'blue' };
        if (s == "bestellt")
            return { 'color': 'green' };
    }

    @Input() set accountListIn(x: Account[]) {
        this.setAccountList(x);
    }
    get accountListIn() {
        return this._accountListIn;
    }

    @Input() set accountIn(a: Account) {
        this.setAccount(a);
    }
    get accountIn() {
        return this.account;
    }

    onSelect(a: Account): void {
        this.setAccount(a);
        this.accountOut.emit(this.account);
    }

    setAccount(a: Account): void {
        this.account = a;
        if (a) {
            this.getBestandList_ByGuid(a.GUID);
        }
    }
    setAccountList(a: Account[]): void {
        this._accountListIn = a;
        if (this._accountListIn) {
           // this.setAccount(a[0]);
        }
    }

    // region bestand
    getBestandList_ByGuid(guid: string) {
        console.log('AccountListComponent.getBestandList_ByGuid()' + guid);
        this.bService
            .getBestandList_ByParam(guid, '', '', '')
            .subscribe(x => this.setBestandList(x));

    }
    setBestandList(x: Bestand[]): void {
        if (x) {
            console.log('AccountListComponent.setBestandList[] ' + x.length);
            this.bestandList = x;
            let xbestand = x.filter(b => b.STATUS === 'aktiviert')[0];
            this.setBestand(xbestand);
        }
    }
    setBestand(x:Bestand): void {
        console.log('AccountListComponent.setBestand()' + x.STOCK_ID);
        this.bestand = x;
        this.bestandOut.emit(x);
        this.getXAuftragList_BySoid(x.SO_ID);
    }
    // endregion

    getXAuftragList_BySoid(x: string) {
        console.log('AccountListComponent.getXAuftragList_BySoid()' + x);
        this.aService
            .getXAuftragList_ByParam('', '', x)
            .subscribe(x => this.setXAuftragList(x));
    }
    setXAuftragList(x: XAuftrag[]) {
        if (x) {
            console.log('AccountListComponent.setXAuftragList: ' + x.length);
            this.xauftragList = x;
            this.setXAuftrag( x[0]);
        }
    }
    setXAuftrag(x: XAuftrag) {
        if (x) {
            console.log('AccountListComponent.setXAuftrag: ' + x.EO_ID);
            this.xauftrag = x;
            this.xauftragOut.emit(x);
        }
    }

    setNewGUID(guid: String) {
        this.account = this.accountListIn.filter(a => a.GUID == guid)[0];
        console.log('AccountListComponent.setNewGUID() ' + guid);
        this.accountOut.emit(this.account);
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-account-list';
        sRet = sRet + '\r\n accountListIn:'; if (this.accountListIn) { sRet = sRet + this.accountListIn.length; }
        sRet = sRet + '\r\n account:'; if (this.account) { sRet = sRet + this.account.GUID; }
        sRet = sRet + '\r\n bestandListIn:'; if (this.bestandList) { sRet = sRet + this.bestandList.length; }
        sRet = sRet + '\r\n bestand:'; if (this.bestand) { sRet = sRet + this.bestand.SO_ID; }
        sRet = sRet + '\r\n xauftragListIn:'; if (this.xauftragList) { sRet = sRet + this.xauftragList.length; }
        sRet = sRet + '\r\n xauftrag:'; if (this.xauftrag) { sRet = sRet + this.xauftrag.EO_ID; }
        return sRet + ', \r\n';
    }

}
