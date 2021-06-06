import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './navbare/index/index.component';
import { ClientComponent } from './navbare/client/client.component';
import { EntrepriseComponent } from './navbare/entreprise/entreprise.component';
import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { EntrepriseLayoutComponent } from './layout/entreprise-layout/entreprise-layout.component';
import { ExamensComponent } from './examens/examens.component';
import { FormationsComponent } from './formations/formations.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import timeGridPlugin from "@fullcalendar/timegrid";
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { comptesComponent } from './comptes/comptes.component';
import { FormateurLayoutComponent } from './layout/formateur-layout/formateur-layout.component';
import { EmploiComponent } from './layout/formateur-layout/emploi/emploi.component';
import { ProfilComponent } from './layout/formateur-layout/profil/profil.component';
import { EmployeesComponent } from './layout/entreprise-layout/employees/employees.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExamensClientComponent } from './layout/client-layout/examens-client/examens-client.component';
import { FormationsClientComponent } from './layout/client-layout/formations-client/formations-client.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfilClientComponent } from './layout/client-layout/profil-client/profil-client.component';
import { DemandeClientComponent } from './layout/client-layout/demande-client/demande-client.component';
import { DemandeExamClientComponent } from './layout/client-layout/demande-exam-client/demande-exam-client.component';
import { EtudiantComponent } from './layout/formateur-layout/etudiant/etudiant.component';
import { FormateurComponent } from './navbare/formateur/formateur.component';
import { FormationsEntrepriseComponent } from './layout/entreprise-layout/formations-entreprise/formations-entreprise.component';
import { ExamensEntrepriseComponent } from './layout/entreprise-layout/examens-entreprise/examens-entreprise.component';
import { ProfilAdminComponent } from './layout/entreprise-layout/profil-admin/profil-admin.component';
import { ArchiveClientComponent } from './layout/entreprise-layout/archive-client/archive-client.component';
import { VoucherComponent } from './layout/entreprise-layout/voucher/voucher.component';
import { VoucherexamenComponent } from './layout/entreprise-layout/voucherexamen/voucherexamen.component';
import { ClientEntrepriseComponent } from './layout/client-entreprise/client-entreprise.component';
import { ClientEseComponent } from './navbare/client-ese/client-ese.component';
import { DemandeDevisComponent } from './layout/client-entreprise/demande-devis/demande-devis.component';
import { ExamenClientEntrepriseComponent } from './layout/client-entreprise/examen-client-entreprise/examen-client-entreprise.component';
import { FormationClientEntrepriseComponent } from './layout/client-entreprise/formation-client-entreprise/formation-client-entreprise.component';
import { InscriptionExamenComponent } from './layout/client-entreprise/inscription-examen/inscription-examen.component';
import { MesVoucherComponent } from './layout/client-entreprise/mes-voucher/mes-voucher.component';
import { MesvoucherexamenComponent } from './layout/client-entreprise/mesvoucherexamen/mesvoucherexamen.component';
import { ProfilClientEntrepriseComponent } from './layout/client-entreprise/profil-client-entreprise/profil-client-entreprise.component';
import { DetailsFormationComponent } from './layout/formateur-layout/details-formation/details-formation.component';
import { FooterComponent } from './footer/footer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import{DemandeEmployeeComponent} from './layout/entreprise-layout/demande-employee/demande-employee.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
  listPlugin
  
]);



@NgModule({ 
  declarations: [
    //FullCalendarModule,
    AppComponent,
    IndexComponent,
      
    ClientComponent,
    EntrepriseComponent,
    IndexLayoutComponent,
    ClientLayoutComponent,
    EntrepriseLayoutComponent,
    ExamensComponent,
    
    CalendrierComponent,
    FormationsComponent,
    comptesComponent,
    FormateurLayoutComponent,
    EmploiComponent,
    ProfilComponent,
    EmployeesComponent,
    ExamensClientComponent,
    FormationsClientComponent,
    ProfilClientComponent,
    DemandeClientComponent,
    DemandeExamClientComponent,
    EtudiantComponent,
    FormateurComponent,
    FormationsEntrepriseComponent,
    ExamensEntrepriseComponent,
    ProfilAdminComponent,
    ArchiveClientComponent,
    VoucherComponent,
    VoucherexamenComponent,
    ClientEntrepriseComponent,
    ClientEseComponent,
    DemandeDevisComponent,
    ExamenClientEntrepriseComponent,
    FormationClientEntrepriseComponent,
    InscriptionExamenComponent,
    MesVoucherComponent,
    MesvoucherexamenComponent,
    ProfilClientEntrepriseComponent,
    DetailsFormationComponent,
    FooterComponent,
    DemandeEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FullCalendarModule,
    ShowHidePasswordModule,
    PDFExportModule,
    BrowserAnimationsModule,
    PDFExportModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
