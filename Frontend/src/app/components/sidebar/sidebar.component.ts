import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Notyf } from 'notyf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  notyf: Notyf | undefined;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.notyf = new Notyf();
    }
  }
  @Input() role: string =
    localStorage.getItem('role')?.toLowerCase() || 'admin'; // Get role from localStorage
  @Input() activeItem: string = ''; // Default active item
  // Sidebar items configuration
  sidebarItems = [
    {
      label: 'Ordonnances',
      icon: '/assets/images/DPI.png',
      roles: ['pharmacien'],
      link: '/pharmacie',
    },
    {
      label: 'Etablissements',
      icon: '/assets/images/etablissements.png',
      roles: [
        'admin',
        'medecin',
        'infermier',
        'radiologue',
        'laborantin',
        'pharmacien',
      ],
      link: '/dashboard/etablissement',
    },
    {
      label: 'Employés',
      icon: '/assets/images/employees.png',
      roles: ['admin'],
      link: 'dashboard/employee',
    },
    {
      label: 'DPI',
      icon: '/assets/images/DPI.png',
      roles: ['admin', 'patient', 'medecin', 'infermier'],
      link: '#',
    },
    {
      label: 'Bilans',
      icon: '/assets/images/DPI.png',
      roles: ['radiologue', 'laborantin'],
      link: '#',
    },
    {
      label: 'Archive',
      icon: '/assets/images/archive.png',
      roles: ['radiologue', 'laborantin', 'pharmacien'],
      link: this.archivelink,
    },
  ];

  footerItems = [
    {
      label: 'Control de BDD',
      icon: '/assets/images/BDD.png',
      roles: ['admin'],
      link: '/dashboard/Controlbdd',
    },
    {
      label: 'Se Déconnecter',
      icon: '/assets/images/disconnect.png',
      roles: [
        'admin',
        'patient',
        'medecin',
        'infermier',
        'radiologue',
        'laborantin',
        'pharmacien',
      ],
      link: '#',
      action: 'logout',
    },
  ];
  get archivelink() {
    switch (this.role) {
      case 'radiologue':
        return '/radiologue/archive';
      case 'laborantin':
        return '/laborantin/archive';
      case 'pharmacien':
        return '/pharmacie/archive';
      default:
        return '';
    }
  }
  // Filter items based on role
  get filteredItems() {
    return this.sidebarItems.filter((item) => item.roles.includes(this.role));
  }

  // Filter footer items based on role
  get filteredfooterItems() {
    return this.footerItems.filter((item) => item.roles.includes(this.role));
  }
  logout() {
    localStorage.clear(); // Clear all items in localStorage
    window.location.href = '/'; // Redirect to the home page
  }

  // Handle footer item actions
  handleFooterItemClick(action: string | undefined) {
    if (action === 'logout') {
      this.logout();
      if (this.notyf) {
        this.notyf.success('Déconnecté avec succès');
      }
    }
  }
}
