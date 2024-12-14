import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './LandingPage/header/header.component';
import { MainContentComponent } from './LandingPage/main-content/main-content.component';
import { AdvantagesComponent } from './LandingPage/advantages/advantages.component';
import {MedtechDefComponent} from './LandingPage/medtech-def/medtech-def.component';
import {RetoursComponent} from './LandingPage/retours/retours.component'
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, HeaderComponent, MainContentComponent, AdvantagesComponent, MedtechDefComponent, RetoursComponent, CommonModule],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
}
