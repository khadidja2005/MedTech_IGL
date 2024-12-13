import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './LandingPage/header/header.component';
import { MainContentComponent } from './LandingPage/main-content/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, HeaderComponent, MainContentComponent],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
}
