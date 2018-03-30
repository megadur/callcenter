import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { XAccountInfo } from '../model/x_account_info';
import { XHisAuftrag } from '../model/x_his_auftrag';
import { XAuftrag } from '../model/x_auftrag';
import { XAuftragExt } from '../model/x_auftrag_ext';
import { XAuftragFlt } from '../model/x_auftrag_flt';
import { XError } from '../model/x_error';
import { XMessage } from '../model/x_message';

import { MessageService } from './message.service';

import * as myGlobals from '../globals'; //<==== this one

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class XAuftragService {

    private sUrl = 'http://localhost:3300';  // URL to web api
    private sAuftrag='xauftrag';
    private sAuftragExt='xauftragext';
    private sMessage='xmessage';
    a: Observable<Account>;
    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    //#region XAccInfo

    /** GET Account by guid. Will 404 if id not found */
    getXAccInfoList_ByGuid(guid: string): Observable<XAccountInfo[]> {
        let s = 'getXAccInfoList_ByGuid for ' + guid;
        this.log(s);
        const sFlt = `${guid}/XAccountInfo`;
        const url = `${this.sUrl}/${sFlt}`;
        return this.http.get<XAccountInfo[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    //#endregion

    //#region XHisAuftrag

    /** GET XHisAuftrag by guid. Will 404 if id not found */
    getXHisAuftragList_ByGuid(guid: string): Observable<XHisAuftrag[]> {
        let s = 'getXHisAuftragList_ByGuid for ' + guid;
        this.log(s);
        const sFlt = `${guid}/XHisAuftrag`;
        const url = `${this.sUrl}/${this.sAuftrag}/${sFlt}`;
        return this.http.get<XHisAuftrag[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    //#endregion

    //#region XAuftrag

    /** GET XAuftragList by guid. Will 404 if id not found */
    getXAuftragList_ByGuid(guid: string): Observable<XAuftrag[]> {
        let s = 'getXAuftragList_ByGuid for ' + guid;
        this.log(s);
        const sFlt = `${guid}/XAuftrag`;
        const url = `${this.sUrl}/${this.sAuftrag}/${sFlt}`;
        this.log(s +' for ' + url);
        return this.http.get<XAuftrag[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    /** GET XAuftragList by XAuftrag. Will 404 if id not found */
    getXAuftragList_ByXAuftrag(x: XAuftrag): Observable<XAuftrag[]> {
        let s = 'getXAuftragList_ByXAuftrag ';
        this.log(s + JSON.stringify(x));
        if (myGlobals.getMode() == 'Mock')
            return this.getXAuftragList_ByXAuftrag_Mock(x);
        else
            return this.getXAuftragList_ByXAuftrag_CBE(x);
    }
    private getXAuftragList_ByXAuftrag_Mock(x: XAuftrag): Observable<XAuftrag[]> {
        let s = 'getXAuftragList_ByXAuftrag_Mock ';
        const sFlt = `SOID=${x.SO_ID}_EOID=${x.EO_ID}`;
        const url = 'assets/json/XAuftrag/' + sFlt + '.json';
        this.log(s +' for ' + url);
        return this.http.get<XAuftrag[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    private getXAuftragList_ByXAuftrag_CBE(x: XAuftrag): Observable<XAuftrag[]> {
        let s = 'getXAuftragList_ByXAuftrag_CBE';
        const sFlt = `SOID=${x.SO_ID}&EOID=${x.EO_ID}`;
        const url = `${this.sUrl}/${this.sAuftrag}?${sFlt}`;
        this.log(s +' for ' + url);

        return this.http.get<XAuftrag[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    /** GET XAuftragList by Param. Will 404 if id not found */
    getXAuftragList_ByParam(guid: string, eoid: string, soid: string): Observable<XAuftrag[]> {
        let s = 'getXAuftragList_ByParam() for ' + guid + eoid + soid;
        this.log(s);
        if (myGlobals.getMode() == 'Mock')
            return this.getXAuftragList_ByParam_Mock(guid, eoid, soid);
        else
            return this.getXAuftragList_ByParam_CBE(guid, eoid, soid);
    }
    private getXAuftragList_ByParam_Mock(guid: string, eoid: string, soid: string): Observable<XAuftrag[]> {
        let s = 'getXAuftragList_ByParam_Mock()';
        const sFlt = `GUID=${guid}_EOID=${eoid}_SOID=${soid}`;
        const url = 'assets/json/XAuftrag/' + sFlt + '.json';
        this.log(s +' for ' + url);
        return this.http.get<XAuftrag[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    private getXAuftragList_ByParam_CBE(guid: string, eoid: string, soid: string): Observable<XAuftrag[]> {
        let s = 'getXAuftragList_ByParam_CBE() ';
        const sFlt = `GUID=${guid}&EOID=${eoid}&SOID=${soid}`;
        const url = `${this.sUrl}/${this.sAuftrag}?${sFlt}`;
        this.log(s +' for ' + url);

        return this.http.get<XAuftrag[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    /** GET XAuftragExt by guid. Will 404 if id not found */
    getXAuftrag_BySoid(soid: string): Observable<XAuftrag> {
        let s = 'getXAuftrag_BySoid() for ' + soid;
        this.log(s);
        const sFlt = `SOID=${soid}`;
        const url = `${this.sUrl}/${this.sAuftrag}?${sFlt}`;

        return this.http.get<XAuftrag>(url)
            .pipe(
                tap(_ => this.log(`fetched ${s} for ${sFlt}`)),
                catchError(this.handleError<any>(`failed ${s} for ${url}`))
            );
    }

    //#endregion

    //#region XAuftragExt

    /** GET XAuftragExt by guid. Will 404 if id not found */
    getXAuftragExtList_ByGuid(guid: string): Observable<XAuftragExt[]> {
        let s = 'getXAuftragExtList_ByGuid for ' + guid;
        const sFlt = `${guid}/XAuftragExt`;
        const url = `${this.sUrl}/${sFlt}`;
        this.log(s +' for ' + url);

        return this.http.get<XAuftragExt[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    /** GET XAuftragExt by EOID. Will 404 if id not found */
    getXAuftragExt_ByEoid(eoid: string): Observable<XAuftragExt> {
        let s = 'getXAuftragExt_ByEoid for ' + eoid;
        const sFlt = `EOID=${eoid}`;
        const url = `${this.sUrl}/${this.sAuftragExt}?${sFlt}`;
        this.log(s +' for ' + url);

        return this.http.get<XAuftragExt>(url)
            .pipe(
                tap(_ => this.log(`fetched ${s} for ${sFlt}`)),
                catchError(this.handleError<any>(`failed ${s} for ${url}`))
            );
    }
    /** GET XAuftragExt by guid. Will 404 if id not found */
    getXAuftragExtList_ByParam(guid: string, eoid: string, soid: string): Observable<XAuftragExt[]> {
        let s = 'getXAuftragExtList_ByParam() ';
        this.log(s + ' for ' + guid + eoid + soid);
        if (myGlobals.getMode() == 'Mock')
            return this.getXAuftragExtList_ByParam_Mock(guid, eoid, soid);
        else
            return this.getXAuftragExtList_ByParam_CBE(guid, eoid, soid);
    }
    private getXAuftragExtList_ByParam_Mock(guid: string, eoid: string, soid: string): Observable<XAuftragExt[]> {
        let s = 'getXAuftragExtList_ByParam_Mock()  ';
        const sFlt = `GUID=${guid}_EOID=${eoid}_SOID=${soid}`;
        const url = 'assets/json/XAuftragExt/' + sFlt + '.json';
        this.log(s +' for ' + url);
        return this.http.get<XAuftragExt[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    private getXAuftragExtList_ByParam_CBE(guid: string, eoid: string, soid: string): Observable<XAuftragExt[]> {
        let s = 'getXAuftragExtList_ByParam_CBE() ';
        const sFlt = `GUID=${guid}&EOID=${eoid}&SOID=${soid}`;
        const url = `${this.sUrl}/${this.sAuftragExt}?${sFlt}`;
        this.log(s +' for ' + url);

        return this.http.get<XAuftragExt[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }

    /** GET XAuftragExt by guid. Will 404 if id not found */
    getXAuftragExtList_ByXAuftragFlt(x: XAuftragFlt): Observable<XAuftragExt[]> {
        let s = 'getXAuftragExtList_ByXAuftragFlt() ';
        this.log(s + ' for ' + JSON.stringify(x));
        if (myGlobals.getMode() == 'Mock')
            return this.getXAuftragExtList_ByXAuftragFlt_Mock(x);
        else
            return this.getXAuftragExtList_ByXAuftragFlt_CBE(x);
    }
    private getXAuftragExtList_ByXAuftragFlt_Mock(x: XAuftragFlt): Observable<XAuftragExt[]> {
        let s = 'getXAuftragExtList_ByXAuftragFlt_Mock ';
        const sFlt = `EOID=${x.EO_ID}_BSSOE=${x.ORDER_ID_BSSOE}_CRM=${x.ORDER_ID_CRM}_DKK=${x.ORDER_ID_DKK}_MISC=${x.ORDER_ID_MISC}_SMF=${x.ORDER_ID_SMF}_SNR=${x.ORDER_ID_SNR}`;
        const url = 'assets/json/XAuftragExt/' + sFlt + '.json';
        this.log(s +' for ' + url);

        return this.http.get<XAuftragExt[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    private getXAuftragExtList_ByXAuftragFlt_CBE(x: XAuftragFlt): Observable<XAuftragExt[]> {
        let s = 'getXAuftragExtList_ByXAuftragFlt_CBE ';
        const sFlt = `EOID=${x.EO_ID}&BSSOE=${x.ORDER_ID_BSSOE}&CRM=${x.ORDER_ID_CRM}&DKK=${x.ORDER_ID_DKK}&MISC=${x.ORDER_ID_MISC}&SMF=${x.ORDER_ID_SMF}&SNR=${x.ORDER_ID_SNR}`;
        const url = `${this.sUrl}/${this.sAuftragExt}?${sFlt}`;
        this.log(s +' for ' + url);

        return this.http.get<XAuftragExt[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    //#endregion

    //#region XError

    /** GET XErrorList by guid. Will 404 if id not found */
    getXErrorList_ByGuid(guid: string): Observable<XError[]> {
        let s = 'getXErrorList_ByGuid for ' + guid;
        this.log(s);
        const sFlt = `${guid}/XError`;
        const url = `${this.sUrl}/${sFlt}`;

        return this.http.get<XError[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    //#endregion

    //#region XMessage

    /** GET XMessageList by guid. Will 404 if id not found */
    getXMessageList_ByGuid(guid: string): Observable<XMessage[]> {
        let s = 'getXMessageList_ByGuid for ' + guid;
        this.log(s);
        const sFlt = `${guid}/XMessage`;
        const url = `${this.sUrl}/${this.sMessage}/${sFlt}`;

        return this.http.get<XMessage[]>(url)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }


    //#endregion

    //#region Error, Log

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a Service message with the MessageService */
    private log(message: string) {
        let sLog = 'XAuftragService: ' + message;
        console.log(sLog);
        this.messageService.add(sLog);
    }
    //#endregion


}
