import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { XError } from '../model/x_error';
import { Fehlerbild } from '../model/fehlerbild';

const okMock = false;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class XErrorService {

    private sUrl = 'http://localhost:3300/xerror';  // URL to web api
    a: Observable<XError>;
    constructor(
        private http: HttpClient,
        private messageService: MessageService) {
        this.log('XErrorService()');
    }

    getXErrorListByGuid(guid: string): Observable<XError[]> {
        if (okMock)
            return this.getXErrorListByGuid_Mock(guid);
        else
            return this.getXErrorListByGuid_CBE(guid);
    }
    // GET Account by guid. Will 404 if id not found
    private getXErrorListByGuid_Mock(guid: string): Observable<XError[]> {
        const sUrl = 'assets/json/XError/' + guid + '.json';
        return this.http.get<XError[]>(sUrl)
            .pipe(
                tap(_ => this.log('getXErrorListByGuid_Mock:' + sUrl)),
                catchError(this.handleError<any[]>(sUrl))
            );
    }
    // GET Account by guid. Will 404 if id not found
    private getXErrorListByGuid_CBE(guid: string): Observable<XError[]> {
        const url = `${this.sUrl}/${guid}/GUID`;
        return this.http.get<XError[]>(url)
            .pipe(
                tap(_ => this.log(`fetched XError for ${guid}`)),
                catchError(this.handleError<XError[]>(`getXErrorListByGuid_CBE id=${guid}`))
            );
    }

    getXErrorListById(id: string): Observable<XError[]> {
        if (okMock)
            return this.getXErrorListById_Mock(id);
        else
            return this.getXErrorListById_CBE(id);

    }
    private getXErrorListById_CBE(id: string): Observable<XError[]> {
        const url = `${this.sUrl}/${id}/ID`;
        this.messageService.add('XErrorService: getXErrorListById()' + url);
        console.log('XErrorService: getXErrorListById() ' + url);
        return this.http.get<XError[]>(url)
            .pipe(
                tap(_ => this.log(`fetched XError for ${id}`)),
                catchError(this.handleError<XError[]>(`getXErrorListById_CBE id=${id}`))
            );
    }
    private getXErrorListById_Mock(id: string): Observable<XError[]> {
        const sUrl = 'assets/json/XError/' + id + '.json';
        return this.http.get<XError[]>(sUrl)
            .pipe(
                tap(_ => this.log('getXErrorListById_Mock:' + sUrl)),
                catchError(this.handleError<any[]>(sUrl))
            );
    }

    getXErrorListByFehlerbild(fb: Fehlerbild, orderby: string, pagesize: number, lastval: string): Observable<XError[]> {
        if (okMock)
        return this.getXErrorListByFehlerbild_MOCK(fb, orderby, pagesize, lastval);
        else
        return this.getXErrorListByFehlerbild_CBE(fb, orderby, pagesize, lastval);
    }

    getXErrorListByFehlerbild_CBE(fb: Fehlerbild, orderby: string, pagesize: number, lastval: string): Observable<XError[]> {
        let sFlt = '?';
        //sFlt=sFlt+ 'BEDINGUNG=' +fb.BEDINGUNG;
        //sFlt=sFlt+ '&ERSTELLT_NAME=' + fb.ERSTELLT_NAME;
        //sFlt=sFlt+ '&ERSTELLT_TS=' + fb.ERSTELLT_TS;

        //sFlt=sFlt+ 'FLT_BILDNUMMER=' + fb.FLT_BILDNUMMER;
        //sFlt=sFlt+ '&FLT_CODE_EXT=' + fb.FLT_CODE_EXT;
        sFlt = sFlt + 'FLT_CODE_INT=' + fb.FLT_CODE_INT;
        //sFlt=sFlt+ '&FLT_HANDLING=' + fb.FLT_HANDLING;
        //sFlt=sFlt+ '&FLT_INC_TEXT_LONG=' + fb.FLT_INC_TEXT_LONG;
        //sFlt=sFlt+ '&FLT_INC_TEXT_SHORT=' + fb.FLT_INC_TEXT_SHORT;
        sFlt = sFlt + '&FLT_SO_TYPE_ID=' + fb.FLT_SO_TYPE_ID;
        //sFlt=sFlt+ '&FLT_SPECIAL_ORDER_FLAG_ID=' + fb.FLT_SPECIAL_ORDER_FLAG_ID;
        sFlt = sFlt + '&FLT_STATUS=' + fb.FLT_STATUS;
        sFlt = sFlt + '&FLT_SYS=' + fb.FLT_SYS;
        // sFlt=sFlt+ '&FLT_TASK=' +fb.FLT_TASK;
        // sFlt=sFlt+ '&FLT_TEXT_EXT=' +fb.FLT_TEXT_EXT;
        // sFlt=sFlt+ '&FLT_TEXT_INT=' +fb.FLT_TEXT_INT;

        // sFlt=sFlt+ '&ORDER_BY=' +orderby;
        // sFlt=sFlt+ '&PAGE_SIZE=' +pagesize;
        // sFlt=sFlt+ '&LAST_VAL=' +lastval;

        //const url = `${this.sUrl}?EO_ID=${fd.EO_ID}&CODE_INT=${fd.CODE_INT}&STATUS=${fd.STATUS}&SYS=${fd.SYSTEM}`;
        //const url = `${this.sUrl}?${sFlt}`;
        const url = `${this.sUrl}${sFlt}`;
        this.messageService.add('XErrorService: getXErrorListByFehlerbild_CBE()' + url);
    
        const jsonfile = JSON.stringify(fb);
        let params = new HttpParams().set('Fehlerbild', jsonfile);
        return this.http.get<XError[]>(url)
            .pipe(
                tap(_ => this.log(`fetched XError for ${fb}`)),
                catchError(this.handleError<XError[]>(`getXErrorListByFehlerbild_CBE on ${url}`))
            );
    }
    getXErrorListByFehlerbild_MOCK(fb: Fehlerbild, orderby: string, pagesize: number, lastval: string): Observable<XError[]> {
    
        const sUrl = 'assets/json/XError/all.json';
        return this.http.get<XError[]>(sUrl)
            .pipe(
                tap(_ => this.log('getXErrorListByFehlerbild_MOCK:' + sUrl)),
                catchError(this.handleError<any[]>(sUrl))
            );
    }

    getXErrorListByFilter(fd): Observable<XError[]> {
        if (okMock)
            return this.getXErrorListByFilter_Mock(fd);
        else
            return this.getXErrorListByFilter_CBE(fd);
    }
    private getXErrorListByFilter_CBE(fd): Observable<XError[]> {
        const url = `${this.sUrl}?EO_ID=${fd.EO_ID}&CODE_INT=${fd.CODE_INT}&STATUS=${fd.STATUS}&SYS=${fd.SYSTEM}`;
        this.messageService.add('XErrorService: getXErrorListByFilter()' + url);
        console.log('XErrorService: getXErrorListByFilter() ' + url);

        return this.http.get<XError[]>(url)
            .pipe(
                tap(_ => this.log(`fetched XError for ${fd}`)),
                catchError(this.handleError<XError[]>(`getXErrorListByFilter_CBE on ${url}`))
            );
    }
    private getXErrorListByFilter_Mock(fd): Observable<XError[]> {
        const flt = `EO_ID=${fd.EO_ID}&CODE_INT=${fd.CODE_INT}&STATUS=${fd.STATUS}&SYS=${fd.SYSTEM}`;
        this.messageService.add('XErrorService: getXErrorListMockByFilter()' + flt);
        const sUrl = 'assets/json/XError/' + flt + '.json';
        return this.http.get<XError[]>(sUrl)
            .pipe(
                tap(_ => this.log('getXErrorListByFilter_Mock: ' + sUrl)),
                catchError(this.handleError<any[]>(sUrl))
            );
    }

    getXErrorList(): Observable<XError[]> {
        if (okMock)
            return this.getXErrorList_Mock();
        else
            return this.getXErrorList_CBE();
    }
    private getXErrorList_CBE(): Observable<XError[]> {
        this.messageService.add('XErrorService: getXErrorList()' + this.sUrl);
        console.log('XErrorService: getXErrorList() ' + this.sUrl);
        const url = this.sUrl;
        return this.http.get<XError[]>(url)
            .pipe(
                tap(_ => this.log(`fetched XErrors`)),
                catchError(this.handleError<XError[]>(`getXErrorList_CBE on ${url}`))
            );
    }
    private getXErrorList_Mock(): Observable<XError[]> {
        const sUrl = 'assets/json/XError/all.json';
        return this.http.get<XError[]>(sUrl)
            .pipe(
                tap(_ => this.log('getXErrorListByGuid_Mock:' + sUrl)),
                catchError(this.handleError<any[]>(sUrl))
            );
    }

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
        console.log(message);
        this.messageService.add('XErrorService: ' + message);
    }
}
