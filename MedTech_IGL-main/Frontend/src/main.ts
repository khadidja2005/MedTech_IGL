import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importer FormsModule ici
import { routes } from './app/app.routes'; // Si nécessaire, inclure les routes

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, FormsModule), // Ajouter FormsModule ici
    provideRouter(routes), // Configurer les routes
  ],
}).catch(err => console.error(err));
