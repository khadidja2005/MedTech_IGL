import { Component ,Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Notyf } from 'notyf';
import { isPlatformBrowser } from '@angular/common';
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codepage',
  imports: [FormsModule , HeaderPDIComponent],
  templateUrl: './codepage.component.html',
  styleUrl: './codepage.component.css'
})
export class CodepageComponent {
  notyf: Notyf | undefined;
  email: string = '';
  code: string = '';
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
    this.router.navigate(["/authcode"])
  }
  async onSubmit(event: Event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/reset-password/verify/", {
        email: this.email,
        code : this.code
      });
      console.log(response.data);
      if (this.notyf) {
        this.notyf.success('verification reussie');
        localStorage.setItem('email', this.email);
        setTimeout(()=> {
          this.router.navigate(["/resetpassword"])
        } , 2000)
      }
    } catch (e) {
      console.log("Error occurred");
      console.log(e);
      if (this.notyf) {
        this.notyf.error("erreur durant la verification du code");
      }
    }
    // Add your login logic here (e.g., call an API to authenticate the user)
  }
}
