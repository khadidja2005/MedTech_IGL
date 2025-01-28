import { Component } from '@angular/core';
import { EmployeInfComponent } from "../employe-inf/employe-inf.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";

@Component({
  selector: 'app-page-employes',
  imports: [EmployeInfComponent, SidebarComponent, HeaderPDIComponent],
  templateUrl: './page-employes.component.html',
  styleUrl: './page-employes.component.css'
})
export class PageEmployesComponent {
  role="admin";
  activeItem="Employés";

}
