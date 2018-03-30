import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../../service/configuration.service';
import * as myGlobals from '../../../globals'; //<==== this one

@Component({
    selector: 'app-konfiguration',
    templateUrl: './konfiguration.component.html',
    styleUrls: ['./konfiguration.component.css']
})
export class KonfigurationComponent implements OnInit {

    constructor(private cfgService: ConfigurationService) { }
    sDB: String;
    ngOnInit() {
        // this.sDB='ET3';
        this.setDB('ET3');
    }
    getDBName() {
        console.log('KonfigurationComponent:  getDBName()');
        return this.sDB;
    }
    getDB(sName) {
        console.log('KonfigurationComponent:  getDB()');
        this.cfgService.setDB(sName)
            .subscribe(x => this.setDB(x));
    }

    setDB(sName) {
        console.log('KonfigurationComponent:  setDB()');
        this.sDB=sName;
    }
    /*
    getDBMode() {
        console.log('KonfigurationComponent:  getDBMode()');
        return myGlobals.okMock;
    }
    setDBMode(sMode) {
        console.log('KonfigurationComponent:  setDBMode()');
        myGlobals.setMock(sMode);
    }
*/
}
