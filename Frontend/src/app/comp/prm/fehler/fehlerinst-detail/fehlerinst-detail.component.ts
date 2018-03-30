import { Component, OnInit, Input } from '@angular/core';

import { XError } from '../../../../model/x_error';

import { XErrorService } from '../../../../service/xerror.service';
import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-fehlerinst-detail',
    templateUrl: './fehlerinst-detail.component.html',
    styleUrls: ['./fehlerinst-detail.component.css']
})
export class FehlerinstDetailComponent implements OnInit {
    @Input() xerrorIn: XError;
   
    inp: string;
    counter: number;
    dbgLevel=1;

    // constructor() { }
    // /*
    constructor(private xerrorService: XErrorService) {
        this.counter = 0;
        console.log('XerrorDetailComponent()');
    }// */

    ngOnInit() {
        console.log('XerrorDetailComponent:  ngOnInit()');
        this.dbgLevel=myGlobals.dbgLevel;

    }
    getXError(): void {
        console.log('ADC: getXError() in ' + this.inp);
        /*
        if (this.inp) {
            this.xerrorService
                .getXErrorListById(this.inp)
                .subscribe((a) => {
                    this.xError = a[0];
                    this.counter++; // application state changed
                });
        }
        */
        //      .subscribe(a => this.account = a);
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = '';
        if (this.inp) { sRet = sRet + 'xerror:' + this.inp + ', <br/> \r\n'; }
        if (this.xerrorIn) { sRet = sRet + 'xerror:' + JSON.stringify(this.xerrorIn) + ', <br/> \r\n'; }

        return sRet + ', \r\n';
    }

}
