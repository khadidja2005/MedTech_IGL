import { Component ,Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Notyf } from 'notyf';
import { isPlatformBrowser } from '@angular/common';
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";
import axios from 'axios';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resetpasswordpage',
  imports: [FormsModule , HeaderPDIComponent],
  templateUrl: './resetpasswordpage.component.html',
  styleUrl: './resetpasswordpage.component.css'
})
export class ResetpasswordpageComponent {
  notyf: Notyf | undefined;
  email: string = '';
  password: string = '';
  repassword : string = '';
  ngOnInit(): void {
    const storedEmail = localStorage.getItem('email');
    this.email = storedEmail ? storedEmail : 'unknown email';
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object , private router : Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
  }
  gobacktologin():void{
    localStorage.removeItem('email');
    this.router.navigate(["/login"])
  }
  async onSubmit(event: Event) {
    event.preventDefault();
    try {
      try {
        if (this.password !== this.repassword) {
          if (this.notyf) {
            this.notyf.error("les mots de passe ne correspondent pas");
          }
      }} catch (e) {
        console.log("Error occurred");
        if (this.notyf) {
          this.notyf.error("les mots de passe ne correspondent pas");
        }
      }
      const response = await axios.post("http://localhost:8000/auth/reset-password/confirm/", {
        email: this.email,
        new_password : this.password,
      });
      console.log(response.data);
      if (this.notyf) {
        this.notyf.success('mot de passe reinitialise avec succes');
        localStorage.removeItem('email');
        setTimeout(()=> {
          this.router.navigate(["/login"])
        } , 2000)
      }
    } catch (e) {
      console.log("Error occurred");
      console.log(e);
      if (this.notyf) {
        this.notyf.error("erreur durant la reinitialisation du mot de passe");
      }
    }
    // Add your login logic here (e.g., call an API to authenticate the user)
  }
}
