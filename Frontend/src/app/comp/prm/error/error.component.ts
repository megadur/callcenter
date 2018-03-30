import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { XError } from '../../../model/x_error';
import { XErrorFlt } from '../../../model/x_error_flt';

import { XErrorService } from '../../../service/xerror.service';
import { ConfigurationService } from '../../../service/configuration.service';

import * as myGlobals from '../../../globals'; //<==== this one

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
    @Output() xerrorFltOut = new EventEmitter<XErrorFlt>();
    xerrorFlt: XErrorFlt;

    xerror: XError;
    xerrorList: XError[];

    dbgLevel: number;
    dbMode: string;
    constructor(private route: ActivatedRoute,
        private xeService: XErrorService,
        private cfgService: ConfigurationService,
    ) { }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.dbMode = myGlobals.getMode();
        this.xerror = new XError();
        this.getRoute();
    }
    getMode() {
        return myGlobals.getMode();
    }
    getRoute() {
        this.route.queryParams
            .subscribe(params => {
                console.log(this.logHead() + 'queryParams: ' + params); // {EOID: "XDM000000117029"}
                if (('EOID' in params) || ('BSSOE' in params) || ('CRM' in params)) {
                    let xerrorFlt = new XErrorFlt();
                    xerrorFlt.name = 'new XErrorFlt()';
                    if (params.EOID) xerrorFlt.EO_ID = params.EOID;

                    this.xerrorFltOut.emit(xerrorFlt);
                    this.xerrorFlt = xerrorFlt;
                }
            });
    }
    hasXErrorList(xl: XError[]) {
        if (xl) {
            console.log(this.logHead() + 'hasXAuftragExtList()' + xl.length);
            this.xerrorList = xl;
            if (xl) this.xerror = xl[0];
        }
    }
    hasXError(x: XError) {
        if (x) {
            console.log(this.logHead() + 'hasXAuftragExt()' + x.EO_ID);
            this.xerror = x;
        }
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-error';
        sRet = sRet + '\r\n xerror:'; if (this.xerror) { sRet = sRet + this.xerror.EO_ID; }
        sRet = sRet + '\r\n xerrorList:'; if (this.xerrorList) { sRet = sRet + this.xerrorList.length; }
        sRet = sRet + '\r\n xerrorFlt:'; if (this.xerrorFlt) { sRet = sRet + JSON.stringify(this.xerrorFlt); }

        return sRet + ', \r\n';
    }
    logHead() {
        return this.constructor.name + ': ';
    }
}
