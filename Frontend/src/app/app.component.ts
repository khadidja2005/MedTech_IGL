import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BilanBioComponent } from './BilanBio/bilan-bio/bilan-bio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BilanBioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Medtech';
}
