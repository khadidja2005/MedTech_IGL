import { Routes } from '@angular/router';
import { LandingPageComponent } from './LandingPage/landing-page/landing-page.component';
import { ConsultationPageComponent } from './Consultation/consultation-page/consultation-page.component';
import { LoginpageComponent } from './Login/loginpage/loginpage.component';
import { OrdonnanceComponent } from './Ordonnance/ordonnance/ordonnance.component';
import { RecoverpageComponent } from './Login/recoverpage/recoverpage.component';
import { CodepageComponent } from './Login/codepage/codepage.component';
import { ResetpasswordpageComponent } from './Login/resetpasswordpage/resetpasswordpage.component';
import { PageListEtablissemetsComponent } from './dashboard-etablissement/page-list-etablissemets/page-list-etablissemets.component';
import { RechercheComponent } from './Recherche/recherche/recherche.component';
import { HospitalisationComponent } from './Hospitalisation/hospitalisation/hospitalisation.component';
import { PageEmployesComponent } from './Employe/page-employes/page-employes.component';
import { BddComponent } from './controle-bdd/bdd/bdd.component';
import { PharmacieComponent } from './Pharmacie/pharmacie/pharmacie.component';
import { ArchiveComponent } from './PharmacieArchive/archive/archive.component';
import { LaborantinComponent } from './Laborantin/laborantin/laborantin.component';
import { ArchiveComponent as LaborantinArchiveComponent } from './LaborantinArchive/archive/archive.component';
import { RadiologueComponent } from './Radiologue/radiologue/radiologue.component';
import { ArchiveComponent as RadiologueArchiveComponent } from './RadiologueArchive/archive/archive.component';
import { BilanBioComponent } from './BilanBio/bilan-bio/bilan-bio.component';
import { PageAffichageEtablissementComponent } from './etab-personnals-medicaux/page-affichage-etablissement/page-affichage-etablissement.component';
import { SoinComponent } from './Soin/soin/soin.component';
import { DpiComponent } from './PDI/dpi/dpi.component';
import { PageBilanComponent } from './Bilan-radio/page-bilan/page-bilan.component';
import { DPIManagementComponent } from './dashboard-medecin/dpimanagement/dpimanagement.component';
export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'consultation/:id', component: ConsultationPageComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'ordannace/:id', component: OrdonnanceComponent },
  { path: 'authcode', component: RecoverpageComponent },
  { path: 'verificationcode', component: CodepageComponent },
  { path: 'resetpassword', component: ResetpasswordpageComponent },
  {
    path: 'dashboard/etablissement',
    component: PageListEtablissemetsComponent,
  },
  { path: 'dashboard/employee', component: PageEmployesComponent },
  { path: 'dashboard/Controlbdd', component: BddComponent },
  { path: 'recherche', component: RechercheComponent },
  { path: 'hospitalisation/:id', component: HospitalisationComponent },
  { path: 'pharmacie', component: PharmacieComponent },
  { path: 'pharmacie/archive', component: ArchiveComponent },
  { path: 'laborantin', component: LaborantinComponent },
  { path: 'laborantin/archive', component: LaborantinArchiveComponent },
  { path: 'radiologue', component: RadiologueComponent },
  { path: 'radiologue/archive', component: RadiologueArchiveComponent },
  { path: 'bilan-bio/:id', component: BilanBioComponent },
  { path: 'authcode', component: RecoverpageComponent },
  { path: 'verificationcode', component: CodepageComponent },
  { path: 'resetpassword', component: ResetpasswordpageComponent },
  {
    path: 'dashboard/etablissement',
    component: PageListEtablissemetsComponent,
  },
  { path: 'dashboard/employee', component: PageEmployesComponent },
  { path: 'dashboard/Controlbdd', component: BddComponent },
  {
    path: 'dashboard/etablissement/:id',
    component: PageAffichageEtablissementComponent,
  },
  { path: 'soin/:id', component: SoinComponent },
  { path: 'dpi/:id', component: DpiComponent },
  { path: 'bilan-radio/:id', component: PageBilanComponent },
  {path : "etablissement/:id" , component : DPIManagementComponent}
];


