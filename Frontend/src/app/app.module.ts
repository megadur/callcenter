import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// _ALT

// all
import { NavComponent } from './comp/all/nav/nav.component';
import { DashboardComponent } from './comp/all/dashboard/dashboard.component';
import { MessagesComponent } from './comp/all/messages/messages.component';
import { LoginComponent } from './comp/all/login/login.component';

// ADM
import { AuswertungComponent } from './comp/adm/auswertung/auswertung.component';
import { KonfigurationComponent } from './comp/adm/konfiguration/konfiguration.component';

// SVC
import { ConfigurationService } from './service/configuration.service';
import { ErrorService } from './service/error.service';
import { FehlerbildService } from './service/fehlerbild.service';
import { KampagneService } from './service/kampagne.service';
import { KatalogService } from './service/katalog.service';
import { MessageService } from './service/message.service';
import { PagerService } from './service/pager.service';
import { WindowRefService } from './service/window-ref.service';
import { XAccountService } from './service/xaccount.service';
import { XAuftragService } from './service/xauftrag.service';
import { XBestandService } from './service/xbestand.service';
import { XErrorService } from './service/xerror.service';
import { XMessageService } from './service/xmessage.service';

// PRM

import { AccountComponent } from './comp/prm/account/account.component';
import { AccountDetailComponent } from './comp/prm/account/account-detail/account-detail.component';
import { AccountSucheComponent } from './comp/prm/account/account-suche/account-suche.component';
import { AuftragComponent } from './comp/prm/auftrag/auftrag.component';
import { AuftragExtDetailComponent } from './comp/prm/auftrag/auftrag-ext-detail/auftrag-ext-detail.component';
import { AuftragExtListComponent } from './comp/prm/auftrag/auftrag-ext-list/auftrag-ext-list.component';
import { AuftragIntListComponent } from './comp/prm/auftrag/auftrag-int-list/auftrag-int-list.component';
import { AuftragMsgListComponent } from './comp/prm/auftrag/auftrag-msg-list/auftrag-msg-list.component';
import { AuftragSucheComponent } from './comp/prm/auftrag/auftrag-suche/auftrag-suche.component';
import { BestandComponent } from './comp/prm/bestand/bestand.component';
import { BestandDetailComponent } from './comp/prm/bestand/bestand-detail/bestand-detail.component';
import { BestandEditComponent } from './comp/prm/bestand/bestand-edit/bestand-edit.component';
import { ErrorComponent } from './comp/prm/error/error.component';
import { ErrorDetailComponent } from './comp/prm/error/error-detail/error-detail.component';
import { ErrorListComponent } from './comp/prm/error/error-list/error-list.component';
import { ErrorSucheComponent } from './comp/prm/error/error-suche/error-suche.component';
import { FehlerComponent } from './comp/prm/fehler/fehler.component';
import { FehlerFilterComponent } from './comp/prm/fehler/fehler-filter/fehler-filter.component';
import { FehlerbildDefComponent } from './comp/prm/fehler/fehlerbild-def/fehlerbild-def.component';
import { FehlerbildDetailComponent } from './comp/prm/fehler/fehlerbild-detail/fehlerbild-detail.component';
import { FehlerbildListComponent } from './comp/prm/fehler/fehlerbild-list/fehlerbild-list.component';
import { FehlerbildSearchComponent } from './comp/prm/fehler/fehlerbild-search/fehlerbild-search.component';
import { FehlerinstDetailComponent } from './comp/prm/fehler/fehlerinst-detail/fehlerinst-detail.component';
import { FehlerinstListComponent } from './comp/prm/fehler/fehlerinst-list/fehlerinst-list.component';
import { FehlerinstSearchComponent } from './comp/prm/fehler/fehlerinst-search/fehlerinst-search.component';
import { KampagneComponent } from './comp/prm/kampagne/kampagne.component';
import { KampagneEditComponent } from './comp/prm/kampagne/kampagne-edit/kampagne-edit.component';
import { KampagneListeComponent } from './comp/prm/kampagne/kampagne-liste/kampagne-liste.component';
import { KampagneModComponent } from './comp/prm/kampagne/kampagne-mod/kampagne-mod.component';
import { KampagneSucheComponent } from './comp/prm/kampagne/kampagne-suche/kampagne-suche.component';
import { KatalogComponent } from './comp/prm/katalog/katalog.component';
import { KatalogDetailComponent } from './comp/prm/katalog/katalog-detail/katalog-detail.component';
import { KatalogEditComponent } from './comp/prm/katalog/katalog-edit/katalog-edit.component';
import { KatalogListeComponent } from './comp/prm/katalog/katalog-liste/katalog-liste.component';
import { KatalogReloadComponent } from './comp/prm/katalog/katalog-reload/katalog-reload.component';
import { KatalogSucheComponent } from './comp/prm/katalog/katalog-suche/katalog-suche.component';
import { KundenAuftragComponent } from './comp/prm/kunden/kunden-auftrag/kunden-auftrag.component';
import { KundenBestandComponent } from './comp/prm/kunden/kunden-bestand/kunden-bestand.component';
import { KundenComponent } from './comp/prm/kunden/kunden.component';
import { KundenDetailComponent } from './comp/prm/kunden/kunden-detail/kunden-detail.component';
import { KundenSucheComponent } from './comp/prm/kunden/kunden-suche/kunden-suche.component';
import { NutzerComponent } from './comp/prm/nutzer/nutzer.component';
import { NutzerListeComponent } from './comp/prm/nutzer/nutzer-liste/nutzer-liste.component';
import { NutzerStatusComponent } from './comp/prm/nutzer/nutzer-status/nutzer-status.component';
import { NutzerSucheComponent } from './comp/prm/nutzer/nutzer-suche/nutzer-suche.component';
import { ProduktComponent } from './comp/prm/produkt/produkt.component';
import { ProduktDetailComponent } from './comp/prm/produkt/produkt-detail/produkt-detail.component';


