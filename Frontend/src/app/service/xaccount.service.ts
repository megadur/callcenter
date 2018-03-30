import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Account } from '../model/account';
import { MessageService } from './message.service';

import { Em } from '../model/em';
import { Rnr } from '../model/rnr';
import { Spr } from '../model/spr';
import { Ins } from '../model/ins';
import { Par } from '../model/par';

import * as myGlobals from '../globals'; //<==== this one

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class XAccountService {

    //  private sUrl = 'api/heroes';  // URL to web api
    private sUrl = 'http://localhost:3300/xaccount';  // URL to web api
    private sUrlMock = 'http://localhost:4200';  // URL to web api
    
    a: Observable<Account>;
    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }


    /** GET Account by id. Will 404 if id not found */
    getAccountByGuid(guid: string): Observable<Account> {
        this.messageService.add('AccountService: getAccount() for ' + guid);
        if(myGlobals.getMode()=='Mock')
            return this.getAccountByGuid_Mock(guid);
        else
            return this.getAccountByGuid_CBE(guid);
    }
    private getAccountByGuid_Mock(guid: string): Observable<Account> {
        const sFlt = 'assets/json/Account/'+ guid + '.json';
        const sUrl = `${this.sUrlMock}/${sFlt}`;
        return this.http.get<Account>(sUrl)
            .pipe(
                tap(_ => this.log('getAccountByGuid_Mock: ' + sUrl)),
                catchError(this.handleError<any>('getAccountByGuid_Mock: ' + sUrl))
            );
    }
    private getAccountByGuid_CBE(guid: string): Observable<Account> {
        this.messageService.add('AccountService: getAccount() for ' + guid);
        // console.log("AccountService: getAccount() in " + guid);
        const url = `${this.sUrl}/${guid}`;

        this.a = this.http.get<Account>(url)
            .pipe(tap(_ => this.log(`fetched account=${guid}`)),
                catchError(this.handleError<Account>(`account =${guid}`))
            );
        return this.a;
    }

    // region AccountList
    getAccountList(): Observable<Account[]> {
        this.messageService.add('AccountService: getAccountList()');
        if(myGlobals.getMode()=='Mock')
            return this.getAccountList_Mock();
        else
            return this.getAccountList_CBE();
    }
    // GET Account by guid. Will 404 if id not found
    private getAccountList_Mock(): Observable<Account[]> {
        const sUrl = 'assets/json/Account/2018-02-16.json';
        return this.http.get<Account[]>(sUrl)
            .pipe(
                tap(_ => this.log('getAccount_Mock: ' + sUrl)),
                catchError(this.handleError<any[]>('getAccount_Mock: ' + sUrl))
            );
    }

    private getAccountList_CBE(): Observable<Account[]> {
        this.messageService.add('AccountService: getAccountList_CBE()');
        // console.log("AccountService: getAccountList()")
        return this.http.get<Account[]>(this.sUrl)
            .pipe(
                tap(accounts => this.log(`fetched accounts`)),
                catchError(this.handleError('getAccountList', []))
            );
    }
    //endregion

    // region findAccountList
    findAccountList(a: Account): Observable<Account[]> {
        this.messageService.add('AccountService: getAccountList()');
        if(myGlobals.getMode()=='Mock')
            return this.getAccountList_Mock();
        else
            return this.getAccountList_CBE();
    }
    // GET Account by guid. Will 404 if id not found
    private findAccountList_Mock(a: Account): Observable<Account[]> {
        const sUrl = 'assets/json/Account/2018-02-16.json';
        return this.http.get<Account[]>(sUrl)
            .pipe(
                tap(_ => this.log('findAccountList_Mock: ' + sUrl)),
                catchError(this.handleError<any[]>('findAccountList_Mock: ' + sUrl))
            );
    }

    private findAccountList_CBE(a: Account): Observable<Account[]> {
        //this.messageService.add('AccountService: findAccountList_CBE()');
        // console.log("AccountService: getAccountList()")
        let s = 'findAccountList_CBE';
        const sFlt = `KDNR=${a.KDNR}&STATUS=${a.STATUS}`;
        const url = `${this.sUrl}?${sFlt}`;
        this.log(s +' for ' + url);

        return this.http.get<Account[]>(this.sUrl)
            .pipe(
                tap(x => this.log(`${s} fetched ${x.length}`)),
                catchError(this.handleError<any[]>(`${s} failed for ${url}`))
            );
    }
    //endregion

// region Details
    /** GET Account by guid. Will 404 if id not found */
    getEmList(guid: string): Observable<Em[]> {
        const url = `${this.sUrl}/${guid}/EM`;
        return this.http.get<Em[]>(url)
            .pipe(
                tap(_ => this.log(`fetched EMs for ${guid}`)),
                catchError(this.handleError<Em[]>(`getEM id=${guid}`))
            );
    }

    /** GET Account by guid. Will 404 if id not found */
    getRnrList(guid: string): Observable<Rnr[]> {
        const url = `${this.sUrl}/${guid}/RNR`;
        return this.http.get<Rnr[]>(url)
            .pipe(
                tap(_ => this.log(`fetched RNRs for ${guid}`)),
                catchError(this.handleError<Rnr[]>(`getRNR id=${guid}`))
            );
    }
    /** GET Account by guid. Will 404 if id not found */
    getSprList(guid: string): Observable<Spr[]> {
        const url = `${this.sUrl}/${guid}/SPR`;
        return this.http.get<Spr[]>(url)
            .pipe(
                tap(_ => this.log(`fetched SPRs for ${guid}`)),
                catchError(this.handleError<Spr[]>(`getSPR id=${guid}`))
            );
    }
    /** GET Account by guid. Will 404 if id not found */
    getParList(guid: string): Observable<Par[]> {
        const url = `${this.sUrl}/${guid}/PAR`;
        return this.http.get<Par[]>(url)
            .pipe(
                tap(_ => this.log(`fetched PARs for ${guid}`)),
                catchError(this.handleError<Par[]>(`getPAR id=${guid}`))
            );
    }
    /** GET Account by guid. Will 404 if id not found */
    getInsList(guid: string): Observable<Ins[]> {
        const url = `${this.sUrl}/${guid}/INS`;
        return this.http.get<Ins[]>(url)
            .pipe(
                tap(_ => this.log(`fetched INSs for ${guid}`)),
                catchError(this.handleError<Ins[]>(`getINS id=${guid}`))
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
        this.messageService.add('AccountService: ' + message);
    }
}
