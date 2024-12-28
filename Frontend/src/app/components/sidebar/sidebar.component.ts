import { Component, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() role: string = 'admin'; // Default role
  @Input() activeItem: string = ''; // Default active item
  // Sidebar items configuration
  sidebarItems = [
    { label: 'Ordonnance', icon: '/assets/images/DPI.png', roles: ['pharmacien'], link: '#' },
    { label: 'Etablissements', icon: '/assets/images/etablissements.png', roles: ['admin', 'medecin', 'infermier', 'radiologue', 'laborantin', 'pharmacien'], link: '#' },
    { label: 'Employés', icon: '/assets/images/employees.png', roles: ['admin'], link: '#' },
    { label: 'DPI', icon: '/assets/images/DPI.png', roles: ['admin', 'patient', 'medecin', 'infermier'], link: '#' },
    { label: 'Bilans', icon: '/assets/images/DPI.png', roles: ['radiologue', 'laborantin'], link: '#' },
    { label: 'Archive', icon: '/assets/images/archive.png', roles: ['radiologue', 'laborantin', 'pharmacien'], link: '#' }
  ];

  footerItems = [
    { label: 'Control de BDD', icon: '/assets/images/BDD.png', roles: ['admin'], link: '#' },
    { label: 'Se Déconnecter', icon: '/assets/images/disconnect.png', roles: ['admin', 'patient', 'medecin', 'infirmier', 'radiologue', 'laborantin', 'pharmacien'], link: '#' }
  ];

  // Filter items based on role
  get filteredItems() {
    return this.sidebarItems.filter(item => item.roles.includes(this.role));
  }

  // Filter footer items based on role
  get filteredfooterItems() {
    return this.footerItems.filter(item => item.roles.includes(this.role));
  }
}
