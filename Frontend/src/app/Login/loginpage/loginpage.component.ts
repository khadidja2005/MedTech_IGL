import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HeaderPDIComponent } from '../../components/header-pdi/header-pdi.component';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  imports: [HeaderPDIComponent, FormsModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',
})
export class LoginpageComponent {
  notyf: Notyf | undefined;
  email: string = '';
  password: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
  }
  navigatetorecovercode(): void {
    this.router.navigate(['/authcode']);
  }
  async onSubmit(event: Event) {
    //console.log('Password:', this.password);
    event.preventDefault();
    let role = '';
    try {
      interface LoginResponse {
        token: string;
        id: string;
        email: string;
        role: string;
        nom_complet: string;
      }

      const response = await axios.post<LoginResponse>(
        'http://localhost:8000/auth/login/',
        {
          email: this.email,
          password: this.password,
        }
      );
      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', /*response.data.id*/ '1872');
      localStorage.setItem('email', response.data.email);
      role = response.data.role;
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('nom_complet', response.data.nom_complet);
      if (this.notyf) {
        this.notyf.success('Login Successful');
      }
      setTimeout(() => {
        if (role === 'ADMIN') {
          this.router.navigate(['/dashboard/etablissement']);
        }
        // if (role === 'medecin') {
        //   this.router.navigate(['/consultation']);
        // }
        // if (role === 'infermier') {
        //   this.router.navigate(['/hospitalisation']);
        // }
        if (role === 'RADIOLOGUE') {
          this.router.navigate(['/radiologue']);
        }
        if (role === 'LABORANTIN') {
          this.router.navigate(['/laborantin']);
        }
        if (role === 'PHARMACIEN') {
          this.router.navigate(['/pharmacie']);
        }
      }, 2000);
    } catch (e) {
      console.log('Error occurred');
      console.log(e);
      if (this.notyf) {
        this.notyf.error('Login Failed');
      }
    }
    // Add your login logic here (e.g., call an API to authenticate the user)
  }
}
