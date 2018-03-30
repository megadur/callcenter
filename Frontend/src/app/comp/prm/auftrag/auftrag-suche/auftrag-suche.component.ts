import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { XAuftrag } from '../../../../model/x_auftrag';
import { XAuftragExt } from '../../../../model/x_auftrag_ext';
import { XAuftragFlt } from '../../../../model/x_auftrag_flt';
import { XAuftragService } from '../../../../service/xauftrag.service';

import * as myGlobals from '../../../../globals'; //<==== this one

@Component({
    selector: 'app-auftrag-suche',
    templateUrl: './auftrag-suche.component.html',
    styleUrls: ['./auftrag-suche.component.css']
})
export class AuftragSucheComponent implements OnInit {
    //    @Input() xauftrag: XAuftrag;
    private xauftragFlt: XAuftragFlt;
    @Output() xauftragListOut = new EventEmitter<XAuftrag[]>();
    @Output() xauftragExtListOut = new EventEmitter<XAuftragExt[]>();

    dbgLevel: number;
    formData = {
        ID: '',
        subjects: ['EO_ID', 'SMK', 'DKK'],
        items: [{ id: '', name: 'Alle' },
        { id: 'BSSOE', name: 'BSSOE' },
        { id: 'CRM', name: 'CRM-T' },
        { id: 'DKK', name: 'DKK' },
        { id: 'EO_ID', name: 'IDM-Adapter extern' },
        { id: 'SO_ID', name: 'IDM-Adapter intern' },
        { id: 'SMF', name: 'SMK-FF' },
        { id: 'SNR', name: 'Sofortnutzungsref.' },
        { id: 'MISC', name: 'Sonstiges' },
        { id: 'GUID', name: 'GUID' },
        ],
        selected: { id: '', name: 'Alle' },
    };
    selectedValue: any;
    selectedItem: string;
    constructor(private aService: XAuftragService) { }
    getIdType(v: String) {
        console.log('getIdType for: ' + v);
        let item;
        this.xauftragFlt = new XAuftragFlt();
        if (!item && v.startsWith('IDM')) {
            item = this.formData.items.find(item => item.id === 'SO_ID');
        }
        if (!item && v.startsWith('XDM')) {
            item = this.formData.items.find(item => item.id === 'EO_ID');

        }

        //CRMAuftragsNummer 80183501971 
        if (!item && v.length == 12) {
            if (this.isNumeric(v)) {
                item = this.formData.items.find(item => item.id === 'CRM');
            }
        }
        //Produktionsplan-ID eb586ec7-a4db-4a45-9ceb-79c0042b6219 
        if (!item && v.length == 36) {
            if (!this.isNumeric(v)) {
                item = this.formData.items.find(item => item.id === 'SMF');
            }
        }
        // GUID 100049012081112430100001
        if (!item && v.length == 24) {
            if (this.isNumeric(v)) {
                item = this.formData.items.find(item => item.id === 'GUID');
            }
        }
        //  DKK_11828425 
        if (!item && v.startsWith('DKK')) {
            item = this.formData.items.find(item => item.id === 'DKK');
        }
        // SNRefNummer 90534439496
        if (!item && v.length == 11) {
            if (this.isNumeric(v)) {
                item = this.formData.items.find(item => item.id === 'SNR');
            }
        }
        if (item) {
            this.formData.selected = item;
            console.log('getIdType = ' + item.name);
        }

    }
    isNumeric(value) {
        return /^-{0,1}\d+$/.test(value);
    }
    initFormdata() {
        //this.formData.ID = '100049015549700404220001';
        this.formData.ID='XDM000000192928';
    }
    ngOnInit() {
        this.dbgLevel = myGlobals.dbgLevel;
        this.xauftragFlt = new XAuftragFlt();
        this.initFormdata();
        this.getIdType(this.formData.ID);
    }
    onSubmit() {
        console.log('onSubmit()');
        this.xauftragFlt = new XAuftragFlt();
        if (this.formData.selected.id == 'GUID') this.xauftragFlt.GUID = this.formData.ID;
        if (this.formData.selected.id == 'SO_ID') this.xauftragFlt.SO_ID = this.formData.ID;
        if (this.formData.selected.id == 'EO_ID') this.xauftragFlt.EO_ID = this.formData.ID;
        if (this.formData.selected.id == 'CRM') this.xauftragFlt.ORDER_ID_CRM = this.formData.ID;
        if (this.formData.selected.id == 'BSSOE') this.xauftragFlt.ORDER_ID_BSSOE = this.formData.ID;
        if (this.formData.selected.id == 'DKK') this.xauftragFlt.ORDER_ID_DKK = this.formData.ID;
        if (this.formData.selected.id == 'MISC') this.xauftragFlt.ORDER_ID_MISC = this.formData.ID;
        if (this.formData.selected.id == 'SMF') this.xauftragFlt.ORDER_ID_SMF = this.formData.ID;
        if (this.formData.selected.id == 'SNR') this.xauftragFlt.ORDER_ID_SNR = this.formData.ID;
        this.getXAuftragExtList_ByFlt(this.xauftragFlt);
    }

