import { Component, Input, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header-pdi',
  templateUrl: './header-pdi.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./header-pdi.component.css']
})
export class HeaderPDIComponent {
  @Input() user1: {
    id: string
    email: string,
    nom_complet: string,
    role: string,
    image: string
  } = {
    id: '',
    email: '',
    nom_complet: '',
    role: '',
    image: '',
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const role = localStorage.getItem("role");
      if (role) {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode<{ id: string , email : string }>(token);
          this.user1.id = decodedToken.id;
          this.user1.email = decodedToken.email
        }
        this.user1.nom_complet = localStorage.getItem("nom_complet") || ""
        this.user1.image = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
        this.user1.role = localStorage.getItem("role") || "";
      }
    }
  }
}