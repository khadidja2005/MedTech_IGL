import { Component } from '@angular/core';
import { PersonnalsMedicauxComponent } from "../personnals-medicaux/personnals-medicaux.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";

@Component({
  selector: 'app-page-affichage-etablissement',
  imports: [PersonnalsMedicauxComponent, SidebarComponent, HeaderPDIComponent],
  templateUrl: './page-affichage-etablissement.component.html',
  styleUrl: './page-affichage-etablissement.component.css'
})
export class PageAffichageEtablissementComponent {
  role: string = "medecin";
  activeItem: string = "Etablissements";

}