    //region Input
    @Input() set xauftragFltIn(x: XAuftragFlt) {

        if (x) {
            this.xauftragFlt = x;
            this.xauftragFlt.EO_ID = x.EO_ID;
            this.xauftragFlt.EO_ID = x.ORDER_ID_BSSOE;
            this.xauftragFlt.EO_ID = x.ORDER_ID_CRM;
            this.xauftragFlt.ORDER_ID_DKK = x.ORDER_ID_DKK;
            this.xauftragFlt.ORDER_ID_MISC = x.ORDER_ID_MISC;
            this.xauftragFlt.ORDER_ID_SMF = x.ORDER_ID_SMF;
            this.xauftragFlt.ORDER_ID_SNR = x.ORDER_ID_SNR;

            this.getXAuftragExtList_ByFlt(this.xauftragFlt);
            if (x.EO_ID) this.formData.ID = x.EO_ID;
            if (x.ORDER_ID_BSSOE) this.formData.ID = x.ORDER_ID_BSSOE;
            if (x.ORDER_ID_CRM) this.formData.ID = x.ORDER_ID_CRM;
            if (x.ORDER_ID_DKK) this.formData.ID = x.ORDER_ID_DKK;
        }
    }
    get xauftragFltIn() {
        return this.xauftragFlt;
    }
    //endregion

    getXAuftragList_ByXauftrag(x: XAuftrag) {
        this.log('getXAuftragList_ByXauftrag()' + x.SO_ID);
        this.aService
            .getXAuftragList_ByXAuftrag(x)
            .subscribe(x => this.setXAuftragList(x));
    }
    setXAuftragList(x: XAuftrag[]) {
        if (x) {
            this.log('setXAuftragList:' + x.length);
            this.xauftragListOut.emit(x);
            // this.xauftrag = x[0];
        }
    }

    getXAuftragExtList_ByFlt(x: XAuftragFlt) {
        this.log('getXAuftragExtList_ByFlt()' + x.EO_ID);
        this.aService
            .getXAuftragExtList_ByXAuftragFlt(x)
            .subscribe(x => this.setXAuftragExtList(x));
    }
    setXAuftragExtList(x: XAuftragExt[]) {
        if (x) {
            this.log('setXAuftragExtList:' + x.length);
            this.xauftragExtListOut.emit(x);
            // this.xauftragExt = x[0];
        }
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        let sRet = 'app-auftrag-suche';
        //sRet = sRet + '\r\n xauftragList:'; if (this.xauftragList) { sRet = sRet + this.xauftragList.length; }
        //sRet = sRet + '\r\n xauftragExtList:'; if (this.xauftragExtListOut.map) { sRet = sRet + this.xauftragExtListOut.map.length; }
        //sRet = sRet + '\r\n xauftragList:'; if (this.xauftragListOut.map) { sRet = sRet + this.xauftragListOut.map.length; }
        sRet = sRet + '\r\n xauftragFlt:'; if (this.xauftragFlt) { sRet = sRet + JSON.stringify(this.xauftragFlt); }

        return sRet + ', \r\n';
    }
    log(s) {
        console.log('AuftragComponent: ' + s); // {order: "popular"}        
    }

}
