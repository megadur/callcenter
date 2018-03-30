import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { FileSaver } from 'file-saver';

import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { Account } from '../../../model/account';
import { XAuftrag } from '../../../model/x_auftrag';
import { XAuftragExt } from '../../../model/x_auftrag_ext';
import { XAuftragFlt } from '../../../model/x_auftrag_flt';
import { XAuftragService } from '../../../service/xauftrag.service';
import { XMessageService } from '../../../service/xmessage.service';
import { ConfigurationService } from '../../../service/configuration.service';

import * as myGlobals from '../../../globals'; //<==== this one

@Component({
    selector: 'app-auftrag',
    templateUrl: './auftrag.component.html',
    styleUrls: ['./auftrag.component.css']
})
export class AuftragComponent implements OnInit {
    @Output() xauftragFltOut = new EventEmitter<XAuftragFlt>();
    xauftragFlt: XAuftragFlt;

    xauftrag: XAuftrag;
    xauftragList: XAuftrag[];
    xauftragExt: XAuftragExt;
    xauftragExtList: XAuftragExt[];

    dbgLevel: number;
    dbMode;
    constructor(
        private route: ActivatedRoute,
        private xaService: XAuftragService,
        private xmService: XMessageService,
        private cfgService: ConfigurationService,
        router: Router) {
        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                this.log('NavigationStart: ' + event); // {EOID: "XDM000000117029"}

            }
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
        });
    }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.dbMode = myGlobals.getMode();
        //this.xauftrag = new XAuftrag();
        //this.xauftragExt = new XAuftragExt();
        //this.xauftragFlt = new XAuftragFlt();
        //this.xauftragFlt.name = 'this.xauftragFlt';
        this.getRoute();
    }
    getMode() {
        return myGlobals.getMode();
    }
    getRoute() {
        this.route.queryParams
            .subscribe(params => {
                this.log('queryParams: ' + params); // {EOID: "XDM000000117029"}
                if (('EOID' in params) || ('BSSOE' in params) || ('CRM' in params)) {
                    let xauftragFlt = new XAuftragFlt();
                    xauftragFlt.name = 'new XAuftragFlt()';
                    if (params.EOID) xauftragFlt.EO_ID = params.EOID;
                    if (params.BSSOE) xauftragFlt.ORDER_ID_BSSOE = params.BSSOE;
                    if (params.CRM) xauftragFlt.ORDER_ID_CRM = params.CRM;
                    this.xauftragFltOut.emit(xauftragFlt);
                    this.xauftragFlt = xauftragFlt;
                }
                if (('EOIDZ' in params)) {
                    let eoid = params.EOIDZ;
                    this.getXMessageZip_ByFlt(eoid);
                    //this.testZIP();
                    return 'OK Mann!';
                }
            });
    }

    getXMessageZip_ByFlt(eoid: string) {
        this.log('getXMessageZip_ByFlt(' + eoid + ')');
        this.xmService.getXMessageZipByEoId(eoid)
            .subscribe(x => {
                //var FileSaver = require('file-saver');
                //           'Content-Type': 'application/zip',
                // 'Content-disposition': 'attachment; filename='+eoid+'.zip'

                var file = new File(["Hello, brave new world!"], "hello new world.txt", { type: "application/zip",  });
                FileSaver.saveAs(file);
            });
    }
    testZIP() {
        // var FileSaver = require('file-saver');
        //           'Content-Type': 'application/zip',
        // 'Content-disposition': 'attachment; filename='+eoid+'.zip'

        var file = new File(["Hello, brave new world!"], "hello new world.txt", { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(file);
    }
    hasXAuftragExtList(xl: XAuftragExt[]) {
        this.log('hasXAuftragExtList()' + xl.length);
        this.xauftragExtList = xl;
        if (xl) this.xauftragExt = xl[0];
    }
    hasXAuftragExt(x: XAuftragExt) {
        this.log('hasXAuftragExt()' + x.EO_ID);
        this.xauftragExt = x;
    }
    hasXAuftrag(x: XAuftrag) {
        this.log('hasXAuftrag()' + x.SO_ID);
        this.xauftrag = x;
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-auftrag';
        //sRet = sRet + '\r\n xauftragFlt:'; if (this.xauftragFlt) { sRet = sRet + this.xauftragFlt.EO_ID; }
        sRet = sRet + '\r\n xauftrag:'; if (this.xauftrag) { sRet = sRet + this.xauftrag.SO_ID; }
        sRet = sRet + '\r\n xauftragList:'; if (this.xauftragList) { sRet = sRet + this.xauftragList.length; }
        sRet = sRet + '\r\n xauftragExt:'; if (this.xauftragExt) { sRet = sRet + this.xauftragExt.EO_ID; }
        sRet = sRet + '\r\n xauftragExtList:'; if (this.xauftragExtList) { sRet = sRet + this.xauftragExtList.length; }
        sRet = sRet + '\r\n xauftragFlt:'; if (this.xauftragFlt) { sRet = sRet + JSON.stringify(this.xauftragFlt); }

        return sRet + ', \r\n';
    }
    log(s) {
        console.log('AuftragComponent: ' + s); // {order: "popular"}        
    }
}
