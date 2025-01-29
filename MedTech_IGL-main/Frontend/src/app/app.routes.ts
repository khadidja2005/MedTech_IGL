import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RestaurationComponent } from './restauration/restauration.component';
import { CodeComponent } from './code/code.component';
import { SauvegardeComponent } from './sauvegarde/sauvegarde.component';
import { ParamadminComponent } from './paramadmin/paramadmin.component';
import { ParammedComponent } from './parammed/parammed.component';
import { ParampatientComponent } from './parampatient/parampatient.component';
import { RechercheComponent } from './recherche/recherche.component';
import { AjoutdpiComponent } from './ajoutdpi/ajoutdpi.component';
import { Ajoutdp2Component } from './ajoutdp2/ajoutdp2.component';
import { Ajoutdpi3Component } from './ajoutdpi3/ajoutdpi3.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'restauration', component: RestaurationComponent },
  { path: 'code', component: CodeComponent },
  { path: 'sauvegarde', component: SauvegardeComponent },
  { path: 'paramadmin', component: ParamadminComponent },
  { path: 'parammed', component: ParammedComponent },
  { path: 'parampatient', component: ParampatientComponent },
  { path: 'recherche', component: RechercheComponent },
  { path: 'ajoutdpi', component: AjoutdpiComponent },
  { path: 'ajoutdp2', component: Ajoutdp2Component },
  { path: 'ajoutdpi3', component: Ajoutdpi3Component },
];

// Ajout de FormsModule dans les imports si nécessaire
export const myAppProviders = [
  importProvidersFrom(FormsModule)
];
