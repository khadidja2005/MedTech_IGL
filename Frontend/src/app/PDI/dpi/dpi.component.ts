import { Component } from '@angular/core';
import { HeaderPDIComponent } from "../../components/header-pdi/header-pdi.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { DpiInfoComponent } from "../dpi-info/dpi-info.component";

@Component({
  selector: 'app-dpi',
  imports: [HeaderPDIComponent, SidebarComponent, DpiInfoComponent],
  templateUrl: './dpi.component.html',
  styleUrl: './dpi.component.css'
})
export class DpiComponent {
  role = "medecin";
  activeItem="DPI"

}
