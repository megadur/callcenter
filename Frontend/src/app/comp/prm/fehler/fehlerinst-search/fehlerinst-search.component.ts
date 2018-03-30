import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { XError } from '../../../../model/x_error';
import { XErrorService } from '../../../../service/xerror.service';

@Component({
    selector: 'app-fehlerinst-search',
    templateUrl: './fehlerinst-search.component.html',
    styleUrls: ['./fehlerinst-search.component.css']
})
export class FehlerinstSearchComponent implements OnInit {
    @Input() xerrorListIn: XError[];
    @Input() dbgLevel: Number;
    @Output() xerrorListOut = new EventEmitter<XError[]>();

    xError: XError;
    submitted = false;
    formData = {
        EO_ID: 'EO_ID',
        SO_ID: 'SO_ID',
        TS_VON: 'TS_VON',
        TS_BIS: 'TS_BIS',
        TS_TYPE: 'TS_TYPE',
    };

    constructor(private xerrorService: XErrorService) {
        console.log('XerrorSearchComponent:  ()');

    }// */constructor() { }

    ngOnInit() {
        console.log('XerrorSearchComponent:  ngOnInit()');

    }
    emitList(x): void {
        this.xerrorListIn = x;
        this.xerrorListOut.emit(this.xerrorListIn);
    }
    onSubmit() {
        this.submitted = true;
        console.log('XerrorSearchComponent:  onSubmit()');
        this.xerrorService.getXErrorListByFilter(this.formData)
            .subscribe(x => this.emitList(x));
        //        .subscribe(x => this.xerrorlist = x);
    }
    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = '';
        if (this.formData) { sRet = sRet + 'formData:' + JSON.stringify(this.formData) + ',  \r\n'; }
        if (this.xerrorListIn) { sRet = sRet + 'xerrorList:' + this.xerrorListIn.length + ', \r\n'; }
        if (this.xError) { sRet = sRet + 'xError:' + this.xError.ID + ',  \r\n'; }

        return sRet + ', \r\n';
    }


}
