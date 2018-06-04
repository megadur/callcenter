import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChanges } from '@angular/core';
import { XAuftrag } from '../../../../model/x_auftrag';
import { XAuftragExt } from '../../../../model/x_auftrag_ext';
import { XAuftragFlt } from '../../../../model/x_auftrag_flt';
import { XAuftragService } from '../../../../service/xauftrag.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-nutzer-suche',
    templateUrl: './nutzer-suche.component.html',
    styleUrls: ['./nutzer-suche.component.css']
})
export class NutzerSucheComponent implements OnInit {
    private xauftragExtList: XAuftragExt[];
    private xauftragFlt: XAuftragFlt;
    @Output() xauftragExtListOut = new EventEmitter<XAuftragExt[]>();
    //@Output() xauftragExtListOut = new EventEmitter<XAuftragExt[]>();

    submitted = false;
    dbgLevel: number;
    formData = {
        GUID: '',
        SOID: '',
        TSVON: '',
        TSBIS: '',
        status: ['Alle', 'erstellt', 'versendet'],
        selected: { id: '', name: 'Alle' },
    };
    selectedValue: any;
    selectedItem: string;
    constructor(private aService: XAuftragService) { }

    initFormdata() {
        this.formData.GUID = '100049015549700404220001';
        //this.formData.ID = 'XDM000000192928';
    }
    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.xauftragFlt = new XAuftragFlt();
        this.initFormdata();
        this.onSubmit();
    }
    onSubmit() {
        console.log('onSubmit()');
        this.xauftragFlt = new XAuftragFlt();
        this.xauftragFlt.GUID = this.formData.GUID;
        this.xauftragFlt.SO_ID = this.formData.SOID;
        this.findXAuftragList_ByFlt(this.xauftragFlt);
    }

    //region Input
    @Input() set xauftragFltIn(x: XAuftragFlt) {

    }
    get xauftragFltIn() {
        return this.xauftragFlt;
    }
    //endregion

    findXAuftragList_ByFlt(x: XAuftragFlt) {
        this.log('findXAuftragList_ByFlt()' + x.EO_ID);
        this.aService
            .getXAuftragExtList_ByXAuftragFlt(x)
            .subscribe(x => this.setXAuftragExtList(x));
    }
  
    setXAuftragExtList(x: XAuftragExt[]) {
        if (x) {
            this.log('setXAuftragList:' + x.length);
            this.xauftragExtListOut.emit(x);
            // this.xauftrag = x[0];
        }
    }



    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-auftrag-suche';
        sRet = sRet + '\r\n xauftragExtList:'; if (this.xauftragExtList) { sRet = sRet + this.xauftragExtList.length; }
        //sRet = sRet + '\r\n xauftragExtList:'; if (this.xauftragExtListOut.map) { sRet = sRet + this.xauftragExtListOut.map.length; }
        //sRet = sRet + '\r\n xauftragList:'; if (this.xauftragListOut.map) { sRet = sRet + this.xauftragListOut.map.length; }
        sRet = sRet + '\r\n xauftragFlt:'; if (this.xauftragFlt) { sRet = sRet + JSON.stringify(this.xauftragFlt); }

        return sRet + ', \r\n';
    }
    log(s) {
        console.log('AuftragComponent: ' + s); // {order: "popular"}        
    }

}
