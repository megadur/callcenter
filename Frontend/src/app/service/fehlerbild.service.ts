import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Fehlerbild } from '../model/Fehlerbild';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FehlerbildService {

    private sUrl = 'http://localhost:3300/fb';  // URL to web api
    a: Observable<Fehlerbild>;
    okMock = false;

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {
        this.log('FehlerbildService()');
    }

    getFehlerbildById(id: string): Observable<Fehlerbild[]> {
        if (this.okMock)
            return this.getFehlerbildById_Mock(id);
        else
            return this.getFehlerbildById_CBE(id);
    }

    // GET Account by guid. Will 404 if id not found
    private getFehlerbildById_Mock(id: string): Observable<Fehlerbild[]> {
        const sUrl = 'assets/json/Fehlerbild/' + id + '.json';
        return this.http.get<Fehlerbild[]>('assets/json/Fehlerbild/' + id + '.json')
            .pipe(
                tap(_ => this.log('getFehlerbildById_Mock: ' + sUrl)),
                catchError(this.handleError<any[]>('getFehlerbildById_Mock: ' + sUrl))
            );
    }

    private getFehlerbildById_CBE(id: string): Observable<Fehlerbild[]> {
        const url = `${this.sUrl}/${id}`;
        this.messageService.add('FehlerbildService: getFehlerbildById()' + url);
        console.log('FehlerbildService: getFehlerbildById() ' + url);
        return this.http.get<Fehlerbild[]>(url)
            .pipe(
                tap(_ => this.log(`fetched Fehlerbild for ${id}`)),
                catchError(this.handleError<Fehlerbild[]>(`getFehlerbildById id=${id}`))
            );
    }

    getFehlerbildList(): Observable<Fehlerbild[]> {
        if (this.okMock)
            return this.getFehlerbildList_Mock();
        else
            return this.getFehlerbildList_CBE();
    }

    // GET XBestand by guid. Will 404 if id not found
    private getFehlerbildList_Mock(): Observable<Fehlerbild[]> {
        const url = `${this.sUrl}`;
        const sUrl = 'assets/json/Fehlerbild/201802131841.json';
        return this.http.get<Fehlerbild[]>('assets/json/Fehlerbild/201802131841.json')
            .pipe(
                tap(_ => this.log('getFehlerbildList_Mock: ' + sUrl)),
                catchError(this.handleError<any[]>('getFehlerbildList_Mock():' + sUrl))
            );
    }
    private getFehlerbildList_CBE(): Observable<Fehlerbild[]> {
        const url = `${this.sUrl}`;
        this.messageService.add('FehlerbildService: getFehlerbildList()' + url);
        console.log('FehlerbildService: getFehlerbildList() ' + url);

        return this.http.get<Fehlerbild[]>(url)
            .pipe(
                tap(_ => this.log(`fetched Fehlerbildlist`)),
                catchError(this.handleError<Fehlerbild[]>(`Fehlerbildlist`))
            );
    }

    getFehlerbildListByFilter(fd): Observable<Fehlerbild> {
        const sFlt = `EO_ID=${fd.FLT_EO_ID}&CODE_INT=${fd.FLT_CODE_INT}&STATUS=${fd.FLT_STATUS}&SYS=${fd.FLT_SYS}`
        const url = `${this.sUrl}?${sFlt}`;
        this.messageService.add('FehlerbildService: getFehlerbildListByFilter()' + url);

        return this.http.get<Fehlerbild>(url)
            .pipe(
                tap(_ => this.log(`getFehlerbildListByFilter ${sFlt}`)),
                catchError(this.handleError<Fehlerbild>(`getFehlerbildListByFilter ${sFlt}`))
            );
    }
    /** POST: add a new hero to the server */
    addFehlerbild(fb: Fehlerbild): Observable<Fehlerbild> {
        const url = `${this.sUrl}`;
        this.messageService.add('FehlerbildService: addFehlerbild()' + url);
        return this.http.post<Fehlerbild>(url, fb, httpOptions).pipe(
            tap((fb: Fehlerbild) => this.log(`added Fehlerbild w/ id=${fb.BILDNUMMER}`)),
            catchError(this.handleError<Fehlerbild>('addFehlerbild'))
        );
    }

    /** DELETE: remove a fb from  the server */
    delFehlerbild(id: String): Observable<String> {
        //const sFlt = `ID=${id}`;
        //const url = `${this.sUrl}?${sFlt}`;
        const url = `${this.sUrl}/${id}`;
        this.messageService.add('FehlerbildService: delFehlerbild()' + url);
        return this.http.delete(url, httpOptions).pipe(
            tap(
                (id: String) => this.log(`removed Fehlerbild w/ id=${id}`)
            ),
            catchError(this.handleError<String>('delFehlerbild'))
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
        this.messageService.add('FehlerbildService: ' + message);
    }
}
