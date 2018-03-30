import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { PrdEm } from '../model/prd_em';

const okMock = false;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class KatalogService {

    private sUrl = 'http://localhost:3300/katalog';  // URL to web api
    a: Observable<PrdEm>;
    constructor(
        private http: HttpClient,
        private messageService: MessageService) {
        this.log('PrdEmService()');
    }

    getPrdEmListByFilter(fd): Observable<PrdEm[]> {
        if (okMock)
            return this.getPrdEmListByFilter_Mock(fd);
        else
            return this.getPrdEmListByFilter_CBE(fd);
    }
    private getPrdEmListByFilter_CBE(fd): Observable<PrdEm[]> {
        const url = `${this.sUrl}?EM_MATNO=${fd.EM_MATNO}&CAPTION=${fd.EM_NAME}&MAX_ROWS=${fd.MAX_ROWS}&MAX_VAL=${fd.MAX_VAL}`;
        this.messageService.add('PrdEmService: getPrdEmListByFilter()' + url);
        console.log('PrdEmService: getPrdEmListByFilter() ' + url);

        return this.http.get<PrdEm[]>(url)
            .pipe(
                tap(_ => this.log(`fetched PrdEm for ${fd}`)),
                catchError(this.handleError<PrdEm[]>(`getPrdEmListByFilter_CBE on ${url}`))
            );
    }
    private getPrdEmListByFilter_Mock(fd): Observable<PrdEm[]> {
        const flt = `EO_ID=${fd.EO_ID}&CODE_INT=${fd.CODE_INT}&STATUS=${fd.STATUS}&SYS=${fd.SYSTEM}`;
        this.messageService.add('PrdEmService: getPrdEmListMockByFilter()' + flt);
        const sUrl = 'assets/json/PrdEm/' + flt + '.json';
        return this.http.get<PrdEm[]>(sUrl)
            .pipe(
                tap(_ => this.log('getPrdEmListByFilter_Mock: ' + sUrl)),
                catchError(this.handleError<any[]>(sUrl))
            );
    }
    // region EMLIst
    getPrdEmList(): Observable<PrdEm[]> {
        if (okMock)
            return this.getPrdEmList_Mock();
        else
            return this.getPrdEmList_CBE();
    }
    private getPrdEmList_CBE(): Observable<PrdEm[]> {
        this.messageService.add('PrdEmService: getPrdEmList()' + this.sUrl);
        console.log('PrdEmService: getPrdEmList() ' + this.sUrl);
        const url = this.sUrl;
        return this.http.get<PrdEm[]>(url)
            .pipe(
                tap(_ => this.log(`fetched PrdEms`)),
                catchError(this.handleError<PrdEm[]>(`getPrdEmList_CBE on ${url}`))
            );
    }
    private getPrdEmList_Mock(): Observable<PrdEm[]> {
        const sUrl = 'assets/json/PrdEm/all.json';
        return this.http.get<PrdEm[]>(sUrl)
            .pipe(
                tap(_ => this.log('getPrdEmListByGuid_Mock:' + sUrl)),
                catchError(this.handleError<any[]>(sUrl))
            );
    }
    // endregion

    //region EM Detail
    getPrdEmDetails(emid): Observable<PrdEm> {
        if (okMock)
            return this.getPrdEmDetails_Mock(emid);
        else
            return this.getPrdEmDetails_CBE(emid);
    }
    private getPrdEmDetails_CBE(emid): Observable<PrdEm> {
        this.messageService.add('PrdEmService: getPrdEmDetails_CBE()' + this.sUrl);
        console.log('PrdEmService: getPrdEmList() ' + this.sUrl);
        const url = this.sUrl + '/EM/' + emid;
        return this.http.get<PrdEm>(url)
            .pipe(
                tap(_ => this.log(`fetched PrdEm `)),
                catchError(this.handleError<PrdEm>(`getPrdEmDetails_CBE on ${url}`))
            );
    }
    private getPrdEmDetails_Mock(emid): Observable<PrdEm> {
        const sUrl = 'assets/json/PrdEm/' + emid + '.json';
        return this.http.get<PrdEm>(sUrl)
            .pipe(
                tap(_ => this.log('getPrdEmDetails_Mock:' + sUrl)),
                catchError(this.handleError<any>(sUrl))
            );
    }
    //endregion
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
        this.messageService.add('PrdEmService: ' + message);
    }
}
