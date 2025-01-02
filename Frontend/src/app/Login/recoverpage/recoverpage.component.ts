import { Component ,Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Notyf } from 'notyf';
import { isPlatformBrowser } from '@angular/common';
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";
import axios from 'axios';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recoverpage',
  imports: [FormsModule , HeaderPDIComponent],
  templateUrl: './recoverpage.component.html',
  styleUrl: './recoverpage.component.css'
})
export class RecoverpageComponent {
  notyf: Notyf | undefined;
  email: string = '';
  password: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object , private router : Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
  }
  gobacktologin():void{
    this.router.navigate(["/login"])
  }
  async onSubmit(event: Event) {
    //console.log('Password:', this.password);
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/reset-password/", {
        email: this.email
      });
      console.log(response.data);
      if (this.notyf) {
        this.notyf.success('code envoye avec succes');
        localStorage.setItem('email', this.email);
        setTimeout(()=> {
          this.router.navigate(["/verificationcode"])
        } , 2000)
      }
    } catch (e) {
      console.log("Error occurred");
      console.log(e);
      if (this.notyf) {
        this.notyf.error("erreur durant l'envoie du code");
      }
    }
    // Add your login logic here (e.g., call an API to authenticate the user)
  }
}

