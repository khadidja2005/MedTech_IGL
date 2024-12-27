import { Component } from '@angular/core';

@Component({
  selector: 'app-bdd',
  imports: [],
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
