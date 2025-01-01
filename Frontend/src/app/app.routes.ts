import { Routes } from '@angular/router';
import { LandingPageComponent } from './LandingPage/landing-page/landing-page.component';
import { LoginpageComponent } from './Login/loginpage/loginpage.component';
// import { DpiComponent } from './PDI/dpi/dpi.component';
// import { BddComponent } from './controle-bdd/bdd/bdd.component';
// import { PageListEtablissemetsComponent } from './dashboard-etablissement/page-list-etablissemets/page-list-etablissemets.component';
// import { DoctorEstablishmentsComponent } from './dashboard-medecin/doctor-establishments/doctor-establishments.component';
// import { DPIManagementComponent } from './dashboard-medecin/dpimanagement/dpimanagement.component';
// import { ConsultationPageComponent } from './Consultation/consultation-page/consultation-page.component';
// import { PageAffichageEtablissementComponent } from './etab-personnals-medicaux/page-affichage-etablissement/page-affichage-etablissement.component';
// import { PageEmployesComponent } from './Employe/page-employes/page-employes.component';
// import { PageBilanComponent } from './Bilan-radio/page-bilan/page-bilan.component';
export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginpageComponent },
  // DPI Routes
  //   { path: 'dpi', component: DpiComponent },

  //   // Consultation Routes
  //   { path: 'consultation/:id', component: ConsultationPageComponent },

  //   // route d'affichage d'unne liste des etablissements
  //   { path: 'establishments-list', component: PageListEtablissemetsComponent },

  //   // route d'affichage d'un seul etablissement
  //   { path: 'establishment', component: PageAffichageEtablissementComponent },

  //   // route d'affichage de la liste des tous les employes
  //   { path: 'employee-list', component: PageEmployesComponent },

  //   // Doctor Dashboard Routes

  //   //Affichage d'une liste des etablissement d'un doctor
  //   { path: 'doctor-establishments', component: DoctorEstablishmentsComponent },
  //   //Affichage des dpi d'un médecin
  //   { path: 'doctor-dpi-management', component: DPIManagementComponent },

  //   // Radiology Report Routes

  //   { path: 'bilan-radio', component: PageBilanComponent },

  //   // Database Control
  //   { path: 'database-control', component: BddComponent },
];
