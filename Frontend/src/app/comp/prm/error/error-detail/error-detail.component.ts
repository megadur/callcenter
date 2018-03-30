import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { XError } from '../../../../model/x_error';
import { XErrorService } from '../../../../service/xerror.service';
import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-error-detail',
    templateUrl: './error-detail.component.html',
    styleUrls: ['./error-detail.component.css']
})
export class ErrorDetailComponent implements OnInit {
    @Input() xerrorIn: XError;
    dbgLevel: number;

    constructor(private aService: XErrorService) {

    }

    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.xerrorIn = new XError();
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-error-detail';
        sRet = sRet + '\r\n xerror:'; if (this.xerrorIn) { sRet = sRet + this.xerrorIn.ID; }

        return sRet + ', \r\n';
    }
}
