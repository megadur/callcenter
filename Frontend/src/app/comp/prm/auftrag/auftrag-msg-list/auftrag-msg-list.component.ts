import { Directive, Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { XAuftragExt } from '../../../../model/x_auftrag_ext';
import { XMessage } from '../../../../model/x_message';
import { XMessageService } from '../../../../service/xmessage.service';
import { WindowRefService } from '../../../../service/window-ref.service';

import { PrettyprintDirective } from '../../../../prettyprint.directive';
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
    xml: string;
    nativeWindow: any
    constructor(private aService: XMessageService, private winRef: WindowRefService) {
        this.nativeWindow = winRef.getNativeWindow();
    }

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

    setXAuftrag(x: XAuftragExt) {
        this.xauftragExt = x;
        this.getXMessageList_ByEoid(x.EO_ID);
    }

    getXMessageList_ByEoid(x: string) {
        this.log('getXMessageList_ByEoid for ' + x);
        if (x) {
            this.aService
                .findXMessageListByEoId(x)
                .subscribe(x => { if (x) this.setXMessageList(x); });
        }
    }
    setXMessageList(x: XMessage[]) {
        if (x) {
            this.log('emit setXMessageList:' + x.length);
            this.xmessageList = x;
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
        this.xmessage = m;
    }
    getXAuftragExtList_BySoid(x: string) {
        this.aService
            .findXMessageListBySoId(x)
            .subscribe(x => this.setXMessageList(x));
    }
    getXMessageList_Prov(): XMessage[] {
        let xmessageList: XMessage[];
        if (this.xmessageList) {
            xmessageList = this.xmessageList.filter(
                x => x.SO_ID === '');
        }
        return xmessageList;
    }
    getXMessageList_Cons(soid: string): XMessage[] {
        let xmessageList: XMessage[];
        if (this.xmessageList) {
            xmessageList = this.xmessageList.filter(
                x => x.SO_ID === soid);
        }
        return xmessageList;
    }
    getXMessage_ById(id: string) {
        this.aService.getXMessageById(id)
            .subscribe(x => this.sendMessage(x));
    }
    sendMessage(x) {
        return x.xml;
    }

    getEoId() {
        if (this.xauftragExt) {
            return this.xauftragExt.EO_ID;
        }
    }
    getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    assignActity(id: string): void {
        this.log('assignActity:' + id);
        if (id) {
            //var newWindow = this.nativeWindow.open('/#');
            this.aService.getXMessageById(id).subscribe(xml => {
                //this.log('assignActity:' + JSON.stringify(res));
                this.xml = xml;
                this.showWnd(id, xml);
                //newWindow.location = '/#/link/' + res;
                //newWindow.location =  res;
                // console.log('getElementById', xml);
            })
            /*
*/
        }
        /*
        */
    }

    showWnd(id: string, xml: string) {
        /*
*/
        var node = document.getElementById(id);
        ////*[@id="92441"]/td[2]/pre
        ////*[@id="92441"]/td[2]/pre
        var v;
        v = this.getElementByXpath('*[@id="92441"]');
        v = this.getElementByXpath('*[@id="92441"]/td[0]');
        v = this.getElementByXpath('*[@id="92441"]/td[1]');
        v = this.getElementByXpath('*[@id="92441"]/td[2]/pre');
        var vv = node.children[1];
        vv.innerHTML = xml;

        var vvv = vv.children[1];
        var xmlTextNode = document.createTextNode(xml);
        //vv.appendChild(xmlTextNode);
        //v.appendChild(xml);
        //var textnode = document.createTextNode("Water");

        //var xmlText = new XMLSerializer().serializeToString(textnode);
        //var xmlTextNode = document.createTextNode(xmlText);
        //var parentDiv = document.getElementById(id);
        //parentDiv.appendChild(xmlTextNode);

    }
    hasCorrId(a: XMessage) {
        //this.log('hasCorrId()' + a.EO_ID + ':' + a.CORRELATION_ID);
        if (a.CORRELATION_ID)
            return 'true';
        else
            return 'false';
    }
    isRes(a: XMessage) {
        //this.log('hasCorrId()' + a.EO_ID + ':' + a.CORRELATION_ID);
        if (a.CORRELATION_ID)
            return '';
        else
            return 'hidden';
    }
    isReq(a: XMessage) {
        //this.log('hasCorrId()' + a.EO_ID + ':' + a.CORRELATION_ID);
        if (a.CORRELATION_ID)
            return 'hidden';
        else
            return '';
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
