import { Component } from '@angular/core';
import { ConsultationInfoComponent } from "../consultation-info/consultation-info.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";

@Component({
  selector: 'app-consultation-page',
  imports: [ConsultationInfoComponent, SidebarComponent, HeaderPDIComponent],
  templateUrl: './consultation-page.component.html',
  styleUrl: './consultation-page.component.css'
})
export class ConsultationPageComponent {

}
