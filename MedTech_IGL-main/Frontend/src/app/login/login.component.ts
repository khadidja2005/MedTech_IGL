import { Component  , inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router'; // Import Router


@Component({
  selector: 'app-login',
  standalone: true, // Indicate that this component is standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule] // Import necessary modules
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
    }
  }


  onForgotPassword() {
    this.router.navigate(['/restauration']); // Redirection vers la page de restauration
  }
  

   router1 = inject(Router)

   gotoparadmin(){
    this.router1.navigate(["/paramadmin"]);
    
   }
}
