import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PharmacieComponent } from "./Pharmacie/pharmacie/pharmacie.component";
import { DpiComponent } from "./PDI/dpi/dpi.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Medtech';
}
