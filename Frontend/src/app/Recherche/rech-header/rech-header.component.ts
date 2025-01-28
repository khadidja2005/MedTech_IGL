import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AjouterDPIComponent } from '../ajouter-dpi/ajouter-dpi.component';
import { DpiCards } from '../recherche/recherche.component';
import { Etab } from '../../Pharmacie/pharmacie/pharmacie.component';
import { ScannerComponent } from '../scanner/scanner.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import axios from 'axios';
interface dpi {
  dpi_id: number;
  etablissement: number;
}
interface Data {
  dpis: dpi[];
  patient_name: string;
}
@Component({
  selector: 'app-rech-header',
  imports: [
    CommonModule,
    AjouterDPIComponent,
    ScannerComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './rech-header.component.html',
  styleUrl: './rech-header.component.css',
})
export class RechHeaderComponent {
  @Input() dpis!: DpiCards[];
  @Input() etablissements!: Etab[];
  @Input() role!: string;
  @Input() isScannerPanelVisible!: boolean;
  @Output() dpisChange = new EventEmitter<DpiCards[]>();

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
  rechResult: DpiCards[] = []; // Stores the search results

  async saveInputValue() {
    // Convert the inputValue to a number and store it in nss
    const parsedValue = Number(this.inputValue);
    if (!isNaN(parsedValue)) {
      this.nss = parsedValue;
      console.log('NSS saved:', this.nss);
      await axios
        .get<Data>('http://localhost:8000/recherche/Patient/DPIS', {
          params: { nss: this.nss },
        })
        .then((response) => {
          console.log(response.data);
          for (let dpi in response.data.dpis) {
            this.rechResult.push({
              id: response.data.dpis[dpi].dpi_id,
              etablissement: response.data.dpis[dpi].etablissement,
              nom_complet: response.data.patient_name,
              nss: this.nss ? this.nss.toString() : '',
            });
          }
          this.dpis = [...this.rechResult];
          this.dpisChange.emit(this.dpis);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error('Invalid input: Please enter a valid number');
    }
  }
}
