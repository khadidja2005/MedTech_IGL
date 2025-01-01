import { Routes } from '@angular/router';
import { LandingPageComponent } from './LandingPage/landing-page/landing-page.component';
import { LoginpageComponent } from './Login/loginpage/loginpage.component';
import { RecoverpageComponent } from './Login/recoverpage/recoverpage.component';
import { CodepageComponent } from './Login/codepage/codepage.component';
import { ResetpasswordpageComponent } from './Login/resetpasswordpage/resetpasswordpage.component';
import { PageListEtablissemetsComponent } from './dashboard-etablissement/page-list-etablissemets/page-list-etablissemets.component';
import { RechercheComponent } from './Recherche/recherche/recherche.component';
import { HospitalisationComponent } from './Hospitalisation/hospitalisation/hospitalisation.component';
export const routes: Routes = [
    { path: '', component: LandingPageComponent } ,
    {path: "login" , component : LoginpageComponent},
    {path : "authcode" , component : RecoverpageComponent},
    {path : "verificationcode" , component : CodepageComponent},
    {path : "resetpassword" , component : ResetpasswordpageComponent} ,
    {path : "dashboard" , component : PageListEtablissemetsComponent } , 
     { path: 'recherche', component: RechercheComponent },
  { path: 'hospitalisation', component: HospitalisationComponent },
// import { DpiComponent } from './PDI/dpi/dpi.component';
// import { BddComponent } from './controle-bdd/bdd/bdd.component';
// import { PageListEtablissemetsComponent } from './dashboard-etablissement/page-list-etablissemets/page-list-etablissemets.component';
// import { DoctorEstablishmentsComponent } from './dashboard-medecin/doctor-establishments/doctor-establishments.component';
// import { DPIManagementComponent } from './dashboard-medecin/dpimanagement/dpimanagement.component';
// import { ConsultationPageComponent } from './Consultation/consultation-page/consultation-page.component';
// import { PageAffichageEtablissementComponent } from './etab-personnals-medicaux/page-affichage-etablissement/page-affichage-etablissement.component';
// import { PageEmployesComponent } from './Employe/page-employes/page-employes.component';
// import { PageBilanComponent } from './Bilan-radio/page-bilan/page-bilan.component';
  // DPI Routes
  //   { path: 'dpi', component: DpiComponent },
];
