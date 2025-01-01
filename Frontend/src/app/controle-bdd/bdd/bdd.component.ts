import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";

@Component({
  selector: 'app-bdd',
  imports: [SidebarComponent, HeaderPDIComponent],
  templateUrl: './bdd.component.html',
  styleUrl: './bdd.component.css'
})
export class BddComponent {
  initializeDB() {
    // Add initialization logic here
    console.log('Initializing database...');
  }

  updateDB() {
    // Add update logic here
    console.log('Updating database...');
  }
}
