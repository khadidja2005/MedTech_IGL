import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//import { LandingPageComponent } from './LandingPage/landing-page/landing-page.component';
// import { HeaderPDIComponent } from './components/header-pdi/header-pdi.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { DpiInfoComponent } from './PDI/dpi-info/dpi-info.component';
// import { DpiComponent } from './PDI/dpi/dpi.component';
// import { ConsultationInfoComponent } from './Consultation/consultation-info/consultation-info.component';
// import { EstablishmentsComponent } from './dashboard-etablissement/establishments/establishments.component';
// import { PersonnalsMedicauxComponent } from './etab-personnals-medicaux/personnals-medicaux/personnals-medicaux.component';
// import { EmployeInfComponent } from './Employe/employe-inf/employe-inf.component';
// import { BddComponent } from './controle-bdd/bdd/bdd.component';
// import { PageListEtablissemetsComponent } from './dashboard-etablissement/page-list-etablissemets/page-list-etablissemets.component';
// import { DoctorEstablishmentsComponent } from './dashboard-medecin/doctor-establishments/doctor-establishments.component';
// import { DPIManagementComponent } from './dashboard-medecin/dpimanagement/dpimanagement.component';
// import { BilanListComponent } from './Bilan-radio/bilan-list/bilan-list.component';
// import { BilanDisplayComponent } from './Bilan-radio/bilan-display-med/bilan-display.component';
// import { BilanDisplayRadiologueComponent } from './Bilan-radio/bilan-display-radiologue/bilan-display-radiologue.component';
// import { BilanDisplayMedValidComponent } from './Bilan-radio/bilan-display-med-valid/bilan-display-med-valid.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // imports: [RouterOutlet, LandingPageComponent, HeaderPDIComponent, SidebarComponent, DpiInfoComponent, DpiComponent, ConsultationInfoComponent, EstablishmentsComponent, PersonnalsMedicauxComponent, EmployeInfComponent, BddComponent, PageListEtablissemetsComponent, DoctorEstablishmentsComponent, DPIManagementComponent, BilanListComponent, BilanDisplayComponent, BilanDisplayRadiologueComponent, BilanDisplayMedValidComponent],
  imports: [RouterOutlet  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Medtech';
}