// WRT

import { NutzermgmtComponent } from './comp/wrt/nutzermgmt/nutzermgmt.component';
import { SnEinzelComponent } from './comp/wrt/sn-einzel/sn-einzel.component';
import { SnListeComponent } from './comp/wrt/sn-liste/sn-liste.component';
import { SofortnutzungComponent } from './comp/wrt/sofortnutzung/sofortnutzung.component';
import { AccountListComponent } from './comp/prm/account/account-list/account-list.component';
import { VisComponent } from './comp/all/vis/vis.component';
import { PrettyprintDirective } from './prettyprint.directive';
// import { XBestandMock } from './model/x-bestand-mock';

@NgModule({
    declarations: [
        AccountComponent,
        AccountDetailComponent,
        AccountSucheComponent,
        AppComponent,
        AuftragComponent,
        AuftragExtDetailComponent,
        AuftragExtListComponent,
        AuftragIntListComponent,
        AuftragMsgListComponent,
        AuftragSucheComponent,
        AuswertungComponent,
        BestandComponent,
        BestandDetailComponent,
        BestandEditComponent,
        DashboardComponent,
        ErrorComponent,
        ErrorDetailComponent,
        ErrorListComponent,
        ErrorSucheComponent,
        FehlerComponent,
        FehlerFilterComponent,
        FehlerbildDefComponent,
        FehlerbildDetailComponent,
        FehlerbildListComponent,
        FehlerbildSearchComponent,
        FehlerinstDetailComponent,
        FehlerinstListComponent,
        FehlerinstSearchComponent,
        KampagneComponent,
        KampagneEditComponent,
        KampagneListeComponent,
        KampagneModComponent,
        KampagneSucheComponent,
        KatalogComponent,
        KatalogDetailComponent,
        KatalogEditComponent,
        KatalogListeComponent,
        KatalogReloadComponent,
        KatalogSucheComponent,
        KonfigurationComponent,
        KundenAuftragComponent,
        KundenBestandComponent,
        KundenComponent,
        KundenDetailComponent,
        KundenSucheComponent,
        LoginComponent,
        MessagesComponent,
        NavComponent,
        NutzerComponent,
        NutzerListeComponent,
        NutzerStatusComponent,
        NutzerSucheComponent,
        NutzermgmtComponent,
        ProduktComponent,
        ProduktDetailComponent,
        SnEinzelComponent,
        SnListeComponent,
        SofortnutzungComponent,
        AccountListComponent,
        VisComponent,
        PrettyprintDirective,
      ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        ConfigurationService,
        ErrorService,
        FehlerbildService,   
        KampagneService,
        KatalogService,
        MessageService,
        XAccountService,
        XAuftragService,
        XBestandService,
        XErrorService,
        XMessageService,
        PagerService,
        WindowRefService
    ],
    exports:[
        NavComponent,
    ],
    schemas:[
    ],
    entryComponents: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
/*
ng serve
*/
