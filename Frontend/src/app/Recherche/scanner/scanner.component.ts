import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scanner',
  imports: [CommonModule],
  templateUrl: './scanner.component.html',
  styleUrl: './scanner.component.css'
})
export class ScannerComponent {
     @Input() isVisible: boolean = false;
}
