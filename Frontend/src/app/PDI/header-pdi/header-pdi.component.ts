import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-pdi',
  templateUrl: './header-pdi.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./header-pdi.component.css']
 
})

export class HeaderPDIComponent { 
  user1 = {
    name: "Amina Benali",
    job: "Cardiologue",
    Admin: true, 
    image: "assets/images/doctor.png"
  };

  user2 = {
    name: "Khaled Moulay",
    job: "Neurologue",
    Admin: false, 
    image: "assets/images/doctor.png"
  };
}
