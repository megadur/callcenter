import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { XAuftragExt } from '../../../../model/x_auftrag_ext';
import { XMessage } from '../../../../model/x_message';
import { XMessageService } from '../../../../service/xmessage.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-auftrag-msg-list',
    templateUrl: './auftrag-msg-list.component.html',
    styleUrls: ['./auftrag-msg-list.component.css']
})
export class AuftragMsgListComponent implements OnInit {
    dbgLevel: number;
    xauftragExt: XAuftragExt;
    xmessage: XMessage;
    xmessageList: XMessage[];

    constructor(private aService: XMessageService) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
    }

    @Input() set xauftragExtIn(x: XAuftragExt) {
        if (x) {
            this.log('set xauftragExt: ' + x.EO_ID);
            this.setXAuftrag(x);
        }
    }
    get xauftragExtIn() {
        this.log('get xauftragExtIn');
        return this.xauftragExtIn;
    }
    
    setXAuftrag(x: XAuftragExt){
        this.xauftragExt = x;
        this.getXMessageList_ByEoid(x.EO_ID );
    }

    getXMessageList_ByEoid(x: string) {
        this.log('getXMessageList_ByEoid for ' + x);
        if(x){
            this.aService
            .getXMessageListByEoId(x)
            .subscribe(x => {if(x)this.setXMessageList(x);});
        }
    }
    setXMessageList(x:XMessage[]){
        if (x) {
            this.log('emit setXMessageList:' + x.length);
            this.xmessageList=x;
        }
    }
    
    onSelect(m: XMessage): void {
        this.log('onSelect()' + m.SO_ID);
        this.setXMessage(m);
        //this.xerrorOut.emit(this.xauftragExt);
        //this.getXMessageList_BySoid(m.SO_ID);
    }

    setXMessage(m: XMessage): void {
        this.log('setXMessage()' + m.ID);
        this.xmessage=m;
    }
    getXAuftragExtList_BySoid(x: string) {
        this.aService
            .getXMessageListBySoId(x)
            .subscribe(x => this.setXMessageList(x));
    }
    getXMessageList_Prov(): XMessage[] {
        let xmessageList: XMessage[];
        if (this.xmessageList){
            xmessageList = this.xmessageList.filter(
            x => x.SO_ID === '');            
        }
        return  xmessageList;
     }
     getXMessageList_Cons(soid: string): XMessage[] {
        let xmessageList: XMessage[];
        if (this.xmessageList){
            xmessageList = this.xmessageList.filter(
            x => x.SO_ID === soid);            
        }
        return  xmessageList;
     }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-auftrag-msg-list';
        sRet = sRet + '\r\n xmessageList:'; if (this.xmessageList) { sRet = sRet + this.xmessageList.length; }
        sRet = sRet + '\r\n xauftrag:'; if (this.xauftragExt) { sRet = sRet + this.xauftragExt.EO_ID; }

        return sRet + ', \r\n';
    }

    log(s) {
        console.log('AuftragMsgListComponent: ' + s); // {order: "popular"}        
    }

}
