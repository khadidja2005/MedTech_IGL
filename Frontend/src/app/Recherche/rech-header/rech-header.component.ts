import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AjouterDPIComponent } from '../ajouter-dpi/ajouter-dpi.component';
import { DpiCards } from '../recherche/recherche.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import { ScannerComponent } from '../scanner/scanner.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-rech-header',
  imports: [CommonModule, AjouterDPIComponent, ScannerComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './rech-header.component.html',
  styleUrl: './rech-header.component.css',
})
export class RechHeaderComponent {
  @Input() dpis!: DpiCards[];
  @Input() etablissements!: Etab[];
  @Input() role!: string;
  @Input() isScannerPanelVisible!: boolean;

  isAddPanelVisible = false;
  isPopupVisible = false;

  rechForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.rechForm = this.fb.group({
      nss: ['', Validators.required],
    });
  }

  openAddPanel() {
    this.isAddPanelVisible = true;
  }

  // Method to close the panel
  closeAddPanel() {
    this.isAddPanelVisible = false;
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  addDpiCard(newDpiCard: DpiCards) {
    this.dpis.push(newDpiCard); // Add the new consultation to the list
    this.isAddPanelVisible = false; // Close the panel after adding
  }
  openScannerPanel() {
    this.isScannerPanelVisible = true;
  }

  inputValue: string = ''; // Stores the input value temporarily
  nss: number | null = null; // Stores the final NSS value

  saveInputValue() {
    // Convert the inputValue to a number and store it in nss
    const parsedValue = Number(this.inputValue);
    if (!isNaN(parsedValue)) {
      this.nss = parsedValue;
      console.log('NSS saved:', this.nss);
    } else {
      console.error('Invalid input: Please enter a valid number');
    }
  }

  onSubmit() {
    if (this.rechForm.valid) {
      const formValue = this.rechForm.value;
      console.log(formValue);
      axios
        .get('http://localhost:8000/recherche/Patient/DPIS', {
          params: { nss: formValue.nss },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
}
