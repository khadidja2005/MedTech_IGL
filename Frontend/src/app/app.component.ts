import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LandingPageComponent} from './LandingPage/landing-page/landing-page.component';

import { HospitalisationComponent } from './Hospitalisation/hospitalisation/hospitalisation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HospitalisationComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Medtech';
}
