import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Assurez-vous que le chemin est correct
import { RestaurationComponent } from './restauration/restauration.component'; // Assurez-vous que le chemin est correct

const routes: Routes = [
  { path: '', component: LoginComponent }, // Route par défaut
  { path: 'restauration', component: RestaurationComponent } // Route pour la page de restauration
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}