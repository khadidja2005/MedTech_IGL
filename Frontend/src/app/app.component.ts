import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LaborantinComponent } from './Laborantin/laborantin/laborantin.component';
import { ArchiveComponent } from './LaborantinArchive/archive/archive.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ArchiveComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Medtech';
}
