import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { AuthGuardService } from './comptes/auth-guard.service';
import { ExamensComponent } from './examens/examens.component';
import { FormationsComponent } from './formations/formations.component';
import { ClientEntrepriseComponent } from './layout/client-entreprise/client-entreprise.component';
import { DemandeDevisComponent } from './layout/client-entreprise/demande-devis/demande-devis.component';
import { ExamenClientEntrepriseComponent } from './layout/client-entreprise/examen-client-entreprise/examen-client-entreprise.component';
import { FormationClientEntrepriseComponent } from './layout/client-entreprise/formation-client-entreprise/formation-client-entreprise.component';
import { InscriptionExamenComponent } from './layout/client-entreprise/inscription-examen/inscription-examen.component';
import { MesVoucherComponent } from './layout/client-entreprise/mes-voucher/mes-voucher.component';
import { MesvoucherexamenComponent } from './layout/client-entreprise/mesvoucherexamen/mesvoucherexamen.component';
import { ProfilClientEntrepriseComponent } from './layout/client-entreprise/profil-client-entreprise/profil-client-entreprise.component';
import { ClientLayoutComponent } from './layout/client-layout/client-layout.component';
import { DemandeClientComponent } from './layout/client-layout/demande-client/demande-client.component';
import { DemandeExamClientComponent } from './layout/client-layout/demande-exam-client/demande-exam-client.component';
import { ExamensClientComponent } from './layout/client-layout/examens-client/examens-client.component';
import { FormationsClientComponent } from './layout/client-layout/formations-client/formations-client.component';
import { ProfilClientComponent } from './layout/client-layout/profil-client/profil-client.component';
import { ArchiveClientComponent } from './layout/entreprise-layout/archive-client/archive-client.component';
import { DemandeEmployeeComponent } from './layout/entreprise-layout/demande-employee/demande-employee.component';
import { EmployeesComponent } from './layout/entreprise-layout/employees/employees.component';
import { EntrepriseLayoutComponent } from './layout/entreprise-layout/entreprise-layout.component';
import { ExamensEntrepriseComponent } from './layout/entreprise-layout/examens-entreprise/examens-entreprise.component';
import { FormationsEntrepriseComponent } from './layout/entreprise-layout/formations-entreprise/formations-entreprise.component';
import { ProfilAdminComponent } from './layout/entreprise-layout/profil-admin/profil-admin.component';
import { VoucherComponent } from './layout/entreprise-layout/voucher/voucher.component';
import { VoucherexamenComponent } from './layout/entreprise-layout/voucherexamen/voucherexamen.component';
import { DetailsFormationComponent } from './layout/formateur-layout/details-formation/details-formation.component';
import { EmploiComponent } from './layout/formateur-layout/emploi/emploi.component';
import { EtudiantComponent } from './layout/formateur-layout/etudiant/etudiant.component';
import { FormateurLayoutComponent } from './layout/formateur-layout/formateur-layout.component';
import { ProfilComponent } from './layout/formateur-layout/profil/profil.component';
import { IndexLayoutComponent } from './layout/index-layout/index-layout.component';

const routes: Routes = [
  {path:'',  component:IndexLayoutComponent },

  {path:'examens',
   component:ExamensComponent,
 
},
{path:'examensClient',
component:ExamensClientComponent,
canActivate:[AuthGuardService]
},

{path:'examensFormation',
component:ExamensEntrepriseComponent,
canActivate:[AuthGuardService]
},

  {path:'formations', component:FormationsComponent},
  {path:'formationsClient', component:FormationsClientComponent,canActivate:[AuthGuardService]},
  {path:'formationsEntreprise', component:FormationsEntrepriseComponent,canActivate:[AuthGuardService]},

  {path:'calendar', component:CalendrierComponent},

  {path:'employees', component:EmployeesComponent,canActivate:[AuthGuardService]},

  {path:'formateur',
  component:FormateurLayoutComponent,
  canActivate:[AuthGuardService]
},
{path:'client',
component:ClientLayoutComponent,
canActivate:[AuthGuardService]
},

{path:'entreprise',
component:EntrepriseLayoutComponent,
canActivate:[AuthGuardService]
},
{path:'demandes',
component:DemandeClientComponent,
canActivate:[AuthGuardService]
},
{path:'demandesExams',
component:DemandeExamClientComponent,
canActivate:[AuthGuardService]
},
{path:'emploi',
component:EmploiComponent,
canActivate:[AuthGuardService]
},
{path:'profil',
component:ProfilComponent,
canActivate:[AuthGuardService]
},

{path:'voucherexamen', component:VoucherexamenComponent,canActivate:[AuthGuardService]},

{path:'profilAdminEse',
component:ProfilAdminComponent,
canActivate:[AuthGuardService]
},

{path:'etudiants',
component:EtudiantComponent,
canActivate:[AuthGuardService]
},

{path:'archiveClient', component:ArchiveClientComponent,canActivate:[AuthGuardService]},
{path:'voucherformation', component:VoucherComponent,canActivate:[AuthGuardService]},
{path:'detailsformation', component:DetailsFormationComponent,canActivate:[AuthGuardService]},

{path:'profilClient',
component:ProfilClientComponent,
canActivate:[AuthGuardService]
},

{path:'demandeEmployee', component:DemandeEmployeeComponent,canActivate:[AuthGuardService]},
{path:'clientEse', component:ClientEntrepriseComponent,canActivate:[AuthGuardService]},
{path:'examensClientEse', component:ExamenClientEntrepriseComponent,canActivate:[AuthGuardService]},
{path:'formationsClientEse', component:FormationClientEntrepriseComponent,canActivate:[AuthGuardService]},
{path:'profilClientEse', component:ProfilClientEntrepriseComponent,canActivate:[AuthGuardService]},

{path:'mesDemandeDevis', component:DemandeDevisComponent,canActivate:[AuthGuardService]},
{path:'inscriptionExam', component:InscriptionExamenComponent,canActivate:[AuthGuardService]},
{path:'mesvoucherf', component:MesVoucherComponent,canActivate:[AuthGuardService]},
{path:'mesVoucherExamen', component:MesvoucherexamenComponent,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
