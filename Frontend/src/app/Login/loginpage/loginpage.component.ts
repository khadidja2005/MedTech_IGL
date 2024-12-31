import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-loginpage',
  imports: [HeaderPDIComponent, FormsModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  notyf: Notyf | undefined;
  email: string = '';
  password: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
  }

  async onSubmit(event: Event) {
    //console.log('Password:', this.password);
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/login/", {
        email: this.email, password: this.password
      });
      console.log(response.data);
      if (this.notyf) {
        this.notyf.success('Login Successful');
      }
    } catch {
      console.log("Error occurred");
      if (this.notyf) {
        this.notyf.error('Login Failed');
      }
    }
    // Add your login logic here (e.g., call an API to authenticate the user)
  }
}