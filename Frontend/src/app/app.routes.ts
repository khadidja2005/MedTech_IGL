import { Routes } from '@angular/router';
import { LandingPageComponent } from './LandingPage/landing-page/landing-page.component';
import { ConsultationPageComponent } from './Consultation/consultation-page/consultation-page.component';
import { LoginpageComponent } from './Login/loginpage/loginpage.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'consultation', component: ConsultationPageComponent },
  { path: 'login', component: LoginpageComponent }
];