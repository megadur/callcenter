import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './comp/prm/account/account.component';
import { AuftragComponent } from './comp/prm/auftrag/auftrag.component';
import { AuswertungComponent } from './comp/adm/auswertung/auswertung.component';
import { DashboardComponent } from './comp/all/dashboard/dashboard.component';
import { ErrorComponent } from './comp/prm/error/error.component';
import { FehlerComponent } from './comp/prm/fehler/fehler.component';
import { KampagneComponent } from './comp/prm/kampagne/kampagne.component';
import { KatalogComponent } from './comp/prm/katalog/katalog.component';
import { KonfigurationComponent } from './comp/adm/konfiguration/konfiguration.component';
import { LoginComponent } from './comp/all/login/login.component';
import { NutzerComponent } from './comp/prm/nutzer/nutzer.component';
import { ProduktComponent } from './comp/prm/produkt/produkt.component';
import { SnEinzelComponent } from './comp/wrt/sn-einzel/sn-einzel.component';
import { SnListeComponent } from './comp/wrt/sn-liste/sn-liste.component';
import { SofortnutzungComponent } from './comp/wrt/sofortnutzung/sofortnutzung.component';

const routes: Routes = [
    { path: 'account', component: AccountComponent },
    { path: 'auftrag', component: AuftragComponent },
    { path: 'auswertung', component: AuswertungComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'fehlerbild', component: FehlerComponent },
    { path: 'katalog', component: KatalogComponent },
    { path: 'kampagne', component: KampagneComponent },
    { path: 'konfiguration', component: KonfigurationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'nutzer', component: NutzerComponent },
    { path: 'produkt', component: ProduktComponent },
    { path: 'sofortnutzung', component: SofortnutzungComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
