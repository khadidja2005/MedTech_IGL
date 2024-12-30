import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RechercheComponent } from './Recherche/recherche/recherche.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RechercheComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Medtech';
}
