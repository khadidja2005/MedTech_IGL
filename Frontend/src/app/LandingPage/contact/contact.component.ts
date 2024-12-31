import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';
@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  email: string = '';
  message: string = '';
  errorMessage: string | null = null;

  submitForm() {
    // Check if email is empty
    if (this.email === '') {
      this.errorMessage = 'Veuillez entrer votre email.';
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Veuillez entrer un email valide.';
      return;
    }

    // Check if message is empty
    if (this.message === '') {
      this.errorMessage = 'Veuillez entrer votre message.';
      return;
    }

    // Detect nonsensical inputs
    const onlySpecialCharsPattern = /^[^\w\s]+$/; // Message is only special characters
    const specialCharsAndNumbersPattern = /^[^a-zA-Z\s]+$/; // Message is special characters and numbers
    const excessiveSpecialCharsPattern = /[^\w\s]/g; // Matches all special characters

    // Check for only special characters
    if (onlySpecialCharsPattern.test(this.message)) {
      this.errorMessage =
        'Votre message semble incorrect. Veuillez entrer un message valide.';
      return;
    }

    // Check for special characters combined with numbers
    if (specialCharsAndNumbersPattern.test(this.message)) {
      this.errorMessage =
        'Votre message semble incorrect. Veuillez entrer un message valide.';
      return;
    }

    // Check for more than 6 special characters
    const specialCharMatches = this.message.match(excessiveSpecialCharsPattern);
    if (specialCharMatches && specialCharMatches.length > 6) {
      this.errorMessage =
        'Votre message semble incorrect. Veuillez entrer un message valide.';
      return;
    }

    // If all validations pass
    this.errorMessage = null; // Clear error message
    console.log('email:', this.email);
    console.log('message:', this.message);
    axios
      .post('http://localhost:8000/contact-us/', {
        email: this.email,
        message: this.message,
      })
      .then((response) => {
        console.log(response);
        this.errorMessage = 'Votre message a été envoyé avec succès.';
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
