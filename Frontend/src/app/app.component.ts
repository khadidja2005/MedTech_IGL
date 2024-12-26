import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArchiveComponent } from './RadiologueArchive/archive/archive.component';

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
