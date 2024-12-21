import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {LandingPageComponent} from './LandingPage/landing-page/landing-page.component';
import {HeaderPDIComponent} from './PDI/header-pdi/header-pdi.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet,LandingPageComponent,HeaderPDIComponent],  

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Medtech';
}
