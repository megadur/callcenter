import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../../../service/configuration.service';
import * as myGlobals from '../../../globals'; //<==== this one

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private cfgService: ConfigurationService) { }
    sDB: String;

    ngOnInit() {
        this.getDB();
    }
    getDBName() {
        console.log('KonfigurationComponent:  getDBName()');
        return this.sDB;
    }
    getDB() {
        console.log('KonfigurationComponent:  getDB()');
        this.cfgService.getDB()
            .subscribe(x => this.sDB=x);
    }
}
