import { Component , Inject, PLATFORM_ID } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";
import { Notyf } from 'notyf';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-bdd',
  imports: [SidebarComponent, HeaderPDIComponent],
  templateUrl: './bdd.component.html',
  styleUrl: './bdd.component.css'
})
export class BddComponent {
  notyf: Notyf | undefined;
    constructor(@Inject(PLATFORM_ID) private platformId: Object , private router : Router) {
      if (isPlatformBrowser(this.platformId)) {
        this.notyf = new Notyf();
      }
    }
  async initializeDB() {
    // Add initialization logic here
    console.log('Initializing database...');
    try {
      const response = await axios.post('http://localhost:8000/control/seed_database/');
      if (this.notyf) {
        this.notyf.success('Base de données initialisée avec succès');
      };
     }catch(e){
       console.log(e); 
       if (this.notyf) {
         this.notyf.error('Erreur lors du chargement de la base de données');
       };
     }
  }

  updateDB() {
    // Add update logic here
    console.log('Updating database...');
  }
}
