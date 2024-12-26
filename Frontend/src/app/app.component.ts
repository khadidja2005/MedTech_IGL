import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LaborantinComponent } from './Laborantin/laborantin/laborantin.component';
import { ArchiveComponent } from './LaborantinArchive/archive/archive.component';
import { RadiologueComponent } from './Radiologue/radiologue/radiologue.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RadiologueComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Medtech';
}
