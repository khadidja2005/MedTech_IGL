import { Component } from '@angular/core';
import { EstablishmentsComponent } from "../establishments/establishments.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";

@Component({
  selector: 'app-page-list-etablissemets',
  imports: [EstablishmentsComponent, SidebarComponent, HeaderPDIComponent],
  templateUrl: './page-list-etablissemets.component.html',
  styleUrl: './page-list-etablissemets.component.css'
})
export class PageListEtablissemetsComponent {
  role = "medecin";
  activeItem = "Etablissements";

}
