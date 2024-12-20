import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logo-contact',
  templateUrl: './logo-contact.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./logo-contact.component.css']
})
export class LogoContactComponent {
  copied: boolean = false; // Flag to show/hide the notification

  copyToClipboard(text: string) {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text; // Set the value to the text
    document.body.appendChild(textArea); // Append it to the body
    textArea.select(); // Select the text
    document.execCommand('copy'); // Execute the copy command
    document.body.removeChild(textArea); // Remove the textarea after copying

    // Show the "Copied!" notification
    this.copied = true;
    console.log("Copied: ", this.copied); // Debug log to check if the flag is being set

    // Hide the notification after 2 seconds
    setTimeout(() => {
      this.copied = false;
      console.log("Copied reset: ", this.copied); // Debug log to check if the flag is reset
    }, 2000);
  }
}
