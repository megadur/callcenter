import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Kampagne } from '../model/kampagne';

const okMock = false;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class KampagneService {


    private sUrl = 'http://localhost:3300/kampagne';  // URL to web api
    a: Observable<Kampagne>;
    constructor(
        private http: HttpClient,
        private messageService: MessageService) {
        this.log('KampagneService()');
    }
    getKampagneById(id): Observable<Kampagne> {
        if (okMock)
            return this.getKampagneById_Mock(id);
        else
            return this.getKampagneById_CBE(id);
    }
    private getKampagneById_CBE(id): Observable<Kampagne> {
        const url = `${this.sUrl}/${id}`;
        this.messageService.add('KampagneService: getKampagneById_CBE()' + url);
        console.log('KampagneService: getKampagneById_CBE() ' + url);

        return this.http.get<Kampagne>(url)
            .pipe(
                tap(_ => this.log(`fetched Kampagne for ${url} = ${_.CAMPAIGN_ID}`)),
                catchError(this.handleError<Kampagne>(`getKampagneById_CBE on ${url}`))
            );
    }
    private getKampagneById_Mock(id): Observable<Kampagne> {
        this.messageService.add('KampagneService: getKampagneListMockByFilter()' + id);
        const sUrl = 'assets/json/Kampagne/' + id + '.json';
        return this.http.get<Kampagne>(sUrl)
            .pipe(
                tap(_ => this.log('getKampagneListByFilter_Mock: ' + sUrl)),
                catchError(this.handleError<any>(sUrl))
            );
    }

    getKampagneListByFilter(fd): Observable<Kampagne[]> {
        if (okMock)
            return this.getKampagneListByFilter_Mock(fd);
        else
            return this.getKampagneListByFilter_CBE(fd);
    }
    private getKampagneListByFilter_CBE(fd): Observable<Kampagne[]> {
        const flt = `STATUS=${fd.STATUS}`;
        const url = `${this.sUrl}?${flt}`;
        this.messageService.add('KampagneService: getKampagneListByFilter()' + url);
        console.log('KampagneService: getKampagneListByFilter() ' + url);

        return this.http.get<Kampagne[]>(url)
            .pipe(
                tap(_ => this.log(`fetched Kampagnelist for ${fd}`)),
                catchError(this.handleError<Kampagne[]>(`getKampagneListByFilter_CBE on ${url}`))
            );
    }
    private getKampagneListByFilter_Mock(fd): Observable<Kampagne[]> {
        const flt = `STATUS=${fd.STATUS}`;
        this.messageService.add('KampagneService: getKampagneListMockByFilter()' + flt);
        const sUrl = 'assets/json/Kampagne/' + flt + '.json';
        return this.http.get<Kampagne[]>(sUrl)
            .pipe(
                tap(_ => this.log('getKampagneListByFilter_Mock: ' + sUrl)),
                catchError(this.handleError<any[]>(sUrl))
            );
    }

    //region Detail
    getKampagneDetails(id): Observable<Kampagne> {
        if (okMock)
            return this.getKampagneDetails_Mock(id);
        else
            return this.getKampagneDetails_CBE(id);
    }
    private getKampagneDetails_CBE(id): Observable<Kampagne> {
        this.messageService.add('KampagneService: getKampagneDetails_CBE()' + id);
        const url = this.sUrl + '/' + id;
        console.log('KampagneService: getKampagneDetails_CBE() ' + url);
        return this.http.get<Kampagne>(url)
            .pipe(
                tap(_ => this.log(`fetched Kampagne for ` + url + ' = ' + _.CAMPAIGN_ID)),
                catchError(this.handleError<Kampagne>(`getKampagneDetails_CBE on ${url}`))
            );
    }
    private getKampagneDetails_Mock(id): Observable<Kampagne> {
        const sUrl = 'assets/json/Kampagne/' + id + '.json';
        return this.http.get<Kampagne>(sUrl)
            .pipe(
                tap(_ => this.log('getKampagneDetails_Mock:' + sUrl)),
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
        this.messageService.add('KampagneService: ' + message);
    }

}
