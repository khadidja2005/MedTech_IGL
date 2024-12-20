import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MainContentComponent } from '../main-content/main-content.component';
import { AdvantagesComponent } from '../advantages/advantages.component';
import {MedtechDefComponent} from '../medtech-def/medtech-def.component';
import {RetoursComponent} from '../retours/retours.component'
import { CommonModule } from '@angular/common'; 
import {ContactComponent} from '../contact/contact.component';
import { FormsModule } from '@angular/forms';
import {LogoContactComponent} from '../logo-contact/logo-contact.component';

@Component({
  selector: 'app-landing-page',
   imports: [HeaderComponent, MainContentComponent, AdvantagesComponent, MedtechDefComponent, 
      RetoursComponent, CommonModule, ContactComponent, FormsModule , LogoContactComponent ], 
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
