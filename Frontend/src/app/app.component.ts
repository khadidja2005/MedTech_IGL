import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LandingPageComponent} from './LandingPage/landing-page/landing-page.component';
import {HeaderPDIComponent} from './components/header-pdi/header-pdi.component';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import {DpiInfoComponent} from "./PDI/dpi-info/dpi-info.component";
import { DpiComponent } from "./PDI/dpi/dpi.component";


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, LandingPageComponent, HeaderPDIComponent, SidebarComponent, DpiInfoComponent, DpiComponent],  

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Medtech';
}
