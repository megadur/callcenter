import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import * as myGlobals from '../globals'; //<==== this one

//import { logger } from '../logger';
//import { winston } from '../logger';
//var logger = new Logger();
//var logger = new (winston.Logger)(loginfo);
/*
console.log('info',"This is info level");
console.info("This is info level");
console.warn("This is warn level");
console.error("This is error level");
*/
const okMock = false;
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ConfigurationService {
    private sUrl = 'http://localhost:3300/config';  // URL to web api

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {
        this.log('XErrorService()');
    }
    getDB(): Observable<String> {
        const url = `${this.sUrl}`;
        this.messageService.add('ConfigurationService: getDB()' + url);

        return this.http.get<String>(url)
            .pipe(
                tap(_ => this.log(`getDB `)),
                catchError(this.handleError<String>(`getDB `))
            );
    }
    /** POST: add a new hero to the server */
    setDB(sDB: String): Observable<String> {
        const sFlt = `db_name=${sDB}`
        const url = `${this.sUrl}?${sFlt}`;
        this.log(`setDB with ${url}`)
        return this.http.get<String>(url)
            .pipe(
                tap(_ => this.log(`setDB to ${sDB}`)),
                catchError(this.handleError<String>(`setDB to ${sDB}`))
            );
    /*
        // TODO: const url = `${this.sUrl}`;
        return this.http.put<String>(url, sDB, httpOptions).pipe(
            tap((fb: String) => this.log(`setDB to ${sDB}`)),
            catchError(this.handleError<String>(`setDB to ${sDB}`))
        );
        */
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
        this.messageService.add('ConfigurationService: ' + message);
    }
}
