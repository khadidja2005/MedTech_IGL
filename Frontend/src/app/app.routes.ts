import { Routes } from '@angular/router';
import { LandingPageComponent } from './LandingPage/landing-page/landing-page.component';
import { LoginpageComponent } from './Login/loginpage/loginpage.component';
import { RecoverpageComponent } from './Login/recoverpage/recoverpage.component';
import { CodepageComponent } from './Login/codepage/codepage.component';
import { ResetpasswordpageComponent } from './Login/resetpasswordpage/resetpasswordpage.component';
import { PageListEtablissemetsComponent } from './dashboard-etablissement/page-list-etablissemets/page-list-etablissemets.component';
export const routes: Routes = [
    { path: '', component: LandingPageComponent } ,
    {path: "login" , component : LoginpageComponent},
    {path : "authcode" , component : RecoverpageComponent},
    {path : "verificationcode" , component : CodepageComponent},
    {path : "resetpassword" , component : ResetpasswordpageComponent} ,
    {path : "dashboard" , component : PageListEtablissemetsComponent } , 

];
