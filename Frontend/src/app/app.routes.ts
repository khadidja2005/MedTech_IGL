import { Routes } from '@angular/router';
import { LandingPageComponent } from './LandingPage/landing-page/landing-page.component';
import { ConsultationPageComponent } from './Consultation/consultation-page/consultation-page.component';
import { LoginpageComponent } from './Login/loginpage/loginpage.component';
import { OrdonnanceComponent } from './Ordonnance/ordonnance/ordonnance.component';
import { HttpClientModule } from '@angular/common/http'; // Importer HttpClientModule

// import { DpiComponent } from './PDI/dpi/dpi.component';
// import { BddComponent } from './controle-bdd/bdd/bdd.component';
// import { PageListEtablissemetsComponent } from './dashboard-etablissement/page-list-etablissemets/page-list-etablissemets.component';
// import { DoctorEstablishmentsComponent } from './dashboard-medecin/doctor-establishments/doctor-establishments.component';
// import { DPIManagementComponent } from './dashboard-medecin/dpimanagement/dpimanagement.component';
// import { PageAffichageEtablissementComponent } from './etab-personnals-medicaux/page-affichage-etablissement/page-affichage-etablissement.component';
// import { PageEmployesComponent } from './Employe/page-employes/page-employes.component';
// import { PageBilanComponent } from './Bilan-radio/page-bilan/page-bilan.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'consultation', component: ConsultationPageComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'ordannace', component: OrdonnanceComponent }
];