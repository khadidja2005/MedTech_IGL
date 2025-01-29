import { Component , inject } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-restauration',
  templateUrl: './restauration.component.html',
  styleUrls: ['./restauration.component.css']
})
export class RestaurationComponent {
  email: string = '';  // Variable liée à l'input email

   router = inject(Router)

   gotocode(){
    this.router.navigate(["/code"]);
    
   }
  onSubmit(): void {
    // Logique d'envoi ou de traitement du code
    console.log("Formulaire soumis avec l'email : " + this.email);
  }
}
