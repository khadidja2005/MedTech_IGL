import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  email: string = '';
  message: string = '';
errorMessage: any;

  submitForm() {
    
    if (this.email === '') {
       this.errorMessage='Veuiller entrez votre mail .'
       return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Veuillez entrer un email valide.';
      return;
    }

      if (this.message === '') {
        this.errorMessage='Veuiller entrez votre message .'
        return;
     }
     console.log('email:', this.email);
     console.log('message:', this.message);


}
}